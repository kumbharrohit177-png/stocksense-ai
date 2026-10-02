# Unified Evaluation Framework for StockSense AI
import numpy as np
import pandas as pd
from typing import Dict, Any, List

class ModelEvaluator:
    """
    Computes rigorous statistical and machine learning evaluation metrics:
    - MAE (Mean Absolute Error)
    - RMSE (Root Mean Squared Error)
    - R² (Coefficient of Determination)
    - MAPE (Mean Absolute Percentage Error)
    - Directional Accuracy (Hit rate % for price movement direction)
    """

    @staticmethod
    def calculate_metrics(
        y_true: np.ndarray, 
        y_pred: np.ndarray, 
        y_prev: np.ndarray = None
    ) -> Dict[str, float]:
        """
        Calculates all key metrics between actual and predicted vectors.
        """
        y_t = np.asarray(y_true, dtype=np.float64)
        y_p = np.asarray(y_pred, dtype=np.float64)
        
        if len(y_t) == 0 or len(y_p) == 0:
            return {"mae": 0.0, "rmse": 0.0, "r2": 0.0, "mape": 0.0, "directional_accuracy": 0.0}

        mae = float(np.mean(np.abs(y_t - y_p)))
        rmse = float(np.sqrt(np.mean((y_t - y_p) ** 2)))
        
        # R-squared
        ss_tot = np.sum((y_t - np.mean(y_t)) ** 2)
        ss_res = np.sum((y_t - y_p) ** 2)
        r2 = float(1.0 - (ss_res / (ss_tot + 1e-9)))
        
        # MAPE
        mape = float(np.mean(np.abs((y_t - y_p) / (y_t + 1e-9))) * 100)
        
        # Directional Accuracy
        if y_prev is not None and len(y_prev) == len(y_t):
            actual_dir = y_t > y_prev
            pred_dir = y_p > y_prev
            dir_acc = float(np.mean(actual_dir == pred_dir) * 100)
        else:
            if len(y_t) > 1:
                actual_dir = np.diff(y_t) > 0
                pred_dir = np.diff(y_p) > 0
                dir_acc = float(np.mean(actual_dir == pred_dir) * 100)
            else:
                dir_acc = 50.0

        return {
            "mae": round(mae, 2),
            "rmse": round(rmse, 2),
            "r2": round(r2, 4),
            "mape": round(mape, 2),
            "directional_accuracy": round(dir_acc, 2)
        }

    @staticmethod
    def compare_models(evaluations: List[Dict[str, Any]]) -> Dict[str, Any]:
        """
        Aggregates model evaluation results across models for comparative benchmarking.
        """
        return {
            "models": evaluations,
            "evaluation_notice": "Evaluation results depend on the selected stock, date range, features, and test period.",
            "metrics_glossary": {
                "MAE": "Mean Absolute Error: Average magnitude of the errors in price units.",
                "RMSE": "Root Mean Squared Error: Penalizes larger prediction variance.",
                "R2": "R-Squared: Proportion of variance in the stock price explained by the model.",
                "MAPE": "Mean Absolute Percentage Error: Relative percentage difference.",
                "Directional_Accuracy": "Percentage of trading days the model correctly forecasted UP vs DOWN trend."
            }
        }
