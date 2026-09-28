import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';
import { audioManager } from '../utils/audioManager';

interface MuseumEntranceModalProps {
  isOpen: boolean;
  onEnter: (enableAudio: boolean) => void;
  isStandaloneNotice?: boolean; // if opened later from TopNav
  onClose?: () => void;
}

export const MuseumEntranceModal: React.FC<MuseumEntranceModalProps> = ({
  isOpen,
  onEnter,
  isStandaloneNotice = false,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'impressum' | 'urheberrecht' | 'datenschutz' | 'content-note'>('welcome');
  const [testedSound, setTestedSound] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleTestSound = () => {
    soundFx.init();
    soundFx.playChamberTone(false);
    setTestedSound(true);
    setTimeout(() => {
      soundFx.playSubtleTick();
    }, 400);
  };

  const handleConfirm = (withAudio: boolean) => {
    if (withAudio) {
      soundFx.setMuted(false);
      audioManager.setMuted(false);
      soundFx.playGavelStrike();
    } else {
      soundFx.setMuted(true);
      audioManager.setMuted(true);
    }
    if (isStandaloneNotice && onClose) {
      onClose();
    } else {
      onEnter(withAudio);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-lg shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-[#edd9b9] overflow-hidden my-auto"
        >
          {/* Ornate Archival Header */}
          <div className="relative px-6 pt-6 pb-5 border-b border-[#3e2c1c] bg-gradient-to-r from-[#1d140e] via-[#2a1d13] to-[#1d140e]">
            {isStandaloneNotice && onClose && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-[#a89680] hover:text-[#f5ebd9] text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#342416] transition-colors cursor-pointer"
                aria-label="Schließen"
              >
                ✕
              </button>
            )}

            <div className="flex items-center gap-3.5 mb-2">
              <span className="text-2xl sm:text-3xl filter drop-shadow">🏛️</span>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#c4a46a] font-cinzel font-bold block">
                  Digitales Dokumentationsarchiv · Wilhelmstraße 77
                </span>
                <h2 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9] tracking-wide">
                  Berliner Afrika-Konferenz 1884/85
                </h2>
              </div>
            </div>
            <p className="text-xs font-prose text-[#b8a690] leading-relaxed">
              Historisch-kritisches Bildungs- und Forschungsportal zum europäischen Imperialismus, 
              den diplomatischen Protokollen und dem antikolonialen Widerstand.
            </p>
          </div>

          {/* Navigation Tabs for Legal and Context Information */}
          <div className="flex items-center overflow-x-auto border-b border-[#342416] bg-[#0f0b07] px-4 text-xs font-cinzel">
            <button
              onClick={() => setActiveTab('welcome')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'welcome'
                  ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                  : 'border-transparent text-[#9c8973] hover:text-[#edd9b9]'
              }`}
            >
              🎧 Einführung &amp; Empfehlung
            </button>
            <button
              onClick={() => setActiveTab('impressum')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'impressum'
                  ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                  : 'border-transparent text-[#9c8973] hover:text-[#edd9b9]'
              }`}
            >
              ⚖️ Impressum (§ 5 DDG)
            </button>
            <button
              onClick={() => setActiveTab('urheberrecht')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'urheberrecht'
                  ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                  : 'border-transparent text-[#9c8973] hover:text-[#edd9b9]'
              }`}
            >
              📜 OER &amp; Bildungsfreistellung
            </button>
            <button
              onClick={() => setActiveTab('datenschutz')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'datenschutz'
                  ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                  : 'border-transparent text-[#9c8973] hover:text-[#edd9b9]'
              }`}
            >
              🔒 Datenschutz (DSGVO)
            </button>
            <button
              onClick={() => setActiveTab('content-note')}
              className={`py-3 px-4 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'content-note'
                  ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                  : 'border-transparent text-[#9c8973] hover:text-[#edd9b9]'
              }`}
            >
              ⚠️ Content Note
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-6 max-h-[58vh] overflow-y-auto space-y-4 text-sm font-prose leading-relaxed text-[#d6c7b2]">
            {activeTab === 'welcome' && (
              <div className="space-y-4">
                {/* Device & Orientation Recommendation Banner */}
                <div className="bg-[#1f160e] border border-[#d97706]/40 p-4 rounded-md flex items-start gap-3.5">
                  <div className="text-2xl mt-0.5">📱↔️</div>
                  <div>
                    <h3 className="text-sm font-bold font-cinzel text-[#fef08a] mb-1">
                      Empfohlene Nutzung: iPad / Tablet im Querformat (Landscape)
                    </h3>
                    <p className="text-xs text-[#d6c7b2] leading-relaxed">
                      Für die optimale visuelle und kartographische Erfahrung der hochauflösenden Afrika-Karte, 
                      des Konferenzsaals und der Archivdossiers wird die Nutzung im <strong>Querformat auf einem iPad / Tablet</strong> oder 
                      an einem <strong>Desktop-Monitor</strong> dringend empfohlen.
                    </p>
                  </div>
                </div>

                {/* Sound & Ambient Experience Notice */}
                <div className="bg-[#18110b] border border-[#854d0e]/40 p-4 rounded-md space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl mt-0.5">🔊</span>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9]">
                        Historisches Sound- und Raumklang-Erlebnis
                      </h3>
                      <p className="text-xs text-[#b8a690] leading-relaxed">
                        Die Anwendung verfügt über ein sorgfältig abgestimmtes Klangkonzept: 
                        viktorianisches Raumrauschen im Konferenzsaal, Telegrafen-Depeschen, das Kratzen der Federkiele 
                        beim Unterzeichnen der Generalakte und Windatmosphären über den afrikanischen Regionen.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#342416]">
                    <span className="text-xs text-[#a89680]">
                      {testedSound ? '✅ Sound-System erfolgreich initialisiert!' : 'Lautsprecher eingeschaltet?'}
                    </span>
                    <button
                      onClick={handleTestSound}
                      className="px-3.5 py-1.5 bg-[#2a1d13] hover:bg-[#3d2a1b] text-[#edd9b9] text-xs font-cinzel rounded border border-[#854d0e]/50 transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      🔔 Test-Ton abspielen
                    </button>
                  </div>
                </div>

                {/* Content Summary */}
                <div className="text-xs text-[#a89680] space-y-1 pt-1">
                  <p>
                    💡 <strong>Interaktive Funktionen:</strong> Dekadenschieberegler (1880–1914), automatische und manuelle 
                    Kamerazooms in regionale Brennpunkte, authentische Primärquellen-Zitate mit historischem Kontext sowie 
                    ein ökonomisches Handelsstrom-Dashboard.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'impressum' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
                </h3>
                <div className="bg-[#18110b] p-3.5 rounded border border-[#342416] space-y-2">
                  <p><strong>Herausgeber &amp; Trägerschaft:</strong><br />
                  Digitales Dokumentationsarchiv Berliner Afrika-Konferenz 1884/85<br />
                  Gemeinnützige Initiative für historische Fachdidaktik &amp; digitale Wissenschaftskommunikation</p>
                  
                  <p><strong>Projektleitung &amp; wissenschaftliche Redaktion:</strong><br />
                  Arbeitsbereich Neuere Geschichte &amp; Kolonialismusforschung<br />
                  Wilhelmstraße 77 (Historischer Schauplatz), Berlin</p>

                  <p><strong>Kontakt &amp; Feedback:</strong><br />
                  E-Mail: <span className="text-[#c4a46a]">redaktion@afrika-konferenz-1884.org</span><br />
                  Web: https://afrika-konferenz-1884.org</p>

                  <p><strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
                  Wissenschaftliches Kuratorium für historisch-kritische Quellenforschung.</p>
                </div>
              </div>
            )}

            {activeTab === 'urheberrecht' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Urheberrecht &amp; Gesetzliche Bildungsfreistellung (§ 60a UrhG)
                </h3>
                <p>
                  Dieses didaktische Portal dient ausschließlich nicht-kommerziellen Zwecken der Bildung, 
                  Wissenschaft und Forschung im Sinne des <strong>§ 60a des deutschen Urheberrechtsgesetzes (UrhG)</strong> sowie 
                  als Open Educational Resource (OER).
                </p>
                <div className="bg-[#18110b] p-3.5 rounded border border-[#342416] space-y-2">
                  <p><strong>Historische Primärquellen &amp; Dokumente:</strong><br />
                  Die Vertragstexte der Generalakte, diplomatische Depeschen Bismarcks und Berichte stammen aus 
                  gemeinfreien Beständen (Public Domain) des Bundesarchivs (Bestand R 1001), des britischen Nationalarchivs (Kew) 
                  und der Archives Nationales d’Outre-Mer (Aix-en-Provence).</p>
                  
                  <p><strong>Kartenmaterial &amp; Vektoren:</strong><br />
                  Die historischen territorialen Grenzverläufe wurden auf Grundlage historischer Atlanten (u. a. Andrees Handatlas 1886, 
                  Stielers Hand-Atlas 1891, Schomburg Center) wissenschaftlich rekonstruiert und vektorisiert.</p>
                  
                  <p><strong>Zitierrecht:</strong><br />
                  Zitate von Akteuren der Kolonialzeit und afrikanischen Widerstandskämpfern werden nach § 51 UrhG 
                  zur kritischen Einordnung der historischen Ereignisse wiedergegeben.</p>
                </div>
              </div>
            )}

            {activeTab === 'datenschutz' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Datenschutzerklärung gemäß DSGVO
                </h3>
                <p>
                  Der Schutz Ihrer Privatsphäre hat bei dieser Bildungsanwendung höchste Priorität.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#b8a690]">
                  <li><strong>Keine Erhebung personenbezogener Daten:</strong> Es werden weder Namen, IP-Adressen noch E-Mail-Adressen erfasst oder an Server übermittelt.</li>
                  <li><strong>Keine Tracking-Cookies:</strong> Es kommen keinerlei Analyse-Tools von Drittanbietern (wie Google Analytics, Meta Pixel etc.) zum Einsatz.</li>
                  <li><strong>Ausschließliche lokale Speicherung:</strong> Zustände wie der Lautsprecher-Status (Stumm/Aktiv) oder gelesene Akten werden rein lokal auf Ihrem Endgerät im Browser-Speicher (LocalStorage) hinterlegt.</li>
                  <li><strong>Web Audio API:</strong> Die Toneffekte werden direkt im Browser berechnet und erfordern keine externe Datenübertragung.</li>
                </ul>
              </div>
            )}

            {activeTab === 'content-note' && (
              <div className="space-y-3 text-xs leading-relaxed">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Sensibilisierungshinweis (Content Note)
                </h3>
                <div className="bg-[#241710] border border-[#ef4444]/40 p-3.5 rounded space-y-2 text-[#e2d5c3]">
                  <p>
                    <strong>Historische Kolonialgewalt &amp; Sprache:</strong><br />
                    Diese Dokumentation behandelt den gewaltsamen imperialistischen Beutezug in Afrika, 
                    Ausbeutungssysteme (wie den Kautschuk-Terror im Kongo-Freistaat) sowie den Völkermord an den 
                    Herero und Nama (1904–1908).
                  </p>
                  <p>
                    Originalquellen enthalten teils rassistische, abwertende und verharmlosende Begriffe der europäischen 
                    Kolonialmächte des 19. Jahrhunderts. Diese Zitate werden im Interesse historischer Aufklärung 
                    und wissenschaftlicher Transparenz unzensiert, jedoch stets kritisch kontextualisiert wiedergegeben, 
                    um die Mechanismen imperialistischer Dehumanisierung aufzudecken.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Modal Action Footer */}
          <div className="px-6 py-4 border-t border-[#3e2c1c] bg-[#120d09] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-[#9c8973] text-center sm:text-left">
              Durch Betreten bestätigen Sie die Kenntnisnahme der rechtlichen Hinweise.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleConfirm(false)}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-[#201710] hover:bg-[#2e2017] text-[#c4a46a] text-xs font-cinzel font-semibold rounded border border-[#4a3622] transition-colors cursor-pointer text-center"
              >
                🔇 Stumm fortfahren
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className="flex-1 sm:flex-initial px-6 py-2.5 bg-gradient-to-r from-[#d97706] to-[#b45309] hover:from-[#f59e0b] hover:to-[#d97706] text-[#0f0b07] text-xs font-cinzel font-bold rounded shadow-lg border border-[#fef08a]/40 transition-all cursor-pointer text-center"
              >
                🎧 Mit Audio betreten →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
