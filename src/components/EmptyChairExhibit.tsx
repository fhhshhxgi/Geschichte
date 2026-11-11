import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';

interface EmptyChairExhibitProps {
  onBackToRoom: () => void;
  onOpenMap?: () => void;
  onOpenImperialism?: () => void;
}

type MemorialTab = 'ausschluss' | 'herrscher' | 'opfer' | 'erbe';

export const EmptyChairExhibit: React.FC<EmptyChairExhibitProps> = ({
  onBackToRoom,
  onOpenMap,
  onOpenImperialism,
}) => {
  const [activeTab, setActiveTab] = useState<MemorialTab>('ausschluss');
  const [selectedHero, setSelectedHero] = useState<number>(0);

  const UNINVITED_RULERS = [
    {
      name: 'Kaiser Menelik II. & Kaiserin Taytu Betul',
      nation: 'Kaiserreich Äthiopien',
      title: 'Die Bezwinger des europäischen Kolonialismus',
      year: '1889–1896',
      badge: 'Historischer Sieg bei Adwa',
      quote: '„Äthiopien bedarf niemandes Schutz. Seit 14 Jahrhunderten bewahrt unser Volk seine Freiheit — und wird sie gegen jede europäische Macht verteidigen.“',
      context: 'Italien versuchte, Äthiopien mit einem gefälschten Vertrag zu unterwerfen. Kaiserin Taytu Betul und Menelik II. mobilisierten 100.000 Krieger und schlugen das italienische Invasionsheer 1896 bei Adwa vernichtend. Äthiopien blieb frei!',
      significance: 'Beweis, dass afrikanische Staaten souverän, militärisch ebenbürtig und diplomatisch weitsichtig waren.',
    },
    {
      name: 'Königinmutter Yaa Asantewaa',
      nation: 'Ashanti-Reich (heute Ghana)',
      title: 'Oberbefehlshaberin im Krieg der Goldenen Bank',
      year: '1900',
      badge: 'Verteidigung der nationalen Würde',
      quote: '„Wenn die Männer von Ashanti Angst vor den britischen Gewehren haben, kämpfen wir Frauen! Wir weichen keinen Schritt zurück.“',
      context: 'Als der britische Gouverneur den heiligen goldenen Thron der Ashanti für Königin Victoria forderte, entfesselte Yaa Asantewaa den Volksaufstand. Sie belagerte das britische Fort in Kumasi monatelang.',
      significance: 'Die Briten konnten den heiligen Thron niemals erbeuten — Symbol ungebrochener afrikanischer Würde.',
    },
    {
      name: 'Almamy Samori Touré',
      nation: 'Wassoulou-Reich (Westafrika)',
      title: 'Der „Napoleon Afrikas“ & Waffenreformer',
      year: '1882–1898',
      badge: '16 Jahre Widerstand gegen Frankreich',
      quote: '„Freiheit ist kein Geschenk der Europäer. Sie ist unser angeborenes Recht, für das wir jeden Zoll unserer Erde verteidigen.“',
      context: 'Baute ein straff organisiertes Heer mit eigener Gewehrproduktion auf. Führte 16 Jahre lang einen überlegenen taktischen Abwehrkrieg gegen französische Kolonialtruppen.',
      significance: 'Frankreich brauchte zwei Jahrzehnte und tausende Soldaten, um Samori Tourés Reich zu brechen.',
    },
    {
      name: 'Kaptein Hendrik Witbooi',
      nation: 'Nama-Volk (Namibia)',
      title: 'Philosoph, Staatsmann & Freiheitskämpfer',
      year: '1894–1905',
      badge: 'UNESCO-Weltdokumentenerbe (Tagebücher)',
      quote: '„Gott gab jedem Volk sein eigenes Land. Sie sagen, Sie wollen mich beschützen? Vor wem? Ich habe keinen Feind, den ich nicht selbst abwehren könnte.“',
      context: 'Seine handschriftlichen Briefe an deutsche Gouverneure entlarvten die koloniale Doppelmoral. Fiel 1905 im Gefecht gegen die kaiserliche Schutztruppe während des Genozids.',
      significance: 'Seine prophetischen Briefe sind heute Teil des UNESCO-Gedächtnisses der Menschheit.',
    },
    {
      name: 'König Jaja von Opobo',
      nation: 'Königreich Opobo (Nigerdelta / Nigeria)',
      title: 'Afrikanischer Handelsmagnat & Monopolbrecher',
      year: '1869–1887',
      badge: 'Widerstand gegen britisches Palmöl-Monopol',
      quote: '„Mein Volk handelt zu meinen Bedingungen, nicht unter den Diktaten britischer Kriegsschiffe.“',
      context: 'Kontrollierte den gesamten Palmölhandel im Nigerdelta. Als er sich weigerte, britischen Kaufleuten zollfreien Zugang zu gewähren, wurde er von britischen Kriegsschiffen heimtückisch entführt.',
      significance: 'Zeigt, wie blühende afrikanische Handelsstaaten durch britische Kanonenbootpolitik zerstört wurden.',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-5xl mx-auto my-auto max-h-[88vh] overflow-y-auto rounded-xl border-2 border-[#f59e0b]/50 shadow-[0_0_80px_rgba(245,158,11,0.25)] bg-[#0c0805]/98 text-[#edd9b9] p-5 sm:p-8 select-none z-30"
    >
      {/* Cinematic Golden Amber Spotlight Flare */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#f59e0b]/25 via-[#f59e0b]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3 pb-6 border-b border-[#3e2c1c]">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/40 text-[#f59e0b] text-[11px] font-cinzel uppercase tracking-[0.25em] font-bold shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
          <span>Mahnmal &amp; Historische Analyse</span>
        </div>
        
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-garamond font-normal text-[#f5ebd9] tracking-tight leading-tight">
          Der leere Stuhl von Berlin
        </h1>

        <p className="text-sm font-prose text-[#d8c5ad] leading-relaxed max-w-2xl mx-auto">
          In der Reichskanzlei in der Wilhelmstraße 77 verhandelten 14 westliche Mächte über einen ganzen Kontinent.
          <strong className="text-[#f5ebd9] block mt-1">
            Kein einziger afrikanischer Herrscher, Gelehrter oder Bürger war eingeladen, gehört oder informiert.
          </strong>
        </p>

        {/* High-Impact Stat Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
          <div className="bg-[#17100b] border border-[#3e2c1c] rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#a89680] block">Europäische Mächte</span>
            <span className="text-2xl font-bold font-garamond text-[#f5ebd9] block">14 Staaten</span>
            <span className="text-[10px] text-[#c4a46a] font-serif">104 Verhandlungstage</span>
          </div>
          <div className="bg-[#17100b] border border-[#3e2c1c] rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#a89680] block">Aufgeteiltes Land</span>
            <span className="text-2xl font-bold font-garamond text-[#f5ebd9] block">30 Mio. km²</span>
            <span className="text-[10px] text-[#c4a46a] font-serif">20% der Erdlandmasse</span>
          </div>
          <div className="bg-[#17100b] border border-[#3e2c1c] rounded-lg p-3 text-center">
            <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#a89680] block">Betroffene Menschen</span>
            <span className="text-2xl font-bold font-garamond text-[#f5ebd9] block">~100 Millionen</span>
            <span className="text-[10px] text-[#c4a46a] font-serif">Hunderte Reiche & Völker</span>
          </div>
          <div className="bg-[#241106] border-2 border-[#ef4444]/60 rounded-lg p-3 text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="text-[10px] uppercase font-cinzel tracking-wider text-[#ef4444] font-bold block">Afrikanische Stimmen</span>
            <span className="text-2xl font-bold font-garamond text-[#ef4444] block">0 Personen</span>
            <span className="text-[10px] text-[#fca5a5] font-serif">100% Ausschluss</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Memorial Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 pt-6 pb-4 flex-wrap border-b border-[#3e2c1c]">
        {[
          { id: 'ausschluss' as MemorialTab, label: '⚖️ Der totale Ausschluss', sub: 'Terra Nullius & Scheinverträge' },
          { id: 'herrscher' as MemorialTab, label: '👑 Die wahren Herrscher', sub: 'Widerstand & afrikanische Siege' },
          { id: 'opfer' as MemorialTab, label: '🩸 Zahlen des Schreckens', sub: 'Kongo, Genozid & Willkürgrenzen' },
          { id: 'erbe' as MemorialTab, label: '🏛️ Spuren bis heute', sub: 'Restitution & koloniale Amnesie' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`chair-nav-${tab.id}`}
              onClick={() => {
                soundFx.playSubtleTick();
                setActiveTab(tab.id);
              }}
              className={`px-4 py-2.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer border flex flex-col items-center gap-0.5 ${
                isActive
                  ? 'bg-[#f59e0b] text-[#140e08] border-[#fde68a] font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'bg-[#150f0a] text-[#c4a46a] hover:text-[#fff] border-[#382819] hover:bg-[#20150d]'
              }`}
            >
              <span className="font-bold tracking-wider">{tab.label}</span>
              <span className={`text-[9.5px] font-sans ${isActive ? 'text-[#3b2308]' : 'text-[#8c7b68]'}`}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="py-6">
        <AnimatePresence mode="wait">
          {/* TAB 1: DER TOTALE AUSSCHLUSS */}
          {activeTab === 'ausschluss' && (
            <motion.div
              key="tab-ausschluss"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#140e09] rounded-lg border border-[#3e2c1c] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📜</span>
                    <h3 className="text-base font-cinzel font-bold text-[#f5ebd9]">
                      Die juristische Fiktion: „Terra Nullius“
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                    Europäische Völkerrechtler erfanden das zynische Rechtskonstrukt der <strong>„Terra Nullius“</strong> (staatsfreies, herrenloses Land).
                    Sie erklärten kurzerhand, dass afrikanische Völker und Jahrhunderte alte Königreiche keine „zivilisierten Staaten“ seien und daher
                    völkerrechtlich nicht existierten.
                  </p>
                  <div className="p-3 bg-[#1e150d] rounded border-l-2 border-[#f59e0b] text-xs font-serif text-[#edd9b9] italic">
                    „Man beriet über uns, entschied über uns, verteilte unseren Boden und unsere Flüsse — als ob Afrika ein unbewohnter Kontinent wäre.“
                  </div>
                </div>

                <div className="p-5 bg-[#140e09] rounded-lg border border-[#3e2c1c] space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✒️</span>
                    <h3 className="text-base font-cinzel font-bold text-[#f5ebd9]">
                      Die Scheinverträge der Handelsagenten
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm font-prose text-[#d1c2af] leading-relaxed">
                    Forscher wie Henry Morton Stanley und Karl Peters legten afrikanischen Dorfältesten vorab formulierte Verträge in englischer
                    oder französischer Sprache vor. Mit einem Kreuz auf Papier traten Herrscher ahnungslos alle Land-, Wasser- und Schürfrechte ab —
                    im Tausch gegen billigen Kattunstoff, Alkohol oder bunte Glasperlen.
                  </p>
                  <div className="p-3 bg-[#1e150d] rounded border-l-2 border-[#ef4444] text-xs font-serif text-[#edd9b9]">
                    <strong className="text-[#ef4444] block font-sans uppercase text-[10px] tracking-wider mb-1">Historische Darstellung:</strong>
                    Karl Peters prahlte offen damit, Verträge durch Vorspiegelung falscher Tatsachen und Androhung von Waffengewalt erpresst zu haben.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: DIE WAHREN HERRSCHER (WIDERSTAND) */}
          {activeTab === 'herrscher' && (
            <motion.div
              key="tab-herrscher"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-5"
            >
              <p className="text-xs font-serif text-[#c4a46a] text-center max-w-xl mx-auto">
                Diese afrikanischen Könige, Königinnen und Heerführer verteidigten ihre Staaten gegen die europäische Invasion.
                Wähle eine Persönlichkeit aus:
              </p>

              {/* Selector Pills */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {UNINVITED_RULERS.map((ruler, idx) => (
                  <button
                    key={`ruler-btn-${idx}`}
                    onClick={() => {
                      soundFx.playSubtleTick();
                      setSelectedHero(idx);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-cinzel transition-all cursor-pointer border ${
                      selectedHero === idx
                        ? 'bg-[#c4a46a] text-[#120e0b] border-[#f5ebd9] font-bold shadow-md'
                        : 'bg-[#150f0a] text-[#a89680] hover:text-[#fff] border-[#382819]'
                    }`}
                  >
                    {ruler.name.split(' ')[0]} {ruler.name.includes('Taytu') ? '& Taytu' : ''} ({ruler.nation.split(' ')[0]})
                  </button>
                ))}
              </div>

              {/* Spotlight Card */}
              {(() => {
                const hero = UNINVITED_RULERS[selectedHero];
                return (
                  <div className="p-6 bg-[#160f0a] border-2 border-[#c4a46a]/50 rounded-xl space-y-4 shadow-2xl relative overflow-hidden">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3d2c1e] pb-3">
                      <div>
                        <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#f59e0b] font-bold block">
                          {hero.nation} · {hero.year}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-cinzel font-bold text-[#f5ebd9]">
                          {hero.name}
                        </h2>
                        <span className="text-xs font-serif text-[#c4a46a] italic">
                          {hero.title}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded bg-[#10b981]/20 text-[#6ee7b7] border border-[#10b981]/40 text-xs font-cinzel font-bold self-start sm:self-auto">
                        {hero.badge}
                      </span>
                    </div>

                    <div className="p-4 bg-[#1f150c] rounded-lg border-l-4 border-[#f59e0b] text-sm font-serif italic text-[#f5ebd9] leading-relaxed">
                      {hero.quote}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-prose text-[#d1c2af]">
                      <div>
                        <strong className="text-[#c4a46a] block font-cinzel text-[11px] mb-1">
                          Historischer Kontext &amp; Abwehrkampf:
                        </strong>
                        <p className="leading-relaxed">{hero.context}</p>
                      </div>
                      <div>
                        <strong className="text-[#10b981] block font-cinzel text-[11px] mb-1">
                          Historische Bedeutung bis heute:
                        </strong>
                        <p className="leading-relaxed">{hero.significance}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* TAB 3: ZAHLEN DES SCHRECKENS */}
          {activeTab === 'opfer' && (
            <motion.div
              key="tab-opfer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-[#1f0f08] border border-[#ef4444]/40 rounded-lg space-y-2">
                  <span className="text-xl">🩸</span>
                  <h4 className="text-sm font-cinzel font-bold text-[#fca5a5]">
                    Kongo-Freistaat (Kautschukterror)
                  </h4>
                  <div className="text-2xl font-bold font-garamond text-[#ef4444]">
                    Bis zu 10.000.000 Tote
                  </div>
                  <p className="text-xs font-prose text-[#e5d4be] leading-relaxed">
                    König Leopold II. beutete das 2,3 Mio. km² große Privatland brutal aus. Bei Nichterfüllung der Kautschukquoten wurden
                    Dörfer niedergebrannt, Hände abgehackt und Millionen getötet.
                  </p>
                </div>

                <div className="p-4 bg-[#1f0f08] border border-[#ef4444]/40 rounded-lg space-y-2">
                  <span className="text-xl">💀</span>
                  <h4 className="text-sm font-cinzel font-bold text-[#fca5a5]">
                    Genozid an Herero &amp; Nama (1904–1908)
                  </h4>
                  <div className="text-2xl font-bold font-garamond text-[#ef4444]">
                    80% der Herero ermordet
                  </div>
                  <p className="text-xs font-prose text-[#e5d4be] leading-relaxed">
                    Generalleutnant Lothar von Trotha erließ den berüchtigten Vernichtungsbefehl in Deutsch-Südwestafrika. Zehntausende
                    verdursteten in der Omaheke-Wüste oder starben in Konzentrationslagern (Haifischinsel).
                  </p>
                </div>

                <div className="p-4 bg-[#1f0f08] border border-[#ef4444]/40 rounded-lg space-y-2">
                  <span className="text-xl">📏</span>
                  <h4 className="text-sm font-cinzel font-bold text-[#fca5a5]">
                    Willkürliche Linealgrenzen
                  </h4>
                  <div className="text-2xl font-bold font-garamond text-[#ef4444]">
                    177 Völker zerschnitten
                  </div>
                  <p className="text-xs font-prose text-[#e5d4be] leading-relaxed">
                    Europäische Diplomaten zogen mit Lineal und Bleistift geometrische Linien quer durch Sprach- und Kulturräume (Massai, Ewe, Bakongo, Somali),
                    was bis heute verheerende Bürgerkriege nach sich zieht.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: SPUREN BIS HEUTE */}
          {activeTab === 'erbe' && (
            <motion.div
              key="tab-erbe"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#140e09] border border-[#3e2c1c] rounded-lg space-y-2.5">
                  <h4 className="text-sm font-cinzel font-bold text-[#c4a46a] flex items-center gap-2">
                    <span>🏛️</span>
                    <span>Raubkunst in europäischen Museen</span>
                  </h4>
                  <p className="text-xs font-prose text-[#d1c2af] leading-relaxed">
                    Zehntausende Meisterwerke afrikanischer Kultur (wie die berühmten <strong>Benin-Bronzen</strong> oder königliche Insignien)
                    wurden während kolonialer Strafexpeditionen geraubt und lagern bis heute in Berlin, London und Paris.
                    Die Restitution (Rückgabe) begann erst im 21. Jahrhundert zögerlich.
                  </p>
                </div>

                <div className="p-5 bg-[#140e09] border border-[#3e2c1c] rounded-lg space-y-2.5">
                  <h4 className="text-sm font-cinzel font-bold text-[#c4a46a] flex items-center gap-2">
                    <span>🗺️</span>
                    <span>Das „Afrikanische Viertel“ in Berlin</span>
                  </h4>
                  <p className="text-xs font-prose text-[#d1c2af] leading-relaxed">
                    Noch immer tragen Straßen im Berliner Wedding Namen von Kolonialverbrechern (Petersallee, Lüderitzstraße).
                    Erst nach jahrzehntelangem Einsatz zivilgesellschaftlicher Initiativen werden sie nach antikolonialen
                    Widerstandskämpfern wie Maji-Maji-Führer Rudolf Manga Bell oder Anna Mungunda umbenannt.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="pt-4 border-t border-[#3e2c1c] flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            soundFx.playChamberTone(false);
            onBackToRoom();
          }}
          className="px-4 py-2 bg-[#251d16] hover:bg-[#34271c] text-[#dfd2be] text-xs font-cinzel rounded border border-[#c4a46a]/60 hover:border-[#c4a46a] transition-all cursor-pointer flex items-center gap-2"
        >
          <span>← Zurück zur Konferenzsaal-Übersicht</span>
        </button>

        <div className="flex items-center gap-2">
          {onOpenMap && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenMap();
              }}
              className="px-3.5 py-2 bg-[#1b2533] hover:bg-[#28384d] text-[#93c5fd] text-xs font-cinzel rounded border border-[#3b82f6]/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>🗺️</span>
              <span>Afrika-Karte ansehen</span>
            </button>
          )}
          {onOpenImperialism && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenImperialism();
              }}
              className="px-3.5 py-2 bg-[#25150c] hover:bg-[#361e11] text-[#fca5a5] text-xs font-cinzel rounded border border-[#ef4444]/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>🩸</span>
              <span>Raubbau &amp; Folgen</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
