import React, { useState, useEffect } from 'react';
import { STOCKS_DATA, AVAILABLE_STOCKS } from '../data/mockData';

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
      s.name.toLowerCase().includes(query.toLowerCase())
  );

  const quickPages = [
    { id: 'dashboard', label: 'Dashboard — Stock Price & ML Predictions', icon: 'dashboard' },
    { id: 'predictions', label: 'Predictions — Multi-Horizon Forecasting', icon: 'trending_up' },
    { id: 'models', label: 'Model Comparison — Linear Reg vs ARIMA vs LSTM', icon: 'compare_arrows' },
    { id: 'methodology', label: 'Methodology — Pipeline & Algorithms', icon: 'school' },
  ].filter((p) => p.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#161b22] rounded-xl shadow-2xl border border-[#30363d] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 border-b border-[#21262d] flex items-center gap-3 bg-[#0d1117]">
          <span className="material-symbols-outlined text-primary text-[22px]">search</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stock ticker (RELIANCE, TCS, INFY) or page..."
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 text-sm focus:outline-none"
          />
          <button 
            onClick={() => onClose(false)}
            className="px-2 py-1 rounded bg-[#161b22] text-gray-400 hover:text-white text-xs border border-[#30363d] cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[380px] overflow-y-auto p-3 space-y-4">
          {/* Equities Section */}
          {stockList.length > 0 && (
            <div>
              <div className="px-2 py-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Available Stocks
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
                    className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[#1f2937] transition-colors text-left group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-[#0d1117] border border-[#30363d] flex items-center justify-center font-bold text-primary text-sm">
                        {s.symbol[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {s.symbol}
                          <span className="text-xs font-normal text-gray-400">{s.name}</span>
                        </div>
                        <div className="text-[11px] text-gray-500">{s.exchange} • {s.currency}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white font-mono">
                        {s.currencySymbol}{s.price.toFixed(2)}
                      </div>
                      <div className={`text-xs font-semibold font-mono ${s.isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
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
              <div className="px-2 py-1 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Navigation Views
              </div>
              <div className="space-y-1 mt-1">
                {quickPages.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onNavigate(p.id);
                      onClose(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[#1f2937] transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-primary text-[20px]">{p.icon}</span>
                    <span className="text-xs font-semibold text-gray-200">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {stockList.length === 0 && quickPages.length === 0 && (
            <div className="py-8 text-center text-gray-400 text-xs">
              No matching stock or view found for "{query}"
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-[#0d1117] border-t border-[#21262d] flex items-center justify-between text-[11px] text-gray-400">
          <span>Press <strong>ESC</strong> to close</span>
          <span>StockSense AI Project</span>
        </div>
      </div>
    </div>
  );
}
