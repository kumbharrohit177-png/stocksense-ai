import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import PredictionsPage from './pages/PredictionsPage';
import ModelsPage from './pages/ModelsPage';
import MethodologyPage from './pages/MethodologyPage';

export default function App() {
  const [activePage, setActivePage] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    if (['landing', 'dashboard', 'predictions', 'models', 'methodology'].includes(hash)) {
      return hash;
    }
    return 'dashboard';
  });

  const [activeStock, setActiveStock] = useState('RELIANCE');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sync hash with active page
  useEffect(() => {
    window.location.hash = activePage;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Handle hash change from browser navigation (back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (['landing', 'dashboard', 'predictions', 'models', 'methodology'].includes(hash)) {
        setActivePage(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100 flex flex-col font-sans selection:bg-primary/30 selection:text-white">
      {/* Single Top Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        activeStock={activeStock}
        onSelectStock={setActiveStock}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Area - Clean Full Width */}
      <div className="flex-1 flex flex-col w-full pt-16">
        <main className="flex-1 w-full bg-[#0d1117] flex flex-col min-h-[calc(100vh-64px)]">
          {activePage === 'landing' && (
            <LandingPage
              onNavigate={setActivePage}
              onSelectStock={setActiveStock}
            />
          )}

          {activePage === 'dashboard' && (
            <DashboardPage
              activeStock={activeStock}
              onSelectStock={setActiveStock}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'predictions' && (
            <PredictionsPage
              activeStock={activeStock}
              onSelectStock={setActiveStock}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'models' && (
            <ModelsPage onNavigate={setActivePage} />
          )}

          {activePage === 'methodology' && (
            <MethodologyPage onNavigate={setActivePage} />
          )}

          {/* Page Footer */}
          <Footer onNavigate={setActivePage} />
        </main>
      </div>

      {/* Global Command Palette (⌘K / Ctrl+K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        onSelectStock={setActiveStock}
        onNavigate={setActivePage}
      />
    </div>
  );
}
