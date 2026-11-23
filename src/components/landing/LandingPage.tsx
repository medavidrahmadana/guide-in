import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../../data/stepsData';
import { WorkflowStepId } from '../../types/workflow';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  ChevronDown, 
  Sparkles, 
  Play, 
  ShieldCheck, 
  Layers, 
  ArrowRight,
  Workflow
} from 'lucide-react';

interface LandingPageProps {
  onStartWorkflow: (stepId: WorkflowStepId, mode: 'sandbox' | 'presentation') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartWorkflow }) => {
  const [selectedStep, setSelectedStep] = useState<WorkflowStepId>('business-partner');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const activeStepObj = WORKFLOW_STEPS.find((s) => s.id === selectedStep) || WORKFLOW_STEPS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Top Brand Bar */}
      <header className="max-w-6xl mx-auto w-full px-6 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Guide.In
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                v1.0 ERP Datatex NOW
              </span>
            </h1>
            <p className="text-xs text-slate-400">Sales Workflow Simulator • PT Gistex Indonesia</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 border border-slate-800 px-3.5 py-1.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Interactive Client-side Sandbox</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto w-full px-6 py-12 text-center relative z-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulasi Alur Sales Tekstil Interaktif</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1]">
            Mau Training buat <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-amber-300">
              Modul apa nih?
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Pilih alur kerja Datatex NOW yang ingin kamu pelajari atau simulasikan. Tersedia mode latihan bebas (Sandbox) dan mode panduan presentasi.
          </p>
        </motion.div>

        {/* Interactive Step Selector / Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-xl mx-auto relative text-left"
        >
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Pilih Topik Pelatihan:
          </label>

          {/* Trigger Dropdown Button */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full bg-slate-900/90 border border-slate-700 hover:border-blue-500/80 rounded-2xl p-4 flex items-center justify-between transition-all duration-200 shadow-xl group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold text-sm">
                {activeStepObj.stepNumber}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400 font-mono">[{activeStepObj.code}]</span>
                  <span className="text-base font-bold text-white group-hover:text-blue-300 transition">
                    {activeStepObj.title}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{activeStepObj.subtitle}</p>
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180 text-blue-400' : ''}`} />
          </button>

          {/* Dropdown Options List */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-xl max-h-80 overflow-y-auto"
              >
                {WORKFLOW_STEPS.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => {
                      setSelectedStep(step.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition cursor-pointer ${
                      step.id === selectedStep
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                        : 'hover:bg-slate-800/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold font-mono">
                        {step.stepNumber}
                      </span>
                      <div>
                        <div className="text-sm font-semibold">{step.title}</div>
                        <div className="text-xs text-slate-400">{step.subtitle}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {step.code}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Launch Buttons: Sandbox vs Presentation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
            <button
              onClick={() => onStartWorkflow(selectedStep, 'sandbox')}
              className="flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-5 rounded-2xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer group"
            >
              <Workflow className="w-4 h-4 text-blue-200 group-hover:scale-110 transition" />
              <span>Buka Sandbox Mode</span>
            </button>

            <button
              onClick={() => onStartWorkflow(selectedStep, 'presentation')}
              className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold py-3.5 px-5 rounded-2xl shadow-lg shadow-amber-500/25 transition-all cursor-pointer group"
            >
              <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition" />
              <span>Presentation Tour</span>
            </button>
          </div>
        </motion.div>

        {/* 6 Quick Pills */}
        <div className="pt-6 border-t border-slate-800/60 max-w-2xl mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-3">Atau langsung lompat ke alur:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {WORKFLOW_STEPS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setSelectedStep(s.id);
                  onStartWorkflow(s.id, 'sandbox');
                }}
                className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition cursor-pointer"
              >
                {s.stepNumber}. {s.code}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto w-full px-6 py-6 text-center text-xs text-slate-400 border-t border-slate-900 relative z-10">
        Guide.In • Datatex NOW Interactive Learning Hub & Simulator
      </footer>
    </div>
  );
};
