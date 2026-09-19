import React from 'react';
import { MapPin, Code, Server, Palette, Database, ExternalLink, Globe, Cpu, Layout, Layers } from 'lucide-react';
import profilePhotoNobg from '../assets/foto_profile_nobg.png';

export default function BentoAbout({ t, isDarkMode, currentColors, professionalData }) {
  // Common card style generator for glassmorphism
  const cardStyle = (baseColor) => ({
    backgroundColor: isDarkMode ? "rgba(20, 33, 61, 0.4)" : "rgba(255, 255, 255, 0.7)",
    borderColor: isDarkMode ? "rgba(252, 163, 17, 0.15)" : "rgba(217, 119, 6, 0.15)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 lg:gap-6 w-full auto-rows-[220px]">
      
      {/* 1. Main Intro (Spans 2x2) */}
      <div 
        className="md:col-span-2 md:row-span-2 rounded-[2rem] p-8 relative overflow-hidden group border transition-all duration-500 hover:shadow-2xl"
        style={{ ...cardStyle(), boxShadow: isDarkMode ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.05)' }}
      >
        {/* Glow effect */}
        <div className="absolute -inset-20 bg-gradient-to-br from-amber-500/10 via-transparent to-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border"
                 style={{ 
                   backgroundColor: isDarkMode ? 'rgba(252, 163, 17, 0.1)' : 'rgba(217, 119, 6, 0.1)',
                   borderColor: isDarkMode ? 'rgba(252, 163, 17, 0.2)' : 'rgba(217, 119, 6, 0.2)',
                   color: currentColors.text.accent 
                 }}>
              <Code size={24} />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: currentColors.text.primary }}>
              {t('about.p1')}
            </h3>
          </div>
          <p className="text-base sm:text-lg leading-relaxed font-medium opacity-80" style={{ color: currentColors.text.secondary }}>
            {t('about.p2')}
          </p>
        </div>
      </div>

      {/* 2. Profile Photo Card (Spans 1x2) */}
      <div 
        className="md:col-span-1 md:row-span-2 rounded-[2rem] relative overflow-hidden group border transition-all duration-500 flex items-end justify-center"
        style={{ 
          backgroundColor: isDarkMode ? '#0F172A' : '#F1F5F9',
          borderColor: isDarkMode ? "rgba(252, 163, 17, 0.15)" : "rgba(217, 119, 6, 0.15)"
        }}
      >
        {/* Radial glow behind photo */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/30 blur-[60px] rounded-full" />
        
        <img 
          src={profilePhotoNobg} 
          alt={professionalData.name} 
          className="w-[140%] h-[120%] max-w-none object-cover object-top transition-transform duration-700 group-hover:scale-105" 
          style={{ transformOrigin: 'top center' }}
        />
        
        <div className="absolute bottom-6 left-6 right-6 z-20">
          <div className="flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full w-max border border-white/10 bg-white/10 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-black text-white uppercase tracking-wider">Available for work</span>
          </div>
          <h4 className="text-xl font-black text-white leading-tight mb-1">{professionalData.name}</h4>
          <p className="text-sm font-semibold text-white/70">{professionalData.title}</p>
        </div>
      </div>

      {/* 3. Stats / Metrics (Spans 1x1) */}
      <div 
        className="md:col-span-1 md:row-span-1 rounded-[2rem] p-6 relative overflow-hidden group border flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
        style={cardStyle()}
      >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="relative z-10">
          <Layers className="mb-4 opacity-50" size={24} style={{ color: currentColors.text.primary }} />
          <h4 className="text-4xl font-black mb-1" style={{ color: currentColors.text.accent }}>{professionalData.yearsOfExperience}</h4>
          <p className="text-sm font-bold uppercase tracking-wider" style={{ color: currentColors.text.secondary }}>{t('hero.stats.years')}</p>
        </div>
      </div>

      {/* 4. Location / Map (Spans 1x1) */}
      <div 
        className="md:col-span-1 md:row-span-1 rounded-[2rem] p-6 relative overflow-hidden group border flex flex-col justify-between transition-all duration-500 hover:-translate-y-1"
        style={cardStyle()}
      >
        {/* Map grid background pattern */}
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" 
             style={{ backgroundImage: `radial-gradient(${currentColors.text.primary} 1px, transparent 1px)`, backgroundSize: '16px 16px' }} />
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <MapPin size={24} style={{ color: currentColors.text.accent }} className="animate-bounce" />
          </div>
          <h4 className="text-xl font-bold mb-1" style={{ color: currentColors.text.primary }}>Bekasi, ID</h4>
          <p className="text-sm font-semibold" style={{ color: currentColors.text.secondary }}>Remote / On-site</p>
        </div>
      </div>

      {/* 5. Core Values / Pillars (Spans 3x1 on bottom row) */}
      <div 
        className="md:col-span-3 md:row-span-1 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden group border flex flex-col justify-center transition-all duration-500"
        style={cardStyle()}
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full relative z-10">
          {[
            { icon: <Layout size={24} />, label: t('about.stats.clean') },
            { icon: <Server size={24} />, label: t('about.stats.scalable') },
            { icon: <Palette size={24} />, label: t('about.stats.uiux') },
            { icon: <Cpu size={24} />, label: t('about.stats.performance') },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start gap-3 group-hover:transform group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${idx * 50}ms` }}>
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: currentColors.border,
                  color: currentColors.text.primary 
                }}
              >
                {item.icon}
              </div>
              <span className="text-sm font-bold text-center sm:text-left" style={{ color: currentColors.text.secondary }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Languages / Globe (Spans 1x1) */}
      <div 
        className="md:col-span-1 md:row-span-1 rounded-[2rem] p-6 relative overflow-hidden group border flex flex-col justify-center items-center text-center transition-all duration-500 hover:rotate-3"
        style={cardStyle()}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <Globe size={48} strokeWidth={1} style={{ color: currentColors.text.accent }} className="mb-4 opacity-80 group-hover:animate-spin-slow" />
        <h4 className="text-lg font-bold" style={{ color: currentColors.text.primary }}>Bilingual</h4>
        <p className="text-xs font-semibold uppercase tracking-widest mt-1" style={{ color: currentColors.text.secondary }}>ID • EN</p>
      </div>

    </div>
  );
}
