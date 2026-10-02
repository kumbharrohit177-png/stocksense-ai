import React from 'react';
import { PIPELINE_STAGES } from '../data/mockData';

export default function MethodologyPage({ onNavigate }) {
  return (
    <div className="flex flex-col w-full">
      {/* TOP METRIC & ACADEMIC BANNER STRIP */}
      <section className="w-full px-gutter md:px-gutter-desktop py-space-sm bg-surface-container-lowest border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary text-label-sm font-label-sm uppercase tracking-wider font-semibold border border-primary/20">
              Capstone Research
            </span>
            <span className="text-on-surface-variant text-label-sm font-label-sm">
              B.Tech AI & Data Science • Automated Quantitative Inference Engine
            </span>
          </div>
          <div className="flex items-center gap-space-lg text-label-sm font-label-sm flex-wrap">
            <span className="text-on-surface-variant">Pipeline Status: <span className="text-tertiary font-metric-val text-metric-val font-semibold">SYNCED [ADF p&lt;0.01]</span></span>
            <span className="text-on-surface-variant">Temporal Lookback: <span className="text-secondary font-metric-val text-metric-val font-semibold">60 Days</span></span>
            <span className="text-on-surface-variant">Validation Engine: <span className="text-primary font-metric-val text-metric-val font-semibold">Walk-Forward K=5</span></span>
          </div>
        </div>
      </section>

      {/* HERO TITLE & ABSTRACT SECTION */}
      <section className="relative w-full px-gutter md:px-gutter-desktop py-space-xl bg-surface-container-low overflow-hidden border-b border-outline-variant/20">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-xl">
            <div className="max-w-3xl space-y-space-md">
              <div className="inline-flex items-center gap-space-xs px-3 py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm tracking-wide border border-outline-variant/30 font-semibold">
                <span className="material-symbols-outlined text-sm">science</span>
                PROJECT RESEARCH DOCUMENTATION • CODEBASE SPECIFICATION
              </div>
              <h1 className="text-display-lg font-display-lg text-on-surface tracking-tight font-extrabold">
                System Architecture & <br />
                <span className="text-primary">Research Methodology</span>
              </h1>
              <p className="text-body-lg font-body-lg text-on-surface-variant leading-relaxed">
                End-to-end quantitative pipeline from raw market data ingestion to multi-model prediction and interactive visualization. Designed as an institutional-grade deep learning apparatus addressing non-stationary stochastic equity price series.
              </p>
            </div>

            <div className="bg-surface-container p-space-lg rounded-xl shadow-xl lg:max-w-md w-full space-y-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
                  Benchmark Evaluation
                </span>
                <span className="text-tertiary font-metric-val text-metric-val px-2 py-0.5 rounded bg-surface-container-highest font-bold">
                  Live Cross-Val
                </span>
              </div>
              <div className="grid grid-cols-3 gap-space-sm text-center">
                <div className="p-space-sm rounded bg-surface-container-high border border-outline-variant/20">
                  <div className="text-label-sm font-label-sm text-outline">LSTM RMSE</div>
                  <div className="text-headline-sm font-headline-sm text-tertiary tabular-nums font-bold">0.0142</div>
                </div>
                <div className="p-space-sm rounded bg-surface-container-high border border-outline-variant/20">
                  <div className="text-label-sm font-label-sm text-outline">ARIMA (2,1,2)</div>
                  <div className="text-headline-sm font-headline-sm text-secondary tabular-nums font-bold">0.0298</div>
                </div>
                <div className="p-space-sm rounded bg-surface-container-high border border-outline-variant/20">
                  <div className="text-label-sm font-label-sm text-outline">Lin Reg R²</div>
                  <div className="text-headline-sm font-headline-sm text-primary tabular-nums font-bold">0.864</div>
                </div>
              </div>
              <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant pt-space-xs border-t border-outline-variant/20">
                <span>Inference Cycle: 60-Day Lookback</span>
                <span className="text-tertiary flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span> Deterministic Output
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE PIPELINE VISUAL FLOW */}
      <section className="w-full px-gutter md:px-gutter-desktop py-space-xl bg-surface border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                End-to-End Orchestration
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
                6-Stage Quantitative Pipeline
              </h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant max-w-md">
              A synchronized lifecycle that bridges non-stationary tick feeds with deep recurrent tensor transformations. Click any node to highlight mathematical dependencies.
            </p>
          </div>

          {/* Pipeline Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-md relative">
            {PIPELINE_STAGES.map((stg) => (
              <div
                key={stg.phase}
                className="group p-space-md rounded-xl bg-surface-container transition-all hover:bg-surface-container-high shadow-md relative overflow-hidden flex flex-col justify-between h-full border border-outline-variant/20"
              >
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <span className={`text-label-sm font-label-sm font-bold px-2 py-0.5 rounded bg-surface-container-high ${stg.color}`}>
                      {stg.phase}
                    </span>
                    <span className={`material-symbols-outlined ${stg.color} text-lg`}>{stg.icon}</span>
                  </div>
                  <h3 className="text-headline-sm font-headline-sm text-on-surface font-bold">{stg.title}</h3>
                  <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                    {stg.desc}
                  </p>
                </div>
                <div className="pt-space-md mt-space-md bg-surface-container-low p-2 rounded text-label-sm font-label-sm text-outline tabular-nums border border-outline-variant/20">
                  {stg.stat}
                </div>
              </div>
            ))}
          </div>

          {/* Live Pipeline Interactive Visual Flow SVG */}
          <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-inner relative overflow-hidden border border-outline-variant/30">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                <span className="text-label-md font-label-md text-on-surface uppercase tracking-wider font-semibold">
                  Dynamic Signal Flow Telemetry
                </span>
              </div>
              <span className="text-label-sm font-label-sm text-outline">
                Real-time DAG (Directed Acyclic Graph) Execution
              </span>
            </div>
            <div className="w-full overflow-x-auto py-space-sm scrollbar-none">
              <svg className="w-full min-w-[760px] h-28" fill="none" viewBox="0 0 900 100">
                <defs>
                  <linearGradient id="pipeGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#c0c1ff" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#7bd0ff" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#4edea3" stopOpacity="0.9" />
                  </linearGradient>
                  <filter height="140%" id="pipeGlow" width="140%" x="-20%" y="-20%">
                    <feGaussianBlur result="blur" stdDeviation="4" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Base Path Tracks */}
                <path d="M 50 50 L 200 50 L 350 50 L 500 50 L 650 50 L 800 50" stroke="#32353d" strokeLinecap="round" strokeWidth="4" />
                <path className="animate-pulse" d="M 50 50 L 200 50 L 350 50 L 500 50 L 650 50 L 800 50" filter="url(#pipeGlow)" stroke="url(#pipeGrad)" strokeDasharray="10 15" strokeWidth="3" />

                {/* Node Circles */}
                <g className="cursor-pointer" transform="translate(50, 50)">
                  <circle fill="#10131a" r="14" stroke="#c0c1ff" strokeWidth="3" />
                  <circle fill="#c0c1ff" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">INGEST</text>
                </g>
                <g className="cursor-pointer" transform="translate(200, 50)">
                  <circle fill="#10131a" r="14" stroke="#7bd0ff" strokeWidth="3" />
                  <circle fill="#7bd0ff" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">PRE-PROC</text>
                </g>
                <g className="cursor-pointer" transform="translate(350, 50)">
                  <circle fill="#10131a" r="14" stroke="#7bd0ff" strokeWidth="3" />
                  <circle fill="#7bd0ff" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">FEAT_ENG</text>
                </g>
                <g className="cursor-pointer" transform="translate(500, 50)">
                  <circle fill="#10131a" r="14" stroke="#c0c1ff" strokeWidth="3" />
                  <circle fill="#c0c1ff" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">WINDOW(60)</text>
                </g>
                <g className="cursor-pointer" transform="translate(650, 50)">
                  <circle fill="#10131a" r="14" stroke="#4edea3" strokeWidth="3" />
                  <circle fill="#4edea3" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">FIT_LSTM</text>
                </g>
                <g className="cursor-pointer" transform="translate(800, 50)">
                  <circle fill="#10131a" r="14" stroke="#4edea3" strokeWidth="3" />
                  <circle fill="#4edea3" r="5" />
                  <text className="text-[10px] font-mono" fill="#c7c4d7" textAnchor="middle" y="30">VAL_OUTPUT</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* DEEP-DIVE METHODOLOGY CARDS WITH CODE & MATH FORMULAS */}
      <section className="w-full px-gutter md:px-gutter-desktop py-space-xl bg-surface-container-low border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-space-xl">
          <div className="max-w-2xl">
            <span className="text-secondary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
              Algorithmic Formulation
            </span>
            <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
              Mathematical Foundations & Implementation
            </h2>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Complete formal derivation of statistical transformations, neural state transitions, and residual error quantification.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            {/* SECTION 1: DATA COLLECTION & PREPROCESSING */}
            <div className="p-space-lg rounded-xl bg-surface-container shadow-md flex flex-col justify-between space-y-space-md border border-outline-variant/20">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-md font-label-md text-primary font-bold">SECTION 01</span>
                  <span className="text-label-sm font-label-sm text-outline">STATIONARITY & NORMALIZATION</span>
                </div>
                <h3 className="text-headline-md text-headline-md text-on-surface font-bold">Data Cleansing & ADF Stationarity Test</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Raw financial assets feature non-stationary drifts that yield spurious regressions. Stationarity is determined via the Augmented Dickey-Fuller unit root regression:
                </p>

                {/* Formula Box */}
                <div className="p-space-md rounded bg-surface-container-lowest text-on-surface font-mono text-body-sm overflow-x-auto border border-outline-variant/30">
                  <div className="text-secondary font-bold mb-1">// Augmented Dickey-Fuller Equation:</div>
                  <div>Δy<sub>t</sub> = α + βt + γy<sub>t-1</sub> + ∑<sub>i=1</sub><sup>p</sup> δ<sub>i</sub>Δy<sub>t-i</sub> + ε<sub>t</sub></div>
                  <div className="text-outline text-label-sm mt-2">H0: γ = 0 (Unit Root Present → Non-Stationary) | Rejection: p &lt; 0.05</div>
                </div>

                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Trading gaps (market weekends, Diwali Muhurat hours, unpredicted halts) are addressed with forward-fill continuity. Log-returns transform raw prices, followed by bounded MinMax mapping:
                </p>
                <div className="p-space-sm rounded bg-surface-container-high text-on-surface font-mono text-label-md border border-outline-variant/30">
                  x<sub>norm</sub> = (x - x<sub>min</sub>) / (x<sub>max</sub> - x<sub>min</sub>) ∈ [0, 1]
                </div>
              </div>

              {/* Code Snippet */}
              <div className="rounded-lg bg-surface-container-lowest p-space-sm overflow-x-auto text-label-sm font-mono border border-outline-variant/30">
                <div className="text-outline flex items-center justify-between pb-1 border-b border-outline-variant/20 mb-2">
                  <span>preprocessing_pipeline.py</span>
                  <span className="text-tertiary">Python 3.11</span>
                </div>
                <pre className="text-on-surface leading-relaxed">
                  <span className="text-primary">from</span> statsmodels.tsa.stattools <span className="text-primary">import</span> adfuller{'\n'}
                  <span className="text-primary">from</span> sklearn.preprocessing <span className="text-primary">import</span> MinMaxScaler{'\n\n'}
                  <span className="text-outline"># Evaluate stationarity on Log-Returns</span>{'\n'}
                  df[<span className="text-tertiary">'log_ret'</span>] = np.log(df[<span className="text-tertiary">'Adj Close'</span>] / df[<span className="text-tertiary">'Adj Close'</span>].shift(1)){'\n'}
                  adf_res = adfuller(df[<span className="text-tertiary">'log_ret'</span>].dropna()){'\n'}
                  print(f<span className="text-tertiary">"ADF Statistic: &#123;adf_res[0]:.4f&#125;, p-value: &#123;adf_res[1]:.4e&#125;"</span>){'\n\n'}
                  scaler = MinMaxScaler(feature_range=(0, 1)){'\n'}
                  scaled_data = scaler.fit_transform(df[[<span className="text-tertiary">'Adj Close'</span>, <span className="text-tertiary">'Volume'</span>, <span className="text-tertiary">'RSI'</span>]])
                </pre>
              </div>
            </div>

            {/* SECTION 2: FEATURE ENGINEERING & TECHNICAL INDICATORS */}
            <div className="p-space-lg rounded-xl bg-surface-container shadow-md flex flex-col justify-between space-y-space-md border border-outline-variant/20">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-md font-label-md text-secondary font-bold">SECTION 02</span>
                  <span className="text-label-sm font-label-sm text-outline">STOCHASTIC FEATURE SPACES</span>
                </div>
                <h3 className="text-headline-md text-headline-md text-on-surface font-bold">Feature Engineering & Indicators</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Multi-scale momentum, mean reversion, and volatility dimensions are extracted to construct rich 18-feature state representations:
                </p>

                {/* Formula Box */}
                <div className="p-space-md rounded bg-surface-container-lowest text-on-surface font-mono text-body-sm space-y-2 overflow-x-auto border border-outline-variant/30">
                  <div>
                    <span className="text-secondary font-bold">// Relative Strength Index (RSI):</span><br />
                    RSI = 100 - [ 100 / (1 + RS) ], &nbsp; where RS = EMA<sub>14</sub>(Up) / EMA<sub>14</sub>(Down)
                  </div>
                  <div>
                    <span className="text-tertiary font-bold">// MACD Signal Vector:</span><br />
                    MACD = EMA<sub>12</sub>(P) - EMA<sub>26</sub>(P), &nbsp; Signal = EMA<sub>9</sub>(MACD)
                  </div>
                  <div>
                    <span className="text-primary font-bold">// Bollinger Volatility Bands:</span><br />
                    Upper/Lower = SMA<sub>20</sub>(P) ± 2 × σ<sub>20</sub>(P)
                  </div>
                </div>

                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  Lagged parameters (t-1, t-2, t-5) enforce auto-regressive memory, while ATR (Average True Range) standardizes volatility shocks across varying market regimes.
                </p>
              </div>

              {/* Indicator Breakdown Table */}
              <div className="grid grid-cols-3 gap-2 text-center text-label-sm font-label-sm">
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">RSI Length</span>
                  <p className="text-tertiary font-metric-val text-metric-val font-bold">14 Periods</p>
                </div>
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">MACD Spread</span>
                  <p className="text-secondary font-metric-val text-metric-val font-bold">12, 26, 9</p>
                </div>
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">Bollinger Width</span>
                  <p className="text-primary font-metric-val text-metric-val font-bold">2.0 σ (20d)</p>
                </div>
              </div>
            </div>

            {/* SECTION 3: NEURAL NETWORK & MODEL FORMULATION (LSTM) */}
            <div className="p-space-lg rounded-xl bg-surface-container shadow-md flex flex-col justify-between space-y-space-md border border-outline-variant/20">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-md font-label-md text-tertiary font-bold">SECTION 03</span>
                  <span className="text-label-sm font-label-sm text-outline">RECURRENT ARCHITECTURE</span>
                </div>
                <h3 className="text-headline-md text-headline-md text-on-surface font-bold">Long Short-Term Memory (LSTM) Formulation</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Standard Recurrent Neural Networks suffer from vanishing gradients across 60-day horizons. StockAI employs Hochreiter & Schmidhuber gated cells:
                </p>

                {/* Formal Math Equations */}
                <div className="p-space-md rounded bg-surface-container-lowest text-on-surface font-mono text-body-sm space-y-1.5 overflow-x-auto border border-outline-variant/30">
                  <div className="text-tertiary font-bold">// LSTM Gating Cell Transition Equations:</div>
                  <div><span className="text-primary font-semibold">f<sub>t</sub></span> = σ(W<sub>f</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>f</sub>) &nbsp; <span className="text-outline">// Forget Gate</span></div>
                  <div><span className="text-secondary font-semibold">i<sub>t</sub></span> = σ(W<sub>i</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>i</sub>) &nbsp; <span className="text-outline">// Input Gate</span></div>
                  <div><span className="text-tertiary font-semibold">C̃<sub>t</sub></span> = tanh(W<sub>c</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>c</sub>) &nbsp; <span className="text-outline">// Candidate Update</span></div>
                  <div><span className="text-on-surface font-semibold">C<sub>t</sub></span> = f<sub>t</sub> * C<sub>t-1</sub> + i<sub>t</sub> * C̃<sub>t</sub> &nbsp; <span className="text-outline">// State Integration</span></div>
                  <div><span className="text-primary font-semibold">o<sub>t</sub></span> = σ(W<sub>o</sub> · [h<sub>t-1</sub>, x<sub>t</sub>] + b<sub>o</sub>) &nbsp; <span className="text-outline">// Output Gate</span></div>
                  <div><span className="text-secondary font-semibold">h<sub>t</sub></span> = o<sub>t</sub> * tanh(C<sub>t</sub>) &nbsp; <span className="text-outline">// Output Vector</span></div>
                </div>

                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  A 2-layer stacked network (128 → 64 hidden units) with recurrent dropout (p=0.2) to prevent overparameterization on historical regimes.
                </p>
              </div>

              <div className="p-space-sm rounded bg-surface-container-high flex items-center justify-between text-label-sm font-label-sm border border-outline-variant/20">
                <span className="text-outline">Hidden Layers: [128, 64]</span>
                <span className="text-primary font-semibold">Activation: tanh / sigmoid</span>
                <span className="text-tertiary font-semibold">Loss: Huber (δ=1.0)</span>
              </div>
            </div>

            {/* SECTION 4: MODEL EVALUATION METRICS */}
            <div className="p-space-lg rounded-xl bg-surface-container shadow-md flex flex-col justify-between space-y-space-md border border-outline-variant/20">
              <div className="space-y-space-sm">
                <div className="flex items-center justify-between">
                  <span className="text-label-md font-label-md text-primary font-bold">SECTION 04</span>
                  <span className="text-label-sm font-label-sm text-outline">STATISTICAL VALIDATION</span>
                </div>
                <h3 className="text-headline-md text-headline-md text-on-surface font-bold">Error Characterization & Goodness of Fit</h3>
                <p className="text-body-md font-body-md text-on-surface-variant">
                  Out-of-sample predictability is audited across non-overlapping cross-validation windows using three complementary statistical loss functions:
                </p>

                {/* Metrics Formula Block */}
                <div className="p-space-md rounded bg-surface-container-lowest text-on-surface font-mono text-body-sm space-y-3 overflow-x-auto border border-outline-variant/30">
                  <div>
                    <span className="text-primary font-bold">1. Root Mean Squared Error (RMSE):</span><br />
                    RMSE = √[ (1 / n) ∑<sub>t=1</sub><sup>n</sup> (y<sub>t</sub> - ŷ<sub>t</sub>)² ]
                    <div className="text-outline text-label-sm mt-0.5">Penalizes large outlier forecasting anomalies exponentially.</div>
                  </div>
                  <div>
                    <span className="text-secondary font-bold">2. Mean Absolute Error (MAE):</span><br />
                    MAE = (1 / n) ∑<sub>t=1</sub><sup>n</sup> |y<sub>t</sub> - ŷ<sub>t</sub>|
                    <div className="text-outline text-label-sm mt-0.5">Provides robust, median-aligned intuitive tick error.</div>
                  </div>
                  <div>
                    <span className="text-tertiary font-bold">3. Coefficient of Determination (R²):</span><br />
                    R² = 1 - [ ∑(y<sub>t</sub> - ŷ<sub>t</sub>)² / ∑(y<sub>t</sub> - ȳ)² ]
                    <div className="text-outline text-label-sm mt-0.5">Proportion of variance explained relative to naive baseline.</div>
                  </div>
                </div>
              </div>

              {/* Benchmark Comparatives */}
              <div className="grid grid-cols-3 gap-2 text-center text-label-sm font-label-sm">
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">LSTM R² Score</span>
                  <p className="text-tertiary font-metric-val text-metric-val font-bold">0.942</p>
                </div>
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">ARIMA MAE</span>
                  <p className="text-secondary font-metric-val text-metric-val font-bold">±₹18.40</p>
                </div>
                <div className="p-2 rounded bg-surface-container-high border border-outline-variant/20">
                  <span className="text-outline">Directional Accuracy</span>
                  <p className="text-primary font-metric-val text-metric-val font-bold">68.7%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK & SYSTEM TOOLS GRID */}
      <section className="w-full px-gutter md:px-gutter-desktop py-space-xl bg-surface border-b border-outline-variant/20">
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
            <div>
              <span className="text-primary font-label-sm text-label-sm uppercase tracking-widest font-semibold">
                Engineering Frameworks
              </span>
              <h2 className="text-headline-lg font-headline-lg text-on-surface font-bold">
                Institutional Technical Stack
              </h2>
            </div>
            <p className="text-body-sm font-body-sm text-on-surface-variant max-w-md">
              Hardware-accelerated tensor computations, statistical time series routines, and deterministic microsecond front-end charting.
            </p>
          </div>

          {/* Bento-style Tool Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md">
            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">terminal</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">Python 3.11</span>
              <span className="text-label-sm font-label-sm text-outline">Runtime Engine</span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">memory</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">TensorFlow / Keras</span>
              <span className="text-label-sm font-label-sm text-outline">Deep Learning Stack</span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-2xl">hub</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">PyTorch</span>
              <span className="text-label-sm font-label-sm text-outline">Dynamic Autograd</span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">schema</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">Scikit-Learn</span>
              <span className="text-label-sm font-label-sm text-outline">Regression & Scaling</span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-2xl">query_stats</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">Statsmodels</span>
              <span className="text-label-sm font-label-sm text-outline">ARIMA & Econometrics</span>
            </div>

            <div className="p-space-md rounded-xl bg-surface-container flex flex-col items-center text-center space-y-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-2xl">dataset</span>
              </div>
              <span className="text-label-md font-label-md text-on-surface font-bold">Pandas & NumPy</span>
              <span className="text-label-sm font-label-sm text-outline">Vectorized Analytics</span>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH TEAM & ACADEMIC ATTRIBUTION */}
      <section className="w-full px-gutter md:px-gutter-desktop py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto space-y-space-lg">
          <div className="p-space-xl rounded-xl bg-surface-container shadow-xl relative overflow-hidden border border-outline-variant/20">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl">
              <div className="space-y-space-md max-w-2xl">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-xl">school</span>
                  <span className="text-label-md font-label-md text-primary font-bold uppercase tracking-wider">
                    Academic Attribution & Capstone Credits
                  </span>
                </div>
                <h3 className="text-headline-lg font-headline-lg text-on-surface font-bold">
                  Department of Computer Science & Artificial Intelligence
                </h3>
                <p className="text-body-md font-body-md text-on-surface-variant leading-relaxed">
                  Developed as a final year undergraduate engineering capstone research project in algorithmic trading systems and recursive temporal sequence prediction.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                  <div className="p-space-sm rounded bg-surface-container-high space-y-1 border border-outline-variant/20">
                    <span className="text-label-sm font-label-sm text-outline font-semibold">STUDENT RESEARCH FELLOWS</span>
                    <p className="text-on-surface font-label-md font-label-md font-bold">Aarav Sharma • Devansh Verma</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Reg: 21BCE10429 • 21BCE10788</p>
                  </div>
                  <div className="p-space-sm rounded bg-surface-container-high space-y-1 border border-outline-variant/20">
                    <span className="text-label-sm font-label-sm text-outline font-semibold">FACULTY MENTOR & GUIDE</span>
                    <p className="text-on-surface font-label-md font-label-md font-bold">Dr. K. R. Ramanathan, Ph.D.</p>
                    <p className="text-label-sm font-label-sm text-on-surface-variant">Professor • Machine Learning Lab</p>
                  </div>
                </div>
              </div>

              {/* Academic Disclaimer Card */}
              <div className="p-space-lg rounded-xl bg-surface-container-lowest max-w-md w-full space-y-space-sm border border-outline-variant/30">
                <div className="flex items-center gap-space-xs text-error">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                  <span className="text-label-md font-label-md font-bold uppercase tracking-wider">
                    Academic Evaluation Disclaimer
                  </span>
                </div>
                <p className="text-body-sm font-body-sm text-on-surface-variant leading-relaxed">
                  This platform is an empirical academic simulation constructed purely for pedagogical evaluation, statistical thesis defense, and computational performance demonstration.
                </p>
                <p className="text-body-sm font-body-sm text-outline leading-relaxed">
                  None of the outputs generated by the LSTM, ARIMA, or Linear Regression modules constitute investment or financial advisory services under SEBI / FINRA regulations.
                </p>
                <div className="pt-space-xs flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant border-t border-outline-variant/20">
                  <span>Code License: MIT Open Access</span>
                  <span className="text-tertiary font-semibold">IEEE Citation Drafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
