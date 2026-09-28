import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MAP_REGIONS } from '../data/conferenceData';
import { MapRegion } from '../types/conference';
import { soundFx } from '../utils/soundEffects';
import { useCinemaFrame } from '../utils/useCinemaFrame';
import { useAssets } from '../context/AssetContext';

interface AfricaMapSceneProps {
  onBack: () => void;
}

export const AfricaMapScene: React.FC<AfricaMapSceneProps> = ({ onBack }) => {
  const [selectedRegion, setSelectedRegion] = useState<MapRegion | null>(null);
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const { getImageUrl } = useAssets();

  // Dynamic cinema frame calculation ensuring the map fits 100% on iPad
  const { dimensions } = useCinemaFrame({
    aspectRatio: 16 / 9,
    reservedTop: 56,
    reservedBottom: 24,
    horizontalPadding: 16,
    verticalPadding: 8,
  });

  const handleReturn = () => {
    if (isReturning) return;
    setIsReturning(true);
    soundFx.playChamberTone(false);
    setTimeout(() => {
      onBack();
    }, 600);
  };

  const handleSelectRegion = (region: MapRegion) => {
    soundFx.playSubtleTick();
    if (selectedRegion?.id === region.id) {
      setSelectedRegion(null);
    } else {
      setSelectedRegion(region);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#090705] flex items-center justify-center select-none pt-14 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {/* Central Map Canvas Frame - 100% visible on iPad */}
      <div className="relative w-full h-full flex items-center justify-center p-2 min-h-0">
        <motion.div
          style={{
            width: dimensions.width > 0 ? `${dimensions.width}px` : '100%',
            height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
            aspectRatio: '16/9',
          }}
          initial={{ scale: 1.05, opacity: 0, filter: 'blur(3px)' }}
          animate={{
            scale: isReturning ? 1.12 : 1,
            opacity: isReturning ? 0 : 1,
            filter: isReturning ? 'blur(2px)' : 'blur(0px)',
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative max-w-full max-h-full overflow-hidden shadow-2xl rounded-sm flex items-center justify-center bg-[#100d09]"
        >
          {/* Main Map Background */}
          <img
            src={getImageUrl('/images/08_afrika_karte_stilisiert.png')}
            alt="Historische Wandkarte von Afrika im Konferenzsaal der Reichskanzlei 1884"
            className="w-full h-full object-fill pointer-events-none block"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Atmospheric film grain and lighting */}
          <div className="absolute inset-0 pointer-events-none film-grain" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-black/40 lg:bg-gradient-to-r lg:from-black/30 lg:via-transparent lg:to-black/80" />

          {/* Interactive Map Region Markers directly in 16:9 canvas space */}
          <div className="absolute inset-0 pointer-events-auto">
            {MAP_REGIONS.map((region) => {
              const isSelected = selectedRegion?.id === region.id;
              return (
                <div
                  key={region.id}
                  style={{
                    left: `${region.x}%`,
                    top: `${region.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => handleSelectRegion(region)}
                    className="group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-[#c4a46a] rounded-full active:scale-95 touch-manipulation"
                    aria-label={`Region anwählen: ${region.name}`}
                  >
                    {/* Ping animation when active */}
                    {isSelected && (
                      <span className="absolute inset-2 rounded-full bg-[#f59e0b]/30 animate-ping" />
                    )}

                    {/* Outer marker ring */}
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all flex items-center justify-center ${
                        isSelected
                          ? 'border-[#f59e0b] bg-[#2d1e0d]/90 scale-110 shadow-[0_0_12px_rgba(245,158,11,0.6)]'
                          : 'border-[#c4a46a]/80 bg-[#17120e]/80 group-hover:scale-110 group-hover:border-[#fef08a]'
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isSelected ? 'bg-[#f59e0b]' : 'bg-[#c4a46a]'
                        }`}
                      />
                    </span>

                    {/* Tooltip / Label */}
                    <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-[#120e0a]/90 text-[10px] sm:text-xs font-serif text-[#edd9b9] border border-[#c4a46a]/30 whitespace-nowrap pointer-events-none shadow-lg">
                      {region.name}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Return button in top-left */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-16 left-3 sm:top-18 sm:left-6 z-30"
      >
        <button
          onClick={handleReturn}
          className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#dfd2be] border border-[#c4a46a]/50 hover:border-[#c4a46a] rounded transition-all backdrop-blur-md cursor-pointer shadow-xl text-xs uppercase tracking-widest font-cinzel min-h-[44px]"
        >
          <span className="text-[#c4a46a] group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Zurück zum Saal</span>
        </button>
      </motion.div>

      {/* Guide Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute top-16 right-4 sm:top-18 sm:right-6 z-20 hidden md:block pointer-events-none"
      >
        <div className="bg-[#14100c]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#3e3428]/60 text-right">
          <span className="text-[10px] uppercase tracking-widest text-[#c4a46a] font-cinzel block">
            Historische Wandkarte
          </span>
          <span className="text-xs font-serif text-[#d6c9b6]">
            Reichskanzlei Berlin, 1884–1885
          </span>
        </div>
      </motion.div>

      {/* Region Detail Card Drawer */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            key={`region-drawer-${selectedRegion.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 lg:top-16 lg:bottom-4 w-[calc(100%-16px)] sm:w-[400px] lg:w-[420px] max-h-[60vh] lg:max-h-[calc(100vh-80px)] z-30 flex flex-col justify-end lg:justify-center pointer-events-auto"
          >
            <div className="archival-panel w-full rounded p-4 sm:p-5 border border-[#c4a46a]/40 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[58vh] lg:max-h-[80vh] bg-[#120e0b]/95 space-y-3">
              <div className="border-b border-[#c4a46a]/25 pb-2.5 flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-cinzel block">
                    Region im Fokus
                  </span>
                  <h3 className="text-xl sm:text-2xl font-garamond font-semibold text-[#f5ebd9]">
                    {selectedRegion.name}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  title="Schließen"
                >
                  ✕
                </button>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel block mb-1">
                  Beteiligte Kolonialmächte: {selectedRegion.colonialPowers}
                </span>
                <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                  {selectedRegion.historicalContext}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                  Bedeutung auf der Konferenz
                </h4>
                <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                  {selectedRegion.conferenceRelevance}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                  Historische Folgen & Grenzziehung
                </h4>
                <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                  {selectedRegion.consequences}
                </p>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setSelectedRegion(null)}
                  className="w-full py-1.5 bg-[#251d16] hover:bg-[#34271c] text-[#edd9b9] rounded border border-[#3e3428] text-xs font-serif cursor-pointer"
                >
                  Karte weiter erkunden
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
