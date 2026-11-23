import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SpotlightProps {
  active: boolean;
  children: React.ReactNode;
  narrative?: string;
  tips?: string[];
  stepIndex?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrev?: () => void;
}

export const SpotlightOverlay: React.FC<SpotlightProps> = ({
  active,
  children,
  narrative,
  tips = [],
  stepIndex = 1,
  totalSteps = 6,
  onNext,
  onPrev,
}) => {
  if (!active) {
    return <>{children}</>;
  }

  return (
    <div className="relative min-h-[calc(100vh-120px)] overflow-hidden">
      {/* Background cinematic vignette overlay */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-30 bg-slate-950/65 backdrop-blur-[2px] transition-all"
        />
      </AnimatePresence>

      {/* Main content zoomed / spotlighted */}
      <motion.div
        animate={{
          scale: 1.02,
          y: -10,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className="relative z-35"
      >
        {children}
      </motion.div>

      {/* Floating Presentation HUD / Prompter bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4"
      >
        <div className="bg-slate-900/95 border border-amber-500/40 rounded-2xl p-4 shadow-2xl shadow-amber-500/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Mode Presentasi • Step {stepIndex} dari {totalSteps}
              </span>
            </div>
            <span className="text-[11px] text-slate-400">
              Gunakan tombol panah atau tombol di samping untuk lanjut
            </span>
          </div>

          <p className="text-sm text-slate-200 leading-relaxed font-medium mb-3">
            {narrative || 'Perhatikan instruksi pada field yang ditandai.'}
          </p>

          {tips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tips.map((tip, idx) => (
                <span
                  key={idx}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20"
                >
                  💡 {tip}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <button
              onClick={onPrev}
              disabled={stepIndex <= 1}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              ← Sebelumnya
            </button>
            <button
              onClick={onNext}
              disabled={stepIndex >= totalSteps}
              className="px-5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Langkah Selanjutnya →
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
