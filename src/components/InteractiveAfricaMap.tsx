import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'motion/react';
import {
  MAP_YEAR_PHASES,
  COLONIAL_POWERS,
  ColonialPowerId,
  RESOURCE_HOTSPOTS,
  RESISTANCE_MOVEMENTS,
  ARTIFICIAL_BORDERS,
  ResourceHotspot,
  ResistanceMovement,
  ArtificialBorderExample,
} from '../data/africaMapData';
import { ACCURATE_AFRICA_TERRITORIES } from '../data/accurateAfricaTerritories';
import { MAP_PRIMARY_SOURCES, MapPrimarySource } from '../data/mapPrimarySources';
import { AfricanTerritory } from '../data/africaMapData';
import { soundFx } from '../utils/soundEffects';
import { audioManager } from '../utils/audioManager';

interface InteractiveAfricaMapProps {
  onBackToConferenceRoom?: () => void;
  initialYear?: number;
}

// Regional Camera Presets for Cinematic Smooth Zoom
interface CameraZone {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  viewBox: [number, number, number, number]; // [x, y, width, height]
  description: string;
}

const REGIONAL_CAMERA_ZONES: Record<string, CameraZone> = {
  continent: {
    id: 'continent',
    name: 'Gesamtkontinent Afrika',
    shortName: 'Gesamtansicht',
    icon: '🌍',
    viewBox: [0, 0, 1000, 1050],
    description: 'Vollständige Kontinentalansicht von Tanger bis zum Kap der Guten Hoffnung.',
  },
  north: {
    id: 'north',
    name: 'Nordafrika & Maghreb',
    shortName: 'Nordafrika',
    icon: '🏜️',
    viewBox: [150, 140, 680, 290],
    description: 'Marokko, Algerien, Tunesien, Libyen und Ägypten mit Sueskanal.',
  },
  west: {
    id: 'west',
    name: 'Westafrika & Sahel',
    shortName: 'Westafrika',
    icon: '🌴',
    viewBox: [90, 290, 420, 275],
    description: 'Senegal, AOF, freies Liberia, Goldküste, Togo und Nigeria.',
  },
  central: {
    id: 'central',
    name: 'Kongobecken & Äquator',
    shortName: 'Kongobecken',
    icon: '🌿',
    viewBox: [380, 440, 360, 330],
    description: 'Kongo-Freistaat (Kautschuk-Terror), Kamerun, AEF und Angola.',
  },
  east: {
    id: 'east',
    name: 'Ostafrika & Horn von Afrika',
    shortName: 'Ostafrika',
    icon: '⛰️',
    viewBox: [610, 390, 380, 390],
    description: 'Kaiserreich Äthiopien (Sieg bei Adwa), Somalia, Kenia und Deutsch-Ostafrika.',
  },
  south: {
    id: 'south',
    name: 'Südliches Afrika',
    shortName: 'Südafrika',
    icon: '💎',
    viewBox: [420, 680, 380, 360],
    description: 'Deutsch-Südwestafrika (Völkermord), Rhodesien, Mosambik und Kapstadt.',
  },
};

// Outer master outline for oceanic wave contours & nautical boundary styling
const CONTINENT_OUTLINE_PATH = `
  M 225,175 
  C 250,175 320,172 370,172 
  C 420,175 465,180 510,195 
  C 525,225 515,245 495,255 
  C 525,258 580,268 635,250 
  C 660,248 685,245 735,240 
  C 765,238 795,252 790,275 
  C 780,320 775,360 790,420 
  C 800,460 825,490 855,515 
  C 865,516 945,518 920,560 
  C 890,600 875,630 815,690 
  C 790,715 775,735 758,780 
  C 745,815 740,835 745,865 
  C 735,895 720,925 685,965 
  C 675,975 650,995 625,1005 
  C 600,1015 570,1022 540,1015 
  C 525,1005 510,975 495,940 
  C 478,900 468,850 455,755 
  C 448,700 444,650 442,618 
  C 436,598 428,580 418,565 
  C 412,548 355,538 320,528 
  C 305,525 285,522 255,522 
  C 230,520 190,512 170,498 
  C 145,475 140,470 125,450 
  C 118,420 112,395 105,370 
  C 118,340 132,310 148,275 
  C 165,255 185,225 205,195 
  Z
`;

const MADAGASCAR_OUTLINE_PATH = `
  M 810,740 
  C 830,728 850,725 875,775 
  C 885,820 865,875 835,920 
  C 810,910 795,890 785,800 
  Z
`;

export const InteractiveAfricaMap: React.FC<InteractiveAfricaMapProps> = ({
  onBackToConferenceRoom,
  initialYear = 1885,
}) => {
  const [selectedYear, setSelectedYear] = useState<number>(initialYear);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedTerritory, setSelectedTerritory] = useState<AfricanTerritory | null>(null);
  const [hoveredTerritory, setHoveredTerritory] = useState<AfricanTerritory | null>(null);
  const [selectedResource, setSelectedResource] = useState<ResourceHotspot | null>(null);
  const [selectedResistance, setSelectedResistance] = useState<ResistanceMovement | null>(null);
  const [selectedBorder, setSelectedBorder] = useState<ArtificialBorderExample | null>(null);
  const [selectedSource, setSelectedSource] = useState<MapPrimarySource | null>(null);
  const [hoveredSource, setHoveredSource] = useState<MapPrimarySource | null>(null);

  // Regional camera state
  const [activeZoneKey, setActiveZoneKey] = useState<string>('continent');
  const [autoZoomOnDecade, setAutoZoomOnDecade] = useState<boolean>(true);
  const [viewBoxCoords, setViewBoxCoords] = useState<[number, number, number, number]>([0, 0, 1000, 1050]);

  // Label display mode: 'classic' | 'hover-only' | 'full'
  const [labelMode, setLabelMode] = useState<'classic' | 'hover-only' | 'full'>('classic');

  // Active layers
  const [activeLayers, setActiveLayers] = useState<{
    territories: boolean;
    sources: boolean;
    resources: boolean;
    resistance: boolean;
    borders: boolean;
  }>({
    territories: true,
    sources: true,
    resources: false,
    resistance: true,
    borders: false,
  });

  // Filter by power
  const [filterPower, setFilterPower] = useState<ColonialPowerId | 'all'>('all');

  const playTimerRef = useRef<NodeJS.Timeout | null>(null);
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  // Trigger contextual ambient audio when viewing the Africa Map
  useEffect(() => {
    audioManager.changeScene('africa-map');
  }, []);

  // Smoothly animate the SVG viewBox when activeZoneKey changes
  const animateViewBox = (target: [number, number, number, number]) => {
    const start = [...viewBoxCoords] as [number, number, number, number];
    const controls = animate(0, 1, {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const next: [number, number, number, number] = [
          start[0] + (target[0] - start[0]) * latest,
          start[1] + (target[1] - start[1]) * latest,
          start[2] + (target[2] - start[2]) * latest,
          start[3] + (target[3] - start[3]) * latest,
        ];
        setViewBoxCoords(next);
      },
    });
    return () => controls.stop();
  };

  const handleZoneSelect = (zoneKey: string) => {
    soundFx.playSubtleTick();
    setActiveZoneKey(zoneKey);
    const targetZone = REGIONAL_CAMERA_ZONES[zoneKey] || REGIONAL_CAMERA_ZONES.continent;
    animateViewBox(targetZone.viewBox);
  };

  // Auto-pan / zoom camera when decade changes (if enabled)
  useEffect(() => {
    if (!autoZoomOnDecade) return;

    let targetZone = 'continent';
    if (selectedYear === 1880) {
      targetZone = 'continent'; // Sovereign continent overview
    } else if (selectedYear === 1885) {
      targetZone = 'central'; // Congo & West Africa focus during Berlin Conference
    } else if (selectedYear === 1895) {
      targetZone = 'east'; // Horn of Africa & Battle of Adwa (1896)
    } else if (selectedYear === 1900) {
      targetZone = 'south'; // Boer War & South Africa / Rhodesia mining
    } else if (selectedYear === 1914) {
      targetZone = 'continent'; // The partitioned continent
    }

    setActiveZoneKey(targetZone);
    const zone = REGIONAL_CAMERA_ZONES[targetZone] || REGIONAL_CAMERA_ZONES.continent;
    animateViewBox(zone.viewBox);
  }, [selectedYear, autoZoomOnDecade]);

  // Auto-play through decades
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setSelectedYear((prev) => {
          const phases = MAP_YEAR_PHASES;
          const currentIndex = phases.findIndex((p) => p.year === prev);
          soundFx.playEpochTransition();
          if (currentIndex === -1 || currentIndex >= phases.length - 1) {
            return phases[0].year;
          }
          return phases[currentIndex + 1].year;
        });
      }, 5000);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
      }
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying]);

  const currentPhase =
    MAP_YEAR_PHASES.find((p) => p.year === selectedYear) || MAP_YEAR_PHASES[1];

  const handleYearChange = (year: number) => {
    soundFx.playEpochTransition();
    setSelectedYear(year);
  };

  const toggleLayer = (layer: 'territories' | 'sources' | 'resources' | 'resistance' | 'borders') => {
    soundFx.playSubtleTick();
    setActiveLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  };

  const handleTerritoryClick = (territory: AfricanTerritory) => {
    soundFx.playChamberTone(true);
    setSelectedTerritory(territory);
    setSelectedResource(null);
    setSelectedResistance(null);
    setSelectedBorder(null);
    setSelectedSource(null);
  };

  const handleSourceClick = (source: MapPrimarySource) => {
    soundFx.playChamberTone(false);
    setSelectedSource(source);
    setSelectedTerritory(null);
    setSelectedResource(null);
    setSelectedResistance(null);
    setSelectedBorder(null);
  };

  const handleResourceClick = (res: ResourceHotspot) => {
    soundFx.playSubtleTick();
    setSelectedResource(res);
    setSelectedTerritory(null);
    setSelectedResistance(null);
    setSelectedBorder(null);
    setSelectedSource(null);
  };

  const handleResistanceClick = (res: ResistanceMovement) => {
    soundFx.playChamberTone(true);
    setSelectedResistance(res);
    setSelectedTerritory(null);
    setSelectedResource(null);
    setSelectedBorder(null);
    setSelectedSource(null);
  };

  const handleBorderClick = (border: ArtificialBorderExample) => {
    soundFx.playSubtleTick();
    setSelectedBorder(border);
    setSelectedTerritory(null);
    setSelectedResource(null);
    setSelectedResistance(null);
    setSelectedSource(null);
  };

  const closeAnyDrawer = () => {
    setSelectedTerritory(null);
    setSelectedResource(null);
    setSelectedResistance(null);
    setSelectedBorder(null);
    setSelectedSource(null);
  };

  const toggle1880vs1914 = () => {
    soundFx.playGavelStrike();
    setSelectedYear((prev) => (prev === 1880 ? 1914 : 1880));
  };

  const formattedViewBox = `${viewBoxCoords[0].toFixed(1)} ${viewBoxCoords[1].toFixed(1)} ${viewBoxCoords[2].toFixed(1)} ${viewBoxCoords[3].toFixed(1)}`;

  return (
    <div className="relative w-full min-h-[calc(100dvh-56px)] bg-[#080604] text-[#e8ded0] flex flex-col items-center select-none pt-2 pb-12">
      {/* Top Banner & Header */}
      <div className="w-full max-w-7xl px-4 sm:px-6 pt-3 pb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-[#382d22]/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-[#c4a46a]/15 text-[#c4a46a] text-[10px] sm:text-xs font-cinzel uppercase tracking-widest border border-[#c4a46a]/30">
              Historische Kartographie 1880–1914
            </span>
            <span className="text-xs text-[#a89680] font-serif">
              Wettlauf um Afrika &amp; Berliner Konferenz
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-garamond font-normal text-[#f5ebd9] mt-0.5">
            Geographische Aufteilung des afrikanischen Kontinents
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={toggle1880vs1914}
            className="px-3 py-1.5 rounded bg-[#78350f]/60 hover:bg-[#92400e] text-[#fef3c7] text-xs font-cinzel font-semibold border border-[#d97706]/50 shadow transition-all cursor-pointer flex items-center gap-1.5"
            title="Sofortiger Kontrast zwischen 1880 (vor Konferenz) und 1914 (vollständige Aufteilung)"
          >
            <span>⚖️</span>
            <span>Vergleich: 1880 vs. 1914</span>
          </button>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              setIsPlaying(!isPlaying);
            }}
            className={`px-3 py-1.5 rounded text-xs font-cinzel transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-[#b91c1c] text-white shadow-[0_0_12px_rgba(220,38,38,0.6)]'
                : 'bg-[#281e16] hover:bg-[#382b20] text-[#c4a46a] border border-[#c4a46a]/40'
            }`}
          >
            <span>{isPlaying ? '⏸ Anhalten' : '▶ Epochen abspielen'}</span>
          </button>

          {onBackToConferenceRoom && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onBackToConferenceRoom();
              }}
              className="px-3 py-1.5 rounded bg-[#1c1611] hover:bg-[#2c2219] text-[#baa892] text-xs font-serif border border-[#3e3225] transition-colors cursor-pointer"
            >
              ← Zurück
            </button>
          )}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="w-full max-w-7xl px-3 sm:px-6 mt-3 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT / CENTER: Map Canvas, Timeline and Camera Controls (8 cols) */}
        <div className="lg:col-span-8 flex flex-col space-y-3">
          {/* Timeline Decade Slider Control Bar */}
          <div className="bg-[#120d09] rounded border border-[#3e3225] p-3 sm:p-4 shadow-xl">
            <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
              <div>
                <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#c4a46a] block">
                  Ausgewählte Epoche
                </span>
                <span className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9]">
                  Jahr {selectedYear}
                </span>
              </div>

              {/* Colonization Percentage Bar */}
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3 text-[11px] font-sans">
                  <span className="text-[#ef4444]">
                    Kolonisiert: <strong>{currentPhase.colonizedPercentage}%</strong>
                  </span>
                  <span className="text-[#f59e0b]">
                    Unabhängig: <strong>{currentPhase.independentPercentage}%</strong>
                  </span>
                </div>
                <div className="w-48 sm:w-56 h-2 rounded-full bg-[#271d15] overflow-hidden mt-1 flex border border-[#3e3326]">
                  <div
                    style={{ width: `${currentPhase.colonizedPercentage}%` }}
                    className="h-full bg-gradient-to-r from-[#b91c1c] to-[#dc2626] transition-all duration-700"
                  />
                  <div
                    style={{ width: `${currentPhase.independentPercentage}%` }}
                    className="h-full bg-[#ca8a04] transition-all duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Slider Track with Key Year Marks */}
            <div className="relative pt-2 pb-1">
              <input
                type="range"
                min="0"
                max={MAP_YEAR_PHASES.length - 1}
                step="1"
                value={MAP_YEAR_PHASES.findIndex((p) => p.year === selectedYear)}
                onChange={(e) => {
                  const idx = parseInt(e.target.value, 10);
                  handleYearChange(MAP_YEAR_PHASES[idx].year);
                }}
                className="w-full h-2 bg-[#251d16] rounded-lg appearance-none cursor-pointer accent-[#c4a46a] focus:outline-none"
                aria-label="Zeitschieberegler für historische Epochen"
              />

              {/* Ticks and Year Buttons */}
              <div className="flex items-center justify-between mt-2">
                {MAP_YEAR_PHASES.map((phase) => {
                  const isCurrent = phase.year === selectedYear;
                  return (
                    <button
                      key={`phase-tick-${phase.year}`}
                      onClick={() => handleYearChange(phase.year)}
                      className={`flex flex-col items-center cursor-pointer transition-all ${
                        isCurrent
                          ? 'text-[#f5ebd9] scale-105'
                          : 'text-[#8c7b68] hover:text-[#c4a46a]'
                      }`}
                    >
                      <span
                        className={`w-3.5 h-3.5 rounded-full border mb-1 transition-all ${
                          isCurrent
                            ? 'bg-[#c4a46a] border-[#fff] shadow-[0_0_10px_rgba(245,158,11,0.9)]'
                            : 'bg-[#1e1712] border-[#4a3b2c]'
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-cinzel font-semibold">
                        {phase.year}
                      </span>
                      <span className="hidden md:inline text-[9px] text-[#a89680] truncate max-w-[90px]">
                        {phase.year === 1880
                          ? 'Vor Konferenz'
                          : phase.year === 1885
                          ? 'Berliner Akte'
                          : phase.year === 1895
                          ? 'Adwa & Wettlauf'
                          : phase.year === 1900
                          ? 'Kautschukboom'
                          : '1. Weltkrieg'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Current Phase Context Summary */}
            <p className="text-xs font-serif text-[#d6c9b6] mt-2.5 pt-2 border-t border-[#2d2217] leading-relaxed">
              <strong className="text-[#edd9b9]">{currentPhase.globalHeadline}:</strong>{' '}
              {currentPhase.periodDescription}
            </p>
          </div>

          {/* Regional Camera Focus Bar (Smooth Animated Zoom Buttons) */}
          <div className="bg-[#120d09] rounded border border-[#3e3225] px-3 py-2 flex items-center justify-between gap-2 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] tracking-wider flex items-center gap-1">
                <span>🎥</span>
                <span className="hidden sm:inline">Kamera-Zoom:</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto">
              {Object.entries(REGIONAL_CAMERA_ZONES).map(([key, zone]) => (
                <button
                  key={`cam-${key}`}
                  onClick={() => handleZoneSelect(key)}
                  className={`px-2.5 py-1 rounded text-xs font-cinzel whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                    activeZoneKey === key
                      ? 'bg-[#c4a46a] text-[#0f0b07] font-bold shadow-md'
                      : 'bg-[#1e1712] text-[#c4b5a2] hover:text-[#fff] hover:bg-[#2b2017] border border-[#3e3225]'
                  }`}
                  title={zone.description}
                >
                  <span>{zone.icon}</span>
                  <span>{zone.shortName}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playSubtleTick();
                setAutoZoomOnDecade(!autoZoomOnDecade);
              }}
              className={`shrink-0 px-2 py-1 rounded text-[10px] font-cinzel border transition-colors cursor-pointer ${
                autoZoomOnDecade
                  ? 'bg-[#2a1d13] border-[#c4a46a] text-[#fef08a]'
                  : 'bg-[#16110c] border-[#382d22] text-[#806f5c]'
              }`}
              title="Kamera springt bei Zeitleisten-Wechsel automatisch in den historischen Brennpunkt"
            >
              Auto-Zoom: {autoZoomOnDecade ? 'AN' : 'AUS'}
            </button>
          </div>

          {/* SVG Map Canvas Container */}
          <div
            ref={svgContainerRef}
            className="relative w-full aspect-[1000/1050] max-h-[760px] bg-[#0c0906] rounded border border-[#3e3225] overflow-hidden shadow-2xl flex items-center justify-center p-2"
          >
            {/* Antique Parchment & Radial Vignette */}
            <div className="absolute inset-0 bg-[#090704] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#1c150e_0%,#110c08_55%,#070503_100%)] opacity-90 pointer-events-none" />

            {/* Interactive Floating Hover Tooltip for Primary Sources */}
            <AnimatePresence>
              {hoveredSource && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.93, y: 5 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none z-40 bg-[#16100c]/98 backdrop-blur-md border-2 border-[#d97706] p-3.5 rounded shadow-[0_20px_40px_rgba(0,0,0,0.9)] text-xs space-y-2 min-w-[260px] max-w-[340px]"
                  style={{
                    left: `${Math.min(75, Math.max(25, (hoveredSource.coords[0] / 1000) * 100))}%`,
                    top: `${Math.min(80, Math.max(20, (hoveredSource.coords[1] / 1050) * 100))}%`,
                    transform: 'translate(-50%, -115%)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#382d22] pb-1.5">
                    <span className="font-cinzel text-xs font-bold text-[#fef08a] flex items-center gap-1.5">
                      <span>📜</span>
                      <span>{hoveredSource.title}</span>
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#78350f]/80 text-[#fef3c7] font-mono shrink-0">
                      {hoveredSource.year}
                    </span>
                  </div>

                  <blockquote className="text-[11px] font-serif italic text-[#edd9b9] leading-relaxed bg-[#241a12] p-2 rounded border-l-2 border-[#f59e0b]">
                    {hoveredSource.quote}
                  </blockquote>

                  <div className="text-[10px] text-[#b8a690] space-y-0.5">
                    <p><strong>Autor:</strong> {hoveredSource.author} ({hoveredSource.role})</p>
                    <p className="truncate"><strong>Quelle:</strong> {hoveredSource.archivalSource}</p>
                  </div>
                  <span className="text-[9px] text-[#f59e0b] block pt-0.5 text-right font-cinzel">
                    Klicken für vollständiges Aktenzitat →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Interactive Floating Hover Tooltip for Territories */}
            <AnimatePresence>
              {hoveredTerritory && !selectedTerritory && !hoveredSource && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute pointer-events-none z-30 bg-[#16100c]/95 backdrop-blur-md border border-[#c4a46a] p-3 rounded shadow-2xl text-xs space-y-1 min-w-[210px] max-w-[280px]"
                  style={{
                    left: `${Math.min(80, Math.max(20, (hoveredTerritory.center[0] / 1000) * 100))}%`,
                    top: `${Math.min(82, Math.max(15, (hoveredTerritory.center[1] / 1050) * 100))}%`,
                    transform: 'translate(-50%, -115%)',
                  }}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-[#382d22] pb-1">
                    <span className="font-cinzel text-xs font-bold text-[#f5ebd9] truncate">
                      {hoveredTerritory.name}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2b1f14] border border-[#c4a46a]/50 text-[#edd9b9] shrink-0">
                      {COLONIAL_POWERS[hoveredTerritory.statusByYear[selectedYear]?.power || 'independent'].name.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#edd9b9] font-serif italic line-clamp-2">
                    {hoveredTerritory.statusByYear[selectedYear]?.title}
                  </p>
                  {hoveredTerritory.statusByYear[selectedYear]?.indigenousRule && (
                    <p className="text-[10px] text-[#a89680] truncate">
                      Herrschaft: <strong className="text-[#f5ebd9]">{hoveredTerritory.statusByYear[selectedYear]?.indigenousRule}</strong>
                    </p>
                  )}
                  <span className="text-[9px] text-[#f59e0b] block pt-0.5">
                    Klicken für Akten-Dossier →
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ocean Texture & Nautical Graticule Background SVG */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox={formattedViewBox}
            >
              {/* Latitude / Longitude Graticule grid */}
              <g stroke="#854d0e" strokeWidth="0.65" opacity="0.2" strokeDasharray="3 3">
                <line x1="60" y1="200" x2="940" y2="200" />
                <line x1="60" y1="360" x2="940" y2="360" />
                <line x1="60" y1="520" x2="940" y2="520" strokeWidth="1.2" strokeDasharray="none" opacity="0.35" />
                <line x1="60" y1="680" x2="940" y2="680" />
                <line x1="60" y1="840" x2="940" y2="840" />

                <line x1="200" y1="120" x2="200" y2="1010" />
                <line x1="380" y1="120" x2="380" y2="1010" />
                <line x1="560" y1="120" x2="560" y2="1010" />
                <line x1="740" y1="120" x2="740" y2="1010" />
              </g>

              {/* Equator & Tropic Labels */}
              <text x="75" y="515" fill="#a16207" fontSize="10" fontFamily="serif" letterSpacing="1" opacity="0.6">
                ÄQUATOR (0°)
              </text>
              <text x="75" y="355" fill="#a16207" fontSize="9" fontFamily="serif" letterSpacing="1" opacity="0.5">
                WENDEKREIS DES KREBSES (23.5° N)
              </text>
              <text x="75" y="835" fill="#a16207" fontSize="9" fontFamily="serif" letterSpacing="1" opacity="0.5">
                WENDEKREIS DES STEINBOCKS (23.5° S)
              </text>

              {/* Waterway Labels */}
              <text x="80" y="600" fill="#786650" fontSize="12" fontFamily="serif" fontStyle="italic" letterSpacing="4">
                ATLANTISCHER OZEAN
              </text>
              <text x="760" y="630" fill="#786650" fontSize="11" fontFamily="serif" fontStyle="italic" letterSpacing="3">
                INDISCHER OZEAN
              </text>
              <text x="460" y="150" fill="#786650" fontSize="11" fontFamily="serif" fontStyle="italic" letterSpacing="3">
                MITTELMEER
              </text>
              <text x="790" y="360" fill="#786650" fontSize="9" fontFamily="serif" fontStyle="italic">
                Rotes Meer
              </text>
              <text x="690" y="870" fill="#786650" fontSize="9" fontFamily="serif" fontStyle="italic">
                Straße von Mosambik
              </text>

              {/* Antique Cartographic Cartouche Banner */}
              <g transform="translate(140, 110)">
                <rect x="-80" y="-20" width="180" height="34" rx="3" fill="#120d09" stroke="#854d0e" strokeWidth="1" opacity="0.85" />
                <text x="10" y="2" fill="#edd9b9" fontSize="10" fontFamily="serif" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                  AFRIKA 1880–1914
                </text>
                <text x="10" y="12" fill="#8c7b68" fontSize="7.5" fontFamily="serif" textAnchor="middle">
                  Kartographische Abteilung Berlin
                </text>
              </g>

              {/* Ornate Antique Compass Rose at lower Atlantic */}
              <g transform="translate(190, 780)">
                <circle cx="0" cy="0" r="50" fill="#140f0a" stroke="#854d0e" strokeWidth="1.2" opacity="0.9" />
                <circle cx="0" cy="0" r="42" fill="none" stroke="#c4a46a" strokeWidth="0.6" strokeDasharray="2 2" />
                <circle cx="0" cy="0" r="8" fill="#c4a46a" stroke="#fff" strokeWidth="1" />
                <path d="M 0,-48 L 7,-12 L 48,0 L 7,12 L 0,48 L -7,12 L -48,0 L -7,-12 Z" fill="#2d2217" stroke="#c4a46a" strokeWidth="1.2" />
                <path d="M 0,-48 L 4,-12 L 0,0 Z" fill="#d97706" />
                <path d="M 48,0 L 12,4 L 0,0 Z" fill="#b45309" />
                <path d="M 0,48 L -4,12 L 0,0 Z" fill="#d97706" />
                <path d="M -48,0 L -12,-4 L 0,0 Z" fill="#b45309" />
                <text x="-4" y="-53" fill="#f5ebd9" fontSize="13" fontFamily="serif" fontWeight="bold">N</text>
                <text x="53" y="4" fill="#f5ebd9" fontSize="11" fontFamily="serif">O</text>
                <text x="-4" y="62" fill="#f5ebd9" fontSize="11" fontFamily="serif">S</text>
                <text x="-64" y="4" fill="#f5ebd9" fontSize="11" fontFamily="serif">W</text>
              </g>

              {/* Antique Scale Bar */}
              <g transform="translate(680, 1005)">
                <rect x="-10" y="-8" width="220" height="22" fill="#100c08" stroke="#3e3225" rx="2" opacity="0.8" />
                <line x1="0" y1="0" x2="200" y2="0" stroke="#f5ebd9" strokeWidth="2" />
                <line x1="0" y1="-4" x2="0" y2="4" stroke="#f5ebd9" strokeWidth="1.5" />
                <line x1="50" y1="-3" x2="50" y2="3" stroke="#f5ebd9" strokeWidth="1" />
                <line x1="100" y1="-4" x2="100" y2="4" stroke="#f5ebd9" strokeWidth="1.5" />
                <line x1="150" y1="-3" x2="150" y2="3" stroke="#f5ebd9" strokeWidth="1" />
                <line x1="200" y1="-4" x2="200" y2="4" stroke="#f5ebd9" strokeWidth="1.5" />
                <text x="0" y="10" fill="#a89680" fontSize="8" fontFamily="serif">0</text>
                <text x="90" y="10" fill="#a89680" fontSize="8" fontFamily="serif">1000 km</text>
                <text x="180" y="10" fill="#a89680" fontSize="8" fontFamily="serif">2000 km</text>
              </g>
            </svg>

            {/* MAIN INTERACTIVE VECTOR SVG MAP WITH SILKY SMOOTH VIEWBOX TRANSITION */}
            <svg
              viewBox={formattedViewBox}
              className="w-full h-full relative z-10 filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)]"
            >
              {/* Ocean Wave Outlines for Continent Coastline Depth */}
              <path
                d={CONTINENT_OUTLINE_PATH}
                fill="none"
                stroke="#0284c7"
                strokeWidth="10"
                opacity="0.12"
                strokeLinejoin="round"
              />
              <path
                d={CONTINENT_OUTLINE_PATH}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                opacity="0.22"
                strokeDasharray="4 6"
                strokeLinejoin="round"
              />
              <path
                d={MADAGASCAR_OUTLINE_PATH}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3.5"
                opacity="0.22"
                strokeDasharray="4 6"
              />

              {/* SEAMLESS HISTORICAL TERRITORY POLYGONS (100% GAP-FREE CONTINUOUS MESH) */}
              {activeLayers.territories && (
                <g id="african-territories-group">
                  {ACCURATE_AFRICA_TERRITORIES.map((territory) => {
                    const status = territory.statusByYear[selectedYear];
                    if (!status) return null;

                    const power = COLONIAL_POWERS[status.power];
                    const isSelected = selectedTerritory?.id === territory.id;
                    const isFiltered = filterPower !== 'all' && status.power !== filterPower;
                    const isHovered = hoveredTerritory?.id === territory.id;

                    return (
                      <g
                        key={`poly-${territory.id}`}
                        onClick={() => handleTerritoryClick(territory)}
                        onMouseEnter={() => setHoveredTerritory(territory)}
                        onMouseLeave={() => setHoveredTerritory(null)}
                        className="cursor-pointer transition-all duration-300"
                      >
                        <path
                          d={territory.path}
                          fill={power.color}
                          fillOpacity={isFiltered ? 0.08 : isSelected ? 0.96 : isHovered ? 0.90 : 0.78}
                          stroke={isSelected ? '#ffffff' : isHovered ? '#fef08a' : power.borderColor}
                          strokeWidth={isSelected ? 3.5 : isHovered ? 2.5 : 1.4}
                          strokeLinejoin="round"
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />

                        {/* REFINED HISTORICAL CARTOGRAPHIC LABELS */}
                        {labelMode !== 'hover-only' && !isFiltered && (
                          <g
                            transform={`translate(${territory.center[0]}, ${territory.center[1]})`}
                            className="pointer-events-none select-none transition-opacity duration-300"
                            style={{
                              opacity: isHovered || isSelected ? 1 : 0.88,
                            }}
                          >
                            <text
                              x="0"
                              y="0"
                              textAnchor="middle"
                              fontSize={
                                territory.id === 'french_west_africa' || territory.id === 'congo_free_state' || territory.id === 'sudan'
                                  ? '12'
                                  : territory.id === 'togo' || territory.id === 'liberia'
                                  ? '8'
                                  : '10'
                              }
                              fontFamily="serif"
                              fontWeight="600"
                              letterSpacing="1.5px"
                              fill={isSelected ? '#ffffff' : isHovered ? '#fef08a' : '#f5ebd9'}
                              style={{
                                paintOrder: 'stroke fill',
                                stroke: '#080604',
                                strokeWidth: '3.5px',
                                strokeLinejoin: 'round',
                              }}
                            >
                              {territory.name.toUpperCase()}
                            </text>

                            {labelMode === 'full' && (
                              <text
                                x="0"
                                y="11"
                                textAnchor="middle"
                                fontSize="7.5"
                                fontFamily="serif"
                                fontStyle="italic"
                                letterSpacing="0.8px"
                                fill="#edd9b9"
                                style={{
                                  paintOrder: 'stroke fill',
                                  stroke: '#080604',
                                  strokeWidth: '2.5px',
                                  strokeLinejoin: 'round',
                                }}
                              >
                                {status.power === 'independent' ? 'Autonom' : power.name.split(' ')[0]}
                              </text>
                            )}
                          </g>
                        )}
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Major African Rivers for Geographic Recognition */}
              <g stroke="#38bdf8" strokeWidth="2.2" fill="none" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none">
                {/* Nil & Weißer/Blauer Nil */}
                <path d="M 670,545 Q 660,420 645,360 Q 640,280 670,220 Q 685,190 750,240" />
                <path d="M 750,240 L 760,238" />
                {/* Kongo-Flusssystem */}
                <path d="M 442,618 Q 510,580 540,550 Q 590,540 610,570 Q 600,630 580,670" />
                {/* Nigerbogen */}
                <path d="M 180,430 Q 250,380 320,380 Q 380,410 390,480 Q 400,530 355,538" />
                {/* Sambesi */}
                <path d="M 570,755 Q 630,730 670,750 Q 710,760 720,790" />
                {/* Oranje-Fluss */}
                <path d="M 535,940 Q 520,920 495,940" />
              </g>

              {/* Major African Lakes */}
              <g fill="#0284c7" opacity="0.65" stroke="#38bdf8" strokeWidth="1" className="pointer-events-none">
                {/* Viktoriasee */}
                <ellipse cx="680" cy="540" rx="18" ry="16" />
                {/* Tanganjikasee */}
                <ellipse cx="640" cy="620" rx="8" ry="34" />
                {/* Malawisee */}
                <ellipse cx="670" cy="710" rx="7" ry="26" />
                {/* Tschadsee */}
                <ellipse cx="440" cy="440" rx="16" ry="12" />
              </g>

              {/* PRIMARY HISTORICAL SOURCE CITATION MARKERS (TOGGLEABLE OVERLAY) */}
              {activeLayers.sources && (
                <g id="map-primary-sources-group">
                  {MAP_PRIMARY_SOURCES.map((source) => {
                    const isSelected = selectedSource?.id === source.id;
                    const isHovered = hoveredSource?.id === source.id;
                    const badgeColor =
                      source.category === 'atrocity'
                        ? '#ef4444'
                        : source.category === 'resistance'
                        ? '#22c55e'
                        : source.category === 'treaty'
                        ? '#f59e0b'
                        : '#3b82f6';

                    return (
                      <g
                        key={`source-pin-${source.id}`}
                        transform={`translate(${source.coords[0]}, ${source.coords[1]})`}
                        onClick={() => handleSourceClick(source)}
                        onMouseEnter={() => setHoveredSource(source)}
                        onMouseLeave={() => setHoveredSource(null)}
                        className="cursor-pointer group"
                      >
                        {/* Antique Wax Seal / Parchment Medallion */}
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected || isHovered ? 20 : 15}
                          fill="none"
                          stroke={badgeColor}
                          strokeWidth="1.5"
                          opacity="0.8"
                          className="animate-pulse"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected || isHovered ? 16 : 13}
                          fill="#17110c"
                          stroke="#c4a46a"
                          strokeWidth={isSelected || isHovered ? 2.5 : 1.6}
                          className="transition-all duration-300"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected || isHovered ? 11 : 9}
                          fill={badgeColor}
                          fillOpacity="0.3"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize={isSelected || isHovered ? '12' : '10'}
                          className="pointer-events-none select-none font-bold"
                        >
                          📜
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ARTIFICIAL BORDERS OVERLAY (The Ruler of Berlin) */}
              {activeLayers.borders && (
                <g id="artificial-borders-group">
                  {ARTIFICIAL_BORDERS.map((border) => {
                    const isSelected = selectedBorder?.id === border.id;
                    return (
                      <g
                        key={`border-${border.id}`}
                        onClick={() => handleBorderClick(border)}
                        className="cursor-pointer group"
                      >
                        <line
                          x1={border.lineCoords[0][0]}
                          y1={border.lineCoords[0][1]}
                          x2={border.lineCoords[1][0]}
                          y2={border.lineCoords[1][1]}
                          stroke="#ef4444"
                          strokeWidth={isSelected ? 5 : 3.5}
                          strokeDasharray="6 4"
                          className="animate-pulse"
                        />
                        <circle
                          cx={(border.lineCoords[0][0] + border.lineCoords[1][0]) / 2}
                          cy={(border.lineCoords[0][1] + border.lineCoords[1][1]) / 2}
                          r="12"
                          fill="#17120e"
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                        <text
                          x={(border.lineCoords[0][0] + border.lineCoords[1][0]) / 2}
                          y={(border.lineCoords[0][1] + border.lineCoords[1][1]) / 2 + 4}
                          textAnchor="middle"
                          fill="#ef4444"
                          fontSize="10"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          📏
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* RESOURCE HOTSPOTS OVERLAY */}
              {activeLayers.resources && (
                <g id="resource-hotspots-group">
                  {RESOURCE_HOTSPOTS.map((res) => {
                    const isSelected = selectedResource?.id === res.id;
                    return (
                      <g
                        key={`res-${res.id}`}
                        transform={`translate(${res.x}, ${res.y})`}
                        onClick={() => handleResourceClick(res)}
                        className="cursor-pointer group"
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? 18 : 13}
                          fill="#1c1611"
                          stroke={isSelected ? '#f59e0b' : '#c4a46a'}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize="11"
                          className="pointer-events-none select-none"
                        >
                          {res.icon}
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}

              {/* ANTI-COLONIAL RESISTANCE MOVEMENTS OVERLAY */}
              {activeLayers.resistance && (
                <g id="resistance-movements-group">
                  {RESISTANCE_MOVEMENTS.map((mov) => {
                    const isSelected = selectedResistance?.id === mov.id;
                    return (
                      <g
                        key={`res-mov-${mov.id}`}
                        transform={`translate(${mov.x}, ${mov.y})`}
                        onClick={() => handleResistanceClick(mov)}
                        className="cursor-pointer group"
                      >
                        <circle
                          cx="0"
                          cy="0"
                          r="18"
                          fill="none"
                          stroke={mov.outcome === 'victory' ? '#22c55e' : '#ef4444'}
                          strokeWidth="1.5"
                          opacity="0.6"
                          className="animate-ping"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? 18 : 14}
                          fill="#17120e"
                          stroke={mov.outcome === 'victory' ? '#22c55e' : '#ef4444'}
                          strokeWidth={isSelected ? 2.5 : 1.5}
                          className="transition-all duration-300 group-hover:scale-125"
                        />
                        <text
                          x="0"
                          y="4"
                          textAnchor="middle"
                          fontSize="11"
                          className="pointer-events-none select-none"
                        >
                          ⚔️
                        </text>
                      </g>
                    );
                  })}
                </g>
              )}
            </svg>
          </div>

          {/* Map Layer Toggles, Empire Filter & Label Mode Row */}
          <div className="bg-[#120d09] rounded border border-[#3e3225] p-3 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            {/* Layer Toggles */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#a89680] font-cinzel text-[10px] uppercase">
                Ebenen:
              </span>
              <button
                onClick={() => toggleLayer('territories')}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  activeLayers.territories
                    ? 'bg-[#281e15] border-[#c4a46a] text-[#f5ebd9]'
                    : 'bg-[#18130e] border-[#382d22] text-[#806f5c]'
                }`}
              >
                🗺️ Territorien
              </button>
              <button
                onClick={() => toggleLayer('sources')}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  activeLayers.sources
                    ? 'bg-[#78350f]/80 border-[#f59e0b] text-[#fef08a] font-semibold'
                    : 'bg-[#18130e] border-[#382d22] text-[#806f5c]'
                }`}
                title="Historische Zitate und Primärquellen auf der Karte"
              >
                📜 Primärquellen &amp; Zitate
              </button>
              <button
                onClick={() => toggleLayer('resistance')}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  activeLayers.resistance
                    ? 'bg-[#281e15] border-[#22c55e] text-[#f5ebd9]'
                    : 'bg-[#18130e] border-[#382d22] text-[#806f5c]'
                }`}
              >
                ⚔️ Widerstand
              </button>
              <button
                onClick={() => toggleLayer('resources')}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  activeLayers.resources
                    ? 'bg-[#281e15] border-[#f59e0b] text-[#f5ebd9]'
                    : 'bg-[#18130e] border-[#382d22] text-[#806f5c]'
                }`}
              >
                🩸 Rohstoffraub
              </button>
              <button
                onClick={() => toggleLayer('borders')}
                className={`px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  activeLayers.borders
                    ? 'bg-[#450a0a] border-[#ef4444] text-[#fecaca]'
                    : 'bg-[#18130e] border-[#382d22] text-[#806f5c]'
                }`}
              >
                📏 Linealgrenzen
              </button>
            </div>

            {/* Label Mode & Power Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="text-[#a89680] font-cinzel text-[10px] uppercase">
                  Schrift:
                </span>
                <select
                  value={labelMode}
                  onChange={(e) => {
                    soundFx.playSubtleTick();
                    setLabelMode(e.target.value as typeof labelMode);
                  }}
                  className="bg-[#1c1611] text-[#f5ebd9] border border-[#3e3225] rounded px-2 py-1 text-xs font-serif cursor-pointer focus:outline-none"
                >
                  <option value="classic">Klassisch (Dezent)</option>
                  <option value="hover-only">Nur bei Hover (Reine Karte)</option>
                  <option value="full">Ausführlich mit Mächten</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-[#a89680] font-cinzel text-[10px] uppercase">
                  Macht:
                </span>
                <select
                  value={filterPower}
                  onChange={(e) => {
                    soundFx.playSubtleTick();
                    setFilterPower(e.target.value as ColonialPowerId | 'all');
                  }}
                  className="bg-[#1c1611] text-[#f5ebd9] border border-[#3e3225] rounded px-2 py-1 text-xs font-serif cursor-pointer focus:outline-none"
                >
                  <option value="all">Alle Mächte</option>
                  <option value="independent">Unabhängige afrikanische Staaten</option>
                  <option value="germany">Deutsches Reich</option>
                  <option value="britain">Großbritannien</option>
                  <option value="france">Frankreich</option>
                  <option value="belgium">Belgien / Leopold II.</option>
                  <option value="portugal">Portugal</option>
                  <option value="italy">Italien</option>
                  <option value="spain">Spanien</option>
                  <option value="ottoman">Osmanisches Reich</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Detail Dossier Drawer & Educational Context (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Colonial Powers Color Legend */}
          <div className="bg-[#120d09] rounded border border-[#3e3225] p-3.5 shadow-xl space-y-2">
            <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] tracking-widest block">
              Koloniale Legende ({selectedYear})
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-serif">
              {Object.entries(COLONIAL_POWERS).map(([key, power]) => (
                <div
                  key={`legend-${key}`}
                  onClick={() => {
                    soundFx.playSubtleTick();
                    setFilterPower(key as ColonialPowerId);
                  }}
                  className={`flex items-center gap-2 p-1 rounded transition-colors cursor-pointer ${
                    filterPower === key
                      ? 'bg-[#2b2016] text-[#fff]'
                      : 'hover:bg-[#1c1611] text-[#c4b5a2]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-sm shrink-0 border border-[#000]/60"
                    style={{ backgroundColor: power.color }}
                  />
                  <span className="truncate">
                    {power.flagSymbol} {power.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Active Drawer depending on click */}
          <AnimatePresence mode="wait">
            {/* Primary Source Document Detail Drawer */}
            {selectedSource && (
              <motion.div
                key={`drawer-source-${selectedSource.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#16100c] rounded border-2 border-[#d97706]/70 p-4 sm:p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between border-b border-[#382d22] pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] tracking-widest flex items-center gap-1.5">
                      <span>📜</span>
                      <span>Historische Primärquelle ({selectedSource.year})</span>
                    </span>
                    <h3 className="text-xl font-garamond font-bold text-[#f5ebd9]">
                      {selectedSource.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeAnyDrawer}
                    className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs leading-relaxed font-prose text-[#d6c7b2] space-y-3">
                  <div className="bg-[#241a12] p-3 rounded border border-[#4a3826] space-y-1">
                    <p className="text-[11px] text-[#f5ebd9]">
                      <strong>Verfasser:</strong> {selectedSource.author}
                    </p>
                    <p className="text-[10px] text-[#a89680]">
                      <strong>Rolle &amp; Funktion:</strong> {selectedSource.role}
                    </p>
                    <p className="text-[10px] text-[#c4a46a]">
                      <strong>Ort &amp; Datum:</strong> {selectedSource.location} · {selectedSource.date}
                    </p>
                  </div>

                  <div className="p-3.5 bg-[#1f150e] rounded border-l-3 border-[#f59e0b] space-y-1.5">
                    <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] block font-bold">
                      Originales Zitat / Aktenauszug:
                    </span>
                    <blockquote className="italic font-serif text-[12px] text-[#fef08a] leading-relaxed">
                      {selectedSource.quote}
                    </blockquote>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] block">
                      Historischer Kontext &amp; Analyse:
                    </span>
                    <p className="text-[11px] text-[#c4b5a2] leading-relaxed">
                      {selectedSource.historicalContext}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#2d2217] flex items-center justify-between text-[10px] text-[#8c7b68]">
                    <span>Archivnachweis:</span>
                    <span className="font-mono text-[#edd9b9] truncate max-w-[200px]" title={selectedSource.archivalSource}>
                      {selectedSource.archivalSource}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Territory Detail Drawer */}
            {selectedTerritory && (
              <motion.div
                key={`drawer-territory-${selectedTerritory.id}-${selectedYear}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#140f0c] rounded border border-[#c4a46a]/60 p-4 sm:p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between border-b border-[#382d22] pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] tracking-widest">
                      Territoriales Profil ({selectedYear})
                    </span>
                    <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                      {selectedTerritory.name}
                    </h3>
                  </div>
                  <button
                    onClick={closeAnyDrawer}
                    className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {(() => {
                  const status = selectedTerritory.statusByYear[selectedYear];
                  if (!status) return null;
                  const power = COLONIAL_POWERS[status.power];

                  return (
                    <div className="space-y-3 text-xs font-prose leading-relaxed text-[#d6c7b2]">
                      <div className="flex items-center gap-2.5 p-2 rounded bg-[#1c1611] border border-[#3e3225]">
                        <span
                          className="w-4 h-4 rounded-sm shrink-0 border border-[#000]"
                          style={{ backgroundColor: power.color }}
                        />
                        <div>
                          <strong className="text-[#f5ebd9] block text-xs">
                            {status.title}
                          </strong>
                          <span className="text-[10px] text-[#a89680] font-serif">
                            Machtbereich: {power.name}
                          </span>
                        </div>
                      </div>

                      <p>{status.subtext}</p>

                      {status.indigenousRule && (
                        <div className="bg-[#241a12] p-2.5 rounded border-l-2 border-[#f59e0b]">
                          <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] block mb-0.5">
                            Afrikanische Herrschaft &amp; Institutionen:
                          </span>
                          <p className="text-[#e8ded0]">{status.indigenousRule}</p>
                        </div>
                      )}

                      {status.keyResources && status.keyResources.length > 0 && (
                        <div>
                          <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] block mb-1">
                            Extrahierte Rohstoffe &amp; Häfen:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {status.keyResources.map((res, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-[#1b1510] rounded text-[11px] border border-[#3e3326] text-[#edd9b9]"
                              >
                                {res}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {status.resistanceEvent && (
                        <div className="p-2.5 bg-[#450a0a]/30 border border-[#ef4444]/40 rounded text-[#fca5a5]">
                          <strong className="text-[10px] uppercase font-cinzel block text-[#ef4444]">
                            ⚔️ Historischer Widerstand:
                          </strong>
                          {status.resistanceEvent}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </motion.div>
            )}

            {/* Resource Hotspot Drawer */}
            {selectedResource && (
              <motion.div
                key={`drawer-res-${selectedResource.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#140f0c] rounded border border-[#f59e0b]/60 p-4 sm:p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between border-b border-[#382d22] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedResource.icon}</span>
                    <div>
                      <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] tracking-widest">
                        Koloniale Rohstoffausbeutung
                      </span>
                      <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                        {selectedResource.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={closeAnyDrawer}
                    className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs leading-relaxed font-prose text-[#d6c7b2] space-y-2.5">
                  <div className="bg-[#241a12] p-2.5 rounded border border-[#4a3826]">
                    <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] block">
                      Hauptnutznießer in Europa:
                    </span>
                    <strong className="text-[#f5ebd9] text-xs">
                      {selectedResource.colonialPower}
                    </strong>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-[11px] text-[#c4a46a] uppercase tracking-wider mb-0.5">
                      Verwendung &amp; Europäischer Profit
                    </h4>
                    <p>{selectedResource.impactDescription}</p>
                  </div>

                  <div className="p-2.5 bg-[#450a0a]/30 border-l-2 border-[#ef4444] rounded text-[#fca5a5]">
                    <span className="text-[10px] uppercase font-cinzel font-semibold block mb-0.5 text-[#ef4444]">
                      Menschlicher Preis &amp; Zwangsarbeit
                    </span>
                    <p>{selectedResource.exploitativeMethod}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Resistance Movement Drawer */}
            {selectedResistance && (
              <motion.div
                key={`drawer-resist-${selectedResistance.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#140f0c] rounded border border-[#22c55e]/60 p-4 sm:p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between border-b border-[#382d22] pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel text-[#22c55e] tracking-widest flex items-center gap-1.5">
                      <span>⚔️</span>
                      <span>Antikolonialer Widerstand ({selectedResistance.year})</span>
                    </span>
                    <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                      {selectedResistance.title}
                    </h3>
                  </div>
                  <button
                    onClick={closeAnyDrawer}
                    className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs leading-relaxed font-prose text-[#d6c7b2] space-y-2.5">
                  <div className="bg-[#241a12] p-2.5 rounded border border-[#4a3826]">
                    <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] block">
                      Afrikanische Anführer &amp; Völker:
                    </span>
                    <strong className="text-[#f5ebd9] text-xs">
                      {selectedResistance.leader}
                    </strong>
                    <span className="text-[11px] text-[#a89680] block mt-1">
                      Koloniale Invasionsmacht: {selectedResistance.colonialOpponent}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-[11px] text-[#c4a46a] uppercase tracking-wider mb-0.5">
                      Taktik &amp; Verlauf
                    </h4>
                    <p>{selectedResistance.detailedAnalysis}</p>
                  </div>

                  <div
                    className={`p-2.5 rounded border ${
                      selectedResistance.outcome === 'victory'
                        ? 'bg-[#14532d]/30 border-[#22c55e]/50 text-[#86efac]'
                        : 'bg-[#450a0a]/30 border-[#ef4444]/50 text-[#fca5a5]'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-cinzel font-semibold block mb-0.5">
                      {selectedResistance.outcome === 'victory'
                        ? '✓ Historischer Sieg'
                        : 'Ausgang & Koloniale Vergeltung'}
                    </span>
                    <p>{selectedResistance.summary}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Artificial Border Example Drawer */}
            {selectedBorder && (
              <motion.div
                key={`drawer-border-${selectedBorder.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.25 }}
                className="bg-[#140f0c] rounded border border-[#ef4444]/60 p-4 sm:p-5 shadow-2xl space-y-3"
              >
                <div className="flex items-start justify-between border-b border-[#382d22] pb-2">
                  <div>
                    <span className="text-[10px] uppercase font-cinzel text-[#ef4444] tracking-widest flex items-center gap-1.5">
                      <span>📏</span>
                      <span>Das Lineal von Berlin</span>
                    </span>
                    <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                      {selectedBorder.name}
                    </h3>
                  </div>
                  <button
                    onClick={closeAnyDrawer}
                    className="text-xs text-[#a89680] hover:text-[#fff] p-1.5 rounded border border-[#3e3326] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="text-xs leading-relaxed font-prose text-[#d6c7b2] space-y-2.5">
                  <div className="bg-[#241a12] p-2.5 rounded border border-[#4a3826]">
                    <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] block">
                      Zerschnittenes Volk / Kulturraum:
                    </span>
                    <strong className="text-[#f5ebd9] text-xs">
                      {selectedBorder.splitEthnicGroup}
                    </strong>
                    <span className="text-[11px] text-[#a89680] block mt-1">
                      Betroffene Nationalstaaten heute: {selectedBorder.affectedStatesToday}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-cinzel text-[11px] text-[#c4a46a] uppercase tracking-wider mb-0.5">
                      Koloniale Willkür &amp; Nachwirkungen
                    </h4>
                    <p>{selectedBorder.context}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Default State: Overview Card if no item selected */}
            {!selectedTerritory && !selectedResource && !selectedResistance && !selectedBorder && !selectedSource && (
              <div className="bg-[#140f0c] rounded border border-[#3e3225] p-4 sm:p-5 shadow-xl space-y-3">
                <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] tracking-widest block">
                  Interaktive Analyse
                </span>
                <h3 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
                  Erkunde den Kontinent im Wandel
                </h3>
                <p className="text-xs font-prose text-[#b8a691] leading-relaxed">
                  Fahre mit der Maus über die Karte für Kurzinformationen oder klicke auf ein Territorium oder ein Primärquellen-Siegel 📜, um die koloniale Aufteilung und Originaldokumente zu studieren.
                </p>

                <div className="space-y-2 pt-2 border-t border-[#2a2016] text-xs font-serif text-[#d6c7b2]">
                  <div className="flex items-start gap-2">
                    <span className="text-[#f59e0b] font-bold">📜</span>
                    <span>
                      <strong>Primärquellen &amp; Zitate:</strong> Klicke auf die goldenen Siegel-Pins, um historische Originalzitate (Leopold II., Bismarck, Yaa Asantewaa, Menelik II.) zu lesen.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#c4a46a] font-bold">1.</span>
                    <span>
                      <strong>Zeitschieberegler oben:</strong> Verfolge, wie sich der Kontinent von 1880 (nur 11% kolonisiert) bis 1914 (über 92% unter europäischer Herrschaft) veränderte.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#22c55e] font-bold">2.</span>
                    <span>
                      <strong>⚔️ Schlacht-Pins:</strong> Erfahre mehr über die Schlacht von Adwa (1896), den Maji-Maji-Aufstand und den Völkermord an den Herero und Nama.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#38bdf8] font-bold">3.</span>
                    <span>
                      <strong>🎥 Kamera-Zoom:</strong> Nutze die oberen Zoom-Buttons, um direkt in regionale Schwerpunkte wie das Kongobecken oder Westafrika einzutauchen.
                    </span>
                  </div>
                </div>

                <div className="bg-[#241a12] p-3 rounded border border-[#3e3225] text-xs font-serif text-[#edd9b9] mt-3">
                  <span className="text-[#f59e0b] font-cinzel text-[10px] uppercase block mb-1">
                    Bismarcks Haltung 1884/85:
                  </span>
                  <p className="italic text-[11px] text-[#d6c9b6]">
                    „Ihre Karte von Afrika ist ja sehr schön, aber meine Karte von Afrika liegt in Europa. Hier liegt Russland, und hier liegt Frankreich, und wir sind in der Mitte; das ist meine Karte von Afrika.“
                  </p>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
