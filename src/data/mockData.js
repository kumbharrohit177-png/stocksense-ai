export const STOCKS_DATA = {
  RELIANCE: {
    symbol: "RELIANCE",
    name: "Reliance Industries Ltd",
    exchange: "NSE",
    isin: "INE002A01018",
    sector: "Energy & Petrochemicals",
    mcap: "₹19.25T",
    price: 2845.60,
    changePrice: 50.80,
    changePercent: 1.82,
    isPositive: true,
    syncTime: "15:30 IST",
    status: "Market Open",
    metrics: {
      spotPrice: "₹2,845.60",
      exchangeTag: "NSE",
      dailyChange: "+1.82%",
      dailyDelta: "+₹50.80",
      range52Low: "₹2,220.30",
      range52High: "₹3,024.90",
      volume: "8.42M",
      avgVolume10D: "7.15M",
      beta: "1.14",
      hv: "16.8%",
      pe: "26.4",
      eps: "₹107.8"
    },
    indicators: {
      rsi: 64.2,
      rsiStatus: "Bullish Momentum",
      macdHist: "+5.6",
      macdVal: "+14.2",
      macdSignal: "+8.6",
      atr: "₹42.80",
      stopLoss: "₹2,802.80 (-1.5%)",
      sharpeSortino: "2.18 / 3.42",
      sentiment: "SYNTHESIZED: BULLISH ↑",
      shortTerm: { text: "Bullish (85%)", val: 85 },
      mediumTerm: { text: "Bullish (78%)", val: 78 },
      longTerm: { text: "Neutral-Bullish (62%)", val: 62 }
    },
    prediction: {
      targetPrice7D: "₹2,892.40",
      targetDelta: "+₹46.80 (+1.64%)",
      targetPriceT1: "₹2,892.40",
      targetDeltaT1: "+₹46.80 Delta",
      direction: "BULLISH",
      directionBadge: "Accelerating",
      confidence: "87.4%",
      confidenceText: "High Certitude",
      confidenceInterval: "₹2,868.20 – ₹2,916.60",
      backtestAccuracy: "89.1%",
      dominantDriver: "Bi-LSTM + OBV (84 Latent Features)",
      latency: "4.2 ms",
      lossRmse: "0.0142",
      nextDayPrediction: "₹2,892.40 (+1.64%)",
      activeArchitecture: "Multi-BiLSTM (256-units, Adam)",
      rmseValue: "42.30",
      consensusInference: "STRONG BUY (8.8 / 10)"
    },
    shapFeatures: [
      { name: "14-Day EMA", weight: 28, desc: "Primary slope inflection confirmed above 200 EMA", icon: "show_chart", color: "text-secondary", barGrad: "from-secondary-container to-secondary" },
      { name: "Close Volatility (HV-30)", weight: 22, desc: "Compression breakout detected on Bollinger 2.0σ", icon: "waves", color: "text-tertiary", barGrad: "from-tertiary-container to-tertiary" },
      { name: "Volume Weighted Avg (VWAP)", weight: 19, desc: "Institutional accumulation shelf sustained at ₹2,838", icon: "bar_chart", color: "text-primary", barGrad: "from-primary-container to-primary" },
      { name: "RSI Momentum (14)", weight: 16, desc: "Value at 61.4 - Bullish divergence in lower timeframe", icon: "speed", color: "text-surface-tint", barGrad: "from-primary to-surface-tint" },
      { name: "Nifty Energy Sector Index", weight: 15, desc: "Beta cross correlation +0.81 relative to sector rally", icon: "hub", color: "text-secondary-fixed", barGrad: "from-secondary to-secondary-fixed" }
    ],
    forecastHorizonMatrix: [
      { step: "Day +1 (Tomorrow)", price: "₹2,892.40", ret: "+1.64%", high: "₹2,905.00", low: "₹2,875.00", spread: "₹30.00", conf: "91%" },
      { step: "Day +2", price: "₹2,908.10", ret: "+2.19%", high: "₹2,925.00", low: "₹2,885.00", spread: "₹40.00", conf: "88%" },
      { step: "Day +3", price: "₹2,898.50", ret: "+1.86%", high: "₹2,918.00", low: "₹2,878.00", spread: "₹40.00", conf: "85%" },
      { step: "Day +4", price: "₹2,915.20", ret: "+2.44%", high: "₹2,938.00", low: "₹2,890.00", spread: "₹48.00", conf: "83%" },
      { step: "Day +5", price: "₹2,930.00", ret: "+2.96%", high: "₹2,955.00", low: "₹2,905.00", spread: "₹50.00", conf: "80%" },
      { step: "Day +6", price: "₹2,924.50", ret: "+2.77%", high: "₹2,950.00", low: "₹2,900.00", spread: "₹50.00", conf: "78%" },
      { step: "Day +7 (Target Horizon)", price: "₹2,942.00", ret: "+3.39%", high: "₹2,970.00", low: "₹2,915.00", spread: "₹55.00", conf: "75%", isTarget: true }
    ],
    orderBook: {
      bids: [
        { price: 2845.20, qty: 1450, total: 1450, fillPct: 85 },
        { price: 2844.80, qty: 3200, total: 4650, fillPct: 70 },
        { price: 2844.00, qty: 5800, total: 10450, fillPct: 92 },
        { price: 2843.50, qty: 2100, total: 12550, fillPct: 45 },
        { price: 2842.00, qty: 4600, total: 17150, fillPct: 60 }
      ],
      asks: [
        { price: 2845.60, qty: 1820, total: 1820, fillPct: 65 },
        { price: 2846.00, qty: 2900, total: 4720, fillPct: 80 },
        { price: 2846.50, qty: 4100, total: 8820, fillPct: 55 },
        { price: 2847.20, qty: 6300, total: 15120, fillPct: 90 },
        { price: 2848.00, qty: 3400, total: 18520, fillPct: 40 }
      ]
    }
  },
  TCS: {
    symbol: "TCS",
    name: "Tata Consultancy Services Ltd",
    exchange: "NSE",
    isin: "INE467B01029",
    sector: "Information Technology",
    mcap: "₹14.42T",
    price: 3980.10,
    changePrice: -16.80,
    changePercent: -0.42,
    isPositive: false,
    syncTime: "15:30 IST",
    status: "Market Open",
    metrics: {
      spotPrice: "₹3,980.10",
      exchangeTag: "NSE",
      dailyChange: "-0.42%",
      dailyDelta: "-₹16.80",
      range52Low: "₹3,312.00",
      range52High: "₹4,592.00",
      volume: "3.18M",
      avgVolume10D: "2.84M",
      beta: "0.78",
      hv: "14.2%",
      pe: "29.8",
      eps: "₹133.5"
    },
    indicators: {
      rsi: 48.6,
      rsiStatus: "Neutral Consolidation",
      macdHist: "-1.8",
      macdVal: "+4.2",
      macdSignal: "+6.0",
      atr: "₹52.40",
      stopLoss: "₹3,920.00 (-1.5%)",
      sharpeSortino: "1.92 / 2.80",
      sentiment: "SYNTHESIZED: NEUTRAL →",
      shortTerm: { text: "Neutral (54%)", val: 54 },
      mediumTerm: { text: "Bullish (68%)", val: 68 },
      longTerm: { text: "Bullish (74%)", val: 74 }
    },
    prediction: {
      targetPrice7D: "₹4,045.00",
      targetDelta: "+₹64.90 (+1.63%)",
      targetPriceT1: "₹3,995.50",
      targetDeltaT1: "+₹15.40 Delta",
      direction: "MILD BULLISH",
      directionBadge: "Consolidating",
      confidence: "84.2%",
      confidenceText: "High Certitude",
      confidenceInterval: "₹3,940.00 – ₹4,080.00",
      backtestAccuracy: "88.4%",
      dominantDriver: "ARIMA + Order Book Asymmetry",
      latency: "3.8 ms",
      lossRmse: "0.0185",
      nextDayPrediction: "₹3,995.50 (+0.39%)",
      activeArchitecture: "Stacked BiLSTM-ARIMA",
      rmseValue: "46.10",
      consensusInference: "ACCUMULATE (7.4 / 10)"
    },
    shapFeatures: [
      { name: "USD/INR FX Sensitivity", weight: 31, desc: "Currency tailwinds driving quarterly margin expansion", icon: "currency_exchange", color: "text-secondary", barGrad: "from-secondary-container to-secondary" },
      { name: "50-Day Moving Average", weight: 24, desc: "Testing structural demand floor at ₹3,950", icon: "show_chart", color: "text-tertiary", barGrad: "from-tertiary-container to-tertiary" },
      { name: "RSI Mean Reversion", weight: 18, desc: "Approaching oversold threshold on 4-hour timeframe", icon: "speed", color: "text-primary", barGrad: "from-primary-container to-primary" },
      { name: "Volume Spread Analysis", weight: 15, desc: "Low-volume pullback indicates minor institutional absorption", icon: "bar_chart", color: "text-surface-tint", barGrad: "from-primary to-surface-tint" },
      { name: "Nifty IT Sector Index", weight: 12, desc: "Sector-wide consolidation following earnings season", icon: "hub", color: "text-secondary-fixed", barGrad: "from-secondary to-secondary-fixed" }
    ],
    forecastHorizonMatrix: [
      { step: "Day +1 (Tomorrow)", price: "₹3,995.50", ret: "+0.39%", high: "₹4,015.00", low: "₹3,970.00", spread: "₹45.00", conf: "90%" },
      { step: "Day +2", price: "₹4,008.00", ret: "+0.70%", high: "₹4,035.00", low: "₹3,980.00", spread: "₹55.00", conf: "86%" },
      { step: "Day +3", price: "₹4,018.50", ret: "+0.96%", high: "₹4,050.00", low: "₹3,990.00", spread: "₹60.00", conf: "83%" },
      { step: "Day +4", price: "₹4,028.00", ret: "+1.20%", high: "₹4,065.00", low: "₹3,995.00", spread: "₹70.00", conf: "81%" },
      { step: "Day +5", price: "₹4,036.00", ret: "+1.40%", high: "₹4,075.00", low: "₹4,000.00", spread: "₹75.00", conf: "79%" },
      { step: "Day +6", price: "₹4,040.00", ret: "+1.51%", high: "₹4,082.00", low: "₹4,005.00", spread: "₹77.00", conf: "77%" },
      { step: "Day +7 (Target Horizon)", price: "₹4,045.00", ret: "+1.63%", high: "₹4,095.00", low: "₹4,010.00", spread: "₹85.00", conf: "74%", isTarget: true }
    ],
    orderBook: {
      bids: [
        { price: 3979.50, qty: 850, total: 850, fillPct: 60 },
        { price: 3978.00, qty: 1900, total: 2750, fillPct: 75 },
        { price: 3976.50, qty: 3400, total: 6150, fillPct: 88 },
        { price: 3975.00, qty: 1200, total: 7350, fillPct: 40 },
        { price: 3973.00, qty: 2800, total: 10150, fillPct: 50 }
      ],
      asks: [
        { price: 3980.10, qty: 1200, total: 1200, fillPct: 70 },
        { price: 3981.50, qty: 2100, total: 3300, fillPct: 85 },
        { price: 3983.00, qty: 3600, total: 6900, fillPct: 60 },
        { price: 3985.00, qty: 4500, total: 11400, fillPct: 95 },
        { price: 3987.00, qty: 2200, total: 13600, fillPct: 35 }
      ]
    }
  },
  INFY: {
    symbol: "INFY",
    name: "Infosys Ltd",
    exchange: "NSE",
    isin: "INE009A01021",
    sector: "Information Technology",
    mcap: "₹6.48T",
    price: 1560.30,
    changePrice: 17.70,
    changePercent: 1.15,
    isPositive: true,
    syncTime: "15:30 IST",
    status: "Market Open",
    metrics: {
      spotPrice: "₹1,560.30",
      exchangeTag: "NSE",
      dailyChange: "+1.15%",
      dailyDelta: "+₹17.70",
      range52Low: "₹1,358.35",
      range52High: "₹1,953.90",
      volume: "6.22M",
      avgVolume10D: "5.40M",
      beta: "0.95",
      hv: "18.1%",
      pe: "24.6",
      eps: "₹63.4"
    },
    indicators: {
      rsi: 58.4,
      rsiStatus: "Bullish Divergence",
      macdHist: "+3.4",
      macdVal: "+8.6",
      macdSignal: "+5.2",
      atr: "₹24.60",
      stopLoss: "₹1,535.00 (-1.6%)",
      sharpeSortino: "2.05 / 3.10",
      sentiment: "SYNTHESIZED: BULLISH ↑",
      shortTerm: { text: "Bullish (80%)", val: 80 },
      mediumTerm: { text: "Bullish (75%)", val: 75 },
      longTerm: { text: "Bullish (70%)", val: 70 }
    },
    prediction: {
      targetPrice7D: "₹1,598.00",
      targetDelta: "+₹37.70 (+2.42%)",
      targetPriceT1: "₹1,572.00",
      targetDeltaT1: "+₹11.70 Delta",
      direction: "BULLISH",
      directionBadge: "Breakout",
      confidence: "88.6%",
      confidenceText: "High Certitude",
      confidenceInterval: "₹1,545.00 – ₹1,620.00",
      backtestAccuracy: "90.2%",
      dominantDriver: "Bi-LSTM Cloud Sector Momentum",
      latency: "3.5 ms",
      lossRmse: "0.0128",
      nextDayPrediction: "₹1,572.00 (+0.75%)",
      activeArchitecture: "BiLSTM Attention Engine",
      rmseValue: "21.40",
      consensusInference: "STRONG BUY (8.5 / 10)"
    },
    shapFeatures: [
      { name: "20-Day EMA Trend", weight: 30, desc: "Price reclaiming upper standard deviation line", icon: "show_chart", color: "text-secondary", barGrad: "from-secondary-container to-secondary" },
      { name: "ADR Arbitrage Spread", weight: 22, desc: "US ADR premium indicating opening gap up probability", icon: "currency_exchange", color: "text-tertiary", barGrad: "from-tertiary-container to-tertiary" },
      { name: "Volume Breakout Index", weight: 20, desc: "Volume 1.25x above 20-day rolling baseline", icon: "bar_chart", color: "text-primary", barGrad: "from-primary-container to-primary" },
      { name: "RSI Signal Slope", weight: 16, desc: "Ascending triangle crossover in momentum oscillator", icon: "speed", color: "text-surface-tint", barGrad: "from-primary to-surface-tint" },
      { name: "Earnings Surprise Drift", weight: 12, desc: "Post-earnings revision drift continuing positive vector", icon: "trending_up", color: "text-secondary-fixed", barGrad: "from-secondary to-secondary-fixed" }
    ],
    forecastHorizonMatrix: [
      { step: "Day +1 (Tomorrow)", price: "₹1,572.00", ret: "+0.75%", high: "₹1,582.00", low: "₹1,560.00", spread: "₹22.00", conf: "92%" },
      { step: "Day +2", price: "₹1,580.50", ret: "+1.29%", high: "₹1,592.00", low: "₹1,568.00", spread: "₹24.00", conf: "89%" },
      { step: "Day +3", price: "₹1,585.00", ret: "+1.58%", high: "₹1,598.00", low: "₹1,572.00", spread: "₹26.00", conf: "86%" },
      { step: "Day +4", price: "₹1,591.20", ret: "+1.98%", high: "₹1,605.00", low: "₹1,578.00", spread: "₹27.00", conf: "84%" },
      { step: "Day +5", price: "₹1,595.00", ret: "+2.22%", high: "₹1,610.00", low: "₹1,582.00", spread: "₹28.00", conf: "81%" },
      { step: "Day +6", price: "₹1,596.50", ret: "+2.32%", high: "₹1,614.00", low: "₹1,584.00", spread: "₹30.00", conf: "79%" },
      { step: "Day +7 (Target Horizon)", price: "₹1,598.00", ret: "+2.42%", high: "₹1,620.00", low: "₹1,585.00", spread: "₹35.00", conf: "76%", isTarget: true }
    ],
    orderBook: {
      bids: [
        { price: 1560.00, qty: 3200, total: 3200, fillPct: 80 },
        { price: 1559.50, qty: 5400, total: 8600, fillPct: 90 },
        { price: 1558.00, qty: 4100, total: 12700, fillPct: 65 },
        { price: 1557.00, qty: 2900, total: 15600, fillPct: 45 },
        { price: 1555.50, qty: 6800, total: 22400, fillPct: 85 }
      ],
      asks: [
        { price: 1560.30, qty: 2100, total: 2100, fillPct: 70 },
        { price: 1561.00, qty: 3800, total: 5900, fillPct: 85 },
        { price: 1562.50, qty: 4200, total: 10100, fillPct: 60 },
        { price: 1564.00, qty: 5100, total: 15200, fillPct: 75 },
        { price: 1565.00, qty: 7400, total: 22600, fillPct: 95 }
      ]
    }
  },
  HDFCBANK: {
    symbol: "HDFCBANK",
    name: "HDFC Bank Ltd",
    exchange: "NSE",
    isin: "INE040A01034",
    sector: "Banking & Financial Services",
    mcap: "₹10.95T",
    price: 1440.00,
    changePrice: 4.30,
    changePercent: 0.30,
    isPositive: true,
    syncTime: "15:30 IST",
    status: "Market Open",
    metrics: {
      spotPrice: "₹1,440.00",
      exchangeTag: "NSE",
      dailyChange: "+0.30%",
      dailyDelta: "+₹4.30",
      range52Low: "₹1,363.55",
      range52High: "₹1,794.00",
      volume: "12.8M",
      avgVolume10D: "11.2M",
      beta: "1.08",
      hv: "15.4%",
      pe: "18.2",
      eps: "₹79.1"
    },
    indicators: {
      rsi: 52.1,
      rsiStatus: "Neutral Steady",
      macdHist: "+1.2",
      macdVal: "+3.8",
      macdSignal: "+2.6",
      atr: "₹18.90",
      stopLoss: "₹1,418.00 (-1.5%)",
      sharpeSortino: "2.30 / 3.65",
      sentiment: "SYNTHESIZED: MILD BULLISH ↑",
      shortTerm: { text: "Bullish (65%)", val: 65 },
      mediumTerm: { text: "Bullish (72%)", val: 72 },
      longTerm: { text: "Bullish (82%)", val: 82 }
    },
    prediction: {
      targetPrice7D: "₹1,475.50",
      targetDelta: "+₹35.50 (+2.46%)",
      targetPriceT1: "₹1,448.00",
      targetDeltaT1: "+₹8.00 Delta",
      direction: "BULLISH",
      directionBadge: "Accumulation",
      confidence: "86.1%",
      confidenceText: "High Certitude",
      confidenceInterval: "₹1,425.00 – ₹1,495.00",
      backtestAccuracy: "87.9%",
      dominantDriver: "ARIMA + Credit Cycle Features",
      latency: "4.0 ms",
      lossRmse: "0.0154",
      nextDayPrediction: "₹1,448.00 (+0.56%)",
      activeArchitecture: "Multi-Variate LSTM",
      rmseValue: "18.90",
      consensusInference: "BUY (7.9 / 10)"
    },
    shapFeatures: [
      { name: "FII / DII Institutional Flow", weight: 32, desc: "Net domestic institutional accumulation registered", icon: "account_balance", color: "text-secondary", barGrad: "from-secondary-container to-secondary" },
      { name: "Bank Nifty Correlation", weight: 26, desc: "High sensitivity weight (0.38) within Nifty Bank Index", icon: "hub", color: "text-tertiary", barGrad: "from-tertiary-container to-tertiary" },
      { name: "NIM Spread Trajectory", weight: 18, desc: "Net interest margin stabilization expectations", icon: "trending_up", color: "text-primary", barGrad: "from-primary-container to-primary" },
      { name: "100-Day EMA Support", weight: 14, desc: "Price rebounding consistently off ₹1,420 institutional shelf", icon: "show_chart", color: "text-surface-tint", barGrad: "from-primary to-surface-tint" },
      { name: "Volatility Imbalance (VIX)", weight: 10, desc: "Subdued volatility index promoting steady compounding", icon: "speed", color: "text-secondary-fixed", barGrad: "from-secondary to-secondary-fixed" }
    ],
    forecastHorizonMatrix: [
      { step: "Day +1 (Tomorrow)", price: "₹1,448.00", ret: "+0.56%", high: "₹1,455.00", low: "₹1,438.00", spread: "₹17.00", conf: "91%" },
      { step: "Day +2", price: "₹1,454.00", ret: "+0.97%", high: "₹1,462.00", low: "₹1,442.00", spread: "₹20.00", conf: "88%" },
      { step: "Day +3", price: "₹1,460.50", ret: "+1.42%", high: "₹1,470.00", low: "₹1,448.00", spread: "₹22.00", conf: "85%" },
      { step: "Day +4", price: "₹1,465.00", ret: "+1.74%", high: "₹1,476.00", low: "₹1,452.00", spread: "₹24.00", conf: "83%" },
      { step: "Day +5", price: "₹1,469.20", ret: "+2.03%", high: "₹1,482.00", low: "₹1,456.00", spread: "₹26.00", conf: "80%" },
      { step: "Day +6", price: "₹1,472.00", ret: "+2.22%", high: "₹1,488.00", low: "₹1,460.00", spread: "₹28.00", conf: "78%" },
      { step: "Day +7 (Target Horizon)", price: "₹1,475.50", ret: "+2.46%", high: "₹1,495.00", low: "₹1,462.00", spread: "₹33.00", conf: "75%", isTarget: true }
    ],
    orderBook: {
      bids: [
        { price: 1439.80, qty: 4500, total: 4500, fillPct: 75 },
        { price: 1439.00, qty: 8200, total: 12700, fillPct: 95 },
        { price: 1438.00, qty: 6100, total: 18800, fillPct: 70 },
        { price: 1437.00, qty: 3800, total: 22600, fillPct: 50 },
        { price: 1435.50, qty: 9400, total: 32000, fillPct: 90 }
      ],
      asks: [
        { price: 1440.00, qty: 3800, total: 3800, fillPct: 65 },
        { price: 1440.80, qty: 5900, total: 9700, fillPct: 80 },
        { price: 1441.50, qty: 4300, total: 14000, fillPct: 55 },
        { price: 1442.50, qty: 7200, total: 21200, fillPct: 85 },
        { price: 1444.00, qty: 8600, total: 29800, fillPct: 95 }
      ]
    }
  },
  TATAMOTORS: {
    symbol: "TATAMOTORS",
    name: "Tata Motors Ltd",
    exchange: "NSE",
    isin: "INE155A01022",
    sector: "Automotive & EV",
    mcap: "₹3.61T",
    price: 980.50,
    changePrice: 23.00,
    changePercent: 2.40,
    isPositive: true,
    syncTime: "15:30 IST",
    status: "Market Open",
    metrics: {
      spotPrice: "₹980.50",
      exchangeTag: "NSE",
      dailyChange: "+2.40%",
      dailyDelta: "+₹23.00",
      range52Low: "₹612.00",
      range52High: "₹1,179.05",
      volume: "14.6M",
      avgVolume10D: "12.1M",
      beta: "1.42",
      hv: "24.5%",
      pe: "16.8",
      eps: "₹58.3"
    },
    indicators: {
      rsi: 68.9,
      rsiStatus: "High Bullish Surge",
      macdHist: "+7.8",
      macdVal: "+19.4",
      macdSignal: "+11.6",
      atr: "₹28.40",
      stopLoss: "₹955.00 (-2.6%)",
      sharpeSortino: "2.45 / 3.88",
      sentiment: "SYNTHESIZED: STRONG BULLISH ↑↑",
      shortTerm: { text: "Bullish (92%)", val: 92 },
      mediumTerm: { text: "Bullish (84%)", val: 84 },
      longTerm: { text: "Bullish (76%)", val: 76 }
    },
    prediction: {
      targetPrice7D: "₹1,024.00",
      targetDelta: "+₹43.50 (+4.44%)",
      targetPriceT1: "₹994.00",
      targetDeltaT1: "+₹13.50 Delta",
      direction: "STRONG BULLISH",
      directionBadge: "High Velocity",
      confidence: "91.2%",
      confidenceText: "Ultra High Certitude",
      confidenceInterval: "₹965.00 – ₹1,045.00",
      backtestAccuracy: "92.4%",
      dominantDriver: "Deep BiLSTM + EV Delivery Momentum",
      latency: "4.4 ms",
      lossRmse: "0.0112",
      nextDayPrediction: "₹994.00 (+1.38%)",
      activeArchitecture: "BiLSTM Neural Net (CUDA)",
      rmseValue: "14.20",
      consensusInference: "STRONG BUY (9.4 / 10)"
    },
    shapFeatures: [
      { name: "EV Volume Delivery Metrics", weight: 34, desc: "Record monthly retail deliveries reported in JLR / EV segments", icon: "electric_car", color: "text-secondary", barGrad: "from-secondary-container to-secondary" },
      { name: "Breakout Volume Expansion", weight: 24, desc: "Volume spike 1.6x 30-day moving average on breakout", icon: "bar_chart", color: "text-tertiary", barGrad: "from-tertiary-container to-tertiary" },
      { name: "21-Day EMA Slope Accel", weight: 18, desc: "Steep upward velocity across all momentum indicators", icon: "show_chart", color: "text-primary", barGrad: "from-primary-container to-primary" },
      { name: "Commodity (Steel/Battery) Basket", weight: 14, desc: "Declining raw material input cost curves supporting margins", icon: "inventory_2", color: "text-surface-tint", barGrad: "from-primary to-surface-tint" },
      { name: "Nifty Auto Index Beta", weight: 10, desc: "High relative strength compared to broader benchmark", icon: "hub", color: "text-secondary-fixed", barGrad: "from-secondary to-secondary-fixed" }
    ],
    forecastHorizonMatrix: [
      { step: "Day +1 (Tomorrow)", price: "₹994.00", ret: "+1.38%", high: "₹1,002.00", low: "₹982.00", spread: "₹20.00", conf: "94%" },
      { step: "Day +2", price: "₹1,004.50", ret: "+2.45%", high: "₹1,015.00", low: "₹990.00", spread: "₹25.00", conf: "90%" },
      { step: "Day +3", price: "₹1,012.00", ret: "+3.21%", high: "₹1,024.00", low: "₹998.00", spread: "₹26.00", conf: "87%" },
      { step: "Day +4", price: "₹1,016.80", ret: "+3.70%", high: "₹1,030.00", low: "₹1,002.00", spread: "₹28.00", conf: "84%" },
      { step: "Day +5", price: "₹1,020.00", ret: "+4.03%", high: "₹1,036.00", low: "₹1,006.00", spread: "₹30.00", conf: "82%" },
      { step: "Day +6", price: "₹1,022.50", ret: "+4.28%", high: "₹1,040.00", low: "₹1,008.00", spread: "₹32.00", conf: "79%" },
      { step: "Day +7 (Target Horizon)", price: "₹1,024.00", ret: "+4.44%", high: "₹1,045.00", low: "₹1,010.00", spread: "₹35.00", conf: "77%", isTarget: true }
    ],
    orderBook: {
      bids: [
        { price: 980.00, qty: 5600, total: 5600, fillPct: 85 },
        { price: 979.20, qty: 9400, total: 15000, fillPct: 95 },
        { price: 978.00, qty: 7200, total: 22200, fillPct: 70 },
        { price: 976.50, qty: 4900, total: 27100, fillPct: 55 },
        { price: 975.00, qty: 11200, total: 38300, fillPct: 90 }
      ],
      asks: [
        { price: 980.50, qty: 4200, total: 4200, fillPct: 65 },
        { price: 981.50, qty: 6800, total: 11000, fillPct: 80 },
        { price: 982.80, qty: 5100, total: 16100, fillPct: 60 },
        { price: 984.00, qty: 8900, total: 25000, fillPct: 90 },
        { price: 985.50, qty: 6300, total: 31300, fillPct: 50 }
      ]
    }
  }
};

export const MODELS_BENCHMARKS = [
  {
    id: "lr",
    name: "Linear Regression",
    category: "Classical Statistical",
    framework: "sklearn.linear",
    badge: "Baseline",
    badgeColor: "bg-surface-container-high text-on-surface-variant",
    description: "Baseline multi-variate ordinary least squares mapping parametric trajectory directly against historical moving averages and price derivatives.",
    target7D: "₹2,860.50",
    targetDelta: "+0.52%",
    confidenceText: "Confidence: Low",
    mae: "₹54.20",
    rmse: "58.40",
    r2: "0.782",
    r2Pct: "78.2%",
    mape: "2.15%",
    trainingTime: "0.24s (CPU)",
    parameters: "12 Weights",
    directionalAccuracy: "54.2%",
    latency: "0.8 ms",
    limitation: "Assumes homoscedasticity and strictly linear relationships. Severely underperforms during black swan volatility spikes, fat-tail drawdowns, and structural market regime switches.",
    targetFit: "High-frequency baseline arbitrage"
  },
  {
    id: "arima",
    name: "ARIMA (5, 1, 2)",
    category: "Econometric Time Series",
    framework: "statsmodels (p,d,q)",
    badge: "Stationary",
    badgeColor: "bg-secondary-container/20 text-secondary",
    description: "Stationary lag correlation model exploiting auto-regressive memory order (p=5), initial differencing (d=1), and moving average shock response (q=2).",
    target7D: "₹2,878.00",
    targetDelta: "+1.14%",
    confidenceText: "Confidence: Moderate",
    mae: "₹45.80",
    rmse: "48.60",
    r2: "0.844",
    r2Pct: "84.4%",
    mape: "1.72%",
    trainingTime: "4.12s (MLE)",
    parameters: "AIC: 4,120.8",
    directionalAccuracy: "61.8%",
    latency: "3.2 ms",
    limitation: "Requires strict stationarity transformations (differencing). Highly sensitive to hyperparameter choices (p, d, q) and fails to ingest multi-variate external market indicators simultaneously.",
    targetFit: "Mean-reverting statistical pairs & stationary indices"
  },
  {
    id: "lstm",
    name: "Bidirectional LSTM",
    category: "Deep Neural Network",
    framework: "PyTorch DeepNet",
    badge: "Rank #1 Optimal",
    badgeColor: "bg-tertiary-container text-on-tertiary font-bold shadow-sm",
    isFlagship: true,
    description: "Dual-layer bidirectional LSTM with sequence dropout (0.2) processing multi-frequency 60-day historical window vectors with non-linear activation.",
    target7D: "₹2,892.40",
    targetDelta: "+1.64%",
    confidenceText: "Confidence: 94.2%",
    mae: "₹38.10",
    rmse: "42.30",
    r2: "0.921",
    r2Pct: "92.1%",
    mape: "1.34%",
    trainingTime: "48.6s (CUDA A100)",
    parameters: "Epoch: 150 (Early Stop)",
    directionalAccuracy: "68.7%",
    latency: "4.2 ms",
    limitation: "Requires significant computational resources for training and hyperparameter tuning; susceptible to regime shocks if not re-calibrated on out-of-sample data.",
    targetFit: "Volatility regime forecasting & non-linear multi-factor trend continuation"
  }
];

export const PIPELINE_STAGES = [
  {
    phase: "PHASE 01",
    title: "Data Ingestion",
    icon: "database",
    color: "text-secondary",
    desc: "NSE Live API & Yahoo Finance Historical ingestion. Pulls 10-year OHLCV daily frequency + tick volumes.",
    stat: "T-Series: > 2,500 Rows"
  },
  {
    phase: "PHASE 02",
    title: "Preprocessing",
    icon: "cleaning_services",
    color: "text-secondary",
    desc: "Forward/backward fill for trading holidays, outlier winsorization [1%-99%], and bounded Min-Max feature normalization.",
    stat: "Scale: x' ∈ [0, 1]"
  },
  {
    phase: "PHASE 03",
    title: "Feature Eng.",
    icon: "precision_manufacturing",
    color: "text-tertiary",
    desc: "Extraction of 14-period RSI, MACD signal vectors, Bollinger envelope bands, 7/21/50 EMAs, and lagged return shifts.",
    stat: "D_features = 18 Tensors"
  },
  {
    phase: "PHASE 04",
    title: "Framing / Split",
    icon: "view_timeline",
    color: "text-primary",
    desc: "60-day sliding lookback windows mapped to T+1 ahead target. Chronological non-shuffled partition: 70/15/15.",
    stat: "Tensor: (N, 60, 18)"
  },
  {
    phase: "PHASE 05",
    title: "Model Training",
    icon: "psychology",
    color: "text-secondary",
    desc: "Parallel execution: Baseline OLS, Auto-ARIMA AIC minimization, and 2-layer Stacked LSTM with Dropout regularization.",
    stat: "Adam Opt • lr=1e-3"
  },
  {
    phase: "PHASE 06",
    title: "Inference / UI",
    icon: "insights",
    color: "text-tertiary",
    desc: "Inverse scale restitution, out-of-sample RMSE quantification, Monte Carlo dynamic confidence intervals projection.",
    stat: "95% Conf Bounds"
  }
];

export const LIVE_TICKERS = [
  { name: "NIFTY 50", price: "22,410.80", change: "+0.65%", isUp: true },
  { name: "SENSEX", price: "73,872.20", change: "+0.58%", isUp: true },
  { name: "NASDAQ", price: "18,290.40", change: "+0.92%", isUp: true },
  { name: "RELIANCE", price: "₹2,845.60", change: "+1.82%", isUp: true },
  { name: "TCS", price: "₹3,980.10", change: "-0.42%", isUp: false },
  { name: "INFY", price: "₹1,560.30", change: "+1.15%", isUp: true },
  { name: "HDFCBANK", price: "₹1,440.00", change: "+0.30%", isUp: true },
  { name: "TATAMOTORS", price: "₹980.50", change: "+2.40%", isUp: true }
];
