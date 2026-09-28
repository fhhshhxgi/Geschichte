import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TIMELINE } from '../data/conferenceData';
import { TimelineEvent } from '../types/conference';
import { soundFx } from '../utils/soundEffects';

export const TimelineSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'vorgeschichte' | 'konferenz' | 'folge'>('all');
  const [activeIndex, setActiveIndex] = useState<number>(3); // 15. November 1884 by default

  const filteredEvents = filter === 'all'
    ? TIMELINE
    : TIMELINE.filter((e) => e.category === filter);

  const activeEvent: TimelineEvent = filteredEvents[activeIndex] || filteredEvents[0] || TIMELINE[3];

  const handleSelect = (idx: number) => {
    soundFx.playSubtleTick();
    setActiveIndex(idx);
  };

  const handleFilter = (f: typeof filter) => {
    soundFx.playSubtleTick();
    setFilter(f);
    setActiveIndex(0);
  };

  const KEY_MILESTONES = [
    { year: '1876', label: 'Brüssel (Leopold II.)', category: 'vorgeschichte' },
    { year: '1882', label: 'Besetzung Ägyptens', category: 'vorgeschichte' },
    { year: '1884', label: 'Eröffnung Berlin', category: 'konferenz' },
    { year: '1885', label: 'Generalakte Berlin', category: 'konferenz' },
    { year: '1896', label: 'Sieg bei Adwa', category: 'folge' },
    { year: '1904', label: 'Herero-Völkermord', category: 'folge' },
    { year: '1914', label: '1. Weltkrieg', category: 'folge' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#c4a46a]/15 border border-[#c4a46a]/30 text-[#c4a46a] text-[10px] font-cinzel uppercase tracking-[0.25em] font-bold">
          <span>⚡</span>
          <span>Interaktive Chronologie 1876–1914</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-garamond font-normal text-[#f5ebd9]">
          Zeitleiste des Kolonialen Bruchs
        </h2>
        <p className="text-xs sm:text-sm font-serif text-[#b3a189] max-w-xl mx-auto">
          Von den privaten Intrigen Leopolds II. über die 104 Verhandlungstage in Berlin bis zum Ersten Weltkrieg.
        </p>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 pt-2 flex-wrap">
          {[
            { id: 'all', label: 'Alle 12 Stationen' },
            { id: 'vorgeschichte', label: 'Vorgeschichte (1876–1884)' },
            { id: 'konferenz', label: 'Die Konferenz (1884/85)' },
            { id: 'folge', label: 'Kriege & Aufteilung (1885–1914)' },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => handleFilter(btn.id as typeof filter)}
              className={`px-3 py-1.5 text-xs font-cinzel rounded-md transition-all cursor-pointer border ${
                filter === btn.id
                  ? 'bg-[#c4a46a] text-[#120e0b] border-[#e8d5b5] font-bold shadow'
                  : 'bg-[#140e0a] text-[#8c7b68] hover:text-[#edd9b9] border-[#342416]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Scrubber Strip */}
      <div className="bg-[#120d09] border border-[#3e2c1c] p-3 rounded-xl overflow-x-auto shadow-xl">
        <div className="flex items-center gap-2 min-w-max">
          {filteredEvents.map((evt, idx) => {
            const isSelected = activeIndex === idx;
            return (
              <button
                key={`timeline-pill-${evt.id}-${idx}`}
                onClick={() => handleSelect(idx)}
                className={`flex flex-col items-center p-2.5 rounded-lg border transition-all cursor-pointer min-w-[130px] max-w-[150px] text-left ${
                  isSelected
                    ? 'bg-[#2a1d13] border-[#c4a46a] shadow-[0_0_12px_rgba(196,164,106,0.3)] scale-102'
                    : 'bg-[#17100b] border-[#2d1e13] hover:border-[#6b4e31]'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-[#c4a46a] text-[#120e0b] font-bold' : 'bg-[#24170f] text-[#a89680]'
                  }`}>
                    {evt.year}
                  </span>
                  <span className="text-xs">
                    {evt.category === 'konferenz' ? '🏛️' : evt.category === 'vorgeschichte' ? '📜' : '⚔️'}
                  </span>
                </div>
                <span className="text-xs font-cinzel font-bold text-[#f5ebd9] truncate w-full">
                  {evt.title}
                </span>
                <span className="text-[10px] text-[#8c7b68] truncate w-full font-serif">
                  {evt.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Focus Milestone Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`active-event-card-${activeEvent.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Top Bar: Date, Year Badge and Category */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#342416] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl sm:text-4xl px-3 py-1.5 rounded-lg bg-[#24170e] border border-[#854d0e] font-mono font-bold text-[#fef08a]">
                {activeEvent.year}
              </span>
              <div>
                <span className="text-xs font-serif text-[#a89680] block">
                  {activeEvent.date}
                </span>
                <h3 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9]">
                  {activeEvent.title}
                </h3>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded bg-[#2a1d13] border border-[#c4a46a]/40 text-[#edd9b9] font-cinzel self-start sm:self-center">
              {activeEvent.category === 'konferenz'
                ? '🏛️ Berliner Konferenz'
                : activeEvent.category === 'vorgeschichte'
                ? '📜 Vorspiel & Intrigen'
                : '⚔️ Kriege, Ausbeutung & Folgen'}
            </span>
          </div>

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Description & Key Facts */}
            <div className="space-y-4 flex flex-col justify-between">
              <p className="text-sm sm:text-base font-prose text-[#e8ded0] leading-relaxed">
                {activeEvent.description}
              </p>

              <div className="bg-[#1a120c] p-4 rounded-lg border border-[#3e2c1c] space-y-2">
                <span className="text-[10px] uppercase font-cinzel text-[#c4a46a] font-bold block">
                  Historische Bedeutung:
                </span>
                <p className="text-xs text-[#d6c7b2] font-serif leading-relaxed">
                  {activeEvent.impact}
                </p>
              </div>
            </div>

            {/* Quote / Visual Callout */}
            <div className="bg-[#1f150e] border border-[#854d0e]/40 p-5 rounded-lg flex flex-col justify-between space-y-4">
              {activeEvent.quote ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-cinzel text-[#fef08a]">
                    <span>📜</span>
                    <span>Zeitgenössisches Originalzitat</span>
                  </div>
                  <blockquote className="p-3 bg-[#140e08] rounded border-l-3 border-[#f59e0b] text-xs sm:text-sm font-serif italic text-[#edd9b9] leading-relaxed">
                    „{activeEvent.quote}“
                  </blockquote>
                  {activeEvent.quoteAuthor && (
                    <span className="text-[11px] text-[#a89680] font-cinzel block text-right">
                      — {activeEvent.quoteAuthor}
                    </span>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <span className="text-xs font-cinzel text-[#c4a46a] font-bold block">
                    📍 Schauplatz &amp; Dimension
                  </span>
                  <p className="text-xs text-[#b8a690] leading-relaxed">
                    Ereignis im Rahmen des weltweiten imperialen Wettlaufs um die Ressourcen des afrikanischen Kontinents.
                  </p>
                </div>
              )}

              {/* Navigation Arrows for Scrubbing */}
              <div className="flex items-center justify-between pt-3 border-t border-[#342416]">
                <button
                  disabled={activeIndex === 0}
                  onClick={() => handleSelect(Math.max(0, activeIndex - 1))}
                  className="px-3 py-1.5 bg-[#140e09] hover:bg-[#25170d] text-[#edd9b9] text-xs font-cinzel rounded border border-[#3e2c1c] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  ← Vorheriges
                </button>
                <span className="text-xs text-[#8c7b68] font-mono">
                  {activeIndex + 1} / {filteredEvents.length}
                </span>
                <button
                  disabled={activeIndex === filteredEvents.length - 1}
                  onClick={() => handleSelect(Math.min(filteredEvents.length - 1, activeIndex + 1))}
                  className="px-3 py-1.5 bg-[#140e09] hover:bg-[#25170d] text-[#edd9b9] text-xs font-cinzel rounded border border-[#3e2c1c] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                >
                  Nächstes →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
