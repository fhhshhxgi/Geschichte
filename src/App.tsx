/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { IntroSequence } from './components/IntroSequence';
import { ConferenceRoom } from './components/ConferenceRoom';
import { InteractiveAfricaMap } from './components/InteractiveAfricaMap';
import { ImperialismSection } from './components/ImperialismSection';
import { TimelineSection } from './components/TimelineSection';
import { EducationalSections } from './components/EducationalSections';
import { SourcesModal } from './components/SourcesModal';
import { MuseumEntranceModal } from './components/MuseumEntranceModal';
import { TopNav } from './components/TopNav';
import { AssetProvider, useAssets } from './context/AssetContext';
import { AssetImportModal } from './components/AssetImportModal';
import { SceneTransition } from './components/SceneTransition';
import { audioManager, AudioScene } from './utils/audioManager';
import { soundFx } from './utils/soundEffects';

type SceneState = 'intro' | 'conference-room' | 'africa-absence' | 'africa-map' | 'imperialism' | 'dossier';

function AppContent() {
  const [currentScene, setCurrentScene] = useState<SceneState>('intro');
  const [showSources, setShowSources] = useState<boolean>(false);
  const [showEntranceModal, setShowEntranceModal] = useState<boolean>(true);
  const [showLegalNotice, setShowLegalNotice] = useState<boolean>(false);
  const [targetHotspotId, setTargetHotspotId] = useState<string | null>(null);

  const {
    setIsImportModalOpen,
    importFiles,
  } = useAssets();

  // Preload historical assets on mount
  useEffect(() => {
    soundFx.init();
    audioManager.init();

    const imagesToPreload = [
      '/images/01_start_konferenzraum.png',
      '/images/02_leerer_platz_symbolisch.png',
      '/portraits/03_deutsches_reich_bismarck.png',
      '/portraits/04_grossbritannien_edward_malet.png',
      '/portraits/05_frankreich_alphonse_de_courcel.png',
      '/portraits/06_belgien_auguste_lambermont.png',
      '/portraits/07_portugal_marquis_de_penafiel.png',
      '/images/08_afrika_karte_stilisiert.png',
      '/portraits/09_oesterreich_ungarn_emmerich_szechenyi.png',
      '/portraits/10_spanien_francisco_merry_y_colom.png',
      '/portraits/11_italien_edoardo_de_launay.png',
      '/portraits/12_niederlande_philip_van_der_hoeven.png',
      '/portraits/13_usa_john_a_kasson.png',
      '/portraits/14_daenemark_emil_vind.png',
      '/portraits/15_russland_pyotr_kapnist.png',
      '/portraits/16_schweden_norwegen_gillis_bildt.png',
      '/portraits/17_osmanisches_reich_mehmed_said_pasha.png',
    ];

    imagesToPreload.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Update background audio when scene shifts
  useEffect(() => {
    if (currentScene !== 'intro') {
      audioManager.changeScene(currentScene as AudioScene);
    }
  }, [currentScene]);

  // Global drag-and-drop listener
  useEffect(() => {
    const handleWindowDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleWindowDrop = async (e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        setIsImportModalOpen(true);
        await importFiles(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, [importFiles, setIsImportModalOpen]);

  const handleNavigateNav = (scene: 'conference-room' | 'africa-absence' | 'africa-map' | 'imperialism' | 'dossier') => {
    if (scene === 'africa-absence') {
      setCurrentScene('conference-room');
      setTargetHotspotId('absence');
    } else if (scene === 'africa-map') {
      setCurrentScene('africa-map');
      setTargetHotspotId(null);
    } else if (scene === 'imperialism') {
      setCurrentScene('imperialism');
      setTargetHotspotId(null);
    } else if (scene === 'conference-room') {
      setCurrentScene('conference-room');
      setTargetHotspotId(null);
    } else {
      setCurrentScene('dossier');
    }
  };

  const handleBackToRoom = () => {
    setCurrentScene('conference-room');
    setTargetHotspotId(null);
  };

  return (
    <div className="relative min-h-screen bg-[#090705] text-[#e8ded0] overflow-x-hidden selection:bg-[#78350f] selection:text-[#fef3c7]">
      {/* Mandatory Initial Entrance & Sound / Legal / Device Recommendation Modal */}
      <MuseumEntranceModal
        isOpen={showEntranceModal}
        onEnter={(enableAudio) => {
          setShowEntranceModal(false);
          if (enableAudio) {
            soundFx.playChamberTone(false);
          }
        }}
      />

      {/* Reopenable Standalone Legal & Disclaimer Modal */}
      <MuseumEntranceModal
        isOpen={showLegalNotice}
        isStandaloneNotice={true}
        onClose={() => setShowLegalNotice(false)}
        onEnter={() => setShowLegalNotice(false)}
      />

      {/* Cinematic Intro Sequence */}
      <AnimatePresence>
        {!showEntranceModal && currentScene === 'intro' && (
          <IntroSequence
            key="intro-screen"
            onComplete={() => {
              setCurrentScene('conference-room');
              audioManager.changeScene('conference-room');
            }}
          />
        )}
      </AnimatePresence>

      {/* Main Persistent Top Navigation Bar */}
      {currentScene !== 'intro' && (
        <TopNav
          currentScene={currentScene}
          onNavigate={handleNavigateNav}
          onOpenSources={() => setShowSources(true)}
          onOpenLegal={() => setShowLegalNotice(true)}
          onReplayIntro={() => setCurrentScene('intro')}
        />
      )}

      {/* Primary Visual Scene Stage with Global Cinematic Parchment Page Transition */}
      <main className="relative w-full">
        <SceneTransition sceneKey={currentScene}>
          {/* Unified Continuous Camera Conference Room Scene */}
          {currentScene === 'conference-room' && (
            <ConferenceRoom
              initialTargetId={targetHotspotId}
              onNavigateToDossier={() => setCurrentScene('dossier')}
            />
          )}

          {/* Dedicated Interactive Africa Map Scene with Decade Slider & Smooth Regional Zoom */}
          {currentScene === 'africa-map' && (
            <div className="pt-14 w-full">
              <InteractiveAfricaMap
                onBackToConferenceRoom={handleBackToRoom}
                initialYear={1885}
              />
            </div>
          )}

          {/* European Imperialism Deep-Dive Interactive Lab */}
          {currentScene === 'imperialism' && (
            <div className="pt-16 pb-20 w-full">
              <ImperialismSection
                onOpenMap={() => setCurrentScene('africa-map')}
                onOpenConferenceRoom={handleBackToRoom}
              />
            </div>
          )}

          {/* Dossier & Full Educational Overview */}
          {currentScene === 'dossier' && (
            <div className="pt-20 pb-24 space-y-16">
              <div className="max-w-4xl mx-auto px-6 text-center space-y-3">
                <span className="text-xs uppercase tracking-[0.3em] text-[#c4a46a] font-cinzel">
                  Didaktisches Archiv
                </span>
                <h1 className="text-4xl sm:text-5xl font-garamond font-normal text-[#f5ebd9]">
                  Historische Dokumentation &amp; Beschlüsse
                </h1>
                <p className="text-sm font-prose text-[#b3a189] max-w-2xl mx-auto leading-relaxed">
                  Umfassende Aufarbeitung der 104 Verhandlungstage in Berlin, der völkerrechtlichen Verträge
                  und der verheerenden Auswirkungen auf die afrikanischen Gesellschaften.
                </p>
                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={handleBackToRoom}
                    className="px-5 py-2 bg-[#251d16] hover:bg-[#34271c] text-[#edd9b9] text-xs font-cinzel rounded border border-[#c4a46a]/30 transition-colors cursor-pointer"
                  >
                    ← Zurück in den Konferenzsaal
                  </button>
                  <button
                    onClick={() => setCurrentScene('africa-map')}
                    className="px-5 py-2 bg-[#c4a46a] hover:bg-[#d8b87d] text-[#120e0b] text-xs font-cinzel font-bold rounded border border-[#e8d5b5] transition-colors cursor-pointer"
                  >
                    🗺️ Afrika-Karte (1880–1914) →
                  </button>
                </div>
              </div>

              <TimelineSection />
              <EducationalSections />
            </div>
          )}
        </SceneTransition>
      </main>

      {/* Sources and Academic Citations Modal */}
      <SourcesModal
        isOpen={showSources}
        onClose={() => setShowSources(false)}
      />

      {/* Interactive Asset Import Modal */}
      <AssetImportModal />
    </div>
  );
}

export default function App() {
  return (
    <AssetProvider>
      <AppContent />
    </AssetProvider>
  );
}
