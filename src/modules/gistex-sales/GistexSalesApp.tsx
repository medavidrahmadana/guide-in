import React, { useState, useEffect } from 'react';
import { ModuleId, AppMode } from '../../types/workflow';
import { TRAINING_MODULES } from '../../data/stepsData';
import { Header } from '../../components/navigation/Header';
import { ModuleNavigation } from '../../components/navigation/ModuleNavigation';
import { LandingPage } from '../../components/landing/LandingPage';
import { WorkflowView } from '../../components/steps/WorkflowView';
import { PresentationBPTour } from '../../components/presentation/PresentationBPTour';
import { loadStoredProgress, saveStoredProgress } from '../../utils/storage';

interface GistexAppProps {
  onBackToGlobalLanding: () => void;
}

export const GistexSalesApp: React.FC<GistexAppProps> = ({ onBackToGlobalLanding }) => {
  // Learning State loaded directly from persistent device storage
  const [storedData] = useState(() => loadStoredProgress());
  const [mode, setMode] = useState<AppMode>(storedData.lastMode || 'landing');
  const [unlockedModules, setUnlockedModules] = useState<ModuleId[]>(storedData.unlockedModules);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>(storedData.completedModules);
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(storedData.lastActiveModuleId);
  const [moduleStepIndices, setModuleStepIndices] = useState<Record<ModuleId, number>>({
    'business-partner': storedData.lastStepIndex || 0,
    'order-partner': 0,
    'open-order': 0,
    'order-evolution': 0,
    'confirm-order': 0,
    'stock-picking': 0,
  });

  const currentModule = TRAINING_MODULES.find((m) => m.id === activeModuleId) || TRAINING_MODULES[0];
  const activeStepIndex = moduleStepIndices[activeModuleId] || 0;

  const handleStartWorkflow = (moduleId: ModuleId, chosenMode: 'sandbox' | 'presentation') => {
    setActiveModuleId(moduleId);
    setMode(chosenMode);
    saveStoredProgress({
      lastActiveModuleId: moduleId,
      lastMode: chosenMode,
      lastStepIndex: moduleStepIndices[moduleId] || 0,
    });
  };

  const handleChangeMode = (newMode: AppMode) => {
    setMode(newMode);
    saveStoredProgress({
      lastMode: newMode,
    });
  };

  const handleGoHome = () => {
    setMode('landing');
    saveStoredProgress({
      lastMode: 'landing',
    });
  };

  const handleStepChange = (index: number) => {
    setModuleStepIndices((prev) => ({
      ...prev,
      [activeModuleId]: index,
    }));
    saveStoredProgress({
      lastActiveModuleId: activeModuleId,
      lastStepIndex: index,
    });
  };

  const handleCompleteModule = (moduleId: ModuleId) => {
    let nextCompleted = completedModules;
    if (!completedModules.includes(moduleId)) {
      nextCompleted = [...completedModules, moduleId];
      setCompletedModules(nextCompleted);
    }

    const currentIndex = TRAINING_MODULES.findIndex((m) => m.id === moduleId);
    let nextUnlocked = unlockedModules;

    if (currentIndex < TRAINING_MODULES.length - 1) {
      const nextModule = TRAINING_MODULES[currentIndex + 1];
      if (!unlockedModules.includes(nextModule.id)) {
        nextUnlocked = [...unlockedModules, nextModule.id];
        setUnlockedModules(nextUnlocked);
      }
      setActiveModuleId(nextModule.id);
      setModuleStepIndices((prev) => ({
        ...prev,
        [nextModule.id]: 0,
      }));

      saveStoredProgress({
        completedModules: nextCompleted,
        unlockedModules: nextUnlocked,
        lastActiveModuleId: nextModule.id,
      });
    } else {
      saveStoredProgress({
        completedModules: nextCompleted,
        unlockedModules: nextUnlocked,
        lastActiveModuleId: moduleId,
      });
    }
  };

  if (mode === 'landing') {
    return (
      <div className="relative">
        {/* Floating Bar to return to Global Guide.In Hub */}
        <div className="absolute top-3 left-4 z-50">
          <button
            onClick={onBackToGlobalLanding}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-blue-500 text-xs text-slate-300 hover:text-white transition shadow-lg cursor-pointer backdrop-blur-md"
          >
            <span>← Kembali ke Hub Guide.In</span>
          </button>
        </div>

        <LandingPage
          unlockedModules={unlockedModules}
          completedModules={completedModules}
          onStartWorkflow={handleStartWorkflow}
        />
      </div>
    );
  }

  // PRESENTATION TOUR MODE
  if (mode === 'presentation' && activeModuleId === 'business-partner') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
        <Header
          mode={mode}
          onChangeMode={handleChangeMode}
          onGoHome={handleGoHome}
        />
        <PresentationBPTour
          module={currentModule}
          onExitPresentation={() => handleChangeMode('sandbox')}
          onCompleteAndUnlockNext={() => {
            handleCompleteModule('business-partner');
            handleChangeMode('sandbox');
          }}
        />
      </div>
    );
  }

  // SANDBOX MODE
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        mode={mode}
        onChangeMode={handleChangeMode}
        onGoHome={handleGoHome}
      />

      <ModuleNavigation
        activeModuleId={activeModuleId}
        activeStepIndex={activeStepIndex}
        unlockedModules={unlockedModules}
        completedModules={completedModules}
        onSelectModule={(id) => {
          setActiveModuleId(id);
          saveStoredProgress({ lastActiveModuleId: id });
        }}
        onSelectStep={handleStepChange}
      />

      <main className="flex-1">
        <WorkflowView
          activeModuleId={activeModuleId}
          activeStepIndex={activeStepIndex}
          unlockedModules={unlockedModules}
          isPresentation={false}
          onStepChange={handleStepChange}
          onSelectModule={(id) => setActiveModuleId(id)}
          onCompleteModule={handleCompleteModule}
        />
      </main>
    </div>
  );
};
