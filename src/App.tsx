import React, { useState } from 'react';
import { GlobalLandingHub } from './modules/templating-hub/GlobalLandingHub';
import { GistexSalesApp } from './modules/gistex-sales/GistexSalesApp';
import { TemplatingHubLanding } from './modules/templating-hub/TemplatingHubLanding';

export type MainAppView = 'global-hub' | 'gistex-sales' | 'templating-hub';

export function App() {
  // Main view routing between 3 Landing Hubs:
  // 1. 'global-hub'     : Landing Utama Guide.In (2 Pilihan: Datatex Gistex vs Buat Template Demo)
  // 2. 'gistex-sales'   : Landing Modul Sales ERP Datatex (Project Lama Aman 100%)
  // 3. 'templating-hub' : Landing Templating & Interactive Studio (Fitur Baru)
  const [currentView, setCurrentView] = useState<MainAppView>(() => {
    // Check if user previously in gistex-sales view in localStorage
    try {
      const saved = localStorage.getItem('guide_in_main_view');
      if (saved === 'gistex-sales' || saved === 'templating-hub') return saved;
    } catch (e) {}
    return 'global-hub';
  });

  const handleNavigateView = (view: MainAppView) => {
    setCurrentView(view);
    try {
      localStorage.setItem('guide_in_main_view', view);
    } catch (e) {}
  };

  // 1. GLOBAL LANDING HUB (Landing 1)
  if (currentView === 'global-hub') {
    return (
      <GlobalLandingHub
        onSelectGistex={() => handleNavigateView('gistex-sales')}
        onSelectTemplateHub={() => handleNavigateView('templating-hub')}
      />
    );
  }

  // 2. GISTEX SALES ERP APP (Landing 2 - Modul Datatex Gistex Tetap Utuh)
  if (currentView === 'gistex-sales') {
    return (
      <GistexSalesApp
        onBackToGlobalLanding={() => handleNavigateView('global-hub')}
      />
    );
  }

  // 3. TEMPLATING & DEMO STUDIO (Landing 3 - Fitur Baru Template Wizard, CLI, dll)
  return (
    <TemplatingHubLanding
      onBackToGlobalLanding={() => handleNavigateView('global-hub')}
    />
  );
}

export default App;
