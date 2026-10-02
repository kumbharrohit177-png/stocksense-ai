# Feature Engineering Pipeline for StockSense AI
import pandas as pd
import numpy as np
from typing import Dict, List, Any

class FeatureEngineer:
    """
    Computes technical indicators and features for Time Series Machine Learning.
    Clearly separates Raw Features from Engineered Features.
    """

    @staticmethod
    def compute_features(df: pd.DataFrame) -> pd.DataFrame:
        """
        Takes cleaned OHLCV data and adds all engineered technical features.
        """
        data = df.copy()
        
        # 1. Price Returns
        data['Daily_Return'] = data['Close'].pct_change()
        data['Log_Return'] = np.log(data['Close'] / data['Close'].shift(1))
        
        # 2. Moving Averages (Trend indicators)
        data['MA_7'] = data['Close'].rolling(window=7).mean()
        data['MA_21'] = data['Close'].rolling(window=21).mean()
        data['MA_50'] = data['Close'].rolling(window=50).mean()
        data['EMA_12'] = data['Close'].ewm(span=12, adjust=False).mean()
        data['EMA_26'] = data['Close'].ewm(span=26, adjust=False).mean()
        
        # 3. Momentum: Relative Strength Index (RSI 14)
        delta = data['Close'].diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=14).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=14).mean()
        rs = gain / (loss + 1e-9)
        data['RSI_14'] = 100 - (100 / (1 + rs))
        
        # 4. Trend Momentum: MACD (12, 26, 9)
        data['MACD'] = data['EMA_12'] - data['EMA_26']
        data['MACD_Signal'] = data['MACD'].ewm(span=9, adjust=False).mean()
        data['MACD_Hist'] = data['MACD'] - data['MACD_Signal']
        
        # 5. Volatility: Bollinger Bands (20, 2)
        rolling_mean_20 = data['Close'].rolling(window=20).mean()
        rolling_std_20 = data['Close'].rolling(window=20).std()
        data['BB_Middle'] = rolling_mean_20
        data['BB_Upper'] = rolling_mean_20 + (rolling_std_20 * 2)
        data['BB_Lower'] = rolling_mean_20 - (rolling_std_20 * 2)
        data['BB_Bandwidth'] = (data['BB_Upper'] - data['BB_Lower']) / (data['BB_Middle'] + 1e-9)
        
        # 6. Volatility: Rolling Annualized Volatility (21 days)
        data['Volatility_21'] = data['Daily_Return'].rolling(window=21).std() * np.sqrt(252)
        
        # 7. Volatility: Average True Range (ATR 14)
        high_low = data['High'] - data['Low']
        high_close = (data['High'] - data['Close'].shift()).abs()
        low_close = (data['Low'] - data['Close'].shift()).abs()
        true_range = pd.concat([high_low, high_close, low_close], axis=1).max(axis=1)
        data['ATR_14'] = true_range.rolling(window=14).mean()
        
        # 8. Volume Dynamics
        data['Volume_MA_20'] = data['Volume'].rolling(window=20).mean()
        data['Volume_Ratio'] = data['Volume'] / (data['Volume_MA_20'] + 1e-9)
        
        # 9. Lagged Features (1, 2, 3 days ago)
        data['Close_Lag_1'] = data['Close'].shift(1)
        data['Close_Lag_2'] = data['Close'].shift(2)
        data['Close_Lag_3'] = data['Close'].shift(3)
        data['Return_Lag_1'] = data['Daily_Return'].shift(1)
        
        # 10. Supervised Targets (Next Day Close & Trend Direction)
        data['Next_Close'] = data['Close'].shift(-1)
        data['Target_Return'] = (data['Next_Close'] - data['Close']) / data['Close']
        data['Target_Direction'] = (data['Next_Close'] > data['Close']).astype(int)
        
        return data

    @staticmethod
    def get_feature_metadata() -> Dict[str, Any]:
        """
        Returns documentation explaining each raw and engineered feature.
        """
        return {
            "raw_features": {
                "Open": "Opening market price of the security on given trading session",
                "High": "Maximum price reached during the trading session",
                "Low": "Minimum price reached during the trading session",
                "Close": "Final settlement price at market close",
                "Volume": "Total number of shares/units traded"
            },
            "engineered_features": {
                "Daily_Return": "Percentage daily price change (Close_t - Close_t-1) / Close_t-1",
                "MA_7": "7-day short-term Simple Moving Average (fast trend)",
                "MA_21": "21-day intermediate Simple Moving Average (medium trend)",
                "MA_50": "50-day institutional Simple Moving Average (long-term regime)",
                "EMA_12": "12-day Exponential Moving Average (gives higher weight to recent prices)",
                "EMA_26": "26-day Exponential Moving Average",
                "RSI_14": "14-day Relative Strength Index (0-100 oscillator for overbought/oversold states)",
                "MACD": "Moving Average Convergence Divergence line (EMA_12 - EMA_26)",
                "MACD_Signal": "9-day EMA of the MACD line",
                "MACD_Hist": "Difference between MACD and MACD Signal line",
                "BB_Upper": "Upper Bollinger Band (20-day SMA + 2 Standard Deviations)",
                "BB_Lower": "Lower Bollinger Band (20-day SMA - 2 Standard Deviations)",
                "Volatility_21": "Annualized rolling standard deviation of daily returns over 21 trading days",
                "ATR_14": "14-day Average True Range measuring absolute market volatility",
                "Volume_Ratio": "Ratio of current volume to 20-day rolling average volume"
            }
        }
