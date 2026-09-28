import React from "react";
import { Cpu } from "lucide-react";
import { groupedSkillsData } from "../data/skills";

export default function Skills({ visibleSections, isDarkMode, currentColors, t }) {
  const allSkills = Object.values(groupedSkillsData).flat();

  return (
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
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Scrolling Marquee Rows */}
        <div className="mb-8 sm:mb-12">
          {/* First Row - Moving Left */}
          <div className="flex mb-6 sm:mb-8 animate-scroll-left">
            {[...allSkills, ...allSkills].map((skill, idx) => (
              <div key={`row1-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 group">
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
              ...allSkills.slice().reverse(),
              ...allSkills.slice().reverse(),
            ].map((skill, idx) => (
              <div key={`row2-${idx}`} className="flex-shrink-0 mx-2 sm:mx-4 group">
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
  );
}
