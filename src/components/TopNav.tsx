import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/soundEffects';
import { audioManager, AudioScene } from '../utils/audioManager';
import { useAssets } from '../context/AssetContext';

interface TopNavProps {
  currentScene: 'conference-room' | 'country-detail' | 'africa-absence' | 'africa-map' | 'imperialism' | 'dossier';
  onNavigate: (scene: 'conference-room' | 'africa-absence' | 'africa-map' | 'imperialism' | 'dossier') => void;
  onOpenSources: () => void;
  onOpenLegal?: () => void;
  onReplayIntro: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentScene,
  onNavigate,
  onOpenSources,
  onOpenLegal,
  onReplayIntro,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setIsImportModalOpen, loadedCount, totalExpectedCount, hasCustomImages } = useAssets();

  useEffect(() => {
    setIsMuted(audioManager.getMuted());
    const unsub = audioManager.subscribe(() => {
      setIsMuted(audioManager.getMuted());
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    const next = audioManager.toggleMute();
    setIsMuted(next);
  };

  const getSceneSoundLabel = (scene: string) => {
    switch (scene) {
      case 'conference-room': return 'Konferenzsaal (Murmeln & Uhr)';
      case 'africa-map': return 'Wind über Afrika & Ozean';
      case 'imperialism': return 'Industrieller Puls & Raubbau';
      case 'dossier': return 'Staatsarchiv & Federkiel';
      case 'africa-absence': return 'Leerer Stuhl (Mahnendes Echo)';
      default: return 'Historische Atmosphäre';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#0c0907]/90 backdrop-blur-md border-b border-[#382d22]/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => {
            soundFx.playSubtleTick();
            onNavigate('conference-room');
          }}
          className="text-sm sm:text-base font-cinzel font-semibold tracking-wider text-[#f5ebd9] hover:text-[#fff] transition-colors whitespace-nowrap cursor-pointer truncate max-w-[190px] sm:max-w-none flex items-center gap-2 min-h-[44px]"
        >
          <span>Berliner Konferenz 1884</span>
        </button>

        {/* Navigation links - visible on iPad & desktop */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-serif tracking-wider text-[#b8a691]">
          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onNavigate('conference-room');
            }}
            className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap cursor-pointer hover:text-[#f4ede1] ${
              currentScene === 'conference-room' || currentScene === 'country-detail'
                ? 'text-[#f5ebd9] underline underline-offset-8 decoration-[#c4a46a]'
                : ''
            }`}
          >
            🏛️ Konferenzsaal
          </button>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onNavigate('africa-map');
            }}
            className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap cursor-pointer hover:text-[#f4ede1] ${
              currentScene === 'africa-map'
                ? 'text-[#f5ebd9] underline underline-offset-8 decoration-[#c4a46a]'
                : ''
            }`}
          >
            🗺️ Afrika-Karte (1880–1914)
          </button>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onNavigate('imperialism');
            }}
            className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap cursor-pointer hover:text-[#f4ede1] ${
              currentScene === 'imperialism'
                ? 'text-[#f59e0b] underline underline-offset-8 decoration-[#f59e0b]'
                : ''
            }`}
          >
            🩸 Imperialismus &amp; Ausbeutung
          </button>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onNavigate('africa-absence');
            }}
            className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap cursor-pointer hover:text-[#f4ede1] ${
              currentScene === 'africa-absence'
                ? 'text-[#f59e0b] underline underline-offset-8 decoration-[#f59e0b]'
                : ''
            }`}
          >
            🪑 Leerer Stuhl
          </button>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onNavigate('dossier');
            }}
            className={`min-h-[44px] flex items-center transition-colors whitespace-nowrap cursor-pointer hover:text-[#f4ede1] ${
              currentScene === 'dossier'
                ? 'text-[#f5ebd9] underline underline-offset-8 decoration-[#c4a46a]'
                : ''
            }`}
          >
            📜 Akten &amp; Zeitleiste
          </button>
        </nav>

        {/* Zone 3: Actions + Audio + Sources */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Subtle audio toggle with equalizer wave */}
          <button
            onClick={handleToggleSound}
            title={
              isMuted
                ? 'Atmosphäre einschalten'
                : `Aktiver Raumton: ${getSceneSoundLabel(currentScene)} (Klicken zum Stummschalten)`
            }
            className={`min-h-[40px] px-2.5 py-1.5 rounded text-xs font-serif transition-all border cursor-pointer flex items-center gap-2 active:scale-95 ${
              !isMuted
                ? 'bg-[#291b10] border-[#c4a46a] text-[#f5ebd9] shadow-[0_0_10px_rgba(196,164,106,0.3)]'
                : 'text-[#a89680] hover:text-[#f5ebd9] border-[#3e3224]/70 bg-transparent'
            }`}
            aria-label={isMuted ? 'Atmosphäre einschalten' : 'Stummschalten'}
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
            {!isMuted ? (
              <span className="flex items-center gap-1">
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2 bg-[#f59e0b] rounded-full animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#c4a46a] rounded-full animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
                </span>
                <span className="hidden xl:inline text-[11px] whitespace-nowrap font-sans text-[#edd9b9]">
                  {getSceneSoundLabel(currentScene)}
                </span>
              </span>
            ) : (
              <span className="hidden xl:inline text-[11px] whitespace-nowrap font-sans">
                Ton aus
              </span>
            )}
          </button>

          {/* Sources button */}
          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onOpenSources();
            }}
            className="min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded text-xs font-serif text-[#c4a46a] hover:text-[#f5ebd9] transition-colors border border-[#c4a46a]/40 hover:border-[#c4a46a] cursor-pointer flex items-center gap-1.5 active:scale-95"
          >
            <span>📖</span>
            <span className="hidden sm:inline">Quellen</span>
          </button>

          {/* Legal and Disclaimer Notice button */}
          {onOpenLegal && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenLegal();
              }}
              className="min-h-[40px] px-2.5 sm:px-3 py-1.5 rounded text-xs font-serif text-[#a89680] hover:text-[#f5ebd9] transition-colors border border-[#3e3224]/70 hover:border-[#854d0e] cursor-pointer flex items-center gap-1.5 active:scale-95"
              title="Impressum, Urheberrecht (§ 60a UrhG), Datenschutz und iPad-Empfehlung"
            >
              <span>⚖️</span>
              <span className="hidden md:inline">Rechtliches</span>
            </button>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded text-[#c4a46a] border border-[#3e3224] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Menü öffnen"
          >
            <span>{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0a07] border-b border-[#382d22] px-4 py-3 space-y-2 text-xs font-serif">
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onNavigate('conference-room');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left border ${
                currentScene === 'conference-room'
                  ? 'bg-[#2a1d12] text-[#f5ebd9] border-[#c4a46a]/50'
                  : 'bg-[#17120e] text-[#b8a691] border-[#382d22]'
              }`}
            >
              🏛️ Konferenzsaal 1884
            </button>

            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onNavigate('africa-map');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left border ${
                currentScene === 'africa-map'
                  ? 'bg-[#2a1d12] text-[#f5ebd9] border-[#c4a46a]/50'
                  : 'bg-[#17120e] text-[#b8a691] border-[#382d22]'
              }`}
            >
              🗺️ Afrika-Karte (1880–1914) &amp; Zeitschieberegler
            </button>

            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onNavigate('imperialism');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left border ${
                currentScene === 'imperialism'
                  ? 'bg-[#2a1d12] text-[#f59e0b] border-[#f59e0b]/50'
                  : 'bg-[#17120e] text-[#b8a691] border-[#382d22]'
              }`}
            >
              🩸 Imperialismus, Rohstoffraub &amp; Widerstand
            </button>

            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onNavigate('africa-absence');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left border ${
                currentScene === 'africa-absence'
                  ? 'bg-[#2a1d12] text-[#f59e0b] border-[#f59e0b]/50'
                  : 'bg-[#17120e] text-[#b8a691] border-[#382d22]'
              }`}
            >
              🪑 Leerer Stuhl (Afrikas Abwesenheit)
            </button>

            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onNavigate('dossier');
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded text-left border ${
                currentScene === 'dossier'
                  ? 'bg-[#2a1d12] text-[#f5ebd9] border-[#c4a46a]/50'
                  : 'bg-[#17120e] text-[#b8a691] border-[#382d22]'
              }`}
            >
              📜 Dokumentation &amp; Zeitleiste
            </button>

            {onOpenLegal && (
              <button
                onClick={() => {
                  soundFx.playSubtleTick();
                  onOpenLegal();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded text-left border bg-[#17120e] text-[#c4a46a] border-[#382d22]"
              >
                ⚖️ Impressum, Urheberrecht (§ 60a UrhG) &amp; iPad-Hinweis
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
