import { ModularTourProject } from './types';
import { STARTER_MODULAR_TOURS } from './sampleTemplates';

const CUSTOM_TOURS_KEY = 'guide_in_custom_modular_tours_v1';

export const loadCustomTours = (): ModularTourProject[] => {
  try {
    const raw = localStorage.getItem(CUSTOM_TOURS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load custom tours from localStorage', e);
  }
  return [];
};

export const saveCustomTour = (newTour: ModularTourProject) => {
  try {
    const existing = loadCustomTours();
    const updated = [newTour, ...existing.filter((t) => t.id !== newTour.id)];
    localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save custom tour to localStorage', e);
  }
};

export const deleteCustomTour = (tourId: string) => {
  try {
    const existing = loadCustomTours();
    const updated = existing.filter((t) => t.id !== tourId);
    localStorage.setItem(CUSTOM_TOURS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to delete custom tour', e);
  }
};

export const getAllTours = (): ModularTourProject[] => {
  const custom = loadCustomTours();
  return [...custom, ...STARTER_MODULAR_TOURS];
};
