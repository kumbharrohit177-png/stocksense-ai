import React, { useState } from 'react';
import { STOCKS_DATA } from '../data/mockData';

export default function LandingPage({ onNavigate, onSelectStock }) {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const stock = STOCKS_DATA.RELIANCE;

  return (
    <div className="flex flex-col w-full">
      {/* Top Atmospheric Mesh Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] bg-gradient-to-b from-primary/15 via-secondary/5 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-tertiary/10 blur-[120px] pointer-events-none rounded-full"></div>
        <div className="absolute top-80 left-[-8%] w-[450px] h-[450px] bg-primary/10 blur-[140px] pointer-events-none rounded-full"></div>

        {/* HERO SECTION */}
        <section className="relative w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop pt-space-lg md:pt-space-xl pb-space-xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-space-md">
            {/* Academic Pill Badge */}
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur-md shadow-sm border border-outline-variant/30">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
                Academic Research & Quantitative Intelligence
              </span>
              <span className="text-outline-variant font-label-sm">•</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                NSE / BSE Live Engine
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="font-display-lg text-display-lg text-on-surface font-extrabold tracking-tight">
              Predict the Market.<br />
              <span className="bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent">
                Understand the Trend.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              AI-powered stock market forecasting leveraging historical tick feeds, multi-factor time-series feature engineering, and state-of-the-art machine learning models with calibrated probabilistic uncertainty bounds.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-xs">
              <button
                onClick={() => onNavigate('dashboard')}
                className="group inline-flex items-center gap-space-sm px-space-lg py-3 rounded-lg bg-gradient-to-r from-primary to-inverse-primary text-on-primary font-label-md text-label-md transition-all duration-300 shadow-[0_0_24px_-4px_rgba(99,102,241,0.5)] hover:shadow-[0_0_32px_0px_rgba(99,102,241,0.7)] hover:scale-[1.02] cursor-pointer"
              >
                <span>Start Analysis</span>
                <span className="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1">
                  trending_up
                </span>
              </button>
              <button
                onClick={() => onNavigate('models')}
                className="inline-flex items-center gap-space-sm px-space-lg py-3 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md transition-all duration-200 hover:bg-surface-container-highest hover:text-secondary shadow-sm cursor-pointer border border-outline-variant/30"
              >
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
                <span>Explore Models</span>
              </button>
              <button
                onClick={() => onNavigate('methodology')}
                className="inline-flex items-center gap-space-xs px-space-md py-3 rounded-lg text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">description</span>
                <span>Read Paper</span>
              </button>
            </div>

            {/* Metric Readout Badges Bar */}
            <div className="w-full pt-space-md">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm bg-surface-container-low/60 backdrop-blur-xl p-space-sm rounded-xl border border-outline-variant/30">
                <div className="flex flex-col items-center py-2 px-3">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Validation Accuracy</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-sm text-headline-sm text-tertiary font-bold tabular-nums">89.4%</span>
                    <span className="font-label-sm text-label-sm text-tertiary/70">±1.2%</span>
                  </div>
                </div>
                <div className="flex flex-col items-center py-2 px-3">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Inference Latency</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold tabular-nums">14ms</span>
                    <span className="font-label-sm text-label-sm text-secondary/70">Edge CPU</span>
                  </div>
                </div>
                <div className="flex flex-col items-center py-2 px-3">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Indicators Processed</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold tabular-nums">24</span>
                    <span className="font-label-sm text-label-sm text-primary/70">Multi-Factor</span>
                  </div>
                </div>
                <div className="flex flex-col items-center py-2 px-3">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Confidence Level</span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">87.0%</span>
                    <span className="font-label-sm text-label-sm text-tertiary">Bayesian</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HERO VISUAL CENTERPIECE: Real-time Forecasting Interactive Canvas */}
          <div className="mt-space-lg w-full relative" id="visualizer">
            <div className="bg-surface-container rounded-xl shadow-2xl overflow-hidden p-space-md md:p-space-lg relative border border-outline-variant/30">
              {/* Viewport Header Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-md mb-space-md border-b border-outline-variant/20">
                <div className="flex items-center gap-space-md">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">RELIANCE.NSE</span>
                    <span className="px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-secondary uppercase font-semibold">
                      1D TF
                    </span>
                  </div>
                  <div className="flex items-baseline gap-space-xs tabular-nums">
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">₹2,845.60</span>
                    <span className="font-metric-val text-metric-val text-tertiary font-semibold flex items-center">
                      <span className="material-symbols-outlined text-[16px]">arrow_drop_up</span>
                      +1.82% (+₹50.80)
                    </span>
                  </div>
                </div>

                {/* Segmented Timeframe Switcher & Model Pill Selector */}
                <div className="flex items-center gap-space-xs bg-surface-container-lowest p-1 rounded-lg border border-outline-variant/30">
                  {['15m', '1H', '1D', '1W'].map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTimeframe(tf)}
                      className={`px-2.5 py-1 rounded font-label-sm text-label-sm transition-colors cursor-pointer ${
                        selectedTimeframe === tf
                          ? 'bg-surface-container-high text-primary font-bold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {tf}
                    </button>
                  ))}
                  <span className="text-outline-variant px-1 font-label-sm">|</span>
                  <span className="px-2 py-0.5 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                    BiLSTM Model
                  </span>
                </div>
              </div>

              {/* Main Chart Vector Canvas Area */}
              <div className="relative w-full h-[360px] md:h-[420px] bg-surface-container-lowest rounded-lg p-space-sm overflow-hidden flex flex-col justify-between border border-outline-variant/30">
                {/* Technical Overlay Watermark & Grid Background */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
                  {Array.from({ length: 36 }).map((_, idx) => (
                    <div key={idx} className="border-r border-b border-outline"></div>
                  ))}
                </div>

                {/* SVG Candlestick & Projected Spline Canvas */}
                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
                  <defs>
                    <linearGradient id="landingPredictionGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#7bd0ff" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7bd0ff" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="landingConeGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.35" />
                    </linearGradient>
                    <filter height="140%" id="landingGlow" width="140%" x="-20%" y="-20%">
                      <feGaussianBlur result="blur" stdDeviation="3" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Moving Average Lines (0 to 650px) */}
                  <path d="M 40,290 Q 120,270 200,285 T 380,240 T 520,200 T 650,180" fill="none" opacity="0.6" stroke="#908fa0" strokeDasharray="3 3" strokeWidth="1.5" />
                  <path d="M 40,260 Q 140,230 220,250 T 400,210 T 530,175 T 650,165" fill="none" opacity="0.8" stroke="#c0c1ff" strokeWidth="1.8" />

                  {/* Historic Candlesticks */}
                  <line stroke="#4edea3" strokeWidth="1" x1="70" x2="70" y1="240" y2="300" />
                  <rect fill="#4edea3" height="30" rx="1" width="8" x="66" y="255" />

                  <line stroke="#ffb4ab" strokeWidth="1" x1="120" x2="120" y1="230" y2="290" />
                  <rect fill="#ffb4ab" height="35" rx="1" width="8" x="116" y="240" />

                  <line stroke="#4edea3" strokeWidth="1" x1="170" x2="170" y1="220" y2="280" />
                  <rect fill="#4edea3" height="32" rx="1" width="8" x="166" y="235" />

                  <line stroke="#4edea3" strokeWidth="1" x1="220" x2="220" y1="200" y2="260" />
                  <rect fill="#4edea3" height="30" rx="1" width="8" x="216" y="215" />

                  <line stroke="#ffb4ab" strokeWidth="1" x1="270" x2="270" y1="210" y2="270" />
                  <rect fill="#ffb4ab" height="28" rx="1" width="8" x="266" y="225" />

                  <line stroke="#4edea3" strokeWidth="1" x1="320" x2="320" y1="180" y2="250" />
                  <rect fill="#4edea3" height="40" rx="1" width="8" x="316" y="195" />

                  <line stroke="#ffb4ab" strokeWidth="1" x1="370" x2="370" y1="190" y2="245" />
                  <rect fill="#ffb4ab" height="32" rx="1" width="8" x="366" y="200" />

                  <line stroke="#4edea3" strokeWidth="1" x1="420" x2="420" y1="170" y2="230" />
                  <rect fill="#4edea3" height="36" rx="1" width="8" x="416" y="180" />

                  <line stroke="#4edea3" strokeWidth="1" x1="470" x2="470" y1="150" y2="210" />
                  <rect fill="#4edea3" height="35" rx="1" width="8" x="466" y="160" />

                  <line stroke="#ffb4ab" strokeWidth="1" x1="520" x2="520" y1="160" y2="220" />
                  <rect fill="#ffb4ab" height="34" rx="1" width="8" x="516" y="170" />

                  <line stroke="#4edea3" strokeWidth="1" x1="570" x2="570" y1="130" y2="195" />
                  <rect fill="#4edea3" height="35" rx="1" width="8" x="566" y="145" />

                  {/* T0 Current Candle */}
                  <line stroke="#4edea3" strokeWidth="1.5" x1="620" x2="620" y1="120" y2="185" />
                  <rect fill="#4edea3" filter="url(#landingGlow)" height="40" rx="1" width="10" x="615" y="132" />

                  {/* T0 Divider */}
                  <line opacity="0.7" stroke="#8083ff" strokeDasharray="4 4" strokeWidth="1" x1="650" x2="650" y1="0" y2="400" />

                  {/* 87% Confidence Shaded Corridor */}
                  <polygon fill="url(#landingConeGrad)" points="650,150 720,110 800,80 880,60 960,45 960,195 880,180 800,185 720,180 650,150" />
                  <path d="M 650,150 Q 720,180 800,185 T 960,195" fill="none" opacity="0.6" stroke="#7bd0ff" strokeDasharray="2 4" strokeWidth="1.2" />
                  <path d="M 650,150 Q 720,110 800,80 T 960,45" fill="none" opacity="0.6" stroke="#7bd0ff" strokeDasharray="2 4" strokeWidth="1.2" />

                  {/* AI Forecast Spline Curve */}
                  <path d="M 650,150 C 720,135 770,115 820,105 C 870,95 910,85 960,78" fill="none" filter="url(#landingGlow)" stroke="#7bd0ff" strokeWidth="3.5" />
                  <path d="M 650,150 C 720,135 770,115 820,105 C 870,95 910,85 960,78" fill="none" stroke="#c0c1ff" strokeWidth="1.5" />

                  {/* Target Nodes */}
                  <circle cx="820" cy="105" fill="#7bd0ff" filter="url(#landingGlow)" r="5" />
                  <circle cx="820" cy="105" fill="#ffffff" r="2" />
                  <circle cx="960" cy="78" fill="#4edea3" filter="url(#landingGlow)" r="6" />
                  <circle cx="960" cy="78" fill="#ffffff" r="3" />
                </svg>

                {/* T0 Marker Pins */}
                <div className="absolute top-4 left-[64%] -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold tracking-wide border border-outline-variant/30">
                  <span>T₀ LIVE CUTOFF</span>
                </div>
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-medium border border-secondary/20">
                  <span className="material-symbols-outlined text-[14px]">insights</span>
                  <span>87% CONFIDENCE BAND</span>
                </div>

                {/* Dynamic Floating Telemetry Overlay Cards */}
                <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm mt-auto">
                  <div className="bg-surface-container/90 backdrop-blur-md p-space-sm rounded-lg shadow-lg border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Next Day Prediction</span>
                    <div className="flex items-baseline gap-space-xs mt-1">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">₹2,892.40</span>
                      <span className="font-label-md text-label-md text-tertiary font-semibold tabular-nums">+1.64%</span>
                    </div>
                    <div className="w-full bg-surface-container-lowest h-1 rounded-full mt-2 overflow-hidden">
                      <div className="bg-tertiary h-full w-[82%]"></div>
                    </div>
                  </div>

                  <div className="bg-surface-container/90 backdrop-blur-md p-space-sm rounded-lg shadow-lg border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Active Architecture</span>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold truncate block mt-1">Multi-BiLSTM</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">256-hidden units • Adam Opt</span>
                  </div>

                  <div className="bg-surface-container/90 backdrop-blur-md p-space-sm rounded-lg shadow-lg border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Loss Function (RMSE)</span>
                    <div className="flex items-baseline gap-space-xs mt-1">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold tabular-nums">42.30</span>
                      <span className="font-label-sm text-label-sm text-tertiary">Lowest test error</span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">MAE: ₹34.12 • Epoch 120/120</span>
                  </div>

                  <div className="bg-surface-container/90 backdrop-blur-md p-space-sm rounded-lg shadow-lg border border-outline-variant/30">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider block">Consensus Inference</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-headline-sm text-headline-sm font-bold tracking-wide">
                        STRONG BUY
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Signal strength: 8.8 / 10</span>
                  </div>
                </div>
              </div>

              {/* Bottom Visualizer Footer Controls */}
              <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-sm text-label-sm font-label-sm text-on-surface-variant">
                <div className="flex items-center gap-space-md">
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-[#c0c1ff] rounded"></span> MA (21-Day EMA)</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-1 bg-[#7bd0ff] rounded"></span> AI Projected Trajectory</span>
                  <span className="flex items-center gap-1.5"><span className="w-2.5 h-2 bg-secondary/20 rounded"></span> P90 Confidence Zone</span>
                </div>
                <div className="tabular-nums flex items-center gap-2">
                  <span className="text-tertiary">● Live Stream Hooked</span>
                  <span>Updated: Just Now</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: FOUR HIGH-IMPACT FEATURE PANELS */}
        <section className="w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop py-space-xl">
          <div className="flex flex-col space-y-space-xs mb-space-lg">
            <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-widest">
              Algorithmic Foundation
            </span>
            <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
              Institutional-Grade Quantitative Capabilities
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
              Engineered from raw exchange telemetry through mathematical signal pipelines to actionable forecast intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {/* Feature 1: Historical Market Analysis */}
            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-colors duration-200 border border-outline-variant/20">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">query_stats</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider block mb-1">DATA PROCESSING</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Historical Market Analysis</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  High-frequency tick and daily OHLCV historical data normalization. Automatically runs statistical distribution checks, stationarity testing (ADF test), and winsorization to eliminate fat-tail outlier distortions.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg space-y-2 border border-outline-variant/20">
                <div className="flex justify-between items-center text-label-sm font-label-sm text-outline">
                  <span>Log Returns Distribution (ADF p &lt; 0.01)</span>
                  <span className="text-tertiary">Normalized N(0, σ²)</span>
                </div>
                <div className="h-16 flex items-end gap-1.5 pt-2">
                  <div className="flex-1 bg-surface-container-high h-[15%] rounded-t"></div>
                  <div className="flex-1 bg-surface-container-high h-[28%] rounded-t"></div>
                  <div className="flex-1 bg-primary/40 h-[45%] rounded-t"></div>
                  <div className="flex-1 bg-primary/70 h-[70%] rounded-t"></div>
                  <div className="flex-1 bg-primary h-[95%] rounded-t"></div>
                  <div className="flex-1 bg-primary/70 h-[72%] rounded-t"></div>
                  <div className="flex-1 bg-primary/40 h-[40%] rounded-t"></div>
                  <div className="flex-1 bg-surface-container-high h-[22%] rounded-t"></div>
                  <div className="flex-1 bg-surface-container-high h-[10%] rounded-t"></div>
                </div>
              </div>
            </div>

            {/* Feature 2: AI-Powered Predictions */}
            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-colors duration-200 border border-outline-variant/20">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">psychology</span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider block mb-1">TEMPORAL PROJECTIONS</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">AI-Powered Predictions</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Forward-looking trend forecasting across 1-day, 7-day, and 30-day time horizons. Rather than rigid point estimates, the system outputs Bayesian confidence corridors indicating tail risks and regime shifts.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg space-y-2.5 border border-outline-variant/20">
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface font-medium">1-Day Horizon Target</span>
                  <span className="text-tertiary font-bold tabular-nums font-metric-val text-metric-val">₹2,892.40 (94% Conf.)</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full w-[94%]"></div>
                </div>
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface font-medium">7-Day Multi-Step</span>
                  <span className="text-secondary font-bold tabular-nums font-metric-val text-metric-val">₹2,960.10 (86% Conf.)</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[86%]"></div>
                </div>
                <div className="flex justify-between items-center text-label-sm font-label-sm">
                  <span className="text-on-surface font-medium">30-Day Macro Trajectory</span>
                  <span className="text-primary font-bold tabular-nums font-metric-val text-metric-val">₹3,040.00 (78% Conf.)</span>
                </div>
                <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full w-[78%]"></div>
                </div>
              </div>
            </div>

            {/* Feature 3: Multi-Model Analysis */}
            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-colors duration-200 border border-outline-variant/20">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-tertiary mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">compare</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider block mb-1">BENCHMARK ENSEMBLE</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Multi-Model Analysis</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Rigorous cross-evaluation benchmarking comparing Linear Regression baseline, classical ARIMA econometric forecasting, and high-capacity LSTM architectures to ensure statistical validity without overfitting.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg grid grid-cols-3 gap-2 text-center border border-outline-variant/20">
                <div className="p-2 rounded bg-surface-container">
                  <span className="font-label-sm text-label-sm text-outline block">LinReg R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface-variant tabular-nums">0.78</span>
                  <span className="font-label-sm text-label-sm text-error/80 block mt-0.5">High Bias</span>
                </div>
                <div className="p-2 rounded bg-surface-container">
                  <span className="font-label-sm text-label-sm text-outline block">ARIMA R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary tabular-nums">0.84</span>
                  <span className="font-label-sm text-label-sm text-secondary/80 block mt-0.5">Lag Sensitive</span>
                </div>
                <div className="p-2 rounded bg-surface-container-high border border-primary/20">
                  <span className="font-label-sm text-label-sm text-primary block font-semibold">LSTM R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary tabular-nums">0.92</span>
                  <span className="font-label-sm text-label-sm text-tertiary block mt-0.5 font-bold">Optimal Fit</span>
                </div>
              </div>
            </div>

            {/* Feature 4: Interactive Visualizations */}
            <div className="bg-surface-container-low p-space-lg rounded-xl flex flex-col justify-between group hover:bg-surface-container transition-colors duration-200 border border-outline-variant/20">
              <div>
                <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary-fixed mb-space-md shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">candlestick_chart</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary-fixed font-semibold uppercase tracking-wider block mb-1">PRO TRADING UI</span>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">Interactive Visualizations</h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-space-md">
                  Institutional-grade charting engine loaded with dynamic Exponential Moving Averages (EMA 7, 21, 50), MACD momentum divergence sweeps, RSI bands, and zero-latency crosshair telemetry.
                </p>
              </div>
              <div className="bg-surface-container-lowest p-space-md rounded-lg flex items-center justify-between gap-space-sm border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase">RSI (14-period)</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface tabular-nums">64.2</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Bullish Momentum</span>
                </div>
                <div className="flex-1 max-w-[140px] h-10 flex items-center">
                  <svg className="w-full h-full" fill="none" viewBox="0 0 100 30">
                    <path d="M 0,22 Q 25,28 50,15 T 100,8" stroke="#4edea3" strokeWidth="2" />
                    <line opacity="0.4" stroke="#908fa0" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="100" y1="10" y2="10" />
                    <line opacity="0.4" stroke="#908fa0" strokeDasharray="2 2" strokeWidth="1" x1="0" x2="100" y1="24" y2="24" />
                  </svg>
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-label-sm text-label-sm text-outline uppercase">MACD Hist</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary tabular-nums">+14.28</span>
                  <span className="font-label-sm text-label-sm text-tertiary">Crossover Valid</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: ARCHITECTURE & MODEL BENCHMARK OVERVIEW */}
        <section className="w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop py-space-xl" id="models">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-md">
            <div>
              <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-widest block mb-1">
                Machine Learning Frameworks
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                Model Architecture Benchmark
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Trained and cross-validated across a 10-year rolling window of historical NSE equities data.
              </p>
            </div>
            <div className="flex items-center gap-space-xs text-label-sm font-label-sm text-outline">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Walk-Forward Cross Validation: K=5 Folds</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Card 1: Linear Regression */}
            <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all duration-300 border border-outline-variant/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-outline/5 rounded-bl-full pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-surface-container font-label-sm text-label-sm font-bold text-outline uppercase">
                    Baseline Model
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">sklearn.linear</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Linear Regression</h3>
                <p className="font-label-sm text-label-sm text-primary font-medium mt-0.5 mb-space-sm">Baseline Empirical Regression</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  Computes best-fit hyperplane across multi-lag return parameters. Establishes the lower performance threshold and isolates strong linear price correlations across broader macroeconomic indices.
                </p>
              </div>

              {/* Sparkline 1 */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg mb-space-md border border-outline-variant/20">
                <div className="flex justify-between items-center text-label-sm font-label-sm text-outline mb-1">
                  <span>Regression Fit Line</span>
                  <span>Scatter vs Prediction</span>
                </div>
                <svg className="w-full h-20" viewBox="0 0 200 80">
                  <circle cx="20" cy="65" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="35" cy="55" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="50" cy="58" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="70" cy="40" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="90" cy="48" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="110" cy="35" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="130" cy="30" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="150" cy="22" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="170" cy="18" fill="#908fa0" opacity="0.6" r="2" />
                  <circle cx="185" cy="15" fill="#908fa0" opacity="0.6" r="2" />
                  <line stroke="#c7c4d7" strokeWidth="2" x1="15" x2="190" y1="68" y2="14" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-space-xs pt-space-xs border-t border-outline-variant/20">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Coefficient R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface tabular-nums">0.78</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Mean Absolute Err</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-on-surface tabular-nums">₹54.20</span>
                </div>
              </div>
            </div>

            {/* Card 2: ARIMA */}
            <div className="bg-surface-container-low rounded-xl p-space-lg flex flex-col justify-between shadow-lg relative overflow-hidden group hover:bg-surface-container transition-all duration-300 border border-outline-variant/20">
              <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/5 rounded-bl-full pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-secondary-container/20 font-label-sm text-label-sm font-bold text-secondary uppercase">
                    Statistical Model
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">statsmodels (p,d,q)</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">ARIMA (5, 1, 2)</h3>
                <p className="font-label-sm text-label-sm text-secondary font-medium mt-0.5 mb-space-sm">Statistical Time Series Modeling</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  AutoRegressive Integrated Moving Average framework capturing cyclic autocorrelation, mean-reversion signatures, and day-of-week seasonality factors within stationary differenced series.
                </p>
              </div>

              {/* Sparkline 2 */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg mb-space-md border border-outline-variant/20">
                <div className="flex justify-between items-center text-label-sm font-label-sm text-outline mb-1">
                  <span>Oscillatory Cycle Fit</span>
                  <span className="text-secondary">Autoregressive Wave</span>
                </div>
                <svg className="w-full h-20" viewBox="0 0 200 80">
                  <path d="M 10,45 Q 35,15 65,42 T 120,40 T 170,25 T 195,50" fill="none" stroke="#464554" strokeDasharray="2 2" strokeWidth="1.5" />
                  <path d="M 10,48 Q 35,20 65,40 T 120,38 T 170,30 T 195,45" fill="none" stroke="#7bd0ff" strokeWidth="2.2" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-space-xs pt-space-xs border-t border-outline-variant/20">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Coefficient R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary tabular-nums">0.84</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Test Loss (RMSE)</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary tabular-nums">48.60</span>
                </div>
              </div>
            </div>

            {/* Card 3: LSTM */}
            <div className="bg-surface-container-high rounded-xl p-space-lg flex flex-col justify-between shadow-xl relative overflow-hidden group hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.3)] transition-all duration-300 border border-primary/30">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 rounded-full blur-xl pointer-events-none"></div>
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="px-2.5 py-1 rounded bg-tertiary-container/30 font-label-sm text-label-sm font-bold text-tertiary uppercase flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">military_tech</span>
                    Best Performer
                  </span>
                  <span className="font-label-sm text-label-sm text-primary font-mono">PyTorch DeepNet</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface">Bidirectional LSTM</h3>
                <p className="font-label-sm text-label-sm text-tertiary font-medium mt-0.5 mb-space-sm">Deep Sequential Neural Architecture</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                  Multi-layer recurrent cells with memory gates that learn long-term dependencies across multi-variate feature matrices (price + volume + RSI + sentiment), capturing complex non-linear sequence transitions.
                </p>
              </div>

              {/* Sparkline 3 */}
              <div className="bg-surface-container-lowest p-space-sm rounded-lg mb-space-md border border-outline-variant/20">
                <div className="flex justify-between items-center text-label-sm font-label-sm text-outline mb-1">
                  <span>Sequence Memory Path</span>
                  <span className="text-tertiary font-semibold">92% Trajectory Precision</span>
                </div>
                <svg className="w-full h-20" viewBox="0 0 200 80">
                  <path d="M 10,60 L 35,45 L 60,65 L 85,30 L 115,50 L 140,25 L 165,35 L 190,15" fill="none" stroke="#464554" strokeWidth="1.5" />
                  <path d="M 10,58 L 35,44 L 60,62 L 85,32 L 115,48 L 140,26 L 165,33 L 190,16" fill="none" stroke="#4edea3" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="grid grid-cols-2 gap-space-xs pt-space-xs border-t border-outline-variant/20">
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Coefficient R²</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary tabular-nums">0.92</span>
                </div>
                <div>
                  <span className="font-label-sm text-label-sm text-outline uppercase block">Test Loss (RMSE)</span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary tabular-nums">42.30</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: REAL-TIME INFERENCE PIPELINE CALLOUT */}
        <section className="w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop py-space-md">
          <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl border border-outline-variant/30">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg">
              <div className="space-y-space-xs max-w-xl">
                <span className="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider block">
                  PIPELINE ARCHITECTURE
                </span>
                <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  End-to-End Automated Feature Extraction Pipeline
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Every 60 seconds, raw NSE feed streams are parsed through statistical feature pipelines. 24 technical indicators—including Bollinger Bands, Stochastic Oscillator, Average True Range (ATR), and On-Balance Volume (OBV)—are synthesized into multidimensional tensors for instant inference.
                </p>
              </div>

              {/* Visual Pipeline Steps Flow */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-space-xs w-full lg:w-auto">
                <div className="flex flex-col items-center bg-surface-container p-space-md rounded-lg flex-1 min-w-[110px] text-center border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[24px] mb-1">dataset</span>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">Data Ingest</span>
                  <span className="text-[10px] font-label-sm text-outline">Tick Feeds</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] hidden sm:block">arrow_forward</span>
                <div className="flex flex-col items-center bg-surface-container p-space-md rounded-lg flex-1 min-w-[110px] text-center border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[24px] mb-1">tune</span>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">Engineering</span>
                  <span className="text-[10px] font-label-sm text-outline">24 TA Features</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] hidden sm:block">arrow_forward</span>
                <div className="flex flex-col items-center bg-surface-container p-space-md rounded-lg flex-1 min-w-[110px] text-center border border-outline-variant/20">
                  <span className="material-symbols-outlined text-tertiary text-[24px] mb-1">memory</span>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface">BiLSTM Layer</span>
                  <span className="text-[10px] font-label-sm text-outline">Forward Pass</span>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px] hidden sm:block">arrow_forward</span>
                <div className="flex flex-col items-center bg-surface-container-high p-space-md rounded-lg flex-1 min-w-[110px] text-center shadow-sm border border-tertiary/30">
                  <span className="material-symbols-outlined text-tertiary text-[24px] mb-1">verified</span>
                  <span className="font-label-sm text-label-sm font-bold text-tertiary">Forecast</span>
                  <span className="text-[10px] font-label-sm text-outline">87% Conf. P90</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: ACADEMIC CAPSTONE CALLOUT BANNER */}
        <section className="w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop py-space-xl" id="whitepaper">
          <div className="relative bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high rounded-2xl p-space-lg md:p-space-xl overflow-hidden shadow-2xl border border-outline-variant/30">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg relative z-10">
              <div className="space-y-space-sm max-w-2xl">
                <div className="inline-flex items-center gap-space-xs px-2.5 py-1 rounded bg-primary/10 text-primary font-label-sm text-label-sm font-semibold border border-primary/20">
                  <span className="material-symbols-outlined text-[16px]">school</span>
                  <span>FINAL YEAR ACADEMIC CAPSTONE PROJECT</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
                  Department of Artificial Intelligence & Machine Learning
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Supervised under the Faculty of Computing & Quantitative Finance. This project demonstrates comparative machine learning architectures applied to non-stationary financial time series, implementing strict walk-forward evaluation, out-of-sample stress tests, and automated hyperparameter optimization.
                </p>
                <div className="flex flex-wrap items-center gap-space-md text-label-sm font-label-sm text-outline pt-space-xs">
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Open Source Codebase</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Complete Dataset Pipeline</span>
                  <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Peer-Reviewed Methodology</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-space-sm w-full lg:w-auto shrink-0">
                <button
                  onClick={() => onNavigate('methodology')}
                  className="inline-flex items-center justify-center gap-space-sm px-space-lg py-3 rounded-lg bg-on-surface text-inverse-on-surface font-label-md text-label-md font-bold transition-transform hover:scale-[1.02] shadow-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Download Research Paper (PDF)</span>
                </button>
                <button
                  onClick={() => onNavigate('methodology')}
                  className="inline-flex items-center justify-center gap-space-sm px-space-lg py-3 rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-bright transition-colors shadow-sm cursor-pointer border border-outline-variant/30"
                >
                  <span className="material-symbols-outlined text-[20px]">code</span>
                  <span>GitHub Repository & Notebooks</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: COMPREHENSIVE DISCLAIMER BANNER */}
        <section className="w-full max-w-[1400px] mx-auto px-gutter md:px-margin-desktop pb-space-xl">
          <div className="bg-surface-container-lowest p-space-md rounded-xl space-y-space-xs text-on-surface-variant/80 border border-outline-variant/20">
            <div className="flex items-center gap-space-xs text-error font-label-sm text-label-sm font-semibold">
              <span className="material-symbols-outlined text-[18px]">warning</span>
              <span>ACADEMIC & RESEARCH DEMONSTRATION DISCLAIMER</span>
            </div>
            <p className="font-body-sm text-body-sm leading-relaxed text-outline">
              StockAI is built exclusively for university academic research, experimental machine learning benchmarking, and educational evaluation of algorithmic quantitative methods. Predictions generated by Linear Regression, ARIMA, and LSTM models represent statistical outputs calculated from historical data sequences and should not be construed as investment, financial, or trading advice. Past statistical performance does not guarantee future financial market results.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
