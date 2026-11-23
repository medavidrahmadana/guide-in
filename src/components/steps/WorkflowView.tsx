import React from 'react';
import { TRAINING_MODULES } from '../../data/stepsData';
import { ModuleId } from '../../types/workflow';
import { ModuleBPInteractive } from './ModuleBPInteractive';
import { ModuleLockedPlaceholder } from './ModuleLockedPlaceholder';
import { Users, FileText, GitFork, CheckCircle, PackageCheck, AlertCircle } from 'lucide-react';

interface WorkflowViewProps {
  activeModuleId: ModuleId;
  activeStepIndex: number;
  unlockedModules: ModuleId[];
  isPresentation?: boolean;
  onStepChange: (index: number) => void;
  onSelectModule: (moduleId: ModuleId) => void;
  onCompleteModule: (moduleId: ModuleId) => void;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({
  activeModuleId,
  activeStepIndex,
  unlockedModules,
  isPresentation,
  onStepChange,
  onSelectModule,
  onCompleteModule,
}) => {
  const currentModuleIndex = TRAINING_MODULES.findIndex((m) => m.id === activeModuleId);
  const currentModule = TRAINING_MODULES[currentModuleIndex] || TRAINING_MODULES[0];
  const isUnlocked = unlockedModules.includes(activeModuleId);
  const previousModule = currentModuleIndex > 0 ? TRAINING_MODULES[currentModuleIndex - 1] : TRAINING_MODULES[0];

  // If module is locked, show educational lock screen
  if (!isUnlocked) {
    return (
      <ModuleLockedPlaceholder
        module={currentModule}
        previousModule={previousModule}
        isUnlocked={isUnlocked}
        onGoToPrevious={() => onSelectModule(previousModule.id)}
      />
    );
  }

  // Active module is Business Partner (Module 1)
  if (activeModuleId === 'business-partner') {
    return (
      <ModuleBPInteractive
        module={currentModule}
        activeStepIndex={activeStepIndex}
        isPresentation={isPresentation}
        onStepChange={onStepChange}
        onCompleteModule={() => onCompleteModule('business-partner')}
      />
    );
  }

  // Module 2 s/d 6 (When unlocked)
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center mx-auto shadow-xl">
          <Users className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
          ✔ MODUL TERBUKA (UNLOCKED)
        </div>
        <h2 className="text-2xl font-black text-white">
          Modul {currentModule.menuNumber}: {currentModule.title}
        </h2>
        <p className="text-sm text-slate-400 max-w-xl mx-auto">
          {currentModule.description}
        </p>
        <p className="text-xs text-slate-400 font-mono">
          Ref Dokumen: {currentModule.pdfDocRef}
        </p>

        <div className="pt-4 border-t border-slate-800 flex justify-center gap-3">
          <button
            onClick={() => onCompleteModule(activeModuleId)}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition cursor-pointer"
          >
            Selesaikan Modul & Buka Modul Berikutnya →
          </button>
        </div>
      </div>
    </div>
  );
};
