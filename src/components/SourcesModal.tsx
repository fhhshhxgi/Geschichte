import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, onClose]);

  if (!isOpen) return null;

  const imageSrc = '/assets/aistudio/PHOTO-2026-11-01-23-32-31_d08bffb2.jpeg';
  const fallbackSrc = '/images/primary_source_congo_1904.jpeg';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto select-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative archival-panel max-w-4xl w-full rounded border-2 border-[#c4a46a]/60 shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#120d09] text-[#ded1be] overflow-hidden my-auto pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between border-b border-[#3e3224] px-4 sm:px-6 py-3.5 bg-[#17110c]">
          <div className="flex items-center gap-2">
            <span className="text-[#c4a46a] text-sm">📖</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#c4a46a] font-cinzel font-semibold">
              Historische Primärquelle
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onClose();
            }}
            className="text-xs text-[#a89680] hover:text-[#fff] px-2.5 py-1 rounded border border-[#3e3224] hover:border-[#c4a46a] transition-colors cursor-pointer flex items-center gap-1 font-serif"
            aria-label="Schließen"
          >
            <span>✕</span>
            <span className="hidden sm:inline">Schließen</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto">
          {/* Authentic Attached Photograph Display */}
          <div className="relative group rounded border-2 border-[#c4a46a]/40 overflow-hidden bg-[#0a0705] shadow-2xl">
            <img
              src={imageSrc}
              onError={(e) => {
                const target = e.currentTarget;
                if (target.src !== fallbackSrc) {
                  target.src = fallbackSrc;
                }
              }}
              alt="Historische Primärquelle: Nsala von Wala blickt auf die abgetrennte Hand und den Fuß seiner Tochter Boali (Kongo-Freistaat, Mai 1904, Foto: Alice Seeley Harris)"
              className="w-full max-h-[56vh] object-contain mx-auto block cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.01]"
              onClick={() => setIsZoomed(true)}
            />

            {/* Click to zoom overlay pill */}
            <button
              onClick={() => setIsZoomed(true)}
              className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-[#f5ebd9] border border-[#c4a46a]/60 text-xs px-3 py-1.5 rounded backdrop-blur-sm cursor-pointer flex items-center gap-1.5 transition-all shadow-xl active:scale-95"
            >
              <span>🔍</span>
              <span>Großansicht</span>
            </button>
          </div>

          {/* Museum Gallery Caption Plaque */}
          <div className="p-4 sm:p-5 bg-gradient-to-b from-[#1b140e] to-[#120d09] rounded border border-[#3e3224] space-y-3">
            <div>
              <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] tracking-widest block font-bold">
                Fotodokumentation · Mai 1904
              </span>
              <h3 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9] leading-tight mt-0.5">
                Nsala of Wala at Baringa
              </h3>
              <p className="text-xs font-serif italic text-[#c4a46a] mt-0.5">
                Aufnahme von Alice Seeley Harris · Baringa, Kongo-Freistaat
              </p>
            </div>

            <div className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed space-y-2 border-t border-[#2e2318] pt-3">
              <p>
                Der kongolesische Vater <strong>Nsala von Wala</strong> sitzt auf der Veranda einer Missionsstation und blickt
                auf die vor ihm liegende abgetrennte Hand und den Fuß seiner fünfjährigen Tochter <strong>Boali</strong>.
                Sie und ihre Mutter waren von Wachen der Kautschuk-Konzessionsgesellschaft <em>ABIR (Anglo-Belgian India Rubber Company)</em> ermordet
                und verstümmelt worden, weil ihr Dorf die von den Kolonialherren auferlegte Kautschuk-Lieferquote nicht erfüllen konnte.
              </p>
              <p className="text-xs text-[#baa78f]">
                Dieses historische Dokument ist das erschütterndste visuelle Zeugnis für die Folgen der <strong>Berliner Afrika-Konferenz 1884/85</strong>:
                Die Konferenzmächte erkannten damals das private Territorium von König Leopold II. völkerrechtlich an. Unter dem Deckmantel von
                „Freihandel“ und angeblicher „Zivilisierung“ entstand ein System der Zwangsarbeit und Ausbeutung, das bis zu 10 Millionen Menschen das Leben kostete.
              </p>
            </div>

            {/* Archival metadata citation footer */}
            <div className="pt-2 border-t border-[#2e2318] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] font-mono text-[#a89680]">
              <span><strong>Archivnachweis:</strong> Anti-Slavery International Archives / National Portrait Gallery London</span>
              <span className="text-[#c4a46a]">Signatur: NPG x199923 (1904)</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#17110c] border-t border-[#3e3224] flex items-center justify-between">
          <p className="text-[11px] font-serif text-[#8f7e6a] hidden sm:block">
            Authentisches historisches Originaldokument aus den Archivbeständen.
          </p>
          <button
            onClick={() => {
              soundFx.playSubtleTick();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-1.5 bg-[#261c13] hover:bg-[#34271c] text-[#f5ebd9] border border-[#c4a46a]/40 hover:border-[#c4a46a] rounded text-xs font-cinzel transition-all cursor-pointer shadow-md active:scale-95"
          >
            Schließen
          </button>
        </div>
      </motion.div>

      {/* Fullscreen High-Resolution Lightbox View */}
      <AnimatePresence>
        {isZoomed && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[94vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white text-xs font-serif px-3 py-1 bg-black/70 border border-white/20 rounded cursor-pointer"
              >
                ✕ Schließen
              </button>

              <div className="border-4 border-[#c4a46a] rounded overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,1)] bg-black">
                <img
                  src={imageSrc}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== fallbackSrc) target.src = fallbackSrc;
                  }}
                  alt="Historische Primärquelle Kongo 1904"
                  className="max-h-[82vh] w-auto object-contain block select-none"
                />
              </div>

              <div className="mt-2.5 text-center text-xs font-serif text-[#d6c7b2] bg-[#140e0a]/90 px-4 py-1.5 rounded border border-[#3e3224]">
                <strong className="text-[#f5ebd9]">Nsala of Wala at Baringa</strong> (Foto: Alice Seeley Harris, Kongo-Freistaat, Mai 1904)
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
