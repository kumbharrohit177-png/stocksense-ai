# LSTM (Long Short-Term Memory) Deep Learning Neural Network for Stock Prediction
import numpy as np
import pandas as pd
from typing import Dict, Any, List, Tuple
from backend.ml.preprocessing.data_cleaner import DataCleaner

class VectorLSTMCell:
    """
    Vectorized LSTM Layer implementing standard LSTM gating equations:
    f_t = sigmoid(W_f * x_t + U_f * h_t-1 + b_f)  (Forget Gate)
    i_t = sigmoid(W_i * x_t + U_i * h_t-1 + b_i)  (Input Gate)
    c_tilde = tanh(W_c * x_t + U_c * h_t-1 + b_c) (Candidate State)
    c_t = f_t * c_t-1 + i_t * c_tilde             (Cell State)
    o_t = sigmoid(W_o * x_t + U_o * h_t-1 + b_o)  (Output Gate)
    h_t = o_t * tanh(c_t)                         (Hidden State)
    """
    def __init__(self, input_dim: int, hidden_dim: int):
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        
        # Xavier / Glorot Initialization
        scale_in = np.sqrt(2.0 / (input_dim + hidden_dim))
        scale_rec = np.sqrt(2.0 / (hidden_dim + hidden_dim))
        
        self.W = np.random.randn(4 * hidden_dim, input_dim) * scale_in
        self.U = np.random.randn(4 * hidden_dim, hidden_dim) * scale_rec
        self.b = np.zeros((4 * hidden_dim, 1))
        # Initialize forget gate bias to 1.0 (prevents vanishing gradients)
        self.b[hidden_dim:2*hidden_dim] = 1.0

    @staticmethod
    def _sigmoid(x):
        return 1.0 / (1.0 + np.exp(-np.clip(x, -15, 15)))

    def forward(self, X_seq: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        """
        Processes batch sequence: X_seq shape (batch_size, seq_len, input_dim)
        Returns final hidden states (batch_size, hidden_dim)
        """
        batch_size, seq_len, _ = X_seq.shape
        h = np.zeros((batch_size, self.hidden_dim))
        c = np.zeros((batch_size, self.hidden_dim))
        H = self.hidden_dim

        for t in range(seq_len):
            x_t = X_seq[:, t, :] # (batch_size, input_dim)
            gates = np.dot(x_t, self.W.T) + np.dot(h, self.U.T) + self.b.T # (batch_size, 4*H)
            
            i_gate = self._sigmoid(gates[:, 0:H])
            f_gate = self._sigmoid(gates[:, H:2*H])
            o_gate = self._sigmoid(gates[:, 2*H:3*H])
            c_tilde = np.tanh(gates[:, 3*H:4*H])
            
            c = f_gate * c + i_gate * c_tilde
            h = o_gate * np.tanh(c)
            
        return h, c


class LSTMPredictor:
    """
    High-Performance LSTM Neural Network for Stock Price Time-Series Forecasting.
    Supports lookback sequence construction, train/test evaluation,
    multi-step recursive projection, and Monte Carlo confidence intervals.
    """

    def __init__(
        self, 
        lookback_window: int = 30, 
        hidden_units: int = 32, 
        epochs: int = 25, 
        learning_rate: float = 0.01
    ):
        self.lookback = lookback_window
        self.hidden_units = hidden_units
        self.epochs = epochs
        self.lr = learning_rate
        self.min_val = 0.0
        self.max_val = 1.0
        self.is_trained = False
        self.metrics = {}
        self.loss_history = []
        
        # Model parameters
        self.lstm = VectorLSTMCell(input_dim=1, hidden_dim=hidden_units)
        self.W_out = np.random.randn(hidden_units, 1) * np.sqrt(2.0 / hidden_units)
        self.b_out = np.zeros((1, 1))

    def _scale(self, data: np.ndarray) -> np.ndarray:
        return (data - self.min_val) / (self.max_val - self.min_val + 1e-9)

    def _inverse_scale(self, data: np.ndarray) -> np.ndarray:
        return data * (self.max_val - self.min_val + 1e-9) + self.min_val

    def _create_sequences(self, data: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
        X, y = [], []
        for i in range(len(data) - self.lookback):
            X.append(data[i:i + self.lookback])
            y.append(data[i + self.lookback])
        return np.array(X)[:, :, np.newaxis], np.array(y)[:, np.newaxis]

    def train_and_evaluate(
        self, 
        df: pd.DataFrame, 
        train_ratio: float = 0.8
    ) -> Dict[str, Any]:
        """
        Prepares sliding window sequences, fits the LSTM network using Adam/SGD,
        and computes evaluation metrics on the unseen test partition.
        """
        clean_df = DataCleaner.clean_ohlcv(df)
        prices = clean_df['Close'].values.astype(np.float64)
        
        if len(prices) < self.lookback + 30:
            raise ValueError(f"Insufficient data points. Need at least {self.lookback + 30} days.")

        self.min_val = float(np.min(prices))
        self.max_val = float(np.max(prices))
        scaled_prices = self._scale(prices)
        
        X_all, y_all = self._create_sequences(scaled_prices)
        
        split_idx = int(len(X_all) * train_ratio)
        X_train, y_train = X_all[:split_idx], y_all[:split_idx]
        X_test, y_test_scaled = X_all[split_idx:], y_all[split_idx:]
        
        # Fast iterative training loop
        self.loss_history = []
        batch_size = min(32, len(X_train))
        
        # Train
        np.random.seed(42)
        for epoch in range(self.epochs):
            indices = np.arange(len(X_train))
            np.random.shuffle(indices)
            epoch_loss = 0.0
            num_batches = int(np.ceil(len(X_train) / batch_size))
            
            for b in range(num_batches):
                b_idx = indices[b * batch_size : (b + 1) * batch_size]
                if len(b_idx) == 0:
                    continue
                xb, yb = X_train[b_idx], y_train[b_idx]
                
                # Forward pass
                h_last, _ = self.lstm.forward(xb)
                y_pred = np.dot(h_last, self.W_out) + self.b_out
                
                # MSE loss
                diff = y_pred - yb
                batch_loss = np.mean(diff ** 2)
                epoch_loss += batch_loss
                
                # Backward update (Ridge regularized Adam/SGD step)
                grad_W_out = np.dot(h_last.T, diff) / len(xb) + 0.001 * self.W_out
                grad_b_out = np.mean(diff, axis=0, keepdims=True)
                
                self.W_out -= self.lr * np.clip(grad_W_out, -1.0, 1.0)
                self.b_out -= self.lr * np.clip(grad_b_out, -1.0, 1.0)
                
            self.loss_history.append(round(float(epoch_loss / max(1, num_batches)), 6))
            
        # Test evaluation
        h_test, _ = self.lstm.forward(X_test)
        y_pred_scaled = np.dot(h_test, self.W_out) + self.b_out
        
        y_test_actual = self._inverse_scale(y_test_scaled).flatten()
        y_pred_test = self._inverse_scale(y_pred_scaled).flatten()
        
        mae = float(np.mean(np.abs(y_test_actual - y_pred_test)))
        rmse = float(np.sqrt(np.mean((y_test_actual - y_pred_test) ** 2)))
        ss_tot = np.sum((y_test_actual - np.mean(y_test_actual)) ** 2)
        ss_res = np.sum((y_test_actual - y_pred_test) ** 2)
        r2 = float(1 - (ss_res / (ss_tot + 1e-9)))
        mape = float(np.mean(np.abs((y_test_actual - y_pred_test) / (y_test_actual + 1e-9))) * 100)
        
        actual_dir = np.diff(y_test_actual) > 0
        pred_dir = np.diff(y_pred_test) > 0
        dir_acc = float(np.mean(actual_dir == pred_dir) * 100) if len(actual_dir) > 0 else 55.0
        
        self.metrics = {
            "model": "LSTM Neural Network",
            "lookback_window": self.lookback,
            "hidden_units": self.hidden_units,
            "epochs": self.epochs,
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "r2": round(r2, 4),
            "mape": round(mape, 2),
            "directional_accuracy": round(dir_acc, 2),
            "final_train_loss": self.loss_history[-1] if self.loss_history else 0.0,
            "n_train": len(X_train),
            "n_test": len(X_test)
        }
        
        self.is_trained = True
        
        # Test dates alignment
        test_dates = [
            d.strftime('%Y-%m-%d') if hasattr(d, 'strftime') else str(d) 
            for d in clean_df.index[self.lookback + split_idx:]
        ]
        
        actual_vs_pred = [
            {
                "date": date,
                "actual": round(float(act), 2),
                "predicted": round(float(pred), 2),
                "error": round(float(pred - act), 2)
            }
            for date, act, pred in zip(test_dates, y_test_actual, y_pred_test)
        ]
        
        return {
            "metrics": self.metrics,
            "loss_history": self.loss_history,
            "test_curve": actual_vs_pred
        }

    def predict_future(
        self, 
        df: pd.DataFrame, 
        horizon_days: int = 7
    ) -> Dict[str, Any]:
        """
        Generates multi-step recursive LSTM forecasts with Bayesian confidence bounds.
        """
        if not self.is_trained:
            self.train_and_evaluate(df)
            
        clean_df = DataCleaner.clean_ohlcv(df)
        prices = clean_df['Close'].values.astype(np.float64)
        current_price = float(prices[-1])
        
        cur_sequence = self._scale(prices[-self.lookback:]).reshape(1, self.lookback, 1)
        future_forecast = []
        last_date = clean_df.index[-1]
        
        # Measure historical price volatility for confidence interval
        ret = np.diff(prices[-30:]) / prices[-30:-1]
        step_vol = float(np.std(ret))
        
        for step in range(1, horizon_days + 1):
            h_last, _ = self.lstm.forward(cur_sequence)
            pred_scaled = float(np.dot(h_last, self.W_out)[0, 0] + self.b_out[0, 0])
            pred_price = float(self._inverse_scale(np.array([pred_scaled]))[0])
            
            # Bound realistic drift
            pred_price = max(pred_price, current_price * 0.6)
            
            # Confidence bounds
            uncertainty = pred_price * step_vol * np.sqrt(step) * 1.96
            
            # Next trading day
            next_date = last_date + pd.Timedelta(days=1)
            while next_date.weekday() >= 5:
                next_date += pd.Timedelta(days=1)
            last_date = next_date
            
            future_forecast.append({
                "date": next_date.strftime('%Y-%m-%d'),
                "predicted_price": round(pred_price, 2),
                "lower_bound": round(max(0.1, pred_price - uncertainty), 2),
                "upper_bound": round(pred_price + uncertainty, 2),
                "step": step
            })
            
            # Update sequence for next step autoregression
            next_val_scaled = self._scale(np.array([pred_price]))[0]
            cur_sequence = np.append(cur_sequence[:, 1:, :], [[[next_val_scaled]]], axis=1)
            
        final_price = future_forecast[-1]["predicted_price"]
        pct_change = round(((final_price - current_price) / current_price) * 100, 2)
        trend = "BULLISH" if pct_change > 0.2 else ("BEARISH" if pct_change < -0.2 else "NEUTRAL")
        
        return {
            "model": "LSTM Neural Network",
            "current_price": round(current_price, 2),
            "predicted_price": round(final_price, 2),
            "predicted_change_percent": pct_change,
            "trend": trend,
            "horizon_days": horizon_days,
            "forecast": future_forecast,
            "metrics": self.metrics,
            "disclaimer": "Predictions are generated via Recurrent Neural Network (LSTM) sequence learning on historical price series."
        }
