# Stocks API Router
from fastapi import APIRouter, HTTPException, Query
from typing import List, Dict, Any
from backend.app.services.data_service import DataService
from backend.app.schemas.stock_schemas import (
    StockSummaryResponse, StockHistoryResponse, FeaturesResponse, StockItem
)
from backend.ml.feature_engineering.technical_indicators import FeatureEngineer

router = APIRouter(prefix="/api/stocks", tags=["Stocks & Historical Data"])

@router.get("", response_model=List[StockItem])
def get_stocks():
    """List all supported stock securities and ticker metadata."""
    return DataService.get_available_stocks()

@router.get("/{symbol}/summary", response_model=StockSummaryResponse)
def get_stock_summary(symbol: str):
    """Retrieve executive market summary and latest technical indicators."""
    try:
        return DataService.get_stock_summary(symbol)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to retrieve summary for {symbol}: {str(e)}")

@router.get("/{symbol}/history", response_model=StockHistoryResponse)
def get_stock_history(
    symbol: str, 
    timeframe: str = Query(default="1Y", description="Timeframe filter: 1D, 1W, 1M, 3M, 6M, 1Y, 5Y")
):
    """Retrieve OHLCV candlestick series with moving average overlays."""
    try:
        return DataService.get_candlestick_data(symbol, timeframe=timeframe)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch historical series for {symbol}: {str(e)}")

@router.get("/{symbol}/features", response_model=FeaturesResponse)
def get_stock_features(symbol: str):
    """Retrieve raw vs engineered feature documentation and current values."""
    try:
        df = DataService.fetch_historical_dataframe(symbol, period="6mo")
        feat_df = FeatureEngineer.compute_features(df).dropna()
        metadata = FeatureEngineer.get_feature_metadata()
        latest_vals = {col: round(float(feat_df.iloc[-1][col]), 4) for col in feat_df.columns if pd_is_num(feat_df[col])}
        
        return {
            "symbol": DataService.normalize_symbol(symbol),
            "raw_features": metadata["raw_features"],
            "engineered_features": metadata["engineered_features"],
            "latest_feature_values": latest_vals
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to extract features for {symbol}: {str(e)}")

def pd_is_num(series):
    import numpy as np
    return np.issubdtype(series.dtype, np.number)
