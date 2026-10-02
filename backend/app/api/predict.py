# Prediction API Router
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from backend.app.schemas.stock_schemas import PredictionRequest, PredictionResponse
from backend.app.services.prediction_service import PredictionService

router = APIRouter(prefix="/api/predict", tags=["AI/ML Predictions"])
prediction_service = PredictionService()

@router.post("/linear-regression", response_model=PredictionResponse)
def predict_linear_regression(req: PredictionRequest):
    """Execute Linear Regression forecasting on engineered technical features."""
    try:
        return prediction_service.generate_prediction("linear_regression", req.symbol, req.horizon_days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Linear Regression training/forecast error: {str(e)}")

@router.post("/arima", response_model=PredictionResponse)
def predict_arima(req: PredictionRequest):
    """Execute ARIMA(5,1,2) time-series forecasting with stationary differencing."""
    try:
        return prediction_service.generate_prediction("arima", req.symbol, req.horizon_days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ARIMA forecasting error: {str(e)}")

@router.post("/lstm", response_model=PredictionResponse)
def predict_lstm(req: PredictionRequest):
    """Execute LSTM Recurrent Neural Network sequence prediction."""
    try:
        return prediction_service.generate_prediction("lstm", req.symbol, req.horizon_days)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"LSTM training/inference error: {str(e)}")

@router.post("/all")
def predict_all_models(req: PredictionRequest):
    """Run all 3 models simultaneously and return side-by-side trajectories."""
    try:
        lr = prediction_service.generate_prediction("linear_regression", req.symbol, req.horizon_days)
        arima = prediction_service.generate_prediction("arima", req.symbol, req.horizon_days)
        lstm = prediction_service.generate_prediction("lstm", req.symbol, req.horizon_days)
        
        return {
            "symbol": req.symbol,
            "horizon_days": req.horizon_days,
            "predictions": {
                "linear_regression": lr,
                "arima": arima,
                "lstm": lstm
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Multi-model execution error: {str(e)}")
