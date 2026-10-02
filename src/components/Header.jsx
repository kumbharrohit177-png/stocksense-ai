import React, { useState } from 'react';
import { LIVE_TICKERS } from '../data/mockData';

export default function Header({ activePage, setActivePage, onOpenSearch, activeStock, onSelectStock }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { id: 'landing', label: 'Landing' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'predictions', label: 'Predictions' },
    { id: 'models', label: 'Models' },
    { id: 'methodology', label: 'Methodology' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
      {/* 1. Top Real-Time Market Ticker Ribbon */}
      <div className="h-7 w-full bg-surface-container-lowest px-gutter md:px-gutter-desktop flex items-center justify-between overflow-x-auto overflow-y-hidden border-b border-outline-variant/20 text-label-sm font-label-sm scrollbar-none">
        <div className="flex items-center gap-space-lg whitespace-nowrap">
          {LIVE_TICKERS.map((ticker) => (
            <button
              key={ticker.name}
              onClick={() => {
                if (['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'TATAMOTORS'].includes(ticker.name)) {
                  onSelectStock && onSelectStock(ticker.name);
                }
              }}
              className="flex items-center gap-space-xs hover:opacity-80 transition-opacity cursor-pointer text-left"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${ticker.isUp ? 'bg-tertiary' : 'bg-error'} animate-pulse`}></span>
              <span className="text-on-surface-variant uppercase">{ticker.name}</span>
              <span className="font-metric-val text-metric-val text-on-surface tabular-nums">{ticker.price}</span>
              <span className={`${ticker.isUp ? 'text-tertiary' : 'text-error'} font-metric-val text-metric-val tabular-nums`}>
                {ticker.change}
              </span>
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-space-sm text-on-surface-variant pl-4">
          <span className="text-label-sm font-label-sm uppercase tracking-wider">Tick Latency:</span>
          <span className="text-tertiary font-metric-val text-metric-val tabular-nums">12ms</span>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="h-16 w-full px-gutter md:px-gutter-desktop flex items-center justify-between gap-space-md">
        {/* Logo & Platform Name */}
        <div className="flex items-center gap-space-lg">
          <button 
            onClick={() => setActivePage('landing')}
            className="flex items-center gap-space-sm text-left focus:outline-none group"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center p-1 border border-outline-variant/40 group-hover:border-primary/60 transition-colors">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path d="M8 32L17 22L23 28L36 10" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M28 10H36V18" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="36" cy="10" r="3" fill="#38BDF8"/>
                <circle cx="17" cy="22" r="2" fill="#10B981"/>
                <circle cx="23" cy="28" r="2" fill="#10B981"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm font-bold text-on-surface tracking-tight leading-none">
                Stock<span className="text-primary">AI</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-primary font-label-sm">
                Inference Engine
              </span>
            </div>
          </button>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-space-xs">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-space-md py-1.5 rounded-lg transition-all font-label-md text-label-md cursor-pointer ${
                    isActive
                      ? 'bg-surface-container-high text-primary font-bold shadow-sm shadow-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:flex items-center">
          <div 
            onClick={onOpenSearch}
            className="relative w-full cursor-pointer group"
          >
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px] group-hover:text-primary transition-colors">
              search
            </span>
            <input
              type="text"
              readOnly
              onClick={onOpenSearch}
              placeholder="Search ticker (e.g. RELIANCE, TCS, INFY)..."
              className="w-full pl-9 pr-14 py-1.5 rounded bg-surface-container-low text-on-surface placeholder:text-outline text-body-sm font-body-sm focus:outline-none focus:ring-1 focus:ring-primary border border-outline-variant/40 cursor-pointer"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 bg-surface-container px-1.5 py-0.5 rounded text-[10px] font-label-sm text-on-surface-variant border border-outline-variant/30">
              <span>⌘</span>
              <span>K</span>
            </div>
          </div>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center gap-space-md">
          <div className="hidden sm:flex items-center gap-space-xs px-2.5 py-1 rounded bg-surface-container-low border border-tertiary/20 text-label-sm font-label-sm text-tertiary">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
            <span>● NSE LIVE</span>
          </div>

          <div className="hidden xl:flex items-center gap-space-xs px-2.5 py-1 rounded bg-surface-container-low border border-secondary/20 text-label-sm font-label-sm text-secondary">
            <span className="material-symbols-outlined text-[14px]">memory</span>
            <span>TensorEngine v3.4 Active</span>
          </div>

          <div className="flex items-center gap-space-xs">
            <button 
              onClick={onOpenSearch}
              title="Search"
              className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Toggle Theme"
              className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDarkMode ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant/30">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-label-sm font-label-sm text-on-surface font-semibold">QuantDesk α</span>
              <span className="text-[9px] font-label-sm uppercase tracking-wider text-secondary px-1 rounded bg-secondary-container/20 self-end">
                QUANT LAB
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-surface-container-high ring-1 ring-primary/40 flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined text-primary text-[20px]">account_circle</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Page Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around bg-surface-container border-t border-outline-variant/20 py-1.5 px-2 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`px-3 py-1 rounded text-label-sm font-label-sm whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
