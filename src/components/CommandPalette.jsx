import React, { useState, useEffect } from 'react';
import { STOCKS_DATA } from '../data/mockData';

export default function CommandPalette({ isOpen, onClose, onSelectStock, onNavigate }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stockList = Object.values(STOCKS_DATA).filter(
    (s) =>
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase())
  );

  const quickPages = [
    { id: 'landing', label: 'Landing Page & Overview', icon: 'home' },
    { id: 'dashboard', label: 'Stock Analysis Dashboard (Live Signals)', icon: 'candlestick_chart' },
    { id: 'predictions', label: 'AI Predictions & Probability Cones', icon: 'trending_up' },
    { id: 'models', label: 'Model Benchmark & Comparison (LR, ARIMA, LSTM)', icon: 'neurology' },
    { id: 'methodology', label: 'Research Paper & Architecture Specs', icon: 'schema' },
  ].filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-surface-container rounded-2xl shadow-2xl border border-outline-variant/40 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-outline-variant/30 flex items-center gap-3 bg-surface-container-low">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search equities, ML models, horizons, or documentation..."
            className="flex-1 bg-transparent text-on-surface placeholder:text-outline text-body-lg font-body-lg focus:outline-none"
          />
          <button 
            onClick={() => onClose(false)}
            className="px-2 py-1 rounded bg-surface-container text-outline hover:text-on-surface text-label-sm font-label-sm"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {/* Equities Section */}
          {stockList.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-label-sm font-semibold tracking-wider text-outline uppercase">
                Active Equities & Live Tickers
              </div>
              <div className="space-y-1 mt-1">
                {stockList.map((s) => (
                  <button
                    key={s.symbol}
                    onClick={() => {
                      onSelectStock(s.symbol);
                      onNavigate('dashboard');
                      onClose(false);
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container-high transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center font-bold text-primary text-sm group-hover:bg-primary-container group-hover:text-on-primary-container transition-colors">
                        {s.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold text-on-surface text-sm flex items-center gap-2">
                          {s.symbol}
                          <span className="text-[11px] font-normal text-outline">{s.name}</span>
                        </div>
                        <div className="text-[11px] text-on-surface-variant">{s.sector}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-metric-val font-semibold text-on-surface tabular-nums">
                        ₹{s.price.toFixed(2)}
                      </div>
                      <div className={`text-label-sm font-metric-val tabular-nums ${s.isPositive ? 'text-tertiary' : 'text-error'}`}>
                        {s.isPositive ? '+' : ''}{s.changePercent}%
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Pages Navigation */}
          {quickPages.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-label-sm font-semibold tracking-wider text-outline uppercase">
                Platform Workspaces & Views
              </div>
              <div className="space-y-1 mt-1">
                {quickPages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate(p.id);
                      onClose(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-surface-container-high transition-colors text-left"
                  >
                    <span className="material-symbols-outlined text-secondary text-[20px]">{p.icon}</span>
                    <span className="text-sm font-medium text-on-surface">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stockList.length === 0 && quickPages.length === 0 && (
            <div className="py-8 text-center text-on-surface-variant text-sm">
              No matching ticker or view found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-surface-container-low border-t border-outline-variant/30 flex items-center justify-between text-[11px] text-outline">
          <span>Navigate with <strong>↑</strong> <strong>↓</strong> and <strong>Enter</strong></span>
          <span className="text-tertiary">● NSE Live Streaming Feed Connected</span>
        </div>
      </div>
    </div>
  );
}
