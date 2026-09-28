import React, { useState } from 'react';
import { soundFx } from '../utils/soundEffects';

interface SiteFooterProps {
  onOpenLegalTab?: (tab: 'impressum' | 'urheberrecht' | 'datenschutz' | 'content-note' | 'geraete') => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onOpenLegalTab }) => {
  const handleOpen = (tab: 'impressum' | 'urheberrecht' | 'datenschutz' | 'content-note' | 'geraete') => {
    soundFx.playSubtleTick();
    if (onOpenLegalTab) {
      onOpenLegalTab(tab);
    }
  };

  return (
    <footer className="w-full bg-[#0a0705] border-t border-[#261d15] text-[#9c8973] py-8 px-4 sm:px-6 lg:px-12 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Project Info */}
        <div className="space-y-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="text-lg">🏛️</span>
            <span className="font-cinzel text-xs uppercase tracking-widest text-[#c4a46a] font-bold">
              Berliner Afrika-Konferenz 1884/85
            </span>
          </div>
          <p className="text-[11px] font-prose text-[#806f5c] max-w-md">
            Historisch-kritisches Bildungs- und Forschungsarchiv zur Dekonstruktion des europäischen Kolonialismus 
            und zur Würdigung des afrikanischen Widerstands.
          </p>
        </div>

        {/* Distributed Legal & Educational Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-serif text-[#b8a690]">
          <button
            onClick={() => handleOpen('impressum')}
            className="hover:text-[#f5ebd9] transition-colors cursor-pointer py-1"
          >
            Impressum (§ 5 DDG)
          </button>
          <span className="text-[#3e3225] hidden sm:inline">·</span>
          <button
            onClick={() => handleOpen('urheberrecht')}
            className="hover:text-[#f5ebd9] transition-colors cursor-pointer py-1"
          >
            OER &amp; Urheberrecht (§ 60a UrhG)
          </button>
          <span className="text-[#3e3225] hidden sm:inline">·</span>
          <button
            onClick={() => handleOpen('datenschutz')}
            className="hover:text-[#f5ebd9] transition-colors cursor-pointer py-1"
          >
            Datenschutz (DSGVO)
          </button>
          <span className="text-[#3e3225] hidden sm:inline">·</span>
          <button
            onClick={() => handleOpen('content-note')}
            className="hover:text-[#f5ebd9] transition-colors cursor-pointer py-1 text-[#f59e0b]"
          >
            ⚠️ Content Note
          </button>
          <span className="text-[#3e3225] hidden sm:inline">·</span>
          <button
            onClick={() => handleOpen('geraete')}
            className="hover:text-[#f5ebd9] transition-colors cursor-pointer py-1 text-[#c4a46a]"
          >
            📱 Tablet / iPad Querformat
          </button>
        </div>

        {/* Archival License Badge */}
        <div className="text-[11px] text-[#705e4c] font-cinzel text-center md:text-right">
          <span>CC BY-NC 4.0 · Open Educational Resource</span>
        </div>
      </div>
    </footer>
  );
};
