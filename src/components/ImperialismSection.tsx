import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';
import { ImperialismTradeDashboard } from './ImperialismTradeDashboard';

interface ImperialismSectionProps {
  onOpenMap?: () => void;
  onOpenConferenceRoom?: () => void;
}

export const ImperialismSection: React.FC<ImperialismSectionProps> = ({
  onOpenMap,
  onOpenConferenceRoom,
}) => {
  const [activeTab, setActiveTab] = useState<'rohstoffe' | 'entlarver' | 'lineal' | 'widerstand' | 'handelsströme'>('rohstoffe');

  // Rohstoff-Labor State
  const [selectedResource, setSelectedResource] = useState<number>(0);
  const [resourcePerspective, setResourcePerspective] = useState<'europe' | 'africa'>('africa');

  // Mythos vs Reality State
  const [activeMythIdx, setActiveMythIdx] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Border Ruler Simulator State
  const [activeBorderCase, setActiveBorderCase] = useState<number>(0);
  const [rulerPosition, setRulerPosition] = useState<number>(50);

  // Resistance Filter
  const [resistanceFilter, setResistanceFilter] = useState<'all' | 'victory' | 'resistance'>('all');

  const RESOURCES = [
    {
      id: 'rubber',
      name: 'Wildkautschuk',
      icon: '🩸',
      region: 'Kongo-Freistaat & Französisch-Kongo',
      tag: 'Kautschukboom nach 1888',
      tollBadge: 'Bis zu 10 Mio. Tote',
      europeUse: 'Dunlops Erfindung des Luftreifens (1888) für Fahrräder/Autos und Dichtungen für europäische Dampfmaschinen.',
      africaReality: 'Force-Publique-Terror: Verfehlte Dörfer erhielten Geiselnahmen, abgehackte Hände und Massenhinrichtungen.',
      keyFact: 'König Leopold II. erwirtschaftete hunderte Millionen Goldfranken Reingewinn für persönliche Prachtbauten in Brüssel.',
      stat: '50% Bevölkerungsverlust im Kongobecken',
    },
    {
      id: 'gold-diamonds',
      name: 'Gold & Diamanten',
      icon: '💎',
      region: 'Südafrika (Kimberley & Witwatersrand)',
      tag: 'Weltgrößte Minenanlagen',
      tollBadge: 'Apartheid-Ursprung (1913)',
      europeUse: 'Finanzierung des internationalen Goldstandards der Bank of England und Luxusschmuck für Europas Eliten.',
      africaReality: '„Compound System“: Afrikanische Bergleute wurden in kasernierten Lagern eingesperrt und vor Entlassung rektal durchsucht.',
      keyFact: 'Cecil Rhodes nutzte den Diamantenreichtum, um mit Privatarmeen bis nach Simbabwe (Rhodesien) vorzudringen.',
      stat: '90% der weltweiten Diamantenproduktion um 1900',
    },
    {
      id: 'palmoil',
      name: 'Palmöl & Fette',
      icon: '🌴',
      region: 'Nigerdelta (Nigeria) & Dahomey',
      tag: 'Industrie-Schmierstoff',
      tollBadge: 'Kanonenboot-Kriege',
      europeUse: 'Schmiermittel für englische Textil- und Dampfmaschinen; Grundstoff für Massenseifen (Lever Brothers / Sunlight).',
      africaReality: 'Britische Kriegsschiffe bombardierten afrikanische Handelsstädte (Opobo, Nembe), um das Monopol afrikanischer Könige zu brechen.',
      keyFact: 'Traditionelle Subsistenzwirtschaft wurde zugunsten exportorientierter Monokulturen zwangsweise zerstört.',
      stat: 'Unerlässlich für die Schwerindustrie in Manchester & Birmingham',
    },
    {
      id: 'copper',
      name: 'Kupfer & Erze',
      icon: '⛏️',
      region: 'Katanga (Kongo) & Tsumeb (Namibia)',
      tag: 'Elektrifizierung Europas',
      tollBadge: 'Zwangsumsiedlung',
      europeUse: 'Millionen Kilometer Kupferdrähte für Telegrafennetze, städtische Stromnetze und Messinghülsen für Munition.',
      africaReality: 'König Msiri wurde 1891 von belgischen Söldnern erschossen; Arbeiter wurden tausende Kilometer zwangsrekrutiert.',
      keyFact: 'Monopolkonzerne wie Union Minière beherrschten riesige Territorien als autonome Staaten im Staate.',
      stat: 'Eines der reichsten Erzvorkommen der Erde',
    },
    {
      id: 'ivory',
      name: 'Elfenbein',
      icon: '🦣',
      region: 'Ost- und Zentralafrika',
      tag: 'Viktorianischer Luxus',
      tollBadge: 'Träger-Todesmärsche',
      europeUse: 'Klaviertasten, Billardkugeln, Messergriffe und Miniaturen des europäischen Bürgertums.',
      africaReality: 'Trägerzwangsarbeit: Einheimische mussten 40 kg schwere Stoßzähne hunderte Kilometer durch Dschungel und Steppe schleppen.',
      keyFact: 'Für jede Tonne Elfenbein starben hunderte afrikanische Zwangsträger an Erschöpfung und Unterernährung.',
      stat: 'Zehntausende Elefanten und Träger getötet',
    },
  ];

  const MYTHS = [
    {
      id: 'burden',
      title: '„The White Man’s Burden“ & Zivilisierungsmission',
      origin: 'Rudyard Kipling (1899) & europäische Kolonialpropaganda',
      mythQuote: '„Europa bringt den wilden Völkern Bildung, Eisenbahnen, Medizin und das Völkerrecht als selbstloses Opfer.“',
      realityText: 'Eisenbahnlinien wurden ausschließlich von Minen und Plantagen direkt zu Küstenhäfen gebaut, um Rohstoffe abzutransportieren – nicht für die Mobilität der Bevölkerung. Einheimische wurden rechtlos gestellt („Code de l’Indigénat“).',
      counterEvidence: 'Über 95% aller kolonialen Staatsausgaben flossen in Militär, Polizeikräfte und Zwangsarbeitsüberwachung.',
    },
    {
      id: 'terra-nullius',
      title: '„Terra Nullius“ & Freiwillige Verträge',
      origin: 'Völkerrechtliche Konstruktion auf der Berliner Konferenz',
      mythQuote: '„Afrika war herrenloses Land ohne staatliche Ordnung; afrikanische Häuptlinge traten ihre Gebiete freiwillig ab.“',
      realityText: 'Afrika bestand aus hochentwickelten Königreichen, Kalifaten und Föderationen. Agenten wie Carl Peters nutzten Alkohol und Täuschung, um Häuptlingen unverständliche deutsche Verträge für ein paar Glasperlen unterzuschieben.',
      counterEvidence: 'Artikel 34/35 der Berliner Akte definierte „effektive Okkupation“: Mächte mussten militärische Gewalt androhen, um Ansprüche zu sichern.',
    },
    {
      id: 'social-darwinism',
      title: 'Sozialdarwinismus & Rassenhierarchie',
      origin: 'Pseudowissenschaft des 19. Jahrhunderts (Spencer, Haeckel)',
      mythQuote: '„Im Kampf ums Dasein hat die technisch überlegene weiße Rasse das Naturrecht, schwächere Völker zu beherrschen.“',
      realityText: 'Diente als pseudowissenschaftliche Rechtfertigung für Völkermord. Generalleutnant Lothar von Trotha begründete 1904 den Völkermord an den Herero und Nama explizit mit dem rassistischen „Ausrottungskampf“.',
      counterEvidence: 'Erster Völkermord des 20. Jahrhunderts: 80% des Herero-Volkes und 50% der Nama starben durch Verdurstenlassen und Konzentrationslager.',
    },
  ];

  const BORDER_CASES = [
    {
      id: 'somali',
      name: 'Das Volk der Somali',
      flag: '🇸🇴',
      cutInto: 'Auf 4 verschiedene Mächte aufgeteilt',
      powers: ['Britisch-Somaliland', 'Italienisch-Somaliland', 'Französisch-Somaliland (Dschibuti)', 'Äthiopien'],
      impact: 'Einheitliche Nomadenkultur, Sprache und Weiderouten wurden durch willkürliche Grenzposten und Zölle zerrissen.',
      todayConflict: 'Grenzkonflikte am Horn von Afrika bis in die Gegenwart (z. B. Ogaden-Krieg).',
    },
    {
      id: 'ewe',
      name: 'Das Volk der Ewe',
      flag: '🇬🇭 🇹🇬',
      cutInto: 'Geteilt zwischen Briten & Deutschen',
      powers: ['Britische Goldküste (Ghana)', 'Deutsches Schutzgebiet Togo'],
      impact: 'Familien und Äcker wurden durch einen kerzengeraden Linealstrich auf der Landkarte in zwei fremde Sprach- und Währungszonen getrennt.',
      todayConflict: 'Bis heute verläuft die Staatsgrenze zwischen Ghana und Togo mitten durch das Siedlungsgebiet der Ewe.',
    },
    {
      id: 'maasai',
      name: 'Das Volk der Maasai',
      flag: '🇰🇪 🇹🇿',
      cutInto: 'Geteilt zwischen Kenia & Tansania',
      powers: ['Britisch-Ostafrika (Kenia)', 'Deutsch-Ostafrika (Tansania)'],
      impact: 'Fruchtbarstes Weideland wurde für weiße Kaffeepflanzer enteignet; traditionelle Wanderweidewirtschaft wurde unter Strafe gestellt.',
      todayConflict: 'Verlust von über 60% des traditionellen Stammeslandes.',
    },
  ];

  const RESISTANCE_FIGURES = [
    {
      id: 'taytu',
      name: 'Kaiserin Taytu Betul & Menelik II.',
      nation: 'Kaiserreich Äthiopien',
      year: '1896',
      event: 'Schlacht von Adwa',
      outcome: 'victory',
      outcomeLabel: 'Historischer Sieg 🟢',
      quote: '„Ich bin eine Frau. Ich liebe den Krieg nicht. Aber ich sterbe lieber, als mein Land zu unterwerfen!“',
      action: 'Zerschlug mit 100.000 Soldaten das italienische Invasionsheer; Äthiopien blieb das einzige unkolonisierte Reich.',
    },
    {
      id: 'yaa',
      name: 'Königinmutter Yaa Asantewaa',
      nation: 'Ashanti-Reich (Ghana)',
      year: '1900',
      event: 'Krieg der Goldenen Bank',
      outcome: 'resistance',
      outcomeLabel: 'Heroischer Widerstand ⚔️',
      quote: '„Wenn die Männer von Ashanti zögern, kämpfen wir Frauen bis zur Letzten!“',
      action: 'Führte 5.000 Krieger an und belagerte das britische Fort in Kumasi monatelang gegen Maschinengewehre.',
    },
    {
      id: 'samory',
      name: 'Almamy Samory Touré',
      nation: 'Wassoulou-Reich (Guinea/Mali)',
      year: '1882–1898',
      event: '16 Jahre Guerillakrieg',
      outcome: 'resistance',
      outcomeLabel: '16 Jahre Widerstand ⚔️',
      quote: '„Eher brenne ich meine Städte nieder, als sie den Franzosen zu übergeben.“',
      action: 'Befehligte 30.000 Mann mit eigener Gewehrproduktion; stoppte die französische Expansion über ein Jahrzehnt.',
    },
    {
      id: 'bell',
      name: 'König Rudolf Duala Manga Bell',
      nation: 'Duala (Kamerun)',
      year: '1914',
      event: 'Rechtlicher & politischer Widerstand',
      outcome: 'resistance',
      outcomeLabel: 'Politischer Märtyrer ⚖️',
      quote: '„Unschuldiges Blut wird an diesem Galgen vergossen. Es wird gerächt werden!“',
      action: 'Kämpfte mit Petitionen an den Deutschen Reichstag gegen Enteignung; 1914 von den Kolonialherren hingerichtet.',
    },
  ];

  const activeRes = RESOURCES[selectedResource];
  const activeMyth = MYTHS[activeMythIdx];
  const activeBorder = BORDER_CASES[activeBorderCase];

  const filteredResistance = resistanceFilter === 'all'
    ? RESISTANCE_FIGURES
    : RESISTANCE_FIGURES.filter((r) => r.outcome === resistanceFilter);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 select-none space-y-8">
      {/* Visual Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#382d22] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444] text-[10px] font-cinzel uppercase tracking-widest border border-[#ef4444]/30 font-bold">
              Kritische Analyse
            </span>
            <span className="text-xs text-[#a89680] font-serif">
              Wirtschaftliche Ausbeutung &amp; Gegenwehr
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-garamond font-normal text-[#f5ebd9] mt-1">
            Imperialismus, Rohstoffraub &amp; Widerstand
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenMap && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenMap();
              }}
              className="px-3.5 py-2 bg-[#1f160e] hover:bg-[#2e2015] text-[#f5ebd9] text-xs font-cinzel rounded border border-[#854d0e]/60 transition-all cursor-pointer flex items-center gap-1.5 shadow"
            >
              <span>🗺️</span>
              <span>Afrika-Karte ansehen</span>
            </button>
          )}
          {onOpenConferenceRoom && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenConferenceRoom();
              }}
              className="px-3.5 py-2 bg-[#120d09] hover:bg-[#1f160e] text-[#a89680] hover:text-[#edd9b9] text-xs font-serif rounded border border-[#382d22] transition-colors cursor-pointer"
            >
              ← Konferenzsaal
            </button>
          )}
        </div>
      </div>

      {/* Visual Stat Counters Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Konferenztage in Berlin', value: '104 Tage', sub: '15. Nov. 1884 – 26. Feb. 1885', icon: '🏛️' },
          { label: 'Afrikanische Vertreter', value: '0 Personen', sub: 'Vollständiger Ausschluss', icon: '🚫' },
          { label: 'Kongo-Terror Todesopfer', value: 'Bis zu 10 Mio.', sub: 'Zwangsarbeit für Kautschuk', icon: '🩸' },
          { label: 'Kolonisierter Kontinent', value: '90 % (1914)', sub: 'Vor Konferenz nur ca. 10 %', icon: '📏' },
        ].map((item, idx) => (
          <div
            key={`stat-card-${idx}`}
            className="bg-[#140e0a] border border-[#3e2c1c] p-3.5 rounded-lg flex items-center gap-3 shadow-md"
          >
            <div className="text-2xl p-2 bg-[#20150e] rounded-md border border-[#854d0e]/30">
              {item.icon}
            </div>
            <div>
              <span className="text-[10px] text-[#9c8973] uppercase font-cinzel block">
                {item.label}
              </span>
              <span className="text-base sm:text-lg font-bold font-garamond text-[#f5ebd9]">
                {item.value}
              </span>
              <span className="text-[10px] text-[#c4a46a] block font-serif">
                {item.sub}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Module Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[#2d2015]">
        {[
          { id: 'rohstoffe', label: '🩸 Rohstoff-Labor (Vorher/Nachher)', icon: '🩸' },
          { id: 'entlarver', label: '⚖️ Mythos vs. Realität', icon: '⚖️' },
          { id: 'lineal', label: '📏 Das Lineal von Berlin', icon: '📏' },
          { id: 'widerstand', label: '⚔️ Widerstandshelden', icon: '⚔️' },
          { id: 'handelsströme', label: '📊 Handelsströme & Flotten', icon: '📊' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundFx.playSubtleTick();
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-4 py-2 rounded-t-md text-xs font-cinzel whitespace-nowrap transition-all cursor-pointer border-t border-x flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#1e150e] text-[#f5ebd9] border-[#c4a46a] font-bold shadow-md'
                : 'bg-[#100b07] text-[#9c8973] hover:text-[#edd9b9] border-transparent hover:bg-[#17100b]'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* MODULE 1: ROHSTOFF-LABOR (Interactive comparison cards) */}
      {activeTab === 'rohstoffe' && (
        <div className="space-y-6">
          {/* Resource Selector Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {RESOURCES.map((res, idx) => (
              <button
                key={res.id}
                onClick={() => {
                  soundFx.playSubtleTick();
                  setSelectedResource(idx);
                }}
                className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  selectedResource === idx
                    ? 'bg-[#2a1c12] border-[#c4a46a] shadow-lg scale-102'
                    : 'bg-[#140e0a] border-[#382718] hover:border-[#854d0e] hover:bg-[#1c130b]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-2xl">{res.icon}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#100c08] text-[#c4a46a] font-mono">
                    {res.tollBadge}
                  </span>
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold font-cinzel text-[#f5ebd9]">
                    {res.name}
                  </h3>
                  <span className="text-[10px] text-[#9c8973] truncate block font-serif">
                    {res.region.split('&')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Dual-Perspective Card */}
          <div className="bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-xl p-5 sm:p-7 shadow-2xl space-y-5">
            {/* Header with Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#342416] pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeRes.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9]">
                      {activeRes.name}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#78350f] text-[#fef3c7] font-cinzel">
                      {activeRes.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#a89680] font-serif">
                    Hauptabbaugebiet: <strong className="text-[#edd9b9]">{activeRes.region}</strong>
                  </p>
                </div>
              </div>

              {/* Perspective Toggle Switcher */}
              <div className="flex items-center bg-[#0d0906] p-1 rounded-lg border border-[#3e2c1c]">
                <button
                  onClick={() => {
                    soundFx.playSubtleTick();
                    setResourcePerspective('europe');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-cinzel transition-all cursor-pointer ${
                    resourcePerspective === 'europe'
                      ? 'bg-[#2a1d13] text-[#fef08a] font-bold shadow'
                      : 'text-[#8a7965] hover:text-[#edd9b9]'
                  }`}
                >
                  🇪🇺 Nutzen in Europa
                </button>
                <button
                  onClick={() => {
                    soundFx.playSubtleTick();
                    setResourcePerspective('africa');
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-cinzel transition-all cursor-pointer ${
                    resourcePerspective === 'africa'
                      ? 'bg-[#78350f] text-[#ffffff] font-bold shadow'
                      : 'text-[#8a7965] hover:text-[#edd9b9]'
                  }`}
                >
                  🩸 Realität in Afrika
                </button>
              </div>
            </div>

            {/* Perspective Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              {/* Box 1: Selected View */}
              <div
                className={`p-5 rounded-lg border flex flex-col justify-between ${
                  resourcePerspective === 'africa'
                    ? 'bg-[#20100a] border-[#ef4444]/60'
                    : 'bg-[#191910] border-[#eab308]/60'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-cinzel font-bold text-[#fef08a]">
                      {resourcePerspective === 'africa'
                        ? '⚠️ Zwangsarbeit, Terror & Raub'
                        : '🏭 Industrieller Boom & Profit'}
                    </span>
                    <span className="text-xs">
                      {resourcePerspective === 'africa' ? '⛓️' : '⚙️'}
                    </span>
                  </div>
                  <p className="text-sm font-prose text-[#edd9b9] leading-relaxed">
                    {resourcePerspective === 'africa'
                      ? activeRes.africaReality
                      : activeRes.europeUse}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#3e2c1c]/50 mt-4">
                  <span className="text-[11px] text-[#c4a46a] font-serif block">
                    Statistischer Beleg:
                  </span>
                  <span className="text-sm font-bold font-garamond text-[#ffffff]">
                    {activeRes.stat}
                  </span>
                </div>
              </div>

              {/* Box 2: Historical Takeaway */}
              <div className="bg-[#18110b] p-5 rounded-lg border border-[#342416] flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-wider font-cinzel text-[#a89680]">
                    Historischer Hintergrund
                  </span>
                  <p className="text-xs sm:text-sm font-prose text-[#d6c7b2] leading-relaxed">
                    {activeRes.keyFact}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#342416] mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#9c8973] font-serif">
                    Opferbilanz:
                  </span>
                  <span className="text-xs font-bold font-cinzel px-2.5 py-1 rounded bg-[#3d120d] text-[#fca5a5] border border-[#ef4444]/40">
                    {activeRes.tollBadge}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: MYTHOS VS. REALITÄT (Interactive Flip Cards) */}
      {activeTab === 'entlarver' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-cinzel text-[#c4a46a]">
              Ideologiekritik
            </span>
            <h2 className="text-2xl sm:text-3xl font-garamond font-bold text-[#f5ebd9]">
              Die Mythen der Kolonialpropaganda entlarvt
            </h2>
            <p className="text-xs font-serif text-[#b8a690]">
              Wähle einen der drei ideologischen Pfeiler der Berliner Konferenz und decke die historische Realität auf.
            </p>
          </div>

          {/* Myth Select Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {MYTHS.map((myth, idx) => (
              <button
                key={myth.id}
                onClick={() => {
                  soundFx.playSubtleTick();
                  setActiveMythIdx(idx);
                  setIsFlipped(false);
                }}
                className={`p-4 rounded-lg border text-left transition-all cursor-pointer ${
                  activeMythIdx === idx
                    ? 'bg-[#24170f] border-[#c4a46a] shadow-lg'
                    : 'bg-[#120d09] border-[#382617] hover:border-[#854d0e]'
                }`}
              >
                <div className="text-xs font-cinzel font-bold text-[#f5ebd9] mb-1">
                  {idx + 1}. {myth.title.split('&')[0]}
                </div>
                <div className="text-[10px] text-[#9c8973] truncate">
                  {myth.origin}
                </div>
              </button>
            ))}
          </div>

          {/* Large Interactive Comparison Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            {/* Left: Der koloniale Mythos */}
            <div className="bg-[#1c130b] border-2 border-[#eab308]/60 p-6 rounded-xl space-y-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#382819]">
                  <span className="text-xs font-cinzel font-bold text-[#fef08a] uppercase flex items-center gap-1.5">
                    <span>📢</span>
                    <span>Europäischer Rechtfertigungs-Mythos</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#2b1f13] text-[#eab308] font-mono">
                    Propaganda
                  </span>
                </div>
                <blockquote className="mt-4 p-4 rounded bg-[#140e08] border-l-4 border-[#eab308] text-xs sm:text-sm font-serif italic text-[#edd9b9] leading-relaxed">
                  {activeMyth.mythQuote}
                </blockquote>
                <p className="mt-3 text-xs text-[#9c8973]">
                  <strong>Quelle &amp; Doktrin:</strong> {activeMyth.origin}
                </p>
              </div>

              <div className="text-[11px] text-[#baa892] pt-3 border-t border-[#2e2013]">
                💡 <em>Diente auf der Berliner Konferenz als diplomatische Fassade für Freihandel und imperialen Landraub.</em>
              </div>
            </div>

            {/* Right: Die historische Realität */}
            <div className="bg-[#1e0f0a] border-2 border-[#ef4444]/60 p-6 rounded-xl space-y-4 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#401a14]">
                  <span className="text-xs font-cinzel font-bold text-[#fca5a5] uppercase flex items-center gap-1.5">
                    <span>🔍</span>
                    <span>Historische Realität &amp; Zwang</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#450a0a] text-[#f87171] font-mono">
                    Tatsachen
                  </span>
                </div>
                <p className="mt-4 text-xs sm:text-sm font-prose text-[#e8ded0] leading-relaxed">
                  {activeMyth.realityText}
                </p>
              </div>

              <div className="bg-[#140805] p-3 rounded border border-[#ef4444]/30 space-y-1">
                <span className="text-[10px] uppercase font-cinzel text-[#ef4444] font-bold block">
                  Historischer Beleg:
                </span>
                <p className="text-xs text-[#fca5a5] font-serif">
                  {activeMyth.counterEvidence}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 3: DAS LINEAL VON BERLIN (Interactive Ruler Simulator) */}
      {activeTab === 'lineal' && (
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-[10px] uppercase tracking-widest font-cinzel text-[#c4a46a]">
              Geometrische Grenzziehung
            </span>
            <h2 className="text-2xl sm:text-3xl font-garamond font-bold text-[#f5ebd9]">
              „Das Lineal von Berlin“ – Willkür am Kartentisch
            </h2>
            <p className="text-xs font-serif text-[#b8a690]">
              Über 40 % aller afrikanischen Staatsgrenzen sind bis heute exakte geometrische Geraden. Bewege das Lineal, um zu sehen, wie reale Gesellschaften zerrissen wurden.
            </p>
          </div>

          {/* Case Selector */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {BORDER_CASES.map((bc, idx) => (
              <button
                key={bc.id}
                onClick={() => {
                  soundFx.playSubtleTick();
                  setActiveBorderCase(idx);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-cinzel cursor-pointer transition-all flex items-center gap-2 border ${
                  activeBorderCase === idx
                    ? 'bg-[#78350f] text-[#ffffff] border-[#f59e0b] font-bold shadow'
                    : 'bg-[#140e0a] text-[#9c8973] border-[#382617] hover:border-[#854d0e]'
                }`}
              >
                <span>{bc.flag}</span>
                <span>{bc.name}</span>
              </button>
            ))}
          </div>

          {/* Interactive Ruler Canvas */}
          <div className="bg-[#140e0a] border-2 border-[#854d0e]/60 rounded-xl p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#342416] pb-4">
              <div>
                <h3 className="text-lg font-bold font-garamond text-[#f5ebd9]">
                  {activeBorder.name} {activeBorder.flag}
                </h3>
                <span className="text-xs text-[#ef4444] font-cinzel font-semibold">
                  {activeBorder.cutInto}
                </span>
              </div>

              {/* Colonizers Badges */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeBorder.powers.map((pow, i) => (
                  <span
                    key={`pow-${i}`}
                    className="text-[10px] px-2 py-0.5 rounded bg-[#20150e] text-[#edd9b9] border border-[#4a3622]"
                  >
                    {pow}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Slider Bar */}
            <div className="space-y-2 bg-[#1a120c] p-4 rounded-lg border border-[#3e2c1c]">
              <div className="flex items-center justify-between text-xs font-cinzel">
                <span className="text-[#a89680]">Traditioneller Lebensraum</span>
                <span className="text-[#f59e0b] font-bold">Linealschnitt: {rulerPosition}%</span>
                <span className="text-[#ef4444]">Europäische Einflusszone</span>
              </div>

              <input
                type="range"
                min="10"
                max="90"
                value={rulerPosition}
                onChange={(e) => {
                  setRulerPosition(parseInt(e.target.value, 10));
                  soundFx.playSubtleTick();
                }}
                className="w-full h-2.5 bg-[#0f0b07] rounded-lg appearance-none cursor-pointer accent-[#ef4444]"
              />

              <div className="flex justify-between text-[10px] text-[#705e4c]">
                <span>← Ursprüngliche Weiderouten</span>
                <span>Kerzengerader Strich auf der Reichskanzlei-Wandkarte</span>
                <span>Kolonialer Stacheldraht →</span>
              </div>
            </div>

            {/* Impact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
              <div className="bg-[#20150e] p-4 rounded border border-[#854d0e]/30 space-y-1">
                <span className="font-cinzel text-[#c4a46a] font-bold block">
                  Direkte Auswirkung 1885–1914:
                </span>
                <p className="text-[#d6c7b2] font-prose">{activeBorder.impact}</p>
              </div>

              <div className="bg-[#20150e] p-4 rounded border border-[#854d0e]/30 space-y-1">
                <span className="font-cinzel text-[#fca5a5] font-bold block">
                  Langzeitfolge bis heute:
                </span>
                <p className="text-[#d6c7b2] font-prose">{activeBorder.todayConflict}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 4: WIDERSTANDSHELDEN (Visual Action Cards) */}
      {activeTab === 'widerstand' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-garamond font-bold text-[#f5ebd9]">
                Afrikanischer Widerstand &amp; Souveränität
              </h2>
              <p className="text-xs text-[#a89680] font-serif">
                Afrika ergab sich nicht kampflos. Auf dem gesamten Kontinent erhoben sich Reiche und Anführer gegen die koloniale Invasion.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-[#140e0a] p-1 rounded-lg border border-[#3e2c1c]">
              <button
                onClick={() => {
                  soundFx.playSubtleTick();
                  setResistanceFilter('all');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  resistanceFilter === 'all'
                    ? 'bg-[#2a1d13] text-[#f5ebd9] font-bold'
                    : 'text-[#8a7965]'
                }`}
              >
                Alle
              </button>
              <button
                onClick={() => {
                  soundFx.playSubtleTick();
                  setResistanceFilter('victory');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  resistanceFilter === 'victory'
                    ? 'bg-[#14532d] text-[#86efac] font-bold'
                    : 'text-[#8a7965]'
                }`}
              >
                Siege 🟢
              </button>
              <button
                onClick={() => {
                  soundFx.playSubtleTick();
                  setResistanceFilter('resistance');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel cursor-pointer ${
                  resistanceFilter === 'resistance'
                    ? 'bg-[#78350f] text-[#fde047] font-bold'
                    : 'text-[#8a7965]'
                }`}
              >
                Gegenwehr ⚔️
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResistance.map((res) => (
              <div
                key={res.id}
                className="bg-[#140e0a] border border-[#3e2c1c] hover:border-[#854d0e] p-5 rounded-xl space-y-3.5 transition-all shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-[#c4a46a] font-cinzel font-bold uppercase tracking-wider block">
                        {res.nation} · {res.year}
                      </span>
                      <h3 className="text-lg font-bold font-garamond text-[#f5ebd9]">
                        {res.name}
                      </h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded bg-[#20150e] border border-[#4a3622] text-[#fef08a] font-cinzel shrink-0">
                      {res.outcomeLabel}
                    </span>
                  </div>

                  <blockquote className="mt-3 p-3 bg-[#1e140d] border-l-2 border-[#c4a46a] text-xs font-serif italic text-[#edd9b9] leading-relaxed">
                    {res.quote}
                  </blockquote>

                  <p className="mt-3 text-xs font-prose text-[#b8a690] leading-relaxed">
                    {res.action}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#2d1e13] text-[11px] text-[#8a7965] flex items-center justify-between">
                  <span>Schlüsselschauplatz: <strong>{res.event}</strong></span>
                  <span className="text-sm">⚔️</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODULE 5: HANDELSSTRÖME & DASHBOARD */}
      {activeTab === 'handelsströme' && (
        <div className="space-y-4">
          <ImperialismTradeDashboard onOpenMap={onOpenMap} />
        </div>
      )}
    </div>
  );
};
