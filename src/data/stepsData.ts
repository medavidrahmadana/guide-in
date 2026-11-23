import { WorkflowStep } from '../types/workflow';

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 'business-partner',
    stepNumber: 1,
    title: 'Business Partner (BP)',
    subtitle: 'Legal Entity & Tax Information',
    code: 'BP',
    description: 'Pendaftaran badan hukum rekanan bisnis (Customer/Vendor), nomor NPWP, status fiskal, dan alamat legal.',
    presentationScript: {
      narrative: 'Tahap 1 dimulai dari pembuatan Business Partner (BP). Data legalitas wajib valid seperti NPWP dan status pajak agar transaksi compliant.',
      tips: [
        'NPWP wajib 16 digit format baru.',
        'BP adalah master legal induk sebelum dihubungkan ke Order Partner (OP).'
      ]
    }
  },
  {
    id: 'order-partner',
    stepNumber: 2,
    title: 'Order Partner (OP)',
    subtitle: 'Commercial Account & Credit Policy',
    code: 'OP',
    description: 'Konfigurasi akun operasional penjualan: mata uang, limit kredit, toggle Order Allowed, dan masa berlaku kredit.',
    presentationScript: {
      narrative: 'Step 2 Order Partner (OP): Di sinilah relasi komersial ditentukan. Pastikan Order Allowed dicentang dan End Credit Date masih aktif!',
      tips: [
        'Toggle [Order Allowed] harus checked agar sales order bisa diinput.',
        'Perhatikan End Credit Date agar PO tidak terblokir limit kredit.'
      ]
    }
  },
  {
    id: 'open-order',
    stepNumber: 3,
    title: 'Open Order (Template 120)',
    subtitle: 'Capacity Booking & Greige Spec',
    code: '120',
    description: 'Booking kapasitas produksi dengan spek kain (Design, Chop, GSM, Finish) tanpa shade spesifik via compile Item Code (→).',
    presentationScript: {
      narrative: 'Template 120 digunakan untuk booking kuota sebelum warna final fix. Klik tombol panah kanan (→) untuk meng-compile kode item otomatis.',
      tips: [
        'Belum memerlukan kode warna/shade definitif.',
        'Gunakan tombol compiler (→) untuk standardisasi penamaan item Datatex.'
      ]
    }
  },
  {
    id: 'order-evolution',
    stepNumber: 4,
    title: 'Order Evolution',
    subtitle: 'Derivation from 120 to 001',
    code: 'EVO',
    description: 'Penurunan Open Order (120) menjadi Sales Order Definitif (001). Pengaturan Partial (PRE.USED) vs Full (CLOSED) Qty dan Cross-Customer.',
    presentationScript: {
      narrative: 'Order Evolution menjembatani kuota 120 ke order riil 001. Jika dievolusi sebagian status menjadi PRE.USED, jika penuh berubah CLOSED.',
      tips: [
        'Mendukung Same Customer atau Cross-Customer (garment partner).',
        'Cek sisa kuota yang belum diturunkan.'
      ]
    }
  },
  {
    id: 'confirm-order',
    stepNumber: 5,
    title: 'Confirm Order (Template 001)',
    subtitle: 'Definitive Sales Order & Shade Code',
    code: '001',
    description: 'Finalisasi sales order dengan penentuan kode warna/shade lab-dip definitif, jadwal delivery pasti, dan rilis ke produksi/gudang.',
    presentationScript: {
      narrative: 'Di Template 001, warna spesifik (shade code) dimasukkan secara resmi dan pesanan siap dieksekusi bagian produksi dan warehouse.',
      tips: [
        'Shade code harus sudah terdaftar di sistem Lab/Recipe.',
        'Status order berubah menjadi CONFIRMED dan siap alokasi.'
      ]
    }
  },
  {
    id: 'stock-picking',
    stepNumber: 6,
    title: 'Stock & Picking Simulation',
    subtitle: 'Doc 09 & Doc 11 Workflow',
    code: 'DOC 09/11',
    description: 'Alokasi stok kain jadi di gudang 311WFF01, penerbitan Picking Creator (Doc 09), hingga eksekusi Picking Confirmation (Doc 11).',
    presentationScript: {
      narrative: 'Langkah terakhir adalah pemenuhan pesanan dari gudang 311WFF01 menggunakan alur Doc 09 (Picking List) dan konfirmasi akhir Doc 11.',
      tips: [
        'Doc 09: Instruksi ambil barang untuk picker gudang.',
        'Doc 11: Realisasi nomor roll dan yardase aktual yang keluar.'
      ]
    }
  }
];
