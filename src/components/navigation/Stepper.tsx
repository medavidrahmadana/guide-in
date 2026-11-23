import React from 'react';
import { WORKFLOW_STEPS } from '../../data/stepsData';
import { WorkflowStepId } from '../../types/workflow';
import { CheckCircle2, Circle } from 'lucide-react';

interface StepperProps {
  currentStepId: WorkflowStepId;
  onSelectStep: (id: WorkflowStepId) => void;
  completedSteps?: WorkflowStepId[];
}

export const Stepper: React.FC<StepperProps> = ({
  currentStepId,
  onSelectStep,
  completedSteps = [],
}) => {
  const currentIndex = WORKFLOW_STEPS.findIndex((s) => s.id === currentStepId);

  return (
    <nav className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto scrollbar-none py-1 gap-2 sm:gap-4">
        {WORKFLOW_STEPS.map((step, idx) => {
          const isActive = step.id === currentStepId;
          const isCompleted = completedSteps.includes(step.id);
          const isPassed = idx < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onSelectStep(step.id)}
              className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 border cursor-pointer ${
                isActive
                  ? 'bg-blue-600/15 border-blue-500 text-blue-400 shadow-sm shadow-blue-500/20 ring-1 ring-blue-500/50'
                  : isCompleted || isPassed
                  ? 'bg-slate-800/60 border-slate-700/80 text-emerald-400 hover:border-slate-600 hover:bg-slate-800'
                  : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : isCompleted || isPassed
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : 'bg-slate-800 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span>{step.stepNumber}</span>
                )}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 leading-none">
                  {step.code}
                </span>
                <span className="leading-tight mt-0.5">{step.title.split(' (')[0]}</span>
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
