import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  Layers, 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  Building2, 
  Terminal, 
  CheckCircle2, 
  Laptop, 
  X,
  Play,
  Cpu,
  Palette
} from 'lucide-react';

interface GlobalLandingProps {
  onSelectGistex: () => void;
  onSelectTemplateHub: () => void;
}

export const GlobalLandingHub: React.FC<GlobalLandingProps> = ({
  onSelectGistex,
  onSelectTemplateHub,
}) => {
  // Bubble notice floating state that can be dismissed
  const [showNoticeBubble, setShowNoticeBubble] = useState(true);

  return (
    <div className="h-screen w-screen bg-slate-950 text-slate-100 flex flex-col justify-between overflow-hidden relative selection:bg-blue-600 selection:text-white">
      {/* Background Ambience / Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="max-w-6xl mx-auto w-full px-5 py-3.5 flex items-center justify-between relative z-20 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2 leading-none">
              Guide.In
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Interactive Walkthrough Platform
              </span>
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">Platform Pembuatan & Simulasi Tour Pembelajaran Interaktif</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">v2.0 Architecture</span>
          <button
            onClick={onSelectTemplateHub}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition cursor-pointer"
          >
            <Palette className="w-3.5 h-3.5 text-emerald-400" />
            <span>Koleksi Template</span>
          </button>
        </div>
      </header>

      {/* Hero Body - Fit 1 Screen Viewport */}
      <main className="max-w-5xl mx-auto w-full px-4 flex-1 flex flex-col justify-center text-center relative z-20 my-auto space-y-6">
        {/* Hero Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-emerald-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Bukan Video Statis, Ini Simulasi Guided Langsung di Browser</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Mau Jelajahi Simulator apa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-300">
              Hari ini?
            </span>
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Pilih simulator modul bawaan industri tekstil, atau mulai buat template panduan langkah interaktifmu sendiri (Web SaaS, Instalasi File, atau Terminal CLI).
          </p>
        </motion.div>

        {/* 2 Primary Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto w-full text-left pt-2">
          {/* Card 1: Gistex Datatex NOW Simulator */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onClick={onSelectGistex}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 hover:border-blue-500/80 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-all" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center font-bold shadow-lg">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30 font-extrabold uppercase tracking-wider">
                  Showcase ERP Modul
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition flex items-center gap-2">
                  <span>Datatex NOW: Sales Workflow</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Simulasi 6 alur penjualan PT Gistex Indonesia: Mulai dari Business Partner, OP, Open Order (120), hingga Stock Picking Gudang 311WFF01.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  Dual Mode (Sandbox vs Presentation)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  Process Finder Autotype
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  BP Header Sync
                </span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 relative z-10">
              <span>Buka Simulator Datatex NOW</span>
              <span className="w-7 h-7 rounded-full bg-blue-600/20 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition">
                →
              </span>
            </div>
          </motion.div>

          {/* Card 2: Custom Walkthrough Template Builder */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onClick={onSelectTemplateHub}
            className="group relative bg-slate-900/90 hover:bg-slate-900 border border-slate-700/80 hover:border-emerald-500/80 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient Card Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/20 transition-all" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold shadow-lg">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-extrabold uppercase tracking-wider">
                  Interactive Studio
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition flex items-center gap-2">
                  <span>Buat Template Demo Kamu</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Kreasikan panduan interaktifmu sendiri! Pilih template Instalasi Aplikasi (Wizard), Onboarding Web SaaS, atau CLI Terminal Simulator.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  Installation Wizard
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  CLI Terminal Player
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                  Custom Stepper & Bubble
                </span>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400 relative z-10">
              <span>Buka Galeri & Studio Template</span>
              <span className="w-7 h-7 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 flex items-center justify-center transition">
                →
              </span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Floating Animated Info Bubble */}
      <AnimatePresence>
        {showNoticeBubble && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-12 right-6 z-50 max-w-sm bg-gradient-to-r from-blue-900/95 to-indigo-900/95 border border-blue-400/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl text-left"
            style={{
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 25px rgba(59,130,246,0.3)'
            }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                  Info Guide.In:
                </span>
              </div>
              <button
                onClick={() => setShowNoticeBubble(false)}
                className="text-slate-400 hover:text-white p-0.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
                title="Tutup pesan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-200 mt-2 leading-relaxed">
              👋 Hai! Untuk simulasi ERP, saat ini <strong>sementara baru Modul Sales (Business Partner)</strong> yang aktif ya. Modul lainnya dan custom template studio sedang dalam racikan!
            </p>

            <div className="mt-2.5 pt-2 border-t border-blue-400/20 flex justify-between items-center text-[11px]">
              <span className="text-blue-300 font-mono">Guide.In Engine</span>
              <button
                onClick={() => setShowNoticeBubble(false)}
                className="font-bold text-amber-300 hover:text-amber-200 underline cursor-pointer"
              >
                Siap, tutup pesan
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="w-full text-center py-2.5 text-[11px] text-slate-400 border-t border-slate-900 shrink-0 relative z-10 bg-slate-950/80 backdrop-blur-sm">
        Guide.In • Universal Interactive Walkthrough & Training Simulator Framework
      </footer>
    </div>
  );
};
