import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [step, setStep] = useState<number>(0);
  const [isSkipping, setIsSkipping] = useState<boolean>(false);

  useEffect(() => {
    // Stage 0: 15. November 1884
    const t1 = setTimeout(() => {
      setStep(1);
    }, 900);

    // Stage 1: Berlin
    const t2 = setTimeout(() => {
      setStep(2);
    }, 2800);

    // Stage 2: Die Berliner Konferenz beginnt.
    const t3 = setTimeout(() => {
      setStep(3);
    }, 4800);

    // Stage 3: Subtitle / context
    const t4 = setTimeout(() => {
      setStep(4);
    }, 7200);

    // Stage 4: Auto complete to room
    const t5 = setTimeout(() => {
      handleFinish();
    }, 11000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleFinish = () => {
    if (isSkipping) return;
    setIsSkipping(true);
    soundFx.playChamberTone(true);
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isSkipping ? 0 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070504] text-[#ede5d8] overflow-hidden select-none"
    >
      {/* Film grain and vignette */}
      <div className="absolute inset-0 pointer-events-none film-grain" />
      <div className="absolute inset-0 pointer-events-none vignette-radial" />

      {/* Skip button in top right */}
      <button
        onClick={handleFinish}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 text-xs font-serif tracking-widest text-[#a89b88] hover:text-[#e8ded0] transition-colors py-2.5 px-3.5 border border-[#3e3428]/60 hover:border-[#8c7457] rounded-sm cursor-pointer min-h-[44px] flex items-center active:scale-95"
        aria-label="Intro überspringen"
      >
        Intro überspringen →
      </button>

      {/* Main cinematic text sequence */}
      <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center justify-center min-h-[320px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="date"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <span className="text-xs uppercase tracking-[0.35em] text-[#9c8973] font-cinzel">
                Reichskanzlei Wilhelmstraße
              </span>
              <h1 className="text-4xl sm:text-6xl font-garamond font-normal tracking-wide text-[#f4efe6]">
                15. November 1884
              </h1>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="location"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <span className="text-xs uppercase tracking-[0.4em] text-[#a69279] font-cinzel">
                Hauptstadt des Deutschen Kaiserreichs
              </span>
              <h1 className="text-5xl sm:text-7xl font-garamond font-medium tracking-tight text-[#f7f2ea]">
                Berlin
              </h1>
            </motion.div>
          )}

          {(step === 3 || step === 4) && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div className="inline-block border-b border-[#c4a46a]/30 pb-2">
                <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#c4a46a] font-cinzel">
                  Historische Dokumentation
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-garamond font-normal leading-tight text-[#f8f5ee] text-balance">
                Die Berliner Konferenz beginnt.
              </h1>

              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                  className="space-y-8"
                >
                  <p className="text-sm sm:text-base font-prose text-[#baa892] max-w-xl mx-auto leading-relaxed">
                    Vierzehn Staaten verhandeln am grünen Konferenztisch über das Schicksal eines gesamten Kontinents.
                    Kein einziger afrikanischer Vertreter ist eingeladen.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={handleFinish}
                      className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-[#1f1913] hover:bg-[#2d241b] text-[#edd9b9] border border-[#c4a46a]/40 hover:border-[#c4a46a] transition-all duration-300 rounded-sm cursor-pointer shadow-2xl"
                    >
                      <span className="text-xs uppercase tracking-[0.25em] font-cinzel font-medium">
                        Konferenzraum betreten
                      </span>
                      <span className="text-[#c4a46a] group-hover:translate-x-1 transition-transform duration-300">
                        →
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discreet bottom timeline indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 transition-all duration-700 rounded-full ${
              step >= i ? 'w-8 bg-[#c4a46a]/70' : 'w-2 bg-[#42372a]/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};
