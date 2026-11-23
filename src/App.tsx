import React, { useState, useEffect } from 'react';
import { ModuleId, AppMode } from './types/workflow';
import { TRAINING_MODULES } from './data/stepsData';
import { Header } from './components/navigation/Header';
import { ModuleNavigation } from './components/navigation/ModuleNavigation';
import { LandingPage } from './components/landing/LandingPage';
import { WorkflowView } from './components/steps/WorkflowView';
import { SpotlightOverlay } from './components/presentation/SpotlightOverlay';
import { loadStoredProgress, saveStoredProgress } from './utils/storage';

export function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  
  // Learning State loaded directly from persistent device storage
  const [storedData] = useState(() => loadStoredProgress());
  const [unlockedModules, setUnlockedModules] = useState<ModuleId[]>(storedData.unlockedModules);
  const [completedModules, setCompletedModules] = useState<ModuleId[]>(storedData.completedModules);
  const [activeModuleId, setActiveModuleId] = useState<ModuleId>(storedData.lastActiveModuleId);
  const [moduleStepIndices, setModuleStepIndices] = useState<Record<ModuleId, number>>({
    'business-partner': 0,
    'order-partner': 0,
    'open-order': 0,
    'order-evolution': 0,
    'confirm-order': 0,
    'stock-picking': 0,
  });

  const currentModule = TRAINING_MODULES.find((m) => m.id === activeModuleId) || TRAINING_MODULES[0];
  const activeStepIndex = moduleStepIndices[activeModuleId] || 0;
  const currentStep = currentModule.steps[activeStepIndex] || currentModule.steps[0];

  const handleStartWorkflow = (moduleId: ModuleId, chosenMode: 'sandbox' | 'presentation') => {
    setActiveModuleId(moduleId);
    setMode(chosenMode);
  };

  const handleStepChange = (index: number) => {
    setModuleStepIndices((prev) => ({
      ...prev,
      [activeModuleId]: index,
    }));
  };

  // Complete a module, mark it finished, and unlock the next module!
  const handleCompleteModule = (moduleId: ModuleId) => {
    let nextCompleted = completedModules;
    if (!completedModules.includes(moduleId)) {
      nextCompleted = [...completedModules, moduleId];
      setCompletedModules(nextCompleted);
    }

    // Find next module index
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

  // Keyboard navigation for presentation mode
  useEffect(() => {
    if (mode !== 'presentation') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (activeStepIndex < currentModule.steps.length - 1) {
          handleStepChange(activeStepIndex + 1);
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeStepIndex > 0) {
          handleStepChange(activeStepIndex - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, activeStepIndex, currentModule]);

  if (mode === 'landing') {
    return (
      <LandingPage
        unlockedModules={unlockedModules}
        completedModules={completedModules}
        onStartWorkflow={handleStartWorkflow}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        mode={mode}
        onChangeMode={(newMode) => setMode(newMode)}
        onGoHome={() => setMode('landing')}
      />

      <ModuleNavigation
        activeModuleId={activeModuleId}
        activeStepIndex={activeStepIndex}
        unlockedModules={unlockedModules}
        completedModules={completedModules}
        onSelectModule={(id) => setActiveModuleId(id)}
        onSelectStep={handleStepChange}
      />

      <main className="flex-1">
        <SpotlightOverlay
          active={mode === 'presentation'}
          narrative={currentStep.presentationNarrative}
          tips={currentStep.tips}
          stepIndex={activeStepIndex + 1}
          totalSteps={currentModule.steps.length}
          onNext={() => {
            if (activeStepIndex < currentModule.steps.length - 1) {
              handleStepChange(activeStepIndex + 1);
            }
          }}
          onPrev={() => {
            if (activeStepIndex > 0) {
              handleStepChange(activeStepIndex - 1);
            }
          }}
        >
          <WorkflowView
            activeModuleId={activeModuleId}
            activeStepIndex={activeStepIndex}
            unlockedModules={unlockedModules}
            isPresentation={mode === 'presentation'}
            onStepChange={handleStepChange}
            onSelectModule={(id) => setActiveModuleId(id)}
            onCompleteModule={handleCompleteModule}
          />
        </SpotlightOverlay>
      </main>
    </div>
  );
}

export default App;
