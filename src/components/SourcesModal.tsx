import React from 'react';
import { PRIMARY_SOURCES } from '../data/conferenceData';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="archival-panel max-w-2xl w-full p-6 sm:p-8 rounded border border-[#c4a46a]/40 shadow-2xl max-h-[85vh] overflow-y-auto text-[#ded1be]">
        <div className="flex items-start justify-between border-b border-[#3e3224] pb-4 mb-4">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c4a46a] font-cinzel">
              Wissenschaftlicher Nachweis
            </span>
            <h3 className="text-2xl font-garamond font-semibold text-[#f8f2e7] mt-0.5">
              Quellen & Bildnachweise
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-[#a6937c] hover:text-[#fff] p-1.5 rounded cursor-pointer"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 text-xs sm:text-sm font-prose leading-relaxed text-[#d4c5b3]">
          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#c4a46a] mb-2">
              Historische Primärquellen & Dokumente
            </h4>
            <div className="space-y-3">
              {PRIMARY_SOURCES.map((src) => (
                <div key={src.title} className="p-3 bg-[#130f0c] rounded border border-[#382d22]">
                  <p className="font-serif font-medium text-[#f5ebd9]">{src.title}</p>
                  <p className="text-xs text-[#a6937c] mt-0.5 font-sans">
                    {src.institution} {src.year ? `(${src.year})` : ''}
                  </p>
                  {src.details && <p className="text-xs text-[#baa892] mt-1 italic">{src.details}</p>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#c4a46a] mb-2">
              Ausgewählte Fachliteratur für den Unterricht
            </h4>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#baa892]">
              <li><strong>Hochschild, Adam:</strong> <em>Schatten über dem Kongo. Die Geschichte eines der großen, fast vergessenen Menschheitsverbrechen</em>, Klett-Cotta, 2000.</li>
              <li><strong>Pakenham, Thomas:</strong> <em>The Scramble for Africa: White Man’s Conquest of the Dark Continent from 1876 to 1912</em>, Avon Books, 1991.</li>
              <li><strong>Stoecker, Helmut (Hrsg.):</strong> <em>Drang nach Afrika. Die deutsche koloniale Expansionspolitik und Herrschaft in Afrika von den Anfängen bis zum Verlust der Kolonien</em>, Akademie-Verlag Berlin, 1991.</li>
              <li><strong>Zimmerer, Jürgen:</strong> <em>Von Windhuk nach Auschwitz? Beiträge zum Verhältnis von Kolonialismus und Holocaust</em>, Lit Verlag, 2011.</li>
              <li><strong>Wehler, Hans-Ulrich:</strong> <em>Bismarck und der Imperialismus</em>, Kiepenheuer & Witsch, 1969.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-cinzel text-xs uppercase tracking-wider text-[#c4a46a] mb-2">
              Bildnachweis & Methodische Anmerkung
            </h4>
            <p className="text-xs text-[#baa892]">
              Die visuellen Raumszenen basieren auf KI-unterstützten Bildrekonstruktionen historischer Gemälde und Radierungen
              der Berliner Konferenz (u. a. nach Adalbert von Rößler und zeitgenössischen Holzschnitten der Reichskanzlei)
              und dienen ausschließlich didaktischen Zwecken im Geschichtsunterricht.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#3e3224] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#2a2118] hover:bg-[#3a2e21] text-[#ebd9c1] text-xs font-cinzel rounded border border-[#c4a46a]/30 cursor-pointer"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
