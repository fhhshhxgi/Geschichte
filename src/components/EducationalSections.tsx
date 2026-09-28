import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GENERAL_ACT_CHAPTERS, ALL_PARTICIPANTS, PRIMARY_SOURCES } from '../data/conferenceData';
import { soundFx } from '../utils/soundEffects';
import { CountryFlag } from './CountryFlag';

export const EducationalSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beschluesse' | 'staaten' | 'kongo' | 'quellen'>('beschluesse');
  const [selectedChapter, setSelectedChapter] = useState<number>(0);
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const navTabs = [
    { id: 'beschluesse', label: '📜 Die 7 Kapitel der Generalakte', icon: '📜' },
    { id: 'staaten', label: '🏛️ Alle 14 Teilnehmerstaaten', icon: '🏛️' },
    { id: 'kongo', label: '💧 Brennpunkt Kongo-Fluss', icon: '💧' },
    { id: 'quellen', label: '📚 Primärquellen & Zitate', icon: '📚' },
  ];

  const handleCopy = (text: string, title: string) => {
    soundFx.playSubtleTick();
    navigator.clipboard?.writeText(text);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(null), 2200);
  };

  const activeChap = GENERAL_ACT_CHAPTERS[selectedChapter];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 select-none space-y-8 border-t border-[#342416]">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c4a46a]/15 border border-[#c4a46a]/30 text-[#c4a46a] text-[10px] font-cinzel uppercase tracking-[0.25em] font-bold">
          <span>🏛️</span>
          <span>Archivbestand Wilhelmstraße 77</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-garamond font-normal text-[#f5ebd9]">
          Diplomatisches Dossier &amp; Generalakte
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#b3a189] max-w-xl mx-auto">
          Die Originalverträge der Konferenz, die Unterschriften der Mächte und ihre historischen Konsequenzen.
        </p>

        {/* Tab Pills */}
        <div className="flex items-center justify-center gap-1.5 pt-3 flex-wrap">
          {navTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                soundFx.playSubtleTick();
                setActiveTab(t.id as typeof activeTab);
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-cinzel transition-all cursor-pointer border flex items-center gap-1.5 ${
                activeTab === t.id
                  ? 'bg-[#c4a46a] text-[#120e0b] border-[#e8d5b5] font-bold shadow'
                  : 'bg-[#140e0a] text-[#8c7b68] hover:text-[#edd9b9] border-[#342416]'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: 7 KAPITEL DER GENERALAKTE */}
      {activeTab === 'beschluesse' && (
        <div className="space-y-6">
          {/* Chapter Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {GENERAL_ACT_CHAPTERS.map((chap, idx) => (
              <button
                key={`chap-btn-${chap.number}`}
                onClick={() => {
                  soundFx.playSubtleTick();
                  setSelectedChapter(idx);
                }}
                className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                  selectedChapter === idx
                    ? 'bg-[#2a1d13] border-[#c4a46a] shadow-md scale-102'
                    : 'bg-[#140e0a] border-[#342416] hover:border-[#854d0e]'
                }`}
              >
                <span className="text-[10px] font-mono text-[#c4a46a] font-bold block">
                  Kapitel {chap.number}
                </span>
                <span className="text-xs font-cinzel text-[#f5ebd9] truncate w-full mt-0.5">
                  {chap.title.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>

          {/* Active Chapter Card: Side-by-Side Comparison */}
          <div className="bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#342416] pb-4">
              <div>
                <span className="text-xs font-mono text-[#f59e0b] font-bold">
                  KAPITEL {activeChap.number} DER GENERALAKTE VOM 26. FEBRUAR 1885
                </span>
                <h3 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9] mt-0.5">
                  {activeChap.title}
                </h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-[#24170f] border border-[#4a3622] text-[#c4a46a] font-mono self-start sm:self-center">
                {activeChap.articles}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* Box 1: Wortlaut / Fassade */}
              <div className="bg-[#1a120c] border border-[#d97706]/40 p-5 rounded-lg space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-2 border-b border-[#342416]">
                    <span className="text-base">📜</span>
                    <span className="text-xs font-cinzel font-bold text-[#fef08a] uppercase">
                      Offizieller Vertragstext
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-prose text-[#e8ded0] leading-relaxed">
                    {activeChap.summary}
                  </p>
                </div>
                <div className="text-[11px] text-[#a89680] font-serif pt-2 border-t border-[#2e2013]">
                  Diplomatische Begründung: Humanitäre Fürsorge &amp; zollfreier Handel.
                </div>
              </div>

              {/* Box 2: Reale Wirkung / Koloniale Realität */}
              <div className="bg-[#20100a] border border-[#ef4444]/50 p-5 rounded-lg space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 pb-2 border-b border-[#401a14]">
                    <span className="text-base">🔍</span>
                    <span className="text-xs font-cinzel font-bold text-[#fca5a5] uppercase">
                      Tatsächliche koloniale Folge
                    </span>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-prose text-[#edd9b9] leading-relaxed">
                    {activeChap.colonialReality}
                  </p>
                </div>
                <div className="text-[11px] text-[#fca5a5] font-cinzel pt-2 border-t border-[#401a14] font-semibold">
                  ⚠️ Hebel für den forcierten militärischen Wettlauf ins Binnenland.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIE 14 TEILNEHMERSTAATEN */}
      {activeTab === 'staaten' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {ALL_PARTICIPANTS.map((part) => (
              <div
                key={`state-card-${part.id}`}
                className="bg-[#140e0a] border border-[#3e2c1c] hover:border-[#854d0e] p-4 rounded-lg space-y-2 transition-all shadow-md"
              >
                <div className="flex items-center gap-2.5">
                  <CountryFlag countryId={part.id} className="w-5 h-3.5 shadow-xs" />
                  <div>
                    <h4 className="text-sm font-bold font-cinzel text-[#f5ebd9]">
                      {part.country}
                    </h4>
                    <span className="text-[11px] text-[#c4a46a] font-serif truncate block">
                      {part.representative}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] font-prose text-[#a89680] leading-snug line-clamp-3">
                  {part.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: WARUM DER KONGO? */}
      {activeTab === 'kongo' && (
        <div className="bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] uppercase font-cinzel text-[#f59e0b] font-bold">
              Zentraler Streitpunkt
            </span>
            <h3 className="text-2xl font-garamond font-bold text-[#f5ebd9]">
              Warum stand das Kongobecken im Zentrum der Konferenz?
            </h3>
            <p className="text-xs font-serif text-[#b8a690] leading-relaxed">
              Der Kongo ist mit 4.700 km der zweitwasserreichste Fluss der Erde. Sein gewaltiges Becken 
              erschloss den Zugang zu Rohstoffen im Herzen des unentdeckten Binnenlands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: '1. Die Wasserautobahn',
                icon: '🚢',
                text: 'Der schiffbare Kongo bot den einzigen schnellen Transportweg für Millionen Tonnen Kautschuk, Kupfer und Elfenbein an den Atlantik.',
              },
              {
                title: '2. Die Leopold-Täuschung',
                icon: '👑',
                text: 'König Leopold II. versprach allen europäischen Mächten vollständige Zollfreiheit, um sich 2,3 Mio. km² als Privatbesitz anerkennen zu lassen.',
              },
              {
                title: '3. Der Kautschuk-Terror',
                icon: '🩸',
                text: 'Der 1888 erfundene Luftreifen machte Rohkautschuk zum wertvollsten Gut der Welt. Das Resultat war ein Massenmord an bis zu 10 Millionen Menschen.',
              },
            ].map((box, i) => (
              <div
                key={`kongo-box-${i}`}
                className="bg-[#1c130b] border border-[#3e2c1c] p-4 rounded-lg space-y-2"
              >
                <div className="text-2xl">{box.icon}</div>
                <h4 className="text-sm font-bold font-cinzel text-[#f5ebd9]">
                  {box.title}
                </h4>
                <p className="text-xs font-prose text-[#b8a690] leading-relaxed">
                  {box.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRIMÄRQUELLEN & ZITATE */}
      {activeTab === 'quellen' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRIMARY_SOURCES.map((src, i) => (
              <div
                key={`src-card-${i}`}
                className="bg-[#140e0a] border border-[#3e2c1c] hover:border-[#854d0e] p-5 rounded-lg space-y-3 flex flex-col justify-between shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs sm:text-sm font-bold font-cinzel text-[#f5ebd9]">
                      {src.title}
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#24170e] text-[#c4a46a] font-mono shrink-0">
                      {src.year}
                    </span>
                  </div>

                  <blockquote className="mt-2.5 p-3 bg-[#1c130b] border-l-2 border-[#f59e0b] text-xs font-serif italic text-[#edd9b9] leading-relaxed">
                    „{src.quote}“
                  </blockquote>

                  <p className="mt-2 text-[11px] text-[#9c8973] font-serif">
                    <strong>Kontext:</strong> {src.context}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2e2013] flex items-center justify-between">
                  <span className="text-[10px] text-[#705e4c]">
                    {src.author}
                  </span>
                  <button
                    onClick={() => handleCopy(src.quote, src.title)}
                    className="px-2.5 py-1 bg-[#241a12] hover:bg-[#34271c] text-[#edd9b9] text-[10px] font-cinzel rounded border border-[#523d2b] transition-colors cursor-pointer"
                  >
                    {copiedTitle === src.title ? '✓ Kopiert' : 'Zitat kopieren'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
