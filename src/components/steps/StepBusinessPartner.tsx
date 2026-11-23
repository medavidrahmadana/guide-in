import React from 'react';
import { WorkflowStepId } from '../../types/workflow';
import { Building2, ShieldCheck, Mail, Phone, MapPin, AlertCircle, Info } from 'lucide-react';

interface StepBusinessPartnerProps {
  isPresentation?: boolean;
}

export const StepBusinessPartner: React.FC<StepBusinessPartnerProps> = ({ isPresentation }) => {
  return (
    <div className="space-y-6">
      {/* Step Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              STEP 1: BUSINESS PARTNER (BP)
            </span>
            <span className="text-xs text-slate-400">Master Entitas Legal</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Pendaftaran & Verifikasi Legal Partner
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Mendaftarkan data legal rekanan bisnis di sistem Datatex NOW sebelum akun penjualan (Order Partner) dibuka.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start bg-slate-900 border border-slate-800 p-2 rounded-xl text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Status: Validasi Pajak Aktif</span>
        </div>
      </div>

      {/* Main Datatex Form Mockup */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-sm text-slate-200">Form Master Business Partner</span>
          </div>
          <span className="text-xs text-amber-400 font-mono bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            * Kolom wajib diisi
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* BP Code */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>BP Code *</span>
              <span className="text-[10px] text-blue-400 font-normal">Auto / Manual Code</span>
            </label>
            <input
              type="text"
              defaultValue="BP-GSTX-0089"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          {/* Legal Name */}
          <div className="space-y-1.5 lg:col-span-2">
            <label className="text-xs font-semibold text-slate-300">
              Legal Registered Name *
            </label>
            <input
              type="text"
              defaultValue="PT BUSANA INDAH GEMILANG"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          {/* NPWP (Highlight in presentation) */}
          <div className={`space-y-1.5 p-2 rounded-xl transition-all ${isPresentation ? 'bg-amber-500/10 border border-amber-500/40 ring-2 ring-amber-500/20' : ''}`}>
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span className="flex items-center gap-1">
                NPWP (16 Digit) *
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              </span>
              <span className="text-[10px] text-emerald-400">Format Pajak Baru</span>
            </label>
            <input
              type="text"
              defaultValue="01.234.567.8-429.000"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
            <p className="text-[11px] text-slate-400">Wajib sinkron dengan sistem e-Faktur.</p>
          </div>

          {/* Fiscal Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Tipe Fiskal / Pajak *
            </label>
            <select className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500">
              <option value="PKP">PKP (Pengusaha Kena Pajak)</option>
              <option value="NON_PKP">NON-PKP</option>
              <option value="BONDED_ZONE">Kawasan Berikat (KBN / Fasilitas)</option>
            </select>
          </div>

          {/* Contact Person */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Contact Person PIC
            </label>
            <input
              type="text"
              defaultValue="Bpk. Hendra Gunawan"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>Email Finance / Purchasing</span>
            </label>
            <input
              type="email"
              defaultValue="purchasing@busanaindah.co.id"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>No. Telepon / Fax</span>
            </label>
            <input
              type="text"
              defaultValue="+62 22 7564 8899"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div className="space-y-1.5 lg:col-span-3">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>Alamat Kantor Legal Sesuai NPWP *</span>
            </label>
            <textarea
              rows={2}
              defaultValue="Kawasan Industri Rancaekek KM 24.5, Sumedang - Jawa Barat 45364"
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Informational Callout */}
        <div className="flex items-start gap-3 bg-blue-950/30 border border-blue-900/60 p-4 rounded-xl text-xs text-blue-200">
          <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-blue-300">Aturan Datatex NOW: </span>
            Setiap 1 Business Partner (BP) dapat memiliki lebih dari 1 Order Partner (OP) jika entitas bisnis memiliki multi-cabang atau departemen pembelian terpisah.
          </div>
        </div>
      </div>
    </div>
  );
};
