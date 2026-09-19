import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  Linkedin,
  Instagram,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  Award,
  Download,
  Eye,
  FileText,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Star,
  CheckCircle,
  Sparkles,
  Globe,
  Database,
  Cpu,
  Layers,
  ArrowUpRight,
  Terminal,
  Server,
  Palette,
  Send,
  CheckCircle2,
  Languages,
  Sun,
  Moon,
  Shield,
  ZoomIn,
  Maximize2,
} from "lucide-react";
import profilePhoto from "./assets/foto_profile.jpeg";
import profilePhotoNobg from "./assets/foto_profile_nobg.png";

import batikKasirImg1 from "./assets/batik_kasir_1.png";
import batikKasirImg2 from "./assets/batik_kasir_2.png";
import batikNusantaraImg1 from "./assets/batik_nusantara_1.png";
import batikNusantaraImg2 from "./assets/batik_nusantara_2.png";
import LanyardCard from "./components/LanyardCard";
import CleanAbout from "./components/CleanAbout";
import certBSN from "./assets/certificates/sertifikat BSN.jpg";
import certCisco from "./assets/certificates/Cisco CyberSecurity.jpg";
import certIBMData from "./assets/certificates/IBM Data Analysis With Python Sertifikat _ Cognitive Class.jpg";
import certIBMPython from "./assets/certificates/IBM Python 101 for Data Science Sertifikat _ Cognitive Class.jpg";
import certJuniorCyber from "./assets/certificates/Junior Cybersecurity.jpg";
import certBSSN from "./assets/certificates/Sertifikat BSSN suki.jpg";
import certIAIE from "./assets/certificates/Sertifikat IAIE .jpg";
import certCoursera from "./assets/certificates/Coursera.jpg";
import certAksademy from "./assets/certificates/AKSADEMY.jpg";

// Dicoding Belajar Dasar Pemrograman Web
import certDicodingWebP1 from "./assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_1.png";
import certDicodingWebP2 from "./assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_2.png";
import certDicodingWebP3 from "./assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_3.png";

// Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric
import certDicodingDataP1 from "./assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_1.png";
import certDicodingDataP2 from "./assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_2.png";
import certDicodingDataP3 from "./assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_3.png";

// Dicoding Membangun Aplikasi Gen AI dengan Microsoft Azure
import certDicodingGenAiP1 from "./assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_1.png";
import certDicodingGenAiP2 from "./assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_2.png";
import certDicodingGenAiP3 from "./assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_3.png";

// Dicoding Spec-Driven Development dengan Kiro
import certDicodingKiroP1 from "./assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_1.png";
import certDicodingKiroP2 from "./assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_2.png";
import certDicodingKiroP3 from "./assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_3.png";

function TransparentProfilePhoto({ src, alt, className }) {
  const [cleanSrc, setCleanSrc] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      // Filter out neutral studio-gray backdrop pixels (#b8b8b8 to #e5e5e5)
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const isNeutral = Math.max(r, g, b) - Math.min(r, g, b) < 18;
        const isStudioGray = r >= 170 && g >= 170 && b >= 170;

        if (isNeutral && isStudioGray) {
          data[i + 3] = 0; // Make background transparent
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setCleanSrc(canvas.toDataURL("image/png"));
    };
  }, [src]);

  return <img src={cleanSrc} alt={alt} className={className} />;
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set(["home"]));
  const [ripples, setRipples] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [activeProjectImageIndex, setActiveProjectImageIndex] = useState(0);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [activeCertPageIndex, setActiveCertPageIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [showAllCertifications, setShowAllCertifications] = useState(false);
  const [language, setLanguage] = useState("id");
  const [isCVLoading, setIsCVLoading] = useState(false);

  const translations = {
    en: {
      nav: {
        home: "Home",
        about: "About",
        skills: "Skills",
        certifications: "Certifications",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        badge: "Available for Projects",
        greeting: "Hi, I'm",
        description: "Junior Frontend Engineer and Technical Consultant specialized in building high-performance web applications with exceptional user experiences.",
        viewProjects: "View Projects",
        getInTouch: "Get in Touch",
        stats: {
          years: "Years Experience",
          projects: "Projects Completed",
          clients: "Happy Clients",
        },
        expertise: "My Expertise",
        specialist: "UI/UX Specialist",
      },
      about: {
        badge: "About Me",
        title: "Passionate Developer & Problem Solver",
        description: "With over {yearsOfExperience} years of experience in frontend development, I combine technical expertise with strategic thinking to deliver exceptional results.",
        p1: "I specialize in building scalable web applications using modern technologies like React, TypeScript, and Next.js. My approach combines technical excellence with user-centric design to create products that not only work flawlessly but also provide exceptional user experiences.",
        p2: "Throughout my career, I've had the privilege of working with startups and companies alike, helping them transform their digital presence and achieve their business objectives through innovative technical solutions.",
        expertise: {
          frontend: "Modern Frontend",
          clean: "Clean Architecture",
          responsive: "Responsive Design",
        },
        stats: {
          clean: "Clean Code Architecture",
          scalable: "Scalable Solutions",
          uiux: "UI/UX Excellence",
          performance: "Performance Focus",
          loc: "Lines of Code Written",
          uptime: "Uptime Maintained",
          improv: "Performance Improvement",
          mentored: "Teams Mentored",
        }
      },
      skills: {
        badge: "Technical Stack",
        title: "Skills by Category",
        subtitle: "Expertise across the full development stack",
        categories: {
          backend: "Backend & DevOps",
          tools: "Tools & Design",
        }
      },
      experience: {
        badge: "Career Journey",
        title: "Professional Experience",
      },
      projects: {
        badge: "Portfolio",
        title: "Featured Projects",
        subtitle: "Selected work showcasing technical expertise and business impact",
        viewDetails: "View Details",
        featured: "Featured",
        liveDemo: "Live Demo",
        comingSoon: "Research and development of the next innovative project is underway. Coming soon with the latest technology solutions.",
        statusSoon: "In Development Stage",
      },
      certifications: {
        badge: "Credentials",
        title: "Professional Certifications",
        verified: "Verified",
        download: "Download PDF",
        credential: "Credential ID",
        levelLabel: "Certification Level",
      },
      contact: {
        badge: "Get in Touch",
        title: "Let's Work Together",
        subtitle: "Have a project in mind or want to explore collaboration opportunities? My inbox is always open.",
        info: {
          title: "Contact Information",
          email: "Email",
          linkedin: "LinkedIn",
          location: "Location",
          connect: "Connect Online",
        },
        form: {
          title: "Send a Message",
          labels: {
            name: "Name",
            email: "Email",
            subject: "Subject",
            message: "Message",
          },
          placeholders: {
            name: "Your name",
            email: "your@email.com",
            subject: "Project inquiry",
            message: "Tell me about your project...",
          },
          messages: {
            success: "Gmail opened in new tab — click Send in Gmail to finish!",
            error: "Failed to send message",
          },
          buttons: {
            send: "Send Message",
            sending: "Sending...",
          }
        }
      },
      footer: {
        subtitle: "Junior Frontend Engineer & Technical Consultant",
        rights: "All rights reserved.",
        builtWith: "Built with React, Tailwind CSS & Passion",
      },
      cv: {
        download: "Download CV",
        modal: {
          title: "Curriculum Vitae",
          subtitle: "Download my professional resume",
          description: "Includes comprehensive overview of experience, skills, certifications, and achievements",
          info: {
            format: "Format",
            size: "Size",
            updated: "Last Updated",
            date: "January 2025",
          },
          buttons: {
            download: "Download CV",
            downloading: "Downloading...",
            cancel: "Cancel",
          }
        }
      }
    },
    id: {
      nav: {
        home: "Beranda",
        about: "Tentang",
        skills: "Keahlian",
        certifications: "Sertifikasi",
        experience: "Pengalaman",
        projects: "Proyek",
        contact: "Kontak",
      },
      hero: {
        badge: "Tersedia untuk Proyek",
        greeting: "Halo, Saya",
        description: "Junior Frontend Engineer dan Konsultan Teknis yang berspesialisasi dalam membangun aplikasi web berperforma tinggi dengan pengalaman pengguna yang luar biasa.",
        viewProjects: "Lihat Proyek",
        getInTouch: "Hubungi Saya",
        stats: {
          years: "Tahun Pengalaman",
          projects: "Proyek Selesai",
          clients: "Klien Puas",
        },
        expertise: "Keahlian Saya",
        specialist: "Spesialis UI/UX",
      },
      about: {
        badge: "Tentang Saya",
        title: "Pengembang yang Berdedikasi & Pemecah Masalah",
        description: "Dengan lebih dari {yearsOfExperience} tahun pengalaman dalam pengembangan frontend, saya menggabungkan keahlian teknis dengan pemikiran strategis untuk memberikan hasil yang luar biasa.",
        p1: "Saya adalah Junior Frontend Engineer yang berdedikasi dengan fokus pada pembuatan aplikasi web modern, responsif, dan berpusat pada pengguna. Pendekatan saya menggabungkan keunggulan teknis dengan pemecahan masalah kreatif.",
        p2: "Saya berspesialisasi dalam ekosistem React, memanfaatkan alat modern dan praktik terbaik untuk memberikan solusi perangkat lunak berkualitas tinggi yang memberikan nilai bisnis.",
        expertise: {
          frontend: "Frontend Modern",
          clean: "Arsitektur Bersih",
          responsive: "Desain Responsif",
        },
        stats: {
          clean: "Arsitektur Kode Bersih",
          scalable: "Solusi Terukur",
          uiux: "Keunggulan UI/UX",
          performance: "Fokus Performa",
          loc: "Baris Kode Ditulis",
          uptime: "Uptime Terjaga",
          improv: "Peningkatan Performa",
          mentored: "Tim Dibimbing",
        }
      },
      skills: {
        badge: "Stack Teknis",
        title: "Keahlian per Kategori",
        subtitle: "Keahlian di seluruh stack pengembangan",
        categories: {
          backend: "Backend & DevOps",
          tools: "Alat & Desain",
        }
      },
      experience: {
        badge: "Perjalanan Karir",
        title: "Pengalaman Profesional",
      },
      projects: {
        badge: "Portofolio",
        title: "Proyek Pilihan",
        subtitle: "Karya pilihan yang menunjukkan keahlian teknis dan dampak bisnis",
        viewDetails: "Lihat Detail",
        featured: "Unggulan",
        liveDemo: "Demo Langsung",
        comingSoon: "Riset dan pengembangan proyek inovatif berikutnya sedang berlangsung. Segera hadir dengan solusi teknologi terbaru.",
        statusSoon: "Dalam Tahap Pengembangan",
      },
      certifications: {
        badge: "Kredensial",
        title: "Sertifikasi Profesional",
        verified: "Terverifikasi",
        download: "Unduh PDF",
        credential: "ID Kredensial",
        levelLabel: "Tingkat Sertifikasi",
      },
      contact: {
        badge: "Hubungi Saya",
        title: "Mari Bekerja Sama",
        subtitle: "Punya proyek atau ingin menjajaki peluang kolaborasi? Kontak saya selalu terbuka.",
        info: {
          title: "Informasi Kontak",
          email: "Email",
          linkedin: "LinkedIn",
          location: "Lokasi",
          connect: "Hubungkan Online",
        },
        form: {
          title: "Kirim Pesan",
          labels: {
            name: "Nama",
            email: "Email",
            subject: "Subjek",
            message: "Pesan",
          },
          placeholders: {
            name: "Nama Anda",
            email: "email@anda.com",
            subject: "Inkuiri proyek",
            message: "Ceritakan tentang proyek Anda...",
          },
          messages: {
            success: "Pesan Anda berhasil dikirim langsung ke email ajimuktilaksono567@gmail.com!",
            error: "Gagal mengirim pesan",
          },
          buttons: {
            send: "Kirim Pesan",
            sending: "Mengirim...",
          }
        }
      },
      footer: {
        subtitle: "Junior Frontend Engineer & Konsultan Teknis",
        rights: "Seluruh hak cipta dilindungi.",
        builtWith: "Dibangun dengan React, Tailwind CSS & Dedikasi",
      },
      cv: {
        download: "Unduh CV",
        modal: {
          title: "Daftar Riwayat Hidup",
          subtitle: "Unduh resume profesional saya",
          description: "Termasuk tinjauan komprehensif tentang pengalaman, keahlian, sertifikasi, dan pencapaian",
          info: {
            format: "Format",
            size: "Ukuran",
            updated: "Terakhir Diperbarui",
            date: "Januari 2025",
          },
          buttons: {
            download: "Unduh CV",
            downloading: "Mengunduh...",
            cancel: "Batal",
          }
        }
      }
    }
  };


  const t = (path) => {
    const keys = path.split(".");
    let current = translations[language];
    for (const key of keys) {
      if (current[key] === undefined) return path;
      current = current[key];
    }
    return current;
  };


  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
    setScrollProgress(progress);

    const sections = [
      "home",
      "about",
      "skills",
      "certifications",
      "experience",
      "projects",
      "contact",
    ];
    
    const current = sections.find((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    if (current) setActiveSection(current);

    // Optimized Scroll reveal animation
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible) {
          setVisibleSections(prev => {
            if (prev.has(section)) return prev;
            const next = new Set(prev);
            next.add(section);
            return next;
          });
        }
      }
    });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Run once on mount

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  const handleDownloadCV = () => {
    setIsCVLoading(true);
    // URL placeholder changed to a dummy Google Drive view if none provided, 
    // or keep it same but ensure it doesn't break the UI.
    const cvUrl = "https://drive.google.com/file/d/1Xy_z2.../view"; 
    setTimeout(() => {
      window.open(cvUrl, "_blank");
      setIsCVLoading(false);
    }, 1000);
  };

  const handleViewCV = () => {
    setShowCVModal(true);
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };
    
    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  // Professional Data
  const professionalData = {
    name: "Aji Mukti Laksono",
    title: "Junior Frontend Engineer",
    location: "Bekasi, Indonesia",
    email: "ajimuktilaksono567@gmail.com",
    phone: "+62 812-2261-5462",
    github: "https://github.com/Ajimukti-Laksono",
    linkedin: "https://www.linkedin.com/in/aji-laksono",
    instagram: "https://www.instagram.com/ajimkti.lksono",
    instagramHandle: "ajimkti.lksono",
    yearsOfExperience: "2+",
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus("sending");
    setErrorMsg("");

    const targetEmail = "ajimuktilaksono567@gmail.com";

    try {
      // 1. Direct AJAX POST to FormSubmit API (Delivers directly to inbox without opening apps)
      const res = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Subject: formData.subject || `Pesan Portofolio Baru dari ${formData.name}`,
          Message: formData.message,
          _subject: `Pesan Portofolio Baru dari ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (res.ok) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setFormStatus(null), 8000);
        return;
      }
    } catch (err) {
      console.warn("Direct POST fallback triggered:", err);
    }

    // 2. Interactive Fallback: Open pre-filled Gmail Compose window if network API is blocked
    const subject = encodeURIComponent(formData.subject || `Pesan Portofolio dari ${formData.name}`);
    const body = encodeURIComponent(
      `Halo Aji,\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nPesan:\n${formData.message}\n\n---\nDikirim melalui Portofolio`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank");

    setFormStatus("sent");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setFormStatus(null), 8000);
  };


  // Black and Gold Elegance Palette (User-Requested Color Scheme)
  const colors = {
    dark: {
      bg: "#000000", // Pure Onyx Black
      card: "#14213D", // Deep Royal Navy Blue
      border: "rgba(252, 163, 17, 0.25)", // Subtle Amber Gold Border
      text: {
        primary: "#FFFFFF", // Crisp Pure White
        secondary: "#E5E5E5", // Light Platinum Gray
        accent: "#FCA311", // Warm Golden Amber
      },
      gradient: {
        primary: "linear-gradient(135deg, #FCA311 0%, #E85D04 100%)", // Gold to Amber Gradient
        secondary: "linear-gradient(135deg, #14213D 0%, #000000 100%)", // Royal Navy to Onyx
      },
    },
    light: {
      bg: "#FAF9F5", // Warm Luxury Off-White Alabaster
      card: "#FFFFFF", // Crisp White Surfaces
      border: "rgba(217, 119, 6, 0.22)", // Amber Gold Border
      text: {
        primary: "#14213D", // Deep Royal Navy (Sharp High Contrast)
        secondary: "#475569", // Slate Gray
        accent: "#D97706", // Rich Amber Gold
      },
      gradient: {
        primary: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)", // Golden Amber Gradient
        secondary: "linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%)",
      },
    },
  };

  const currentColors = isDarkMode ? colors.dark : colors.light;

  // Skills Data with Logos
  const skillsData = [
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    },
    {
      name: "TypeScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Vite",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
    },
    {
      name: "HTML5",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    },
    {
      name: "CSS3",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    },
    {
      name: "Git",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "VS Code",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    },
    {
      name: "Figma",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "GraphQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    },
    {
      name: "Docker",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Canva",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
    },
    {
      name: "Laragon",
      icon: "https://cdn.simpleicons.org/laragon",
    },
    {
      name: "Python",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
  ];

  // Experience Data
  const experienceData = [
    {
      company: "TechCorp Solutions",
      position: { en: "Lead Frontend Engineer", id: "Lead Frontend Engineer" },
      period: { en: "2022 - Present", id: "2022 - Sekarang" },
      location: "Bekasi, Indonesia",
      achievements: {
        en: [
          "Led team of 5 engineers in developing enterprise SaaS platform",
          "Reduced page load time by 60% through code splitting and optimization",
          "Implemented design system used by 50+ developers",
          "Mentored 3 junior developers to senior level",
        ],
        id: [
          "Memimpin tim beranggotakan 5 insinyur dalam mengembangkan platform SaaS perusahaan",
          "Mengurangi waktu pemuatan halaman sebesar 60% melalui pemisahan kode dan optimasi",
          "Mengimplementasikan sistem desain yang digunakan oleh 50+ pengembang",
          "Membimbing 3 pengembang junior ke tingkat senior",
        ]
      },
    },
    {
      company: "Digital Innovations Ltd",
      position: { en: "Senior Frontend Developer", id: "Senior Frontend Developer" },
      period: { en: "2020 - 2022", id: "2020 - 2022" },
      location: "Bandung, Indonesia",
      achievements: {
        en: [
          "Built scalable component library used across company products",
          "Improved CI/CD pipeline reducing deployment time by 40%",
          "Integrated micro-frontend architecture for better scalability",
          "Increased test coverage from 60% to 95%",
        ],
        id: [
          "Membangun pustaka komponen yang dapat diskalakan yang digunakan di seluruh produk perusahaan",
          "Meningkatkan pipa CI/CD yang mengurangi waktu penerapan sebesar 40%",
          "Mengintegrasikan arsitektur micro-frontend untuk skalabilitas yang lebih baik",
          "Meningkatkan cakupan pengujian dari 60% menjadi 95%",
        ]
      },
    },
    {
      company: "StartupX",
      position: { en: "Frontend Developer", id: "Frontend Developer" },
      period: { en: "2019 - 2020", id: "2019 - 2020" },
      location: "Remote",
      achievements: {
        en: [
          "Developed MVP that secured $2M in seed funding",
          "Built responsive web app supporting 10K+ monthly users",
          "Implemented real-time features using WebSocket",
          "Optimized Core Web Vitals achieving 90+ scores",
        ],
        id: [
          "Mengembangkan MVP yang mengamankan pendanaan benih sebesar $2 juta",
          "Membangun aplikasi web responsif yang mendukung 10 ribu+ pengguna bulanan",
          "Mengimplementasikan fitur real-time menggunakan WebSocket",
          "Mengoptimalkan Core Web Vitals dan mencapai skor 90+",
        ]
      },
    },
  ];

  // Projects Data
  const projectsData = [

    {
      title: { en: "Batik Nusantara - Modern E-Commerce", id: "Batik Nusantara - E-Commerce Modern" },
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
    },
    {
      title: { en: "Batik Nusantara Kasir - Intelligent POS System", id: "Batik Nusantara Kasir - Sistem POS Cerdas" },
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
    },
    {
      title: { en: "Next Project", id: "Proyek Berikutnya" },
      description: {
        en: "Research and development of the next innovative project is underway. Coming soon with the latest technology solutions.",
        id: "Riset dan pengembangan proyek inovatif berikutnya sedang berlangsung. Segera hadir dengan solusi teknologi terbaru."
      },
      image: "",
      tech: ["Modern Stack", "Research", "Design"],
      link: "#",
      liveUrl: null,
      featured: false,
      comingSoon: true,
      client: { en: "Innovation Lab", id: "Lab Inovasi" },
      results: { en: "Under Development Stage", id: "Dalam Tahap Pengembangan" },
    },
  ];

  // Certifications Data
  const certificationsData = [
    {
      name: { en: "Basic Web Programming (Dicoding)", id: "Belajar Dasar Pemrograman Web (Dicoding)" },
      issuer: "Dicoding Indonesia",
      year: "2024",
      credential: "DICODING-WEB-2024",
      icon: certDicodingWebP1,
      pages: [certDicodingWebP1, certDicodingWebP2, certDicodingWebP3],
      vectorIconKey: "code",
      bgGradient: "linear-gradient(135deg, #2563eb 0%, #1e1b4b 100%)",
      level: { en: "Verified", id: "Terverifikasi" },
      featured: true,
      description: {
        id: "Sertifikat resmi Dicoding 3-halaman yang mencakup penguasaan HTML5, CSS3, Flexbox, Layout Responsif, serta pembuatan situs web interaktif sesuai standar industri.",
        en: "Official 3-page Dicoding certification covering mastery of HTML5, CSS3, Flexbox, Responsive Layouts, and building interactive web pages adhering to industry standards."
      }
    },
    {
      name: { en: "Data Science Implementation with Microsoft Fabric", id: "Belajar Penerapan Data Science dengan Microsoft Fabric" },
      issuer: "Dicoding Indonesia & Microsoft",
      year: "2024",
      credential: "DICODING-MSFABRIC-2024",
      icon: certDicodingDataP1,
      pages: [certDicodingDataP1, certDicodingDataP2, certDicodingDataP3],
      vectorIconKey: "database",
      bgGradient: "linear-gradient(135deg, #0284c7 0%, #0f172a 100%)",
      level: { en: "Advanced", id: "Lanjutan" },
      featured: true,
      description: {
        id: "Sertifikasi komprehensif 3-halaman mengenai penerapan Data Science menggunakan Microsoft Fabric, pemrosesan dataset skala besar, pemodelan analitik, dan integrasi cloud analytics.",
        en: "Comprehensive 3-page certification on implementing Data Science using Microsoft Fabric, large-scale dataset processing, analytics modeling, and cloud analytics integration."
      }
    },
    {
      name: { en: "Building Gen AI Applications with Microsoft Azure", id: "Membangun Aplikasi Gen AI dengan Microsoft Azure" },
      issuer: "Dicoding Indonesia & Microsoft",
      year: "2024",
      credential: "DICODING-AZUREAI-2024",
      icon: certDicodingGenAiP1,
      pages: [certDicodingGenAiP1, certDicodingGenAiP2, certDicodingGenAiP3],
      vectorIconKey: "cpu",
      bgGradient: "linear-gradient(135deg, #7c3aed 0%, #1e1b4b 100%)",
      level: { en: "Expert", id: "Ahli" },
      featured: true,
      description: {
        id: "Memvalidasi kompetensi 3-halaman dalam membangun aplikasi Generative AI memanfaatkan Microsoft Azure OpenAI Service, prompt engineering, RAG, dan penerapan etika AI.",
        en: "Validates 3-page competency in building Generative AI applications leveraging Microsoft Azure OpenAI Services, prompt engineering, RAG, and AI ethics implementation."
      }
    },
    {
      name: { en: "Spec-Driven Development with Kiro", id: "Spec-Driven Development dengan Kiro" },
      issuer: "Dicoding Indonesia",
      year: "2024",
      credential: "DICODING-KIRO-2024",
      icon: certDicodingKiroP1,
      pages: [certDicodingKiroP1, certDicodingKiroP2, certDicodingKiroP3],
      vectorIconKey: "layers",
      bgGradient: "linear-gradient(135deg, #d97706 0%, #451a03 100%)",
      level: { en: "Professional", id: "Profesional" },
      featured: false,
      description: {
        id: "Sertifikasi 3-halaman metodologi pengembangan perangkat lunak berbasis spesifikasi (Spec-Driven Development) menggunakan Kiro untuk menghasilkan arsitektur kode yang terstruktur dan teruji.",
        en: "3-page certification in specification-driven software development methodology using Kiro to craft structured, maintainable, and thoroughly tested code architecture."
      }
    },
    {
      name: { en: "Cisco Cybersecurity Essentials", id: "Dasar-Dasar Keamanan Siber Cisco" },
      issuer: "Cisco Networking Academy",
      year: "2023",
      credential: "CISCO-CB-2023",
      icon: certCisco,
      vectorIconKey: "shield",
      bgGradient: "linear-gradient(135deg, #0284c7 0%, #1e1b4b 100%)",
      level: { en: "Expert", id: "Ahli" },
      featured: true,
      description: {
        id: "Sertifikasi mendalam dari Cisco yang memvalidasi keahlian dalam prinsip keamanan siber, pertahanan jaringan, enkripsi data, manajemen risiko, serta proteksi infrastruktur dari ancaman siber.",
        en: "In-depth Cisco certification validating expertise in cybersecurity principles, network defense, data encryption, risk management, and infrastructure protection against cyber threats."
      }
    },
    {
      name: { en: "IBM Data Analysis with Python", id: "Analisis Data IBM dengan Python" },
      issuer: "IBM Skills Network",
      year: "2023",
      credential: "IBM-DA-2023",
      icon: certIBMData,
      vectorIconKey: "database",
      bgGradient: "linear-gradient(135deg, #1d4ed8 0%, #0f172a 100%)",
      level: { en: "Advanced", id: "Lanjutan" },
      featured: true,
      description: {
        id: "Menguasai analisis data komprehensif menggunakan Python, Pandas, NumPy, dan SciPy untuk pengolahan dataset besar, pembersihan data, statistik deskriptif, dan pemodelan prediktif.",
        en: "Mastered comprehensive data analysis using Python, Pandas, NumPy, and SciPy for processing large datasets, data cleaning, descriptive statistics, and predictive modeling."
      }
    },
    {
      name: { en: "IBM Python for Data Science", id: "IBM Python untuk Sains Data" },
      issuer: "IBM Skills Network",
      year: "2023",
      credential: "IBM-PY-2023",
      icon: certIBMPython,
      vectorIconKey: "code",
      bgGradient: "linear-gradient(135deg, #4f46e5 0%, #1e1b4b 100%)",
      level: { en: "Intermediate", id: "Menengah" },
      featured: true,
      description: {
        id: "Memvalidasi keahlian pemrograman Python dasar hingga tingkat lanjut, struktur data, penggunaan API, web scraping, serta manipulasi data untuk kebutuhan Data Science.",
        en: "Validates Python programming expertise from fundamentals to advanced data structures, API usage, web scraping, and data manipulation for Data Science applications."
      }
    },
    {
      name: { en: "Junior Cybersecurity", id: "Keamanan Siber Junior" },
      issuer: "Digitalent Scholarship",
      year: "2023",
      credential: "DTS-JS-2023",
      icon: certJuniorCyber,
      vectorIconKey: "lock",
      bgGradient: "linear-gradient(135deg, #0d9488 0%, #064e3b 100%)",
      level: { en: "Intermediate", id: "Menengah" },
      featured: false,
      description: {
        id: "Program beasiswa Digitalent Scholarship yang mencakup penilaian kerentanan keamanan (vulnerability assessment), dasar etika peretasan, dan analisis keamanan infrastruktur TI.",
        en: "Digitalent Scholarship program covering security vulnerability assessment, ethical hacking fundamentals, and IT infrastructure security analysis."
      }
    },
    {
      name: { en: "BSSN Cybersecurity Awareness", id: "Kesadaran Keamanan Siber BSSN" },
      issuer: "BSSN Indonesia",
      year: "2023",
      credential: "BSSN-CS-2023",
      icon: certBSSN,
      vectorIconKey: "shieldCheck",
      bgGradient: "linear-gradient(135deg, #059669 0%, #022c22 100%)",
      level: { en: "Verified", id: "Terverifikasi" },
      featured: false,
      description: {
        id: "Sertifikasi nasional dari BSSN mengenai kesadaran keamanan informasi, proteksi data sensitif, kebersihan siber (cyber hygiene), dan mitigasi ancaman rekayasa sosial.",
        en: "National certification from BSSN regarding information security awareness, sensitive data protection, cyber hygiene, and social engineering threat mitigation."
      }
    },
    {
      name: { en: "Artificial Intelligence (IAIE)", id: "Kecerdasan Buatan (IAIE)" },
      issuer: "IAIE International",
      year: "2023",
      credential: "IAIE-AI-2023",
      icon: certIAIE,
      vectorIconKey: "cpu",
      bgGradient: "linear-gradient(135deg, #7c3aed 0%, #311b92 100%)",
      level: { en: "Expert", id: "Ahli" },
      featured: false,
      description: {
        id: "Memahami konsep Kecerdasan Buatan (AI), Machine Learning, Neural Networks, serta penerapan etika dan teknologi AI dalam otomatisasi serta pemecahan masalah kompleks.",
        en: "Understanding Artificial Intelligence (AI) concepts, Machine Learning, Neural Networks, and the implementation of AI ethics and technologies in automation and complex problem solving."
      }
    },
    {
      name: { en: "Product Standardization (BSN)", id: "Standardisasi Produk (BSN)" },
      issuer: "Badan Standardisasi Nasional",
      year: "2023",
      credential: "BSN-ST-2023",
      icon: certBSN,
      vectorIconKey: "award",
      bgGradient: "linear-gradient(135deg, #b91c1c 0%, #450a0a 100%)",
      level: { en: "Professional", id: "Profesional" },
      featured: false,
      description: {
        id: "Pemahaman standar kualitas produk nasional (SNI), proses sertifikasi kelayakan, manajemen mutu, serta jaminan standar kualitas pada pengembangan sistem dan produk.",
        en: "Understanding national product quality standards (SNI), qualification certification processes, quality management, and quality assurance in system and product development."
      }
    },
    {
      name: { en: "Coursera Certification", id: "Sertifikasi Coursera" },
      issuer: "Coursera",
      year: "2023",
      credential: "COURSERA-2023",
      icon: certCoursera,
      vectorIconKey: "book",
      bgGradient: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
      level: { en: "Professional", id: "Profesional" },
      featured: false,
      description: {
        id: "Sertifikasi profesional melalui platform Coursera yang mencakup keahlian pengembangan web modern, praktik terbaik industri, dan implementasi teknologi terkini.",
        en: "Professional certification through Coursera platform covering modern web development skills, industry best practices, and implementation of latest technologies."
      }
    },
    {
      name: { en: "AKSADEMY Certification", id: "Sertifikasi AKSADEMY" },
      issuer: "Aksademy",
      year: "2023",
      credential: "AKSADEMY-2023",
      icon: certAksademy,
      vectorIconKey: "layers",
      bgGradient: "linear-gradient(135deg, #d97706 0%, #78350f 100%)",
      level: { en: "Professional", id: "Profesional" },
      featured: false,
      description: {
        id: "Sertifikasi kompetensi teknis dari Aksademy yang berfokus pada arsitektur sistem frontend, optimasi performa web, serta desain antarmuka pengguna yang responsif.",
        en: "Technical competency certification from Aksademy focused on frontend system architecture, web performance optimization, and responsive user interface design."
      }
    },
  ];

  const getIssuerLogo = (issuer) => {
    if (issuer.includes("Dicoding")) return "https://github.com/dicodingacademy.png";
    if (issuer.includes("IBM")) return "https://github.com/ibm.png";
    if (issuer.includes("Cisco")) return "https://github.com/cisco.png";
    if (issuer.includes("Coursera")) return "https://github.com/coursera.png";
    if (issuer.includes("Microsoft")) return "https://github.com/microsoft.png";
    
    let domain = "";
    if (issuer.includes("BSSN") || issuer.includes("Standardisasi")) domain = "bssn.go.id";
    else if (issuer.includes("Digitalent")) domain = "kominfo.go.id";
    else if (issuer.includes("Aksademy")) domain = "aksademy.com";

    if (domain) return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    return null;
  };

  return (
    <div
      className="min-h-screen overflow-hidden transition-colors duration-300"
      style={{
        backgroundColor: currentColors.bg,
        color: currentColors.text.primary,
      }}
    >

      {/* 1. FIXED UI ELEMENTS - PERSISTENT ON SCROLL */}
      <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}>

        {/* Scroll Progress Indicator */}
        <div 
          className="absolute top-0 left-0 h-1 z-50 transition-all duration-300 pointer-events-auto"
          style={{
            width: `${scrollProgress}%`,
            background: currentColors.gradient.primary,
            boxShadow: isDarkMode 
              ? '0 0 10px rgba(59, 130, 246, 0.5)' 
              : '0 0 10px rgba(37, 99, 235, 0.3)',
          }}
        ></div>

        {/* Elegant Floating Navigation - LUXURY REFINED */}
        <nav
          className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 pointer-events-auto ${isScrolled ? "top-4 w-[95%] lg:w-[85%] xl:w-[75%]" : "top-0 w-full"}`}
        >
          <div 
            className={`mx-auto px-4 lg:px-6 py-2 transition-all duration-500 ${isScrolled ? "rounded-2xl border backdrop-blur-3xl shadow-2xl" : "backdrop-blur-sm border-b"}`}
            style={{
              backgroundColor: isScrolled
                ? isDarkMode
                  ? "rgba(2, 6, 23, 0.85)"
                  : "rgba(255, 255, 255, 0.85)"
                : "transparent",
              borderColor: isScrolled 
                ? isDarkMode ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.15)"
                : currentColors.border,
            }}
          >
            <div className="flex items-center justify-between h-14 sm:h-16">


              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1 xl:gap-2">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Certifications",
                  "Experience",
                  "Projects",
                  "Contact",
                ].map((item) => {
                  const sectionId = item.toLowerCase();
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className={`px-3 xl:px-4 py-2 text-[12px] xl:text-sm font-bold rounded-xl transition-all duration-300 ${activeSection === sectionId ? "shadow-md" : "hover:scale-105 opacity-70 hover:opacity-100"}`}
                      style={{
                        color:
                          activeSection === sectionId
                            ? currentColors.text.accent
                            : currentColors.text.primary,
                        backgroundColor:
                          activeSection === sectionId
                            ? isDarkMode
                              ? "rgba(99, 102, 241, 0.2)"
                              : "rgba(79, 70, 229, 0.1)"
                            : "transparent",
                      }}
                    >
                      {t(`nav.${sectionId}`)}
                    </button>
                  );
                })}
              </div>

              {/* Action Group */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3">
                 <button
                    onClick={() => setLanguage(language === "en" ? "id" : "en")}
                    className="p-2 rounded-xl transition-all duration-300 hover:scale-110 flex items-center gap-2 border"
                    style={{
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                      color: currentColors.text.primary,
                      borderColor: currentColors.border,
                    }}
                  >
                    <Languages size={18} />
                    <span className="text-xs font-black uppercase">{language}</span>
                  </button>

                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2 rounded-xl transition-all duration-300 hover:scale-110 border"
                    style={{
                       backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                       borderColor: currentColors.border,
                       color: isDarkMode ? "#fbbf24" : "#475569",
                    }}
                    aria-label="Toggle Theme"
                  >
                    {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                  </button>

                  <button
                    onClick={handleViewCV}
                    className="shimmer-effect px-3 xl:px-4 py-2 text-xs font-black rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg flex-shrink-0"
                    style={{
                      background: currentColors.gradient.primary,
                      color: "white",
                    }}
                  >
                    <Download size={14} />
                    <span className="hidden xl:inline">{t('cv.download')}</span>
                    <span className="xl:hidden">CV</span>
                  </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-xl transition-colors border"
                style={{
                  backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                  borderColor: currentColors.border,
                  color: currentColors.text.primary
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div
              className="lg:hidden mt-2 mx-auto w-[95%] rounded-2xl border backdrop-blur-3xl overflow-hidden shadow-2xl"
              style={{
                backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
                borderColor: currentColors.border,
              }}
            >
              <div className="p-4 space-y-1">
                {[
                  "Home",
                  "About",
                  "Skills",
                  "Certifications",
                  "Experience",
                  "Projects",
                  "Contact",
                ].map((item) => {
                  const sectionId = item.toLowerCase();
                  return (
                    <button
                      key={item}
                      onClick={() => { scrollToSection(sectionId); setIsMenuOpen(false); }}
                      className="block w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all"
                      style={{
                        color: activeSection === sectionId ? currentColors.text.accent : currentColors.text.primary,
                        backgroundColor: activeSection === sectionId ? (isDarkMode ? "rgba(99, 102, 241, 0.1)" : "rgba(79, 70, 229, 0.05)") : "transparent",
                      }}
                    >
                      {t(`nav.${sectionId}`)}
                    </button>
                  );
                })}
                <div className="pt-4 mt-4 border-t grid grid-cols-2 gap-2" style={{ borderColor: currentColors.border }}>
                  <button
                    onClick={() => setLanguage(language === "en" ? "id" : "en")}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-black uppercase"
                    style={{ color: currentColors.text.primary, borderColor: currentColors.border }}
                  >
                    <Languages size={16} /> {language}
                  </button>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-black"
                    style={{ color: currentColors.text.primary, borderColor: currentColors.border }}
                  >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />} Theme
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Back to Top Button */}
        <button
          onClick={() => scrollToSection("home")}
          className={`absolute bottom-8 right-8 p-3 rounded-full transition-all duration-500 shadow-2xl hover:scale-110 flex items-center justify-center pointer-events-auto ${isScrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}
          style={{
            background: currentColors.gradient.primary,
            color: "white",
            boxShadow: isDarkMode
              ? '0 10px 25px rgba(59, 130, 246, 0.4)'
              : '0 10px 25px rgba(37, 99, 235, 0.3)',
          }}
          aria-label="Back to top"
        >
          <ArrowUpRight className="transform -rotate-45" size={24} />
        </button>
      </div>

      {/* 2. SCROLLABLE CONTENT WITH REVEAL ANIMATION */}
      <div className={`${!isLoading ? 'animate-reveal-content opacity-100' : 'opacity-0 pointer-events-none'}`}>

      {/* Hero Section - Inspired by Pinterest Reference */}
      <section
        id="home"
        className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div
          className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
          style={{ backgroundColor: isDarkMode ? "rgba(252, 163, 17, 0.15)" : "rgba(245, 158, 11, 0.18)" }}
        />
        <div
          className="absolute top-1/2 right-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none"
          style={{ backgroundColor: isDarkMode ? "rgba(20, 33, 61, 0.8)" : "rgba(217, 119, 6, 0.12)" }}
        />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            
            {/* Left Column - Typography & Intro */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p
                className="text-lg sm:text-xl font-bold tracking-wider mb-2 uppercase"
                style={{ color: currentColors.text.accent }}
              >
                {t('hero.greeting')}
              </p>

              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-4"
                style={{ color: currentColors.text.primary }}
              >
                Aji Mukti<br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: isDarkMode
                      ? "linear-gradient(135deg, #FCA311 0%, #FFB703 50%, #E5E5E5 100%)"
                      : "linear-gradient(135deg, #D97706 0%, #F59E0B 50%, #14213D 100%)",
                  }}
                >
                  Laksono
                </span>
              </h1>

              <div
                className="flex items-center justify-center lg:justify-start gap-2 text-lg sm:text-xl font-bold mb-6"
                style={{ color: currentColors.text.primary }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: currentColors.text.accent }}
                />
                <span>Junior Frontend Engineer & Konsultan Teknis</span>
              </div>

              <p
                className="text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 opacity-90"
                style={{ color: currentColors.text.secondary }}
              >
                {t('hero.description')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
                <button
                  onClick={(e) => { createRipple(e); scrollToSection("projects"); }}
                  className="px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] flex items-center gap-2 text-sm sm:text-base text-white shadow-xl"
                  style={{ background: currentColors.gradient.primary }}
                >
                  {t('hero.viewProjects')}
                  <ArrowUpRight size={18} />
                </button>

                <button
                  onClick={(e) => { createRipple(e); scrollToSection("contact"); }}
                  className="px-7 py-4 rounded-xl font-bold transition-all duration-300 border text-sm sm:text-base hover:scale-105 backdrop-blur-md shadow-sm"
                  style={{
                    borderColor: currentColors.border,
                    color: currentColors.text.primary,
                    backgroundColor: isDarkMode ? "rgba(20, 33, 61, 0.5)" : "rgba(255, 255, 255, 0.9)",
                  }}
                >
                  {t('hero.getInTouch')}
                </button>
              </div>

              {/* Social Links Row */}
              <div className="flex items-center justify-center lg:justify-start gap-4">
                {[
                  { icon: <Github size={20} />, href: professionalData.github, label: "GitHub" },
                  { icon: <Linkedin size={20} />, href: professionalData.linkedin, label: "LinkedIn" },
                  { icon: <Instagram size={20} />, href: professionalData.instagram, label: "Instagram" },
                  { icon: <Mail size={20} />, href: `mailto:${professionalData.email}`, label: "Email" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 hover:scale-110 shadow-sm"
                    style={{
                      backgroundColor: isDarkMode ? "rgba(20, 33, 61, 0.5)" : "rgba(255, 255, 255, 0.9)",
                      borderColor: currentColors.border,
                      color: currentColors.text.primary,
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Background-Free Half-Body Cutout Portrait */}
            <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end items-center">
              <div className="relative w-full max-w-md flex justify-center items-center">
                
                {/* Dual Color Studio Backdrop Glows */}
                <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-[#FCA311]/25 blur-[110px] pointer-events-none" />
                <div className="absolute bottom-5 left-5 w-80 h-80 rounded-full bg-[#14213D]/90 blur-[120px] pointer-events-none animate-pulse-slow" />

                {/* Direct Half-Body Cutout Portrait */}
                <div
                  className="relative z-10 w-64 h-[22rem] sm:w-80 sm:h-[26rem] lg:w-[24rem] lg:h-[29rem] flex items-end justify-center transition-transform duration-500"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  }}
                >
                  <img
                    src={profilePhotoNobg}
                    alt={professionalData.name}
                    className="w-full h-full object-contain object-bottom filter drop-shadow-[0_20px_40px_rgba(252,163,17,0.3)] transition-transform duration-700 hover:scale-[1.03]"
                  />
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section - RESPONSIVE */}
      <section
        id="about"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("about") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
               <User size={16} />
              <span>{t('about.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('about.title')}
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-4"
              style={{ color: currentColors.text.secondary }}
            >
              {t('about.description').replace('{yearsOfExperience}', professionalData.yearsOfExperience)}
            </p>
          </div>

          <CleanAbout 
            t={t} 
            isDarkMode={isDarkMode} 
            currentColors={currentColors} 
            professionalData={professionalData} 
          />
        </div>
      </section>

      {/* Skills Section - SCROLLING MARQUEE */}
      <section
        id="skills"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-1000 ${visibleSections.has("skills") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
              <Cpu size={16} />
              <span>{t('skills.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('skills.title')}
            </h2>
          </div>

          {/* Scrolling Marquee Rows */}
          <div className="mb-8 sm:mb-12">
            {/* First Row - Moving Left */}
            <div className="flex mb-6 sm:mb-8 animate-scroll-left">
              {[...skillsData, ...skillsData].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 mx-2 sm:mx-4 group">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 backdrop-blur-sm rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 hover:scale-110 hover:-rotate-3"
                    style={{
                      backgroundColor: currentColors.card,
                      borderColor: currentColors.border,
                      boxShadow: isDarkMode
                        ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <p
                      className="text-xs font-semibold text-center mt-1 sm:mt-2"
                      style={{ color: currentColors.text.primary }}
                    >
                      {skill.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Second Row - Moving Right */}
            <div className="flex animate-scroll-right">
              {[
                ...skillsData.slice().reverse(),
                ...skillsData.slice().reverse(),
              ].map((skill, idx) => (
                <div key={idx} className="flex-shrink-0 mx-2 sm:mx-4 group">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 backdrop-blur-sm rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center p-3 sm:p-4 hover:scale-110 hover:rotate-3"
                    style={{
                      backgroundColor: currentColors.card,
                      borderColor: currentColors.border,
                      boxShadow: isDarkMode
                        ? "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
                        : "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mb-1 sm:mb-2 transition-transform duration-300 group-hover:scale-110"
                    />
                    <p
                      className="text-xs font-semibold text-center mt-1 sm:mt-2"
                      style={{ color: currentColors.text.primary }}
                    >
                      {skill.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 40s linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right 40s linear infinite;
          }
          .animate-scroll-left:hover,
          .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* Certifications Section - RESPONSIVE */}
      <section
        id="certifications"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("certifications") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
              <Award size={16} />
              <span>{t('certifications.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('certifications.title')}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllCertifications ? certificationsData : certificationsData.filter(c => c.featured)).map((cert, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCert(cert);
                  setActiveCertPageIndex(0);
                  setShowCertModal(true);
                }}
                className="group relative p-1 rounded-3xl transition-all duration-500 hover:scale-[1.03] cursor-pointer"
                style={{
                  background: isDarkMode
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%)"
                    : "linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)",
                }}
              >
                  <div
                    className="relative h-full p-6 rounded-[22px] overflow-hidden backdrop-blur-xl transition-all duration-500"
                    style={{
                      backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 0.95)",
                      border: `1px solid ${isDarkMode ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)"}`,
                    }}
                  >
                  {/* Decorative Background Elements */}
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500"></div>

                  <div className="flex flex-col h-full relative z-10">
                    <div className="mb-4 relative">
                      <div className="w-full aspect-[16/10] rounded-xl overflow-hidden shadow-sm border border-black/5 relative group-hover:scale-[1.02] transition-transform duration-500 bg-white">
                        {/* Actual Certificate Document Image Preview (Clean) */}
                        <img
                          src={cert.icon}
                          alt={cert.name[language]}
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Hover Action Overlay ONLY */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center z-20">
                          <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 flex items-center gap-2 text-white font-bold text-xs shadow-lg">
                            <Eye size={16} />
                            <span>{language === 'en' ? 'View Certificate' : 'Lihat Sertifikat'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col justify-between pt-2">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold leading-tight group-hover:text-blue-500 transition-colors mb-2" style={{ color: currentColors.text.primary }}>
                          {cert.name[language]}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-4">
                          {getIssuerLogo(cert.issuer) ? (
                            <img 
                              src={getIssuerLogo(cert.issuer)} 
                              alt={cert.issuer} 
                              className="w-6 h-6 object-contain rounded-sm shadow-sm"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <Award size={20} style={{ color: currentColors.text.accent }} />
                          )}
                          <p className="text-sm font-semibold" style={{ color: currentColors.text.accent }}>
                            {cert.issuer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
                        <div className="flex items-center gap-1.5 text-xs font-semibold opacity-70" style={{ color: currentColors.text.secondary }}>
                          <Calendar size={14} />
                          {cert.year}
                        </div>

                        <div className="flex items-center gap-2 group-hover:text-blue-500 transition-colors">
                          <span className="text-xs font-semibold opacity-60 uppercase tracking-wider" style={{ color: currentColors.text.secondary }}>ID:</span>
                          <span className="font-mono text-xs font-bold" style={{ color: currentColors.text.primary }}>
                            {cert.credential}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All / Collapse Button */}
          {certificationsData.length > 3 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllCertifications(!showAllCertifications)}
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-300 hover:scale-105 border shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.9)",
                  borderColor: isDarkMode ? "rgba(99, 102, 241, 0.3)" : "rgba(99, 102, 241, 0.2)",
                  color: currentColors.text.primary,
                }}
              >
                <span>
                  {showAllCertifications
                    ? language === "en"
                      ? "Show Featured Only"
                      : "Tampilkan Sertifikat Unggulan Saja"
                    : language === "en"
                      ? `View All Certifications (${certificationsData.length})`
                      : `Lihat Semua Sertifikat (${certificationsData.length})`}
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-500 text-indigo-500 group-hover:translate-y-0.5 ${
                    showAllCertifications ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section - RESPONSIVE TIMELINE */}
      <section
        id="experience"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("experience") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
              <Briefcase size={16} />
              <span>{t('experience.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('experience.title')}
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line - HIDDEN ON MOBILE FOR CLARITY */}
            <div
              className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px"
              style={{
                backgroundColor: currentColors.border,
                background: `linear-gradient(to bottom, ${currentColors.border}, transparent)`,
              }}
            ></div>

            {/* Mobile Timeline Line */}
            <div
              className="md:hidden absolute left-4 top-0 h-full w-px"
              style={{
                backgroundColor: currentColors.border,
              }}
            ></div>

            {experienceData.map((exp, idx) => (
              <div
                key={idx}
                className={`relative mb-8 sm:mb-12 ${idx % 2 === 0 ? "md:pr-8 md:pl-0 md:text-right" : "md:pl-8"}`}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-6 md:-translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 rounded-full z-10"
                  style={{
                    background: currentColors.gradient.primary,
                    border: `3px solid ${currentColors.bg}`,
                    boxShadow: isDarkMode
                      ? "0 0 20px rgba(59, 130, 246, 0.5)"
                      : "0 0 20px rgba(37, 99, 235, 0.3)",
                  }}
                ></div>

                <div
                  className={`ml-12 md:ml-0 ${idx % 2 === 0 ? "md:mr-16" : "md:ml-16"} p-4 sm:p-6 rounded-xl border transition-all duration-300 hover:scale-[1.01]`}
                  style={{
                    backgroundColor: currentColors.card,
                    borderColor: currentColors.border,
                    boxShadow: isDarkMode
                      ? "0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                      : "0 10px 30px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className={`${idx % 2 === 0 ? "md:text-right" : ""}`}>
                      <h3
                        className="text-lg sm:text-xl font-bold mb-1"
                        style={{ color: currentColors.text.primary }}
                      >
                        {exp.position[language]}
                      </h3>
                      <p
                        className="font-medium mb-2 text-sm sm:text-base"
                        style={{ color: currentColors.text.accent }}
                      >
                        {exp.company}
                      </p>
                      <div
                        className="flex items-center gap-2 text-xs sm:text-sm"
                        style={{ color: currentColors.text.secondary }}
                      >
                        <MapPin size={14} className="flex-shrink-0" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                    <span
                      className="px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium self-start"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                        color: currentColors.text.accent,
                      }}
                    >
                      {exp.period[language]}
                    </span>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {exp.achievements[language].map((achievement, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-2 sm:gap-3"
                      >
                        <ChevronRight
                          size={16}
                          className="flex-shrink-0 mt-1"
                          style={{ color: currentColors.text.accent }}
                        />
                        <span
                          style={{ color: currentColors.text.secondary }}
                          className="text-sm sm:text-base"
                        >
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - RESPONSIVE GRID */}
      <section
        id="projects"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("projects") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
              <Layers size={16} />
              <span>{t('projects.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('projects.title')}
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-4"
              style={{ color: currentColors.text.secondary }}
            >
              {t('projects.subtitle')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projectsData.map((project, idx) => (
              <div
                key={idx}
                className={`group rounded-xl overflow-hidden border transition-all duration-500 hover:scale-[1.02] card-hover hover-lift scroll-reveal visible stagger-${(idx % 6) + 1}`}
                style={{
                  backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.9)" : "rgba(255, 255, 255, 1)",
                  borderColor: isDarkMode ? "rgba(99, 102, 241, 0.2)" : "rgba(99, 102, 241, 0.1)",
                  boxShadow: isDarkMode
                    ? "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
                    : "0 20px 40px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
                }}
              >
                {/* Project Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100 dark:bg-slate-800/50">
                  {project.image ? (
                    <img
                      src={Array.isArray(project.image) ? project.image[0] : project.image}
                      alt={project.title[language]}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-400">
                      <Layers size={48} opacity={0.5} />
                    </div>
                  )}

                  {/* Featured Badge */}
                  {project.featured && (
                    <div
                      className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md"
                      style={{
                        backgroundColor: "rgba(245, 158, 11, 0.9)", // amber-500
                        color: "white",
                        border: "1px solid rgba(255,255,255,0.2)"
                      }}
                    >
                      {language === 'en' ? 'Featured' : 'Unggulan'}
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="mb-2">
                      <span
                        className="text-xs font-semibold uppercase tracking-wider"
                        style={{ color: currentColors.text.accent }}
                      >
                        {project.client[language]}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-bold mb-4 group-hover:text-blue-500 transition-colors line-clamp-2"
                      style={{ color: currentColors.text.primary }}
                    >
                      {project.title[language]}
                    </h3>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-[10px] sm:text-xs font-medium rounded-md border transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                          style={{
                            borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                            color: currentColors.text.secondary,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 hover:opacity-90"
                        style={{
                          background: currentColors.gradient.primary,
                          color: "white",
                        }}
                      >
                        <ExternalLink size={14} />
                        {t('projects.liveDemo')}
                      </a>
                    )}
                    {!project.comingSoon && (
                      <button
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveProjectImageIndex(0);
                          setShowProjectModal(true);
                        }}
                        className="inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 hover:gap-3"
                        style={{ color: currentColors.text.accent }}
                      >
                        {t('projects.viewDetails')}
                        <ArrowUpRight size={16} />
                      </button>
                    )}
                    {project.comingSoon && (
                      <span
                        className="text-sm italic"
                        style={{ color: currentColors.text.secondary }}
                      >
                        🚧 {language === 'en' ? 'Coming soon...' : 'Segera hadir...'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - RESPONSIVE */}
      <section
        id="contact"
        className={`relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${visibleSections.has("contact") ? "scroll-reveal visible" : "scroll-reveal"}`}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm mb-4"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(59, 130, 246, 0.1)"
                  : "rgba(37, 99, 235, 0.1)",
                color: currentColors.text.accent,
              }}
            >
              <Mail size={16} />
              <span>{t('contact.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              {t('contact.title')}
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto px-4"
              style={{ color: currentColors.text.secondary }}
            >
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h3
                  className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
                  style={{ color: currentColors.text.primary }}
                >
                  {t('contact.info.title')}
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <a
                    href={`mailto:${professionalData.email}`}
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                        color: currentColors.text.accent,
                      }}
                    >
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-xs sm:text-sm"
                        style={{ color: currentColors.text.secondary }}
                      >
                        {t('contact.info.email')}
                      </div>
                      <div
                        className="font-medium group-hover:opacity-80 transition-opacity text-sm sm:text-base truncate"
                        style={{ color: currentColors.text.primary }}
                      >
                        {professionalData.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={professionalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-4 group"
                  >
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                        color: currentColors.text.accent,
                      }}
                    >
                      <Linkedin size={18} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-xs sm:text-sm"
                        style={{ color: currentColors.text.secondary }}
                      >
                        {t('contact.info.linkedin')}
                      </div>
                      <div
                        className="font-medium group-hover:opacity-80 transition-opacity text-sm sm:text-base truncate"
                        style={{ color: currentColors.text.primary }}
                      >
                        in/{professionalData.linkedin.split("/").pop()}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(59, 130, 246, 0.1)"
                          : "rgba(37, 99, 235, 0.1)",
                        color: currentColors.text.accent,
                      }}
                    >
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-xs sm:text-sm"
                        style={{ color: currentColors.text.secondary }}
                      >
                        {t('contact.info.location')}
                      </div>
                      <div
                        className="font-medium text-sm sm:text-base"
                        style={{ color: currentColors.text.primary }}
                      >
                        {professionalData.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4
                  className="text-base sm:text-lg font-semibold mb-4"
                  style={{ color: currentColors.text.primary }}
                >
                  {t('contact.info.connect')}
                </h4>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href={professionalData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub: Ajimukti-Laksono"
                    className="p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: currentColors.text.primary,
                    }}
                  >
                    <Github size={20} />
                  </a>
                  <a
                    href={professionalData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="LinkedIn: Aji Laksono"
                    className="p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: currentColors.text.primary,
                    }}
                  >
                    <Linkedin size={20} />
                  </a>
                  <a
                    href={professionalData.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Instagram: @${professionalData.instagramHandle}`}
                    className="p-2 sm:p-3 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      color: currentColors.text.primary,
                    }}
                  >
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* Instagram contact row */}
              <a
                href={professionalData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 group mt-4"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 flex-shrink-0"
                  style={{
                    backgroundColor: isDarkMode
                      ? "rgba(225, 48, 108, 0.15)"
                      : "rgba(225, 48, 108, 0.1)",
                    color: "#e1306c",
                  }}
                >
                  <Instagram size={18} />
                </div>
                <div className="min-w-0">
                  <div
                    className="text-xs sm:text-sm"
                    style={{ color: currentColors.text.secondary }}
                  >
                    Instagram
                  </div>
                  <div
                    className="font-medium group-hover:opacity-80 transition-opacity text-sm sm:text-base truncate"
                    style={{ color: currentColors.text.primary }}
                  >
                    @{professionalData.instagramHandle}
                  </div>
                </div>
              </a>
            </div>

            {/* Contact Form - RESPONSIVE */}
            <div
              className="p-6 sm:p-8 rounded-xl border"
              style={{
                backgroundColor: currentColors.card,
                borderColor: currentColors.border,
                boxShadow: isDarkMode
                  ? "0 20px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 20px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              }}
            >
              <h3
                className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6"
                style={{ color: currentColors.text.primary }}
              >
                {t('contact.form.title')}
              </h3>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSendMessage}>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: currentColors.text.primary }}
                    >
                      {t('contact.form.labels.name')} <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:outline-none text-sm sm:text-base border"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)",
                        borderColor: currentColors.border,
                        color: currentColors.text.primary,
                      }}
                      placeholder={t('contact.form.placeholders.name')}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: currentColors.text.primary }}
                    >
                      {t('contact.form.labels.email')} <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:outline-none text-sm sm:text-base border"
                      style={{
                        backgroundColor: isDarkMode
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(0, 0, 0, 0.05)",
                        borderColor: currentColors.border,
                        color: currentColors.text.primary,
                      }}
                      placeholder={t('contact.form.placeholders.email')}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentColors.text.primary }}
                  >
                    {t('contact.form.labels.subject')}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:outline-none text-sm sm:text-base border"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      borderColor: currentColors.border,
                      color: currentColors.text.primary,
                    }}
                    placeholder={t('contact.form.placeholders.subject')}
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: currentColors.text.primary }}
                  >
                    {t('contact.form.labels.message')} <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-300 focus:ring-2 focus:outline-none resize-none text-sm sm:text-base border"
                    style={{
                      backgroundColor: isDarkMode
                        ? "rgba(255, 255, 255, 0.05)"
                        : "rgba(0, 0, 0, 0.05)",
                      borderColor: currentColors.border,
                      color: currentColors.text.primary,
                    }}
                    placeholder={t('contact.form.placeholders.message')}
                  ></textarea>
                </div>

                {formStatus === "sent" && (
                  <div
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(16, 185, 129, 0.1)",
                      color: "#10b981",
                      border: "1px solid rgba(16, 185, 129, 0.3)",
                    }}
                  >
                    <CheckCircle2 size={18} />
                    {t('contact.form.messages.success')}
                  </div>
                )}

                {formStatus === "error" && (
                  <div
                    className="px-4 py-3 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: "rgba(239, 68, 68, 0.1)",
                      color: "#ef4444",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                    }}
                  >
                    <div className="font-semibold mb-1">❌ {t('contact.form.messages.error')}</div>
                    {errorMsg && <div className="text-xs opacity-80 font-mono break-all">{errorMsg}</div>}
                  </div>
                )}

                <button
                  type="submit"
                  onClick={createRipple}
                  disabled={formStatus === "sending"}
                  className="relative overflow-hidden w-full px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:opacity-90 text-sm sm:text-base button-pulse flex items-center justify-center gap-2 disabled:opacity-60"
                  style={{
                    background: currentColors.gradient.primary,
                    color: "white",
                  }}
                >
                  {ripples.map(ripple => (
                    <span key={ripple.id} className="ripple" style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }} />
                  ))}
                  {formStatus === "sending" ? (
                    <>
                       <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {t('contact.form.buttons.sending')}
                    </>
                  ) : (
                    <>
                       <Send size={16} />
                      {t('contact.form.buttons.send')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - RESPONSIVE */}
      <footer
        className="relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8 border-t"
        style={{ borderColor: currentColors.border }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="text-center md:text-left">
              <div
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: currentColors.text.primary }}
              >
                {professionalData.name}
              </div>
              <p
                className="text-xs sm:text-sm"
                style={{ color: currentColors.text.secondary }}
              >
                {t('footer.subtitle')}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href={professionalData.github}
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="transition-all duration-300 hover:opacity-80 hover:scale-110"
                style={{ color: currentColors.text.secondary }}
              >
                <Github size={20} />
              </a>
              <a
                href={professionalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="transition-all duration-300 hover:opacity-80 hover:scale-110"
                style={{ color: currentColors.text.secondary }}
              >
                <Linkedin size={20} />
              </a>
              <a
                href={professionalData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="transition-all duration-300 hover:opacity-80 hover:scale-110"
                style={{ color: currentColors.text.secondary }}
              >
                <Instagram size={20} />
              </a>
              <a
                href={`mailto:${professionalData.email}`}
                title="Email"
                className="transition-all duration-300 hover:opacity-80 hover:scale-110"
                style={{ color: currentColors.text.secondary }}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div
            className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center border-t"
            style={{ borderColor: currentColors.border }}
          >
            <p
              className="text-xs sm:text-sm"
              style={{ color: currentColors.text.secondary }}
            >
              © {new Date().getFullYear()} {professionalData.name}. {t('footer.rights')}
            </p>
            <p
              className="text-xs mt-2"
              style={{ color: currentColors.text.secondary }}
            >
              {t('footer.builtWith')}
            </p>
          </div>
        </div>
      </footer>



      {/* Custom Animations */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-slower {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(1.05); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes shimmer-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes reveal-content {
          0% { 
            opacity: 0; 
            transform: translateY(30px);
            filter: blur(10px);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0);
            filter: blur(0);
          }
        }

        .animate-reveal-content {
          animation: reveal-content 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .ease-custom {
          transition-timing-function: cubic-bezier(0.87, 0, 0.13, 1);
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }

        .animate-shimmer-progress {
          animation: shimmer-progress 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 12s ease-in-out infinite;
        }

        .scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .scroll-reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      </div>

      {/* MODALS RENDERED OUTSIDE CONTENT WRAPPER FOR BETTER STACKING & VISIBILITY */}
      {/* Project Detail Modal */}
      {showProjectModal && selectedProject && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 fade-in"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={() => setShowProjectModal(false)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col sm:flex-row shadow-2xl border transition-all duration-500 scale-in"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="w-full sm:w-1/2 h-64 sm:h-auto overflow-hidden bg-black/20 relative group">
              <img
                src={Array.isArray(selectedProject.image) ? selectedProject.image[activeProjectImageIndex] : selectedProject.image}
                alt={selectedProject.title[language]}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              {Array.isArray(selectedProject.image) && selectedProject.image.length > 1 && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveProjectImageIndex(prev => prev > 0 ? prev - 1 : selectedProject.image.length - 1); }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setActiveProjectImageIndex(prev => prev < selectedProject.image.length - 1 ? prev + 1 : 0); }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {selectedProject.image.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === activeProjectImageIndex ? 'bg-white' : 'bg-white/40'}`} />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Modal Content */}
            <div 
              className="w-full sm:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col"
              style={{ backgroundColor: currentColors.card }}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block shadow-sm"
                    style={{
                      background: currentColors.gradient.primary,
                      color: "white",
                    }}
                  >
                    {selectedProject.client[language]}
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-bold mt-1"
                    style={{ color: currentColors.text.primary }}
                  >
                    {selectedProject.title[language]}
                  </h3>
                </div>
                <button
                  onClick={() => setShowProjectModal(false)}
                  className="p-2 rounded-lg transition-all duration-300 hover:rotate-90 hover:bg-white/10"
                  style={{ color: currentColors.text.primary }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6 flex-grow">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: currentColors.text.secondary }}>
                    {language === 'en' ? 'Description' : 'Deskripsi'}
                  </h4>
                  <p
                    className="text-sm sm:text-base leading-relaxed whitespace-pre-line"
                    style={{ color: currentColors.text.secondary }}
                  >
                    {selectedProject.description[language]}
                  </p>
                </div>

                {selectedProject.results && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider mb-2 opacity-60" style={{ color: currentColors.text.secondary }}>
                      {language === 'en' ? 'Key Results' : 'Hasil Utama'}
                    </h4>
                    <div
                      className="p-4 rounded-xl text-sm font-medium"
                      style={{
                        backgroundColor: isDarkMode ? "rgba(59, 130, 246, 0.1)" : "rgba(37, 99, 235, 0.1)",
                        color: currentColors.text.accent,
                        border: `1px solid ${isDarkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(37, 99, 235, 0.2)"}`,
                      }}
                    >
                      🚀 {selectedProject.results[language]}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider mb-3 opacity-60" style={{ color: currentColors.text.secondary }}>
                    {language === 'en' ? 'Technologies Used' : 'Teknologi yang Digunakan'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm"
                        style={{
                          backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.07)" : "rgba(0, 0, 0, 0.07)",
                          color: currentColors.text.primary,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex flex-wrap gap-4" style={{ borderColor: currentColors.border }}>
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-bold text-center transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
                    style={{
                      background: currentColors.gradient.primary,
                      color: "white",
                    }}
                  >
                    <ExternalLink size={18} />
                    {language === 'en' ? 'Try Live Demo' : 'Coba Demo Langsung'}
                  </a>
                )}
                {selectedProject.link && selectedProject.link !== "#" && (
                   <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] px-6 py-3 rounded-xl font-bold text-center transition-all duration-300 hover:bg-opacity-80 flex items-center justify-center gap-2 border shadow-sm"
                    style={{
                      borderColor: currentColors.border,
                      color: currentColors.text.primary,
                      backgroundColor: isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                    }}
                  >
                    <Github size={18} />
                    {language === 'en' ? 'Source Code' : 'Kode Sumber'}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CV Modal */}
      {showCVModal && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 fade-in"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={() => setShowCVModal(false)}
        >
          <div
            className="relative w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border transition-all duration-500 scale-in"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(99, 102, 241, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between border-b" style={{ borderColor: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <FileText className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black tracking-tighter" style={{ color: currentColors.text.primary }}>
                    {t('cv.modal.title')}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ color: currentColors.text.secondary }}>
                    Professional Resume
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCVModal(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 hover:rotate-90"
                style={{ color: currentColors.text.primary }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative z-10 p-6 sm:p-8">
              <div
                className="p-8 rounded-[2rem] text-center border-2 border-dashed transition-all hover:border-indigo-500/50 group"
                style={{
                  backgroundColor: isDarkMode ? "rgba(2, 6, 23, 0.5)" : "rgba(248, 250, 252, 0.8)",
                  borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(99, 102, 241, 0.1)",
                }}
              >
                <div className="mb-6 relative inline-block">
                   <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-600/10 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                      <FileText size={48} className="text-indigo-500" />
                   </div>
                </div>

                <h4 className="text-lg font-black mb-2" style={{ color: currentColors.text.primary }}>
                   Aji_Mukti_Laksono_CV.pdf
                </h4>
                
                <div className="grid grid-cols-3 gap-2 mb-8">
                   {[
                     { label: t('cv.modal.info.format'), value: "PDF", icon: <Globe size={14}/> },
                     { label: t('cv.modal.info.size'), value: "2.5 MB", icon: <Layers size={14}/> },
                     { label: t('cv.modal.info.updated'), value: "2025", icon: <Calendar size={14}/> }
                   ].map((item, idx) => (
                     <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
                        <div className="flex items-center justify-center gap-1.5 mb-1 opacity-50" style={{ color: currentColors.text.secondary }}>
                           {item.icon}
                           <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
                        </div>
                        <p className="text-xs font-black" style={{ color: currentColors.text.primary }}>{item.value}</p>
                     </div>
                   ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                   <button
                    onClick={() => {
                      const cvUrl = "https://drive.google.com/file/d/YOUR_FILE_ID/view";
                      window.open(cvUrl, "_blank");
                    }}
                    className="flex-1 px-6 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 border shadow-lg"
                    style={{
                      borderColor: isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(99, 102, 241, 0.1)",
                      backgroundColor: isDarkMode ? "rgba(255,255,255,0.05)" : "white",
                      color: currentColors.text.primary
                    }}
                  >
                    <Eye size={18} />
                    {language === 'en' ? 'View Online' : 'Lihat Online'}
                  </button>

                  <button
                    onClick={handleDownloadCV}
                    disabled={isCVLoading}
                    className="flex-1 shimmer-effect px-6 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)]"
                    style={{
                      background: currentColors.gradient.primary,
                      color: "white",
                    }}
                  >
                    {isCVLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Download size={18} />
                        {t('cv.modal.buttons.download')}
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <p className="mt-6 text-center text-[11px] font-bold opacity-40 px-8" style={{ color: currentColors.text.secondary }}>
                {t('cv.modal.description')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Detail Modal */}
      {showCertModal && selectedCert && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-md transition-all duration-300 fade-in"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={() => setShowCertModal(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[95vh] rounded-[32px] overflow-hidden flex flex-col shadow-2xl border transition-all duration-500 scale-in"
            style={{
              backgroundColor: isDarkMode ? "#1e293b" : "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between backdrop-blur-md bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-6">
                <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 items-center justify-center shadow-lg transform -rotate-3">
                  <Award size={32} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: currentColors.text.primary }}>
                     {selectedCert.name[language]}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 opacity-70" style={{ color: currentColors.text.secondary }}>
                    <span className="text-sm font-medium">{selectedCert.issuer}</span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="text-sm">{selectedCert.year}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowCertModal(false)}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/20 hover:rotate-90 transition-all duration-500 border border-white/10"
              >
                <X size={24} style={{ color: currentColors.text.primary }} />
              </button>
            </div>

            {/* Modal Image Gallery */}
            {(() => {
              const pages = selectedCert.pages && selectedCert.pages.length > 0 ? selectedCert.pages : [selectedCert.icon];
              const currentImg = pages[activeCertPageIndex] || pages[0];
              const pageTitles = {
                0: language === 'en' ? 'Main Certificate' : 'Sertifikat Utama',
                1: language === 'en' ? 'Certificate Detail & Verification' : 'Penjelasan & Detail Sertifikat',
                2: language === 'en' ? 'Competency & Syllabus' : 'Kurikulum & Daftar Kompetensi'
              };

              return (
                <div className="relative z-10 flex-1 overflow-y-auto flex flex-col items-center justify-start p-4 sm:p-6 bg-slate-950/80">
                  {/* Interactive Slider Container */}
                  <div className="relative w-full max-w-5xl flex items-center justify-center group/slider mb-3">
                    {pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCertPageIndex((prev) => (prev > 0 ? prev - 1 : pages.length - 1));
                        }}
                        className="absolute left-2 sm:left-4 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-500 text-white backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110"
                        title={language === 'en' ? 'Previous Page' : 'Halaman Sebelumnya'}
                      >
                        <ChevronLeft size={24} />
                      </button>
                    )}

                    <div className="relative flex flex-col items-center justify-center max-w-full">
                      <img
                        src={currentImg}
                        alt={`${selectedCert.name[language]} - Page ${activeCertPageIndex + 1}`}
                        className="max-w-full w-auto max-h-[58vh] sm:max-h-[62vh] object-contain rounded-xl shadow-2xl border border-white/20 cursor-pointer hover:opacity-95 transition-all"
                        onClick={() => setZoomedImage(currentImg)}
                      />
                      {/* Zoom hint button */}
                      <button
                        onClick={() => setZoomedImage(currentImg)}
                        className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 text-xs font-semibold transition-all shadow-md"
                      >
                        <Maximize2 size={13} />
                        <span>{language === 'en' ? 'Click for Fullscreen View' : 'Klik untuk Tampilan Penuh / Fullscreen'}</span>
                      </button>
                    </div>

                    {pages.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveCertPageIndex((prev) => (prev < pages.length - 1 ? prev + 1 : 0));
                        }}
                        className="absolute right-2 sm:right-4 z-30 p-3 rounded-full bg-black/75 hover:bg-amber-500 text-white backdrop-blur-md border border-white/20 transition-all shadow-2xl hover:scale-110"
                        title={language === 'en' ? 'Next Page' : 'Halaman Selanjutnya'}
                      >
                        <ChevronRight size={24} />
                      </button>
                    )}
                  </div>

                  {/* Page Title Badge */}
                  {pages.length > 1 && (
                    <div className="mb-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-amber-500/30 text-xs text-white flex items-center gap-2 shadow-lg backdrop-blur-md">
                      <span className="font-bold text-amber-400">
                        📄 {language === 'en' ? 'Page' : 'Halaman'} {activeCertPageIndex + 1} / {pages.length}
                      </span>
                      <span className="opacity-40">•</span>
                      <span className="font-semibold opacity-95 text-slate-200">
                        {pageTitles[activeCertPageIndex] || ''}
                      </span>
                    </div>
                  )}

                  {/* Thumbnails Navigation Bar if Multi-Page */}
                  {pages.length > 1 && (
                    <div className="flex items-center gap-3 mb-4 bg-black/50 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
                      {pages.map((pg, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveCertPageIndex(idx)}
                          className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                            activeCertPageIndex === idx
                              ? "border-amber-400 scale-105 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40"
                              : "border-transparent opacity-60 hover:opacity-100"
                          }`}
                        >
                          <img src={pg} alt={`Thumbnail ${idx + 1}`} className="w-16 h-12 object-cover" />
                          <span className="absolute bottom-0 right-0 bg-black/80 text-[10px] text-white px-1 font-bold rounded-tl">
                            {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Certificate Description in Modal */}
                  {selectedCert.description && (
                    <div 
                      className="w-full max-w-3xl p-4 sm:p-5 rounded-2xl backdrop-blur-md border text-center"
                      style={{
                        backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.7)" : "rgba(255, 255, 255, 0.9)",
                        borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <p className="text-xs font-bold uppercase tracking-wider mb-1 text-amber-400">
                        {language === 'en' ? 'Certificate Overview' : 'Penjelasan Sertifikat'}
                      </p>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: currentColors.text.primary }}>
                        {selectedCert.description[language]}
                      </p>
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Modal Footer */}
            <div className="relative z-10 p-6 sm:p-8 backdrop-blur-md bg-white/5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-8">
                <div>
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50" style={{ color: currentColors.text.secondary }}>
                    ID Kredensial
                  </p>
                  <p className="font-mono text-base font-black" style={{ color: currentColors.text.accent }}>
                    {selectedCert.credential}
                  </p>
                </div>
                <div className="space-y-1">
                   <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-50" style={{ color: currentColors.text.secondary }}>
                    Level
                  </p>
                  <div className="flex items-center gap-2">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="text-lg font-bold" style={{ color: currentColors.text.primary }}>{selectedCert.level[language]}</span>
                  </div>
                </div>
              </div>
              
              <button
                  onClick={() => {
                      const link = document.createElement('a');
                      if (selectedCert.pdfUrl) {
                        link.href = selectedCert.pdfUrl;
                        link.download = `${selectedCert.name[language]}.pdf`;
                      } else {
                        const pages = selectedCert.pages || [selectedCert.icon];
                        link.href = pages[activeCertPageIndex] || selectedCert.icon;
                        link.download = `${selectedCert.name[language]}_page_${activeCertPageIndex + 1}.png`;
                      }
                      link.click();
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white"
              >
                   <Download size={20} />
                  {selectedCert.pdfUrl
                    ? (language === 'en' ? 'Download Full PDF' : 'Unduh PDF Lengkap')
                    : t('certifications.download')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Certificate Zoom Modal (Lightbox) */}
      {zoomedImage && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-xl transition-all duration-300 fade-in overflow-y-auto"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative w-full flex flex-col items-center justify-center min-h-full py-10" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedImage(null)}
              className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[10001] p-3 rounded-full bg-white/10 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 transition-all hover:rotate-90 shadow-2xl"
              title={language === 'en' ? 'Close Fullscreen' : 'Tutup Tampilan Penuh'}
            >
              <X size={24} />
            </button>
            <img
              src={zoomedImage}
              alt="Full View Certificate"
              className="w-auto h-auto max-w-[95vw] sm:max-w-[90vw] object-contain rounded-lg shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}
    </div>
  );
}

