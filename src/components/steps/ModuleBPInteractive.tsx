import React, { useState, useEffect } from 'react';
import { TrainingModule } from '../../types/workflow';
import { 
  Building2, 
  MapPin, 
  UserCheck, 
  Save, 
  Search, 
  PlusCircle, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Calendar,
  Lock,
  ChevronRight,
  HelpCircle,
  Sparkles
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
  onStepChange,
  onCompleteModule,
}) => {
  // Sync tab state with stepper step index (2-way binding)
  // Step 0: Process Finder
  // Step 1: Base tab
  // Step 2: Base2 tab
  // Step 3: Address tab
  // Step 4: Contact book tab
  // Step 5: Save & confirmation
  const getTabFromStep = (stepIdx: number): 'Base' | 'Base2' | 'Address' | 'Contact book' => {
    switch (stepIdx) {
      case 2:
        return 'Base2';
      case 3:
        return 'Address';
      case 4:
        return 'Contact book';
      default:
        return 'Base';
    }
  };

  const [activeTab, setActiveTab] = useState<'Base' | 'Base2' | 'Address' | 'Contact book'>(
    getTabFromStep(activeStepIndex)
  );

  // Update activeTab whenever activeStepIndex changes from top stepper
  useEffect(() => {
    setActiveTab(getTabFromStep(activeStepIndex));
  }, [activeStepIndex]);

  // When user clicks a tab directly, sync stepper as well!
  const handleSelectTab = (tab: 'Base' | 'Base2' | 'Address' | 'Contact book') => {
    setActiveTab(tab);
    switch (tab) {
      case 'Base':
        onStepChange(1);
        break;
      case 'Base2':
        onStepChange(2);
        break;
      case 'Address':
        onStepChange(3);
        break;
      case 'Contact book':
        onStepChange(4);
        break;
    }
  };

  // Form Fields State matching Datatex Screenshots
  const [numberId] = useState('0');
  const [originInfoType, setOriginInfoType] = useState('CUSTOMER');
  const [endDate, setEndDate] = useState('');
  const [substitute, setSubstitute] = useState('0');
  const [legalName, setLegalName] = useState('PT. Bojongsantos'); // *Mandatory
  const [legalSurname, setLegalSurname] = useState('');
  const [shortName, setShortName] = useState('BOJONGSANTOS');
  const [searchName, setSearchName] = useState('bojongsantos');
  const [group, setGroup] = useState('0');
  const [isSundry, setIsSundry] = useState(false);
  const [fiscalType, setFiscalType] = useState('01'); // *Mandatory
  const [fiscalCode, setFiscalCode] = useState('01.234.567.8-429.000'); // *Mandatory
  const [taxRegNo, setTaxRegNo] = useState('01.234.567.8-429.000');
  const [eoriCode, setEoriCode] = useState('');
  const [fiscalRepresentative, setFiscalRepresentative] = useState('0');
  const [permanentEstablishment, setPermanentEstablishment] = useState('');

  // Base2
  const [gender, setGender] = useState('N/A');
  const [birthDate, setBirthDate] = useState('');
  const [birthCountry, setBirthCountry] = useState('');
  const [nationality, setNationality] = useState('');

  // Address
  const [country, setCountry] = useState('ID - INDONESIA'); // *Mandatory
  const [transportZone, setTransportZone] = useState('');
  const [phoneNo, setPhoneNo] = useState('+62 22 7564 8899');
  const [faxNo, setFaxNo] = useState('');

  // Contact Book
  const [personToContact, setPersonToContact] = useState('Bpk. Hendra Gunawan');
  const [positionInCompany, setPositionInCompany] = useState('Procurement Manager');
  const [contactPhone, setContactPhone] = useState('+62 812 3456 7890');
  const [contactFax, setContactFax] = useState('');
  const [contactEmail, setContactEmail] = useState('purchasing@bojongsantos.co.id');
  const [salutation, setSalutation] = useState('Mr');

  // Process Finder Search input (Step 0)
  const [searchFinderInput, setSearchFinderInput] = useState('Business Partner');

  // Save State
  const [isSaved, setIsSaved] = useState(false);
  const [savedBpId, setSavedBpId] = useState<string | null>(null);

  const currentStep = module.steps[activeStepIndex] || module.steps[0];

  const handleSaveBP = () => {
    setSavedBpId('18573');
    setIsSaved(true);
    onStepChange(5); // Jump to Save confirmation step
  };

  const handleNextStep = () => {
    if (activeStepIndex < module.steps.length - 1) {
      onStepChange(activeStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (activeStepIndex > 0) {
      onStepChange(activeStepIndex - 1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Dynamic Module Header Card synced with active step */}
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

          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{currentStep.stepNumber}. {currentStep.title}</span>
            {currentStep.requiredFields && currentStep.requiredFields.length > 0 && (
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-bold">
                Mandatory Fields (*)
              </span>
            )}
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

        {/* Step Navigation Controls (Prev / Next Step) */}
        <div className="flex items-center gap-2 shrink-0">
          {activeStepIndex > 0 && (
            <button
              onClick={handlePrevStep}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer border border-slate-700/60"
            >
              ← Step Sebelumnya
            </button>
          )}

          {activeStepIndex < module.steps.length - 1 ? (
            <button
              onClick={handleNextStep}
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

      {/* STEP 0: Process Finder Simulation View */}
      {activeStepIndex === 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-400 flex items-center justify-center mx-auto border border-blue-500/30 shadow-lg">
              <Search className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Simulasi Process Finder Datatex NOW</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg mx-auto">
                Ketik <strong>"Business Partner"</strong> lalu klik tombol <strong>"+ New Partner"</strong> di pojok kiri atas untuk membuka form master rekanan.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 text-left shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <button
                  onClick={() => onStepChange(1)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition cursor-pointer ring-2 ring-blue-400/40 animate-pulse"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ New Partner</span>
                </button>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Process Finder Toolbar
                </span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Ketik nama modul di Process Finder:
                </label>
                <div className="flex items-center gap-3 bg-slate-950 border border-blue-500/50 rounded-xl px-4 py-2.5">
                  <Search className="w-4 h-4 text-blue-400 shrink-0" />
                  <input
                    type="text"
                    value={searchFinderInput}
                    onChange={(e) => setSearchFinderInput(e.target.value)}
                    className="bg-transparent text-sm text-white font-mono font-semibold w-full focus:outline-none"
                  />
                  <span className="text-[10px] font-mono bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded shrink-0 border border-blue-500/30">
                    Found 1 Collection
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800">
                <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Hasil: Collection Business Partner siap dibuka
                </span>
                <button
                  onClick={() => onStepChange(1)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition cursor-pointer flex items-center gap-1.5"
                >
                  <span>Buka Form Cue Card Base →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEPS 1 s/d 5: Datatex NOW Master Window with Live Tab Synchronization */}
      {activeStepIndex > 0 && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          {/* Datatex Top Window Bar */}
          <div className="bg-slate-900 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                Business partner | Business partners
              </span>
              <span className="text-slate-400">Other functions ▾</span>
              <span className="text-blue-400 font-mono">AddressGST</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveBP}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow transition cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
              <span className="text-slate-400 font-mono text-[11px] hidden sm:inline">
                Licensed to : PT Gistex
              </span>
            </div>
          </div>

          {/* Form Body: Left Collection List + Right Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
            {/* Left Column: Recent Collection Table */}
            <div className="border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950 p-3 space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Search name
              </div>
              <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-2.5 py-1.5 rounded-lg text-xs">
                <Search className="w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  readOnly
                  value="bojongsantos"
                  className="bg-transparent text-slate-200 text-xs w-full focus:outline-none font-mono"
                />
              </div>

              <div className="pt-2">
                <div className="text-[10px] text-slate-400 uppercase font-mono mb-1">Recent Collection:</div>
                <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/40 text-xs text-blue-200 flex flex-col gap-0.5">
                  <span className="font-mono font-bold text-white">BOJONGSANTOS</span>
                  <span className="text-[11px] text-slate-300">PT. Bojongsantos</span>
                </div>
              </div>

              {/* Contextual Guidance Callout */}
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div className="font-bold text-slate-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Tips Navigasi:
                </div>
                <p>
                  Klik tab di atas (<strong>Base</strong>, <strong>Base2</strong>, <strong>Address</strong>, <strong>Contact book</strong>) untuk berpindah langsung ke langkah form yang diinginkan.
                </p>
              </div>
            </div>

            {/* Right Column: Tab View */}
            <div className="lg:col-span-3 p-5 space-y-5 bg-slate-900/40">
              {/* Tabs Bar */}
              <div className="flex items-center gap-2 border-b border-slate-800 pb-2 flex-wrap">
                {(['Base', 'Base2', 'Address', 'Contact book'] as const).map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => handleSelectTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 ring-1 ring-blue-400/40'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      <span>{tab}</span>
                      {(tab === 'Base' || tab === 'Address') && (
                        <span className="text-red-400 font-black">*</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: BASE */}
              {activeTab === 'Base' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 items-center">
                    <label className="text-slate-400">Number id</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        readOnly
                        value={numberId}
                        className="bg-slate-950/60 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-400 font-mono w-44"
                      />
                    </div>

                    <label className="text-slate-300">Origin information type</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={originInfoType}
                        onChange={(e) => setOriginInfoType(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64 focus:border-blue-500 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">End date</label>
                    <div className="md:col-span-2">
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-44"
                      />
                    </div>

                    <label className="text-slate-400">Substitute</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={substitute}
                        onChange={(e) => setSubstitute(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-44 font-mono"
                      />
                    </div>

                    {/* *Legal Name (MANDATORY) */}
                    <label className="text-white font-bold flex items-center gap-1">
                      <span className="text-red-400 font-black">*</span>
                      <span>Legal Name</span>
                    </label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={legalName}
                        onChange={(e) => setLegalName(e.target.value)}
                        className="bg-blue-950/30 border border-blue-500/70 rounded-lg px-3 py-1.5 text-white font-semibold w-full max-w-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>

                    <label className="text-slate-400">Legal surname</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={legalSurname}
                        onChange={(e) => setLegalSurname(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64"
                      />
                    </div>

                    <label className="text-slate-300">Short name</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">Search name</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64"
                      />
                    </div>

                    <label className="text-slate-400">Group</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-44 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">Is sundry</label>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isSundry}
                        onChange={(e) => setIsSundry(e.target.checked)}
                        className="w-4 h-4 rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
                      />
                      <span className="text-[11px] text-slate-400">Check jika customer non-reguler</span>
                    </div>

                    {/* *Fiscal type (MANDATORY) */}
                    <label className="text-white font-bold flex items-center gap-1">
                      <span className="text-red-400 font-black">*</span>
                      <span>Fiscal type</span>
                    </label>
                    <div className="md:col-span-2">
                      <select
                        value={fiscalType}
                        onChange={(e) => setFiscalType(e.target.value)}
                        className="bg-blue-950/30 border border-blue-500/70 rounded-lg px-3 py-1.5 text-white w-52 focus:outline-none"
                      >
                        <option value="01">01 - Standar PKP</option>
                        <option value="02">02 - Non PKP</option>
                        <option value="03">03 - Kawasan Berikat</option>
                      </select>
                    </div>

                    {/* *Fiscal code (MANDATORY) */}
                    <label className="text-white font-bold flex items-center gap-1">
                      <span className="text-red-400 font-black">*</span>
                      <span>Fiscal code</span>
                    </label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={fiscalCode}
                        onChange={(e) => setFiscalCode(e.target.value)}
                        className="bg-blue-950/30 border border-blue-500/70 rounded-lg px-3 py-1.5 text-white font-mono w-64 focus:outline-none"
                      />
                    </div>

                    <label className="text-slate-300">Tax registration number</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={taxRegNo}
                        onChange={(e) => setTaxRegNo(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white font-mono w-64"
                      />
                    </div>

                    <label className="text-slate-400">EORI Code</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={eoriCode}
                        onChange={(e) => setEoriCode(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: BASE2 */}
              {activeTab === 'Base2' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 items-center">
                    <label className="text-slate-400">Gender</label>
                    <div className="md:col-span-2">
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-44"
                      >
                        <option value="N/A">N/A</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <label className="text-slate-400">Birth date</label>
                    <div className="md:col-span-2">
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-44"
                      />
                    </div>

                    <label className="text-slate-400">Birth country</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        placeholder="Pilih negara..."
                        value={birthCountry}
                        onChange={(e) => setBirthCountry(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64"
                      />
                    </div>

                    <label className="text-slate-400">Nationality</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        placeholder="Kewarganegaraan..."
                        value={nationality}
                        onChange={(e) => setNationality(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ADDRESS */}
              {activeTab === 'Address' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 items-center">
                    {/* *Country (MANDATORY) */}
                    <label className="text-white font-bold flex items-center gap-1">
                      <span className="text-red-400 font-black">*</span>
                      <span>Country</span>
                    </label>
                    <div className="md:col-span-2 flex items-center gap-2">
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="bg-blue-950/30 border border-blue-500/70 rounded-lg px-3 py-1.5 text-white w-64 focus:outline-none"
                      >
                        <option value="ID - INDONESIA">ID - INDONESIA</option>
                        <option value="US - UNITED STATES">US - UNITED STATES</option>
                        <option value="SG - SINGAPORE">SG - SINGAPORE</option>
                      </select>
                      <span className="text-red-400 text-xs font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Wajib
                      </span>
                    </div>

                    <label className="text-slate-400">Transport zone</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={transportZone}
                        onChange={(e) => setTransportZone(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64"
                      />
                    </div>

                    <label className="text-slate-300">Phone number</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">Fax number</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={faxNo}
                        onChange={(e) => setFaxNo(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: CONTACT BOOK */}
              {activeTab === 'Contact book' && (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-4 items-center">
                    <label className="text-slate-300">Person to contact</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={personToContact}
                        onChange={(e) => setPersonToContact(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64"
                      />
                    </div>

                    <label className="text-slate-300">Position in the company</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={positionInCompany}
                        onChange={(e) => setPositionInCompany(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64"
                      />
                    </div>

                    <label className="text-slate-300">Phone number</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-64 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">Fax number</label>
                    <div className="md:col-span-2">
                      <input
                        type="text"
                        value={contactFax}
                        onChange={(e) => setContactFax(e.target.value)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 w-64 font-mono"
                      />
                    </div>

                    <label className="text-slate-300">@ mail</label>
                    <div className="md:col-span-2">
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-72 font-mono"
                      />
                    </div>

                    <label className="text-slate-400">Ms/Mrs/Mr</label>
                    <div className="md:col-span-2">
                      <select
                        value={salutation}
                        onChange={(e) => setSalutation(e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-white w-32"
                      >
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Saved Notification */}
              {isSaved && (
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between text-xs text-emerald-300 animate-fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>
                      Business Partner berhasil disimpan! Nomor ID Terbit: <strong>BP-{savedBpId}</strong>
                    </span>
                  </div>
                  <span className="font-mono bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">
                    DATA OK
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
