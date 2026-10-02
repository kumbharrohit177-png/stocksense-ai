# Prediction Orchestration Service
import pandas as pd
from typing import Dict, Any, List
from backend.app.services.data_service import DataService
from backend.ml.model_manager.manager import ModelManager
from backend.app.database import save_prediction

class PredictionService:
    """
    Coordinates data ingestion, ML model training, and trajectory generation.
    """
    
    def __init__(self):
        self.manager = ModelManager()

    def generate_prediction(
        self, 
        model_name: str, 
        symbol: str, 
        horizon_days: int = 7
    ) -> Dict[str, Any]:
        """
        Executes prediction with specified model and symbol.
        """
        df = DataService.fetch_historical_dataframe(symbol, period="2y")
        result = self.manager.predict_model(model_name, symbol, df, horizon_days=horizon_days)
        result["symbol"] = DataService.normalize_symbol(symbol)
        
        # Save prediction event in SQLite
        save_prediction(
            symbol=result["symbol"],
            model_name=result["model"],
            horizon_days=horizon_days,
            current_price=result["current_price"],
            predicted_price=result["predicted_price"],
            trend=result["trend"],
            result_dict=result
        )
        
        return result

    def get_model_benchmarks(self, symbol: str) -> Dict[str, Any]:
        """
        Evaluates Linear Regression, ARIMA, and LSTM simultaneously on actual stock history.
        """
        df = DataService.fetch_historical_dataframe(symbol, period="2y")
        return self.manager.get_or_train_all(symbol, df)
