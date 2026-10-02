# Model Manager & Cache Controller
import os
import json
import pickle
import pandas as pd
from typing import Dict, Any, Optional
from backend.ml.linear_regression.linear_model import LinearRegressionPredictor
from backend.ml.arima.arima_model import ARIMAPredictor
from backend.ml.lstm.lstm_model import LSTMPredictor
from backend.ml.evaluation.evaluator import ModelEvaluator

class ModelManager:
    """
    Coordinates training, caching, and inference across all three algorithms:
    - Linear Regression
    - ARIMA
    - LSTM
    """
    
    def __init__(self, saved_models_dir: str = "backend/saved_models"):
        self.saved_dir = saved_models_dir
        os.makedirs(self.saved_dir, exist_ok=True)
        self.memory_cache = {}

    def get_or_train_all(self, symbol: str, df: pd.DataFrame) -> Dict[str, Any]:
        """
        Trains and evaluates all three models on the given dataset.
        Returns metrics and test curves for all models.
        """
        cache_key = f"{symbol}_all_models"
        
        lr = LinearRegressionPredictor()
        lr_res = lr.train_and_evaluate(df)
        
        arima = ARIMAPredictor(order=(5, 1, 2))
        arima_res = arima.train_and_evaluate(df)
        
        lstm = LSTMPredictor(lookback_window=30, hidden_units=32, epochs=25)
        lstm_res = lstm.train_and_evaluate(df)
        
        comparison = ModelEvaluator.compare_models([
            lr_res["metrics"],
            arima_res["metrics"],
            lstm_res["metrics"]
        ])
        
        result = {
            "symbol": symbol,
            "comparison": comparison,
            "models": {
                "linear_regression": lr_res,
                "arima": arima_res,
                "lstm": lstm_res
            }
        }
        
        self.memory_cache[cache_key] = result
        return result

    def predict_model(
        self, 
        model_name: str, 
        symbol: str, 
        df: pd.DataFrame, 
        horizon_days: int = 7
    ) -> Dict[str, Any]:
        """
        Executes future forecasting with the selected model.
        """
        name_clean = model_name.lower().replace("-", "_").replace(" ", "_")
        
        if "linear" in name_clean:
            model = LinearRegressionPredictor()
            return model.predict_future(df, horizon_days=horizon_days)
        elif "arima" in name_clean:
            model = ARIMAPredictor(order=(5, 1, 2))
            return model.predict_future(df, horizon_days=horizon_days)
        elif "lstm" in name_clean:
            model = LSTMPredictor(lookback_window=30, hidden_units=32, epochs=25)
            return model.predict_future(df, horizon_days=horizon_days)
        else:
            raise ValueError(f"Unsupported model: {model_name}. Choose from 'linear_regression', 'arima', 'lstm'.")
