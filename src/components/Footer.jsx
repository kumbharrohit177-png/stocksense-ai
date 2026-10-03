import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-[#0d1117] border-t border-[#21262d] py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
        
        {/* Project Branding */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">StockSense AI</span>
          <span>•</span>
          <span>AI-Based Stock Market Trend Prediction System</span>
        </div>

        {/* Algorithm Summary */}
        <div className="flex items-center gap-4 text-gray-400">
          <span>Multivariate Linear Regression</span>
          <span>•</span>
          <span>ARIMA(5,1,2)</span>
          <span>•</span>
          <span>LSTM Neural Network</span>
        </div>

        {/* Fast Navigation Links */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('dashboard')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('predictions')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Predictions
          </button>
          <button 
            onClick={() => onNavigate('models')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Model Comparison
          </button>
          <button 
            onClick={() => onNavigate('methodology')} 
            className="hover:text-white transition-colors cursor-pointer"
          >
            Methodology
          </button>
        </div>
      </div>
    </footer>
  );
}
