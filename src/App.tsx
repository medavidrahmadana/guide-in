import React, { useState, useEffect } from 'react';
import { WorkflowStepId, AppMode } from './types/workflow';
import { WORKFLOW_STEPS } from './data/stepsData';
import { Header } from './components/navigation/Header';
import { Stepper } from './components/navigation/Stepper';
import { LandingPage } from './components/landing/LandingPage';
import { WorkflowView } from './components/steps/WorkflowView';
import { SpotlightOverlay } from './components/presentation/SpotlightOverlay';

export function App() {
  const [mode, setMode] = useState<AppMode>('landing');
  const [currentStepId, setCurrentStepId] = useState<WorkflowStepId>('business-partner');

  const currentIndex = WORKFLOW_STEPS.findIndex((s) => s.id === currentStepId);
  const currentStep = WORKFLOW_STEPS[currentIndex] || WORKFLOW_STEPS[0];

  const handleStartWorkflow = (stepId: WorkflowStepId, chosenMode: 'sandbox' | 'presentation') => {
    setCurrentStepId(stepId);
    setMode(chosenMode);
  };

  const handleNextStep = () => {
    if (currentIndex < WORKFLOW_STEPS.length - 1) {
      setCurrentStepId(WORKFLOW_STEPS[currentIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    if (currentIndex > 0) {
      setCurrentStepId(WORKFLOW_STEPS[currentIndex - 1].id);
    }
  };

  // Keyboard shortcut listener for presentation mode navigation
  useEffect(() => {
    if (mode !== 'presentation') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, currentIndex]);

  if (mode === 'landing') {
    return <LandingPage onStartWorkflow={handleStartWorkflow} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        mode={mode}
        onChangeMode={(newMode) => setMode(newMode)}
        onGoHome={() => setMode('landing')}
      />

      <Stepper
        currentStepId={currentStepId}
        onSelectStep={(stepId) => setCurrentStepId(stepId)}
      />

      <main className="flex-1">
        <SpotlightOverlay
          active={mode === 'presentation'}
          narrative={currentStep.presentationScript?.narrative}
          tips={currentStep.presentationScript?.tips}
          stepIndex={currentIndex + 1}
          totalSteps={WORKFLOW_STEPS.length}
          onNext={handleNextStep}
          onPrev={handlePrevStep}
        >
          <WorkflowView
            currentStepId={currentStepId}
            isPresentation={mode === 'presentation'}
          />
        </SpotlightOverlay>
      </main>
    </div>
  );
}

export default App;
