// Datatex NOW Learning Architecture: Modules & Multi-step Structure

export type ModuleId = 
  | 'business-partner'
  | 'order-partner'
  | 'open-order'
  | 'order-evolution'
  | 'confirm-order'
  | 'stock-picking';

export type AppMode = 'landing' | 'sandbox' | 'presentation';

export interface ModuleStep {
  stepId: string;
  stepNumber: number;
  title: string;
  cueCardName?: string; // e.g. "Process Finder", "Cue Card Base", "Address", "Contact Book", "Delivery Point"
  summary: string;
  requiredFields?: string[];
  tips: string[];
  presentationNarrative: string;
}

export interface TrainingModule {
  id: ModuleId;
  menuNumber: number;
  code: string; // "BP", "OP", "120", "EVO", "001", "DOC 09/11"
  title: string;
  subtitle: string;
  iconName: string;
  pdfDocRef: string;
  description: string;
  steps: ModuleStep[];
}

export interface UserLearningProgress {
  unlockedModules: ModuleId[];
  completedModules: ModuleId[];
  moduleStepProgress: Record<ModuleId, {
    currentStepIndex: number;
    completedStepIds: string[];
    isModuleConfirmed: boolean;
  }>;
}
