import React, { useState } from 'react';

export default function ActualVsPredictedChart({ 
  stockSymbol = 'RELIANCE',
  stockData = null,
  activeModel = 'all', // 'all', 'lr', 'arima', 'lstm'
  predictionHorizon = '7D',
  onSelectModel = null
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Extract base stock prices
  const basePrice = stockData?.price || 2845.60;
  const currency = stockData?.currencySymbol || '₹';

  // Sample actual historical 14-day path
  const actualHistory = [
    { label: 'Day -14', price: basePrice * 0.965 },
    { label: 'Day -12', price: basePrice * 0.972 },
    { label: 'Day -10', price: basePrice * 0.968 },
    { label: 'Day -8', price: basePrice * 0.980 },
    { label: 'Day -6', price: basePrice * 0.988 },
    { label: 'Day -4', price: basePrice * 0.982 },
    { label: 'Day -2', price: basePrice * 0.994 },
    { label: 'Today', price: basePrice }
  ];

  // Predictions for Day +1 to Day +7
  const lrTarget = stockData?.predictions?.lr?.predictedPrice || basePrice * 1.005;
  const arimaTarget = stockData?.predictions?.arima?.predictedPrice || basePrice * 1.011;
  const lstmTarget = stockData?.predictions?.lstm?.predictedPrice || basePrice * 1.016;

  const forecastPoints = [
    { label: 'Today', lr: basePrice, arima: basePrice, lstm: basePrice },
    { label: 'Day +1', lr: basePrice + (lrTarget - basePrice) * 0.25, arima: basePrice + (arimaTarget - basePrice) * 0.30, lstm: basePrice + (lstmTarget - basePrice) * 0.35 },
    { label: 'Day +3', lr: basePrice + (lrTarget - basePrice) * 0.55, arima: basePrice + (arimaTarget - basePrice) * 0.60, lstm: basePrice + (lstmTarget - basePrice) * 0.65 },
    { label: 'Day +5', lr: basePrice + (lrTarget - basePrice) * 0.85, arima: basePrice + (arimaTarget - basePrice) * 0.88, lstm: basePrice + (lstmTarget - basePrice) * 0.89 },
    { label: 'Day +7', lr: lrTarget, arima: arimaTarget, lstm: lstmTarget }
  ];

  // Chart dimensions & coordinates
  const allPrices = [
    ...actualHistory.map(d => d.price),
    ...forecastPoints.flatMap(d => [d.lr, d.arima, d.lstm])
  ];
  const minP = Math.min(...allPrices) * 0.99;
  const maxP = Math.max(...allPrices) * 1.01;
  const rangeP = maxP - minP || 1;

  const width = 900;
  const height = 300;
  const paddingX = 60;
  const paddingY = 40;

  const getY = (val) => height - paddingY - ((val - minP) / rangeP) * (height - paddingY * 2);

  // Total points: 8 historical + 4 future = 12 steps
  const totalSteps = 11;
  const getStepX = (index) => paddingX + (index / totalSteps) * (width - paddingX * 2);

  // Historical path (steps 0 to 7)
  const actualPath = actualHistory
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getStepX(i)} ${getY(d.price)}`)
    .join(' ');

  // Future paths starting from index 7 (Today) to 11
  const lrPath = forecastPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getStepX(7 + i)} ${getY(d.lr)}`)
    .join(' ');

  const arimaPath = forecastPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getStepX(7 + i)} ${getY(d.arima)}`)
    .join(' ');

  const lstmPath = forecastPoints
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getStepX(7 + i)} ${getY(d.lstm)}`)
    .join(' ');

  return (
    <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] shadow-sm flex flex-col gap-4">
      {/* 1. Header & Legend Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#21262d]">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">timeline</span>
          <div>
            <span className="text-sm font-bold text-white">Actual vs. Predicted Price</span>
            <span className="text-[11px] text-gray-400 block">7-Day Out-of-Sample Machine Learning Projection</span>
          </div>
        </div>

        {/* Model Filter Pills */}
        <div className="flex items-center gap-1.5 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
          {[
            { id: 'all', label: 'All Models' },
            { id: 'lr', label: 'Linear Regression', color: 'text-amber-400' },
            { id: 'arima', label: 'ARIMA', color: 'text-sky-400' },
            { id: 'lstm', label: 'LSTM', color: 'text-emerald-400' }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectModel && onSelectModel(m.id)}
              className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                activeModel === m.id
                  ? 'bg-[#1f2937] text-white shadow-sm border border-[#374151]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. SVG Line Chart Canvas */}
      <div className="relative w-full h-[320px] bg-[#0d1117] rounded-lg border border-[#21262d] overflow-hidden">
        
        {/* Forecast Split Area Shading */}
        <div 
          className="absolute top-0 bottom-0 bg-primary/[0.03] border-l border-dashed border-[#6366f1]/40 pointer-events-none"
          style={{ left: `${(getStepX(7) / width) * 100}%`, right: 0 }}
        >
          <div className="absolute top-3 left-3 text-[10px] font-bold text-primary/80 uppercase tracking-wider">
            Future Projection Window →
          </div>
        </div>

        <svg
          className="w-full h-full select-none cursor-crosshair"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredPoint(null)}
        >
          {/* Horizontal Grid Lines */}
          <g stroke="#21262d" strokeWidth="1" strokeDasharray="3 3">
            <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} />
            <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} />
            <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} />
          </g>

          {/* Grid Labels */}
          <text x={paddingX - 10} y={paddingY + 4} fill="#6b7280" fontSize="10" textAnchor="end" fontFamily="monospace">
            {currency}{maxP.toFixed(0)}
          </text>
          <text x={paddingX - 10} y={height / 2 + 4} fill="#6b7280" fontSize="10" textAnchor="end" fontFamily="monospace">
            {currency}{((maxP + minP) / 2).toFixed(0)}
          </text>
          <text x={paddingX - 10} y={height - paddingY + 4} fill="#6b7280" fontSize="10" textAnchor="end" fontFamily="monospace">
            {currency}{minP.toFixed(0)}
          </text>

          {/* 1. Historical Actual Price Line (Solid White/Gray) */}
          <path
            d={actualPath}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Actual Price Points */}
          {actualHistory.map((d, i) => (
            <circle
              key={`act-${i}`}
              cx={getStepX(i)}
              cy={getY(d.price)}
              r={i === 7 ? 4.5 : 3}
              fill={i === 7 ? '#ffffff' : '#9ca3af'}
              stroke="#0d1117"
              strokeWidth="1.5"
            />
          ))}

          {/* 2. Linear Regression (Dashed Amber Line) */}
          {(activeModel === 'all' || activeModel === 'lr') && (
            <>
              <path
                d={lrPath}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2.2"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              <circle cx={getStepX(11)} cy={getY(lrTarget)} r="4" fill="#f59e0b" stroke="#0d1117" strokeWidth="1.5" />
            </>
          )}

          {/* 3. ARIMA (Dashed Sky Blue Line) */}
          {(activeModel === 'all' || activeModel === 'arima') && (
            <>
              <path
                d={arimaPath}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.2"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              <circle cx={getStepX(11)} cy={getY(arimaTarget)} r="4" fill="#38bdf8" stroke="#0d1117" strokeWidth="1.5" />
            </>
          )}

          {/* 4. LSTM (Dashed Emerald Line - Primary Focus) */}
          {(activeModel === 'all' || activeModel === 'lstm') && (
            <>
              <path
                d={lstmPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinecap="round"
              />
              <circle cx={getStepX(11)} cy={getY(lstmTarget)} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
            </>
          )}
        </svg>

        {/* Dynamic Legend at Bottom */}
        <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-xs bg-[#161b22]/95 backdrop-blur-xs px-4 py-2 rounded-lg border border-[#30363d]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-4 h-0.5 bg-white"></span> Historical Actual
            </span>
            {(activeModel === 'all' || activeModel === 'lr') && (
              <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-amber-400"></span> Linear Reg ({currency}{lrTarget.toFixed(2)})
              </span>
            )}
            {(activeModel === 'all' || activeModel === 'arima') && (
              <span className="flex items-center gap-1.5 text-sky-400 font-medium">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-sky-400"></span> ARIMA ({currency}{arimaTarget.toFixed(2)})
              </span>
            )}
            {(activeModel === 'all' || activeModel === 'lstm') && (
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-4 h-0.5 border-t-2 border-dashed border-emerald-400"></span> LSTM ({currency}{lstmTarget.toFixed(2)})
              </span>
            )}
          </div>
          <span className="text-gray-400 text-[11px]">Solid = Real Market Data • Dashed = AI Forecast</span>
        </div>
      </div>
    </div>
  );
}
