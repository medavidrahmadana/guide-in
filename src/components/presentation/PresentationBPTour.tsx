import React, { useState, useEffect } from 'react';
import { TrainingModule } from '../../types/workflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  PlusCircle, 
  Building2, 
  MapPin, 
  UserCheck, 
  Truck, 
  Save, 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ListOrdered, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CornerDownLeft,
  X
} from 'lucide-react';

interface PresentationBPTourProps {
  module: TrainingModule;
  onExitPresentation: () => void;
  onCompleteAndUnlockNext: () => void;
}

export const PresentationBPTour: React.FC<PresentationBPTourProps> = ({
  module,
  onExitPresentation,
  onCompleteAndUnlockNext,
}) => {
  // Current active step (0 to 5)
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  // Micro frame sequence within current step (for step 0: 0=prompt search, 1=typing, 2=dropdown result, 3=click new)
  const [microFrame, setMicroFrame] = useState(0);

  // Search input typing animation state for Step 0
  const [searchText, setSearchText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // End of Tour Modal Confirmation States
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completionStepChoice, setCompletionStepChoice] = useState<'main' | 'pick_step' | 'confirm_yes'>('main');

  // Total steps in Business Partner
  const totalSteps = module.steps.length;

  // Handle keyboard navigation (Space, ArrowRight, ArrowLeft, Enter)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't capture keyboard if modal is open
      if (showCompletionModal) return;

      if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault();
        handleNextMicroOrStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, microFrame, showCompletionModal]);

  // Handle typing effect for Step 0 (Process Finder)
  useEffect(() => {
    if (currentStepIndex === 0 && microFrame === 1) {
      setIsTyping(true);
      setSearchText('');
      const target = 'Business Partner';
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < target.length) {
          setSearchText(target.slice(0, idx + 1));
          idx++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          // Advance to dropdown selection frame automatically
          setTimeout(() => {
            setMicroFrame(2);
          }, 350);
        }
      }, 70);

      return () => clearInterval(interval);
    }
  }, [currentStepIndex, microFrame]);

  // Step advancement logic
  const handleNextMicroOrStep = () => {
    if (currentStepIndex === 0) {
      if (microFrame === 0) {
        setMicroFrame(1); // Start auto-typing
      } else if (microFrame === 1) {
        // Still typing or wait for auto advance
      } else if (microFrame === 2) {
        setMicroFrame(3); // Highlight '+ New Partner' button
      } else if (microFrame === 3) {
        // Move to Step 1 (Cue Card Base)
        setCurrentStepIndex(1);
        setMicroFrame(0);
      }
    } else if (currentStepIndex < totalSteps - 1) {
      // Steps 1 to 4: Advance to next step
      setCurrentStepIndex((prev) => prev + 1);
      setMicroFrame(0);
    } else {
      // Last Step reached (Step 5: Save & BP ID generated)! Show completion confirmation modal
      setShowCompletionModal(true);
      setCompletionStepChoice('main');
    }
  };

  const handlePrev = () => {
    if (currentStepIndex === 0) {
      if (microFrame > 0) setMicroFrame((prev) => prev - 1);
    } else {
      setCurrentStepIndex((prev) => prev - 1);
      setMicroFrame(0);
    }
  };

  // Jump to specific step from modal
  const handleJumpToStep = (stepIdx: number) => {
    setShowCompletionModal(false);
    setCompletionStepChoice('main');
    setCurrentStepIndex(stepIdx);
    setMicroFrame(0);
    if (stepIdx === 0) setSearchText('');
  };

  return (
    <div className="relative min-h-[calc(100vh-60px)] bg-slate-950 text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {/* Background Cinematic Spotlight & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.12),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Presentation Status Header Bar */}
      <div className="w-full bg-slate-900/90 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between z-30 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400 font-mono">
              Presentation Tour • Modul 01: Business Partner
            </span>
          </div>
          <span className="text-xs text-slate-400 hidden md:inline">
            Ref: {module.pdfDocRef}
          </span>
        </div>

        {/* Step dots indicator */}
        <div className="flex items-center gap-1.5">
          {module.steps.map((st, i) => (
            <div
              key={st.stepId}
              onClick={() => {
                setCurrentStepIndex(i);
                setMicroFrame(0);
              }}
              title={st.title}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                i === currentStepIndex
                  ? 'w-7 bg-amber-400 shadow-md shadow-amber-400/50'
                  : i < currentStepIndex
                  ? 'w-2.5 bg-emerald-400'
                  : 'w-2 bg-slate-800'
              }`}
            />
          ))}
          <span className="text-xs font-mono text-slate-400 ml-2">
            Step {currentStepIndex + 1}/{totalSteps}
          </span>
        </div>

        <button
          onClick={onExitPresentation}
          className="text-xs text-slate-400 hover:text-white px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition cursor-pointer"
        >
          Keluar Tour
        </button>
      </div>

      {/* Main Interactive Stage / Screen */}
      <div className="max-w-5xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center relative z-20">
        <AnimatePresence mode="wait">
          {/* STEP 0: Process Finder Simulated Flow */}
          {currentStepIndex === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* Simulated Datatex Top Nav Window */}
              <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-6 shadow-2xl relative">
                {/* Window header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      Datatex NOW Enterprise ERP • Process Navigation
                    </span>
                  </div>

                  {/* Spotlight Target: Button '+ New' in top-left toolbar */}
                  <div className="relative">
                    <button
                      onClick={handleNextMicroOrStep}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        microFrame === 3
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/30 scale-105 shadow-xl shadow-amber-400/30 animate-pulse'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>+ New Partner</span>
                    </button>

                    {/* Speech Bubble pointing to '+ New' button in Frame 3 */}
                    <AnimatePresence>
                      {microFrame === 3 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute right-0 top-full mt-3 w-72 bg-amber-400 text-slate-950 p-3.5 rounded-2xl shadow-2xl z-50 text-left font-sans"
                        >
                          <div className="text-xs font-black uppercase tracking-wider mb-1 flex items-center justify-between">
                            <span>👉 Langkah Terakhir Step 1</span>
                            <span className="text-[10px] font-mono bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded">Enter / Klik</span>
                          </div>
                          <p className="text-xs leading-relaxed font-semibold">
                            Klik tombol <strong>"+ New Partner"</strong> di pojok toolbar ini untuk membuka form pendaftaran Business Partner!
                          </p>
                          <div className="mt-2 text-[10px] font-bold text-slate-800 flex items-center gap-1">
                            <CornerDownLeft className="w-3 h-3" /> Tekan Space / Enter untuk masuk ke Form
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Center Search Input Area */}
                <div className="max-w-xl mx-auto py-8 text-center space-y-4">
                  <div className="text-sm font-bold text-slate-300">
                    Process Finder (Pencarian Modul Global)
                  </div>

                  <div className="relative">
                    <div
                      onClick={handleNextMicroOrStep}
                      className={`flex items-center gap-3 bg-slate-950 rounded-2xl px-4 py-3 border transition-all cursor-pointer ${
                        microFrame === 0 || microFrame === 1
                          ? 'border-amber-400 ring-4 ring-amber-400/20 shadow-xl'
                          : 'border-slate-700'
                      }`}
                    >
                      <Search className="w-5 h-5 text-amber-400 shrink-0" />
                      <div className="flex items-center w-full font-mono text-sm font-semibold text-white">
                        <span>{searchText || (microFrame === 0 ? 'Ketik nama modul...' : '')}</span>
                        {(microFrame === 0 || isTyping) && (
                          <span className="w-2 h-4 bg-amber-400 ml-1 animate-pulse inline-block" />
                        )}
                      </div>
                      <span className="text-[10px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                        Process Finder
                      </span>
                    </div>

                    {/* Speech Bubble 1: Prompting User to Search in Frame 0 */}
                    <AnimatePresence>
                      {microFrame === 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-80 bg-blue-600 text-white p-3.5 rounded-2xl shadow-2xl z-50 text-left"
                        >
                          <div className="text-xs font-black uppercase tracking-wider mb-1 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Instruksi Alur:</span>
                          </div>
                          <p className="text-xs leading-relaxed">
                            Cari di Process Finder dan ketik <strong>"Business Partner"</strong> untuk mencari master entitas legal rekanan.
                          </p>
                          <div className="mt-2 text-[10px] font-semibold text-blue-200 flex items-center justify-between">
                            <span>Tekan Space / Klik di sini</span>
                            <span className="font-mono bg-blue-700 px-1.5 py-0.5 rounded">Space ➔</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Dropdown Options Popup (Appears in Frame 2) */}
                    <AnimatePresence>
                      {microFrame === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-blue-500/50 rounded-2xl shadow-2xl p-2 z-40 text-left"
                        >
                          {/* Option 1: Business Partner (ACTIVE HOVER) */}
                          <div
                            onClick={handleNextMicroOrStep}
                            className="p-3 rounded-xl bg-blue-600/30 border border-blue-400/60 text-white flex items-center justify-between cursor-pointer group"
                          >
                            <div className="flex items-center gap-2.5">
                              <Building2 className="w-4 h-4 text-amber-400" />
                              <div>
                                <div className="text-xs font-bold text-white flex items-center gap-2">
                                  <span>Business Partner</span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 font-black">
                                    SELECT / HOVER
                                  </span>
                                </div>
                                <div className="text-[10px] text-slate-400">Master Company / Customer / Vendor Data</div>
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-blue-300">Enter ↵</span>
                          </div>

                          {/* Option 2: Business Partner Fiscal Type */}
                          <div className="p-3 rounded-xl text-slate-400 hover:text-slate-200 flex items-center gap-2.5 opacity-60">
                            <Building2 className="w-4 h-4 text-slate-500" />
                            <div>
                              <div className="text-xs font-semibold">Business Partner Fiscal Type</div>
                              <div className="text-[10px] text-slate-400">Tax & Fiscal Type Configuration</div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Speech Bubble 2: Prompting to select Business Partner in Frame 2 */}
                    <AnimatePresence>
                      {microFrame === 2 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute left-1/2 -translate-x-1/2 top-[180px] w-80 bg-amber-400 text-slate-950 p-3.5 rounded-2xl shadow-2xl z-50 text-left font-sans"
                        >
                          <div className="text-xs font-black uppercase tracking-wider mb-1 flex items-center justify-between">
                            <span>🎯 Hasil Ditemukan</span>
                            <span className="text-[10px] font-mono bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded">Enter</span>
                          </div>
                          <p className="text-xs leading-relaxed font-semibold">
                            Pilih opsi <strong>"Business Partner"</strong> (ter-hover) lalu tekan <strong>Enter</strong> atau klik opsi tersebut untuk membuka daftar master.
                          </p>
                          <div className="mt-2 text-[10px] font-bold text-slate-800">
                            Klik opsi atau tekan Space untuk lanjut →
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Cue Card Base */}
          {currentStepIndex === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-base text-white">Cue Card: Base (Master Partner Header Datatex NOW)</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  READ ONLY SIMULATION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Origin information type</label>
                  <div className="font-mono font-bold text-white">CUSTOMER</div>
                </div>

                <div className="space-y-1 bg-blue-950/30 p-2.5 rounded-xl border border-blue-500/60 lg:col-span-2">
                  <label className="text-[10px] text-blue-400 uppercase font-mono flex items-center gap-1 font-bold">
                    <span className="text-red-400">*</span> Legal Name (Mandatory)
                  </label>
                  <div className="font-bold text-white">PT. Bojongsantos</div>
                </div>

                <div className="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Short name</label>
                  <div className="font-semibold text-white">BOJONGSANTOS</div>
                </div>

                <div className="space-y-1 bg-blue-950/30 p-2.5 rounded-xl border border-blue-500/60">
                  <label className="text-[10px] text-blue-400 uppercase font-mono flex items-center gap-1 font-bold">
                    <span className="text-red-400">*</span> Fiscal type (Mandatory)
                  </label>
                  <div className="font-semibold text-emerald-400">01 - Standar PKP</div>
                </div>

                <div className="space-y-1 bg-blue-950/30 p-2.5 rounded-xl border border-blue-500/60">
                  <label className="text-[10px] text-blue-400 uppercase font-mono flex items-center gap-1 font-bold">
                    <span className="text-red-400">*</span> Fiscal code (Mandatory)
                  </label>
                  <div className="font-mono font-bold text-amber-300">01.234.567.8-429.000</div>
                </div>

                <div className="space-y-1 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
                  <label className="text-[10px] text-slate-400 uppercase font-mono">Tax registration number</label>
                  <div className="font-mono text-slate-200">01.234.567.8-429.000</div>
                </div>
              </div>

              {/* Dynamic Presentation Speech Bubble */}
              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 shadow-2xl relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">💡 Penjelasan Inti Cue Card Base:</span>
                  <span className="text-[10px] font-mono bg-slate-950 text-amber-300 px-2 py-0.5 rounded">Hal. 6 Manual</span>
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  "Pada Cue Card Base, data legalitas entitas resmi diisi. <strong>Fiscal Type</strong> default adalah <strong>01</strong> dan nomor NPWP wajib valid 16 digit. Jika ada pergantian nama partner, gunakan field <em>End Date</em> dan tautkan ke partner baru via <em>Substitute</em>."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-800 flex items-center justify-between border-t border-slate-900/10 pt-2">
                  <span>Tekan Space / Klik Tombol Selanjutnya untuk pindah ke Cue Card Address</span>
                  <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded">Space ➔</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Cue Card Address */}
          {currentStepIndex === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span className="font-bold text-base text-white">Cue Card: Address (Alamat Faktur Legal)</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-400/10 text-indigo-400 border border-indigo-400/20">
                  INVOICE ADDRESS
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Country *</div>
                  <div className="text-sm font-semibold text-white">ID - INDONESIA</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Street / Area *</div>
                  <div className="text-sm font-semibold text-white">Jl. Raya Rancaekek KM 24.5</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">District / Kota *</div>
                  <div className="text-sm font-semibold text-white">Sumedang - Jawa Barat</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 lg:col-span-2">
                  <div className="text-[11px] text-slate-400 font-mono">Address 1 (Detail Gedung / Blok) *</div>
                  <div className="text-sm font-semibold text-white">Kawasan Industri Dwipapuri Blok C No. 12</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Phone Number *</div>
                  <div className="text-sm font-mono font-semibold text-white">+62 22 7564 8899</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 shadow-2xl">
                <div className="text-xs font-black uppercase tracking-wider mb-1">
                  💡 Penjelasan Alamat Legal:
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  "Alamat di tab ini adalah domisili resmi rekanan yang akan tercetak di faktur penagihan dan e-Faktur Pajak. Pastikan nomor telepon dan alamat distrik terisi lengkap."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-800 flex items-center justify-between border-t border-slate-900/10 pt-2">
                  <span>Lanjut ke Cue Card Contact Book (PIC)</span>
                  <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded">Space ➔</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Cue Card Contact Book */}
          {currentStepIndex === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-base text-white">Cue Card: Contact Book (Person in Charge)</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
                  PIC MASTER
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Person to Contact *</div>
                  <div className="text-sm font-bold text-white">Bpk. Hendra Gunawan</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Position / Job Role</div>
                  <div className="text-sm font-semibold text-slate-200">Procurement Manager</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Contact Number *</div>
                  <div className="text-sm font-mono font-semibold text-white">+62 812 3456 7890</div>
                </div>
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-mono">Email ID *</div>
                  <div className="text-sm font-mono font-semibold text-white">purchasing@busanaindah.co.id</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 shadow-2xl">
                <div className="text-xs font-black uppercase tracking-wider mb-1">
                  💡 Penjelasan PIC & Multi-Contact:
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  "Satu Business Partner dapat memiliki lebih dari 1 kontak (misal PIC Pembelian dan PIC Keuangan/AR). Email ini akan dipakai sistem untuk automasi notifikasi pesanan."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-800 flex items-center justify-between border-t border-slate-900/10 pt-2">
                  <span>Lanjut ke Other Functions (Alamat Pengiriman)</span>
                  <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded">Space ➔</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: Delivery Points */}
          {currentStepIndex === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-base text-white">Other Functions: Delivery Address (Delivery Point)</span>
                </div>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-400 border border-amber-400/20">
                  SHIPPING DESTINATION
                </span>
              </div>

              <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Daftar Delivery Point Tersimpan:</span>
                  <span className="text-emerald-400 font-mono">1 Point Active</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">DEL-01-WH</div>
                      <div className="text-[11px] text-slate-400">Pabrik Garment Unit 2 - Majalaya (Gudang Drop Kain)</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Active
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 shadow-2xl">
                <div className="text-xs font-black uppercase tracking-wider mb-1">
                  💡 Mengapa Perlu Delivery Point?
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  "Pabrik tekstil sering kali mengirim kain bukan ke kantor pembeli, melainkan langsung ke pabrik rekanan jahit (garment). Delivery Point ini yang akan dipilih saat Sales Order dibuat nanti."
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-800 flex items-center justify-between border-t border-slate-900/10 pt-2">
                  <span>Lanjut ke Step Terakhir: Menyimpan & Generate BP ID</span>
                  <span className="font-mono bg-slate-900 text-white px-2 py-0.5 rounded">Space ➔</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Save & BP ID Generated */}
          {currentStepIndex === 5 && (
            <motion.div
              key="step-5"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-6"
            >
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-xl shadow-emerald-500/10 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-black text-white">
                  Business Partner Berhasil Disimpan!
                </h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Sistem Datatex NOW telah menerbitkan nomor identifikasi master BP secara otomatis.
                </p>
              </div>

              <div className="max-w-md mx-auto bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 flex items-center justify-between">
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 font-mono">NOMOR BP ID BARU:</div>
                  <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">BP-18573</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 font-mono">LEGAL NAME:</div>
                  <div className="text-xs font-bold text-white">PT BUSANA INDAH GEMILANG</div>
                </div>
              </div>

              {/* Final Speech Bubble Triggering the Confirmation Modal */}
              <div
                onClick={handleNextMicroOrStep}
                className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-400 text-slate-950 shadow-2xl cursor-pointer hover:bg-amber-300 transition"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-black uppercase tracking-wider">🎉 Selamat! Tour Modul 01 Selesai</span>
                  <span className="text-[10px] font-mono bg-slate-950 text-amber-300 px-2 py-0.5 rounded">Klik di sini</span>
                </div>
                <p className="text-xs leading-relaxed font-semibold">
                  Kamu telah menyelesaikan seluruh 6 langkah pembuatan Business Partner. <strong>Klik di sini atau tekan Space</strong> untuk konfirmasi pemahaman modul!
                </p>
                <div className="mt-2 text-[10px] font-bold text-slate-900 flex items-center justify-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Buka Menu Konfirmasi Evaluasi
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Prompter Controls */}
      <div className="w-full bg-slate-950/80 border-t border-slate-900 px-6 py-3 flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0 && microFrame === 0}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            ← Kembali
          </button>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Gunakan tombol panah keyboard atau Space
          </span>
        </div>

        <button
          onClick={handleNextMicroOrStep}
          className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20 transition cursor-pointer flex items-center gap-2"
        >
          <span>
            {currentStepIndex === totalSteps - 1
              ? 'Selesaikan Tour & Konfirmasi →'
              : 'Langkah Selanjutnya →'}
          </span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* MULTI-STAGE COMPLETION MODAL AS REQUESTED BY USER */}
      {/* ========================================================= */}
      <AnimatePresence>
        {showCompletionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6 text-center"
            >
              {/* STAGE 1: 3 Choices (Ulangi dari Awal, Ulangi dari Step Tertentu, Paham) */}
              {completionStepChoice === 'main' && (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-400/30">
                    <HelpCircle className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-white">
                      Apakah kamu sudah paham modul ini?
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Pilih opsi di bawah untuk memastikan pemahaman alur Business Partner sebelum lanjut ke Modul 02 (Order Partner).
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {/* Option 1: Paham */}
                    <button
                      onClick={() => setCompletionStepChoice('confirm_yes')}
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>Paham! Siap lanjut</span>
                      </div>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Option 2: Ulangi dari Step Tertentu */}
                    <button
                      onClick={() => setCompletionStepChoice('pick_step')}
                      className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ListOrdered className="w-4 h-4 text-blue-400" />
                        <span>Ulangi dari Step Tertentu</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">Pilih Step 1-6</span>
                    </button>

                    {/* Option 3: Ulangi dari Awal */}
                    <button
                      onClick={() => handleJumpToStep(0)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs transition border border-slate-800 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <RotateCcw className="w-4 h-4" />
                        <span>Ulangi dari Awal (Step 1)</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">Restart Tour</span>
                    </button>
                  </div>
                </>
              )}

              {/* STAGE 2A: Pick Step (1 to 6) */}
              {completionStepChoice === 'pick_step' && (
                <>
                  <div className="text-left space-y-1">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <ListOrdered className="w-5 h-5 text-blue-400" />
                      <span>Pilih Step yang Ingin Dipelajari Ulang:</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Klik salah satu langkah untuk langsung melompat ke materi terkait:
                    </p>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto p-1 text-left">
                    {module.steps.map((st, i) => (
                      <button
                        key={st.stepId}
                        onClick={() => handleJumpToStep(i)}
                        className="w-full flex items-center justify-between p-2.5 rounded-xl bg-slate-950 hover:bg-blue-600/20 text-slate-300 hover:text-blue-300 border border-slate-800 hover:border-blue-500/40 text-xs transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-[11px] font-mono">
                            {st.stepNumber}
                          </span>
                          <div>
                            <div className="font-semibold text-white">{st.title}</div>
                            <div className="text-[10px] text-slate-400">{st.cueCardName}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => setCompletionStepChoice('main')}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition cursor-pointer"
                    >
                      ← Kembali ke Menu Pilihan
                    </button>
                  </div>
                </>
              )}

              {/* STAGE 2B: Confirm "Apakah kamu yakin?" */}
              {completionStepChoice === 'confirm_yes' && (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                    <ShieldCheck className="w-7 h-7" />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black text-white">
                      Apakah kamu yakin? 🤔
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Pastikan kamu sudah benar-benar memahami alur master Business Partner, pembuatan alamat faktur, PIC, dan delivery point.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    {/* Option: Tidak, ingin pelajari kembali (back to 3 options) */}
                    <button
                      onClick={() => setCompletionStepChoice('main')}
                      className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700 cursor-pointer"
                    >
                      Tidak, Ingin pelajari kembali
                    </button>

                    {/* Option: Iya, Paham!! (Unlock next module & proceed) */}
                    <button
                      onClick={() => {
                        setShowCompletionModal(false);
                        onCompleteAndUnlockNext();
                      }}
                      className="w-full py-3 px-4 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black transition shadow-lg shadow-emerald-400/30 cursor-pointer animate-pulse"
                    >
                      Iya, Paham!! 🚀
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
