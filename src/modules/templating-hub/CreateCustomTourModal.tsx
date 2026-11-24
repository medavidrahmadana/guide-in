import React, { useState } from 'react';
import { ModularTourProject, ModularStepConfig, StepWidgetType } from './types';
import { DynamicStepWidgetRenderer } from './DynamicStepWidgetRenderer';
import { 
  X, 
  Plus, 
  Trash2, 
  Eye, 
  Save, 
  Sparkles, 
  Layers, 
  Search, 
  Building2, 
  Terminal, 
  CheckCircle2, 
  FolderOpen, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';

interface CustomTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTour: (tour: ModularTourProject) => void;
}

const WIDGET_OPTIONS: { type: StepWidgetType; label: string; icon: any; desc: string }[] = [
  {
    type: 'search-dropdown',
    label: 'Search Bar & Dropdown Auto-type',
    icon: Search,
    desc: 'Simulasi kotak pencarian dengan animasi ngetik otomatis dan popup dropdown'
  },
  {
    type: 'form-tabs',
    label: 'Form Headers & Tabs Cue Card',
    icon: Building2,
    desc: 'Mockup form bisnis dengan multi-tab dan penandaan mandatory (*)'
  },
  {
    type: 'terminal-cli',
    label: 'Terminal / CLI Console',
    icon: Terminal,
    desc: 'Simulasi console hitam dengan perintah shell yang dapat dieksekusi'
  },
  {
    type: 'wizard-checklist',
    label: 'Checklist Requirements & License',
    icon: CheckCircle2,
    desc: 'Daftar centang prasyarat sistem operasi dan checkbox persetujuan syarat'
  },
  {
    type: 'progress-extractor',
    label: 'Progress Bar / File Extractor',
    icon: FolderOpen,
    desc: 'Animasi progress bar instalasi / download komponen paket'
  },
  {
    type: 'dialog-modal',
    label: 'Popup Dialog & Confirmation',
    icon: HelpCircle,
    desc: 'Kotak dialog konfirmasi pemahaman user sebelum rilis'
  }
];

export const CreateCustomTourModal: React.FC<CustomTourModalProps> = ({
  isOpen,
  onClose,
  onSaveTour,
}) => {
  const [tourTitle, setTourTitle] = useState('My Custom Guided Tour');
  const [tourSubtitle, setTourSubtitle] = useState('Panduan langkah interaktif buatan sendiri');
  const [themeColor, setThemeColor] = useState<'blue' | 'emerald' | 'indigo' | 'amber'>('emerald');

  // Modular steps array created by user
  const [steps, setSteps] = useState<ModularStepConfig[]>([
    {
      id: 'step-1',
      stepNumber: 1,
      title: 'Pencarian Fitur Utama',
      subtitle: 'Gunakan command palette',
      instructionBubble: 'Ketik modul yang ingin dicari di command search bar.',
      widgetType: 'search-dropdown',
      widgetData: {
        searchQuery: 'Master Customer Data',
        dropdownOptions: ['Master Customer Data', 'Customer Invoices', 'Customer Credit Limit'],
      },
      tips: ['Tekan Enter untuk memilih opsi teratas.']
    },
    {
      id: 'step-2',
      stepNumber: 2,
      title: 'Lengkapi Data Form',
      subtitle: 'Pengisian data legal rekanan',
      instructionBubble: 'Perhatikan kolom mandatory bertanda bintang merah (*).',
      widgetType: 'form-tabs',
      widgetData: {
        formTabs: ['Base', 'Detail', 'Finance'],
        sampleEntityName: 'PT. Custom Solusi Digital',
      },
      tips: ['Data legalitas wajib valid.']
    }
  ]);

  // Preview index currently being inspected
  const [previewStepIdx, setPreviewStepIdx] = useState(0);
  const [showLivePreviewSplit, setShowLivePreviewSplit] = useState(true);

  if (!isOpen) return null;

  const handleAddStep = () => {
    const nextNum = steps.length + 1;
    const newStep: ModularStepConfig = {
      id: `step-${Date.now()}`,
      stepNumber: nextNum,
      title: `Langkah ${nextNum}: Baru`,
      subtitle: 'Sub-judul langkah panduan',
      instructionBubble: 'Ikuti instruksi yang ditampilkan pada layar.',
      widgetType: 'wizard-checklist',
      widgetData: {
        checklistItems: ['Syarat 1 Terpenuhi', 'Syarat 2 Terpenuhi'],
      },
      tips: ['Tips penting langkah ini.']
    };
    setSteps([...steps, newStep]);
    setPreviewStepIdx(steps.length);
  };

  const handleRemoveStep = (idx: number) => {
    if (steps.length <= 1) return;
    const updated = steps.filter((_, i) => i !== idx).map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setSteps(updated);
    setPreviewStepIdx(Math.max(0, previewStepIdx - 1));
  };

  const handleUpdateStep = (idx: number, patch: Partial<ModularStepConfig>) => {
    const updated = [...steps];
    updated[idx] = { ...updated[idx], ...patch };
    setSteps(updated);
  };

  const handleSave = () => {
    if (!tourTitle.trim()) return;

    const newProject: ModularTourProject = {
      id: `custom-tour-${Date.now()}`,
      title: tourTitle,
      subtitle: tourSubtitle,
      themeColor,
      isCustomUserCreated: true,
      steps,
    };

    onSaveTour(newProject);
    onClose();
  };

  const activePreviewStep = steps[previewStepIdx] || steps[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md">
      <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-6xl w-full h-[90vh] shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Modal Top Header */}
        <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>Interactive Tour Builder Studio</span>
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  No-Code Modular
                </span>
              </h3>
              <p className="text-xs text-slate-400">Rakit alur tour-mu sendiri dengan memilih komponen interaktif per langkah</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLivePreviewSplit(!showLivePreviewSplit)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white border border-slate-700 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>{showLivePreviewSplit ? 'Sembunyikan Preview' : 'Tampilkan Split Preview'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split between Step Editor & Live Preview */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
          {/* LEFT: STEP CONFIGURATOR */}
          <div className="p-5 overflow-y-auto space-y-5 text-left text-xs">
            {/* Tour Meta: Title, Subtitle, Theme */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                1. Info Dasar Tour
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Judul Panduan / Tour:</label>
                  <input
                    type="text"
                    value={tourTitle}
                    onChange={(e) => setTourTitle(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] text-slate-400 font-semibold">Warna Tema Spotlight:</label>
                  <select
                    value={themeColor}
                    onChange={(e: any) => setThemeColor(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                  >
                    <option value="emerald">Emerald Green</option>
                    <option value="blue">Blue Datatex</option>
                    <option value="indigo">Indigo Tech</option>
                    <option value="amber">Amber Warm</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Steps List Editor */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold text-slate-300 text-xs uppercase tracking-wider">
                  2. Susunan Langkah & Pilihan Komponen Interaktif ({steps.length} Steps)
                </div>
                <button
                  onClick={handleAddStep}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer shadow transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Step Baru</span>
                </button>
              </div>

              {/* Steps Accordion */}
              <div className="space-y-3">
                {steps.map((st, idx) => (
                  <div
                    key={st.id}
                    onClick={() => setPreviewStepIdx(idx)}
                    className={`p-4 rounded-2xl border transition cursor-pointer space-y-3 ${
                      idx === previewStepIdx
                        ? 'bg-slate-950 border-emerald-500/70 ring-1 ring-emerald-500/30'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold flex items-center justify-center text-xs">
                          {st.stepNumber}
                        </span>
                        <input
                          type="text"
                          value={st.title}
                          onChange={(e) => handleUpdateStep(idx, { title: e.target.value })}
                          className="bg-transparent font-bold text-white text-xs focus:outline-none border-b border-transparent focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveStep(idx);
                          }}
                          disabled={steps.length <= 1}
                          className="text-slate-500 hover:text-red-400 p-1 disabled:opacity-30 cursor-pointer"
                          title="Hapus step ini"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Step Widget Type Selector: THE STAR FEATURE! */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                        Komponen Interaktif Step Ini:
                      </label>
                      <select
                        value={st.widgetType}
                        onChange={(e: any) => handleUpdateStep(idx, { widgetType: e.target.value })}
                        className="w-full bg-slate-900 border border-emerald-500/40 rounded-xl px-3 py-1.5 text-white font-semibold"
                      >
                        {WIDGET_OPTIONS.map((w) => (
                          <option key={w.type} value={w.type}>
                            {w.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Instruction Speech Bubble */}
                    <div className="space-y-1">
                      <label className="text-[10px] text-slate-400">Instruksi Speech Bubble Pengguna:</label>
                      <textarea
                        rows={2}
                        value={st.instructionBubble}
                        onChange={(e) => handleUpdateStep(idx, { instructionBubble: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-slate-200 resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: REAL-TIME LIVE PREVIEW OF SELECTED STEP */}
          <div className="p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">
                    Live Simulator Preview (Step {previewStepIdx + 1} of {steps.length})
                  </span>
                </div>
                <div className="flex gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPreviewStepIdx(i)}
                      className={`w-6 h-6 rounded-lg text-[10px] font-bold font-mono transition cursor-pointer ${
                        i === previewStepIdx
                          ? 'bg-emerald-500 text-slate-950 font-black'
                          : 'bg-slate-900 text-slate-400 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Speech Bubble Preview */}
              <div className="p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-200 text-xs shadow-lg space-y-1 text-left">
                <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{activePreviewStep.title}</span>
                </div>
                <p className="leading-relaxed">"{activePreviewStep.instructionBubble}"</p>
              </div>

              {/* Dynamic Interactive Render */}
              <div className="pt-2">
                <DynamicStepWidgetRenderer
                  widgetType={activePreviewStep.widgetType}
                  widgetData={activePreviewStep.widgetData}
                  themeColor={themeColor}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Preview di-update real-time setiap kamu edit field</span>
              <span className="text-emerald-400 font-mono">Status: Ready to Save</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Bar */}
        <div className="bg-slate-950 border-t border-slate-800 px-6 py-3.5 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
          >
            Batal
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl text-xs font-black bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-lg shadow-emerald-400/25 transition cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Simpan & Tampilkan di Galeri Tour 🚀</span>
          </button>
        </div>
      </div>
    </div>
  );
};
