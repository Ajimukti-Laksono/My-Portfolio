import logoBekasi from "../assets/logo_bekasi.svg";
import docMagang1 from "../assets/experience/magang_1.jpeg";
import docMagang2 from "../assets/experience/magang_2.jpeg";
import docMagang3 from "../assets/experience/magang_3.jpeg";
import docMagang4 from "../assets/experience/magang_4.jpeg";

export const experienceData = [
  {
    id: 1,
    type: "internship",
    company: "Pemerintah Kota Bekasi",
    logo: logoBekasi,
    position: { 
      en: "Student Intern", 
      id: "Mahasiswa Magang" 
    },
    period: { 
      en: "Mar 2026 - Apr 2026", 
      id: "Mar 2026 - Apr 2026" 
    },
    startDate: "2026-03",
    endDate: "2026-04",
    location: "Kelurahan Harapan Baru Prima, Bekasi Utara, Kota Bekasi, Jawa Barat",
    achievements: {
      en: [
        "Completed a 2-month internship program.",
        "Applied Laravel and PHP in administrative or system workflows.",
        "Collaborated with local government officials on-site."
      ],
      id: [
        "Menyelesaikan program magang selama 2 bulan.",
        "Menerapkan Laravel dan PHP dalam alur kerja administrasi atau sistem.",
        "Berkolaborasi dengan pejabat pemerintah setempat secara langsung (Di lokasi)."
      ]
    },
    technologies: ["Laravel", "PHP", "HTML", "CSS", "JavaScript"],
    // Foto-foto dokumentasi kegiatan magang (Card Stack Animation)
    documentation: [
      {
        id: 1,
        url: docMagang1,
        caption: {
          id: "Pengembangan Website Pelayanan Publik Kelurahan Harapan Baru",
          en: "Public Service Website Development for Harapan Baru Sub-district"
        }
      },
      {
        id: 2,
        url: docMagang2,
        caption: {
          id: "Sosialisasi & Alur Pelayanan SKU Digital Harapan Baru",
          en: "Digital SKU Service Flow & Program Socialization"
        }
      },
      {
        id: 3,
        url: docMagang3,
        caption: {
          id: "Asistensi & Kolaborasi Teknis bersama Pembimbing Lapangan",
          en: "Technical Guidance & Review with Field Supervisor"
        }
      },
      {
        id: 4,
        url: docMagang4,
        caption: {
          id: "Koordinasi dan Demonstrasi Sistem Informasi Kelurahan",
          en: "Coordination & Information System Demonstration"
        }
      }
    ]
  }
];
