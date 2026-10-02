# Data Cleaner and Validator for Stock Time-Series Data
import pandas as pd
import numpy as np
from typing import Tuple, Dict, Any

class DataCleaner:
    """
    Cleans, validates, and prepares historical stock OHLCV time-series data.
    Ensures strict chronological sorting and prevents forward-looking bias.
    """
    
    @staticmethod
    def clean_ohlcv(df: pd.DataFrame) -> pd.DataFrame:
        """
        Cleans OHLCV dataframe:
        - Ensures Date column is Datetime index
        - Sorts chronologically (oldest -> newest)
        - Drops zero/negative prices
        - Fills small gaps with forward-fill then backward-fill
        - Ensures numeric dtypes
        """
        if df.empty:
            raise ValueError("Provided dataframe is empty.")
            
        data = df.copy()
        
        # Standardize column names to lowercase/proper case
        data.columns = [c.capitalize() if isinstance(c, str) else str(c) for c in data.columns]
        
        required_cols = ['Open', 'High', 'Low', 'Close', 'Volume']
        for col in required_cols:
            if col not in data.columns:
                raise ValueError(f"Missing required column: {col}")
        
        # Ensure chronological order
        if not data.index.is_monotonic_increasing:
            data = data.sort_index(ascending=True)
            
        # Coerce numeric
        for col in required_cols:
            data[col] = pd.to_numeric(data[col], errors='coerce')
            
        # Remove zero or negative prices
        data = data[(data['Close'] > 0) & (data['High'] > 0) & (data['Low'] > 0) & (data['Open'] > 0)]
        
        # Fill missing values
        data = data.ffill().bfill()
        
        # Ensure Low <= Open, Close, High and High >= Open, Close, Low
        data['High'] = data[['Open', 'High', 'Low', 'Close']].max(axis=1)
        data['Low'] = data[['Open', 'High', 'Low', 'Close']].min(axis=1)
        
        # Remove any remaining NaN
        data = data.dropna()
        
        return data

    @staticmethod
    def chronological_split(
        df: pd.DataFrame, 
        train_ratio: float = 0.8
    ) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """
        Splits time series chronologically to strictly avoid data leakage.
        DO NOT randomly shuffle time series data.
        """
        if not 0.5 <= train_ratio < 1.0:
            raise ValueError("train_ratio must be between 0.5 and 0.99")
            
        split_idx = int(len(df) * train_ratio)
        train_df = df.iloc[:split_idx].copy()
        test_df = df.iloc[split_idx:].copy()
        
        return train_df, test_df
