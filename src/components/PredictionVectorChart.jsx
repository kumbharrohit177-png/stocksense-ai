import React, { useState } from 'react';

export default function PredictionVectorChart({ stock, selectedModel = 'lstm', selectedHorizon = '7D' }) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const basePrice = stock ? stock.price : 2845.60;
  const target7D = stock?.prediction?.targetPrice7D || '₹2,892.40';

  // Trajectory calculations based on selected stock and model
  const modelMultiplier = selectedModel === 'lr' ? 0.4 : selectedModel === 'arima' ? 0.75 : 1.0;
  const horizonSteps = selectedHorizon === '1D' ? 1 : selectedHorizon === '30D' ? 30 : 7;

  return (
    <div className="relative w-full h-[380px] md:h-[420px] bg-surface-container-lowest rounded-xl overflow-hidden p-space-sm select-none border border-outline-variant/30">
      {/* Ambient Radial Gradient Flare Behind Projection Area */}
      <div className="absolute right-0 top-0 bottom-0 w-[46%] bg-gradient-to-l from-secondary/10 via-primary/5 to-transparent pointer-events-none"></div>

      {/* Dynamic Overlay Tooltip Bar for Real-time Inspect */}
      <div className="absolute top-4 left-4 z-20 bg-surface-container-high/90 backdrop-blur-md px-space-md py-2 rounded-lg shadow-md flex items-center gap-space-md border border-outline-variant/30">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          <span className="text-label-sm font-label-sm text-outline uppercase">Active Spline:</span>
          <span className="text-label-sm font-label-sm text-on-surface font-semibold">
            {selectedModel === 'lr' ? 'Ordinary Least Squares' : selectedModel === 'arima' ? 'ARIMA (5,1,2) Autoregression' : 'Bayesian Multi-Head BiLSTM'}
          </span>
        </div>
        <div className="h-3 w-px bg-outline-variant hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1 text-label-sm font-label-sm text-on-surface">
          <span className="text-outline">Upper Limit:</span>
          <span className="text-tertiary font-metric-val">₹{(basePrice * 1.045).toFixed(2)}</span>
        </div>
        <div className="h-3 w-px bg-outline-variant hidden sm:block"></div>
        <div className="hidden sm:flex items-center gap-1 text-label-sm font-label-sm text-on-surface">
          <span className="text-outline">Lower Limit:</span>
          <span className="text-error font-metric-val">₹{(basePrice * 0.985).toFixed(2)}</span>
        </div>
      </div>

      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
        <defs>
          {/* Probability Cone Gradient */}
          <linearGradient id="coneGradient" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#7bd0ff" stopOpacity="0.05" />
            <stop offset="40%" stopColor="#7bd0ff" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#c0c1ff" stopOpacity="0.25" />
          </linearGradient>

          {/* Line Glow Filter */}
          <filter height="140%" id="chartGlow" width="140%" x="-20%" y="-20%">
            <feGaussianBlur result="coloredBlur" stdDeviation="3.5" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Area Below Historical Gradient */}
          <linearGradient id="historicalUnder" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#908fa0" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#908fa0" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Horizontal Grid Lines & Values */}
        <g className="text-label-sm font-label-sm" opacity="0.35">
          <line stroke="#464554" strokeDasharray="3,3" x1="40" x2="960" y1="60" y2="60" />
          <text fill="#908fa0" fontSize="10" textAnchor="end" x="35" y="64">₹{(basePrice + 135).toFixed(0)}</text>
          
          <line stroke="#464554" strokeDasharray="3,3" x1="40" x2="960" y1="130" y2="130" />
          <text fill="#908fa0" fontSize="10" textAnchor="end" x="35" y="134">₹{(basePrice + 75).toFixed(0)}</text>
          
          <line stroke="#464554" strokeDasharray="3,3" x1="40" x2="960" y1="200" y2="200" />
          <text fill="#908fa0" fontSize="10" textAnchor="end" x="35" y="204">₹{(basePrice + 15).toFixed(0)}</text>
          
          <line stroke="#464554" strokeDasharray="3,3" x1="40" x2="960" y1="270" y2="270" />
          <text fill="#908fa0" fontSize="10" textAnchor="end" x="35" y="274">₹{(basePrice - 45).toFixed(0)}</text>
          
          <line stroke="#464554" strokeDasharray="3,3" x1="40" x2="960" y1="340" y2="340" />
          <text fill="#908fa0" fontSize="10" textAnchor="end" x="35" y="344">₹{(basePrice - 105).toFixed(0)}</text>
        </g>

        {/* 95% Confidence Interval Shaded Corridor (T0 = 650 to T+7 = 960) */}
        <path
          d="M 650 216 
             C 700 185, 750 160, 800 135
             C 850 115, 900 90, 960 70
             L 960 160
             C 900 180, 850 195, 800 215
             C 750 230, 700 235, 650 216 Z"
          fill="url(#coneGradient)"
        />

        {/* Historical Under Area Fill */}
        <path
          d="M 60 290 
             L 120 280 L 180 305 L 240 270 L 300 255 L 360 240 L 420 260 L 480 230 L 540 238 L 600 220 L 650 216 
             L 650 380 L 60 380 Z"
          fill="url(#historicalUnder)"
        />

        {/* Model In-Sample Validation Line (Dotted Cyan/Blue) */}
        <path
          d="M 60 294 
             C 90 288, 120 282, 150 298
             C 180 312, 210 275, 240 268
             C 270 260, 300 252, 330 245
             C 360 238, 390 258, 420 257
             C 450 255, 480 228, 510 232
             C 540 236, 570 226, 600 218
             C 620 214, 640 217, 650 216"
          fill="none"
          stroke="#7bd0ff"
          strokeDasharray="4,4"
          strokeOpacity="0.65"
          strokeWidth="1.8"
        />

        {/* Historical Actual Closes (Solid Slate/White Line) */}
        <path
          d="M 60 290 
             L 120 280 
             L 180 305 
             L 240 270 
             L 300 255 
             L 360 240 
             L 420 260 
             L 480 230 
             L 540 238 
             L 600 220 
             L 650 216"
          fill="none"
          stroke="#e1e2ec"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
        />

        {/* Vertical Inference Horizon Partition Line (Today: x=650) */}
        <line
          opacity="0.8"
          stroke="#c0c1ff"
          strokeDasharray="5,4"
          strokeWidth="1.5"
          x1="650"
          x2="650"
          y1="20"
          y2="365"
        />

        {/* Horizon Marker Label Pin */}
        <g transform="translate(650, 30)">
          <rect fill="#1d1f27" height="22" rx="4" width="110" x="-55" y="0" />
          <text fill="#c0c1ff" fontSize="10" fontWeight="600" letterSpacing="0.5" textAnchor="middle" x="0" y="14">
            T₀ : INFERENCE
          </text>
        </g>

        {/* Predictive Trajectory Path (Glowing Electric Cyan) */}
        <path
          d="M 650 216 
             C 695 198, 740 186, 785 174
             C 830 162, 880 148, 925 132
             C 940 126, 955 120, 960 115"
          fill="none"
          filter="url(#chartGlow)"
          stroke="#7bd0ff"
          strokeLinecap="round"
          strokeWidth="3.5"
        />

        {/* Forecast Trajectory Key Node Points */}
        <circle cx="650" cy="216" fill="#10131a" r="4.5" stroke="#7bd0ff" strokeWidth="2.5" />
        
        {/* Day +1 */}
        <circle
          className="cursor-pointer hover:r-5 transition-all"
          cx="695"
          cy="198"
          fill="#10131a"
          r="3.5"
          stroke="#7bd0ff"
          strokeWidth="2"
        />
        {/* Day +2 */}
        <circle
          className="cursor-pointer hover:r-5 transition-all"
          cx="740"
          cy="186"
          fill="#10131a"
          r="3.5"
          stroke="#7bd0ff"
          strokeWidth="2"
        />
        {/* Day +4 */}
        <circle
          className="cursor-pointer hover:r-5 transition-all"
          cx="830"
          cy="162"
          fill="#10131a"
          r="3.5"
          stroke="#7bd0ff"
          strokeWidth="2"
        />
        {/* Day +7 Horizon Pin */}
        <circle
          cx="960"
          cy="115"
          fill="#7bd0ff"
          filter="url(#chartGlow)"
          r="5.5"
          stroke="#10131a"
          strokeWidth="2"
        />

        {/* Target Label Flag at Day +7 */}
        <g transform="translate(940, 95)">
          <rect fill="#00a6e0" height="24" rx="4" width="84" x="-85" y="-12" />
          <text fill="#001e2c" fontSize="11" fontWeight="700" textAnchor="middle" x="-43" y="3">
            {target7D}
          </text>
        </g>

        {/* Inflection Point Tooltip Over Backtest / Actual Delta at x=480 */}
        <g transform="translate(480, 205)">
          <line stroke="#464554" strokeWidth="1" x1="0" x2="0" y1="0" y2="25" />
          <circle cx="0" cy="25" fill="#e1e2ec" r="3" />
          <rect fill="#1d1f27" height="48" rx="6" width="130" x="-65" y="-55" />
          <text fill="#908fa0" fontSize="9" fontWeight="600" x="-55" y="-38">
            INFLECTION (T-14)
          </text>
          <text fill="#e1e2ec" fontSize="11" fontWeight="700" x="-55" y="-23">
            Act: ₹{(basePrice - 10).toFixed(0)}
          </text>
          <text fill="#7bd0ff" fontSize="11" fontWeight="600" x="15" y="-23">
            Pred: ₹{(basePrice - 14).toFixed(0)}
          </text>
          <text fill="#4edea3" fontSize="9" x="-55" y="-10">
            Delta: -0.14% (High Fit)
          </text>
        </g>

        {/* Horizontal Time Axis Ticks */}
        <g className="text-label-sm font-label-sm" fill="#908fa0" fontSize="10" opacity="0.6" textAnchor="middle">
          <text x="60" y="375">T-60D</text>
          <text x="240" y="375">T-45D</text>
          <text x="420" y="375">T-30D</text>
          <text x="540" y="375">T-15D</text>
          <text fill="#c0c1ff" fontWeight="700" x="650" y="375">TODAY</text>
          <text fill="#7bd0ff" x="740" y="375">+2D</text>
          <text fill="#7bd0ff" x="830" y="375">+4D</text>
          <text fill="#7bd0ff" fontWeight="700" x="960" y="375">+7D HORIZON</text>
        </g>
      </svg>
    </div>
  );
}
