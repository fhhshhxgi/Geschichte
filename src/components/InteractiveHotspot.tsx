import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Hotspot } from '../types/conference';
import { soundFx } from '../utils/soundEffects';
import { CountryFlag } from './CountryFlag';

interface InteractiveHotspotProps {
  hotspot: Hotspot;
  onClick: (hotspot: Hotspot) => void;
  disabled?: boolean;
}

export const InteractiveHotspot: React.FC<InteractiveHotspotProps> = ({
  hotspot,
  onClick,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    e.stopPropagation();
    soundFx.playSubtleTick();
    onClick(hotspot);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      soundFx.playSubtleTick();
      onClick(hotspot);
    }
  };

  const handleMouseEnter = () => {
    if (disabled) return;
    setIsHovered(true);
    soundFx.playSubtleTick();
  };

  return (
    <div
      style={{
        left: `${hotspot.x}%`,
        top: `${hotspot.y}%`,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
    >
      <button
        type="button"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        disabled={disabled}
        aria-label={`${hotspot.label}${hotspot.subLabel ? `: ${hotspot.subLabel}` : ''}`}
        /* Touch target minimum 48px x 48px for effortless iPad tapping */
        className="group relative flex flex-col items-center justify-center w-12 h-12 sm:w-14 sm:h-14 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#c4a46a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#100d0a] rounded-full transition-transform active:scale-95 touch-manipulation"
      >
        {/* Subtle breathing glow ring */}
        <span
          className={`absolute inset-1 rounded-full transition-all duration-500 pointer-events-none ${
            hotspot.isSymbolic
              ? 'bg-[#f59e0b]/20 group-hover:bg-[#f59e0b]/40 scale-125 animate-pulse'
              : 'bg-[#c4a46a]/15 group-hover:bg-[#c4a46a]/35 scale-115'
          }`}
        />

        {/* Outer antique brass medallion */}
        <div
          className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-full border shadow-lg flex items-center justify-center transition-all duration-300 pointer-events-none ${
            hotspot.isSymbolic
              ? 'bg-[#2b1808]/90 border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.6)] group-hover:scale-115 animate-pulse'
              : hotspot.isMap
              ? 'bg-[#1a120b]/90 border-[#60a5fa] shadow-[0_0_10px_rgba(96,165,250,0.5)] group-hover:scale-115'
              : 'bg-[#18110b]/90 border-[#c4a46a]/80 group-hover:border-[#f5ebd9] shadow-[0_0_10px_rgba(196,164,106,0.4)] group-hover:scale-115'
          }`}
        >
          {/* Inner badge / flag / icon */}
          {hotspot.isSymbolic ? (
            <span className="text-xs">🪑</span>
          ) : hotspot.isMap ? (
            <span className="text-xs">🗺️</span>
          ) : hotspot.countryId ? (
            <CountryFlag countryId={hotspot.countryId} className="w-4 h-2.5 rounded-[1px] shadow-sm" />
          ) : (
            <span className="w-2.5 h-2.5 rounded-full bg-[#c4a46a] shadow-[0_0_6px_rgba(196,164,106,0.8)]" />
          )}

          {/* Tiny pin pointer triangle under the medallion */}
          <div
            className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45 border-r border-b ${
              hotspot.isSymbolic
                ? 'bg-[#2b1808] border-[#f59e0b]'
                : hotspot.isMap
                ? 'bg-[#1a120b] border-[#60a5fa]'
                : 'bg-[#18110b] border-[#c4a46a]'
            }`}
          />
        </div>

        {/* Minimal label tag that floats above hotspot on hover/focus */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key={`hotspot-tooltip-${hotspot.id}`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: -6, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 pointer-events-none mb-1 whitespace-nowrap z-30"
            >
              <div className="archival-panel px-3 py-1.5 rounded shadow-2xl border border-[#c4a46a]/40 text-center backdrop-blur-md">
                <div className="flex items-center gap-1.5 justify-center">
                  {hotspot.isSymbolic && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />
                  )}
                  {hotspot.countryId && (
                    <CountryFlag countryId={hotspot.countryId} className="w-3.5 h-2" />
                  )}
                  <p className="text-xs font-cinzel font-semibold tracking-wider text-[#f5ebd9]">
                    {hotspot.label}
                  </p>
                </div>
                {hotspot.subLabel && (
                  <p className="text-[10px] font-serif text-[#b8a58d] mt-0.5 max-w-[220px] truncate">
                    {hotspot.subLabel}
                  </p>
                )}
                <div className="mt-0.5 text-[8.5px] uppercase tracking-widest text-[#c4a46a] font-sans">
                  {hotspot.isSymbolic ? 'Tippen für Analyse' : hotspot.isMap ? 'Tippen für Wandkarte' : 'Tippen für Großporträt & Dossier'}
                </div>
              </div>
              {/* Tooltip arrow */}
              <div className="w-2 h-2 bg-[#1c1712] border-r border-b border-[#c4a46a]/40 rotate-45 mx-auto -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};
