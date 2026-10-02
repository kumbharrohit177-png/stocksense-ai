# Script to create the academic Jupyter notebooks in standard JSON format
import json
import os

os.makedirs("notebooks", exist_ok=True)

def create_notebook(filename, cells):
    nb = {
        "cells": cells,
        "metadata": {
            "kernelspec": {
                "display_name": "Python 3",
                "language": "python",
                "name": "python3"
            },
            "language_info": {
                "name": "python",
                "version": "3.13"
            }
        },
        "nbformat": 4,
        "nbformat_minor": 5
    }
    with open(f"notebooks/{filename}", "w", encoding="utf-8") as f:
        json.dump(nb, f, indent=2)
    print(f"Created notebooks/{filename}")

# 1. Exploratory Analysis Notebook
cells_eda = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# StockSense AI - Exploratory Data Analysis & Feature Engineering\n",
            "**Academic Title:** AI-Based Stock Market Trend Prediction System  \n",
            "**Lab Manual Focus:** Historical Data Ingestion, Stationarity Analysis (ADF), and Technical Indicators."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 1,
        "metadata": {},
        "outputs": [],
        "source": [
            "import yfinance as yf\n",
            "import pandas as pd\n",
            "import numpy as np\n",
            "import matplotlib.pyplot as plt\n",
            "from backend.ml.preprocessing.data_cleaner import DataCleaner\n",
            "from backend.ml.preprocessing.stationarity import StationarityAnalyzer\n",
            "from backend.ml.feature_engineering.technical_indicators import FeatureEngineer\n",
            "\n",
            "# 1. Download Real Historical Stock Data\n",
            "symbol = 'RELIANCE.NS'\n",
            "df = yf.download(symbol, period='2y', interval='1d')\n",
            "clean_df = DataCleaner.clean_ohlcv(df)\n",
            "print('Loaded Clean Dataset Shape:', clean_df.shape)\n",
            "clean_df.head()"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 2,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 2. Stationarity Analysis (Augmented Dickey-Fuller Test)\n",
            "adf_raw = StationarityAnalyzer.adf_test(clean_df['Close'])\n",
            "print('ADF Test on Raw Close Price:', adf_raw)\n",
            "\n",
            "diff_series = clean_df['Close'].diff().dropna()\n",
            "adf_diff = StationarityAnalyzer.adf_test(diff_series)\n",
            "print('ADF Test on 1st Differenced Series:', adf_diff)"
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 3,
        "metadata": {},
        "outputs": [],
        "source": [
            "# 3. Compute Engineered Technical Indicators\n",
            "feat_df = FeatureEngineer.compute_features(clean_df).dropna()\n",
            "print('Engineered Features Matrix Shape:', feat_df.shape)\n",
            "print('Available Feature Columns:', list(feat_df.columns))\n",
            "feat_df[['Close', 'MA_7', 'MA_21', 'MA_50', 'RSI_14', 'MACD', 'Volatility_21']].tail()"
        ]
    }
]
create_notebook("exploratory_analysis.ipynb", cells_eda)

# 2. Linear Regression Notebook
cells_lr = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# StockSense AI - Linear Regression Model\n",
            "**Lab Manual Focus:** Feature Scaling, Chronological Split (80/20), Fitting OLS/Ridge, and Test Metric Evaluation (MAE, RMSE, R²)."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 1,
        "metadata": {},
        "outputs": [],
        "source": [
            "import yfinance as yf\n",
            "import pandas as pd\n",
            "from backend.ml.linear_regression.linear_model import LinearRegressionPredictor\n",
            "from backend.app.services.data_service import DataService\n",
            "\n",
            "# Load historical data\n",
            "symbol = 'RELIANCE.NS'\n",
            "df = DataService.fetch_historical_dataframe(symbol, period='2y')\n",
            "\n",
            "# Train & Evaluate Model\n",
            "lr_model = LinearRegressionPredictor(alpha=1.0)\n",
            "eval_result = lr_model.train_and_evaluate(df, train_ratio=0.8)\n",
            "\n",
            "print('=== LINEAR REGRESSION TEST METRICS ===')\n",
            "for k, v in eval_result['metrics'].items():\n",
            "    print(f'{k}: {v}')\n",
            "\n",
            "# Generate 7-day Future Forecast\n",
            "forecast = lr_model.predict_future(df, horizon_days=7)\n",
            "print('\\nPredicted Target Price (T+7):', forecast['predicted_price'])\n",
            "print('Predicted Movement:', forecast['predicted_change_percent'], '% (', forecast['trend'], ')')\n",
            "pd.DataFrame(forecast['forecast'])"
        ]
    }
]
create_notebook("linear_regression.ipynb", cells_lr)

# 3. ARIMA Notebook
cells_arima = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# StockSense AI - ARIMA Time-Series Model\n",
            "**Lab Manual Focus:** AutoRegressive Integrated Moving Average ARIMA(5,1,2), In-Sample Testing, and Out-of-Sample Confidence Horizons."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 1,
        "metadata": {},
        "outputs": [],
        "source": [
            "import pandas as pd\n",
            "from backend.ml.arima.arima_model import ARIMAPredictor\n",
            "from backend.app.services.data_service import DataService\n",
            "\n",
            "# Load Historical Series\n",
            "symbol = 'RELIANCE.NS'\n",
            "df = DataService.fetch_historical_dataframe(symbol, period='2y')\n",
            "\n",
            "# Fit ARIMA(5, 1, 2) on Chronological Split\n",
            "arima_model = ARIMAPredictor(order=(5, 1, 2))\n",
            "eval_result = arima_model.train_and_evaluate(df, train_ratio=0.8)\n",
            "\n",
            "print('=== ARIMA TEST EVALUATION METRICS ===')\n",
            "for k, v in eval_result['metrics'].items():\n",
            "    print(f'{k}: {v}')\n",
            "\n",
            "# 7-Day Out-of-sample Forecast\n",
            "forecast = arima_model.predict_future(df, horizon_days=7)\n",
            "print('\\nARIMA Forecast Horizon (7 Days):')\n",
            "pd.DataFrame(forecast['forecast'])"
        ]
    }
]
create_notebook("arima.ipynb", cells_arima)

# 4. LSTM Notebook
cells_lstm = [
    {
        "cell_type": "markdown",
        "metadata": {},
        "source": [
            "# StockSense AI - Long Short-Term Memory (LSTM) Deep Learning Model\n",
            "**Lab Manual Focus:** Normalization, 30-day Sliding Lookback Window, Recurrent Gating, Inverse Transformation, and Future Multi-Step Projection."
        ]
    },
    {
        "cell_type": "code",
        "execution_count": 1,
        "metadata": {},
        "outputs": [],
        "source": [
            "import pandas as pd\n",
            "from backend.ml.lstm.lstm_model import LSTMPredictor\n",
            "from backend.app.services.data_service import DataService\n",
            "\n",
            "# Load Data\n",
            "symbol = 'RELIANCE.NS'\n",
            "df = DataService.fetch_historical_dataframe(symbol, period='2y')\n",
            "\n",
            "# Initialize & Train LSTM Network\n",
            "lstm_model = LSTMPredictor(lookback_window=30, hidden_units=32, epochs=25, learning_rate=0.01)\n",
            "eval_result = lstm_model.train_and_evaluate(df, train_ratio=0.8)\n",
            "\n",
            "print('=== LSTM TEST EVALUATION METRICS ===')\n",
            "for k, v in eval_result['metrics'].items():\n",
            "    print(f'{k}: {v}')\n",
            "\n",
            "# Generate Recursive Trajectory\n",
            "forecast = lstm_model.predict_future(df, horizon_days=7)\n",
            "print('\\nLSTM Predicted 7-Day Target:', forecast['predicted_price'])\n",
            "print('Predicted Trend Direction:', forecast['trend'])\n",
            "pd.DataFrame(forecast['forecast'])"
        ]
    }
]
create_notebook("lstm.ipynb", cells_lstm)
print('All 4 academic notebooks generated successfully!')
