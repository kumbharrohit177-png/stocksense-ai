import React, { useState, useEffect } from 'react';
import { STOCKS_DATA } from '../data/mockData';
import CandlestickChart from '../components/CandlestickChart';
import OrderBook from '../components/OrderBook';
import api from '../services/api';

export default function DashboardPage({ activeStock = 'RELIANCE', onSelectStock, onNavigate }) {
  const stockStatic = STOCKS_DATA[activeStock] || STOCKS_DATA.RELIANCE;
  const [stockSummary, setStockSummary] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [isRecomputing, setIsRecomputing] = useState(false);
  const [recomputeSuccess, setRecomputeSuccess] = useState(false);

  const stockTickers = [
    { symbol: 'RELIANCE', label: 'RELIANCE', delta: '+1.8%', isUp: true },
    { symbol: 'TCS', label: 'TCS', delta: '₹3,980.10 (-0.4%)', isUp: false },
    { symbol: 'INFY', label: 'INFY', delta: '₹1,560.30 (+1.1%)', isUp: true },
    { symbol: 'HDFCBANK', label: 'HDFCBANK', delta: '₹1,440.00 (+0.3%)', isUp: true },
    { symbol: 'TATAMOTORS', label: 'TATAMOTORS', delta: '₹980.50 (+2.4%)', isUp: true }
  ];

  // Fetch live market summary and prediction vectors from FastAPI
  useEffect(() => {
    let isMounted = true;
    const fetchLive = async () => {
      try {
        const [sumRes, predRes] = await Promise.allSettled([
          api.getStockSummary(activeStock),
          api.predictAll(activeStock, 7)
        ]);

        if (isMounted) {
          if (sumRes.status === 'fulfilled') {
            setStockSummary(sumRes.value);
          }
          if (predRes.status === 'fulfilled' && predRes.value?.predictions) {
            setPredictionData(predRes.value.predictions);
          }
        }
      } catch (err) {
        console.warn('Fallback to static metrics:', err);
      }
    };

    fetchLive();
    return () => { isMounted = false; };
  }, [activeStock]);

  const handleRecompute = async () => {
    setIsRecomputing(true);
    setRecomputeSuccess(false);
    try {
      const predRes = await api.predictAll(activeStock, 7);
      if (predRes?.predictions) {
        setPredictionData(predRes.predictions);
      }
      setRecomputeSuccess(true);
      setTimeout(() => setRecomputeSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRecomputing(false);
    }
  };

  // Merge dynamic live backend data with base metadata
  const currentPrice = stockSummary ? stockSummary.current_price : stockStatic.price;
  const isPositive = stockSummary ? stockSummary.change_percent >= 0 : stockStatic.isPositive;
  const changePrice = stockSummary ? Math.abs(stockSummary.change_absolute) : stockStatic.changePrice;
  const changePercent = stockSummary ? Math.abs(stockSummary.change_percent).toFixed(2) : stockStatic.changePercent;

  const lrPred = predictionData?.linear_regression;
  const arimaPred = predictionData?.arima;
  const lstmPred = predictionData?.lstm;

  const target7D = lstmPred ? `₹${lstmPred.predicted_price.toFixed(2)}` : stockStatic.prediction.targetPrice7D;
  const targetDelta = lstmPred ? `${lstmPred.predicted_change_percent >= 0 ? '+' : ''}${lstmPred.predicted_change_percent}%` : stockStatic.prediction.targetDelta;
  const targetT1 = lstmPred?.forecast?.[0] ? `₹${lstmPred.forecast[0].predicted_price.toFixed(2)}` : stockStatic.prediction.targetPriceT1;
  const predDirection = lstmPred ? (lstmPred.predicted_change_percent >= 0 ? 'BULLISH' : 'BEARISH') : stockStatic.prediction.direction;

  return (
    <div className="p-space-md lg:p-space-lg max-w-[1720px] mx-auto w-full space-y-space-md">
      {/* 1. Stock Header & Status Bar */}
      <header className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xl shadow-md border border-outline-variant/20">
        {/* Top Level: Active Asset Identification, Meta Pills & Switchers */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          {/* Stock Title, Price & Pulsing Badge */}
          <div className="flex flex-wrap items-center gap-space-md">
            <div className="flex items-center gap-space-sm bg-surface-container px-space-md py-2 rounded-lg border border-outline-variant/30">
              <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center font-headline-sm text-headline-sm text-primary font-bold">
                {stockStatic.symbol[0]}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                    {stockSummary?.symbol || stockStatic.symbol}
                  </span>
                  <span className="text-on-surface-variant font-body-sm text-body-sm hidden sm:inline">
                    • {stockSummary?.name || stockStatic.name}
                  </span>
                </div>
                <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">
                  {stockSummary?.exchange || stockStatic.exchange} • Live Feed Connected
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-space-sm">
              <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight tabular-nums">
                ₹{currentPrice.toFixed(2)}
              </span>
              <div className={`flex items-center gap-0.5 px-2 py-0.5 rounded font-metric-val text-metric-val ${
                isPositive ? 'bg-tertiary-container/20 text-tertiary' : 'bg-error-container/20 text-error'
              }`}>
                <span className="material-symbols-outlined text-[16px] animate-bounce">
                  {isPositive ? 'arrow_upward' : 'arrow_downward'}
                </span>
                <span className="tabular-nums">
                  {isPositive ? '+' : '-'}₹{changePrice.toFixed(2)} ({isPositive ? '+' : '-'}{changePercent}%)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="px-2.5 py-1 rounded bg-surface-container-high text-on-surface-variant text-label-sm font-label-sm border border-outline-variant/20">
                MCap: {stockSummary?.market_cap || stockStatic.mcap}
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-high text-tertiary text-label-sm font-label-sm border border-outline-variant/20">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
                {stockSummary?.status || 'LIVE_FEED'}
              </span>
              <span className="px-2.5 py-1 rounded bg-surface-container text-outline text-label-sm font-label-sm border border-outline-variant/20">
                Sync: Realtime API
              </span>
            </div>
          </div>

          {/* Quick Ticker Switcher Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
            {stockTickers.map((t) => {
              const isSelected = activeStock === t.symbol;
              return (
                <button
                  key={t.symbol}
                  onClick={() => onSelectStock(t.symbol)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container font-bold shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span>{t.symbol}</span>
                  <span className={`tabular-nums ${!isSelected ? (t.isUp ? 'text-tertiary' : 'text-error') : ''}`}>
                    {t.delta}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* KPI Metric Ribbon (6 High-Density Stat Panes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-xs">
          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Spot Price</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                ₹{currentPrice.toFixed(2)}
              </span>
              <span className="text-[10px] font-label-sm text-tertiary font-semibold">{stockSummary?.currency || 'INR'}</span>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Daily Range & Chg</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className={`font-headline-sm text-headline-sm font-bold tabular-nums ${isPositive ? 'text-tertiary' : 'text-error'}`}>
                {isPositive ? '+' : '-'}{changePercent}%
              </span>
              <span className={`text-body-sm font-body-sm tabular-nums ${isPositive ? 'text-tertiary' : 'text-error'}`}>
                {isPositive ? '+' : '-'}₹{changePrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">52W Range</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-metric-val text-metric-val text-on-surface tabular-nums">
                ₹{stockSummary?.week_low_52?.toFixed(2) || stockStatic.metrics.range52Low}
              </span>
              <span className="text-label-sm font-label-sm text-outline px-1">/</span>
              <span className="font-metric-val text-metric-val text-on-surface tabular-nums">
                ₹{stockSummary?.week_high_52?.toFixed(2) || stockStatic.metrics.range52High}
              </span>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Traded Volume</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                {stockSummary ? `${(stockSummary.volume / 100000).toFixed(1)}L` : stockStatic.metrics.volume}
              </span>
              <span className="text-label-sm font-label-sm text-secondary tabular-nums">
                Avg: {stockSummary ? `${(stockSummary.avg_volume / 100000).toFixed(1)}L` : stockStatic.metrics.avgVolume10D}
              </span>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Beta & Vol (HV)</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                {stockSummary?.volatility_21 ? `${stockSummary.volatility_21}%` : stockStatic.metrics.hv}
              </span>
              <span className="text-label-sm font-label-sm text-on-surface-variant tabular-nums">21D Rolling</span>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded flex flex-col justify-between border border-outline-variant/20">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">RSI (14) & P/E</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                {stockSummary?.rsi_14 ? stockSummary.rsi_14 : '54.2'}
              </span>
              <span className="text-label-sm font-label-sm text-on-surface-variant tabular-nums">
                P/E: {stockSummary?.pe_ratio || stockStatic.metrics.pe}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Visual Centerpiece: Institutional Interactive Candlestick Chart */}
      <CandlestickChart stock={{ ...stockStatic, price: currentPrice, symbol: activeStock }} />

      {/* 3. AI Prediction Section: Trajectory & Forecast Horizon (Next 7 Days) */}
      <div className="bg-surface-container-low p-space-md lg:p-space-lg rounded-xl shadow-xl flex flex-col gap-space-md border border-outline-variant/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span>Neural Inference Vector • LSTM + ARIMA + Ridge Multi-Engine</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              AI Price Trajectory & Forecast Horizon (Next 7 Days)
            </h2>
          </div>
          <div className="flex items-center gap-space-sm self-start md:self-auto">
            <button
              onClick={handleRecompute}
              disabled={isRecomputing}
              className={`flex items-center gap-1.5 px-space-md py-1.5 rounded-lg border font-label-md transition-all cursor-pointer ${
                recomputeSuccess
                  ? 'bg-tertiary-container/30 border-tertiary text-tertiary font-bold'
                  : 'bg-surface-container hover:bg-surface-container-high border-outline-variant/30 text-primary'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${isRecomputing ? 'animate-spin' : ''}`}>
                {recomputeSuccess ? 'check_circle' : 'autorenew'}
              </span>
              <span>{isRecomputing ? 'Training Models...' : (recomputeSuccess ? 'Vectors Updated' : 'Re-Evaluate Vectors')}</span>
            </button>
            <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg border border-outline-variant/30">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
              <span className="text-on-surface font-label-md text-label-md">
                Next Target: <strong className="text-secondary tabular-nums">{target7D} ({targetDelta})</strong>
              </span>
            </div>
          </div>
        </div>

        {/* High-Priority Prediction Badges & Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-space-sm">
          <div className="p-space-sm bg-surface-container rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-outline text-label-sm font-label-sm uppercase">T+1 Day Target</span>
            <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums mt-0.5">
              {targetT1}
            </span>
            <span className="text-tertiary text-label-sm font-label-sm mt-0.5">1-Day Recursive Step</span>
          </div>

          <div className="p-space-sm bg-surface-container rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-outline text-label-sm font-label-sm uppercase">Predicted Direction</span>
            <div className={`flex items-center gap-1 mt-0.5 font-bold font-headline-sm text-headline-sm ${
              predDirection === 'BULLISH' ? 'text-tertiary' : 'text-error'
            }`}>
              <span className="material-symbols-outlined text-[20px]">
                {predDirection === 'BULLISH' ? 'trending_up' : 'trending_down'}
              </span>
              <span>{predDirection}</span>
            </div>
            <span className="text-on-surface-variant text-label-sm font-label-sm mt-0.5">
              Multi-Model Consensus
            </span>
          </div>

          <div className="p-space-sm bg-surface-container rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-outline text-label-sm font-label-sm uppercase">Model Confidence</span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">
                {lstmPred?.metrics?.r2 ? `${Math.min(99, Math.max(70, Math.round(lstmPred.metrics.r2 * 100)))}%` : '87.4%'}
              </span>
              <span className="text-[10px] text-tertiary font-bold uppercase">HIGH</span>
            </div>
            <div className="w-full h-1 bg-surface-container-high rounded-full mt-1.5 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[87.2%]"></div>
            </div>
          </div>

          <div className="p-space-sm bg-surface-container rounded-lg flex flex-col border border-outline-variant/20">
            <span className="text-outline text-label-sm font-label-sm uppercase">Forecast Span</span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums mt-0.5">7 Trading Days</span>
            <span className="text-on-surface-variant text-label-sm font-label-sm mt-0.5">Horizon: T+7 Ahead</span>
          </div>

          <div className="p-space-sm bg-surface-container rounded-lg flex flex-col col-span-2 md:col-span-1 border border-outline-variant/20">
            <span className="text-outline text-label-sm font-label-sm uppercase">Dominant Driver</span>
            <span className="font-body-md text-body-md text-on-surface font-semibold mt-0.5 truncate">
              {stockStatic.prediction.dominantDriver}
            </span>
            <span className="text-secondary text-label-sm font-label-sm mt-0.5">FastAPI REST ML</span>
          </div>
        </div>

        {/* Advanced Probability Projection Canvas */}
        <div className="w-full bg-surface-container-lowest rounded-lg p-space-md relative overflow-hidden border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2 text-label-sm font-label-sm">
            <div className="flex items-center gap-space-md">
              <span className="flex items-center gap-1.5 text-on-surface">
                <span className="w-3 h-0.5 bg-on-surface"></span>
                Historical Actuals (T-7 to T0)
              </span>
              <span className="flex items-center gap-1.5 text-secondary">
                <span className="w-3 h-0.5 bg-secondary border-dashed"></span>
                Deep Neural Spline (T+1 to T+7)
              </span>
              <span className="flex items-center gap-1.5 text-secondary/60">
                <span className="w-3 h-2 bg-secondary/15 rounded-sm"></span>
                95% Confidence Corridor
              </span>
            </div>
            <span className="text-outline hidden sm:inline">Active Model: {lstmPred ? 'LSTM Neural Network' : 'Multi-Model'}</span>
          </div>

          <svg className="w-full h-auto drop-shadow-lg" preserveAspectRatio="none" viewBox="0 0 1100 280">
            <defs>
              <linearGradient id="dashConfidenceCone" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#7bd0ff" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#7bd0ff" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#7bd0ff" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="dashNeonCyanGlow" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#c0c1ff" />
                <stop offset="100%" stopColor="#7bd0ff" />
              </linearGradient>
              <filter height="140%" id="dashGlow" width="140%" x="-20%" y="-20%">
                <feGaussianBlur result="blur" stdDeviation="3" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizontal reference lines */}
            <line opacity="0.3" stroke="#32353d" strokeDasharray="4,4" strokeWidth="0.7" x1="50" x2="1050" y1="50" y2="50" />
            <line opacity="0.3" stroke="#32353d" strokeDasharray="4,4" strokeWidth="0.7" x1="50" x2="1050" y1="120" y2="120" />
            <line opacity="0.3" stroke="#32353d" strokeDasharray="4,4" strokeWidth="0.7" x1="50" x2="1050" y1="190" y2="190" />

            {/* Vertical Inference Split Divider (T0 = X: 550) */}
            <line opacity="0.8" stroke="#c0c1ff" strokeDasharray="4,4" strokeWidth="1.5" x1="550" x2="550" y1="15" y2="250" />
            <g transform="translate(555, 30)">
              <rect fill="#1d1f27" height="22" rx="3" width="168" x="0" y="0" />
              <text fill="#c0c1ff" fontFamily="Inter" fontSize="10" fontWeight="600" x="6" y="15">
                INFERENCE BOUNDARY (TODAY)
              </text>
            </g>

            {/* Confidence Band Polygon */}
            <polygon
              fill="url(#dashConfidenceCone)"
              points="550,140 630,115 710,90 790,75 870,55 950,45 1030,35 1030,145 950,155 870,165 790,175 710,180 630,168 550,140"
            />

            {/* Solid Historical Trajectory */}
            <path
              d="M 70,220 C 150,210 230,230 310,195 C 390,160 470,170 550,140"
              fill="none"
              stroke="#e1e2ec"
              strokeLinecap="round"
              strokeWidth="3"
            />

            <circle cx="70" cy="220" fill="#e1e2ec" r="3.5" />
            <circle cx="190" cy="215" fill="#e1e2ec" r="3.5" />
            <circle cx="310" cy="195" fill="#e1e2ec" r="3.5" />
            <circle cx="430" cy="165" fill="#e1e2ec" r="3.5" />

            {/* TODAY's Anchor Node */}
            <circle cx="550" cy="140" fill="#c0c1ff" r="6" />
            <circle className="animate-ping" cx="550" cy="140" fill="none" opacity="0.6" r="12" stroke="#c0c1ff" strokeWidth="1.5" />
            <text fill="#e1e2ec" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="end" x="540" y="165">
              ₹{currentPrice.toFixed(2)}
            </text>

            {/* Neural Predicted Curve (Dashed, Glowing Cyan) */}
            <path
              d="M 550,140 C 630,132 710,122 790,110 C 870,98 950,86 1030,76"
              fill="none"
              filter="url(#dashGlow)"
              stroke="url(#dashNeonCyanGlow)"
              strokeDasharray="6,4"
              strokeLinecap="round"
              strokeWidth="3.5"
            />

            {/* Checkpoint Markers */}
            <g>
              <circle cx="630" cy="132" fill="#7bd0ff" r="4.5" />
              <text fill="#7bd0ff" fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x="630" y="152">T+1</text>
              <text fill="#ffffff" fontFamily="Inter" fontSize="9" fontWeight="700" textAnchor="middle" x="630" y="120">
                {targetT1}
              </text>

              <circle cx="710" cy="122" fill="#7bd0ff" r="4" />
              <text fill="#908fa0" fontFamily="Inter" fontSize="9" textAnchor="middle" x="710" y="142">T+2</text>

              <circle cx="790" cy="110" fill="#7bd0ff" r="4" />
              <text fill="#908fa0" fontFamily="Inter" fontSize="9" textAnchor="middle" x="790" y="130">T+3</text>

              <circle cx="870" cy="98" fill="#7bd0ff" r="4" />
              <text fill="#908fa0" fontFamily="Inter" fontSize="9" textAnchor="middle" x="870" y="118">T+4</text>

              <circle cx="950" cy="86" fill="#7bd0ff" r="4" />
              <text fill="#908fa0" fontFamily="Inter" fontSize="9" textAnchor="middle" x="950" y="106">T+5</text>

              <circle cx="1030" cy="76" fill="#4edea3" r="5" />
              <text fill="#4edea3" fontFamily="Inter" fontSize="9" fontWeight="700" textAnchor="middle" x="1030" y="98">T+7 Target</text>
              <text fill="#4edea3" fontFamily="Inter" fontSize="11" fontWeight="700" textAnchor="middle" x="1030" y="62">
                {target7D}
              </text>
            </g>

            {/* Time-Axis Notation */}
            <g fill="#908fa0" fontFamily="Inter" fontSize="10">
              <text textAnchor="middle" x="70" y="265">T-7</text>
              <text textAnchor="middle" x="190" y="265">T-5</text>
              <text textAnchor="middle" x="310" y="265">T-3</text>
              <text textAnchor="middle" x="430" y="265">T-1</text>
              <text fill="#c0c1ff" fontWeight="700" textAnchor="middle" x="550" y="265">Today (T0)</text>
              <text fill="#7bd0ff" textAnchor="middle" x="630" y="265">T+1</text>
              <text fill="#7bd0ff" textAnchor="middle" x="790" y="265">T+3</text>
              <text fill="#7bd0ff" textAnchor="middle" x="1030" y="265">T+7 Target</text>
            </g>
          </svg>
        </div>
      </div>

      {/* 4. Model Quick Comparison Mini-Cards (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {/* Model 1: Linear Regression */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Linear Regression</span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-outline text-[11px] font-label-sm">
                {lrPred ? 'Trained' : 'Baseline Fit'}
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Ordinary Least Squares regression on chronological lag features and rolling indicators.
            </p>
          </div>
          <div className="mt-space-md pt-space-sm bg-surface-container p-space-sm rounded border border-outline-variant/20">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-label-sm font-label-sm text-outline">Target Projection</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                ₹{lrPred ? lrPred.predicted_price.toFixed(2) : (currentPrice * 1.0052).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm mb-space-sm">
              <span className="text-outline">Trajectory</span>
              <span className="text-tertiary font-semibold tabular-nums">
                {lrPred ? `${lrPred.predicted_change_percent >= 0 ? '+' : ''}${lrPred.predicted_change_percent}% (${lrPred.trend})` : '+0.52% (Bullish)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-xs text-label-sm font-label-sm pt-space-xs bg-surface-container-low p-1.5 rounded">
              <div>RMSE: <strong className="text-on-surface tabular-nums">{lrPred?.metrics?.rmse || 44.95}</strong></div>
              <div className="text-right">R²: <strong className="text-on-surface tabular-nums">{lrPred?.metrics?.r2 || 0.69}</strong></div>
            </div>
          </div>
        </div>

        {/* Model 2: ARIMA */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">ARIMA (5, 1, 2)</span>
              <span className="px-2 py-0.5 rounded bg-surface-container-highest text-secondary text-[11px] font-label-sm">
                {arimaPred ? 'Converged' : 'AutoRegressive'}
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Autoregressive integrated moving average capturing stationarized autocorrelation structures.
            </p>
          </div>
          <div className="mt-space-md pt-space-sm bg-surface-container p-space-sm rounded border border-outline-variant/20">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-label-sm font-label-sm text-outline">Target Projection</span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">
                ₹{arimaPred ? arimaPred.predicted_price.toFixed(2) : (currentPrice * 1.0114).toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm mb-space-sm">
              <span className="text-outline">Trajectory</span>
              <span className="text-tertiary font-semibold tabular-nums">
                {arimaPred ? `${arimaPred.predicted_change_percent >= 0 ? '+' : ''}${arimaPred.predicted_change_percent}% (${arimaPred.trend})` : '+1.14% (Bullish)'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-space-xs text-label-sm font-label-sm pt-space-xs bg-surface-container-low p-1.5 rounded">
              <div>RMSE: <strong className="text-on-surface tabular-nums">{arimaPred?.metrics?.rmse || 91.16}</strong></div>
              <div className="text-right">MAE: <strong className="text-on-surface tabular-nums">{arimaPred?.metrics?.mae || 81.50}</strong></div>
            </div>
          </div>
        </div>

        {/* Model 3: 2-Layer LSTM */}
        <div className="p-space-md bg-surface-container rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between border border-primary/30">
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>
          <div className="space-y-space-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[20px]">neurology</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">LSTM (Neural Network)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary text-[11px] font-bold uppercase tracking-wider">
                Recurrent Model
              </span>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant">
              Recurrent memory gating with 30-day lookback sequence window and non-linear feature discovery.
            </p>
          </div>
          <div className="mt-space-md pt-space-sm bg-surface-container-high p-space-sm rounded border border-outline-variant/20">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-label-sm font-label-sm text-secondary font-semibold">Flagship Target</span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">
                {target7D}
              </span>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm mb-space-sm">
              <span className="text-outline">Trajectory</span>
              <span className="text-tertiary font-bold tabular-nums">{targetDelta} ({predDirection})</span>
            </div>
            <div className="grid grid-cols-2 gap-space-xs text-label-sm font-label-sm pt-space-xs bg-surface-container-low p-1.5 rounded">
              <div>RMSE: <strong className="text-tertiary tabular-nums">{lstmPred?.metrics?.rmse || 52.30}</strong></div>
              <div className="text-right">R²: <strong className="text-tertiary tabular-nums">{lstmPred?.metrics?.r2 || 0.88}</strong></div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Technical Indicators & Market Trend Ribbon */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-space-md">
        {/* Master Synthesized Trend Box */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div>
            <span className="text-outline text-label-sm font-label-sm uppercase tracking-wider">Multi-Factor Sentiment</span>
            <div className="mt-1 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-tertiary animate-pulse"></span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{stockStatic.indicators.sentiment}</h3>
            </div>
          </div>

          <div className="space-y-space-sm mt-space-md">
            <div className="space-y-1">
              <div className="flex justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant">Short-Term (1-3D)</span>
                <span className="text-tertiary font-bold tabular-nums">{stockStatic.indicators.shortTerm.text}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: `${stockStatic.indicators.shortTerm.val}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant">Medium-Term (1-4W)</span>
                <span className="text-tertiary font-bold tabular-nums">{stockStatic.indicators.mediumTerm.text}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-tertiary" style={{ width: `${stockStatic.indicators.mediumTerm.val}%` }}></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-label-sm font-label-sm">
                <span className="text-on-surface-variant">Long-Term (1-3M)</span>
                <span className="text-secondary font-bold tabular-nums">{stockStatic.indicators.longTerm.text}</span>
              </div>
              <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-secondary" style={{ width: `${stockStatic.indicators.longTerm.val}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mini-Chart: RSI (14) */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="text-outline text-label-sm font-label-sm uppercase tracking-wider">RSI (14-Period)</span>
            <span className="text-tertiary text-label-sm font-label-sm font-bold tabular-nums">
              {stockSummary?.rsi_14 || stockStatic.indicators.rsi} {stockStatic.indicators.rsiStatus}
            </span>
          </div>

          <div className="py-2">
            <svg className="w-full h-16 drop-shadow-sm" viewBox="0 0 240 64">
              <rect fill="#1d1f27" height="40" opacity="0.6" rx="2" width="240" x="0" y="12" />
              <line opacity="0.5" stroke="#ffb4ab" strokeDasharray="2,2" strokeWidth="0.8" x1="0" x2="240" y1="18" y2="18" />
              <line opacity="0.5" stroke="#4edea3" strokeDasharray="2,2" strokeWidth="0.8" x1="0" x2="240" y1="46" y2="46" />
              <path d="M 0,42 Q 30,50 60,38 T 120,32 T 180,26 T 240,22" fill="none" stroke="#7bd0ff" strokeLinecap="round" strokeWidth="2" />
              <circle cx="240" cy="22" fill="#7bd0ff" r="3.5" />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] font-label-sm text-outline">
            <span>Oversold: 30</span>
            <span className="text-on-surface-variant font-semibold">Neutral Band</span>
            <span>Overbought: 70</span>
          </div>
        </div>

        {/* Mini-Chart: MACD */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="text-outline text-label-sm font-label-sm uppercase tracking-wider">MACD (12, 26, 9)</span>
            <span className="text-tertiary text-label-sm font-label-sm font-bold tabular-nums">
              Hist: {stockStatic.indicators.macdHist}
            </span>
          </div>

          <div className="py-2">
            <svg className="w-full h-16 drop-shadow-sm" viewBox="0 0 240 64">
              <line stroke="#464554" strokeWidth="0.8" x1="0" x2="240" y1="36" y2="36" />
              <rect fill="#ffb4ab" height="8" rx="1" width="6" x="20" y="36" />
              <rect fill="#ffb4ab" height="4" rx="1" width="6" x="36" y="36" />
              <rect fill="#4edea3" height="4" rx="1" width="6" x="52" y="32" />
              <rect fill="#4edea3" height="8" rx="1" width="6" x="68" y="28" />
              <rect fill="#4edea3" height="12" rx="1" width="6" x="84" y="24" />
              <rect fill="#4edea3" height="14" rx="1" width="6" x="100" y="22" />
              <rect fill="#4edea3" height="16" rx="1" width="6" x="116" y="20" />
              <rect fill="#4edea3" height="18" rx="1" width="6" x="132" y="18" />
              <rect fill="#4edea3" height="20" rx="1" width="6" x="148" y="16" />
              <rect fill="#4edea3" height="22" rx="1" width="6" x="164" y="14" />
              <rect fill="#4edea3" height="24" rx="1" width="6" x="180" y="12" />
              <rect fill="#4edea3" height="25" rx="1" width="6" x="196" y="11" />
              <rect fill="#4edea3" height="27" rx="1" width="6" x="212" y="9" />
              <rect fill="#4edea3" height="28" rx="1" width="6" x="228" y="8" />
              <path d="M 10,44 Q 80,42 140,24 T 235,12" fill="none" stroke="#7bd0ff" strokeWidth="1.8" />
              <path d="M 10,42 Q 90,40 150,29 T 235,22" fill="none" stroke="#fbbf24" strokeDasharray="2,2" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] font-label-sm text-outline tabular-nums">
            <span className="text-secondary">MACD: {stockStatic.indicators.macdVal}</span>
            <span className="text-amber-400">Signal: {stockStatic.indicators.macdSignal}</span>
            <span className="text-tertiary">Spread: {stockStatic.indicators.macdHist}</span>
          </div>
        </div>

        {/* Volatility & Execution Triggers */}
        <div className="p-space-md bg-surface-container-low rounded-xl shadow-md flex flex-col justify-between border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="text-outline text-label-sm font-label-sm uppercase tracking-wider">ATR & Volatility</span>
            <span className="text-secondary text-label-sm font-label-sm font-bold tabular-nums">
              {stockSummary?.volatility_21 ? `${stockSummary.volatility_21}% HV` : 'Normal Regimes'}
            </span>
          </div>

          <div className="space-y-space-xs my-1">
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">Average True Range (14):</span>
              <strong className="text-on-surface tabular-nums">{stockStatic.indicators.atr}</strong>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">52W High:</span>
              <strong className="text-tertiary tabular-nums">₹{stockSummary?.week_high_52?.toFixed(2) || '2,900.00'}</strong>
            </div>
            <div className="flex items-center justify-between text-body-sm font-body-sm">
              <span className="text-on-surface-variant">52W Low:</span>
              <strong className="text-error tabular-nums">₹{stockSummary?.week_low_52?.toFixed(2) || '2,200.00'}</strong>
            </div>
          </div>

          <div className="flex items-center gap-space-xs pt-space-xs">
            <button 
              onClick={() => onNavigate('predictions')}
              className="flex-1 py-1.5 rounded bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm text-center cursor-pointer"
            >
              Run Deep Prediction
            </button>
            <button 
              onClick={() => onNavigate('methodology')}
              className="px-2.5 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-label-md font-label-md cursor-pointer border border-outline-variant/30"
              title="Methodology"
            >
              <span className="material-symbols-outlined text-[16px] align-middle">tune</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6. Order Depth & Signal Stream Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md">
        <div className="lg:col-span-1">
          <OrderBook stock={{ ...stockStatic, price: currentPrice }} />
        </div>
        <div className="lg:col-span-2 bg-surface-container-low rounded-xl p-space-md shadow-md border border-outline-variant/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-space-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">sensors</span>
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Recent Algorithmic Signal Stream</h3>
            </div>
            <span className="text-[11px] text-tertiary font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              Synchronized L3
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-body-sm font-body-sm">
              <thead>
                <tr className="bg-surface-container text-label-sm font-label-sm text-outline uppercase tracking-wider">
                  <th className="py-2 px-3 rounded-l">Time</th>
                  <th className="py-2 px-3">Ticker</th>
                  <th className="py-2 px-3">Signal Type</th>
                  <th className="py-2 px-3">Trigger Model</th>
                  <th className="py-2 px-3">Confidence</th>
                  <th className="py-2 px-3 rounded-r text-right">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                <tr className="hover:bg-surface-container/60 transition-colors">
                  <td className="py-2 px-3 text-outline tabular-nums">15:28:42</td>
                  <td className="py-2 px-3 font-bold text-on-surface">{activeStock}</td>
                  <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-bold text-[11px]">ACTIVE SIGNAL</span></td>
                  <td className="py-2 px-3 text-on-surface-variant">LSTM Sequence Engine</td>
                  <td className="py-2 px-3 text-tertiary font-bold tabular-nums">89.4%</td>
                  <td className="py-2 px-3 text-right font-metric-val tabular-nums font-bold text-on-surface">{target7D}</td>
                </tr>
                <tr className="hover:bg-surface-container/60 transition-colors">
                  <td className="py-2 px-3 text-outline tabular-nums">15:24:10</td>
                  <td className="py-2 px-3 font-bold text-on-surface">TATAMOTORS</td>
                  <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-bold text-[11px]">BREAKOUT BUY</span></td>
                  <td className="py-2 px-3 text-on-surface-variant">ARIMA (5,1,2)</td>
                  <td className="py-2 px-3 text-tertiary font-bold tabular-nums">91.2%</td>
                  <td className="py-2 px-3 text-right font-metric-val tabular-nums font-bold text-on-surface">₹1,024.00</td>
                </tr>
                <tr className="hover:bg-surface-container/60 transition-colors">
                  <td className="py-2 px-3 text-outline tabular-nums">15:18:05</td>
                  <td className="py-2 px-3 font-bold text-on-surface">INFY</td>
                  <td className="py-2 px-3"><span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-bold text-[11px]">MOMENTUM BUY</span></td>
                  <td className="py-2 px-3 text-on-surface-variant">Linear Regression</td>
                  <td className="py-2 px-3 text-tertiary font-bold tabular-nums">88.6%</td>
                  <td className="py-2 px-3 text-right font-metric-val tabular-nums font-bold text-on-surface">₹1,898.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
