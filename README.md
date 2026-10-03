# 📈 StockSense AI
### AI-Based Stock Market Trend Prediction System

[![Python Version](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12%20%7C%203.13-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

---

## 📋 Overview

**StockSense AI** is an artificial intelligence and machine learning system for equity market price trend forecasting. It ingests historical market data via Yahoo Finance, extracts quantitative technical features, stationarizes time series, and forecasts future stock trends using three foundational modeling paradigms:

1. **Multivariate Linear Regression:** Baseline statistical learning fitting ordinary least squares on engineered momentum and trend indicators.
2. **ARIMA (AutoRegressive Integrated Moving Average):** Classical stochastic time-series modeling capturing autoregressive lag structures $(p=5)$, 1st-order stationarity differencing $(d=1)$, and moving average shocks $(q=2)$.
3. **LSTM (Long Short-Term Memory):** Deep Recurrent Neural Network sequence discovery capturing long-range non-linear temporal patterns.

---

## 🎯 Project Flow

```
┌─────────────────┐       ┌────────────────────┐       ┌─────────────────────┐
│ Historical Data │ ───>  │ Data Preprocessing │ ───>  │ Feature Engineering │
│ (Yahoo Finance) │       │ (Clean & ADF Test) │       │ (MAs, RSI, MACD, BB)│
└─────────────────┘       └────────────────────┘       └─────────────────────┘
                                                                  │
                                                                  ▼
┌─────────────────┐       ┌────────────────────┐       ┌─────────────────────┐
│  Visualization  │  <──  │ Model Evaluation   │  <──  │   Model Training    │
│  (Charts & UI)  │       │ (MAE, RMSE, R²)    │       │ (LR, ARIMA, LSTM)   │
└─────────────────┘       └────────────────────┘       └─────────────────────┘
```

---

## 🌟 Key Features

* **Interactive Candlestick Chart:** Real-time historical OHLCV chart with volume bars and toggleable Moving Averages (**MA 7** and **MA 21**).
* **Multi-Horizon AI Forecasts:** Compare predictions across 1-day, 7-day, 14-day, and 30-day forecast windows.
* **Actual vs. Predicted Price Visualization:** High-clarity comparative chart displaying historical actual prices alongside distinct model projections.
* **Unified Model Comparison:** Side-by-side benchmark matrix evaluating **MAE**, **RMSE**, **R² Score**, **MAPE**, and **Directional Hit Accuracy**.
* **Clean Single Navigation:** Streamlined top navigation across **Dashboard**, **Predictions**, **Model Comparison**, and **Methodology**.
* **Real & Cached Market Data:** Automatic fetching from `yfinance` with local SQLite caching for rate-limit protection and offline fallback.

---

## 🗂️ Project Structure

```
StockSense-AI/
├── backend/
│   ├── app/
│   │   ├── api/                 # REST API Routers (stocks, predict, models)
│   │   ├── database.py          # SQLite caching and prediction logs
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── schemas/             # Pydantic validation schemas
│   │   └── services/            # Data ingestion and model orchestration
│   ├── data/                    # SQLite database cache
│   ├── ml/                      # ML pipelines (LR, ARIMA, LSTM, preprocessing)
│   ├── Dockerfile               # Backend container specification
│   └── requirements.txt         # Python dependencies
├── src/
│   ├── components/              # Header, CandlestickChart, ActualVsPredictedChart, Footer
│   ├── data/                    # Curated mock & demo datasets
│   ├── pages/                   # Dashboard, Predictions, ModelsPage, Methodology, Landing
│   ├── services/                # Frontend API client
│   ├── App.jsx                  # Main application orchestrator
│   └── index.css                # Styling & design system tokens
├── Dockerfile.frontend          # Production NGINX frontend container
├── docker-compose.yml           # Multi-container orchestration
├── nginx.conf                   # NGINX reverse proxy & SPA config
├── package.json                 # Frontend dependencies & scripts
└── README.md                    # Project documentation
```

---

## 🚀 Quickstart & Installation

### Option 1: Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/kumbharrohit177-png/stocksense-ai.git
cd stocksense-ai

# Build and start all containers
docker compose up --build
```
* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API Docs:** [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Local Development Setup

#### 1. Start FastAPI Backend
```bash
# Navigate to project root
cd StockSense-AI

# Install Python requirements
pip install -r backend/requirements.txt

# Start FastAPI server
uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### 2. Start React + Vite Frontend
```bash
# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```
* **Frontend:** [http://127.0.0.1:5173](http://127.0.0.1:5173)
* **Backend:** [http://127.0.0.1:8000](http://127.0.0.1:8000)

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status and active models |
| `GET` | `/api/stocks` | List available stock equities |
| `GET` | `/api/stocks/{symbol}/summary` | Key price metrics and 52W range |
| `GET` | `/api/stocks/{symbol}/history` | Historical OHLCV candles and MA overlays |
| `POST` | `/api/predict/linear-regression` | Linear Regression next-horizon forecast |
| `POST` | `/api/predict/arima` | ARIMA(5,1,2) time-series forecast |
| `POST` | `/api/predict/lstm` | LSTM neural network sequence forecast |
| `POST` | `/api/predict/all` | Combined forecasts for all 3 models |
| `GET` | `/api/models/{symbol}/evaluation` | Empirical benchmark scores (MAE, RMSE, R²) |

---

## 🧪 Evaluation Metrics Summary

| Metric | Formula | Description |
| :--- | :--- | :--- |
| **MAE** | $\frac{1}{N} \sum \|y_t - \hat{y}_t\|$ | Mean Absolute Error in price currency |
| **RMSE** | $\sqrt{\frac{1}{N} \sum (y_t - \hat{y}_t)^2}$ | Root Mean Squared Error penalizing large outliers |
| **R² Score** | $1 - \frac{\sum (y_t - \hat{y}_t)^2}{\sum (y_t - \bar{y})^2}$ | Coefficient of determination (explained variance) |
| **MAPE** | $\frac{100\%}{N} \sum \|\frac{y_t - \hat{y}_t}{y_t}\|$ | Mean Absolute Percentage Error |
| **Directional Hit** | $\frac{1}{N} \sum \mathbb{I}(\text{sgn}(\Delta y_t) == \text{sgn}(\Delta \hat{y}_t))$ | Trend direction prediction accuracy (%) |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
