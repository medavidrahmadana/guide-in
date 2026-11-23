import React, { useState, useEffect } from 'react';
import { TrainingModule } from '../../types/workflow';
import { 
  Building2, 
  MapPin, 
  UserCheck, 
  Truck, 
  Save, 
  Search, 
  PlusCircle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  FileBadge
} from 'lucide-react';

interface ModuleBPInteractiveProps {
  module: TrainingModule;
  activeStepIndex: number;
  isPresentation?: boolean;
  onStepChange: (index: number) => void;
  onCompleteModule: () => void;
}

export const ModuleBPInteractive: React.FC<ModuleBPInteractiveProps> = ({
  module,
  activeStepIndex,
  isPresentation,
  onStepChange,
  onCompleteModule,
}) => {
  // Simulator State
  const [originInfo, setOriginInfo] = useState('CUSTOM');
  const [legalName, setLegalName] = useState('PT BUSANA INDAH GEMILANG');
  const [shortName, setShortName] = useState('BIG-BANDUNG');
  const [fiscalType, setFiscalType] = useState('01');
  const [taxRegNo, setTaxRegNo] = useState('01.234.567.8-429.000');
  
  // Address
  const [country, setCountry] = useState('ID - INDONESIA');
  const [plotNumber, setPlotNumber] = useState('Blok C No. 12');
  const [streetArea, setStreetArea] = useState('Jl. Raya Rancaekek KM 24.5');
  const [address1, setAddress1] = useState('Kawasan Industri Dwipapuri');
  const [district, setDistrict] = useState('Sumedang');
  const [phone, setPhone] = useState('+62 22 7564 8899');

  // Contact
  const [contactPerson, setContactPerson] = useState('Bpk. Hendra Gunawan');
  const [position, setPosition] = useState('Procurement Manager');
  const [contactPhone, setContactPhone] = useState('+62 812 3456 7890');
  const [email, setEmail] = useState('purchasing@busanaindah.co.id');

  // Delivery Address (Delivery Point)
  const [deliveryCode, setDeliveryCode] = useState('DEL-01-WH');
  const [deliveryAddressee, setDeliveryAddressee] = useState('Pabrik Garment Unit 2 - Majalaya');
  const [deliveryPoints, setDeliveryPoints] = useState<string[]>([
    'DEL-01-WH (Pabrik Garment Unit 2 - Majalaya)'
  ]);

  // Saved BP ID
  const [generatedBpId, setGeneratedBpId] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // Typewriter effect state for Process Finder search bar with 5-second recurring loop
  const targetSearchText = 'Business Partner';
  const [typedSearchText, setTypedSearchText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (activeStepIndex !== 0) {
      setTypedSearchText('');
      setIsTypingDone(false);
      return;
    }

    let intervalId: any = null;
    let restartTimeoutId: any = null;

    const startTyping = () => {
      setTypedSearchText('');
      setIsTypingDone(false);
      let currentIndex = 0;

      intervalId = setInterval(() => {
        if (currentIndex < targetSearchText.length) {
          setTypedSearchText(targetSearchText.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          setIsTypingDone(true);
          if (intervalId) clearInterval(intervalId);

          // Jeda 5 detik setelah selesai ngetik, lalu ulangi animasi dari awal
          restartTimeoutId = setTimeout(() => {
            startTyping();
          }, 5000);
        }
      }, 100); // Kecepatan ngetik per karakter (~1.6 detik total)
    };

    startTyping();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (restartTimeoutId) clearTimeout(restartTimeoutId);
    };
  }, [activeStepIndex]);

  const currentStep = module.steps[activeStepIndex];

  const handleAddDeliveryPoint = () => {
    if (deliveryCode && deliveryAddressee) {
      setDeliveryPoints([...deliveryPoints, `${deliveryCode} (${deliveryAddressee})`]);
      setDeliveryCode('');
      setDeliveryAddressee('');
    }
  };

  const handleSaveBP = () => {
    const newId = 'BP-18573';
    setGeneratedBpId(newId);
    setIsSaved(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Module Title Banner & Document Citation */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/15 text-blue-400 border border-blue-500/30">
              MODUL 01 • BUSINESS PARTNER
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              Ref: {module.pdfDocRef}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {currentStep.stepNumber}. {currentStep.title}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-xs text-slate-300">
            <span className="font-semibold px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 text-blue-300 w-fit">
              {currentStep.cueCardName}
            </span>
            <span className="text-slate-400 hidden sm:inline">•</span>
            <span className="text-slate-300 leading-relaxed">
              {currentStep.summary}
            </span>
          </div>
        </div>

        {/* Action Button: Single line, well proportioned */}
        <div className="flex items-center gap-2 shrink-0">
          {activeStepIndex > 0 && (
            <button
              onClick={() => onStepChange(activeStepIndex - 1)}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer border border-slate-700/60"
            >
              ← Sebelumnya
            </button>
          )}

          {activeStepIndex < module.steps.length - 1 ? (
            <button
              onClick={() => onStepChange(activeStepIndex + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition cursor-pointer flex items-center gap-2 whitespace-nowrap"
            >
              <span>Lanjut ke Step {activeStepIndex + 2}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onCompleteModule}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30 transition cursor-pointer flex items-center gap-2 animate-bounce whitespace-nowrap"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Konfirmasi Paham & Unlock Modul 2!</span>
            </button>
          )}
        </div>
      </div>

      {/* Simulator Workspace: Dynamic based on active sub-step */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        {/* Step 1: Process Finder Simulation */}
        {activeStepIndex === 0 && (
          <div className="space-y-6 py-2">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30 shadow-lg">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white">Simulasi Process Finder Datatex NOW</h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto">
                  Di Datatex NOW, seluruh modul dan form dicari melalui toolbar <strong>Process Finder</strong> di pojok kiri atas aplikasi.
                </p>
              </div>

              {/* Datatex Style Process Finder Mockup Window */}
              <div className="bg-slate-950 border border-slate-700/80 rounded-2xl p-4 text-left shadow-2xl relative space-y-4">
                {/* Header bar of process finder */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    {/* The '+' button placed prominent at the top-left */}
                    <button
                      onClick={() => onStepChange(1)}
                      title="Klik tombol New untuk buat Partner baru"
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md ${
                        isTypingDone
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 ring-2 ring-blue-400/40 animate-pulse'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <PlusCircle className="w-4 h-4 text-white" />
                      <span>+ New Partner</span>
                    </button>
                    <span className="text-[11px] text-slate-400 hidden sm:inline">
                      (Klik tombol <strong className="text-blue-300">+</strong> di pojok kiri atas untuk membuat baru)
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    Datatex Process Finder v2026
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Ketik nama modul di Process Finder:
                  </label>
                  <div className="flex items-center gap-3 bg-slate-900 border border-blue-500/50 rounded-xl px-4 py-2.5">
                    <Search className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="flex items-center w-full font-semibold text-sm text-white font-mono">
                      <span>{typedSearchText}</span>
                      <span className="w-2 h-4 bg-blue-400 ml-0.5 animate-pulse inline-block" />
                    </div>
                    {isTypingDone && (
                      <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded shrink-0 animate-fade-in border border-blue-500/30">
                        Found 1 Collection
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                  <span className="text-slate-400">
                    {isTypingDone ? (
                      <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Hasil: Collection Business Partner siap dibuka
                      </span>
                    ) : (
                      'Mencari modul di sistem Datatex NOW...'
                    )}
                  </span>

                  <button
                    onClick={() => onStepChange(1)}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <span>Buka Form</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Cue Card Base */}
        {activeStepIndex === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                <h3 className="text-base font-bold text-white">Cue Card: Base (Identitas Legal Partner)</h3>
              </div>
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 font-mono">
                Wajib Lengkap untuk Pajak
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Origin Info Type *</label>
                <input
                  type="text"
                  value={originInfo}
                  onChange={(e) => setOriginInfo(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Legal Registered Name *</label>
                <input
                  type="text"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Short Name *</label>
                <input
                  type="text"
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Fiscal Type (Default 01) *</label>
                <select
                  value={fiscalType}
                  onChange={(e) => setFiscalType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500"
                >
                  <option value="01">01 - Standar Fiskal / PKP</option>
                  <option value="02">02 - Non PKP</option>
                  <option value="03">03 - Kawasan Berikat</option>
                </select>
              </div>

              <div className="space-y-1.5 p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                  <span>Tax Reg. Number (NPWP 16 Digit) *</span>
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                </label>
                <input
                  type="text"
                  value={taxRegNo}
                  onChange={(e) => setTaxRegNo(e.target.value)}
                  className="w-full bg-slate-950 border border-amber-500/50 rounded-xl px-3.5 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-amber-400 font-mono"
                />
                <span className="text-[10px] text-amber-400/80">Wajib untuk e-Faktur PT Gistex</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-900/60 text-xs text-blue-200 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>
                <strong>Catatan User Manual:</strong> Jika nama partner berubah di kemudian hari, jangan ubah data master ini secara sembarangan. Buat BP baru dengan nama baru, buka BP lama, isi <code>End Date</code>, lalu pilih BP baru di field <code>Substitute</code>.
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Cue Card Address */}
        {activeStepIndex === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Cue Card: Address (Alamat Legal Penagihan)</h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">Invoice Address Reference</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Country *</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Plot Number / No. Kavling</label>
                <input
                  type="text"
                  value={plotNumber}
                  onChange={(e) => setPlotNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Street / Area *</label>
                <input
                  type="text"
                  value={streetArea}
                  onChange={(e) => setStreetArea(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5 lg:col-span-2">
                <label className="text-xs font-semibold text-slate-300">Address 1 (Detail Gedung/Blok) *</label>
                <input
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">District / Kota *</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Phone Number *</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Contact Book */}
        {activeStepIndex === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">Cue Card: Contact Book (Daftar PIC Rekanan)</h3>
              </div>
              <span className="text-xs text-slate-400">Multiple PICs Supported</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Person to Contact *</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Position / Job Role</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Contact Number *</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Email ID *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-sm text-slate-200 font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Delivery Points */}
        {activeStepIndex === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Other Functions: Alamat Pengiriman (Delivery Point)</h3>
              </div>
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                Pabrik / Gudang Kirim Pembeli
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Gunakan fungsi ini jika alamat fisik pengiriman barang (misalnya pabrik garmen rekanan) berbeda dari alamat kantor faktur/NPWP.
            </p>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Kode Unik Delivery Point *</label>
                  <input
                    type="text"
                    placeholder="Contoh: DEL-02-CIMAHI"
                    value={deliveryCode}
                    onChange={(e) => setDeliveryCode(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Addressee / Nama Lokasi Gudang *</label>
                  <input
                    type="text"
                    placeholder="Contoh: Pabrik Sewing Unit 3"
                    value={deliveryAddressee}
                    onChange={(e) => setDeliveryAddressee(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddDeliveryPoint}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer flex items-center gap-2"
              >
                <PlusCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>Simpan Delivery Point Tambahan</span>
              </button>
            </div>

            {/* List of registered delivery points */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Daftar Delivery Point Terdaftar:
              </label>
              <div className="space-y-2">
                {deliveryPoints.map((dp, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-400" />
                      <span>{dp}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Save & Generate ID */}
        {activeStepIndex === 5 && (
          <div className="space-y-6 py-4 text-center">
            <div className="max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 shadow-xl shadow-emerald-500/10">
                <FileBadge className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-black text-white">Menyimpan & Menerbitkan BP ID</h3>
              <p className="text-sm text-slate-400">
                Setelah seluruh cue card Base, Address, Contact Book, dan Delivery Point terisi, klik tombol Save di toolbar atas.
              </p>

              {!isSaved ? (
                <div className="pt-2">
                  <button
                    onClick={handleSaveBP}
                    className="flex items-center justify-center gap-2.5 mx-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-blue-600/30 cursor-pointer transition text-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Klik Toolbar: Simpan Business Partner</span>
                  </button>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-left space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      ✔ Business Partner Berhasil Disimpan!
                    </span>
                    <span className="text-xs text-emerald-300 font-mono">System Generated</span>
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">Nomor Master BP ID:</div>
                      <div className="text-xl font-black text-emerald-400 font-mono">{generatedBpId}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-400">Legal Name:</div>
                      <div className="text-xs font-bold text-white">{legalName}</div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    BP ID <strong>{generatedBpId}</strong> kini tersimpan di database Datatex NOW. Nomor ini akan kita gunakan untuk membuat akun komersial di <strong>Modul 02: Order Partner (OP Customer)</strong>.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Presentation Spotlightprompter bar */}
      {isPresentation && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Naskah Presenter • Step {currentStep.stepNumber} dari {module.steps.length}
            </span>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-medium">
            "{currentStep.presentationNarrative}"
          </p>
          {currentStep.tips.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-amber-500/20">
              {currentStep.tips.map((t, idx) => (
                <span key={idx} className="text-[11px] text-amber-300">
                  💡 {t}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
