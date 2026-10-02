import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-xl">
      <div className="w-full px-gutter md:px-gutter-desktop flex flex-col md:flex-row items-center justify-between gap-space-md max-w-[1720px] mx-auto">
        <div className="flex items-center gap-space-sm">
          <div className="w-6 h-6 rounded bg-surface-container flex items-center justify-center p-0.5 border border-outline-variant/40">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
              <path d="M8 32L17 22L23 28L36 10" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M28 10H36V18" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="36" cy="10" r="3" fill="#38BDF8"/>
            </svg>
          </div>
          <span className="text-body-sm font-body-sm text-on-surface-variant">
            © 2025 StockAI Systems Inc. Institutional Quantitative Architecture.
          </span>
        </div>
        <div className="flex items-center gap-space-lg text-label-sm font-label-sm text-outline">
          <button onClick={() => onNavigate && onNavigate('dashboard')} className="hover:text-on-surface transition-colors">
            Market Surveillance
          </button>
          <button onClick={() => onNavigate && onNavigate('methodology')} className="hover:text-on-surface transition-colors">
            Latency SLA
          </button>
          <button onClick={() => onNavigate && onNavigate('methodology')} className="hover:text-on-surface transition-colors">
            Risk Disclosure
          </button>
        </div>
      </div>
    </footer>
  );
}
