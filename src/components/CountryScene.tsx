import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CountryDelegation } from '../types/conference';
import { soundFx } from '../utils/soundEffects';
import { useCinemaFrame } from '../utils/useCinemaFrame';
import { useAssets } from '../context/AssetContext';

interface CountrySceneProps {
  delegation: CountryDelegation;
  onBack: () => void;
}

export const CountryScene: React.FC<CountrySceneProps> = ({
  delegation,
  onBack,
}) => {
  const [showPanel, setShowPanel] = useState<boolean>(true);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'uebersicht' | 'interessen' | 'folgen' | 'quellen'>('uebersicht');
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const { getImageUrl } = useAssets();

  // Responsive frame calculation ensuring detail image never gets cut off on iPad
  const { dimensions } = useCinemaFrame({
    aspectRatio: 16 / 9,
    reservedTop: 56,
    reservedBottom: 24,
    horizontalPadding: 16,
    verticalPadding: 8,
  });

  useEffect(() => {
    // Delay panel entrance slightly for the visual scene to settle
    const timer = setTimeout(() => {
      setShowPanel(true);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const handleReturn = () => {
    if (isReturning) return;
    setIsReturning(true);
    setShowPanel(false);
    soundFx.playChamberTone(false);
    setTimeout(() => {
      onBack();
    }, 600);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#090705] flex items-center justify-center select-none pt-14 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {/* 
        Central Detail Image Frame:
        Guaranteed exact 16:9 ratio fitting 100% inside any iPad viewport
      */}
      <div className="relative w-full h-full flex items-center justify-center p-2 min-h-0">
        <motion.div
          style={{
            width: dimensions.width > 0 ? `${dimensions.width}px` : '100%',
            height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
            aspectRatio: '16/9',
          }}
          initial={{ scale: 1.06, opacity: 0, filter: 'blur(3px)' }}
          animate={{
            scale: isReturning ? 1.12 : 1,
            opacity: isReturning ? 0 : 1,
            filter: isReturning ? 'blur(2px)' : 'blur(0px)',
          }}
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative max-w-full max-h-full overflow-hidden shadow-2xl rounded-sm flex items-center justify-center bg-[#100c08]"
        >
          <img
            src={getImageUrl(delegation.image)}
            alt={`${delegation.country} – ${delegation.representative}`}
            className="w-full h-full object-fill pointer-events-none block"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Cinematic atmospheric overlays */}
          <div className="absolute inset-0 pointer-events-none film-grain" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/20 to-black/30 lg:bg-gradient-to-r lg:from-black/20 lg:via-transparent lg:to-black/80" />
        </motion.div>
      </div>

      {/* Navigation and Controls Bar in top area */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-16 left-3 sm:top-18 sm:left-6 z-30 flex items-center gap-2"
      >
        {/* Back to Conference Room */}
        <button
          onClick={handleReturn}
          className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#dfd2be] border border-[#c4a46a]/50 hover:border-[#c4a46a] rounded transition-all duration-300 backdrop-blur-md cursor-pointer shadow-xl text-xs uppercase tracking-widest font-cinzel active:scale-95 min-h-[44px]"
        >
          <span className="text-[#c4a46a] group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
          <span>Zurück zum Saal</span>
        </button>

        {/* Toggle Dossier Panel (Crucial for iPad to freely inspect the painting) */}
        <button
          onClick={() => {
            soundFx.playSubtleTick();
            setIsPanelCollapsed(!isPanelCollapsed);
          }}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#c4a46a] border border-[#c4a46a]/30 hover:border-[#c4a46a] rounded transition-all backdrop-blur-md cursor-pointer shadow-xl text-xs font-serif min-h-[44px]"
          title={isPanelCollapsed ? 'Archivakte öffnen' : 'Bild freigeben'}
        >
          <span>{isPanelCollapsed ? '📖' : '👁️'}</span>
          <span className="hidden sm:inline">
            {isPanelCollapsed ? 'Akte einblenden' : 'Bildansicht'}
          </span>
        </button>
      </motion.div>

      {/* Delegation Title Watermark on top-right */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="absolute top-16 right-4 sm:top-18 sm:right-6 z-20 hidden md:block pointer-events-none"
      >
        <div className="text-right bg-[#120e0a]/80 backdrop-blur-sm px-3 py-1.5 rounded border border-[#3e3326]/50">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a46a] font-cinzel block">
            {delegation.country}
          </span>
          <span className="text-xs font-garamond text-[#d6c7b2]">
            {delegation.representative}
          </span>
        </div>
      </motion.div>

      {/* Archival Information Panel (Responsive Drawer / Side Panel for iPad) */}
      <AnimatePresence>
        {showPanel && !isPanelCollapsed && (
          <motion.div
            key={`dossier-panel-${delegation.id}`}
            initial={{ opacity: 0, y: 30, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-2 sm:right-4 bottom-2 sm:bottom-4 lg:top-16 lg:bottom-4 w-[calc(100%-16px)] sm:w-[420px] lg:w-[440px] xl:w-[480px] max-h-[65vh] lg:max-h-[calc(100vh-80px)] z-30 flex flex-col justify-end lg:justify-center pointer-events-auto"
          >
            <div className="archival-panel w-full rounded p-4 sm:p-5 border border-[#c4a46a]/40 backdrop-blur-xl shadow-2xl overflow-y-auto max-h-[62vh] lg:max-h-[82vh] bg-[#120e0b]/95">
              {/* Header */}
              <div className="border-b border-[#c4a46a]/25 pb-3 mb-3 flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a46a] font-cinzel block mb-0.5">
                    {delegation.country}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-garamond font-semibold text-[#f5ebd9] leading-tight">
                    {delegation.representative}
                  </h2>
                  <p className="text-xs font-serif text-[#b8a58d] mt-0.5 italic">
                    {delegation.representativeTitle}
                  </p>
                </div>
                {/* Minimize button inside drawer */}
                <button
                  onClick={() => setIsPanelCollapsed(true)}
                  className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  title="Akte einklappen"
                >
                  ✕
                </button>
              </div>

              {/* Supplemental Historical Portrait */}
              {delegation.portraitImage && (
                <div className="portrait-container relative mb-3 flex items-center gap-3 p-2 bg-[#0e0a07] rounded border border-[#3e3224]/70">
                  <div className="relative w-14 h-18 sm:w-16 sm:h-20 shrink-0 overflow-hidden rounded border border-[#c4a46a]/40 bg-[#17120e] shadow-md flex items-center justify-center">
                    <img
                      src={getImageUrl(delegation.portraitImage)}
                      alt={`Historisches Porträt von ${delegation.representative}`}
                      className="w-full h-full object-cover sepia-[0.2]"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.triedFallback) {
                          target.dataset.triedFallback = '1';
                          const cur = target.src;
                          if (cur.endsWith('.png')) {
                            target.src = cur.replace('.png', '.jpg');
                            return;
                          }
                          if (cur.includes('/portraits/')) {
                            target.src = cur.replace('/portraits/', '/images/');
                            return;
                          }
                        }
                        target.style.display = 'none';
                        const fb = target.parentElement?.querySelector('.portrait-fallback');
                        if (fb) (fb as HTMLElement).style.display = 'flex';
                      }}
                    />
                    <div className="portrait-fallback hidden w-full h-full flex-col items-center justify-center bg-gradient-to-b from-[#2a1d13] to-[#120c08] text-[#c4a46a] text-center p-1">
                      <span className="font-cinzel text-base font-bold">
                        {delegation.representative.split(' ').slice(-1)[0]?.charAt(0) || 'D'}
                      </span>
                      <span className="text-[8px] uppercase tracking-tighter text-[#8f7d69]">
                        1884
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[9px] uppercase tracking-widest text-[#c4a46a] font-cinzel block">
                        Historisches Porträt
                      </span>
                      <span className="text-[8px] text-[#8f7d69] font-serif border border-[#3e3224] px-1 rounded">
                        1884–1885
                      </span>
                    </div>
                    <p className="text-xs font-garamond font-semibold text-[#f5ebd9] truncate">
                      {delegation.representative}
                    </p>
                    <p className="text-[10px] text-[#9c8973] font-serif italic mt-0.5 line-clamp-2">
                      {delegation.representativeTitle}
                    </p>
                  </div>
                </div>
              )}

              {/* Segmented Control Tabs */}
              <div className="flex items-center gap-1 border-b border-[#3b3024] pb-2.5 mb-3 overflow-x-auto scrollbar-none">
                {[
                  { id: 'uebersicht', label: 'Rolle' },
                  { id: 'interessen', label: 'Interessen' },
                  { id: 'folgen', label: 'Folgen' },
                  { id: 'quellen', label: 'Quellen' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playSubtleTick();
                      setActiveTab(tab.id as typeof activeTab);
                    }}
                    className={`min-h-[36px] px-3 py-1.5 text-xs font-serif rounded transition-colors whitespace-nowrap cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#2d2319] text-[#edd9b9] border border-[#c4a46a]/40 font-medium'
                        : 'text-[#9e8d77] hover:text-[#ded1be]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-3.5 text-[#ded1be]">
                {activeTab === 'uebersicht' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                        Rolle auf der Konferenz
                      </h4>
                      <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                        {delegation.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                        Haltung während der Verhandlungen
                      </h4>
                      <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                        {delegation.conferencePosition}
                      </p>
                    </div>

                    {delegation.historicalQuotes && delegation.historicalQuotes.length > 0 && (
                      <div className="p-3 bg-[#130f0c] border-l-2 border-[#c4a46a] rounded-r text-xs italic font-prose text-[#e4d7c5]">
                        <p>„{delegation.historicalQuotes[0].text}“</p>
                        <p className="text-[10px] text-[#9c8973] font-sans not-italic mt-1">
                          — {delegation.historicalQuotes[0].author}, {delegation.historicalQuotes[0].context}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'interessen' && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                      Politische & Wirtschaftliche Interessen
                    </h4>
                    <ul className="space-y-2">
                      {delegation.interests.map((interest, idx) => (
                        <li key={`${delegation.id}-interest-${idx}`} className="flex items-start gap-2 text-xs sm:text-sm font-prose text-[#d1c2af]">
                          <span className="text-[#c4a46a] mt-0.5">·</span>
                          <span className="leading-relaxed">{interest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'folgen' && (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                        Historische Konsequenzen
                      </h4>
                      <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                        {delegation.consequences}
                      </p>
                    </div>

                    <div className="p-3 bg-[#1c1611] rounded border border-[#3e3326]/60">
                      <h5 className="text-[10px] uppercase tracking-wider text-[#e5a93c] font-cinzel mb-1">
                        Historische Einordnung
                      </h5>
                      <p className="text-xs font-prose text-[#c7b7a3] leading-relaxed">
                        {delegation.classification}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'quellen' && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                      Archivsignaturen & Primärquellen
                    </h4>
                    <div className="space-y-2">
                      {delegation.sources.map((src, idx) => (
                        <div key={`${delegation.id}-src-${idx}-${src.title}`} className="p-2.5 bg-[#14100c] rounded border border-[#382d22] text-xs">
                          <p className="font-serif text-[#edd9b9]">{src.title}</p>
                          <p className="text-[10px] text-[#9c8973] font-sans mt-0.5">
                            {src.institution} {src.year ? `(${src.year})` : ''}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
