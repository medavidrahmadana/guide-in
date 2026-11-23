import React from 'react';
import { AppMode } from '../../types/workflow';
import { Compass, PlayCircle, Eye, HelpCircle } from 'lucide-react';

interface HeaderProps {
  mode: AppMode;
  onChangeMode: (mode: AppMode) => void;
  onGoHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({ mode, onChangeMode, onGoHome }) => {
  return (
    <header className="w-full bg-slate-950/90 border-b border-slate-800 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onGoHome}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Compass className="w-5 h-5 text-white animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white">Guide.In</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Datatex NOW
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Sales Workflow Simulator • PT Gistex Indonesia</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {mode !== 'landing' && (
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => onChangeMode('sandbox')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'sandbox'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Sandbox Mode</span>
            </button>

            <button
              onClick={() => onChangeMode('presentation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                mode === 'presentation'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Presentation Tour</span>
            </button>
          </div>
        )}

        <button
          onClick={onGoHome}
          className="px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 hover:border-slate-700 transition cursor-pointer"
        >
          Menu Utama
        </button>
      </div>
    </header>
  );
};
