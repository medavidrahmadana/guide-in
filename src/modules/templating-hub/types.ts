// Modular Interactive Step Widget Types for Guide.In Walkthrough Engine

export type StepWidgetType = 
  | 'search-dropdown'     // Auto-typing search bar with dropdown hover (ala Process Finder)
  | 'form-tabs'           // Form headers with multiple tabs & mandatory (*) field highlight
  | 'terminal-cli'        // Console terminal with animated command runner & log stream
  | 'wizard-checklist'    // System requirement checklist with auto-checks & license agreement
  | 'progress-extractor'  // Progress bar simulating component extract / file download
  | 'dialog-modal';       // Spotlight popup modal confirmation dialog

export interface StepWidgetPayload {
  // For 'search-dropdown'
  searchQuery?: string;
  dropdownOptions?: string[];
  activeOptionIndex?: number;

  // For 'form-tabs'
  formTabs?: string[];
  activeFormTab?: string;
  mandatoryFields?: string[];
  sampleEntityName?: string;

  // For 'terminal-cli'
  commandString?: string;
  terminalOutputLog?: string;

  // For 'wizard-checklist'
  checklistItems?: string[];
  licenseText?: string;

  // For 'progress-extractor'
  progressLabel?: string;
  targetPercent?: number;

  // For 'dialog-modal'
  modalTitle?: string;
  modalMessage?: string;
  confirmBtnText?: string;
}

export interface ModularStepConfig {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  instructionBubble: string;
  widgetType: StepWidgetType;
  widgetData: StepWidgetPayload;
  tips?: string[];
}

export interface ModularTourProject {
  id: string;
  title: string;
  subtitle: string;
  themeColor: 'blue' | 'emerald' | 'indigo' | 'amber' | 'rose' | 'purple';
  isCustomUserCreated?: boolean;
  steps: ModularStepConfig[];
}
