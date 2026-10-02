import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
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
    return 'landing';
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

  const hasSidebar = activePage !== 'landing';

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      {/* 1. Global Navigation Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenSearch={() => setIsSearchOpen(true)}
        activeStock={activeStock}
        onSelectStock={setActiveStock}
      />

      {/* 2. Workspace Layout with Optional Sidebar */}
      <div className="flex-1 flex w-full pt-[92px]">
        {hasSidebar && (
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        )}

        <main className={`flex-1 w-full bg-background ${hasSidebar ? 'md:pl-64' : ''} flex flex-col min-h-[calc(100vh-92px)]`}>
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

      {/* 3. Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isSearchOpen}
        onClose={setIsSearchOpen}
        onSelectStock={setActiveStock}
        onNavigate={setActivePage}
      />
    </div>
  );
}
