// Local Storage persistence helper for Guide.In learning progress

import { ModuleId, AppMode } from '../types/workflow';

const STORAGE_KEY = 'guide_in_learning_progress_v1';

export interface PersistedProgress {
  unlockedModules: ModuleId[];
  completedModules: ModuleId[];
  lastActiveModuleId: ModuleId;
  lastMode: AppMode;
  lastStepIndex: number;
  lastVisitedTimestamp: number;
}

const DEFAULT_PROGRESS: PersistedProgress = {
  unlockedModules: ['business-partner'],
  completedModules: [],
  lastActiveModuleId: 'business-partner',
  lastMode: 'landing',
  lastStepIndex: 0,
  lastVisitedTimestamp: Date.now(),
};

export const loadStoredProgress = (): PersistedProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.unlockedModules)) {
      return {
        ...DEFAULT_PROGRESS,
        ...parsed,
      };
    }
  } catch (e) {
    console.warn('Failed to read learning progress from localStorage', e);
  }
  return DEFAULT_PROGRESS;
};

export const saveStoredProgress = (progress: Partial<PersistedProgress>) => {
  try {
    const current = loadStoredProgress();
    const updated: PersistedProgress = {
      ...current,
      ...progress,
      lastVisitedTimestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save learning progress to localStorage', e);
  }
};
