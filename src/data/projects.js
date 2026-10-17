import batikKasirImg1 from "../assets/batik_kasir_1.png";
import batikKasirImg2 from "../assets/batik_kasir_2.png";
import batikNusantaraImg1 from "../assets/batik_nusantara_1.png";
import batikNusantaraImg2 from "../assets/batik_nusantara_2.png";
import personalDashboardImg1 from "../assets/personal_dashboard_1.png";
import personalDashboardImg2 from "../assets/personal_dashboard_2.png";
import personalDashboardImg3 from "../assets/personal_dashboard_3.png";

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
    image: [personalDashboardImg1, personalDashboardImg2, personalDashboardImg3],
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
    image: [batikNusantaraImg1, batikNusantaraImg2],
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
    image: [batikKasirImg1, batikKasirImg2],
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
