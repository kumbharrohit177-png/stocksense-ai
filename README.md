# StockSense AI
**Academic Project Title:** AI-Based Stock Market Trend Prediction System  
**Lab Manual Reference:** AI & ML Laboratory Practice — Time-Series Forecasting & Supervised Learning

---

## 📋 Executive Summary & Problem Statement

Financial market participants and quantitative analysts face challenges predicting future price trajectories due to high market volatility, non-linear dependencies, and non-stationary stochastic noise. 

**StockSense AI** is an end-to-end full-stack artificial intelligence and machine learning platform designed to ingest real historical market data, engineer quantitative technical features, stationarize time-series distributions, and forecast future equity trends using three distinct modeling paradigms:
1. **Multivariate Linear Regression** (Baseline Supervised Statistical Learning)
2. **ARIMA (AutoRegressive Integrated Moving Average)** (Classical Stochastic Time-Series)
3. **LSTM (Long Short-Term Memory)** (Deep Recurrent Neural Sequence Learning)

The user interface is faithfully built using the institutional design specifications from **Google Stitch ("StockAI Analytics Platform")**, incorporating real-time OHLCV candlestick visualizations, moving average overlays, probability fan prediction curves, dynamic order books, and empirical model benchmark comparisons.

---

## 🎯 Lab Manual Requirement Compliance Checklist

| Manual Requirement | Required Feature / Algorithm | Implementation Status | Location in Codebase |
| :--- | :--- | :---: | :--- |
| **Algorithm 1** | Multivariate Linear Regression | ✅ Implemented | [`backend/ml/linear_regression/linear_model.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/linear_regression/linear_model.py) |
| **Algorithm 2** | ARIMA Time Series Model | ✅ Implemented | [`backend/ml/arima/arima_model.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/arima/arima_model.py) |
| **Algorithm 3** | LSTM Neural Network | ✅ Implemented | [`backend/ml/lstm/lstm_model.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/lstm/lstm_model.py) |
| **Technique 1** | Time Series Analysis & Stationarity | ✅ Implemented | [`backend/ml/preprocessing/stationarity.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/preprocessing/stationarity.py) |
| **Technique 2** | Feature Engineering | ✅ Implemented | [`backend/ml/feature_engineering/technical_indicators.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/feature_engineering/technical_indicators.py) |
| **Visualization 1** | Candlestick Chart (OHLCV + MAs + Vol) | ✅ Implemented | [`src/components/CandlestickChart.jsx`](file:///c:/Users/kumbh/Desktop/StockSense-AI/src/components/CandlestickChart.jsx) |
| **Visualization 2** | Prediction Curve (Actual vs Predicted) | ✅ Implemented | [`src/pages/PredictionsPage.jsx`](file:///c:/Users/kumbh/Desktop/StockSense-AI/src/pages/PredictionsPage.jsx) |
| **Model Evaluation** | MAE, RMSE, R², MAPE, Directional Acc | ✅ Implemented | [`backend/ml/evaluation/evaluator.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/ml/evaluation/evaluator.py) |
| **Real Market Data** | Live Historical Feeds (NSE / NASDAQ) | ✅ Implemented | [`backend/app/services/data_service.py`](file:///c:/Users/kumbh/Desktop/StockSense-AI/backend/app/services/data_service.py) |
| **UI/UX Source of Truth**| Google Stitch Institutional Theme | ✅ Implemented | Zero redesign; 100% fidelity to `StockAI Analytics Platform` |

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        React + Vite Frontend                           │
│     (Google Stitch Design • Dark Photonic Theme • Recharts/SVG)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ REST API (JSON / Axios / Fetch)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        FastAPI REST Backend                            │
│           (CORS Middleware • Pydantic Schemas • Uvicorn)               │
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

## 🧠 Machine Learning Methodology

### 1. Data Pipeline & Preprocessing
* **Strict Chronological Splitting:** To avoid data leakage, historical datasets are split chronologically ($80\%$ train, $20\%$ out-of-sample test). Random shuffling is explicitly avoided.
* **Stationarity & Differencing:** The Augmented Dickey-Fuller (ADF) test evaluates the null hypothesis of a unit root ($p < 0.05$ indicates stationarity). Price series undergo first-order differencing ($d=1$) for ARIMA convergence.

### 2. Feature Engineering
* **Raw Features:** `Open`, `High`, `Low`, `Close`, `Volume`.
* **Engineered Signals:**
  * **Trend Moving Averages:** Simple Moving Averages (`MA_7`, `MA_21`, `MA_50`) and Exponential Moving Averages (`EMA_12`, `EMA_26`).
  * **Momentum:** 14-period Relative Strength Index (`RSI_14`) and Moving Average Convergence Divergence (`MACD` with 9-day signal line).
  * **Volatility:** 21-day annualized rolling volatility, 20-period Bollinger Bands (`BB_Upper`, `BB_Lower`), and 14-day Average True Range (`ATR_14`).
  * **Temporal Lags:** 1, 2, and 3-day lagged close prices and return rates.

### 3. Model Mathematical Formulations

#### A. Linear Regression
Estimates the next closing price $\hat{y}_{t+1}$ as a linear combination of standardized engineered features:
$$\hat{y}_{t+1} = \beta_0 + \sum_{j=1}^{K} \beta_j X_{t,j}$$

#### B. ARIMA(p, d, q)
Models the differenced stationary series $Y'_t = (1 - B)^d Y_t$:
$$Y'_t = c + \sum_{i=1}^p \phi_i Y'_{t-i} + \sum_{j=1}^q \theta_j \epsilon_{t-j} + \epsilon_t$$
Default configuration: $p=5$ (autoregressive lags), $d=1$ (first difference), $q=2$ (moving average error terms).

#### C. Long Short-Term Memory (LSTM) Network
Processes sliding sequences of lookback length $L=30$:
$$f_t = \sigma(W_f x_t + U_f h_{t-1} + b_f) \quad \text{(Forget Gate)}$$
$$i_t = \sigma(W_i x_t + U_i h_{t-1} + b_i) \quad \text{(Input Gate)}$$
$$\tilde{C}_t = \tanh(W_c x_t + U_c h_{t-1} + b_c) \quad \text{(Candidate State)}$$
$$C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t \quad \text{(Cell State)}$$
$$o_t = \sigma(W_o x_t + U_o h_{t-1} + b_o) \quad \text{(Output Gate)}$$
$$h_t = o_t \odot \tanh(C_t) \quad \text{(Hidden State)}$$
$$\hat{y}_t = W_y h_t + b_y \quad \text{(Dense Projection)}$$

---

## 📊 Model Evaluation & Metrics

The system calculates 5 statistical and directional performance metrics on the unseen test set:

1. **Mean Absolute Error (MAE):**
   $$\text{MAE} = \frac{1}{N} \sum_{i=1}^N |y_i - \hat{y}_i|$$
2. **Root Mean Squared Error (RMSE):**
   $$\text{RMSE} = \sqrt{\frac{1}{N} \sum_{i=1}^N (y_i - \hat{y}_i)^2}$$
3. **Coefficient of Determination ($R^2$):**
   $$R^2 = 1 - \frac{\sum_{i=1}^N (y_i - \hat{y}_i)^2}{\sum_{i=1}^N (y_i - \bar{y})^2}$$
4. **Mean Absolute Percentage Error (MAPE):**
   $$\text{MAPE} = \frac{100\%}{N} \sum_{i=1}^N \left| \frac{y_i - \hat{y}_i}{y_i} \right|$$
5. **Directional Accuracy (%):**
   $$\text{DA} = \frac{100\%}{N} \sum_{i=1}^N \mathbb{I}\left( \text{sgn}(y_i - y_{i-1}) = \text{sgn}(\hat{y}_i - y_{i-1}) \right)$$

---

## 🚀 Installation & Local Execution

### Prerequisites
* **Python 3.10+**
* **Node.js 18+** and **npm**

### 1. Run Backend Server (FastAPI)
```bash
# Navigate to project root
cd StockSense-AI

# Install backend dependencies
pip install -r backend/requirements.txt

# Start FastAPI server on port 8000
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```
* Interactive API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`
* Health Check Endpoint: `http://127.0.0.1:8000/api/health`

### 2. Run Frontend Dashboard (React + Vite)
```bash
# In a new terminal window at project root
npm install

# Start Vite development server
npm run dev
```
* Open in browser: `http://localhost:3000/`

---

## 🐳 Docker Deployment

To run the entire full-stack application inside isolated containers:
```bash
docker-compose up --build
```
* **Frontend Web App:** `http://localhost:3000`
* **FastAPI Backend:** `http://localhost:8000`
* **API Documentation:** `http://localhost:8000/docs`

---

## 🌐 REST API Specifications

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and models status |
| `GET` | `/api/stocks` | Available stock listings and metadata |
| `GET` | `/api/stocks/{symbol}/summary` | Live executive metrics, volatility, 52W range |
| `GET` | `/api/stocks/{symbol}/history` | OHLCV candlestick series with MA 7/21/50 overlays |
| `GET` | `/api/stocks/{symbol}/features` | Raw vs engineered feature definitions & latest values |
| `POST` | `/api/predict/linear-regression`| Runs Linear Regression for specified horizon (1D, 7D, 30D) |
| `POST` | `/api/predict/arima` | Runs ARIMA(5,1,2) with stationary differencing |
| `POST` | `/api/predict/lstm` | Runs LSTM Recurrent Neural Network sequence inference |
| `POST` | `/api/predict/all` | Executes all 3 models simultaneously |
| `GET` | `/api/models/{symbol}/evaluation` | Returns test MAE, RMSE, R², MAPE, and actual vs predicted curves |

---

## 📓 Academic Jupyter Notebooks

Interactive notebooks for experimental demonstration, model fitting, and academic evaluation are located under [`notebooks/`](file:///c:/Users/kumbh/Desktop/StockSense-AI/notebooks/):
* [`notebooks/exploratory_analysis.ipynb`](file:///c:/Users/kumbh/Desktop/StockSense-AI/notebooks/exploratory_analysis.ipynb): Exploratory Data Analysis, ADF test, and Technical Indicators.
* [`notebooks/linear_regression.ipynb`](file:///c:/Users/kumbh/Desktop/StockSense-AI/notebooks/linear_regression.ipynb): Linear Regression training, coefficient importance, and metrics.
* [`notebooks/arima.ipynb`](file:///c:/Users/kumbh/Desktop/StockSense-AI/notebooks/arima.ipynb): ARIMA(5,1,2) differencing, AIC/BIC, and out-of-sample forecast.
* [`notebooks/lstm.ipynb`](file:///c:/Users/kumbh/Desktop/StockSense-AI/notebooks/lstm.ipynb): Sequence creation, LSTM epoch training, loss curves, and predictions.

---

## ⚠️ Academic Disclaimer & Limitations

> [!IMPORTANT]
> **StockSense AI** is built strictly as an academic research and laboratory software engineering project. Stock market prices are subject to macroeconomic regime shifts, geopolitical events, liquidity shocks, and unexpected market news. 
> 
> **Predictions generated by this system are statistical and neural estimates based on historical market data and do not constitute financial advice, trade recommendations, or guarantees of future investment performance.**
