import React from 'react';
import { MapPin, Mail, Calendar, Code, Database, Palette, Server, Briefcase } from 'lucide-react';
import profilePhoto from '../assets/foto_profile.jpeg';

export default function CleanAbout({ t, isDarkMode, currentColors, professionalData }) {
  // Simple, solid colors for a clean layout
  const cardBg = isDarkMode ? "rgba(255, 255, 255, 0.03)" : "#FFFFFF";
  const borderColor = isDarkMode ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)";

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-10 items-start">
      
      {/* Left Column: Photo & Quick Info */}
      <div className="w-full md:w-1/3 flex flex-col gap-6">
        <div 
          className="rounded-2xl overflow-hidden shadow-sm border" 
          style={{ borderColor }}
        >
          <img 
            src={profilePhoto} 
            alt={professionalData.name} 
            className="w-full h-auto object-cover aspect-square" 
          />
        </div>
        
        <div 
          className="rounded-2xl p-6 border shadow-sm flex flex-col gap-4" 
          style={{ backgroundColor: cardBg, borderColor }}
        >
          <div className="flex items-center gap-3">
            <MapPin size={18} style={{ color: currentColors.text.accent }} />
            <span className="text-sm font-medium" style={{ color: currentColors.text.primary }}>
              Bekasi, Indonesia
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Mail size={18} style={{ color: currentColors.text.accent }} />
            <span className="text-sm font-medium" style={{ color: currentColors.text.primary }}>
              {professionalData.email}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Briefcase size={18} style={{ color: currentColors.text.accent }} />
            <span className="text-sm font-medium" style={{ color: currentColors.text.primary }}>
              Available for work
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Bio & Details */}
      <div className="w-full md:w-2/3 flex flex-col gap-8">
        
        {/* Text Section */}
        <div>
          <h3 
            className="text-2xl sm:text-3xl font-bold mb-6 leading-tight" 
            style={{ color: currentColors.text.primary }}
          >
            {t('about.p1')}
          </h3>
          <p 
            className="text-base sm:text-lg leading-relaxed mb-4 opacity-90" 
            style={{ color: currentColors.text.secondary }}
          >
            {t('about.p2')}
          </p>
        </div>

        {/* Pillars / Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { icon: <Code size={20} />, label: t('about.stats.clean') },
            { icon: <Server size={20} />, label: t('about.stats.scalable') },
            { icon: <Palette size={20} />, label: t('about.stats.uiux') },
            { icon: <Database size={20} />, label: t('about.stats.performance') },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-4 p-4 rounded-xl border transition-colors hover:shadow-sm" 
              style={{ backgroundColor: cardBg, borderColor }}
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: isDarkMode ? "rgba(252, 163, 17, 0.1)" : "rgba(217, 119, 6, 0.1)",
                  color: currentColors.text.accent,
                }}
              >
                {item.icon}
              </div>
              <span 
                className="text-sm font-semibold leading-snug" 
                style={{ color: currentColors.text.primary }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="pt-8 border-t flex flex-wrap gap-10" style={{ borderColor }}>
           <div>
              <p className="text-4xl font-black mb-1" style={{ color: currentColors.text.primary }}>
                {professionalData.yearsOfExperience}
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: currentColors.text.secondary }}>
                {t('hero.stats.years')}
              </p>
           </div>
           <div>
              <p className="text-4xl font-black mb-1" style={{ color: currentColors.text.primary }}>
                10+
              </p>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: currentColors.text.secondary }}>
                {t('hero.stats.projects')}
              </p>
           </div>
        </div>

      </div>

    </div>
  );
}
