import { ModularTourProject } from './types';

export const STARTER_MODULAR_TOURS: ModularTourProject[] = [
  {
    id: 'saas-web-tour',
    title: 'Modern Web SaaS & ERP Onboarding Tour',
    subtitle: 'Template tour aplikasi web modern dengan pencarian command palette, form cue cards, dan modal konfirmasi',
    themeColor: 'blue',
    steps: [
      {
        id: 'swt-1',
        stepNumber: 1,
        title: 'Cari Modul di Command Palette',
        subtitle: 'Simulasi auto-type search bar dan dropdown menu',
        instructionBubble: 'Ketik "Analytics Dashboard" di command palette lalu pilih opsi pertama.',
        widgetType: 'search-dropdown',
        widgetData: {
          searchQuery: 'Analytics Dashboard',
          dropdownOptions: [
            'Analytics Dashboard (Executive View)',
            'Analytics Settings & Custom Rules',
            'Export Analytics Data CSV',
          ],
          activeOptionIndex: 0,
        },
        tips: ['Bisa dibuka via keyboard shortcut Ctrl + K.']
      },
      {
        id: 'swt-2',
        stepNumber: 2,
        title: 'Verifikasi Form & Kolom Mandatory (*)',
        subtitle: 'Highlight field wajib diisi dan tabs form',
        instructionBubble: 'Perhatikan kolom bertanda bintang (*) merah yang wajib dilengkapi sebelum simpan.',
        widgetType: 'form-tabs',
        widgetData: {
          formTabs: ['Base', 'Financial', 'Address', 'Contact'],
          sampleEntityName: 'PT. Bojongsantos Industry',
          mandatoryFields: ['Legal Name', 'Fiscal Type'],
        },
        tips: ['Kolom bertanda bintang merah tidak boleh kosong.']
      },
      {
        id: 'swt-3',
        stepNumber: 3,
        title: 'Konfirmasi Persetujuan Data',
        subtitle: 'Modal dialog konfirmasi pemahaman user',
        instructionBubble: 'Klik tombol konfirmasi untuk memvalidasi pemahaman alur kerja.',
        widgetType: 'dialog-modal',
        widgetData: {
          modalTitle: 'Konfirmasi Data Modul',
          modalMessage: 'Pastikan nama entitas dan kode fiskal telah sesuai sebelum rilis ke sistem produksi.',
          confirmBtnText: 'Ya, Data Sudah Valid!',
        },
        tips: ['Setelah diconfirm, dokumen siap diproses ke divisi terkait.']
      }
    ]
  },
  {
    id: 'software-install-tour',
    title: 'Software & Server Installation Wizard',
    subtitle: 'Langkah instalasi bertahap: System requirement checklist, license agreement, hingga file extraction',
    themeColor: 'emerald',
    steps: [
      {
        id: 'sit-1',
        stepNumber: 1,
        title: 'System Requirements & License',
        subtitle: 'Pengecekan prasyarat OS, memori, dan persetujuan syarat',
        instructionBubble: 'Centang checkbox persetujuan lisensi untuk melanjutkan proses wizard.',
        widgetType: 'wizard-checklist',
        widgetData: {
          checklistItems: [
            'Sistem Operasi Windows 11 / Linux Compatible',
            'RAM Tersedia Minimal 4GB (Terdeteksi 16GB)',
            'Storage Kosong Minimal 10GB',
          ],
          licenseText: 'Saya menyetujui seluruh ketentuan lisensi software Guide.In Platform.',
        },
        tips: ['Pastikan hak akses administrator diizinkan di komputer ini.']
      },
      {
        id: 'sit-2',
        stepNumber: 2,
        title: 'Extracting Package Files',
        subtitle: 'Simulasi ekstrak komponen aplikasi dan library',
        instructionBubble: 'Tunggu progress bar ekstrak file instalasi mencapai 100%.',
        widgetType: 'progress-extractor',
        widgetData: {
          progressLabel: 'Uncompressing Engine & Assets...',
          targetPercent: 100,
        },
        tips: ['Proses instalasi biasanya berlangsung kurang dari 1 menit.']
      },
      {
        id: 'sit-3',
        stepNumber: 3,
        title: 'Instalasi Selesai!',
        subtitle: 'Aplikasi siap dijalankan',
        instructionBubble: 'Klik tombol Launch untuk membuka aplikasi untuk pertama kali.',
        widgetType: 'dialog-modal',
        widgetData: {
          modalTitle: 'Instalasi Berhasil Tuntas!',
          modalMessage: 'GuideIn Platform telah berhasil terpasang di sistem operasi Anda.',
          confirmBtnText: 'Launch Application 🚀',
        },
        tips: ['Shortcut telah otomatis dibuat di desktop.']
      }
    ]
  },
  {
    id: 'terminal-dev-tour',
    title: 'Developer Terminal CLI Step-by-Step',
    subtitle: 'Panduan terminal konsol interaktif dengan pengetikan perintah shell dan eksekusi command',
    themeColor: 'indigo',
    steps: [
      {
        id: 'tdt-1',
        stepNumber: 1,
        title: 'Clone Project Repository',
        subtitle: 'Mengunduh source code dari git',
        instructionBubble: 'Klik tombol "Run" untuk mengeksekusi git clone repository.',
        widgetType: 'terminal-cli',
        widgetData: {
          commandString: 'git clone https://github.com/company/guide-in-project.git',
          terminalOutputLog: 'Cloning into guide-in-project... 100% done.',
        },
        tips: ['Pastikan Git sudah terpasang di komputer Anda.']
      },
      {
        id: 'tdt-2',
        stepNumber: 2,
        title: 'Install Dependencies',
        subtitle: 'Mengunduh library via package manager',
        instructionBubble: 'Jalankan npm install untuk memasang semua modul pendukung.',
        widgetType: 'terminal-cli',
        widgetData: {
          commandString: 'npm install --prefer-offline',
          terminalOutputLog: 'added 2555 packages in 3.4s. Found 0 vulnerabilities.',
        },
        tips: ['Gunakan Node.js versi 18 atau 20 LTS.']
      },
      {
        id: 'tdt-3',
        stepNumber: 3,
        title: 'Start Local Development Server',
        subtitle: 'Menjalankan server Vite di localhost',
        instructionBubble: 'Ketik npm run dev untuk membuka preview aplikasi.',
        widgetType: 'terminal-cli',
        widgetData: {
          commandString: 'npm run dev',
          terminalOutputLog: 'VITE v6.4.6 ready in 180 ms. Local: http://localhost:5173/',
        },
        tips: ['Buka browser di http://localhost:5173']
      }
    ]
  }
];
