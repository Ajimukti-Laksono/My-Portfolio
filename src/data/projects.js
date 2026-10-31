import batikKasirImg from "../assets/batik_kasir.png";
import batikNusantaraImg from "../assets/batik_nusantara.png";
import personalDashboardImg from "../assets/personal_dashboard.png";

// Desktop & Mobile Design Mockup Assets
import desktopDesignSystemImg from "../assets/design/desktop_design_system.svg";
import desktopApiPortalImg from "../assets/design/desktop_api_portal.svg";

import mobileBatikStoreImg from "../assets/design/mobile_batik_store.svg";
import mobileBatikPosImg from "../assets/design/mobile_batik_pos.svg";
import mobileDevPulseImg from "../assets/design/mobile_devpulse.svg";
import mobileCheckoutImg from "../assets/design/mobile_checkout.svg";
import mobileInventoryImg from "../assets/design/mobile_inventory.svg";
import mobileAnalyticsImg from "../assets/design/mobile_analytics.svg";

export const projectsData = [
  {
    id: 1,
    title: { 
      en: "Personal Project Dashboard - Real-Time GitHub Tracker", 
      id: "Personal Project Dashboard - Real-Time GitHub Tracker" 
    },
    description: {
      en: "A modern, responsive personal dashboard seamlessly integrated with GitHub in real-time via Server-Sent Events (SSE) and Webhooks. Automatically captures commits, Pull Requests, Issues, and CI/CD workflow runs without page refreshes. Features interactive commit analytics, language distribution charts, a 12-month contribution heatmap, and one-click GitHub webhook automation.\n\nKey Highlights:\n• Real-time GitHub events streaming via SSE\n• Dark & Light mode sleek dashboard UI\n• Multi-repo tracking & commit analytics\n• Actionable CI/CD with automated status monitoring",
      id: "Dashboard personal modern dan responsif yang terhubung langsung ke akun GitHub secara real-time via Server-Sent Events (SSE) & Webhooks. Menampilkan metrik aktivitas commit, PR, issue, dan status CI/CD otomatis tanpa refresh browser. Dilengkapi grafik analitik komit, diagram distribusi bahasa, heatmap kontribusi 12 bulan, dan otomasi setup webhook GitHub 1-klik.\n\nFitur Utama:\n• Streaming event GitHub real-time via SSE\n• Antarmuka UI modern Day & Night Mode\n• Pemantauan multi-repositori & analitik komit\n• Integrasi CI/CD interaktif dengan pemantauan status"
    },
    image: [personalDashboardImg],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Server-Sent Events", "Prisma", "SQLite", "Recharts", "GitHub Webhooks"],
    link: "https://github.com/Ajimukti-Laksono/Personal-Project-Dashboard",
    liveUrl: "https://personal-project-dashboard-xi.vercel.app",
    featured: true,
    client: { en: "Personal Featured Project", id: "Proyek Unggulan Pribadi" },
    results: {
      en: "Instant SSE updates, 100% automated Webhooks, Interactive Analytics & 12-Month Heatmap",
      id: "Update instan via SSE, Otomasi Webhook 100%, Analitik Interaktif & Heatmap 12 Bulan"
    },
    status: "completed"
  },
  {
    id: 2,
    title: { 
      en: "Batik Nusantara - Modern E-Commerce", 
      id: "Batik Nusantara - E-Commerce Modern" 
    },
    description: {
      en: "A cutting-edge e-commerce solution dedicated to preserving and marketing Indonesian Batik globally. This customer-facing platform is seamlessly connected to the Batik Nusantara POS system, ensuring that product availability, pricing, and order statuses are always synchronized in real-time.",
      id: "Solusi e-commerce mutakhir yang didedikasikan untuk memasarkan Batik Indonesia secara global. Platform ini terhubung secara langsung dengan sistem Kasir (POS) Batik Nusantara, memastikan bahwa ketersediaan stok, harga produk, dan status pesanan konsumen selalu tersinkronisasi secara real-time."
    },
    image: [batikNusantaraImg],
    tech: ["React.js", "Vite", "Tailwind CSS", "JavaScript ES6+", "Responsive Design"],
    link: "https://github.com/Ajimukti-Laksono/batik-nusantara",
    liveUrl: "https://batik-nusantara-nine.vercel.app/",
    featured: true,
    client: { en: "Personal Featured Project", id: "Proyek Unggulan Pribadi" },
    results: {
      en: "85% Increased user engagement, 95+ Lighthouse score, Mobile-First Optimization",
      id: "Peningkatan user engagement 85%, Lighthouse score 95+, Mobile-First Optimization"
    },
    status: "completed"
  },
  {
    id: 3,
    title: { 
      en: "Batik Nusantara Kasir - Intelligent POS System", 
      id: "Batik Nusantara Kasir - Sistem POS Cerdas" 
    },
    description: {
      en: "A modern Point of Sale system specifically designed for Batik shop operations. This system is fully integrated with the Batik Nusantara E-Commerce platform, acting as the central hub for real-time inventory management, order processing, and financial reporting across both physical and online stores.\n\nDemo Access:\nAdmin Email: admin@example.com\nPassword: password",
      id: "Sistem Kasir (Point of Sale) modern yang dirancang khusus untuk manajemen operasional toko Batik. Sistem ini terhubung sepenuhnya dengan platform E-Commerce Batik Nusantara, bertindak sebagai pusat kendali untuk sinkronisasi inventori real-time, pemrosesan pesanan, dan pelaporan keuangan baik untuk toko fisik maupun online.\n\nAkses Demo:\nAdmin Email: admin@example.com\nPassword: password"
    },
    image: [batikKasirImg],
    tech: ["React.js", "Vite", "Tailwind CSS", "Chart.js", "Dashboard UI"],
    link: "https://github.com/Ajimukti-Laksono/batik-kasir-frontend",
    liveUrl: "https://batik-kasir-frontend-aji.vercel.app/",
    featured: true,
    client: { en: "Digital Transformation Project", id: "Proyek Transformasi Digital" },
    results: {
      en: "100% Inventory automation, Instant sales reports, Premium Dashboard UI",
      id: "Otomasi inventori 100%, Laporan penjualan instan, UI Dashboard Premium"
    },
    status: "completed"
  },
];

// =========================================================================
// MODEL 1: DESKTOP DESIGN PROJECTS (Landscape 16:10 Aspect Ratio)
// =========================================================================
export const desktopDesignProjects = [
  {
    id: "desk-1",
    model: "desktop",
    ratio: "landscape",
    image: batikNusantaraImg,
    title: { 
      en: "Batik Nusantara - Modern E-Commerce UI/UX", 
      id: "UI/UX & Desain Web E-Commerce Batik Nusantara" 
    },
    category: { en: "E-Commerce Web Design", id: "Desain Web E-Commerce" },
    client: { en: "Figma UI/UX Concept", id: "Konsep UI/UX Figma" },
    description: {
      en: "Comprehensive web UI design and cultural art direction. Features responsive desktop product catalogs, Mega Mendung theme variations, and high-converting checkout flows.",
      id: "Perancangan antarmuka web dan tata visual budaya komprehensif. Menampilkan katalog produk desktop responsif, variasi tema Mega Mendung, dan alur checkout konversi tinggi."
    },
    tech: ["Figma", "Design System", "Wireframing", "UI Prototyping"],
    status: "concept"
  },
  {
    id: "desk-2",
    model: "desktop",
    ratio: "landscape",
    image: personalDashboardImg,
    title: { 
      en: "Developer Dashboard - Real-Time GitHub Analytics", 
      id: "Desain UI Dashboard Developer & Analitik Komit" 
    },
    category: { en: "SaaS Analytics UI", id: "Antarmuka SaaS & Analitik" },
    client: { en: "Dark Mode Web UI", id: "Konsep Antarmuka Dark Mode" },
    description: {
      en: "Precision dark-mode developer analytics dashboard design. Engineered with real-time SSE event feeds, interactive 12-month contribution heatmaps, and clean metric cards.",
      id: "Desain dashboard analitik developer bernuansa dark mode presisi. Dirancang dengan feed event SSE real-time, heatmap kontribusi 12 bulan interaktif, dan kartu metrik yang bersih."
    },
    tech: ["Figma", "Dashboard UI", "Data Visualization", "User Experience"],
    status: "concept"
  },
  {
    id: "desk-3",
    model: "desktop",
    ratio: "landscape",
    image: batikKasirImg,
    title: { 
      en: "Batik Kasir - Intelligent Cloud POS Desktop", 
      id: "Antarmuka Sistem Kasir & Manajemen Stok POS" 
    },
    category: { en: "Desktop POS Interface", id: "Antarmuka Kasir Desktop" },
    client: { en: "Retail POS UI Concept", id: "Konsep UI Ritel & Kasir" },
    description: {
      en: "Point of Sale desktop cashier system tailored for retail operations. Incorporates quick barcode checkout, instant inventory sync, and end-of-day revenue reconciliation.",
      id: "Sistem kasir desktop POS yang disesuaikan untuk ritel. Memadukan alur kasir barcode cepat, sinkronisasi inventori instan, dan rekonsiliasi omset harian."
    },
    tech: ["Figma", "POS Interface", "Financial UI", "SaaS Dashboard"],
    status: "concept"
  },
  {
    id: "desk-4",
    model: "desktop",
    ratio: "landscape",
    image: desktopDesignSystemImg,
    title: { 
      en: "Design Tokens & Scalable Component Architecture", 
      id: "Design Tokens & Library Komponen Figma" 
    },
    category: { en: "Design System Architecture", id: "Arsitektur Sistem Desain" },
    client: { en: "Design Tokens & Tokens Studio", id: "Token Desain & Styleguide" },
    description: {
      en: "Scalable design system token architecture with atomic UI components, multi-theme color ramps, accessible WCAG AAA contrasts, and automated handoff tokens.",
      id: "Arsitektur token sistem desain skalabel dengan komponen atomik, palet warna multi-tema, kontras aksesibilitas WCAG AAA, dan token serah terima siap-kode."
    },
    tech: ["Figma Tokens", "Component Library", "Atomic Design", "WCAG AAA"],
    status: "concept"
  },
  {
    id: "desk-5",
    model: "desktop",
    ratio: "landscape",
    image: desktopApiPortalImg,
    title: { 
      en: "Cloud API Portal & Webhook Dispatcher Console", 
      id: "Developer Portal & Pemantau Webhook Real-Time" 
    },
    category: { en: "Developer Tool UI", id: "Antarmuka Developer Portal" },
    client: { en: "Cloud DX Interface", id: "Konsep DX Developer" },
    description: {
      en: "Developer-focused portal for managing webhook delivery pipelines, inspecting HMAC SHA-256 payload signatures, and monitoring SSE connection health.",
      id: "Portal developer untuk mengelola pengiriman webhook, menginspeksi signature HMAC SHA-256, dan memantau latensi koneksi SSE real-time."
    },
    tech: ["Figma", "Developer Experience (DX)", "API Console", "Dark UI"],
    status: "concept"
  }
];

// =========================================================================
// MODEL 2: MOBILE DESIGN PROJECTS (Portrait 9:16 Aspect Ratio - Pinterest Ref)
// =========================================================================
export const mobileDesignProjects = [
  {
    id: "mob-1",
    model: "mobile",
    ratio: "portrait",
    image: mobileBatikStoreImg,
    title: { 
      en: "Batik Nusantara Mobile App - Fashion Store", 
      id: "Batik Nusantara Mobile App - Toko Busana Budaya" 
    },
    category: { en: "iOS / Android Mobile App", id: "Aplikasi Mobile iOS / Android" },
    client: { en: "Mobile E-Commerce Concept", id: "Konsep E-Commerce Mobile" },
    description: {
      en: "Mobile-first shopping experience with story-driven cultural curation, bottom sheet product discovery, and tactile swipe micro-interactions.",
      id: "Pengalaman belanja mobile-first dengan kurasi busana berbasis cerita, kartu eksplorasi motif batik, dan mikro-interaksi gestur sentuh yang halus."
    },
    tech: ["Figma Mobile", "iOS HIG", "Mobile E-Commerce", "Micro-Interactions"],
    status: "concept"
  },
  {
    id: "mob-2",
    model: "mobile",
    ratio: "portrait",
    image: mobileBatikPosImg,
    title: { 
      en: "Batik Kasir Mobile - Pocket POS & QRIS", 
      id: "Batik Kasir Mobile - Kasir Cepat & Pembayaran QRIS" 
    },
    category: { en: "Mobile Cashier & FinTech", id: "Kasir Mobile & Pembayaran QRIS" },
    client: { en: "FinTech Mobile POS", id: "Konsep Aplikasi Kasir Saku" },
    description: {
      en: "High-speed mobile cashier application with camera barcode scanning, dynamic QRIS instant payment generation, and WhatsApp digital receipts.",
      id: "Aplikasi kasir saku berkecepatan tinggi dengan pemindai barcode kamera ponsel, kode QRIS dinamis otomatis, dan struk digital instan."
    },
    tech: ["Figma Mobile", "FinTech UI", "QRIS Payment", "POS Flow"],
    status: "concept"
  },
  {
    id: "mob-3",
    model: "mobile",
    ratio: "portrait",
    image: mobileDevPulseImg,
    title: { 
      en: "DevPulse Mobile - Live GitHub Push Companion", 
      id: "DevPulse Mobile - Pantau Commit & CI/CD Real-Time" 
    },
    category: { en: "Developer Companion App", id: "Aplikasi Pendamping Developer" },
    client: { en: "Developer Tool Mobile", id: "Konsep Aplikasi Developer" },
    description: {
      en: "Mobile developer companion providing instant push notifications for Pull Request reviews, CI/CD pipeline pass/fail alerts, and live SSE commit activity.",
      id: "Aplikasi pendamping developer mobile dengan notifikasi push instan saat PR di-review, pantauan status CI/CD build, dan feed komit live."
    },
    tech: ["Figma Mobile", "Mobile Dashboard", "Live Feed UI", "Developer Tool"],
    status: "concept"
  },
  {
    id: "mob-4",
    model: "mobile",
    ratio: "portrait",
    image: mobileCheckoutImg,
    title: { 
      en: "Seamless 1-Tap Checkout & Delivery Flow", 
      id: "Alur Checkout Cepat & Pelacakan Pengiriman Mobile" 
    },
    category: { en: "Mobile Checkout Experience", id: "Pengalaman Checkout Mobile" },
    client: { en: "Mobile UX Flow", id: "Alur Transaksi Mobile" },
    description: {
      en: "Streamlined 3-step checkout user flow engineered with GPS address autocomplete, instant courier tariff calculation, and 1-tap digital wallet payments.",
      id: "Alur checkout 3-langkah dengan pelacakan alamat otomatis, kalkulasi tarif kurir instan, dan pembayaran 1-tap dompet digital tanpa hambatan."
    },
    tech: ["Figma Mobile", "Checkout UX", "User Flow", "Mobile Payment"],
    status: "concept"
  },
  {
    id: "mob-5",
    model: "mobile",
    ratio: "portrait",
    image: mobileInventoryImg,
    title: { 
      en: "Smart Warehouse Stock Scanner & Audit App", 
      id: "Audit Stok Gudang & Pemindai Barcode Cepat" 
    },
    category: { en: "Warehouse & Inventory App", id: "Aplikasi Manajemen Gudang" },
    client: { en: "Logistics Mobile App", id: "Konsep Logistik & Stok" },
    description: {
      en: "Handheld inventory auditing app featuring real-time camera SKU scanning, low-stock threshold alert banners, and instant cloud database sync.",
      id: "Aplikasi audit inventori saku dengan pemindai SKU kamera ponsel, peringatan batas stok menipis, dan sinkronisasi instan ke database cloud."
    },
    tech: ["Figma Mobile", "Warehouse UI", "Barcode Scanner", "Data Entry"],
    status: "concept"
  },
  {
    id: "mob-6",
    model: "mobile",
    ratio: "portrait",
    image: mobileAnalyticsImg,
    title: { 
      en: "Executive Mobile KPI & Hourly Sales Widget", 
      id: "Widget Analitik Eksekutif & Omset Harian Mobile" 
    },
    category: { en: "Executive Analytics UI", id: "Widget Metrik & Omset Eksekutif" },
    client: { en: "Business Analytics Mobile", id: "Konsep Analitik Bisnis" },
    description: {
      en: "Pocket executive dashboard delivering morning sales briefings, hourly transaction graphs, peak shopping hour metrics, and 1-click PDF reports.",
      id: "Dashboard eksekutif saku yang menyajikan ringkasan omset harian, grafik transaksi per jam, metrik jam belanja terpadat, dan ekspor laporan PDF 1-klik."
    },
    tech: ["Figma Mobile", "Mobile Charts", "KPI Dashboard", "Executive UI"],
    status: "concept"
  }
];

// Unified fallback array
export const designProjectsData = [...desktopDesignProjects, ...mobileDesignProjects];
