import React from 'react';

export default function OrderBook({ stock }) {
  const orderBook = stock?.orderBook || {
    bids: [
      { price: 2845.20, qty: 1450, total: 1450, fillPct: 85 },
      { price: 2844.80, qty: 3200, total: 4650, fillPct: 70 },
      { price: 2844.00, qty: 5800, total: 10450, fillPct: 92 },
      { price: 2843.50, qty: 2100, total: 12550, fillPct: 45 },
      { price: 2842.00, qty: 4600, total: 17150, fillPct: 60 }
    ],
    asks: [
      { price: 2845.60, qty: 1820, total: 1820, fillPct: 65 },
      { price: 2846.00, qty: 2900, total: 4720, fillPct: 80 },
      { price: 2846.50, qty: 4100, total: 8820, fillPct: 55 },
      { price: 2847.20, qty: 6300, total: 15120, fillPct: 90 },
      { price: 2848.00, qty: 3400, total: 18520, fillPct: 40 }
    ]
  };

  return (
    <div className="bg-surface-container-low rounded-xl p-space-md shadow-md border border-outline-variant/20 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[20px]">database</span>
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Order Depth L3</h3>
        </div>
        <span className="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary text-label-sm font-label-sm flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
          Direct DMA
        </span>
      </div>

      {/* Depth Table Headers */}
      <div className="grid grid-cols-2 gap-space-sm text-[11px] font-label-sm uppercase tracking-wider text-outline mb-1 border-b border-outline-variant/20 pb-1">
        <div className="flex justify-between">
          <span>Bid Qty</span>
          <span>Bid Price</span>
        </div>
        <div className="flex justify-between text-right">
          <span>Ask Price</span>
          <span>Ask Qty</span>
        </div>
      </div>

      {/* Bid / Ask Rows */}
      <div className="space-y-1 text-body-sm font-body-sm">
        {orderBook.bids.map((bid, i) => {
          const ask = orderBook.asks[i] || orderBook.asks[0];
          return (
            <div key={i} className="grid grid-cols-2 gap-space-sm text-[12px] font-metric-val">
              {/* Bid Row with green background bar */}
              <div className="relative flex justify-between items-center px-1.5 py-0.5 rounded overflow-hidden">
                <div 
                  className="absolute inset-y-0 right-0 bg-tertiary/15 rounded pointer-events-none"
                  style={{ width: `${bid.fillPct}%` }}
                ></div>
                <span className="relative z-10 text-on-surface-variant tabular-nums">{bid.qty.toLocaleString()}</span>
                <span className="relative z-10 text-tertiary font-bold tabular-nums">₹{bid.price.toFixed(2)}</span>
              </div>

              {/* Ask Row with red background bar */}
              <div className="relative flex justify-between items-center px-1.5 py-0.5 rounded overflow-hidden text-right">
                <div 
                  className="absolute inset-y-0 left-0 bg-error/15 rounded pointer-events-none"
                  style={{ width: `${ask.fillPct}%` }}
                ></div>
                <span className="relative z-10 text-error font-bold tabular-nums">₹{ask.price.toFixed(2)}</span>
                <span className="relative z-10 text-on-surface-variant tabular-nums">{ask.qty.toLocaleString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Spread & Vol Ratio Footer */}
      <div className="mt-space-sm pt-space-xs border-t border-outline-variant/20 flex items-center justify-between text-[11px] font-label-sm text-outline">
        <span>Spread: <strong className="text-secondary tabular-nums">₹0.40 (0.014%)</strong></span>
        <span>Bid/Ask Ratio: <strong className="text-tertiary tabular-nums">1.18x (Buy Heavy)</strong></span>
      </div>
    </div>
  );
}
