import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CENTRAL_HOTSPOTS, DelegationHotspot } from '../data/conferenceHotspots';
import { MAP_REGIONS } from '../data/conferenceData';
import { MapRegion } from '../types/conference';
import { InteractiveHotspot } from './InteractiveHotspot';
import { CountryFlag } from './CountryFlag';
import { InteractiveAfricaMap } from './InteractiveAfricaMap';
import { useCinemaFrame } from '../utils/useCinemaFrame';
import { soundFx } from '../utils/soundEffects';
import { useAssets } from '../context/AssetContext';

const DELEGATES = CENTRAL_HOTSPOTS.filter((h) => !h.isSymbolic && !h.isMap);

interface ConferenceRoomProps {
  initialTargetId?: string | null;
  onNavigateToDossier?: () => void;
}

export const ConferenceRoom: React.FC<ConferenceRoomProps> = ({
  initialTargetId = null,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { getImageUrl } = useAssets();

  // Active target: null = full room overview
  const [activeTarget, setActiveTarget] = useState<DelegationHotspot | null>(null);
  const [activeTab, setActiveTab] = useState<'uebersicht' | 'interessen' | 'folgen' | 'quellen'>('uebersicht');
  const [isPortraitLightbox, setIsPortraitLightbox] = useState<boolean>(false);

  // Empty chair deep-dive modal state
  const [activeAbsenceModal, setActiveAbsenceModal] = useState<'terranullius' | 'widerstand' | 'arbeit' | 'voelkermord' | null>(null);

  // Africa map region drawer state
  const [selectedMapRegion, setSelectedMapRegion] = useState<MapRegion | null>(null);

  // Responsive cinema frame calculation
  const { dimensions } = useCinemaFrame({
    aspectRatio: 16 / 9,
    reservedTop: 56,
    reservedBottom: 76,
    horizontalPadding: 16,
    verticalPadding: 8,
  });

  // Handle external navigation trigger
  useEffect(() => {
    if (initialTargetId) {
      const match = CENTRAL_HOTSPOTS.find((h) => h.id === initialTargetId);
      if (match && match.id !== activeTarget?.id) {
        handleSelectTarget(match);
      }
    }
  }, [initialTargetId]);

  // Subtle mouse parallax in idle mode
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTarget !== null) return;
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 2;
    const y = ((clientY - top) / height - 0.5) * 2;
    setMouseOffset({ x: x * 6, y: y * 4 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const handleSelectTarget = (target: DelegationHotspot) => {
    soundFx.playChamberTone(true);
    setActiveTarget(target);
    setActiveTab('uebersicht');
    setSelectedMapRegion(null);
    setActiveAbsenceModal(null);
    setIsPortraitLightbox(false);
  };

  const handleReturnToRoom = () => {
    soundFx.playChamberTone(false);
    setActiveTarget(null);
    setSelectedMapRegion(null);
    setActiveAbsenceModal(null);
    setIsPortraitLightbox(false);
  };

  const currentDelegateIndex = activeTarget && !activeTarget.isSymbolic && !activeTarget.isMap
    ? DELEGATES.findIndex((d) => d.id === activeTarget.id)
    : -1;

  const handleNextDelegate = () => {
    if (currentDelegateIndex === -1) return;
    const next = DELEGATES[(currentDelegateIndex + 1) % DELEGATES.length];
    soundFx.playSubtleTick();
    setActiveTarget(next);
    setActiveTab('uebersicht');
    setIsPortraitLightbox(false);
  };

  const handlePrevDelegate = () => {
    if (currentDelegateIndex === -1) return;
    const prev = DELEGATES[(currentDelegateIndex - 1 + DELEGATES.length) % DELEGATES.length];
    soundFx.playSubtleTick();
    setActiveTarget(prev);
    setActiveTab('uebersicht');
    setIsPortraitLightbox(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[100dvh] overflow-hidden bg-[#090705] flex flex-col items-center justify-between select-none pt-14 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      {/* 
        TOP ACTION BAR (Visible when a target is inspected)
      */}
      <AnimatePresence>
        {activeTarget && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-3 right-3 sm:top-18 sm:left-6 sm:right-6 z-40 flex items-center justify-between pointer-events-auto"
          >
            {/* Back to Room Button */}
            <button
              onClick={handleReturnToRoom}
              className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#dfd2be] border border-[#c4a46a]/60 hover:border-[#c4a46a] rounded transition-all backdrop-blur-md cursor-pointer shadow-2xl text-xs uppercase tracking-widest font-cinzel min-h-[44px] active:scale-95"
            >
              <span className="text-[#c4a46a] group-hover:-translate-x-1 transition-transform font-bold">
                ←
              </span>
              <span>Zurück zum Konferenzsaal</span>
            </button>

            {/* Delegate Next / Prev Navigation Switcher */}
            {!activeTarget.isSymbolic && !activeTarget.isMap && (
              <div className="flex items-center gap-1 sm:gap-2 bg-[#140f0b]/95 backdrop-blur-md px-2 py-1 rounded border border-[#c4a46a]/40 shadow-xl">
                <button
                  onClick={handlePrevDelegate}
                  className="px-2.5 py-1.5 text-xs text-[#c4a46a] hover:text-[#fff] hover:bg-[#271d14] rounded transition-colors cursor-pointer flex items-center gap-1 font-serif"
                  title="Vorheriger Delegierter"
                >
                  <span>◀</span>
                  <span className="hidden sm:inline">Vorheriger</span>
                </button>
                <span className="text-[11px] font-cinzel text-[#d4c3ae] px-1.5 font-semibold">
                  {currentDelegateIndex + 1} / {DELEGATES.length}
                </span>
                <button
                  onClick={handleNextDelegate}
                  className="px-2.5 py-1.5 text-xs text-[#c4a46a] hover:text-[#fff] hover:bg-[#271d14] rounded transition-colors cursor-pointer flex items-center gap-1 font-serif"
                  title="Nächster Delegierter"
                >
                  <span className="hidden sm:inline">Nächster</span>
                  <span>▶</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        MAIN CONTENT STAGE
      */}
      <div className="relative flex-1 w-full flex items-center justify-center p-2 min-h-0">
        {/* ======================================================== */}
        {/* MODE A: FULL CONFERENCE ROOM OVERVIEW (Idle table view)   */}
        {/* ======================================================== */}
        {!activeTarget && (
          <motion.div
            key="room-overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: mouseOffset.x, y: mouseOffset.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              width: dimensions.width > 0 ? `${dimensions.width}px` : '100%',
              height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
              aspectRatio: '16/9',
            }}
            className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl rounded-sm overflow-hidden bg-[#120e0a]"
          >
            {/* Master Conference Room Scene */}
            <img
              src={getImageUrl('/images/01_start_konferenzraum.png')}
              alt="Die Berliner Konferenz 1884 im Konferenzsaal der Reichskanzlei"
              className="w-full h-full object-fill pointer-events-none select-none block"
              referrerPolicy="no-referrer"
              loading="eager"
            />

            {/* Atmosphere */}
            <div className="absolute inset-0 pointer-events-none film-grain" />
            <div className="absolute inset-0 pointer-events-none vignette-subtle" />

            {/* Interactive Hotspots for all 14 delegations, chair, map */}
            <div className="absolute inset-0 pointer-events-auto">
              {CENTRAL_HOTSPOTS.map((hotspot) => (
                <InteractiveHotspot
                  key={`room-hotspot-${hotspot.id}`}
                  hotspot={{
                    id: hotspot.id,
                    label: hotspot.country,
                    subLabel: hotspot.representative
                      ? `${hotspot.representative} · ${hotspot.representativeTitle}`
                      : hotspot.shortDescription,
                    x: hotspot.hotspotX,
                    y: hotspot.hotspotY,
                    hotspotX: hotspot.hotspotX,
                    hotspotY: hotspot.hotspotY,
                    sceneImage: hotspot.sceneImage,
                    portraitImage: hotspot.portraitImage,
                    targetScene: hotspot.isSymbolic
                      ? 'africa-absence'
                      : hotspot.isMap
                      ? 'africa-map'
                      : 'country',
                    countryId: !hotspot.isSymbolic && !hotspot.isMap ? hotspot.id : undefined,
                    isSymbolic: hotspot.isSymbolic,
                    isMap: hotspot.isMap,
                  }}
                  onClick={() => handleSelectTarget(hotspot)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* MODE B: LARGE DELEGATE PORTRAIT & ARCHIVAL DOSSIER STAGE  */}
        {/* ======================================================== */}
        {activeTarget && !activeTarget.isSymbolic && !activeTarget.isMap && (
          <motion.div
            key={`delegate-hero-${activeTarget.id}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-5 lg:gap-8 px-3 sm:px-6 pt-12 sm:pt-14 pb-2 overflow-y-auto lg:overflow-hidden z-20 pointer-events-auto"
          >
            {/* LEFT / CENTER: VERY LARGE HISTORICAL PORTRAIT DISPLAY */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] xl:max-w-[430px]">
              {/* Antique Gilt Museum Frame */}
              <div
                onClick={() => setIsPortraitLightbox(true)}
                className="relative group w-full rounded-sm overflow-hidden border-4 border-[#c4a46a] shadow-[0_20px_50px_rgba(0,0,0,0.95)] bg-[#120d09] cursor-pointer"
                title="Klicken für maximale Vollbild-Ansicht"
              >
                {/* Large 3:4 Aspect Oil Portrait */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d0a07] flex items-center justify-center">
                  <img
                    src={getImageUrl(activeTarget.portraitImage || activeTarget.sceneImage)}
                    alt={`Historisches Porträt von ${activeTarget.representative}`}
                    className="w-full h-full object-cover sepia-[0.12] contrast-[1.05] transition-transform duration-500 group-hover:scale-102 block"
                    referrerPolicy="no-referrer"
                    loading="eager"
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
                    }}
                  />

                  {/* Atmospheric Canvas Vignette */}
                  <div className="absolute inset-0 pointer-events-none film-grain" />
                  <div className="absolute inset-0 pointer-events-none vignette-subtle" />

                  {/* Magnifier badge hint on hover */}
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-serif text-[#f5ebd9] border border-[#c4a46a]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shadow-xl pointer-events-none">
                    <span>🔍</span>
                    <span>Vollbild</span>
                  </div>
                </div>

                {/* Museum Gallery Brass Engraved Plaque */}
                <div className="p-3 bg-gradient-to-b from-[#241a12] via-[#1a120c] to-[#120c08] border-t border-[#c4a46a]/50 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CountryFlag countryId={activeTarget.id} className="w-4 h-3 shadow-xs" />
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a46a] font-cinzel font-semibold">
                      {activeTarget.country}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-garamond font-bold text-[#f5ebd9] leading-tight">
                    {activeTarget.representative}
                  </h3>
                  <p className="text-[11px] font-serif italic text-[#baa892] mt-0.5 line-clamp-1">
                    {activeTarget.representativeTitle}
                  </p>
                </div>
              </div>

              {/* Quick action button below portrait */}
              <button
                onClick={() => setIsPortraitLightbox(true)}
                className="mt-2.5 px-3 py-1.5 bg-[#1b140e] hover:bg-[#291e15] text-[#c4a46a] hover:text-[#f5ebd9] border border-[#c4a46a]/40 rounded text-xs font-serif flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
              >
                <span>🔍</span>
                <span>Porträt in Vollbild öffnen</span>
              </button>
            </div>

            {/* RIGHT: COMPLETE ARCHIVAL DOSSIER */}
            <div className="flex-1 w-full max-w-2xl archival-panel rounded-lg p-4 sm:p-6 border border-[#c4a46a]/50 shadow-2xl backdrop-blur-xl bg-[#120e0b]/95 overflow-y-auto max-h-[68vh] lg:max-h-[75vh]">
              {/* Header */}
              <div className="border-b border-[#c4a46a]/25 pb-3 mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <CountryFlag countryId={activeTarget.id} className="w-5 h-3.5 shadow-sm" />
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a46a] font-cinzel block">
                    {activeTarget.country}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-garamond font-semibold text-[#f5ebd9] leading-tight">
                  {activeTarget.representative}
                </h2>
                <p className="text-xs font-serif text-[#b8a58d] mt-0.5 italic">
                  {activeTarget.representativeTitle}
                </p>
              </div>

              {/* Segmented Control Tabs */}
              <div className="flex items-center gap-1 border-b border-[#3b3024] pb-2.5 mb-3 overflow-x-auto scrollbar-none">
                {[
                  { id: 'uebersicht', label: 'Rolle auf der Konferenz' },
                  { id: 'interessen', label: 'Interessen' },
                  { id: 'folgen', label: 'Folgen' },
                  { id: 'quellen', label: 'Quellen' },
                ].map((tab) => (
                  <button
                    key={`dossier-tab-${tab.id}`}
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
                        {activeTarget.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] uppercase tracking-wider text-[#c4a46a] font-cinzel mb-1">
                        Haltung während der Verhandlungen
                      </h4>
                      <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                        {activeTarget.conferencePosition}
                      </p>
                    </div>

                    {activeTarget.historicalQuotes && activeTarget.historicalQuotes.length > 0 && (
                      <div className="p-3 bg-[#130f0c] border-l-2 border-[#c4a46a] rounded-r text-xs italic font-prose text-[#e4d7c5]">
                        <p>„{activeTarget.historicalQuotes[0].text}“</p>
                        <p className="text-[10px] text-[#9c8973] font-sans not-italic mt-1">
                          — {activeTarget.historicalQuotes[0].author}, {activeTarget.historicalQuotes[0].context}
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
                      {activeTarget.interests.map((interest, idx) => (
                        <li key={`${activeTarget.id}-interest-${idx}`} className="flex items-start gap-2 text-xs sm:text-sm font-prose text-[#d1c2af]">
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
                        {activeTarget.consequences}
                      </p>
                    </div>

                    <div className="p-3 bg-[#1c1611] rounded border border-[#3e3224]/60">
                      <h5 className="text-[10px] uppercase tracking-wider text-[#e5a93c] font-cinzel mb-1">
                        Historische Einordnung
                      </h5>
                      <p className="text-xs font-prose text-[#c7b7a3] leading-relaxed">
                        {activeTarget.classification}
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
                      {activeTarget.sources.map((src, idx) => (
                        <div key={`${activeTarget.id}-src-${idx}-${src.title}`} className="p-2.5 bg-[#14100c] rounded border border-[#382d22] text-xs">
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

        {/* ======================================================== */}
        {/* MODE C: EMPTY CHAIR SCENE (Symbolic Africa Absence)       */}
        {/* ======================================================== */}
        {activeTarget && activeTarget.isSymbolic && (
          <motion.div
            key="empty-chair-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              width: dimensions.width > 0 ? `${dimensions.width}px` : '100%',
              height: dimensions.height > 0 ? `${dimensions.height}px` : 'auto',
              aspectRatio: '16/9',
            }}
            className="relative max-w-full max-h-full flex items-center justify-center shadow-2xl rounded-sm overflow-hidden bg-[#120e0a]"
          >
            <img
              src={getImageUrl('/images/02_leerer_platz_symbolisch.png')}
              alt="Leerer Stuhl – Afrikas Abwesenheit"
              className="w-full h-full object-fill pointer-events-none select-none block"
            />
            <div className="absolute inset-0 pointer-events-none film-grain" />

            {/* Solemn African Absence Overlay */}
            <div className="absolute inset-x-4 bottom-4 sm:bottom-8 z-30 max-w-2xl mx-auto pointer-events-auto">
              <div className="archival-panel p-5 sm:p-7 rounded border border-[#f59e0b]/50 shadow-2xl backdrop-blur-xl bg-[#0e0906]/95 text-center space-y-3">
                <span className="text-[11px] uppercase tracking-[0.35em] text-[#f59e0b] font-cinzel block">
                  Symbolische Didaktische Leerstelle
                </span>
                <h1 className="text-2xl sm:text-3xl font-garamond font-normal text-[#f5ebd9] leading-tight">
                  Wer fehlt an diesem Tisch?
                </h1>
                <p className="text-xs sm:text-sm font-prose text-[#d8c8b4] leading-relaxed max-w-xl mx-auto">
                  Auf der Berliner Konferenz 1884/85 verhandelten 14 europäische und westliche Staaten
                  über die Aufteilung des afrikanischen Kontinents.
                  <strong> Kein einziger afrikanischer Herrscher, Diplomat oder Vertreter war geladen oder anwesend.</strong>
                </p>

                {/* Didactic Clarification */}
                <div className="p-3 bg-[#17110b] rounded border border-[#f59e0b]/30 text-left text-[11px] font-prose text-[#baa78f] leading-relaxed">
                  <strong className="text-[#f59e0b] font-cinzel block mb-0.5">Wichtige Klarstellung:</strong>
                  Der leere Stuhl ist eine didaktisch-symbolische Visualisierung der Nicht-Beteiligung Afrikas
                  und war kein historisch dokumentierter offizieller „Afrika-Sitzplatz“ im Sitzungssaal der Reichskanzlei.
                </div>

                {/* Deep-dive topic buttons */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-left">
                  {[
                    { id: 'terranullius', label: 'Terra Nullius', sub: 'Rechtliche Fiktion' },
                    { id: 'widerstand', label: 'Widerstand', sub: 'Maji-Maji & mehr' },
                    { id: 'arbeit', label: 'Zwangsarbeit', sub: 'Kongo-Gräuel' },
                    { id: 'voelkermord', label: 'Völkermord', sub: 'Herero & Nama' },
                  ].map((item) => (
                    <button
                      key={`absence-topic-${item.id}`}
                      onClick={() => {
                        soundFx.playSubtleTick();
                        setActiveAbsenceModal(item.id as typeof activeAbsenceModal);
                      }}
                      className="p-2 sm:p-2.5 bg-[#17120e]/95 hover:bg-[#251d16] border border-[#f59e0b]/30 hover:border-[#f59e0b] rounded transition-all cursor-pointer shadow-lg active:scale-95 min-h-[44px]"
                    >
                      <p className="text-xs font-cinzel text-[#f5ebd9] font-medium leading-tight">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-[#9c8973] font-serif mt-0.5 truncate">
                        {item.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ======================================================== */}
        {/* MODE D: INTERACTIVE AFRICA MAP WITH TIMELINE SLIDER       */}
        {/* ======================================================== */}
        {activeTarget && activeTarget.isMap && (
          <motion.div
            key="wall-map-scene"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full overflow-y-auto z-20 pointer-events-auto"
          >
            <InteractiveAfricaMap
              onBackToConferenceRoom={handleReturnToRoom}
              initialYear={1885}
            />
          </motion.div>
        )}
      </div>

      {/* 
        FULLSCREEN LIGHTBOX FOR PORTRAITS
      */}
      <AnimatePresence>
        {isPortraitLightbox && activeTarget && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md"
            onClick={() => setIsPortraitLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-4xl max-h-[94vh] flex flex-col items-center justify-center pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsPortraitLightbox(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-serif px-2.5 py-1 rounded bg-black/60 border border-white/20 cursor-pointer"
              >
                ✕ Schließen
              </button>

              <div className="border-4 border-[#c4a46a] rounded-sm overflow-hidden shadow-2xl bg-[#0e0a07]">
                <img
                  src={getImageUrl(activeTarget.portraitImage || activeTarget.sceneImage)}
                  alt={activeTarget.representative}
                  className="max-h-[82vh] w-auto object-contain block"
                />
              </div>

              <div className="mt-3 text-center text-xs font-serif text-[#d6c7b2] bg-[#16100b] px-4 py-1.5 rounded border border-[#3e3224]">
                <span className="font-cinzel text-[#c4a46a] uppercase tracking-wider font-bold">
                  {activeTarget.country}:{' '}
                </span>
                <span className="font-garamond text-sm text-[#f5ebd9] font-semibold">
                  {activeTarget.representative}
                </span>{' '}
                — <span className="italic text-[#baa892]">{activeTarget.representativeTitle}</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        EMPTY CHAIR TOPIC DEEP-DIVE MODAL
      */}
      <AnimatePresence>
        {activeAbsenceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="archival-panel max-w-xl w-full p-6 rounded border border-[#f59e0b]/50 shadow-2xl text-[#ded1be] space-y-4 bg-[#120e0b]/98"
            >
              <div className="flex items-center justify-between border-b border-[#3e3224] pb-3">
                <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                  {activeAbsenceModal === 'terranullius' && 'Die Fiktion der „Terra Nullius“'}
                  {activeAbsenceModal === 'widerstand' && 'Antikolonialer Widerstand'}
                  {activeAbsenceModal === 'arbeit' && 'Zwangsarbeit & die Kongo-Gräuel'}
                  {activeAbsenceModal === 'voelkermord' && 'Der Völkermord an Herero und Nama'}
                </h3>
                <button
                  onClick={() => setActiveAbsenceModal(null)}
                  className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed space-y-3">
                {activeAbsenceModal === 'terranullius' && (
                  <p>
                    Europäische Rechtsgelehrte wandten den Begriff „Terra Nullius“ (herrenloses Land) auf Afrika an.
                    Sie argumentierten, dass nur staatliche Gebilde nach europäischem Muster völkerrechtliche Verträge
                    besäßen. Hunderte hochkomplexe afrikanische Staaten, Reiche und Rechtstraditionen wurden schlicht für nichtexistent erklärt.
                  </p>
                )}
                {activeAbsenceModal === 'widerstand' && (
                  <p>
                    Die Annexion Afrikas stieß überall auf entschlossenen Widerstand. Ob König Jaja von Opobo am Niger,
                    die Maji-Maji-Aufständischen in Deutsch-Ostafrika, die Ashanti in Westafrika oder Menelik II. in Äthiopien,
                    der die italienische Armee 1896 bei Adua vernichtend schlug – die afrikanischen Völker wehrten sich mit allen Mitteln.
                  </p>
                )}
                {activeAbsenceModal === 'arbeit' && (
                  <p>
                    Unter der Flagge der auf der Konferenz anerkannten AIC errichtete König Leopold II. ein brutales Regime der Zwangsarbeit.
                    Dörfer wurden niedergebrannt, Frauen als Geiseln gehalten und Männer zur Kautschukgewinnung gezwungen.
                    Historiker schätzen, dass Millionen Menschen diesem Terrorsystem zum Opfer fielen.
                  </p>
                )}
                {activeAbsenceModal === 'voelkermord' && (
                  <p>
                    In Deutsch-Südwestafrika (Namibia) führten Landenteignung und Misshandlungen 1904 zum Aufstand der Herero und Nama.
                    General Lothar von Trotha erließ den berüchtigten Vernichtungsbefehl. Zehntausende wurden in die Wüste getrieben
                    oder starben in Konzentrationslagern – der erste Völkermord des 20. Jahrhunderts.
                  </p>
                )}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveAbsenceModal(null)}
                  className="px-4 py-1.5 bg-[#251d16] hover:bg-[#34271c] text-[#dfd2be] text-xs font-cinzel rounded border border-[#f59e0b]/40 cursor-pointer"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 
        MAP REGION DRAWER
      */}
      <AnimatePresence>
        {selectedMapRegion && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="absolute right-3 sm:right-6 bottom-4 sm:bottom-12 max-w-md w-full z-40 archival-panel p-5 rounded border border-[#f59e0b]/50 shadow-2xl backdrop-blur-xl bg-[#120e0b]/95 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#3b3024] pb-2">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#f59e0b] font-cinzel">
                  {selectedMapRegion.areaLabel}
                </span>
                <h3 className="text-lg font-garamond font-semibold text-[#f5ebd9]">
                  {selectedMapRegion.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMapRegion(null)}
                className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="text-xs font-prose text-[#ded1be] space-y-2 leading-relaxed">
              <p><strong>Mächte:</strong> {selectedMapRegion.colonialPowers}</p>
              <p>{selectedMapRegion.historicalContext}</p>
              <div className="p-2.5 bg-[#17120e] rounded border border-[#3e3224]">
                <strong className="text-[#f59e0b] block mb-0.5">Konferenzbeschluss:</strong>
                {selectedMapRegion.conferenceRelevance}
              </div>
              <p className="text-[11px] text-[#baa78f]"><strong>Folgen:</strong> {selectedMapRegion.consequences}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 
        BOTTOM QUICK SELECTION DOCK
      */}
      <footer className="w-full px-3 py-1.5 z-20 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p className="text-[11px] font-serif text-[#a89882] hidden lg:flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#c4a46a] animate-pulse" />
          {activeTarget
            ? 'Tippen Sie auf „Zurück zum Konferenzsaal“ für die Saalübersicht'
            : 'Tippen Sie auf einen Delegierten, um das historische Großporträt zu öffnen'}
        </p>

        {/* Floating delegation selector pills */}
        <div className="flex items-center gap-1 sm:gap-1.5 bg-[#14100c]/90 backdrop-blur-md p-1 sm:p-1.5 rounded border border-[#3e3428]/80 shadow-2xl overflow-x-auto max-w-full scrollbar-none">
          <span className="text-[10px] font-cinzel text-[#8f7e6b] px-1 uppercase tracking-wider hidden md:inline">
            Schnellwahl:
          </span>

          {CENTRAL_HOTSPOTS.map((h) => {
            const isSymbolic = h.isSymbolic;
            const isMap = h.isMap;
            const isSelected = activeTarget?.id === h.id;

            return (
              <button
                key={`quick-dock-${h.id}`}
                onClick={() => handleSelectTarget(h)}
                title={`${h.country}${h.representative ? ` – ${h.representative}` : ''}`}
                className={`min-h-[38px] px-2.5 sm:px-3 py-1.5 text-xs font-serif rounded transition-all cursor-pointer active:scale-95 whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#c4a46a]/25 text-[#f5ebd9] border border-[#c4a46a] shadow-md font-semibold'
                    : isSymbolic
                    ? 'text-[#f59e0b] bg-[#2a1d0f]/90 hover:bg-[#382814] border border-[#f59e0b]/40'
                    : isMap
                    ? 'text-[#edd9b9] bg-[#221a14]/90 hover:bg-[#30251c] border border-[#c4a46a]/40'
                    : 'text-[#d4c3ae] bg-[#1a1410]/80 hover:bg-[#2b2118] border border-[#3e3327]'
                }`}
              >
                {!isSymbolic && !isMap && <CountryFlag countryId={h.id} className="w-3.5 h-2.5 shrink-0" />}
                {isSymbolic && <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] animate-ping" />}
                <span>{h.country}</span>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
