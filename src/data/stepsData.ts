import { TrainingModule } from '../types/workflow';

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: 'business-partner',
    menuNumber: 1,
    code: 'BP',
    title: 'Business Partner (BP)',
    subtitle: 'Registrasi Master Partner Legal',
    iconName: 'Building2',
    pdfDocRef: '02_GTX.TM.BP-OP-CUST.V1.0.ID.pdf (Hal 5-9)',
    description: 'Pendaftaran badan hukum rekanan bisnis (Customer/Vendor) dengan identifikasi resmi, NPWP, alamat kantor, kontak, dan alamat pengiriman.',
    steps: [
      {
        stepId: 'bp-step-1',
        stepNumber: 1,
        title: 'Process Finder & Buat Baru',
        cueCardName: 'Process Finder → New Partner',
        summary: 'Cari modul Business Partner di Process Finder, buka collection, lalu klik tombol "+ New Partner".',
        requiredFields: [],
        tips: [
          'Process Finder adalah kotak pencarian modul global di Datatex NOW.',
          'Klik New Partner untuk membuka form master entitas legal baru.'
        ],
        presentationNarrative: 'Langkah pertama adalah membuka Process Finder, cari "Business Partner", lalu klik tombol "+ New Partner" untuk membuka form pendaftaran baru.'
      },
      {
        stepId: 'bp-step-2',
        stepNumber: 2,
        title: 'Cue Card: Base',
        cueCardName: 'Base (Identitas Legal & Pajak)',
        summary: 'Mengisi data legal: *Legal Name, Short name, *Fiscal type (Default 01), dan *Fiscal code (NPWP).',
        requiredFields: ['*Legal Name', '*Fiscal type', '*Fiscal code'],
        tips: [
          '*Legal Name, *Fiscal type, dan *Fiscal code adalah kolom MANDATORY (Wajib diisi).',
          'Fiscal type default bernilai 01 (Standar PKP).',
          'Jika ada pergantian nama partner lama, gunakan field End date dan pilih Substitute partner baru.'
        ],
        presentationNarrative: 'Pada tab Base, lengkapi field Mandatory: *Legal Name, *Fiscal type (01), dan *Fiscal code (NPWP 16 digit).'
      },
      {
        stepId: 'bp-step-3',
        stepNumber: 3,
        title: 'Cue Card: Base2',
        cueCardName: 'Base2 (Biodata / Natural Person)',
        summary: 'Melengkapi informasi opsional seperti Gender (N/A), Birth date, Birth country, dan Nationality.',
        requiredFields: [],
        tips: [
          'Tab Base2 digunakan jika rekanan bisnis merupakan individu perorangan (Natural Person).',
          'Untuk badan usaha berbadan hukum (PT/CV), field ini dapat dibiarkan default N/A.'
        ],
        presentationNarrative: 'Lanjut ke tab Base2 untuk pengisian data pelengkap individu jika partner merupakan perorangan, atau biarkan default N/A.'
      },
      {
        stepId: 'bp-step-4',
        stepNumber: 4,
        title: 'Cue Card: Address',
        cueCardName: 'Address (Alamat Kantor & *Country)',
        summary: 'Memilih *Country (Mandatory), Transport zone, Phone number, dan Fax number.',
        requiredFields: ['*Country'],
        tips: [
          '*Country wajib diisi! Sistem akan menolak simpan jika Country kosong.',
          'Format penulisan nomor telepon wajib menyertakan kode area/negara.'
        ],
        presentationNarrative: 'Pada tab Address, *Country wajib dipilih (misal ID - INDONESIA) agar zona pengiriman dan perpajakan terdefinisi.'
      },
      {
        stepId: 'bp-step-5',
        stepNumber: 5,
        title: 'Cue Card: Contact book',
        cueCardName: 'Contact book (PIC & Document Mail)',
        summary: 'Mendaftarkan PIC (Person to contact, Position, Phone, Email) dan dokumen mail otomatis.',
        requiredFields: [],
        tips: [
          'Pilih jenis dokumen (Sales open order, Sales order) yang akan otomatis dikirimkan via email ke PIC.',
          'Bisa menambahkan lebih dari 1 kontak jika diperlukan.'
        ],
        presentationNarrative: 'Di Contact book, daftarkan PIC dan tentukan dokumen apa saja yang akan otomatis terkirim via email ke PIC rekanan.'
      },
      {
        stepId: 'bp-step-6',
        stepNumber: 6,
        title: 'Simpan & Generate BP ID',
        cueCardName: 'Toolbar Save & ID Assignment',
        summary: 'Klik tombol Save di toolbar atas. Sistem menerbitkan nomor ID BP otomatis (contoh: BP-18573).',
        requiredFields: [],
        tips: [
          'Catat BP ID yang terbit untuk digunakan pada modul berikutnya (Order Partner).',
          'Status data kini tersimpan dan siap divalidasi tim komersial.'
        ],
        presentationNarrative: 'Terakhir, klik tombol Save di toolbar atas. Sistem Datatex NOW akan memvalidasi field mandatory dan menerbitkan BP ID otomatis.'
      }
    ]
  },
  {
    id: 'order-partner',
    menuNumber: 2,
    code: 'OP',
    title: 'Order Partner (OP Customer)',
    subtitle: 'Akun Komersial & Kebijakan Kredit',
    iconName: 'Users',
    pdfDocRef: '02_GTX.TM.BP-OP-CUST.V1.0.ID.pdf (Hal 10-14)',
    description: 'Menghubungkan BP ke akun transaksi komersial: Company login 200, mata uang, Payment Terms, toggle Order Allowed [✓], dan State wajib.',
    steps: [
      {
        stepId: 'op-step-1',
        stepNumber: 1,
        title: 'Process Finder & Pemilihan Company',
        cueCardName: 'Process Finder → Order Partner',
        summary: 'Buka Process Finder, pilih Order Partner, klik New. Pastikan Company = 200, tipe Customer, dan isi SAP Code manual.',
        requiredFields: ['Company (200)', 'Order Partner Type', 'SAP Code'],
        tips: [
          'Company login Gistex Indonesia adalah 200.',
          'Pilih tipe Customer (atau Supplier jika modul pembelian).'
        ],
        presentationNarrative: 'Buka menu Order Partner di Process Finder, klik New, pastikan company 200 terpilih, masukkan SAP Code referensi, lalu klik Next.'
      },
      {
        stepId: 'op-step-2',
        stepNumber: 2,
        title: 'Cue Card Base: Link ke BP & Mata Uang',
        cueCardName: 'Cue Card Base',
        summary: 'Tautkan BP ID dari Lookup, tetapkan Currency (IDR/USD), Bahasa, dan Payment Method default.',
        requiredFields: ['Business Partner ID', 'Currency', 'Payment Method'],
        tips: [
          'Pilih Business Partner yang telah kita buat pada Menu 1.',
          'Payment method menentukan alur termin pembayaran di Sales Order.'
        ],
        presentationNarrative: 'Pada Cue Card Base, sambungkan akun komersial ini ke master BP terkait, lalu tentukan Currency dan metode pembayarannya.'
      },
      {
        stepId: 'op-step-3',
        stepNumber: 3,
        title: 'Cue Card Base2: Order Allowed & Terms',
        cueCardName: 'Cue Card Base2',
        summary: 'Centang checkbox [Order Allowed], atur Terms of Delivery dan Terms of Shipping default.',
        requiredFields: ['Order Allowed'],
        tips: [
          'PERHATIAN: Checkbox [Order Allowed] WAJIB DICENTANG agar customer diizinkan membuat SO.',
          'Terms of delivery dan shipping akan otomatis ditarik sebagai default saat input SO.'
        ],
        presentationNarrative: 'Di Cue Card Base2, toggle penting [Order Allowed] berfungsi sebagai otorisasi pemesanan. Pastikan dicentang agar pesanan tidak ditolak sistem!'
      },
      {
        stepId: 'op-step-4',
        stepNumber: 4,
        title: 'Cue Card Base3 & Simpan Kode Customer',
        cueCardName: 'Cue Card Base3 → Save',
        summary: 'Pilih State dari Lookup (kolom wajib). Klik Save, dan sistem akan meng-generate Kode Customer otomatis (C0000036).',
        requiredFields: ['State (Provinsi/Wilayah)'],
        tips: [
          'PERINGATAN DOKUMEN: Field "State" wajib diisi! Data ditolak simpan jika kosong.',
          'Setelah klik Save, nomor Customer resmi berawalan "C..." akan terbentuk.'
        ],
        presentationNarrative: 'Langkah terakhir, buka Base3 dan pilih State. Jangan lupa field State wajib diisi! Klik Save dan kode Customer (contoh: C0000036) resmi terbit.'
      }
    ]
  },
  {
    id: 'open-order',
    menuNumber: 3,
    code: '120',
    title: 'Open Order (Template 120)',
    subtitle: 'Booking Kapasitas & Spek Greige',
    iconName: 'FileText',
    pdfDocRef: '04_GTX.TM.SO-OPEN-CONFIRM.V1.0.ID.pdf (Hal 5-13)',
    description: 'Booking kapasitas produksi tanpa shade definitif. Mengisi spek kain dan simulasi kompilasi Item Code dengan tombol panah (→).',
    steps: [
      {
        stepId: 'oo-step-1',
        stepNumber: 1,
        title: 'Pilih Template 120 & Header SO',
        cueCardName: 'Header Base (Template 120)',
        summary: 'Pilih Order Template 120 (Open Order), pilih Order Partner Customer, tentukan tanggal order dan estimasi kirim.',
        requiredFields: ['Order Template (120)', 'Customer Code', 'Order Date'],
        tips: [
          'Template 120 digunakan untuk booking kuota sebelum warna final fix dari buyer.'
        ],
        presentationNarrative: 'Pada modul Open Order, pilih Template 120. Masukkan Customer dan tanggal order untuk mengamankan slot kapasitas produksi.'
      },
      {
        stepId: 'oo-step-2',
        stepNumber: 2,
        title: 'Input Spek Kain (Design & Chop)',
        cueCardName: 'Line Order - Greige Spec',
        summary: 'Input parameter kain mentah: Design, Chop, GSM, Finish Type, Lebar, dan Satuan (Yards/Meter).',
        requiredFields: ['Design', 'Chop', 'GSM', 'Finish', 'Width'],
        tips: [
          'Open Order belum membutuhkan kode shade/warna definitif lab-dip.'
        ],
        presentationNarrative: 'Masukkan spesifikasi kain greige: Design, nomor Chop, gramasi GSM, dan lebar kain yang akan dibooking.'
      },
      {
        stepId: 'oo-step-3',
        stepNumber: 3,
        title: 'Kompilasi Item Code via Panah Kanan (→)',
        cueCardName: 'Interactive Item Compiler',
        summary: 'Klik tombol panah kanan (→) untuk meng-compile kombinasi spek menjadi kode barang Datatex terstandar.',
        requiredFields: ['Compiled Item Code'],
        tips: [
          'Tombol (→) menggabungkan Design + Chop + Finish secara otomatis ke format kode material pabrik.'
        ],
        presentationNarrative: 'Gunakan fitur compiler tombol (→) untuk merakit kode item secara presisi tanpa takut salah ketik manual.'
      },
      {
        stepId: 'oo-step-4',
        stepNumber: 4,
        title: 'Booking Qty & Simpan Open Order',
        cueCardName: 'Quantity & Save',
        summary: 'Tentukan kuota yardase booking, klik Save. SO Template 120 berstatus OPEN siap diturunkan ke order definitif.',
        requiredFields: ['Booked Quantity'],
        tips: [
          'Status pesanan menjadi OPEN dengan nomor SO berawalan kuota booking.'
        ],
        presentationNarrative: 'Ketik jumlah quantity booking dan simpan. Dokumen SO 120 berstatus OPEN berhasil diterbitkan.'
      }
    ]
  },
  {
    id: 'order-evolution',
    menuNumber: 4,
    code: 'EVO',
    title: 'Order Evolution',
    subtitle: 'Derivasi 120 ➔ 001',
    iconName: 'GitFork',
    pdfDocRef: '04_GTX.TM.SO-OPEN-CONFIRM.V1.0.ID.pdf (Hal 14-21)',
    description: 'Menurunkan kuota booking Open Order (120) menjadi Sales Order Definitif (001). Mengatur Same Customer vs Cross-Customer serta Partial vs Full Qty.',
    steps: [
      {
        stepId: 'evo-step-1',
        stepNumber: 1,
        title: 'Inisiasi Derivation / Evolution',
        cueCardName: 'SO Evolution Launcher',
        summary: 'Buka fungsi Evolution dari SO 120. Masukkan target Template 001 (Confirm Order).',
        requiredFields: ['Target Template (001)', 'Source SO Number'],
        tips: [
          'Derivation menjaga traceability antara kuota awal dengan order nyata.'
        ],
        presentationNarrative: 'Mulai proses Order Evolution untuk menurunkan kuota booking 120 menjadi order definitif template 001.'
      },
      {
        stepId: 'evo-step-2',
        stepNumber: 2,
        title: 'Mode Customer: Same vs Cross-Customer',
        cueCardName: 'Customer Mapping',
        summary: 'Pilih apakah order diturunkan ke buyer yang sama (Same Customer) atau ke vendor garment mitra (Cross-Customer).',
        requiredFields: ['Evolution Customer Mode'],
        tips: [
          'Cross-Customer sering digunakan saat brand menunjuk vendor garmen pihak ketiga untuk eksekusi PO.'
        ],
        presentationNarrative: 'Tentukan mode partner: Same Customer jika langsung, atau Cross-Customer jika order dialihkan ke rekanan garmen.'
      },
      {
        stepId: 'evo-step-3',
        stepNumber: 3,
        title: 'Alokasi Qty: PRE.USED vs CLOSED',
        cueCardName: 'Line Evolution & Status Transition',
        summary: 'Pilih delivery line SO 120, isi Qty yang diturunkan. Jika sebagian status jadi PRE.USED, jika penuh berubah CLOSED.',
        requiredFields: ['Evolution Qty'],
        tips: [
          'Partial Qty: Sisa saldo kuota masih bisa diturunkan lagi nanti (Status PRE.USED).',
          'Full Qty: Kuota booking 120 habis sepenuhnya dan otomatis ditutup (Status CLOSED).'
        ],
        presentationNarrative: 'Atur quantity penurunan baris. Sistem otomatis memperbarui status kuota menjadi PRE.USED untuk parsial, atau CLOSED jika habis penuh.'
      }
    ]
  },
  {
    id: 'confirm-order',
    menuNumber: 5,
    code: '001',
    title: 'Confirm Order (Template 001)',
    subtitle: 'Warna Definitif & Rilis Produksi',
    iconName: 'CheckCircle',
    pdfDocRef: '05_GTX.TM.SO-CONFIRM.V1.0.ID.pdf',
    description: 'Finalisasi sales order dengan penentuan shade/warna lab-dip spesifik, harga final, dan rilis status menjadi CONFIRMED.',
    steps: [
      {
        stepId: 'co-step-1',
        stepNumber: 1,
        title: 'Verifikasi Detail Header 001',
        cueCardName: 'Confirm SO Header',
        summary: 'Cek kesesuaian customer, mata uang, dan tanggal pengiriman definitif pada Sales Order 001.',
        requiredFields: ['Target Delivery Date', 'Price List'],
        tips: [
          'Data turunan dari evolution akan otomatis terisi, cek kembali tanggal kirim pasti.'
        ],
        presentationNarrative: 'Periksa header Confirm Order template 001 untuk memastikan kesepakatan komersial dan jadwal kirim final.'
      },
      {
        stepId: 'co-step-2',
        stepNumber: 2,
        title: 'Input Shade Code / Resep Warna Lab',
        cueCardName: 'Color Line Definition',
        summary: 'Memilih kode warna spesifik dari master Color/Shade yang sudah lolos lab-dip approval buyer.',
        requiredFields: ['Shade Code', 'Color Name'],
        tips: [
          'Kain kini memiliki identitas warna definitif sehingga resep dyehouse dapat digenerate.'
        ],
        presentationNarrative: 'Masukkan shade code definitif. Di template 001 ini kain sudah memiliki resep warna pasti yang siap diproduksi atau dialokasi.'
      },
      {
        stepId: 'co-step-3',
        stepNumber: 3,
        title: 'Konfirmasi Order ke Produksi & Gudang',
        cueCardName: 'Order Release & Confirmation',
        summary: 'Klik tombol Confirm Order. Status dokumen berubah menjadi CONFIRMED dan siap untuk alokasi stok atau proses weaving/dyeing.',
        requiredFields: [],
        tips: [
          'Setelah confirm, pesanan masuk ke antrean alokasi stok gudang 311WFF01.'
        ],
        presentationNarrative: 'Klik Confirm untuk merilis SO 001. Pesanan resmi terkunci dan siap disuplai dari stok gudang kain jadi.'
      }
    ]
  },
  {
    id: 'stock-picking',
    menuNumber: 6,
    code: 'DOC 09/11',
    title: 'Stock & Picking Simulation',
    subtitle: 'Doc 09 (Creator) & Doc 11 (Confirm)',
    iconName: 'PackageCheck',
    pdfDocRef: '11_GTX.TM.SALES-PICKING.V1.0.ID.pdf',
    description: 'Simulasi alokasi stok kain jadi di gudang 311WFF01, penerbitan Picking Creator (Doc 09) hingga Picking Confirmation (Doc 11).',
    steps: [
      {
        stepId: 'sp-step-1',
        stepNumber: 1,
        title: 'Alokasi Stok Gudang 311WFF01',
        cueCardName: 'Warehouse Stock Allocation',
        summary: 'Pengecekan ketersediaan roll kain jadi di lokasi gudang 311WFF01 sesuai spesifikasi dan shade SO 001.',
        requiredFields: ['Warehouse Code (311WFF01)', 'Piece Identification'],
        tips: [
          '311WFF01 adalah gudang kain jadi (Finished Fabric Warehouse) PT Gistex.'
        ],
        presentationNarrative: 'Langkah pertama pemenuhan adalah memeriksa dan mengalokasikan fisik roll kain dari gudang 311WFF01.'
      },
      {
        stepId: 'sp-step-2',
        stepNumber: 2,
        title: 'Penerbitan Picking Creator (Doc 09)',
        cueCardName: 'Sales Picking Creation (Doc 09)',
        summary: 'Membuat dokumen instruksi ambil barang Doc 09 untuk tim logistik gudang.',
        requiredFields: ['Doc 09 Number', 'Assigned Picker'],
        tips: [
          'Doc 09 adalah picking list resmi berisi daftar nomor roll dan lokasi rak.'
        ],
        presentationNarrative: 'Terbitkan Sales Picking Creator (Doc 09) sebagai surat perintah kerja pengambilan roll di gudang.'
      },
      {
        stepId: 'sp-step-3',
        stepNumber: 3,
        title: 'Picking Confirmation (Doc 11) & Surat Jalan',
        cueCardName: 'Picking Confirmation (Doc 11)',
        summary: 'Konfirmasi yardase aktual yang diambil dan dicocokkan sebelum diterbitkan Surat Jalan / Shipping Definition.',
        requiredFields: ['Doc 11 Confirmation'],
        tips: [
          'Setelah Doc 11 diconfirm, stok fisik gudang resmi berkurang dan siap dikirim ke buyer.'
        ],
        presentationNarrative: 'Selesaikan alur dengan Sales Picking Confirmation (Doc 11). Seluruh alur penjualan tekstil di Datatex NOW tuntas sempurna!'
      }
    ]
  }
];
