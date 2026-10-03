import React, { useState } from 'react';
import { AVAILABLE_STOCKS } from '../data/mockData';

export default function Header({ activePage, setActivePage, activeStock, onSelectStock }) {
  const [isStockDropdownOpen, setIsStockDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'predictions', label: 'Predictions', icon: 'trending_up' },
    { id: 'models', label: 'Model Comparison', icon: 'compare_arrows' },
    { id: 'methodology', label: 'Methodology', icon: 'school' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#21262d] shadow-sm">
      <div className="max-w-[1600px] mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Subtitle */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActivePage('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[#161b22] flex items-center justify-center border border-[#30363d] group-hover:border-primary/60 transition-colors shadow-sm">
              <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                <path d="M4 22L11 14L17 19L28 7" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M22 7H28V13" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="28" cy="7" r="2.5" fill="#6366F1"/>
                <circle cx="11" cy="14" r="2" fill="#10B981"/>
                <circle cx="17" cy="19" r="2" fill="#10B981"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white tracking-tight leading-none group-hover:text-primary transition-colors">
                StockSense <span className="text-primary font-extrabold">AI</span>
              </span>
              <span className="text-[11px] text-gray-400 font-medium tracking-normal mt-0.5">
                AI-Based Stock Market Trend Prediction
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 ml-4 pl-4 border-l border-[#21262d]">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1f2937] text-white font-semibold shadow-sm border border-[#374151]'
                      : 'text-gray-400 hover:bg-[#161b22] hover:text-gray-200'
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px] opacity-80">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Section: Stock Selector */}
        <div className="flex items-center gap-3">
          
          {/* Stock Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsStockDropdownOpen(!isStockDropdownOpen)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#161b22] hover:bg-[#1f2937] text-white text-xs font-semibold border border-[#30363d] transition-colors cursor-pointer shadow-sm"
            >
              <span className="text-gray-400">Stock:</span>
              <span className="text-primary font-bold">{activeStock}</span>
              <span className="material-symbols-outlined text-[16px] text-gray-400">
                {isStockDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {isStockDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsStockDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-56 rounded-lg bg-[#161b22] border border-[#30363d] shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-[#21262d]">
                    Select Stock
                  </div>
                  {AVAILABLE_STOCKS.map((s) => (
                    <button
                      key={s.symbol}
                      onClick={() => {
                        onSelectStock(s.symbol);
                        setIsStockDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        activeStock === s.symbol
                          ? 'bg-[#1f2937] text-primary font-bold'
                          : 'text-gray-300 hover:bg-[#21262d]'
                      }`}
                    >
                      <span className="font-semibold">{s.symbol}</span>
                      <span className="text-[10px] text-gray-500">{s.exchange}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="md:hidden flex items-center justify-around bg-[#0d1117] border-t border-[#21262d] py-2 px-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#1f2937] text-white font-bold border border-[#374151]'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}
