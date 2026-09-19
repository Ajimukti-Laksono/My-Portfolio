import React from "react";

const Hero = ({ scrollToSection }) => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="text-center">
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-5xl font-bold">
            JD
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Hi, Saya{" "}
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            John Doe
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Full Stack Developer | React Specialist
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            Lihat Project
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="border-2 border-blue-500 hover:bg-blue-500 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
          >
            Hubungi Saya
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
