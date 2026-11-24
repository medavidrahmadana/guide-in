import React, { useState, useEffect } from 'react';
import { StepWidgetType, StepWidgetPayload } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Building2, 
  Terminal, 
  CheckCircle2, 
  FolderOpen, 
  Sparkles, 
  HelpCircle, 
  AlertCircle,
  Play,
  RotateCcw,
  Check,
  ShieldCheck,
  PlusCircle,
  Layers
} from 'lucide-react';

interface WidgetRendererProps {
  widgetType: StepWidgetType;
  widgetData: StepWidgetPayload;
  themeColor: string;
  onActionComplete?: () => void;
}

export const DynamicStepWidgetRenderer: React.FC<WidgetRendererProps> = ({
  widgetType,
  widgetData,
  themeColor,
  onActionComplete,
}) => {
  // 1. STATE FOR 'search-dropdown'
  const targetSearch = widgetData.searchQuery || 'Analytics Dashboard';
  const [typedText, setTypedText] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (widgetType !== 'search-dropdown') return;
    setTypedText('');
    setShowDropdown(false);
    let idx = 0;
    const interval = setInterval(() => {
      if (idx < targetSearch.length) {
        setTypedText(targetSearch.slice(0, idx + 1));
        idx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowDropdown(true), 300);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [widgetType, targetSearch]);

  // 2. STATE FOR 'form-tabs'
  const tabs = widgetData.formTabs && widgetData.formTabs.length > 0 
    ? widgetData.formTabs 
    : ['Base', 'Detail', 'Address', 'Contact'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  // 3. STATE FOR 'terminal-cli'
  const [cliExecuted, setCliExecuted] = useState(false);

  // 4. STATE FOR 'wizard-checklist'
  const [licenseAgreed, setLicenseAgreed] = useState(false);

  // 5. STATE FOR 'progress-extractor'
  const [progressVal, setProgressVal] = useState(0);
  useEffect(() => {
    if (widgetType !== 'progress-extractor') return;
    setProgressVal(0);
    const interval = setInterval(() => {
      setProgressVal((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
    return () => clearInterval(interval);
  }, [widgetType]);

  // 6. STATE FOR 'dialog-modal'
  const [modalConfirmed, setModalConfirmed] = useState(false);

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-left relative min-h-[340px] flex flex-col justify-between">
      {/* Universal Top Window Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="font-mono text-slate-400 text-[11px] ml-1">
            Guide.In Interactive Canvas [Widget: {widgetType.toUpperCase()}]
          </span>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
          ● Live Active
        </span>
      </div>

      {/* DYNAMIC COMPONENT CANVAS AREA */}
      <div className="p-6 flex-1 flex flex-col justify-center">
        {/* ======================================================== */}
        {/* WIDGET 1: SEARCH & AUTOTYPE + DROPDOWN */}
        {/* ======================================================== */}
        {widgetType === 'search-dropdown' && (
          <div className="max-w-xl mx-auto w-full space-y-4 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Simulasi Command Palette / Search Finder
            </div>

            <div className="relative">
              <div className="flex items-center gap-3 bg-slate-900 border border-blue-500/60 rounded-2xl px-4 py-3 shadow-xl">
                <Search className="w-4 h-4 text-blue-400 shrink-0" />
                <div className="flex items-center w-full font-mono text-sm font-semibold text-white">
                  <span>{typedText}</span>
                  <span className="w-2 h-4 bg-blue-400 ml-0.5 animate-pulse inline-block" />
                </div>
                {showDropdown && (
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">
                    Enter ↵
                  </span>
                )}
              </div>

              {/* Dynamic Popup Dropdown */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 right-0 top-full mt-2 bg-[#0b1329] border border-blue-500/50 rounded-2xl shadow-2xl p-2 z-40 text-left space-y-1"
                  >
                    {(widgetData.dropdownOptions || [
                      targetSearch,
                      `${targetSearch} Settings & Rules`,
                      'Advanced Search...',
                    ]).map((opt, i) => (
                      <div
                        key={i}
                        className={`p-2.5 rounded-xl flex items-center justify-between text-xs cursor-pointer transition ${
                          i === (widgetData.activeOptionIndex || 0)
                            ? 'bg-blue-600/30 text-blue-200 border border-blue-500/60 font-bold'
                            : 'hover:bg-slate-800 text-slate-400'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-blue-400" />
                          <span>{opt}</span>
                        </div>
                        {i === 0 && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500 text-white font-extrabold">
                            SELECT
                          </span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-[11px] text-slate-400">
              💡 Widget ini menstimulasikan pencarian real-time dengan animasi mengetik otomatis dan pemilihan dropdown.
            </p>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 2: FORM HEADERS WITH TABS & MANDATORY (*) */}
        {/* ======================================================== */}
        {widgetType === 'form-tabs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                {tabs.map((tb) => (
                  <button
                    key={tb}
                    onClick={() => setActiveTab(tb)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                      activeTab === tb
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {tb}
                  </button>
                ))}
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                * Kolom Mandatory
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-blue-500/60">
                <label className="text-[10px] text-blue-300 font-bold flex items-center gap-1 uppercase">
                  <span className="text-red-400">*</span> Legal / Entity Name (Mandatory)
                </label>
                <div className="font-bold text-white mt-1">
                  {widgetData.sampleEntityName || 'PT. Bojongsantos Industry'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <label className="text-[10px] text-slate-400 uppercase font-mono">Reference Code</label>
                <div className="font-semibold text-slate-300 mt-1 font-mono">REF-889201</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-blue-500/60">
                <label className="text-[10px] text-blue-300 font-bold flex items-center gap-1 uppercase">
                  <span className="text-red-400">*</span> Fiscal Type (Mandatory)
                </label>
                <div className="font-semibold text-emerald-400 mt-1">01 - Standar PKP</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <label className="text-[10px] text-slate-400 uppercase font-mono">Country Region</label>
                <div className="font-semibold text-slate-300 mt-1">ID - INDONESIA</div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 3: TERMINAL CLI SIMULATOR */}
        {/* ======================================================== */}
        {widgetType === 'terminal-cli' && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-3">
            <div className="text-slate-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>bash console • guidein-user@localhost:~</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-indigo-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="font-bold">{widgetData.commandString || 'npm run dev'}</span>
              </div>
              <button
                onClick={() => setCliExecuted(true)}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] cursor-pointer shadow transition"
              >
                {cliExecuted ? 'Executed ✔' : 'Run ↵'}
              </button>
            </div>

            <div className="text-slate-400 text-[11px] space-y-1">
              <div>Output Console Log:</div>
              <div className="text-emerald-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                {cliExecuted ? (
                  <div>
                    ✓ {widgetData.terminalOutputLog || 'Ready in 230ms. Server running at http://localhost:5173/'}
                  </div>
                ) : (
                  <span className="text-slate-500">Klik tombol "Run" atau tombol Next untuk mengeksekusi perintah.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 4: WIZARD CHECKLIST & LICENSE */}
        {/* ======================================================== */}
        {widgetType === 'wizard-checklist' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm">System Requirements & Agreement</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              {(widgetData.checklistItems || [
                'Sistem Operasi Kompatibel (Windows 11 / Linux)',
                'Minimal 4GB Free Storage Space',
                'Koneksi Jaringan Lokal Aktif',
              ]).map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={licenseAgreed}
                onChange={(e) => setLicenseAgreed(e.target.checked)}
                className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
              />
              <span className={licenseAgreed ? 'text-emerald-400 font-bold' : ''}>
                {widgetData.licenseText || 'Saya telah menyetujui syarat & ketentuan pengoperasian modul.'}
              </span>
            </label>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 5: PROGRESS EXTRACTOR BAR */}
        {/* ======================================================== */}
        {widgetType === 'progress-extractor' && (
          <div className="space-y-4 max-w-md mx-auto w-full text-center">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-white text-sm">
                {widgetData.progressLabel || 'Extracting Package Files & Assets...'}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono">
                C:\Program Files\App\assets\bundle-{progressVal}.bin
              </p>
            </div>

            <div className="w-full bg-slate-900 border border-slate-800 rounded-full h-3 p-0.5 overflow-hidden">
              <motion.div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${progressVal}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Status: Processing</span>
              <span className="text-emerald-400 font-bold">{progressVal}% Complete</span>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* WIDGET 6: DIALOG MODAL / CONFIRMATION BOX */}
        {/* ======================================================== */}
        {widgetType === 'dialog-modal' && (
          <div className="max-w-md mx-auto w-full bg-slate-900 border border-amber-500/40 rounded-2xl p-5 shadow-2xl text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-sm">
              {widgetData.modalTitle || 'Konfirmasi Tindakan Alur'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {widgetData.modalMessage || 'Apakah seluruh parameter konfigurasi sudah sesuai dengan panduan?'}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setModalConfirmed(true)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow ${
                  modalConfirmed
                    ? 'bg-emerald-500 text-slate-950 font-black'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 cursor-pointer'
                }`}
              >
                {modalConfirmed ? 'Dikonfirmasi ✔' : (widgetData.confirmBtnText || 'Saya Paham & Lanjut')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Widget Footer Info */}
      <div className="bg-slate-900/60 border-t border-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400">
        <span>Component: {widgetType}</span>
        <span className="text-slate-300 font-mono">Guide.In Interactive Engine</span>
      </div>
    </div>
  );
};
