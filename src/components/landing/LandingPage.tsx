import React, { useState, useRef, useEffect } from 'react';
import { TRAINING_MODULES } from '../../data/stepsData';
import { ModuleId } from '../../types/workflow';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  ChevronDown,
  Sparkles,
  Play,
  Lock,
  CheckCircle2,
  Workflow,
  GraduationCap,
  AlertTriangle,
  X
} from 'lucide-react';

interface LandingPageProps {
  unlockedModules: ModuleId[];
  completedModules: ModuleId[];
  onStartWorkflow: (moduleId: ModuleId, mode: 'sandbox' | 'presentation') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  unlockedModules,
  completedModules,
  onStartWorkflow,
}) => {
  // Find the latest unlocked module as default selection
  const latestUnlocked = [...TRAINING_MODULES]
    .reverse()
    .find((m) => unlockedModules.includes(m.id))?.id || 'business-partner';

  const [selectedModule, setSelectedModule] = useState<ModuleId>(latestUnlocked);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lockedAlertMessage, setLockedAlertMessage] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeModObj = TRAINING_MODULES.find((m) => m.id === selectedModule) || TRAINING_MODULES[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectModuleItem = (modId: ModuleId) => {
    const isUnlocked = unlockedModules.includes(modId);

    if (!isUnlocked) {
      // User clicked a locked item! Trigger custom alert modal & re-select latest unlocked
      const targetMod = TRAINING_MODULES.find((m) => m.id === modId);
      setLockedAlertMessage(
        `Eits, mulai dari modul awal dulu ya kak hehe! Modul "${targetMod?.title}" masih terkunci karena Modul sebelumnya belum diselesaikan. Yuk selesaikan dulu step-nya!`
      );
      setSelectedModule(latestUnlocked);
      setIsDropdownOpen(false);
      return;
    }

    setSelectedModule(modId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative selection:bg-blue-600 selection:text-white">
      {/* Background Subtle Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-4 right-10 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Top Navbar Header */}
      <header className="max-w-6xl mx-auto w-full px-5 py-3 flex items-center justify-between relative z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight text-white flex items-center gap-2 leading-none">
              Guide.In
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Based on Datatex NOW
              </span>
            </h1>
            <p className="text-[10px] text-slate-400 mt-0.5">Modul Pelatihan Sales • Dibuat Dengan Sepenuh Hati</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-slate-300 bg-slate-900/90 border border-slate-800 px-3 py-1 rounded-xl">
          <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px]">Progress: {completedModules.length} / {TRAINING_MODULES.length} Selesai</span>
        </div>
      </header>

      {/* Hero Body - Fit 1 Viewport Screen */}
      <main className="max-w-3xl mx-auto w-full px-4 flex-1 flex flex-col justify-center text-center relative z-20 space-y-4 my-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-1.5"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Learning Path Interaktif Bertahap</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Mau Training buat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Topic apa nih?
            </span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Setiap modul memiliki alur sub-langkah lengkap sesuai User Manual resmi. Modul berikutnya terbuka bertahap setelah modul sebelumnya dikonfirmasi.
          </p>
        </motion.div>

        {/* Dropdown Container */}
        <div ref={dropdownRef} className="max-w-lg mx-auto w-full relative text-left z-30">
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            PILIH MODUL PEMBELAJARAN:
          </label>

          {/* Trigger Dropdown Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-slate-900/95 border border-slate-700 hover:border-blue-500/80 rounded-2xl p-3 flex items-center justify-between transition-all duration-200 shadow-xl group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs border shrink-0 bg-blue-600/20 text-blue-400 border-blue-500/30">
                {activeModObj.menuNumber}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-blue-400 font-mono">[{activeModObj.code}]</span>
                  <span className="text-sm font-bold text-white group-hover:text-blue-300 transition truncate">
                    {activeModObj.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{activeModObj.subtitle}</p>
              </div>
            </div>
            <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
          </button>

          {/* Dropdown Menu: High z-index with opaque background so buttons underneath don't bleed */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-2 bg-[#0b1329] border border-blue-500/40 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] p-2 z-50 max-h-56 overflow-y-auto ring-1 ring-white/10"
              >
                {TRAINING_MODULES.map((mod) => {
                  const isModUnlocked = unlockedModules.includes(mod.id);
                  const isModCompleted = completedModules.includes(mod.id);
                  const isCurrent = mod.id === selectedModule;

                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => handleSelectModuleItem(mod.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition cursor-pointer mb-1 last:mb-0 ${!isModUnlocked
                        ? 'opacity-40 hover:opacity-70 bg-slate-950/60 border border-slate-800/80'
                        : isCurrent
                          ? 'bg-blue-600/30 text-blue-200 border border-blue-500/60'
                          : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                        }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold font-mono shrink-0">
                          {!isModUnlocked ? <Lock className="w-3 h-3 text-slate-400" /> : mod.menuNumber}
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs font-bold flex items-center gap-1.5 truncate">
                            <span className="text-blue-400 font-mono">[{mod.code}]</span>
                            <span className="truncate">{mod.title}</span>
                            {isModCompleted && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                            {!isModUnlocked && (
                              <span className="text-[9px] font-mono text-amber-400/90 bg-amber-400/10 px-1 rounded">
                                Locked
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">{mod.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0 ml-2">
                        {mod.steps.length} Steps
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Launch Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3">
            <button
              onClick={() => onStartWorkflow(selectedModule, 'sandbox')}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer group text-xs sm:text-sm"
            >
              <Workflow className="w-4 h-4 text-blue-200 group-hover:scale-110 transition" />
              <span>Buka Sandbox Mode</span>
            </button>

            <button
              onClick={() => onStartWorkflow(selectedModule, 'presentation')}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer group text-xs sm:text-sm"
            >
              <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition" />
              <span>Presentation Tour</span>
            </button>
          </div>
        </div>

        {/* 6 Quick Module Badges */}
        <div className="pt-2 max-w-xl mx-auto w-full">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">STATUS 6 MODUL PENJUALAN:</p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {TRAINING_MODULES.map((m) => {
              const isU = unlockedModules.includes(m.id);
              const isC = completedModules.includes(m.id);

              return (
                <button
                  key={m.id}
                  onClick={() => handleSelectModuleItem(m.id)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition cursor-pointer flex items-center gap-1.5 ${!isU
                    ? 'bg-slate-950/60 border-slate-800/80 text-slate-400'
                    : isC
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                >
                  {!isU ? (
                    <Lock className="w-2.5 h-2.5 text-slate-400" />
                  ) : isC ? (
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                  <span>
                    0{m.menuNumber}. {m.code}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer pinned at bottom */}
      <footer className="w-full text-center py-2 text-[10px] text-slate-400 border-t border-slate-900 shrink-0 relative z-10 bg-slate-950/80 backdrop-blur-sm">
        Guide.In • Datatex NOW Interactive Learning Hub & Simulator (PT Gistex Indonesia)
      </footer>

      {/* Custom Modal Alert for Locked Modules */}
      <AnimatePresence>
        {lockedAlertMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-slate-900 border border-amber-500/50 rounded-2xl p-6 max-w-md w-full shadow-2xl shadow-amber-500/10 relative text-left space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <button
                  onClick={() => setLockedAlertMessage(null)}
                  className="text-slate-400 hover:text-white transition p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Mulai dari 0 dulu ya kak hehe 😜
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {lockedAlertMessage}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setLockedAlertMessage(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition cursor-pointer shadow-md shadow-amber-400/20"
                >
                  Siap, Paham Bre! 🚀
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
