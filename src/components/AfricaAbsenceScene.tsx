import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';
import { useCinemaFrame } from '../utils/useCinemaFrame';
import { useAssets } from '../context/AssetContext';

interface AfricaAbsenceSceneProps {
  onBack: () => void;
  onNavigateToMap: () => void;
}

export const AfricaAbsenceScene: React.FC<AfricaAbsenceSceneProps> = ({
  onBack,
  onNavigateToMap,
}) => {
  const [step, setStep] = useState<number>(0);
  const [activeModal, setActiveModal] = useState<'widerstand' | 'arbeit' | 'terranullius' | 'voelkermord' | null>(null);
  const [isReturning, setIsReturning] = useState<boolean>(false);
  const { getImageUrl } = useAssets();

  // Responsive frame calculation ensuring empty chair scene never gets cut off on iPad
  const { dimensions } = useCinemaFrame({
    aspectRatio: 16 / 9,
    reservedTop: 56,
    reservedBottom: 24,
    horizontalPadding: 16,
    verticalPadding: 8,
  });

  useEffect(() => {
    // Sequential solemn narrative pacing
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1600);
    const t3 = setTimeout(() => setStep(3), 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleReturn = () => {
    if (isReturning) return;
    setIsReturning(true);
    soundFx.playChamberTone(false);
    setTimeout(() => {
      onBack();
    }, 600);
  };

  const handleGoToMap = () => {
    soundFx.playChamberTone(true);
    onNavigateToMap();
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-[#070503] flex items-center justify-center select-none pt-14 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      {/* Background Detail Image Frame - exactly 16:9, guaranteed no cut-off on iPad */}
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
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative max-w-full max-h-full overflow-hidden shadow-2xl rounded-sm flex items-center justify-center bg-[#0d0906]"
        >
          <img
            src={getImageUrl('/images/02_leerer_platz_symbolisch.png')}
            alt="Symbolische Leerstelle am Konferenztisch: Abwesenheit afrikanischer Stimmen"
            className="w-full h-full object-fill pointer-events-none block"
            referrerPolicy="no-referrer"
            loading="eager"
          />

          {/* Atmospheric Film Grain and Vignette */}
          <div className="absolute inset-0 pointer-events-none film-grain" />
          <div className="absolute inset-0 pointer-events-none bg-radial from-transparent via-[#090705]/45 to-[#070503]/85" />
        </motion.div>
      </div>

      {/* Top Navigation Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="absolute top-16 left-3 sm:top-18 sm:left-6 z-30 flex items-center gap-2"
      >
        <button
          onClick={handleReturn}
          className="group flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#dfd2be] border border-[#f59e0b]/40 hover:border-[#f59e0b] rounded transition-all backdrop-blur-md cursor-pointer shadow-xl text-xs uppercase tracking-widest font-cinzel min-h-[44px]"
        >
          <span className="text-[#f59e0b] group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span>Zurück zum Saal</span>
        </button>

        <button
          onClick={handleGoToMap}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-[#17120e]/95 hover:bg-[#251d16] text-[#dfd2be] border border-[#c4a46a]/30 hover:border-[#c4a46a] rounded transition-all backdrop-blur-md cursor-pointer shadow-xl text-xs font-serif min-h-[44px]"
        >
          <span>🗺️</span>
          <span>Wandkarte von Afrika ansehen</span>
        </button>
      </motion.div>

      {/* Central Solemn Typographic Overlay & Narrative Card */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 pointer-events-none">
        <div className="max-w-2xl w-full text-center space-y-4">
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="narrative-step-1"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-1"
              >
                <span className="text-xs uppercase tracking-[0.35em] text-[#f59e0b] font-cinzel">
                  Die Leerstelle
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-garamond font-normal text-[#f5ebd9] leading-tight">
                  Kein einziger afrikanischer Vertreter war geladen.
                </h1>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div
                key="narrative-step-2"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl mx-auto"
              >
                <p className="text-xs sm:text-sm md:text-base font-prose text-[#d6c7b2] leading-relaxed bg-[#0d0907]/80 backdrop-blur-md p-4 rounded border border-[#f59e0b]/25 shadow-2xl">
                  Während 14 westliche Mächte in der Berliner Wilhelmstraße über das Schicksal von über
                  100 Millionen Menschen verhandelten, blieben afrikanische Herrscher, Gesellschaften und
                  Kulturen vollständig ausgeschlossen.
                </p>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div
                key="narrative-step-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="pt-2 pointer-events-auto space-y-3"
              >
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
                  {[
                    { id: 'terranullius', label: 'Terra Nullius', sub: 'Rechtliche Fiktion' },
                    { id: 'widerstand', label: 'Widerstand', sub: 'Maji-Maji & mehr' },
                    { id: 'arbeit', label: 'Zwangsarbeit', sub: 'Kongogräuel' },
                    { id: 'voelkermord', label: 'Völkermord', sub: 'Herero & Nama' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        soundFx.playSubtleTick();
                        setActiveModal(item.id as typeof activeModal);
                      }}
                      className="p-2 sm:p-2.5 bg-[#17120e]/95 hover:bg-[#251d16] border border-[#f59e0b]/30 hover:border-[#f59e0b] rounded text-left transition-all cursor-pointer shadow-lg active:scale-95 min-h-[48px]"
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

                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleGoToMap}
                    className="px-4 py-2 bg-[#2a1d0f]/90 hover:bg-[#382814] text-[#f59e0b] border border-[#f59e0b]/40 rounded text-xs font-cinzel tracking-wider cursor-pointer shadow-xl min-h-[40px]"
                  >
                    Wandkarte der kolonialen Ansprüche →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Thematic Deep Dive Modal for Historical Context */}
      <AnimatePresence>
        {activeModal && (
          <div
            key={`absence-modal-backdrop-${activeModal}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              key={`absence-modal-card-${activeModal}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="archival-panel w-full max-w-xl max-h-[85vh] rounded p-5 sm:p-6 border border-[#f59e0b]/40 shadow-2xl overflow-y-auto space-y-4 bg-[#14100c]/98"
            >
              {activeModal === 'terranullius' && (
                <>
                  <div className="border-b border-[#3b3024] pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-cinzel">
                      Koloniales Völkerrecht
                    </span>
                    <h3 className="text-2xl font-garamond text-[#f5ebd9]">
                      Die Doktrin des „Herrenlosen Landes“ (Terra Nullius)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Die europäischen Konferenzteilnehmer behandelten das afrikanische Festland juristisch als
                    quasi unbesitzbaren Raum („Terra Nullius“). Bestehende Staatsgebilde wie das Königreich
                    Kongo, das Reich Oyo, die Aschanti-Föderation oder das Kalifat von Sokoto wurden nicht als
                    völkerrechtliche Subjekte anerkannt.
                  </p>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Verträge, die Forschungsreisende wie Henry Morton Stanley oder Carl Peters mit lokalen
                    Oberhäuptern abschlossen, basierten oft auf Täuschung, Alkohol und unverständlichen
                    Sprachformeln, dienten aber in Berlin als „rechtliche Titel“.
                  </p>
                </>
              )}

              {activeModal === 'widerstand' && (
                <>
                  <div className="border-b border-[#3b3024] pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-cinzel">
                      Afrikanische Perspektive
                    </span>
                    <h3 className="text-2xl font-garamond text-[#f5ebd9]">
                      Antikolonialer Widerstand
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Die Unterwerfung Afrikas war kein passiver Prozess. Überall auf dem Kontinent leisteten
                    afrikanische Gesellschaften erbitterten Widerstand:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm font-prose text-[#d1c2af]">
                    <li>
                      <strong className="text-[#f5ebd9]">Maji-Maji-Krieg (1905–1907):</strong> Breiter
                      Aufstand gegen die deutsche Kolonialherrschaft in Ostafrika, der durch eine Politik der
                      verbrannten Erde und Hungersnöte bis zu 300.000 Todesopfer forderte.
                    </li>
                    <li>
                      <strong className="text-[#f5ebd9]">Schlacht von Adwa (1896):</strong> Äthiopien unter
                      Kaiser Menelik II. besiegte die italienische Kolonialarmee vernichtend und bewahrte seine
                      Souveränität.
                    </li>
                    <li>
                      <strong className="text-[#f5ebd9]">Aschanti-Kriege:</strong> Wiederholter Widerstand
                      gegen britische Annexionen an der Goldküste.
                    </li>
                  </ul>
                </>
              )}

              {activeModal === 'arbeit' && (
                <>
                  <div className="border-b border-[#3b3024] pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-cinzel">
                      Die Kongogräuel
                    </span>
                    <h3 className="text-2xl font-garamond text-[#f5ebd9]">
                      Kautschukboom & Zwangsarbeit
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Obwohl die Berliner Konferenz offiziell unter dem Banner der Zivilisation und des
                    Freihandels stattfand, verwandelte König Leopold II. den „Kongo-Freistaat“ in sein
                    persönliches Profitimperium. Zur Durchsetzung von Kautschukquoten terrorisierte die
                    Söldnertruppe „Force Publique“ die Zivilbevölkerung.
                  </p>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Geiselnahmen von Frauen, das berüchtigte Abhauen von Händen bei Nichterfüllung der
                    Liefermengen, Zwangsarbeit und verschleppte Seuchen kosteten schätzungsweise bis zu 10
                    Millionen Kongolesen das Leben.
                  </p>
                </>
              )}

              {activeModal === 'voelkermord' && (
                <>
                  <div className="border-b border-[#3b3024] pb-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#f59e0b] font-cinzel">
                      Erster Genozid des 20. Jahrhunderts
                    </span>
                    <h3 className="text-2xl font-garamond text-[#f5ebd9]">
                      Völkermord an den Herero und Nama (1904–1908)
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    In Deutsch-Südwestafrika (heute Namibia) führten Landraub, Demütigungen und rassistische
                    Rechtsprechung zum Aufstand der Herero unter Samuel Maharero und der Nama unter Hendrik
                    Witbooi.
                  </p>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    Generalleutnant Lothar von Trotha erließ den Vernichtungsbefehl: Die Überlebenden wurden in
                    die Omaheke-Wüste getrieben und vom Wasser abgeschnitten. Bis zu 80 % des Herero-Volkes und
                    50 % der Nama kamen durch Verdursten, Massaker und in Konzentrationslagern um.
                  </p>
                </>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 bg-[#2d2218] hover:bg-[#3d2e20] text-[#f5ebd9] border border-[#f59e0b]/30 rounded text-xs font-cinzel cursor-pointer"
                >
                  Schließen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
