import React from 'react';
import { TRAINING_MODULES } from '../../data/stepsData';
import { ModuleId } from '../../types/workflow';
import { 
  Building2, 
  Users, 
  FileText, 
  GitFork, 
  CheckCircle, 
  PackageCheck,
  Lock,
  CheckCircle2,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface ModuleNavProps {
  activeModuleId: ModuleId;
  activeStepIndex: number;
  unlockedModules: ModuleId[];
  completedModules: ModuleId[];
  onSelectModule: (moduleId: ModuleId) => void;
  onSelectStep: (stepIndex: number) => void;
}

const MODULE_ICONS: Record<string, React.ElementType> = {
  Building2,
  Users,
  FileText,
  GitFork,
  CheckCircle,
  PackageCheck,
};

export const ModuleNavigation: React.FC<ModuleNavProps> = ({
  activeModuleId,
  activeStepIndex,
  unlockedModules,
  completedModules,
  onSelectModule,
  onSelectStep,
}) => {
  const currentModule = TRAINING_MODULES.find((m) => m.id === activeModuleId) || TRAINING_MODULES[0];

  return (
    <div className="w-full bg-slate-900/90 border-b border-slate-800 sticky top-14 z-40 backdrop-blur-md">
      {/* Level 1: Module Selector (With Lock / Unlock status) */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-slate-800/60">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          <span>Modul:</span>
        </div>

        {TRAINING_MODULES.map((mod) => {
          const isUnlocked = unlockedModules.includes(mod.id);
          const isCompleted = completedModules.includes(mod.id);
          const isActive = mod.id === activeModuleId;
          const IconComp = MODULE_ICONS[mod.iconName] || Building2;

          return (
            <button
              key={mod.id}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && onSelectModule(mod.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                !isUnlocked
                  ? 'bg-slate-950/60 border-slate-800/50 text-slate-400 cursor-not-allowed opacity-60'
                  : isActive
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm shadow-blue-500/20 ring-1 ring-blue-500/40 cursor-pointer'
                  : isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-500/50 cursor-pointer'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 cursor-pointer'
              }`}
            >
              {!isUnlocked ? (
                <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <IconComp className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              )}

              <span className="font-mono text-[11px] text-slate-400">0{mod.menuNumber}</span>
              <span>{mod.title.split(' (')[0]}</span>

              {!isUnlocked && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                  Locked
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Level 2: Sub-step Stepper for the Active Module */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
            {currentModule.code} Steps
          </span>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Step {activeStepIndex + 1} of {currentModule.steps.length}:
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {currentModule.steps.map((st, idx) => {
            const isStepActive = idx === activeStepIndex;
            const isStepPassed = idx < activeStepIndex;

            return (
              <button
                key={st.stepId}
                onClick={() => onSelectStep(idx)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition cursor-pointer whitespace-nowrap ${
                  isStepActive
                    ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                    : isStepPassed
                    ? 'bg-slate-800/80 text-emerald-400 hover:bg-slate-800'
                    : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isStepActive
                      ? 'bg-white text-blue-700'
                      : isStepPassed
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{st.title}</span>
                {idx < currentModule.steps.length - 1 && (
                  <ChevronRight className="w-3 h-3 text-slate-400 ml-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
