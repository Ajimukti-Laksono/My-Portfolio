import certBSN from "../assets/certificates/sertifikat BSN.jpg";
import certCisco from "../assets/certificates/Cisco CyberSecurity.jpg";
import certIBMData from "../assets/certificates/IBM Data Analysis With Python Sertifikat _ Cognitive Class.jpg";
import certIBMPython from "../assets/certificates/IBM Python 101 for Data Science Sertifikat _ Cognitive Class.jpg";
import certJuniorCyber from "../assets/certificates/Junior Cybersecurity.jpg";
import certBSSN from "../assets/certificates/Sertifikat BSSN suki.jpg";
import certIAIE from "../assets/certificates/Sertifikat IAIE .jpg";
import certCoursera from "../assets/certificates/Coursera.jpg";
import certAksademy from "../assets/certificates/AKSADEMY.jpg";

// Dicoding Belajar Dasar Pemrograman Web
import certDicodingWebP1 from "../assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_1.png";
import certDicodingWebP2 from "../assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_2.png";
import certDicodingWebP3 from "../assets/certificates/Dicoding Belajar Dasar Pemrograman Web_page_3.png";

// Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric
import certDicodingDataP1 from "../assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_1.png";
import certDicodingDataP2 from "../assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_2.png";
import certDicodingDataP3 from "../assets/certificates/Dicoding Belajar Penerapan Data Science dengan Microsoft Fabric_page_3.png";

// Dicoding Membangun Aplikasi Gen AI dengan Microsoft Azure
import certDicodingGenAiP1 from "../assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_1.png";
import certDicodingGenAiP2 from "../assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_2.png";
import certDicodingGenAiP3 from "../assets/certificates/Dicoding Membangun Aplikasi Gen Al dengan Microsoft Azure_page_3.png";

// Dicoding Spec-Driven Development dengan Kiro
import certDicodingKiroP1 from "../assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_1.png";
import certDicodingKiroP2 from "../assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_2.png";
import certDicodingKiroP3 from "../assets/certificates/Dicoding Spec-Driven Development dengan Kiro_page_3.png";

export const certificationsData = [
  {
    id: 1,
    name: { en: "Basic Web Programming (Dicoding)", id: "Belajar Dasar Pemrograman Web (Dicoding)" },
    issuer: "Dicoding Indonesia",
    year: "2024",
    credential: "DICODING-WEB-2024",
    icon: certDicodingWebP1,
    pages: [certDicodingWebP1, certDicodingWebP2, certDicodingWebP3],
    vectorIconKey: "code",
    bgGradient: "linear-gradient(135deg, #2563eb 0%, #1e1b4b 100%)",
  },
  {
    id: 2,
    name: { en: "Data Science with Microsoft Fabric", id: "Penerapan Data Science dengan Microsoft Fabric" },
    issuer: "Dicoding Indonesia & Microsoft",
    year: "2024",
    credential: "DICODING-DATA-FABRIC",
    icon: certDicodingDataP1,
    pages: [certDicodingDataP1, certDicodingDataP2, certDicodingDataP3],
    vectorIconKey: "database",
    bgGradient: "linear-gradient(135deg, #0284c7 0%, #082f49 100%)",
  },
  {
    id: 3,
    name: { en: "Gen AI Applications with Microsoft Azure", id: "Membangun Aplikasi Gen AI dengan Microsoft Azure" },
    issuer: "Dicoding Indonesia & Microsoft",
    year: "2024",
    credential: "DICODING-GENAI-AZURE",
    icon: certDicodingGenAiP1,
    pages: [certDicodingGenAiP1, certDicodingGenAiP2, certDicodingGenAiP3],
    vectorIconKey: "cpu",
    bgGradient: "linear-gradient(135deg, #0d9488 0%, #042f2e 100%)",
  },
  {
    id: 4,
    name: { en: "Spec-Driven Development with Kiro", id: "Spec-Driven Development dengan Kiro" },
    issuer: "Dicoding Indonesia",
    year: "2024",
    credential: "DICODING-KIRO-2024",
    icon: certDicodingKiroP1,
    pages: [certDicodingKiroP1, certDicodingKiroP2, certDicodingKiroP3],
    vectorIconKey: "layers",
    bgGradient: "linear-gradient(135deg, #db2777 0%, #4c0519 100%)",
  },
  {
    id: 5,
    name: { en: "Information Security Management System", id: "Sistem Manajemen Keamanan Informasi (BSN)" },
    issuer: "Badan Standardisasi Nasional",
    year: "2023",
    credential: "BSN-ISMS-2023",
    icon: certBSN,
    pages: [certBSN],
    vectorIconKey: "shield",
    bgGradient: "linear-gradient(135deg, #059669 0%, #064e3b 100%)",
  },
  {
    id: 6,
    name: { en: "Cisco CyberSecurity", id: "Cisco CyberSecurity" },
    issuer: "Cisco Networking Academy",
    year: "2023",
    credential: "CISCO-CYBER-2023",
    icon: certCisco,
    pages: [certCisco],
    vectorIconKey: "shield",
    bgGradient: "linear-gradient(135deg, #dc2626 0%, #7f1d1d 100%)",
  },
  {
    id: 7,
    name: { en: "Data Analysis With Python", id: "Data Analysis With Python (IBM)" },
    issuer: "IBM Cognitive Class",
    year: "2023",
    credential: "IBM-DA-PYTHON",
    icon: certIBMData,
    pages: [certIBMData],
    vectorIconKey: "database",
    bgGradient: "linear-gradient(135deg, #2563eb 0%, #1e3a8a 100%)",
  },
  {
    id: 8,
    name: { en: "Python 101 for Data Science", id: "Python 101 for Data Science (IBM)" },
    issuer: "IBM Cognitive Class",
    year: "2023",
    credential: "IBM-PY101-DS",
    icon: certIBMPython,
    pages: [certIBMPython],
    vectorIconKey: "code",
    bgGradient: "linear-gradient(135deg, #f59e0b 0%, #78350f 100%)",
  },
  {
    id: 9,
    name: { en: "Junior Cybersecurity", id: "Junior Cybersecurity" },
    issuer: "Digital Talent Scholarship",
    year: "2023",
    credential: "DTS-JCS-2023",
    icon: certJuniorCyber,
    pages: [certJuniorCyber],
    vectorIconKey: "shield",
    bgGradient: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
  },
  {
    id: 10,
    name: { en: "BSSN Certification", id: "Sertifikat BSSN" },
    issuer: "Badan Siber dan Sandi Negara",
    year: "2023",
    credential: "BSSN-CERT-2023",
    icon: certBSSN,
    pages: [certBSSN],
    vectorIconKey: "shield",
    bgGradient: "linear-gradient(135deg, #ea580c 0%, #7c2d12 100%)",
  },
  {
    id: 11,
    name: { en: "IAIE Certification", id: "Sertifikat IAIE" },
    issuer: "IAIE",
    year: "2023",
    credential: "IAIE-CERT-2023",
    icon: certIAIE,
    pages: [certIAIE],
    vectorIconKey: "award",
    bgGradient: "linear-gradient(135deg, #16a34a 0%, #14532d 100%)",
  },
  {
    id: 12,
    name: { en: "Coursera Achievement", id: "Penghargaan Coursera" },
    issuer: "Coursera",
    year: "2023",
    credential: "COURSERA-ACHIEVE",
    icon: certCoursera,
    pages: [certCoursera],
    vectorIconKey: "award",
    bgGradient: "linear-gradient(135deg, #2563eb 0%, #1e1b4b 100%)",
  },
  {
    id: 13,
    name: { en: "AKSADEMY Certification", id: "Sertifikasi AKSADEMY" },
    issuer: "AKSADEMY",
    year: "2023",
    credential: "AKSADEMY-CERT",
    icon: certAksademy,
    pages: [certAksademy],
    vectorIconKey: "award",
    bgGradient: "linear-gradient(135deg, #8b5cf6 0%, #4c1d95 100%)",
  },
];
