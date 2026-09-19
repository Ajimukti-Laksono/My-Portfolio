import React from "react";
import { User } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          <User className="inline mr-2" />
          Tentang Saya
        </h2>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <p className="text-lg text-gray-300 leading-relaxed mb-4">
            Saya adalah seorang Full Stack Developer dengan passion dalam
            membangun aplikasi web modern dan responsif. Dengan pengalaman lebih
            dari 3 tahun, saya fokus pada pengembangan aplikasi menggunakan
            React.js dan ekosistemnya.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            Saya senang belajar teknologi baru dan selalu berusaha menulis kode
            yang clean, maintainable, dan efisien. Tujuan saya adalah
            menciptakan solusi digital yang memberikan nilai nyata bagi
            pengguna.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
