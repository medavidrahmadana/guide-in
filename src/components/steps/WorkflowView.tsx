import React, { useState } from 'react';
import { WORKFLOW_STEPS } from '../../data/stepsData';
import { WorkflowStepId } from '../../types/workflow';
import { StepBusinessPartner } from './StepBusinessPartner';
import { 
  Building2, 
  Users, 
  FileText, 
  GitFork, 
  CheckCircle, 
  PackageCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface WorkflowViewProps {
  currentStepId: WorkflowStepId;
  isPresentation?: boolean;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({ currentStepId, isPresentation }) => {
  const step = WORKFLOW_STEPS.find((s) => s.id === currentStepId);

  const renderStepContent = () => {
    switch (currentStepId) {
      case 'business-partner':
        return <StepBusinessPartner isPresentation={isPresentation} />;
      case 'order-partner':
        return (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Step 2: Order Partner (OP Customer)</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Modul penentuan akun komersial, setting Currency, toggle penting <code>Order Allowed [✓]</code>, dan <code>End Credit Date</code>.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs text-slate-300 font-mono">
              Ready for Interactive Simulator Hook
            </div>
          </div>
        );
      case 'open-order':
        return (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Step 3: Open Order (Template 120)</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Booking kapasitas & greige kain (Design, Chop, GSM, Finish) dengan simulasi interaktif tombol panah <code>( → )</code> compile item code.
            </p>
          </div>
        );
      case 'order-evolution':
        return (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <GitFork className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Step 4: Order Evolution (120 ➔ 001)</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Header Evolution (Same vs Cross-Customer) & Line Evolution (Full Qty ➔ CLOSED, Partial Qty ➔ PRE.USED).
            </p>
          </div>
        );
      case 'confirm-order':
        return (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Step 5: Confirm Order (Template 001)</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Penetapan kode warna / shade spesifik dan update status pesanan definitif.
            </p>
          </div>
        );
      case 'stock-picking':
        return (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mx-auto">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Step 6: Stock & Picking Simulation (Doc 09 & Doc 11)</h3>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">
              Alokasi stok kain gudang 311WFF01 dan alur Picking Creator (Doc 09) ke Picking Confirmation (Doc 11).
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {renderStepContent()}
    </div>
  );
};
