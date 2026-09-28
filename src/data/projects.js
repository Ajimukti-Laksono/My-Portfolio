import batikKasirImg1 from "../assets/batik_kasir_1.png";
import batikKasirImg2 from "../assets/batik_kasir_2.png";
import batikNusantaraImg1 from "../assets/batik_nusantara_1.png";
import batikNusantaraImg2 from "../assets/batik_nusantara_2.png";

export const projectsData = [
  {
    id: 1,
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
    id: 2,
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
  {
    id: 3,
    title: { en: "Next Project", id: "Proyek Berikutnya" },
    description: {
      en: "Research and development of the next innovative project is underway. Coming soon with the latest technology solutions.",
      id: "Riset dan pengembangan proyek inovatif berikutnya sedang berlangsung. Segera hadir dengan solusi teknologi terbaru."
    },
    image: "",
    tech: ["Modern Stack", "Research", "Design"],
    link: "",
    liveUrl: "",
    featured: false,
    comingSoon: true,
    client: { en: "Innovation Lab", id: "Lab Inovasi" },
    results: { en: "Under Development Stage", id: "Dalam Tahap Pengembangan" },
    status: "ongoing"
  },
];
