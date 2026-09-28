import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';

export type LegalTab = 'impressum' | 'urheberrecht' | 'datenschutz' | 'content-note' | 'geraete';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: LegalTab;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  initialTab = 'impressum',
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<LegalTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleTab = (t: LegalTab) => {
    soundFx.playSubtleTick();
    setActiveTab(t);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-[#130d09] border border-[#854d0e]/50 rounded-lg shadow-2xl text-[#edd9b9] overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#342416] bg-[#1a120c] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xl">⚖️</span>
              <h2 className="text-lg font-cinzel font-bold text-[#f5ebd9]">
                Rechtliches &amp; Nutzungshinweise
              </h2>
            </div>
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onClose();
              }}
              className="text-[#9c8973] hover:text-[#f5ebd9] text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2b1e14] transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center overflow-x-auto border-b border-[#2d1e13] bg-[#0c0805] px-4 text-xs font-serif">
            {[
              { id: 'impressum', label: 'Impressum (§ 5 DDG)' },
              { id: 'urheberrecht', label: 'Urheberrecht (§ 60a UrhG)' },
              { id: 'datenschutz', label: 'Datenschutz (DSGVO)' },
              { id: 'content-note', label: '⚠️ Content Note' },
              { id: 'geraete', label: '📱 Tablet-Nutzung' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTab(tab.id as LegalTab)}
                className={`py-3 px-3.5 border-b-2 font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#c4a46a] text-[#f5ebd9] bg-[#1a120c]'
                    : 'border-transparent text-[#8a7965] hover:text-[#edd9b9]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4 text-xs font-prose leading-relaxed text-[#d6c7b2]">
            {activeTab === 'impressum' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Angaben gemäß § 5 Digitale-Dienste-Gesetz (DDG)
                </h3>
                <div className="bg-[#18110b] p-3.5 rounded border border-[#342416] space-y-2">
                  <p><strong>Herausgeber &amp; Trägerschaft:</strong><br />
                  Digitales Dokumentationsarchiv Berliner Afrika-Konferenz 1884/85<br />
                  Gemeinnützige Initiative für historische Fachdidaktik &amp; digitale Wissenschaftskommunikation</p>
                  
                  <p><strong>Projektleitung &amp; wissenschaftliche Redaktion:</strong><br />
                  Arbeitsbereich Neuere Geschichte &amp; Kolonialismusforschung<br />
                  Wilhelmstraße 77 (Historischer Tagungsort), Berlin</p>

                  <p><strong>Kontakt:</strong><br />
                  E-Mail: <span className="text-[#c4a46a]">redaktion@afrika-konferenz-1884.org</span></p>

                  <p><strong>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</strong><br />
                  Wissenschaftliches Kuratorium für historisch-kritische Quellenforschung.</p>
                </div>
              </div>
            )}

            {activeTab === 'urheberrecht' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Gesetzliche Bildungsfreistellung (§ 60a UrhG) &amp; Gemeinfreiheit
                </h3>
                <p>
                  Dieses Bildungsangebot dient ausschließlich nicht-kommerziellen Zwecken der Bildung, 
                  Wissenschaft und Forschung im Sinne des <strong>§ 60a des deutschen Urheberrechtsgesetzes (UrhG)</strong> sowie 
                  als Open Educational Resource (OER).
                </p>
                <div className="bg-[#18110b] p-3.5 rounded border border-[#342416] space-y-2">
                  <p><strong>Historische Primärquellen:</strong><br />
                  Die Verträge, Depeschen und Zitate entstammen gemeinfreien Beständen (Public Domain) des Bundesarchivs (Bestand R 1001), 
                  der National Archives in London (Kew) und der Archives Nationales d’Outre-Mer (ANOM).</p>
                  
                  <p><strong>Kartenmaterial:</strong><br />
                  Die Vektordaten der Territorien basieren auf historischen Atlanten des 19. Jahrhunderts (Stieler, Andrees, Schomburg Center).</p>
                </div>
              </div>
            )}

            {activeTab === 'datenschutz' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Datenschutzerklärung gemäß DSGVO
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-[#b8a690]">
                  <li><strong>Keine personenbezogenen Daten:</strong> Es werden keinerlei Benutzerdaten, Namen, E-Mail-Adressen oder Tracking-Profile erhoben.</li>
                  <li><strong>Keine Cookies von Drittanbietern:</strong> Keine Tracking-Tools, keine externen Werbenetzwerke.</li>
                  <li><strong>Lokale Ausführung:</strong> Interaktionszustände (Audio stumm/aktiv) verbleiben ausschließlich lokal im Webbrowser.</li>
                </ul>
              </div>
            )}

            {activeTab === 'content-note' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Sensibilisierungshinweis (Content Note)
                </h3>
                <div className="bg-[#241710] border border-[#ef4444]/40 p-3.5 rounded space-y-2 text-[#e2d5c3]">
                  <p>
                    <strong>Koloniale Gewalt &amp; historische Zitate:</strong><br />
                    Die Inhalte dieser Anwendung behandeln die gewaltsame koloniale Unterwerfung Afrikas, Ausbeutungssysteme (Kongo-Gräuel) 
                    und den Völkermord an den Herero und Nama (1904–1908).
                  </p>
                  <p>
                    Historische Originalzitate spiegeln teils die rassistische und dehumanisierende Sprache der europäischen Kolonialmächte 
                    des 19. Jahrhunderts wider. Sie werden unzensiert, jedoch stets historisch-kritisch kontextualisiert zitiert, 
                    um die Mechanismen imperialistischer Propaganda aufzudecken.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'geraete' && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold font-cinzel text-[#f5ebd9] border-b border-[#342416] pb-1">
                  Empfohlene Nutzung &amp; Audio
                </h3>
                <div className="bg-[#1f160e] border border-[#d97706]/40 p-3.5 rounded space-y-2">
                  <p className="font-bold text-[#fef08a]">
                    📱 Tablet / iPad im Querformat (Landscape)
                  </p>
                  <p>
                    Für die optimale Interaktion mit den Vektorkarten, dem Konferenzsaal und den Dossiers wird ein 
                    iPad oder Tablet im Querformat oder ein Monitor mit 16:9-Darstellung empfohlen.
                  </p>
                  <p className="pt-1 text-[#b8a690]">
                    🎧 <strong>Hintergrundmusik:</strong> Kann über das Lautsprecher-Symbol in der oberen Leiste jederzeit ein- oder stummgeschaltet werden.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-[#342416] bg-[#100b07] flex justify-end">
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onClose();
              }}
              className="px-4 py-1.5 bg-[#241a12] hover:bg-[#34271c] text-[#edd9b9] text-xs font-cinzel rounded border border-[#5a422d] transition-colors cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
