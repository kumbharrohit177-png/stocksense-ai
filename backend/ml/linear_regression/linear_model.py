# Linear Regression Model for Stock Trend Prediction
import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge, LinearRegression
from sklearn.preprocessing import StandardScaler
from typing import Dict, Any, List, Tuple
from backend.ml.feature_engineering.technical_indicators import FeatureEngineer
from backend.ml.preprocessing.data_cleaner import DataCleaner

class LinearRegressionPredictor:
    """
    Linear Regression Model for Stock Trend and Price Forecasting.
    Uses chronological train/test splitting, engineered lag features,
    and multi-step recursive projection for 1, 7, and 30-day forecast horizons.
    """

    FEATURE_COLS = [
        'Close', 'Open', 'High', 'Low', 'Volume', 'Daily_Return',
        'MA_7', 'MA_21', 'MA_50', 'EMA_12', 'EMA_26',
        'RSI_14', 'MACD', 'BB_Upper', 'BB_Lower',
        'Volatility_21', 'ATR_14', 'Close_Lag_1', 'Close_Lag_2'
    ]

    def __init__(self, alpha: float = 1.0):
        self.scaler = StandardScaler()
        self.model = Ridge(alpha=alpha) if alpha > 0 else LinearRegression()
        self.feature_names = self.FEATURE_COLS
        self.is_trained = False
        self.train_metrics = {}
        self.test_metrics = {}
        self.coefficients = {}

    def train_and_evaluate(
        self, 
        df: pd.DataFrame, 
        train_ratio: float = 0.8
    ) -> Dict[str, Any]:
        """
        Trains Linear Regression on chronological split, evaluates on test set.
        """
        feat_df = FeatureEngineer.compute_features(df).dropna()
        if len(feat_df) < 50:
            raise ValueError("Insufficient historical data points for training (minimum 50 required).")

        train_df, test_df = DataCleaner.chronological_split(feat_df, train_ratio=train_ratio)
        
        X_train = train_df[self.FEATURE_COLS].values
        y_train = train_df['Next_Close'].values
        
        X_test = test_df[self.FEATURE_COLS].values
        y_test = test_df['Next_Close'].values
        
        # Fit scaler on training data only to avoid leakage
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model.fit(X_train_scaled, y_train)
        self.is_trained = True
        
        # Test predictions
        y_pred_test = self.model.predict(X_test_scaled)
        
        # Calculate Metrics
        mae = float(np.mean(np.abs(y_test - y_pred_test)))
        rmse = float(np.sqrt(np.mean((y_test - y_pred_test) ** 2)))
        ss_tot = np.sum((y_test - np.mean(y_test)) ** 2)
        ss_res = np.sum((y_test - y_pred_test) ** 2)
        r2 = float(1 - (ss_res / (ss_tot + 1e-9)))
        mape = float(np.mean(np.abs((y_test - y_pred_test) / (y_test + 1e-9))) * 100)
        
        # Directional accuracy
        actual_dir = (y_test > test_df['Close'].values).astype(int)
        pred_dir = (y_pred_test > test_df['Close'].values).astype(int)
        dir_acc = float(np.mean(actual_dir == pred_dir) * 100)
        
        self.test_metrics = {
            "model": "Linear Regression",
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "r2": round(r2, 4),
            "mape": round(mape, 2),
            "directional_accuracy": round(dir_acc, 2),
            "n_train": len(train_df),
            "n_test": len(test_df)
        }
        
        # Feature importances (normalized coefficients)
        coefs = self.model.coef_
        total_mag = np.sum(np.abs(coefs)) + 1e-9
        self.coefficients = {
            feat: round(float(c / total_mag * 100), 2)
            for feat, c in zip(self.FEATURE_COLS, coefs)
        }
        
        # Format evaluation curve for visualization
        test_dates = [d.strftime('%Y-%m-%d') if hasattr(d, 'strftime') else str(d) for d in test_df.index]
        actual_vs_pred = [
            {
                "date": date,
                "actual": round(float(act), 2),
                "predicted": round(float(pred), 2),
                "error": round(float(pred - act), 2)
            }
            for date, act, pred in zip(test_dates, y_test, y_pred_test)
        ]
        
        return {
            "metrics": self.test_metrics,
            "coefficients": self.coefficients,
            "test_curve": actual_vs_pred
        }

    def predict_future(
        self, 
        df: pd.DataFrame, 
        horizon_days: int = 7
    ) -> Dict[str, Any]:
        """
        Projects future stock prices for a specified horizon (1, 7, 30 days)
        using multi-step recursive feature updating.
        """
        if not self.is_trained:
            self.train_and_evaluate(df)
            
        feat_df = FeatureEngineer.compute_features(df).dropna()
        latest_row = feat_df.iloc[-1].copy()
        current_price = float(latest_row['Close'])
        
        future_predictions = []
        sim_df = df.copy()
        
        last_date = sim_df.index[-1]
        
        for step in range(1, horizon_days + 1):
            # Recalculate features on dynamic dataframe
            feat_dyn = FeatureEngineer.compute_features(sim_df).dropna()
            cur_feats = feat_dyn.iloc[-1][self.FEATURE_COLS].values.reshape(1, -1)
            cur_feats_scaled = self.scaler.transform(cur_feats)
            
            pred_close = float(self.model.predict(cur_feats_scaled)[0])
            
            # Prevent unrealistic negative prices
            pred_close = max(pred_close, current_price * 0.5)
            
            # Next trading date (skip weekends)
            next_date = last_date + pd.Timedelta(days=1)
            while next_date.weekday() >= 5:
                next_date += pd.Timedelta(days=1)
            last_date = next_date
            
            # Create synthetic future row to feed into recursive features
            new_row = pd.DataFrame([{
                'Open': sim_df.iloc[-1]['Close'],
                'High': max(pred_close, sim_df.iloc[-1]['Close']) * 1.002,
                'Low': min(pred_close, sim_df.iloc[-1]['Close']) * 0.998,
                'Close': pred_close,
                'Volume': sim_df['Volume'].mean()
            }], index=[next_date])
            
            sim_df = pd.concat([sim_df, new_row])
            
            # Uncertainty envelope (grows with square root of time step)
            volatility = float(latest_row.get('Volatility_21', 0.20) / np.sqrt(252))
            uncertainty = pred_close * volatility * np.sqrt(step) * 1.96
            
            future_predictions.append({
                "date": next_date.strftime('%Y-%m-%d'),
                "predicted_price": round(pred_close, 2),
                "upper_bound": round(pred_close + uncertainty, 2),
                "lower_bound": round(max(0.1, pred_close - uncertainty), 2),
                "step": step
            })
            
        final_price = future_predictions[-1]["predicted_price"]
        pct_change = round(((final_price - current_price) / current_price) * 100, 2)
        trend = "BULLISH" if pct_change > 0.2 else ("BEARISH" if pct_change < -0.2 else "NEUTRAL")
        
        return {
            "model": "Linear Regression",
            "current_price": round(current_price, 2),
            "predicted_price": round(final_price, 2),
            "predicted_change_percent": pct_change,
            "trend": trend,
            "horizon_days": horizon_days,
            "forecast": future_predictions,
            "metrics": self.test_metrics,
            "disclaimer": "Predictions are model-generated estimates based on historical statistical regressions and do not constitute financial advice."
        }
