# SQLite Database for Caching Stock Data and Prediction History
import sqlite3
import os
import json
from datetime import datetime
from typing import Optional, Dict, Any, List

DB_PATH = "backend/data/stocksense.db"

def init_db():
    os.makedirs("backend/data", exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. Cached Stock Historical Prices
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS stock_cache (
        symbol TEXT PRIMARY KEY,
        name TEXT,
        exchange TEXT,
        currency TEXT,
        last_updated TEXT,
        data_json TEXT
    )
    """)
    
    # 2. Cached Predictions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS prediction_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        symbol TEXT,
        model_name TEXT,
        horizon_days INTEGER,
        created_at TEXT,
        current_price REAL,
        predicted_price REAL,
        trend TEXT,
        result_json TEXT
    )
    """)
    
    # 3. Model Evaluation Benchmarks
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS model_evaluations (
        symbol TEXT,
        model_name TEXT,
        mae REAL,
        rmse REAL,
        r2 REAL,
        mape REAL,
        directional_accuracy REAL,
        updated_at TEXT,
        PRIMARY KEY (symbol, model_name)
    )
    """)
    
    conn.commit()
    conn.close()

def save_stock_cache(symbol: str, name: str, exchange: str, currency: str, data_json: str):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    cursor.execute("""
    INSERT OR REPLACE INTO stock_cache (symbol, name, exchange, currency, last_updated, data_json)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (symbol.upper(), name, exchange, currency, now, data_json))
    conn.commit()
    conn.close()

def get_stock_cache(symbol: str) -> Optional[Dict[str, Any]]:
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT symbol, name, exchange, currency, last_updated, data_json FROM stock_cache WHERE symbol = ?", (symbol.upper(),))
    row = cursor.fetchone()
    conn.close()
    if row:
        return {
            "symbol": row[0],
            "name": row[1],
            "exchange": row[2],
            "currency": row[3],
            "last_updated": row[4],
            "data": json.loads(row[5])
        }
    return None

def save_prediction(symbol: str, model_name: str, horizon_days: int, current_price: float, predicted_price: float, trend: str, result_dict: Dict[str, Any]):
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    now = datetime.utcnow().isoformat()
    cursor.execute("""
    INSERT INTO prediction_history (symbol, model_name, horizon_days, created_at, current_price, predicted_price, trend, result_json)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (symbol.upper(), model_name, horizon_days, now, current_price, predicted_price, trend, json.dumps(result_dict)))
    conn.commit()
    conn.close()

# Initialize DB when module loaded
init_db()
