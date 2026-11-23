import React from 'react';
import { TrainingModule } from '../../types/workflow';
import { Lock, FileCheck2, ArrowLeft, ArrowRight } from 'lucide-react';

interface ModuleLockedPlaceholderProps {
  module: TrainingModule;
  previousModule: TrainingModule;
  isUnlocked: boolean;
  onGoToPrevious: () => void;
}

export const ModuleLockedPlaceholder: React.FC<ModuleLockedPlaceholderProps> = ({
  module,
  previousModule,
  isUnlocked,
  onGoToPrevious,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto shadow-2xl">
        <Lock className="w-10 h-10 text-amber-500/80" />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold font-mono">
          MODUL TERKUNCI (LOCKED)
        </div>
        <h2 className="text-3xl font-black text-white">
          Modul {module.menuNumber}: {module.title}
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">
          Untuk menjaga pemahaman alur kerja yang runtut sesuai standar operasional PT Gistex Indonesia, modul ini baru akan terbuka setelah modul sebelumnya dikonfirmasi selesai.
        </p>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 max-w-md mx-auto text-left space-y-3">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Prasyarat Kelulusan:
        </div>
        <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
          <FileCheck2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            Selesaikan seluruh sub-langkah di{' '}
            <strong className="text-blue-300">
              Modul 0{previousModule.menuNumber}: {previousModule.title}
            </strong>{' '}
            dan klik tombol <em>"Konfirmasi Paham & Unlock"</em>.
          </div>
        </div>
      </div>

      <div>
        <button
          onClick={onGoToPrevious}
          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Modul {previousModule.menuNumber} ({previousModule.code})</span>
        </button>
      </div>
    </div>
  );
};
