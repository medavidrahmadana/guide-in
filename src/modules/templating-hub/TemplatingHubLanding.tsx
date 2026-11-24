import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModularTourProject } from './types';
import { getAllTours, saveCustomTour, deleteCustomTour } from './customToursStorage';
import { DynamicStepWidgetRenderer } from './DynamicStepWidgetRenderer';
import { CreateCustomTourModal } from './CreateCustomTourModal';
import { 
  Layers, 
  ArrowLeft, 
  Sparkles, 
  Play, 
  Laptop, 
  Terminal, 
  FileCode2, 
  CheckCircle2, 
  RotateCcw,
  Plus,
  Trash2,
  Sliders,
  ChevronRight,
  ExternalLink,
  Building2
} from 'lucide-react';

interface TemplateHubProps {
  onBackToGlobalLanding: () => void;
}

export const TemplatingHubLanding: React.FC<TemplateHubProps> = ({ onBackToGlobalLanding }) => {
  const [toursList, setToursList] = useState<ModularTourProject[]>(() => getAllTours());
  const [selectedTour, setSelectedTour] = useState<ModularTourProject>(() => toursList[0]);
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  // Modal create tour state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync when toursList changes
  useEffect(() => {
    const all = getAllTours();
    setToursList(all);
    if (!selectedTour || !all.some((t) => t.id === selectedTour.id)) {
      setSelectedTour(all[0]);
      setActiveStepIdx(0);
    }
  }, []);

  const handleSelectTour = (tour: ModularTourProject) => {
    setSelectedTour(tour);
    setActiveStepIdx(0);
  };

  const handleSaveNewTour = (newTour: ModularTourProject) => {
    saveCustomTour(newTour);
    const updated = getAllTours();
    setToursList(updated);
    setSelectedTour(newTour);
    setActiveStepIdx(0);
  };

  const handleDeleteTour = (tourId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Yakin ingin menghapus template custom ini?')) {
      deleteCustomTour(tourId);
      const updated = getAllTours();
      setToursList(updated);
      setSelectedTour(updated[0]);
      setActiveStepIdx(0);
    }
  };

  const handleNextStep = () => {
    if (activeStepIdx < selectedTour.steps.length - 1) {
      setActiveStepIdx((s) => s + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIdx > 0) {
      setActiveStepIdx((s) => s - 1);
    }
  };

  const currentStep = selectedTour.steps[activeStepIdx] || selectedTour.steps[0];

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative selection:bg-emerald-500 selection:text-slate-950">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[300px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Navbar */}
      <header className="max-w-7xl mx-auto w-full px-5 py-3 flex items-center justify-between relative z-20 shrink-0 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToGlobalLanding}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Hub Utama</span>
          </button>

          <div className="h-4 w-[1px] bg-slate-800" />

          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2 leading-none">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Guide.In Studio & Template Hub</span>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Interactive Modular Engine
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Pilih atau bangun template panduan langkah interaktif sesuai kebutuhanmu</p>
          </div>
        </div>

        {/* Create Tour Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-lg shadow-emerald-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>+ Buat Template Baru</span>
        </button>
      </header>

      {/* Main Interactive Stage */}
      <main className="max-w-7xl mx-auto w-full px-4 flex-1 flex flex-col justify-center my-auto py-3 relative z-20">
        {/* Template Selector Pills (With Custom Template Badges & Delete Button) */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">
              Koleksi Template:
            </span>

            {toursList.map((t) => {
              const isSelected = t.id === selectedTour.id;
              return (
                <div
                  key={t.id}
                  onClick={() => handleSelectTour(t)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition border cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/40 shadow'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{t.title}</span>
                  <span className="text-[9px] font-mono bg-slate-800 px-1.5 py-0.2 rounded text-slate-400">
                    {t.steps.length} Steps
                  </span>

                  {t.isCustomUserCreated && (
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-400 px-1 rounded border border-emerald-500/30">
                      User
                    </span>
                  )}

                  {t.isCustomUserCreated && (
                    <button
                      onClick={(e) => handleDeleteTour(t.id, e)}
                      title="Hapus template ini"
                      className="text-slate-500 hover:text-red-400 p-0.5 ml-1 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setActiveStepIdx(0)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart Tour</span>
          </button>
        </div>

        {/* 2-Column Split: Left Speech Prompter & Right Interactive Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
          {/* Left Column: Step Guide & Navigation Prompter */}
          <div className="space-y-4">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  STEP {activeStepIdx + 1} OF {selectedTour.steps.length}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase">
                  Widget: {currentStep.widgetType}
                </span>
              </div>

              <h3 className="text-base font-black text-white">
                {currentStep.title}
              </h3>
              <p className="text-xs text-slate-400">
                {currentStep.subtitle}
              </p>

              {/* Dynamic Speech Bubble */}
              <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs shadow-lg space-y-1.5 text-left">
                <div className="font-bold flex items-center gap-1 text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instruksi Langkah:</span>
                </div>
                <p className="leading-relaxed font-medium">
                  "{currentStep.instructionBubble}"
                </p>
              </div>

              {currentStep.tips && currentStep.tips.length > 0 && (
                <div className="text-[11px] text-slate-400 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-left">
                  💡 <strong>Tips:</strong> {currentStep.tips[0]}
                </div>
              )}
            </div>

            {/* Stepper Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handlePrevStep}
                disabled={activeStepIdx === 0}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                ← Sebelumnya
              </button>

              <div className="flex items-center gap-1.5">
                {selectedTour.steps.map((st, i) => (
                  <div
                    key={st.id}
                    onClick={() => setActiveStepIdx(i)}
                    className={`h-2 rounded-full cursor-pointer transition-all ${
                      i === activeStepIdx
                        ? 'w-6 bg-emerald-400'
                        : i < activeStepIdx
                        ? 'w-2 bg-emerald-600'
                        : 'w-2 bg-slate-800'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextStep}
                disabled={activeStepIdx === selectedTour.steps.length - 1}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-md shadow-emerald-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <span>{activeStepIdx === selectedTour.steps.length - 1 ? 'Tour Selesai ✔' : 'Langkah Selanjutnya →'}</span>
              </button>
            </div>
          </div>

          {/* Right Column (2 Cols): Dynamic Modular Widget Renderer */}
          <div className="lg:col-span-2">
            <DynamicStepWidgetRenderer
              key={`${selectedTour.id}-${activeStepIdx}`}
              widgetType={currentStep.widgetType}
              widgetData={currentStep.widgetData}
              themeColor={selectedTour.themeColor}
              onActionComplete={handleNextStep}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-2 text-[10px] text-slate-400 border-t border-slate-900 shrink-0 relative z-10 bg-slate-950/80 backdrop-blur-sm">
        Guide.In Studio • Interactive Tour & Simulator Engine (No-Code Modular Framework)
      </footer>

      {/* Modal Create Tour */}
      <CreateCustomTourModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveTour={handleSaveNewTour}
      />
    </div>
  );
};
