<div align="center">

# 📈 StockSense AI
### AI-Based Stock Market Trend Prediction System
**An Institutional-Grade Full-Stack Time-Series Intelligence & Forecasting Engine**

[![Python Version](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.13-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4+-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <b>Strictly Compliant with AI & ML Laboratory Manual Requirements</b><br>
  <i>Multivariate Linear Regression • ARIMA(5,1,2) Time-Series • Deep LSTM Recurrent Neural Network • Real Market Data</i>
</p>

---

[Key Features](#-key-features) • [Lab Manual Compliance](#-lab-manual-requirement-compliance) • [System Architecture](#-system-architecture) • [Mathematical Formulations](#-mathematical-formulations) • [Installation](#-installation--quickstart) • [REST API](#-rest-api-documentation) • [Viva Q&A](#-academic-viva--oral-defense-guide)

---

</div>

## 📋 Problem Statement & Executive Summary

Financial market price series are inherently volatile, non-stationary, and prone to stochastic noise, making future trend forecasting a classical benchmark problem in predictive machine learning.

**StockSense AI** is an end-to-end full-stack artificial intelligence and machine learning system engineered to ingest real-time historical market data, compute quantitative technical features, stationarize time-series distributions, and forecast multi-horizon equity trends using three foundational modeling paradigms:

1. **Multivariate Linear Regression:** Baseline supervised statistical learning on engineered momentum, trend, and volatility features.
2. **ARIMA (AutoRegressive Integrated Moving Average):** Classical stochastic time-series modeling capturing stationarized autocorrelation lag structures.
3. **LSTM (Long Short-Term Memory):** Deep Recurrent Neural Network sequence discovery capturing long-range non-linear temporal dependencies.

The user interface is built to exact specifications from **Google Stitch ("StockAI Analytics Platform")**, incorporating real-time OHLCV candlestick visualizations, moving average overlays, probability fan prediction curves, Level-2 depth ladders, and empirical model benchmark comparisons.

---

## 🎯 Lab Manual Requirement Compliance

| Lab Manual Requirement | Required Feature / Algorithm | Implementation Status | Codebase Implementation |
| :--- | :--- | :---: | :--- |
| **Algorithm 1** | Multivariate Linear Regression | ✅ Verified | [`backend/ml/linear_regression/linear_model.py`](backend/ml/linear_regression/linear_model.py) |
| **Algorithm 2** | ARIMA Time-Series Model | ✅ Verified | [`backend/ml/arima/arima_model.py`](backend/ml/arima/arima_model.py) |
| **Algorithm 3** | LSTM Deep Recurrent Neural Network | ✅ Verified | [`backend/ml/lstm/lstm_model.py`](backend/ml/lstm/lstm_model.py) |
| **Technique 1** | Time Series Analysis & ADF Stationarity | ✅ Verified | [`backend/ml/preprocessing/stationarity.py`](backend/ml/preprocessing/stationarity.py) |
| **Technique 2** | Feature Engineering Pipeline | ✅ Verified | [`backend/ml/feature_engineering/technical_indicators.py`](backend/ml/feature_engineering/technical_indicators.py) |
| **Visualization 1** | Candlestick Chart (OHLCV + MAs + Vol) | ✅ Verified | [`src/components/CandlestickChart.jsx`](src/components/CandlestickChart.jsx) |
| **Visualization 2** | Prediction Curve (Actual vs Predicted) | ✅ Verified | [`src/pages/PredictionsPage.jsx`](src/pages/PredictionsPage.jsx) |
| **Evaluation Framework** | MAE, RMSE, R², MAPE, Directional Hit | ✅ Verified | [`backend/ml/evaluation/evaluator.py`](backend/ml/evaluation/evaluator.py) |
| **Data Ingestion** | Real Historical Market Data (`yfinance`) | ✅ Verified | [`backend/app/services/data_service.py`](backend/app/services/data_service.py) |
| **Design System** | Google Stitch Institutional Theme | ✅ Verified | 100% Fidelity to `StockAI Analytics Platform` |

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React + Vite Frontend                           │
│        (Stitch Institutional UI • Dark Photonic Theme • SVG)           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON REST API
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        FastAPI REST Backend                            │
│           (Uvicorn • Pydantic Schemas • SQLite Data Cache)             │
└──────────┬────────────────────────┬──────────────────────────┬─────────┘
           │                        │                          │
           ▼                        ▼                          ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│  Data Ingestion Layer│ │  Feature Engineering │ │  Time Series Engine  │
│  - yfinance (Live)   │ │  - MA 7, 21, 50      │ │  - Chronological     │
│  - SQLite Cache      │ │  - RSI 14, MACD      │ │    Train/Test Split  │
│  - Clean OHLCV       │ │  - Volatility 21, ATR│ │  - ADF Stationarity   │
└──────────┬───────────┘ └──────────┬───────────┘ └──────────┬───────────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                         AI / ML Model Service                          │
│  ┌──────────────────────┬──────────────────────┬────────────────────┐  │
│  │  Linear Regression   │    ARIMA (5, 1, 2)   │    LSTM Network    │  │
│  │  (Scikit-Learn OLS)  │ (Statsmodels Series) │(Recurrent Gating)  │  │
│  └──────────────────────┴──────────────────────┴────────────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Unified Model Evaluation Framework                   │
│   • Mean Absolute Error (MAE)        • Root Mean Squared Error (RMSE)  │
│   • R² Coefficient of Determination  • Mean Abs % Error (MAPE)         │
│   • Directional Trend Accuracy (%)   • 95% Bayesian Confidence Cone    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Feature Engineering & Data Pipeline

To maintain strict chronological integrity and eliminate forward-looking bias (data leakage), all datasets are partitioned chronologically: **80% Training Set**, **20% Out-of-Sample Test Set**.

```
Timeline: |====================== TRAIN (80%) =====================|====== TEST (20%) ======|
No Random Shuffling (Preserves Temporal Order)                     In-Sample -> Out-of-Sample
```

### Feature Specification Table

| Feature Category | Variable Name | Mathematical Formulation | Quantitative Purpose |
| :--- | :--- | :--- | :--- |
| **Raw Market Data** | `Open, High, Low, Close` | Session settlement quotes | Base price vector |
| **Raw Volume** | `Volume` | Total units traded in session | Liquidity and conviction measure |
| **Return** | `Daily_Return` | $\frac{Close_t - Close_{t-1}}{Close_{t-1}}$ | Percentage price velocity |
| **Trend SMA** | `MA_7, MA_21, MA_50` | $\frac{1}{K} \sum_{i=0}^{K-1} Close_{t-i}$ | Short, intermediate, and institutional trend |
| **Trend EMA** | `EMA_12, EMA_26` | $\alpha Close_t + (1-\alpha) EMA_{t-1}$ | Exponentially weighted recent price response |
| **Momentum** | `RSI_14` | $100 - \frac{100}{1 + \frac{\text{Avg Gain}}{\text{Avg Loss}}}$ | Overbought (>70) / Oversold (<30) oscillator |
| **Trend Momentum**| `MACD` | $EMA_{12}(Close) - EMA_{26}(Close)$ | Moving average convergence divergence |
| **Volatility** | `BB_Upper, BB_Lower` | $SMA_{20} \pm 2 \cdot \sigma_{20}$ | Dynamic 2-standard-deviation volatility envelope |
| **Volatility** | `Volatility_21` | $\text{Std}(\text{Returns}_{21}) \times \sqrt{252}$ | Annualized historical price dispersion |
| **Volatility** | `ATR_14` | $\frac{1}{14} \sum \max(H-L, \|H-C_{-1}\|, \|L-C_{-1}\|)$ | Absolute trading range intensity |
| **Supervised Target**| `Next_Close` | $Close_{t+1}$ | Target for supervised next-day projection |

---

## 📐 Mathematical Formulations

### 1. Augmented Dickey-Fuller (ADF) Stationarity Test

The ADF test evaluates whether a time-series possesses a unit root ($\gamma = 0$, non-stationary) versus mean-reverting stationarity ($\gamma < 0$):

$$\Delta y_t = \alpha + \beta t + \gamma y_{t-1} + \sum_{s=1}^p \delta_s \Delta y_{t-s} + \varepsilon_t$$

* **Null Hypothesis ($H_0$):** $\gamma = 0$ (Unit root present, non-stationary).
* **Alternative Hypothesis ($H_1$):** $\gamma < 0$ (Stationary, reject null if $p < 0.05$).

---

### 2. Multivariate Linear Regression

Predicts the next trading day's closing price $\hat{y}_{t+1}$ as a linear combination of standardized engineered technical features:

$$\hat{y}_{t+1} = \beta_0 + \sum_{j=1}^{K} \beta_j X_{t,j} + \epsilon_t$$

Optimized via Ordinary Least Squares (OLS) with $L_2$ Ridge regularization:

$$\min_{\boldsymbol{\beta}} \sum_{i=1}^{N} \left( y_i - \boldsymbol{x}_i^T \boldsymbol{\beta} \right)^2 + \lambda \|\boldsymbol{\beta}\|_2^2$$

---

### 3. ARIMA (AutoRegressive Integrated Moving Average)

For non-stationary series stationarized via differencing $d=1$: $Y'_t = (1 - B)^d Y_t$:

$$Y'_t = c + \sum_{i=1}^p \phi_i Y'_{t-i} + \sum_{j=1}^q \theta_j \epsilon_{t-j} + \epsilon_t$$

Where:
* $p = 5$: Number of autoregressive lag terms.
* $d = 1$: Degree of first-order differencing.
* $q = 2$: Number of lagged moving-average forecast errors.
* $B$: Backshift operator ($B^k Y_t = Y_{t-k}$).

---

### 4. Long Short-Term Memory (LSTM) Recurrent Neural Network

Processes sliding historical sequences of lookback length $L=30$:

$$\begin{aligned}
f_t &= \sigma\left(W_f x_t + U_f h_{t-1} + b_f\right) && \text{(Forget Gate: discards irrelevant past memory)} \\
i_t &= \sigma\left(W_i x_t + U_i h_{t-1} + b_i\right) && \text{(Input Gate: selects new incoming information)} \\
\tilde{C}_t &= \tanh\left(W_c x_t + U_c h_{t-1} + b_c\right) && \text{(Candidate Memory State)} \\
C_t &= f_t \odot C_{t-1} + i_t \odot \tilde{C}_t && \text{(Cell State Vector Update)} \\
o_t &= \sigma\left(W_o x_t + U_o h_{t-1} + b_o\right) && \text{(Output Gate: controls exposed hidden state)} \\
h_t &= o_t \odot \tanh\left(C_t\right) && \text{(Hidden Recurrent State)} \\
\hat{y}_t &= W_y h_t + b_y && \text{(Dense Projection to Future Stock Price)}
\end{aligned}$$

---

### 5. Multi-Step Bayesian Uncertainty Horizon

For future time step $k \in \{1, 2, \dots, H\}$ (where $H \in \{1, 7, 30\}$ days), the 95% confidence bounds expand with the square root of time:

$$\hat{y}_{t+k} \pm 1.96 \cdot \hat{y}_{t+k} \cdot \sigma_{\text{daily}} \cdot \sqrt{k}$$

---

### 6. Model Evaluation Metrics

All models are evaluated on unseen out-of-sample test data using 5 complementary metrics:

$$\text{MAE} = \frac{1}{N} \sum_{i=1}^N \left| y_i - \hat{y}_i \right|$$

$$\text{RMSE} = \sqrt{\frac{1}{N} \sum_{i=1}^N \left( y_i - \hat{y}_i \right)^2}$$

$$R^2 = 1 - \frac{\sum_{i=1}^N \left( y_i - \hat{y}_i \right)^2}{\sum_{i=1}^N \left( y_i - \bar{y} \right)^2}$$

$$\text{MAPE} = \frac{100\%}{N} \sum_{i=1}^N \left| \frac{y_i - \hat{y}_i}{y_i} \right|$$

$$\text{Directional Accuracy} = \frac{100\%}{N} \sum_{i=1}^N \mathbb{I}\left( \text{sgn}\left(y_i - y_{i-1}\right) = \text{sgn}\left(\hat{y}_i - y_{i-1}\right) \right)$$

---

## 💻 Installation & Quickstart

### Prerequisites
* **Python 3.10+** (Tested on Python 3.10, 3.11, 3.12, 3.13)
* **Node.js 18+** & **npm**

### Step 1: Clone Repository
```bash
git clone https://github.com/kumbharrohit177-png/stocksense-ai.git
cd stocksense-ai
```

### Step 2: Launch Backend Server (FastAPI)
```bash
# Install backend Python dependencies
pip install -r backend/requirements.txt

# Start FastAPI server on port 8000
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* **Interactive Swagger UI:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* **Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health)

### Step 3: Launch Frontend Dashboard (React + Vite)
```bash
# In a new terminal window
npm install

# Start Vite dev server on port 3000
npm run dev
```
* **Open Dashboard:** [http://localhost:3000/](http://localhost:3000/)

---

## 🐳 Docker Deployment

Run both the frontend and backend services inside isolated containers:

```bash
docker-compose up --build
```

* **Frontend:** `http://localhost:3000`
* **FastAPI Backend:** `http://localhost:8000`
* **API Documentation:** `http://localhost:8000/docs`

---

## 🌐 REST API Documentation

| Method | Endpoint | Description | Request Body / Parameters | Sample Response |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and model status | None | `{"status": "HEALTHY", "models_available": [...]}` |
| `GET` | `/api/stocks` | List of supported equities | None | `[{"symbol": "RELIANCE.NS", "price": 2847.30}, ...]` |
| `GET` | `/api/stocks/{symbol}/summary` | Live metrics, 52W range, RSI | `symbol` (e.g. `RELIANCE.NS`) | `{"current_price": 2742.26, "volatility_21": 18.2, ...}` |
| `GET` | `/api/stocks/{symbol}/history` | OHLCV candlestick series + MAs | `timeframe`: `1D, 1W, 1M, 3M, 6M, 1Y, 5Y` | `{"count": 90, "data": [{"date": "Oct 02", "open": 2720, ...}]}` |
| `GET` | `/api/stocks/{symbol}/features` | Technical feature dictionary | `symbol` | `{"raw_features": {...}, "engineered_features": {...}}` |
| `POST` | `/api/predict/linear-regression` | Linear Regression forecasting | `{"symbol": "RELIANCE.NS", "horizon_days": 7}` | `{"model": "Linear Regression", "predicted_price": 2779.96, ...}` |
| `POST` | `/api/predict/arima` | ARIMA(5,1,2) time series forecast | `{"symbol": "RELIANCE.NS", "horizon_days": 7}` | `{"model": "ARIMA(5,1,2)", "forecast": [...]}` |
| `POST` | `/api/predict/lstm` | Deep LSTM recurrent inference | `{"symbol": "RELIANCE.NS", "horizon_days": 7}` | `{"model": "LSTM", "forecast": [...], "metrics": {...}}` |
| `POST` | `/api/predict/all` | Parallel multi-model forecast | `{"symbol": "RELIANCE.NS", "horizon_days": 7}` | `{"predictions": {"linear_regression": ..., "arima": ..., "lstm": ...}}` |
| `GET` | `/api/models/{symbol}/evaluation` | Empirical MAE, RMSE, R², MAPE | `symbol` | `{"comparison": {"models": [...]}}` |

---

## 📓 Academic Jupyter Notebooks

Complete notebooks for laboratory demonstrations, model training, and viva evaluation are located in [`notebooks/`](notebooks/):

1. [`notebooks/exploratory_analysis.ipynb`](notebooks/exploratory_analysis.ipynb): Data Ingestion, Stationarity Analysis (ADF test), and Technical Feature Calculations.
2. [`notebooks/linear_regression.ipynb`](notebooks/linear_regression.ipynb): Chronological Train/Test Split, Feature Scaling, OLS/Ridge Fitting, and Metric Evaluation.
3. [`notebooks/arima.ipynb`](notebooks/arima.ipynb): Differencing ($d=1$), ACF/PACF Lag Analysis, Fitting ARIMA(5,1,2), and Out-of-Sample Forecasting.
4. [`notebooks/lstm.ipynb`](notebooks/lstm.ipynb): MinMax Normalization, 30-Day Sequence Creation, Recurrent Gating, Loss History, and Multi-Step Trajectories.

---

## 🎓 Academic Viva & Oral Defense Guide

### Q1: Why must time-series data NEVER be randomly shuffled during Train/Test splitting?
**Answer:** Random shuffling destroys the temporal order of observations and introduces **data leakage** (lookahead bias), where the model trains on future data points to predict past data points. Time-series data must always be partitioned **chronologically** ($T_{\text{train}} \rightarrow T_{\text{test}}$).

### Q2: What is the Augmented Dickey-Fuller (ADF) test and why is it necessary for ARIMA?
**Answer:** ARIMA assumes that the underlying time-series is **weakly stationary** (constant mean, constant variance, and autocovariance independent of time). The ADF test checks for a unit root ($H_0$). If $p \ge 0.05$, the series is non-stationary and must undergo **differencing** ($d \ge 1$) before fitting autoregressive $(p)$ and moving average $(q)$ components.

### Q3: How does LSTM overcome the Vanishing Gradient problem compared to standard RNNs?
**Answer:** Standard Recurrent Neural Networks suffer from exponentially decaying gradients over long sequences. LSTMs introduce an internal **Cell State ($C_t$)** that acts as an error carousel, regulated by three multiplicative gates (**Forget gate $f_t$**, **Input gate $i_t$**, and **Output gate $o_t$**). The additive update mechanism ($C_t = f_t C_{t-1} + i_t \tilde{C}_t$) preserves gradients across extended lookback sequences.

### Q4: Why is RMSE generally preferred over MAE for stock prediction risk management?
**Answer:** RMSE squares the error residuals prior to averaging, thereby penalizing **large outlier prediction errors** much more heavily than MAE. In financial trading, a single catastrophic prediction error carries severe drawdown risk, making RMSE a critical risk metric.

---

## 📁 Repository Directory Structure

```
StockSense-AI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── stocks.py            # Endpoints for stocks, OHLCV history & features
│   │   │   ├── predict.py           # Endpoints for LR, ARIMA, LSTM & all models
│   │   │   └── models.py            # Endpoints for benchmark evaluation
│   │   ├── schemas/
│   │   │   └── stock_schemas.py     # Pydantic validation & response schemas
│   │   ├── services/
│   │   │   ├── data_service.py      # yfinance ingestion & cache manager
│   │   │   └── prediction_service.py# Model execution orchestrator
│   │   ├── database.py              # SQLite database for caching & predictions
│   │   └── main.py                  # FastAPI app with CORS & router mounting
│   ├── ml/
│   │   ├── preprocessing/
│   │   │   ├── data_cleaner.py      # Chronological splitter & cleaner
│   │   │   └── stationarity.py      # Augmented Dickey-Fuller (ADF) analyzer
│   │   ├── feature_engineering/
│   │   │   └── technical_indicators.py # MA, RSI, MACD, Bollinger Bands, ATR
│   │   ├── linear_regression/
│   │   │   └── linear_model.py      # Multivariate Linear Regression engine
│   │   ├── arima/
│   │   │   └── arima_model.py       # ARIMA(5,1,2) time-series engine
│   │   ├── lstm/
│   │   │   └── lstm_model.py        # Vectorized Deep LSTM recurrent engine
│   │   ├── evaluation/
│   │   │   └── evaluator.py         # Unified MAE, RMSE, R², MAPE & DA calculator
│   │   └── model_manager/
│   │       └── manager.py           # Multi-model cache & execution manager
│   ├── data/                        # SQLite storage database
│   ├── saved_models/                # Model parameter checkpoints
│   ├── Dockerfile                   # Backend Docker container
│   └── requirements.txt             # Python dependencies
│
├── src/
│   ├── components/
│   │   ├── Header.jsx               # Navigation ribbon & search trigger
│   │   ├── Sidebar.jsx              # System telemetry & GPU load widget
│   │   ├── Footer.jsx               # Academic footer & disclaimers
│   │   ├── CandlestickChart.jsx     # OHLCV candles + MA overlays + Volume
│   │   ├── PredictionVectorChart.jsx# Actual vs Predicted + 95% Bayesian cone
│   │   ├── OrderBook.jsx            # Level 2 market depth visualizer
│   │   └── CommandPalette.jsx       # Quick stock search modal (⌘K)
│   ├── pages/
│   │   ├── LandingPage.jsx          # Institutional hero & architecture landing
│   │   ├── DashboardPage.jsx        # Real-time stock analysis & indicators
│   │   ├── PredictionsPage.jsx      # Multi-model inference & forecast horizon
│   │   ├── ModelsPage.jsx           # Model benchmark comparison matrix
│   │   └── MethodologyPage.jsx      # Complete pipeline architecture & viva notes
│   ├── services/
│   │   └── api.js                   # Centralized Axios/Fetch REST API client
│   ├── data/
│   │   └── mockData.js              # High-density fallback market dataset
│   ├── App.jsx                      # Main routing & state controller
│   └── main.jsx                     # Vite React entry point
│
├── notebooks/
│   ├── exploratory_analysis.ipynb   # Historical data, ADF test & feature engineering
│   ├── linear_regression.ipynb      # Supervised OLS/Ridge model training & evaluation
│   ├── arima.ipynb                  # ARIMA(5,1,2) time-series forecasting
│   └── lstm.ipynb                   # Deep LSTM sequence neural network
│
├── docker-compose.yml               # Multi-container orchestration
├── Dockerfile.frontend              # NGINX React production container
├── tailwind.config.js               # Google Stitch photonic design tokens
├── vite.config.js                   # Vite bundler configuration
└── README.md                        # Complete project documentation
```

---

## ⚠️ Academic Disclaimer & Limitations

> [!IMPORTANT]
> **StockSense AI** is an academic software engineering and machine learning research project developed in accordance with university AI & ML laboratory requirements.
>
> Stock market asset pricing is governed by complex macroeconomic variables, geopolitical events, sudden liquidity shocks, and non-deterministic market sentiment. **All price targets, probability cones, and trend indicators produced by this system are statistical estimates based on historical observations and do not constitute financial advice, trade recommendations, or guarantees of future investment returns.**

---

<div align="center">
  <sub>Developed for the Academic AI & ML Laboratory • Powered by FastAPI, React, Scikit-Learn, Statsmodels & LSTM</sub>
</div>
