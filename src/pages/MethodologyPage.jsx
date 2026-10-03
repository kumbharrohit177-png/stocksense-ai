import React from 'react';
import { PIPELINE_STEPS } from '../data/mockData';

export default function MethodologyPage({ onNavigate }) {
  return (
    <div className="p-4 md:p-8 max-w-[1400px] mx-auto w-full space-y-8">
      
      {/* 1. Header & Purpose */}
      <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] shadow-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px]">school</span>
          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Academic Project Methodology & ML Pipeline
          </h1>
        </div>
        <p className="text-sm text-gray-300 mt-2 max-w-3xl leading-relaxed">
          This system implements an end-to-end artificial intelligence and machine learning framework for stock market trend prediction. It ingests historical price data, extracts quantitative technical indicators, and trains three distinct algorithms to forecast future price trajectories.
        </p>
      </div>

      {/* 2. Step-by-Step Flowchart Pipeline */}
      <div className="bg-[#161b22] p-6 rounded-xl border border-[#30363d] shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Project Pipeline Architecture</h2>
          <p className="text-xs text-gray-400 mt-0.5">Step-by-step workflow from historical data collection to final visual evaluation</p>
        </div>

        {/* Horizontal / Grid Flowchart */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 pt-2">
          {PIPELINE_STEPS.map((step, idx) => (
            <div key={step.step} className="relative flex flex-col p-4 rounded-lg bg-[#0d1117] border border-[#21262d] space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                  {step.step}
                </span>
                <span className="material-symbols-outlined text-gray-500 text-[18px]">
                  {step.icon}
                </span>
              </div>
              
              <div className="font-bold text-xs text-white">{step.title}</div>
              <p className="text-[11px] text-gray-400 leading-relaxed flex-1">{step.desc}</p>

              {idx < PIPELINE_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-gray-600 font-bold">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Mathematical Foundations & Algorithms Breakdown */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Machine Learning Algorithms Overview</h2>
          <p className="text-xs text-gray-400 mt-0.5">Academic formulations and algorithmic roles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Linear Regression */}
          <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <h3 className="text-sm font-bold text-white">1. Multivariate Linear Regression</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Acts as the supervised statistical baseline. It models the target next-day price as a linear combination of standardized technical features (moving averages, returns, RSI).
            </p>
            <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] font-mono text-[11px] text-gray-300">
              ŷ&#7522;&#43;&#8321; = β₀ + β₁·MA₇ + β₂·RSI + ... + ε
            </div>
            <div className="text-[11px] text-gray-400 pt-1">
              <strong>Role:</strong> Baseline comparison to assess whether non-linear or autoregressive models outperform standard statistical regression.
            </div>
          </div>

          {/* 2. ARIMA */}
          <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-400"></span>
              <h3 className="text-sm font-bold text-white">2. ARIMA (5, 1, 2) Time-Series</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              AutoRegressive Integrated Moving Average models univariate time series by combining autoregression of past lags (p=5), 1st order differencing (d=1) to achieve stationarity, and moving average error shocks (q=2).
            </p>
            <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] font-mono text-[11px] text-gray-300">
              (1 - ∑φᵢLⁱ)(1 - L)&#7496; y&#7522; = (1 + ∑θⱼLʲ) ε&#7522;
            </div>
            <div className="text-[11px] text-gray-400 pt-1">
              <strong>Role:</strong> Captures auto-correlation structures and stationarized time-series dynamics without requiring external features.
            </div>
          </div>

          {/* 3. LSTM */}
          <div className="p-5 rounded-xl bg-[#161b22] border border-emerald-500/30 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <h3 className="text-sm font-bold text-white">3. LSTM Recurrent Neural Network</h3>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Long Short-Term Memory networks solve the vanishing gradient problem in standard RNNs by using specialized memory cells governed by input, forget, and output gates.
            </p>
            <div className="p-3 rounded bg-[#0d1117] border border-[#21262d] font-mono text-[11px] text-gray-300">
              f&#7522; = σ(W_f·[h&#7522;₋₁, x&#7522;] + b_f)
            </div>
            <div className="text-[11px] text-gray-400 pt-1">
              <strong>Role:</strong> Learns complex non-linear temporal dependencies across historical multi-day lookback sequences.
            </div>
          </div>
        </div>
      </div>

      {/* 4. Evaluation Framework & Data Partitioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Data Splitting & Leakage Prevention */}
        <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">call_split</span>
            <span>Chronological Train / Test Split</span>
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            In time-series machine learning, random shuffling creates forward-looking bias (data leakage). Therefore, the dataset is split chronologically:
          </p>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded bg-[#0d1117] border border-[#21262d] text-emerald-400 flex-1 text-center font-bold">
              80% Training Set (Past)
            </span>
            <span className="text-gray-500">→</span>
            <span className="px-3 py-1.5 rounded bg-[#0d1117] border border-[#21262d] text-sky-400 flex-1 text-center font-bold">
              20% Test Set (Future)
            </span>
          </div>
        </div>

        {/* Evaluation Metrics Explained */}
        <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">analytics</span>
            <span>Evaluation Metrics Used</span>
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
              <strong className="text-white">MAE:</strong> Mean Absolute Error in price units.
            </div>
            <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
              <strong className="text-white">RMSE:</strong> Root Mean Squared Error penalizing large deviations.
            </div>
            <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
              <strong className="text-white">R² Score:</strong> Proportion of variance explained by model.
            </div>
            <div className="p-2 rounded bg-[#0d1117] border border-[#21262d]">
              <strong className="text-white">Directional Hit:</strong> Percentage of correct upward/downward calls.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
