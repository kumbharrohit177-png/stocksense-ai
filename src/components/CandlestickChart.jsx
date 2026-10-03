import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function CandlestickChart({ stockSymbol = 'RELIANCE', defaultTimeframe = '1Y' }) {
  const [timeframe, setTimeframe] = useState(defaultTimeframe);
  const [showMA7, setShowMA7] = useState(true);
  const [showMA21, setShowMA21] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [candles, setCandles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const timeframes = ['1M', '3M', '6M', '1Y'];

  // Fetch real historical candles from backend API or build fallback
  useEffect(() => {
    let isMounted = true;
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await api.getStockHistory(stockSymbol, timeframe);
        if (isMounted && res && res.data && res.data.length > 0) {
          const formatted = res.data.map(d => ({
            date: d.date,
            full_date: d.full_date,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
            volume: d.volume ? Number((d.volume / 100000).toFixed(1)) : 5.0,
            ma7: d.ma7,
            ma21: d.ma21,
            isUp: d.close >= d.open
          }));
          setCandles(formatted);
        }
      } catch (err) {
        // Fallback procedural candle generator
        const basePrice = stockSymbol === 'TCS' ? 3980.10 : stockSymbol === 'INFY' ? 1560.30 : stockSymbol === 'HDFCBANK' ? 1440.00 : stockSymbol === 'TATAMOTORS' ? 980.50 : 2845.60;
        const count = timeframe === '1M' ? 22 : timeframe === '3M' ? 45 : timeframe === '6M' ? 80 : 120;
        
        let p = basePrice * 0.88;
        const synth = Array.from({ length: count }, (_, i) => {
          const delta = (Math.sin(i * 0.3) * 12) + (Math.random() * 16 - 7);
          p = Math.max(10, p + delta);
          const o = p;
          const c = o + (Math.random() * 20 - 9);
          const h = Math.max(o, c) + Math.random() * 8;
          const l = Math.min(o, c) - Math.random() * 8;
          return {
            date: `D-${count - i}`,
            open: Number(o.toFixed(2)),
            high: Number(h.toFixed(2)),
            low: Number(l.toFixed(2)),
            close: Number(c.toFixed(2)),
            volume: Number((4 + Math.random() * 6).toFixed(1)),
            ma7: Number((o * 0.99).toFixed(2)),
            ma21: Number((o * 0.97).toFixed(2)),
            isUp: c >= o
          };
        });
        if (isMounted) setCandles(synth);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchHistory();
    return () => { isMounted = false; };
  }, [stockSymbol, timeframe]);

  const activeCandle = candles.length > 0 
    ? (hoveredIndex !== null && candles[hoveredIndex] ? candles[hoveredIndex] : candles[candles.length - 1]) 
    : { date: 'Latest', open: 0, high: 0, low: 0, close: 0, volume: 0, isUp: true };

  // Dynamic SVG scaling
  const minPrice = candles.length > 0 ? Math.min(...candles.map(c => c.low)) * 0.995 : 100;
  const maxPrice = candles.length > 0 ? Math.max(...candles.map(c => c.high)) * 1.005 : 200;
  const priceRange = maxPrice - minPrice || 1;
  const maxVol = candles.length > 0 ? Math.max(...candles.map(c => c.volume)) : 10;

  const chartHeight = 280;
  const volumeHeight = 55;
  const chartWidth = 1000;
  const candleSpacing = candles.length > 0 ? chartWidth / candles.length : 20;

  const getY = (val) => chartHeight - ((val - minPrice) / priceRange) * (chartHeight - 40) - 20;

  return (
    <div className="bg-[#161b22] p-5 rounded-xl border border-[#30363d] shadow-sm flex flex-col gap-4">
      
      {/* 1. Header & Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-[#21262d]">
        
        {/* Title & Active Candle Hover Tooltip */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">candlestick_chart</span>
            <span className="text-sm font-bold text-white">Historical Stock Price</span>
          </div>

          {activeCandle && (
            <div className="flex items-center gap-3 text-xs bg-[#0d1117] px-3 py-1 rounded-md border border-[#30363d]">
              <span className="text-gray-400 font-medium">{activeCandle.full_date || activeCandle.date}:</span>
              <span className="text-gray-300">O: <strong className="text-white font-mono">{activeCandle.open}</strong></span>
              <span className="text-gray-300">H: <strong className="text-emerald-400 font-mono">{activeCandle.high}</strong></span>
              <span className="text-gray-300">L: <strong className="text-rose-400 font-mono">{activeCandle.low}</strong></span>
              <span className="text-gray-300">C: <strong className={activeCandle.isUp ? 'text-emerald-400 font-mono' : 'text-rose-400 font-mono'}>{activeCandle.close}</strong></span>
              <span className="text-gray-400">Vol: <strong className="text-gray-200 font-mono">{activeCandle.volume}M</strong></span>
            </div>
          )}
        </div>

        {/* Controls: Timeframe and Moving Averages */}
        <div className="flex items-center gap-3">
          
          {/* Moving Average Toggles */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMA7(!showMA7)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                showMA7
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                  : 'bg-[#0d1117] text-gray-500 border-[#30363d]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>MA 7</span>
            </button>

            <button
              onClick={() => setShowMA21(!showMA21)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold border transition-colors cursor-pointer ${
                showMA21
                  ? 'bg-sky-500/10 text-sky-300 border-sky-500/40'
                  : 'bg-[#0d1117] text-gray-500 border-[#30363d]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span>MA 21</span>
            </button>
          </div>

          {/* Timeframe Selector: [ 1M ] [ 3M ] [ 6M ] [ 1Y ] */}
          <div className="flex items-center bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  timeframe === tf
                    ? 'bg-[#1f2937] text-white shadow-sm border border-[#374151]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main SVG Chart Canvas */}
      <div className="relative w-full h-[360px] bg-[#0d1117] rounded-lg border border-[#21262d] overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-[#0d1117]/60 backdrop-blur-xs flex items-center justify-center z-20">
            <div className="flex items-center gap-2 text-xs text-primary font-semibold">
              <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
              <span>Loading Historical Data...</span>
            </div>
          </div>
        )}

        <svg
          className="w-full h-full cursor-crosshair select-none"
          viewBox={`0 0 ${chartWidth} ${chartHeight + volumeHeight + 20}`}
          preserveAspectRatio="none"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Price Grid Lines */}
          <g opacity="0.15" stroke="#9ca3af" strokeDasharray="3 3">
            <line x1="0" y1="30" x2={chartWidth} y2="30" />
            <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} />
            <line x1="0" y1={chartHeight - 30} x2={chartWidth} y2={chartHeight - 30} />
            <line x1="0" y1={chartHeight + 10} x2={chartWidth} y2={chartHeight + 10} stroke="#374151" strokeDasharray="none" />
          </g>

          {/* Volume Bars at the Bottom */}
          {candles.map((c, i) => {
            const x = i * candleSpacing + candleSpacing / 2;
            const barW = Math.max(2, candleSpacing * 0.65);
            const vHeight = (c.volume / (maxVol || 1)) * (volumeHeight - 10);
            const vY = chartHeight + volumeHeight + 10 - vHeight;

            return (
              <rect
                key={`vol-${i}`}
                x={x - barW / 2}
                y={vY}
                width={barW}
                height={vHeight}
                fill={c.isUp ? '#10b981' : '#f43f5e'}
                opacity={hoveredIndex === i ? 0.8 : 0.25}
              />
            );
          })}

          {/* Candlesticks (Wick + Body) */}
          {candles.map((c, i) => {
            const x = i * candleSpacing + candleSpacing / 2;
            const barW = Math.max(3, candleSpacing * 0.65);
            const yOpen = getY(c.open);
            const yClose = getY(c.close);
            const yHigh = getY(c.high);
            const yLow = getY(c.low);
            const isUp = c.isUp;
            const isHovered = hoveredIndex === i;

            const rectY = Math.min(yOpen, yClose);
            const rectHeight = Math.max(2, Math.abs(yClose - yOpen));
            const color = isUp ? '#10b981' : '#f43f5e';

            return (
              <g
                key={`candle-${i}`}
                onMouseEnter={() => setHoveredIndex(i)}
                className="transition-opacity"
              >
                {/* Upper & Lower Wicks */}
                <line
                  x1={x}
                  y1={yHigh}
                  x2={x}
                  y2={yLow}
                  stroke={color}
                  strokeWidth={isHovered ? 2 : 1.2}
                />

                {/* Candle Body */}
                <rect
                  x={x - barW / 2}
                  y={rectY}
                  width={barW}
                  height={rectHeight}
                  fill={color}
                  rx="1"
                  stroke={isHovered ? '#ffffff' : color}
                  strokeWidth={isHovered ? 1.5 : 0.5}
                />
              </g>
            );
          })}

          {/* MA 7 Overlay Curve */}
          {showMA7 && candles.length > 7 && (
            <path
              d={candles
                .map((c, i) => {
                  const x = i * candleSpacing + candleSpacing / 2;
                  const y = getY(c.ma7 || c.close);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.8"
              opacity="0.9"
            />
          )}

          {/* MA 21 Overlay Curve */}
          {showMA21 && candles.length > 21 && (
            <path
              d={candles
                .map((c, i) => {
                  const x = i * candleSpacing + candleSpacing / 2;
                  const y = getY(c.ma21 || c.close);
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="1.8"
              opacity="0.9"
            />
          )}

          {/* Crosshair on Hover */}
          {hoveredIndex !== null && candles[hoveredIndex] && (
            <g>
              <line
                x1={hoveredIndex * candleSpacing + candleSpacing / 2}
                y1="0"
                x2={hoveredIndex * candleSpacing + candleSpacing / 2}
                y2={chartHeight + volumeHeight + 20}
                stroke="#6366f1"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <line
                x1="0"
                y1={getY(candles[hoveredIndex].close)}
                x2={chartWidth}
                y2={getY(candles[hoveredIndex].close)}
                stroke="#6366f1"
                strokeWidth="1"
                strokeDasharray="2 2"
              />
            </g>
          )}
        </svg>

        {/* Legend Overlay at Bottom Right */}
        <div className="absolute bottom-2 right-3 flex items-center gap-3 bg-[#161b22]/90 backdrop-blur-xs px-2.5 py-1 rounded text-[11px] border border-[#30363d]">
          <span className="flex items-center gap-1 text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-xs bg-emerald-500"></span> Bullish
          </span>
          <span className="flex items-center gap-1 text-rose-400 font-medium">
            <span className="w-2 h-2 rounded-xs bg-rose-500"></span> Bearish
          </span>
          {showMA7 && (
            <span className="flex items-center gap-1 text-amber-300">
              <span className="w-3 h-0.5 bg-amber-400"></span> MA 7
            </span>
          )}
          {showMA21 && (
            <span className="flex items-center gap-1 text-sky-300">
              <span className="w-3 h-0.5 bg-sky-400"></span> MA 21
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
