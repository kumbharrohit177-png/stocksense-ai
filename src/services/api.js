// StockSense AI - Centralized REST API Service Client
const API_BASE_URL = 'http://127.0.0.1:8000';

class ApiService {
  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async fetchJson(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText || response.statusText}`);
      }

      return await response.json();
    } catch (err) {
      console.warn(`[StockSense API] Request to ${endpoint} failed:`, err.message);
      throw err;
    }
  }

  // Health check
  async getHealth() {
    return this.fetchJson('/api/health');
  }

  // Stock listings
  async getStocks() {
    return this.fetchJson('/api/stocks');
  }

  // Executive Market Summary
  async getStockSummary(symbol) {
    return this.fetchJson(`/api/stocks/${encodeURIComponent(symbol)}/summary`);
  }

  // Historical OHLCV + Technical Overlays
  async getStockHistory(symbol, timeframe = '1Y') {
    return this.fetchJson(`/api/stocks/${encodeURIComponent(symbol)}/history?timeframe=${encodeURIComponent(timeframe)}`);
  }

  // Features metadata and values
  async getStockFeatures(symbol) {
    return this.fetchJson(`/api/stocks/${encodeURIComponent(symbol)}/features`);
  }

  // Model Predictions
  async predictLinearRegression(symbol, horizonDays = 7) {
    return this.fetchJson('/api/predict/linear-regression', {
      method: 'POST',
      body: JSON.stringify({ symbol, horizon_days: horizonDays }),
    });
  }

  async predictARIMA(symbol, horizonDays = 7) {
    return this.fetchJson('/api/predict/arima', {
      method: 'POST',
      body: JSON.stringify({ symbol, horizon_days: horizonDays }),
    });
  }

  async predictLSTM(symbol, horizonDays = 7) {
    return this.fetchJson('/api/predict/lstm', {
      method: 'POST',
      body: JSON.stringify({ symbol, horizon_days: horizonDays }),
    });
  }

  async predictAll(symbol, horizonDays = 7) {
    return this.fetchJson('/api/predict/all', {
      method: 'POST',
      body: JSON.stringify({ symbol, horizon_days: horizonDays }),
    });
  }

  // Model Evaluation Benchmarks (MAE, RMSE, R2, MAPE, Curves)
  async getModelEvaluations(symbol) {
    return this.fetchJson(`/api/models/${encodeURIComponent(symbol)}/evaluation`);
  }
}

export const api = new ApiService();
export default api;
