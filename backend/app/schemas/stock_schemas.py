# Pydantic Schemas for API Requests and Responses
from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Any

class StockItem(BaseModel):
    symbol: str
    name: str
    exchange: str
    currency: str
    price: float
    change_percent: float

class CandlePoint(BaseModel):
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: float
    ma7: Optional[float] = None
    ma21: Optional[float] = None
    ma50: Optional[float] = None

class StockHistoryResponse(BaseModel):
    symbol: str
    name: str
    exchange: str
    currency: str
    period: str
    count: int
    data: List[CandlePoint]

class StockSummaryResponse(BaseModel):
    symbol: str
    name: str
    exchange: str
    currency: str
    current_price: float
    change_absolute: float
    change_percent: float
    day_high: float
    day_low: float
    week_high_52: float
    week_low_52: float
    volume: float
    avg_volume: float
    market_cap: Optional[str] = None
    pe_ratio: Optional[float] = None
    volatility_21: float
    rsi_14: float
    status: str

class PredictionRequest(BaseModel):
    symbol: str = "RELIANCE.NS"
    horizon_days: int = Field(default=7, ge=1, le=30)
    lookback_days: Optional[int] = 365

class ForecastPoint(BaseModel):
    date: str
    predicted_price: float
    lower_bound: float
    upper_bound: float
    step: int

class PredictionResponse(BaseModel):
    model: str
    symbol: str
    current_price: float
    predicted_price: float
    predicted_change_percent: float
    trend: str
    horizon_days: int
    forecast: List[ForecastPoint]
    metrics: Dict[str, Any]
    disclaimer: str

class ModelMetrics(BaseModel):
    model: str
    mae: float
    rmse: float
    r2: float
    mape: float
    directional_accuracy: float
    n_train: Optional[int] = None
    n_test: Optional[int] = None

class ModelComparisonResponse(BaseModel):
    symbol: str
    comparison: Dict[str, Any]
    models: Dict[str, Any]

class FeaturesResponse(BaseModel):
    symbol: str
    raw_features: Dict[str, str]
    engineered_features: Dict[str, str]
    latest_feature_values: Dict[str, Any]
