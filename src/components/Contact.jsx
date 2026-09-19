import React from "react";
import { Mail, Github, Linkedin } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gray-800/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">
          <Mail className="inline mr-2" />
          Hubungi Saya
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Mari bekerja sama! Hubungi saya untuk mendiskusikan project Anda.
        </p>
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://github.com"
            className="hover:text-blue-400 transition-colors"
          >
            <Github size={32} />
          </a>
          <a
            href="https://linkedin.com"
            className="hover:text-blue-400 transition-colors"
          >
            <Linkedin size={32} />
          </a>
          <a
            href="mailto:contact@example.com"
            className="hover:text-blue-400 transition-colors"
          >
            <Mail size={32} />
          </a>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nama Anda"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
            <input
              type="email"
              placeholder="Email Anda"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
            <textarea
              rows="4"
              placeholder="Pesan Anda"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={() =>
                alert(
                  "Terima kasih! Fitur pengiriman pesan akan segera diaktifkan.",
                )
              }
              className="w-full bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Kirim Pesan
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
