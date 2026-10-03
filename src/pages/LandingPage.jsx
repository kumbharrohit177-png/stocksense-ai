import React from 'react';
import ActualVsPredictedChart from '../components/ActualVsPredictedChart';
import { STOCKS_DATA } from '../data/mockData';

export default function LandingPage({ onNavigate, onSelectStock }) {
  const sampleStock = STOCKS_DATA.RELIANCE;

  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full space-y-10 my-auto">
      
      {/* 1. Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
          StockSense <span className="text-primary">AI</span>
        </h1>

        <p className="text-lg md:text-xl font-medium text-gray-200">
          AI-Based Stock Market Trend Prediction
        </p>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Analyze historical stock data and predict future trends using Linear Regression, ARIMA, and LSTM recurrent neural networks.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 text-on-primary font-bold text-sm transition-all shadow-md hover:scale-[1.02] cursor-pointer flex items-center gap-2"
          >
            <span>Open Dashboard</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>

          <button
            onClick={() => onNavigate('models')}
            className="px-5 py-3 rounded-lg bg-[#161b22] hover:bg-[#1f2937] text-gray-200 font-semibold text-sm border border-[#30363d] transition-all cursor-pointer"
          >
            Model Comparison
          </button>
        </div>
      </section>

      {/* 2. Three Core Model Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Model 1: Linear Regression */}
        <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 hover:border-amber-400/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Model 1</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#0d1117] text-gray-400">Baseline</span>
          </div>
          <h3 className="text-base font-bold text-white">Linear Regression</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Supervised baseline fitting Ordinary Least Squares to engineered technical features like Moving Averages and RSI.
          </p>
          <div className="text-xs font-mono text-gray-300 pt-2 border-t border-[#21262d]">
            RMSE: <strong className="text-white">44.95</strong> • R²: <strong className="text-white">0.687</strong>
          </div>
        </div>

        {/* Model 2: ARIMA */}
        <div className="p-6 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3 hover:border-sky-400/50 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Model 2</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#0d1117] text-gray-400">Time Series</span>
          </div>
          <h3 className="text-base font-bold text-white">ARIMA (5, 1, 2)</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Classical stochastic time-series model capturing autoregressive memory, stationarity differencing, and moving average shocks.
          </p>
          <div className="text-xs font-mono text-gray-300 pt-2 border-t border-[#21262d]">
            RMSE: <strong className="text-white">48.60</strong> • R²: <strong className="text-white">0.844</strong>
          </div>
        </div>

        {/* Model 3: LSTM */}
        <div className="p-6 rounded-xl bg-[#161b22] border border-emerald-500/30 space-y-3 hover:border-emerald-500/60 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Model 3</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Optimal</span>
          </div>
          <h3 className="text-base font-bold text-white">LSTM Neural Network</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Deep recurrent neural network with input/forget gating capturing complex non-linear temporal sequence patterns.
          </p>
          <div className="text-xs font-mono text-gray-300 pt-2 border-t border-[#21262d]">
            RMSE: <strong className="text-white">42.30</strong> • R²: <strong className="text-white">0.884</strong>
          </div>
        </div>
      </section>

      {/* 3. One Preview Visualization */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Prediction Engine Preview
          </span>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-xs text-primary font-semibold hover:underline cursor-pointer"
          >
            Launch Interactive Dashboard →
          </button>
        </div>
        <ActualVsPredictedChart stockSymbol="RELIANCE" stockData={sampleStock} />
      </section>
    </div>
  );
}
