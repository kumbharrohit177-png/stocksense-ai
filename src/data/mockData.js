// StockSense AI - Clean Academic & Demonstration Mock Data
// Pre-configured for seamless replacement with FastAPI live endpoints

export const STOCKS_DATA = {
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    exchange: "NSE",
    currency: "INR",
    currencySymbol: "₹",
    price: 2845.60,
    changePrice: 50.80,
    changePercent: 1.82,
    isPositive: true,
    high52: 3024.90,
    low52: 2220.30,
    volume: "8.42M",
    features: {
      ma7: 2824.50,
      ma21: 2795.10,
      ma50: 2740.80,
      ema12: 2831.20,
      ema26: 2802.40,
      rsi14: 64.20,
      macd: 14.20,
      macdSignal: 8.60,
      volatility21: 16.80,
      bbUpper: 2910.40,
      bbLower: 2680.20
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 2860.50,
        changePrice: 14.90,
        changePercent: 0.52,
        trend: "UPWARD",
        isPositive: true,
        rmse: 44.95,
        mae: 34.84,
        r2: 0.687,
        mape: 1.30,
        directionalAccuracy: 52.4
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 2878.00,
        changePrice: 32.40,
        changePercent: 1.14,
        trend: "UPWARD",
        isPositive: true,
        rmse: 48.60,
        mae: 45.80,
        r2: 0.844,
        mape: 1.72,
        directionalAccuracy: 61.8
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 2892.40,
        changePrice: 46.80,
        changePercent: 1.64,
        trend: "UPWARD",
        isPositive: true,
        rmse: 42.30,
        mae: 38.10,
        r2: 0.884,
        mape: 1.34,
        directionalAccuracy: 68.7
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 2848.20, arima: 2854.10, lstm: 2858.40, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 2852.00, arima: 2862.00, lstm: 2869.50, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 2855.40, arima: 2867.80, lstm: 2876.20, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 2857.90, arima: 2871.50, lstm: 2881.00, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 2859.10, arima: 2874.20, lstm: 2886.50, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 2860.00, arima: 2876.80, lstm: 2890.00, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 2860.50, arima: 2878.00, lstm: 2892.40, trend: "UPWARD" }
    ]
  },
  TCS: {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    exchange: "NSE",
    currency: "INR",
    currencySymbol: "₹",
    price: 3980.10,
    changePrice: -16.80,
    changePercent: -0.42,
    isPositive: false,
    high52: 4592.00,
    low52: 3312.00,
    volume: "3.18M",
    features: {
      ma7: 3995.00,
      ma21: 4020.40,
      ma50: 3950.00,
      ema12: 3988.50,
      ema26: 4005.00,
      rsi14: 48.60,
      macd: 4.20,
      macdSignal: 6.00,
      volatility21: 14.20,
      bbUpper: 4120.00,
      bbLower: 3880.00
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 3972.00,
        changePrice: -8.10,
        changePercent: -0.20,
        trend: "DOWNWARD",
        isPositive: false,
        rmse: 52.10,
        mae: 41.20,
        r2: 0.712,
        mape: 1.45,
        directionalAccuracy: 51.2
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 3995.50,
        changePrice: 15.40,
        changePercent: 0.39,
        trend: "UPWARD",
        isPositive: true,
        rmse: 46.10,
        mae: 36.40,
        r2: 0.821,
        mape: 1.25,
        directionalAccuracy: 60.5
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 4015.00,
        changePrice: 34.90,
        changePercent: 0.88,
        trend: "UPWARD",
        isPositive: true,
        rmse: 39.80,
        mae: 31.50,
        r2: 0.892,
        mape: 1.05,
        directionalAccuracy: 67.2
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 3978.00, arima: 3984.00, lstm: 3989.00, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 3976.50, arima: 3988.50, lstm: 3996.00, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 3975.00, arima: 3991.00, lstm: 4002.50, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 3974.20, arima: 3993.00, lstm: 4007.80, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 3973.50, arima: 3994.20, lstm: 4011.00, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 3972.80, arima: 3995.00, lstm: 4013.50, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 3972.00, arima: 3995.50, lstm: 4015.00, trend: "UPWARD" }
    ]
  },
  INFY: {
    symbol: "INFY",
    name: "Infosys Ltd",
    exchange: "NSE",
    currency: "INR",
    currencySymbol: "₹",
    price: 1560.30,
    changePrice: 17.70,
    changePercent: 1.15,
    isPositive: true,
    high52: 1953.90,
    low52: 1358.35,
    volume: "6.22M",
    features: {
      ma7: 1545.20,
      ma21: 1530.00,
      ma50: 1510.40,
      ema12: 1550.00,
      ema26: 1536.00,
      rsi14: 58.40,
      macd: 8.60,
      macdSignal: 5.20,
      volatility21: 18.10,
      bbUpper: 1595.00,
      bbLower: 1490.00
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 1568.00,
        changePrice: 7.70,
        changePercent: 0.49,
        trend: "UPWARD",
        isPositive: true,
        rmse: 24.50,
        mae: 18.20,
        r2: 0.735,
        mape: 1.38,
        directionalAccuracy: 53.0
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 1582.50,
        changePrice: 22.20,
        changePercent: 1.42,
        trend: "UPWARD",
        isPositive: true,
        rmse: 26.80,
        mae: 20.40,
        r2: 0.812,
        mape: 1.55,
        directionalAccuracy: 62.4
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 1598.00,
        changePrice: 37.70,
        changePercent: 2.42,
        trend: "UPWARD",
        isPositive: true,
        rmse: 21.40,
        mae: 16.10,
        r2: 0.895,
        mape: 1.18,
        directionalAccuracy: 70.1
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 1562.50, arima: 1566.00, lstm: 1572.00, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 1564.00, arima: 1571.00, lstm: 1580.50, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 1565.50, arima: 1575.00, lstm: 1585.00, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 1566.80, arima: 1578.00, lstm: 1591.20, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 1567.50, arima: 1580.50, lstm: 1595.00, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 1567.90, arima: 1581.80, lstm: 1596.50, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 1568.00, arima: 1582.50, lstm: 1598.00, trend: "UPWARD" }
    ]
  },
  HDFCBANK: {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    exchange: "NSE",
    currency: "INR",
    currencySymbol: "₹",
    price: 1440.00,
    changePrice: 4.30,
    changePercent: 0.30,
    isPositive: true,
    high52: 1794.00,
    low52: 1363.55,
    volume: "12.8M",
    features: {
      ma7: 1435.00,
      ma21: 1428.00,
      ma50: 1442.00,
      ema12: 1436.00,
      ema26: 1434.00,
      rsi14: 52.10,
      macd: 3.80,
      macdSignal: 2.60,
      volatility21: 15.40,
      bbUpper: 1475.00,
      bbLower: 1405.00
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 1445.00,
        changePrice: 5.00,
        changePercent: 0.35,
        trend: "UPWARD",
        isPositive: true,
        rmse: 22.40,
        mae: 17.50,
        r2: 0.695,
        mape: 1.28,
        directionalAccuracy: 51.8
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 1458.00,
        changePrice: 18.00,
        changePercent: 1.25,
        trend: "UPWARD",
        isPositive: true,
        rmse: 25.10,
        mae: 19.80,
        r2: 0.798,
        mape: 1.42,
        directionalAccuracy: 59.4
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 1475.50,
        changePrice: 35.50,
        changePercent: 2.46,
        trend: "UPWARD",
        isPositive: true,
        rmse: 18.90,
        mae: 14.20,
        r2: 0.881,
        mape: 1.12,
        directionalAccuracy: 66.8
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 1441.50, arima: 1444.00, lstm: 1448.00, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 1442.80, arima: 1447.50, lstm: 1454.00, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 1443.60, arima: 1450.80, lstm: 1460.50, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 1444.20, arima: 1453.50, lstm: 1465.00, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 1444.60, arima: 1455.50, lstm: 1469.20, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 1444.90, arima: 1457.00, lstm: 1472.00, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 1445.00, arima: 1458.00, lstm: 1475.50, trend: "UPWARD" }
    ]
  },
  TATAMOTORS: {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    exchange: "NSE",
    currency: "INR",
    currencySymbol: "₹",
    price: 980.50,
    changePrice: 23.00,
    changePercent: 2.40,
    isPositive: true,
    high52: 1179.05,
    low52: 612.00,
    volume: "14.6M",
    features: {
      ma7: 965.20,
      ma21: 948.00,
      ma50: 920.00,
      ema12: 970.00,
      ema26: 955.00,
      rsi14: 68.90,
      macd: 19.40,
      macdSignal: 11.60,
      volatility21: 24.50,
      bbUpper: 1010.00,
      bbLower: 915.00
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 992.00,
        changePrice: 11.50,
        changePercent: 1.17,
        trend: "UPWARD",
        isPositive: true,
        rmse: 18.40,
        mae: 14.10,
        r2: 0.742,
        mape: 1.52,
        directionalAccuracy: 54.6
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 1008.00,
        changePrice: 27.50,
        changePercent: 2.80,
        trend: "UPWARD",
        isPositive: true,
        rmse: 21.60,
        mae: 16.80,
        r2: 0.815,
        mape: 1.78,
        directionalAccuracy: 63.2
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 1024.00,
        changePrice: 43.50,
        changePercent: 4.44,
        trend: "UPWARD",
        isPositive: true,
        rmse: 14.20,
        mae: 11.00,
        r2: 0.914,
        mape: 1.22,
        directionalAccuracy: 72.5
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 984.00, arima: 988.00, lstm: 994.00, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 986.50, arima: 994.00, lstm: 1004.50, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 988.50, arima: 999.00, lstm: 1012.00, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 990.00, arima: 1003.00, lstm: 1016.80, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 991.00, arima: 1005.50, lstm: 1020.00, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 991.60, arima: 1007.00, lstm: 1022.50, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 992.00, arima: 1008.00, lstm: 1024.00, trend: "UPWARD" }
    ]
  },
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    exchange: "NASDAQ",
    currency: "USD",
    currencySymbol: "$",
    price: 224.23,
    changePrice: 1.65,
    changePercent: 0.74,
    isPositive: true,
    high52: 237.23,
    low52: 164.08,
    volume: "48.2M",
    features: {
      ma7: 222.10,
      ma21: 219.50,
      ma50: 212.80,
      ema12: 223.00,
      ema26: 220.40,
      rsi14: 61.50,
      macd: 2.80,
      macdSignal: 1.90,
      volatility21: 18.20,
      bbUpper: 231.00,
      bbLower: 215.00
    },
    predictions: {
      lr: {
        modelName: "Linear Regression",
        predictedPrice: 226.10,
        changePrice: 1.87,
        changePercent: 0.83,
        trend: "UPWARD",
        isPositive: true,
        rmse: 3.45,
        mae: 2.80,
        r2: 0.720,
        mape: 1.25,
        directionalAccuracy: 53.5
      },
      arima: {
        modelName: "ARIMA (5, 1, 2)",
        predictedPrice: 228.50,
        changePrice: 4.27,
        changePercent: 1.90,
        trend: "UPWARD",
        isPositive: true,
        rmse: 3.80,
        mae: 3.10,
        r2: 0.825,
        mape: 1.40,
        directionalAccuracy: 61.2
      },
      lstm: {
        modelName: "LSTM Neural Network",
        predictedPrice: 231.40,
        changePrice: 7.17,
        changePercent: 3.20,
        trend: "UPWARD",
        isPositive: true,
        rmse: 2.95,
        mae: 2.20,
        r2: 0.898,
        mape: 1.05,
        directionalAccuracy: 69.4
      }
    },
    forecastSchedule: [
      { day: "Day +1 (Tomorrow)", date: "Tomorrow", lr: 224.80, arima: 225.40, lstm: 226.20, trend: "UPWARD" },
      { day: "Day +2", date: "+2 Days", lr: 225.20, arima: 226.30, lstm: 227.80, trend: "UPWARD" },
      { day: "Day +3", date: "+3 Days", lr: 225.60, arima: 227.10, lstm: 229.10, trend: "UPWARD" },
      { day: "Day +4", date: "+4 Days", lr: 225.80, arima: 227.70, lstm: 230.00, trend: "UPWARD" },
      { day: "Day +5", date: "+5 Days", lr: 226.00, arima: 228.10, lstm: 230.70, trend: "UPWARD" },
      { day: "Day +6", date: "+6 Days", lr: 226.05, arima: 228.35, lstm: 231.10, trend: "UPWARD" },
      { day: "Day +7 (Target)", date: "+7 Days", lr: 226.10, arima: 228.50, lstm: 231.40, trend: "UPWARD" }
    ]
  }
};

export const AVAILABLE_STOCKS = [
  { symbol: "RELIANCE", label: "RELIANCE (NSE)", exchange: "NSE" },
  { symbol: "TCS", label: "TCS (NSE)", exchange: "NSE" },
  { symbol: "INFY", label: "INFY (NSE)", exchange: "NSE" },
  { symbol: "HDFCBANK", label: "HDFC BANK (NSE)", exchange: "NSE" },
  { symbol: "TATAMOTORS", label: "TATA MOTORS (NSE)", exchange: "NSE" },
  { symbol: "AAPL", label: "APPLE (NASDAQ)", exchange: "NASDAQ" }
];

export const MODELS_BENCHMARKS = [
  {
    id: "lr",
    name: "Linear Regression",
    category: "Supervised Statistical Learning",
    description: "Multi-variate Ordinary Least Squares (OLS) model fitting historical moving averages (SMA 7, 21, 50), RSI, and return momentum features to project next-step price.",
    rmse: "44.95",
    mae: "34.84",
    r2: "0.687",
    mape: "1.30%",
    directionalAccuracy: "52.4%",
    suitability: "Fast statistical baseline; simple linear assumption.",
    badge: "Baseline"
  },
  {
    id: "arima",
    name: "ARIMA (5, 1, 2)",
    category: "Time Series Econometric",
    description: "AutoRegressive Integrated Moving Average model capturing stationarized autocorrelation lag dependencies (p=5), 1st order differencing (d=1), and moving average shocks (q=2).",
    rmse: "48.60",
    mae: "45.80",
    r2: "0.844",
    mape: "1.72%",
    directionalAccuracy: "61.8%",
    suitability: "Captures univariate autocorrelation and mean-reverting price cycles.",
    badge: "Time Series"
  },
  {
    id: "lstm",
    name: "LSTM Neural Network",
    category: "Deep Recurrent Learning",
    description: "Long Short-Term Memory recurrent neural network with input, forget, and output gating mechanisms capturing non-linear temporal sequence patterns across historical windows.",
    rmse: "42.30",
    mae: "38.10",
    r2: "0.884",
    mape: "1.34%",
    directionalAccuracy: "68.7%",
    suitability: "Best overall accuracy; handles non-linear temporal dependencies.",
    badge: "Top Performer"
  }
];

export const PIPELINE_STEPS = [
  {
    step: 1,
    title: "Historical Data",
    desc: "Ingestion of daily OHLCV price and volume data using Yahoo Finance API (1Y–5Y historical window).",
    icon: "database"
  },
  {
    step: 2,
    title: "Data Preprocessing",
    desc: "Data cleaning, chronological sorting, gap filling, and ADF stationarity testing to prevent data leakage.",
    icon: "cleaning_services"
  },
  {
    step: 3,
    title: "Feature Engineering",
    desc: "Computation of technical indicators: Simple Moving Averages (MA 7, 21, 50), RSI 14, MACD, and Volatility 21.",
    icon: "precision_manufacturing"
  },
  {
    step: 4,
    title: "Model Training",
    desc: "Chronological 80% train / 20% test split used to train Linear Regression, ARIMA(5,1,2), and LSTM models.",
    icon: "psychology"
  },
  {
    step: 5,
    title: "Prediction",
    desc: "Multi-step forecasting generating projected closing prices and expected trend direction (UPWARD / DOWNWARD).",
    icon: "trending_up"
  },
  {
    step: 6,
    title: "Evaluation & Viz",
    desc: "Performance benchmarking via MAE, RMSE, R², MAPE, and directional accuracy visual charts.",
    icon: "insights"
  }
];
