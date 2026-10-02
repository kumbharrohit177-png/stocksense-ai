import React from 'react';

export default function Sidebar({ activePage, setActivePage }) {
  const workspaceLinks = [
    { id: 'dashboard', label: 'Live Signals', icon: 'candlestick_chart' },
    { id: 'predictions', label: 'Probability Cones', icon: 'trending_up' },
    { id: 'models', label: 'Neural Weights', icon: 'neurology' },
    { id: 'methodology', label: 'Inference Specs', icon: 'schema' },
  ];

  return (
    <aside className="fixed left-0 top-[92px] h-[calc(100vh-92px)] w-64 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/30 z-40 hidden md:flex flex-col justify-between py-space-md">
      <div className="px-space-md space-y-space-md">
        {/* Workspace Engine Section */}
        <div className="px-space-sm text-[10px] font-label-sm font-semibold tracking-wider text-outline uppercase">
          Workspace Engine
        </div>
        <nav className="space-y-space-xs">
          {workspaceLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActivePage(link.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-space-sm px-space-md py-2 transition-colors font-body-sm text-body-sm text-left rounded cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Telemetry Feeds Section */}
        <div className="pt-space-md px-space-sm text-[10px] font-label-sm font-semibold tracking-wider text-outline uppercase">
          Telemetry Feeds
        </div>
        <nav className="space-y-space-xs">
          <div className="flex items-center justify-between px-space-md py-2 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-body-sm text-body-sm cursor-pointer">
            <span className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[18px]">database</span>
              <span>Order Depth L3</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
          </div>
          <div className="flex items-center justify-between px-space-md py-2 rounded text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-body-sm text-body-sm cursor-pointer">
            <span className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[18px]">speed</span>
              <span>Volatility Index</span>
            </span>
            <span className="text-label-sm font-label-sm text-tertiary tabular-nums font-semibold">13.4</span>
          </div>
        </nav>
      </div>

      {/* GPU Compute Load Telemetry Widget */}
      <div className="px-space-md">
        <div className="p-space-md rounded bg-surface-container-low border border-outline-variant/30">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="text-[11px] font-label-sm uppercase text-on-surface-variant tracking-wider">GPU Compute Load</span>
            <span className="text-label-sm font-label-sm text-primary tabular-nums font-bold">42.8%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-primary to-secondary w-[43%]"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-outline mt-1.5">
            <span>CUDA A100 Tensor</span>
            <span className="text-tertiary">Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
