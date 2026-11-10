import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';

interface ImperialismSectionProps {
  onOpenMap?: () => void;
  onOpenConferenceRoom?: () => void;
}

type TabType = 'vergleich' | 'raubbau' | 'grenzen' | 'widerstand';

export const ImperialismSection: React.FC<ImperialismSectionProps> = ({
  onOpenMap,
  onOpenConferenceRoom,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('vergleich');
  const [selectedResource, setSelectedResource] = useState<number>(0);
  const [selectedBorderCase, setSelectedBorderCase] = useState<number>(0);
  const [compareYear, setCompareYear] = useState<1884 | 1914>(1884);

  const RESOURCES = [
    {
      id: 'rubber',
      name: 'Wildkautschuk',
      icon: '🩸',
      region: 'Kongo-Freistaat & Französisch-Kongo',
      tag: 'Kautschukboom nach Dunlops Reifenpatent (1888)',
      europeDemand: 'Aufstieg der Automobil-, Fahrrad- und Elektroindustrie. Gummireifen, Dichtungen für Dampfmaschinen und Telegrafenkabel-Isolierung erforderten gigantische Mengen Gummi.',
      africaReality: 'Die Force Publique (Privatarmee Leopolds II.) verhängte grausame Erntequoten: Bei Nichterfüllung wurden Frauen und Kinder als Geiseln genommen, Dörfer niedergebrannt und den Arbeitern die Hände abgehackt.',
      devastation: 'Bis zu 10 Millionen Menschen starben im Kongobecken an Zwangsarbeit, Geiselhaft, Erschöpfung und Gräueltaten. Die Bevölkerung ganzer Provinzen halbierte sich.',
      beneficiary: 'König Leopold II. erwirtschaftete hunderte Millionen Goldfranken Reingewinn für persönliche Monumentalbauten in Brüssel und Ostende.',
    },
    {
      id: 'gold-diamonds',
      name: 'Gold & Diamanten',
      icon: '💎',
      region: 'Südafrika (Kimberley & Witwatersrand)',
      tag: 'Weltgrößte Minenkonzerne (De Beers)',
      europeDemand: 'Sicherung des Goldstandards der Bank of England und Finanzierung des britischen Finanzimperiums; Luxusschmuck für die Oberschicht Europas.',
      africaReality: 'Das berüchtigte „Compound-System“: Afrikanische Minenarbeiter wurden in umzäunten, streng bewachten Lagern kaserniert, durften diese monatelang nicht verlassen und wurden vor Entlassung rektal nach Diamanten durchsucht.',
      devastation: 'Entwurzelung traditioneller Familienstrukturen, Einführung diskriminierender Passgesetze und die Vorläufer der späteren Apartheidgesetzgebung (Natives Land Act 1913).',
      beneficiary: 'Cecil Rhodes und britische Bankiers; Gründung der Kolonie Rhodesien (heute Simbabwe/Sambia) mit Privatarmeen der British South Africa Company.',
    },
    {
      id: 'palmoil',
      name: 'Palmöl & Fette',
      icon: '🌴',
      region: 'Nigerdelta (Nigeria) & Dahomey',
      tag: 'Schmiermittel der Industriellen Revolution',
      europeDemand: 'Unverzichtbares Schmiermittel für die rasant laufenden Dampfmaschinen und Webstühle in Manchester; Grundstoff für Massenseifen (Sunlight / Lever Brothers) und Kerzen.',
      africaReality: 'Britische Kriegsschiffe bombardierten afrikanische Handelsstädte (z. B. Opobo, Nembe, Benin City), zerstörten lokale Palmenhaine und entführten unbotmäßige Herrscher.',
      devastation: 'Zerschlagung blühender afrikanischer Händlerdynastien; Zwangsumstellung von Ernährungssouveränität auf exportorientierte Monokulturen.',
      beneficiary: 'Die Royal Niger Company (später Unilever) erhielt ein königliches Freibrief-Monopol und schöpfte den gesamten Flusshandel ab.',
    },
    {
      id: 'copper',
      name: 'Kupfer & Erze',
      icon: '⛏️',
      region: 'Katanga (Kongo) & Tsumeb (Namibia)',
      tag: 'Elektrifizierung des Globus',
      europeDemand: 'Millionen Kilometer Kupferleitungen für Telefonnetze, Stromnetze in europäischen Metropolen und Messinghülsen für Gewehrmunition.',
      africaReality: 'König Msiri von Garenganze (Katanga) wurde 1891 von belgischen Söldnern erschossen, als er sich weigerte, seine Minen zu übergeben. Tausende Arbeiter wurden aus Nachbarregionen zwangsrekrutiert.',
      devastation: 'Tödliche Arbeitsbedingungen unter Tage, Silikose-Erkrankungen und Ausbeutung ganzer Generationen ohne gewerkschaftliche Rechte.',
      beneficiary: 'Monopolkonzerne wie Union Minière du Haut-Katanga, die bis in die 1960er Jahre als Staat im Staate regierten.',
    },
    {
      id: 'ivory',
      name: 'Elfenbein',
      icon: '🦣',
      region: 'Ost- und Zentralafrika',
      tag: 'Viktorianischer Statusschmuck',
      europeDemand: 'Klaviertasten für das europäische Bürgertum, Billardkugeln, kunstvoll geschnitzte Besteckgriffe und Kruzifixe.',
      africaReality: 'Einheimische wurden mit Waffengewalt als Träger („Kuli“) verpflichtet, um die schweren Stoßzähne (oft über 40 kg pro Mann) hunderte Kilometer durch Dschungel und Wüste zur Küste zu schleppen.',
      devastation: 'Zehntausende Träger starben auf den Märschen an Erschöpfung, Durst oder Misshandlung; die Elefantenpopulation Afrikas brach um 75% ein.',
      beneficiary: 'Europäische Handelshäuser in Hamburg, Liverpool und Antwerpen sowie koloniale Konzessionsgesellschaften.',
    },
  ];

  const BORDER_CASES = [
    {
      id: 'massai',
      name: 'Die Zerschneidung des Massai-Volkes',
      region: 'Ostafrika (Kenia / Tansania)',
      border: 'Britisch-Ostafrika vs. Deutsch-Ostafrika',
      lineOrigin: '1886 zogen Diplomaten in London und Berlin mit dem Lineal eine gerade Linie vom Viktoriasee zum Indischen Ozean.',
      consequence: 'Ein nomadisches Hirtenvolk wurde in zwei getrennte koloniale Verwaltungssysteme gespalten. Weideland, Brunnen und Wanderrouten wurden durch bewaffnete Grenzposten abgeschnitten.',
      quote: '„Der Kilimandscharo wurde der Legende nach Königin Victorias Neffen Kaiser Wilhelm II. als Geburtstagsgeschenk überlassen — afrikanische Grenzen als familiäres Tauschobjekt.“',
    },
    {
      id: 'ewe',
      name: 'Das Ewe-Volk zwischen drei Kolonien',
      region: 'Westafrika (Ghana / Togo / Benin)',
      border: 'Britische Goldküste vs. Deutsches Togo vs. Französisches Dahomey',
      lineOrigin: 'Die Küstengrenzen wurden entlang willkürlicher Längengrade gezogen, um den deutschen Schmuggelhafen Lomé abzugrenzen.',
      consequence: 'Eine homogene Sprach- und Kulturgemeinschaft wurde auf drei verschiedene Kolonialmächte verteilt, mit englischem, deutschem und französischem Schulsystem bis heute.',
      quote: '„Unsere Familien wohnen 200 Meter voneinander entfernt, aber zwischen uns verläuft die Grenze zweier europäischer Imperien.“',
    },
    {
      id: 'somali',
      name: 'Die Fünfteilung der Somali',
      region: 'Horn von Afrika',
      border: 'Britisch-, Französisch-, Italienisch-Somaliland, Äthiopien & Kenia',
      lineOrigin: 'Europäische Seemächte schnitten die Küsten des Roten Meeres und des Indischen Ozeans in fünf unterschiedliche Kolonien auf.',
      consequence: 'Entstehung anhaltender Grenzkonflikte und Kriege im 20. Jahrhundert (Ogaden-Krieg), da clanbasierte Nomadengebiete durch starre Barrikaden blockiert wurden.',
      quote: '„Bis heute trägt die somalische Flagge einen fünfzackigen Stern — als Mahnmal für die fünf durch Kolonialmächte zerschnittenen Territorien.“',
    },
    {
      id: 'bakongo',
      name: 'Das zerstückelte Königreich Kongo',
      region: 'Zentralafrika (Kongo / Angola / Gabun)',
      border: 'Belgisch-Kongo vs. Französisch-Kongo vs. Portugiesisch-Angola',
      lineOrigin: 'Das seit dem 14. Jahrhundert existierende, hochentwickelte Königreich Kongo wurde an den Mündungen des Kongo-Flusses zerstückelt.',
      consequence: 'Zerstörung der jahrhundertealten Königstradition in Mbanza Kongo; Aufteilung des Volkes der Bakongo auf drei verschiedene Besatzungszonen.',
      quote: '„Ein Reich mit eigener Verfassung und Botschaftern in Rom wurde auf einer Berliner Konferenzkarte ausgelöscht.“',
    },
  ];

  const HEROES = [
    {
      name: 'Kaiserin Taytu Betul & Kaiser Menelik II.',
      nation: 'Kaiserreich Äthiopien',
      achievement: 'Vernichtender Sieg bei Adwa (1896)',
      quote: '„Ich bin eine Frau. Ich liebe den Krieg nicht. Aber ich sterbe lieber als stolze Äthiopierin, als mein Land der Schande der Kolonialisierung zu unterwerfen!“',
      history: 'Italien versuchte durch den gefälschten Vertrag von Wuchale (1889), Äthiopien zu einem Protektorat zu erklären. Kaiserin Taytu Betul entlarvte den Betrug. Menelik II. mobilisierte 100.000 Krieger, ausgerüstet mit modernen Gewehren. Am 1. März 1896 zerschlug das äthiopische Heer die italienische Invasionsarmee bei Adwa. Äthiopien blieb frei!',
      impact: 'Italien musste die vollständige Souveränität Äthiopiens bedingungslos anerkennen.',
    },
    {
      name: 'Königinmutter Yaa Asantewaa',
      nation: 'Ashanti-Reich (Ghana)',
      achievement: 'Krieg der Goldenen Bank (1900)',
      quote: '„Wenn die Männer von Ashanti feige sind, werden wir Frauen kämpfen! Wir weichen keinen Schritt zurück!“',
      history: 'Als der britische Gouverneur verlangte, auf dem heiligen goldenen Thron der Ashanti Platz zu nehmen, übernahm die 60-jährige Yaa Asantewaa den Oberbefehl über 5.000 Krieger und belagerte das britische Fort in Kumasi monatelang.',
      impact: 'Die Briten konnten die Goldene Bank niemals erbeuten — sie bleibt bis heute das unantastbare Symbol der Ashanti-Würde.',
    },
    {
      name: 'Almamy Samori Touré',
      nation: 'Wassoulou-Reich (Guinea / Mali)',
      achievement: '16 Jahre Widerstand gegen Frankreich (1882–1898)',
      quote: '„Eher brenne ich meine eigenen Festungen nieder, als dass die Franzosen sie mit ihren Kanonen einnehmen.“',
      history: 'Samori Touré baute ein modernes Heer mit eigener Gewehrproduktion auf. Mit brillanter Taktik fügte er den französischen Kolonialtruppen über anderthalb Jahrzehnte schwere Niederlagen zu.',
      impact: 'Frankreich benötigte über 16 Jahre und zehntausende Soldaten, um die Sahelzone zu unterwerfen.',
    },
    {
      name: 'Kaptein Hendrik Witbooi',
      nation: 'Nama-Volk (Namibia)',
      achievement: 'Freiheitskämpfer & Philosoph gegen das Deutsche Reich',
      quote: '„Der Herr hat jedem Volk sein eigenes Land gegeben. Sie sagen, Sie wollen mich beschützen? Vor wem? Ich habe keinen Feind, den ich nicht selbst abwehren könnte.“',
      history: 'Witbooi führte diplomatischen und militärischen Widerstand gegen die deutsche Kolonialmacht. Seine Briefe an die Gouverneure sind Meisterwerke afrikanischer politischer Philosophie und UNESCO-Weltdokumentenerbe.',
      impact: 'Symbolfigur des namibischen Freiheitskampfes; sein Porträt ziert die namibischen Banknoten.',
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 select-none space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#3e2c1c] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#ef4444]/15 text-[#ef4444] text-[10.5px] font-cinzel uppercase tracking-[0.25em] font-bold border border-[#ef4444]/30">
              Dokumentation &amp; Analyse
            </span>
            <span className="text-xs text-[#a89680] font-serif">
              Wirtschaftliche Ausplünderung, Willkürgrenzen &amp; Gegenwehr
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-garamond font-normal text-[#f5ebd9] mt-1.5 tracking-tight">
            Imperialismus, Raubbau &amp; Gegenwehr
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {onOpenMap && (
            <button
              onClick={() => {
                soundFx.playSubtleTick();
                onOpenMap();
              }}
              className="px-4 py-2 bg-[#192433] hover:bg-[#233349] text-[#93c5fd] text-xs font-cinzel rounded border border-[#3b82f6]/40 transition-all cursor-pointer flex items-center gap-1.5 shadow"
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
              className="px-4 py-2 bg-[#17110b] hover:bg-[#251d16] text-[#dfd2be] text-xs font-cinzel rounded border border-[#c4a46a]/40 transition-colors cursor-pointer"
            >
              ← Zum Konferenzsaal
            </button>
          )}
        </div>
      </div>

      {/* 4 Clean Main Feature Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {[
          { id: 'vergleich' as TabType, num: '01', title: 'Der 30-Jahre-Raubzug', sub: '1884 vs. 1914 Scramble', icon: '⚖️' },
          { id: 'raubbau' as TabType, num: '02', title: '5 Säulen des Raubbaus', sub: 'Kautschuk, Gold, Kupfer & Co.', icon: '🩸' },
          { id: 'grenzen' as TabType, num: '03', title: 'Das Lineal von Berlin', sub: 'Künstliche Grenzziehungen', icon: '📏' },
          { id: 'widerstand' as TabType, num: '04', title: 'Afrikanische Souveräne', sub: 'Adwa & Freiheitskämpfe', icon: '⚔️' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`main-tab-${tab.id}`}
              onClick={() => {
                soundFx.playSubtleTick();
                setActiveTab(tab.id);
              }}
              className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer relative overflow-hidden ${
                isActive
                  ? 'bg-[#22160d] border-[#c4a46a] shadow-[0_0_20px_rgba(196,164,106,0.25)]'
                  : 'bg-[#120d09] border-[#382819] hover:border-[#6b4e31] hover:bg-[#18110b]'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[10px] font-cinzel font-bold tracking-widest ${isActive ? 'text-[#c4a46a]' : 'text-[#8c7b68]'}`}>
                  TEIL {tab.num}
                </span>
                <span className="text-lg">{tab.icon}</span>
              </div>
              <h3 className={`text-sm font-cinzel font-bold mb-0.5 ${isActive ? 'text-[#f5ebd9]' : 'text-[#ded1be]'}`}>
                {tab.title}
              </h3>
              <p className="text-[11px] font-serif text-[#a89680]">
                {tab.sub}
              </p>
              {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c4a46a]" />}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <AnimatePresence mode="wait">
        {/* ============================================================== */}
        {/* TAB 1: DER 30-JAHRE-RAUBZUG (1884 vs 1914)                     */}
        {/* ============================================================== */}
        {activeTab === 'vergleich' && (
          <motion.div
            key="tab-vergleich"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Year Switcher Banner */}
            <div className="p-6 bg-[#160f0a] border-2 border-[#c4a46a]/40 rounded-xl space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3d2c1e] pb-4">
                <div>
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#c4a46a] font-bold block">
                    Interaktiver Epochen-Vergleich
                  </span>
                  <h2 className="text-2xl font-cinzel font-bold text-[#f5ebd9]">
                    Die Geschwindigkeit der Kolonisierung
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 bg-[#0f0b07] p-1 rounded-lg border border-[#3e2c1c]">
                  <button
                    onClick={() => {
                      soundFx.playSubtleTick();
                      setCompareYear(1884);
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-cinzel font-bold transition-all cursor-pointer ${
                      compareYear === 1884
                        ? 'bg-[#c4a46a] text-[#120e0b] shadow'
                        : 'text-[#8c7b68] hover:text-[#edd9b9]'
                    }`}
                  >
                    1884 (Vorabend der Konferenz)
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playSubtleTick();
                      setCompareYear(1914);
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-cinzel font-bold transition-all cursor-pointer ${
                      compareYear === 1914
                        ? 'bg-[#ef4444] text-[#fff] shadow'
                        : 'text-[#8c7b68] hover:text-[#edd9b9]'
                    }`}
                  >
                    1914 (Ausbruch 1. Weltkrieg)
                  </button>
                </div>
              </div>

              {/* Data Card for Chosen Year */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-[#1e140d] rounded-lg border border-[#3e2c1c] text-center">
                  <span className="text-[10.5px] uppercase font-cinzel tracking-wider text-[#a89680] block">
                    Europäische Kontrolle
                  </span>
                  <div className={`text-3xl font-bold font-garamond my-1 ${compareYear === 1884 ? 'text-[#c4a46a]' : 'text-[#ef4444]'}`}>
                    {compareYear === 1884 ? '~10 % der Fläche' : '~90 % der Fläche'}
                  </div>
                  <p className="text-[11px] font-prose text-[#d4c3ae]">
                    {compareYear === 1884
                      ? 'Hauptsächlich Küstenhandelsstationen, Enklaven und alte Handelsrouten.'
                      : 'Nahezu der gesamte Kontinent aufgeteilt und militärisch besetzt.'}
                  </p>
                </div>

                <div className="p-4 bg-[#1e140d] rounded-lg border border-[#3e2c1c] text-center">
                  <span className="text-[10.5px] uppercase font-cinzel tracking-wider text-[#a89680] block">
                    Freie afrikanische Staaten
                  </span>
                  <div className={`text-3xl font-bold font-garamond my-1 ${compareYear === 1884 ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                    {compareYear === 1884 ? 'Hunderte Königreiche' : 'Nur 2 Staaten'}
                  </div>
                  <p className="text-[11px] font-prose text-[#d4c3ae]">
                    {compareYear === 1884
                      ? 'Sokoto, Ashanti, Kongo, Buganda, Zulu, Äthiopien und viele weitere souverän.'
                      : 'Nur Äthiopien (Sieg bei Adwa 1896) und Liberia blieben formell unabhängig.'}
                  </p>
                </div>

                <div className="p-4 bg-[#1e140d] rounded-lg border border-[#3e2c1c] text-center">
                  <span className="text-[10.5px] uppercase font-cinzel tracking-wider text-[#a89680] block">
                    Die treibende Kraft
                  </span>
                  <div className="text-xl font-bold font-cinzel my-1 text-[#f5ebd9]">
                    {compareYear === 1884 ? 'Die Berliner Konferenz' : 'Maxim-Maschinengewehre'}
                  </div>
                  <p className="text-[11px] font-prose text-[#d4c3ae]">
                    {compareYear === 1884
                      ? 'Das Prinzip der „effektiven Okkupation“ erzwang die sofortige militärische Besetzung.'
                      : 'Industrielle Waffengewalt brach traditionelle Heere in wenigen Jahrzehnten.'}
                  </p>
                </div>
              </div>

              {/* Side-by-Side: Propaganda vs. Realität */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#191e17] border border-[#10b981]/30 rounded-lg space-y-2">
                  <span className="text-xs font-cinzel font-bold text-[#6ee7b7] flex items-center gap-1.5 uppercase tracking-wider">
                    <span>🕊️</span> Die europäische Propaganda
                  </span>
                  <p className="text-xs font-prose text-[#d1e7dd] leading-relaxed">
                    Bismarck und die Diplomaten behaupteten, man wolle Afrika „die Segnungen der christlichen Zivilisation bringen“,
                    den arabischen Sklavenhandel stoppen und wissenschaftliche Forschung sowie Freihandel fördern.
                  </p>
                </div>

                <div className="p-4 bg-[#23120c] border border-[#ef4444]/40 rounded-lg space-y-2">
                  <span className="text-xs font-cinzel font-bold text-[#fca5a5] flex items-center gap-1.5 uppercase tracking-wider">
                    <span>🩸</span> Die brutale koloniale Realität
                  </span>
                  <p className="text-xs font-prose text-[#f8d7da] leading-relaxed">
                    Einführung von Kopfsteuern, um Zwangsarbeit zu erzwingen; Zerstörung lokaler Landwirtschaft zugunsten von Monokulturen;
                    Massenverstümmelungen im Kongo; Völkermord an den Herero und Nama in Deutsch-Südwestafrika.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: DIE 5 SÄULEN DES RAUBBAUS                               */}
        {/* ============================================================== */}
        {activeTab === 'raubbau' && (
          <motion.div
            key="tab-raubbau"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            {/* Resource Selector Bar */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {RESOURCES.map((res, idx) => (
                <button
                  key={`res-btn-${res.id}`}
                  onClick={() => {
                    soundFx.playSubtleTick();
                    setSelectedResource(idx);
                  }}
                  className={`px-3.5 py-2 rounded-lg text-xs font-cinzel transition-all cursor-pointer border flex items-center gap-1.5 ${
                    selectedResource === idx
                      ? 'bg-[#c4a46a] text-[#120e0b] border-[#f5ebd9] font-bold shadow-md'
                      : 'bg-[#150f0a] text-[#a89680] hover:text-[#fff] border-[#382819]'
                  }`}
                >
                  <span>{res.icon}</span>
                  <span>{res.name}</span>
                </button>
              ))}
            </div>

            {/* Selected Resource Showcase Card */}
            {(() => {
              const res = RESOURCES[selectedResource];
              return (
                <div className="p-6 bg-[#160f0a] border-2 border-[#c4a46a]/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3d2c1e] pb-3">
                    <div>
                      <span className="text-[10.5px] font-cinzel uppercase tracking-widest text-[#f59e0b] font-bold block">
                        {res.region}
                      </span>
                      <h2 className="text-2xl font-cinzel font-bold text-[#f5ebd9] flex items-center gap-2">
                        <span>{res.icon}</span>
                        <span>{res.name}</span>
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#2a1d13] text-[#c4a46a] border border-[#c4a46a]/30 text-xs font-cinzel font-bold self-start sm:self-auto">
                      {res.tag}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-prose">
                    <div className="p-4 bg-[#1d140d] rounded-lg border border-[#3e2c1c] space-y-1.5">
                      <strong className="text-[#60a5fa] block font-cinzel text-[11px]">
                        🏭 Der Heißhunger der europäischen Industrie:
                      </strong>
                      <p className="text-[#d4c3ae] leading-relaxed">{res.europeDemand}</p>
                    </div>

                    <div className="p-4 bg-[#23120c] rounded-lg border border-[#ef4444]/30 space-y-1.5">
                      <strong className="text-[#f87171] block font-cinzel text-[11px]">
                        ⛓️ Die Realität vor Ort in Afrika:
                      </strong>
                      <p className="text-[#fca5a5] leading-relaxed">{res.africaReality}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-prose pt-1">
                    <div className="p-3.5 bg-[#17100b] rounded-lg border border-[#3e2c1c]">
                      <strong className="text-[#ef4444] block font-cinzel text-[10.5px] mb-1">
                        💀 Menschliche &amp; ökologische Zerstörung:
                      </strong>
                      <p className="text-[#d1c2af] leading-relaxed">{res.devastation}</p>
                    </div>

                    <div className="p-3.5 bg-[#17100b] rounded-lg border border-[#3e2c1c]">
                      <strong className="text-[#c4a46a] block font-cinzel text-[10.5px] mb-1">
                        💰 Wer profitierte?:
                      </strong>
                      <p className="text-[#d1c2af] leading-relaxed">{res.beneficiary}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: DAS LINEAL VON BERLIN (GRENZZIEHUNGEN)                   */}
        {/* ============================================================== */}
        {activeTab === 'grenzen' && (
          <motion.div
            key="tab-grenzen"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <div className="p-4 bg-[#1a120b] border border-[#c4a46a]/30 rounded-lg text-xs font-prose text-[#d4c3ae] leading-relaxed text-center max-w-3xl mx-auto">
              Europäische Diplomaten zeichneten mit Lineal und Zirkel schnurgerade Grenzen entlang von Längen- und Breitengraden.
              Insgesamt wurden <strong>177 ethnische und sprachliche Gemeinschaften</strong> gewaltsam auseinandergerissen.
            </div>

            {/* Case Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {BORDER_CASES.map((bc, idx) => (
                <button
                  key={`bc-${bc.id}`}
                  onClick={() => {
                    soundFx.playSubtleTick();
                    setSelectedBorderCase(idx);
                  }}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                    selectedBorderCase === idx
                      ? 'bg-[#2a1d13] border-[#c4a46a] text-[#f5ebd9] shadow'
                      : 'bg-[#140e09] border-[#382819] text-[#a89680] hover:text-[#fff]'
                  }`}
                >
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#c4a46a] block mb-0.5">
                    Fallbeispiel 0{idx + 1}
                  </span>
                  <h4 className="text-xs font-cinzel font-bold text-[#f5ebd9]">{bc.name}</h4>
                  <span className="text-[10.5px] font-serif text-[#8c7b68] block mt-0.5">{bc.region}</span>
                </button>
              ))}
            </div>

            {/* Case Detail Card */}
            {(() => {
              const bc = BORDER_CASES[selectedBorderCase];
              return (
                <div className="p-6 bg-[#160f0a] border-2 border-[#c4a46a]/50 rounded-xl space-y-4 shadow-xl">
                  <div className="border-b border-[#3d2c1e] pb-3">
                    <span className="text-[10.5px] font-cinzel uppercase tracking-widest text-[#f59e0b] font-bold block">
                      {bc.region}
                    </span>
                    <h3 className="text-xl font-cinzel font-bold text-[#f5ebd9]">{bc.name}</h3>
                    <span className="text-xs font-serif text-[#c4a46a]">Konfliktlinie: {bc.border}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-prose">
                    <div className="p-4 bg-[#1d140d] rounded-lg border border-[#3e2c1c] space-y-1.5">
                      <strong className="text-[#c4a46a] block font-cinzel text-[11px]">
                        📏 Wie die Grenze gezogen wurde:
                      </strong>
                      <p className="text-[#d4c3ae] leading-relaxed">{bc.lineOrigin}</p>
                    </div>

                    <div className="p-4 bg-[#23120c] rounded-lg border border-[#ef4444]/30 space-y-1.5">
                      <strong className="text-[#f87171] block font-cinzel text-[11px]">
                        💥 Die historische &amp; heutige Folge:
                      </strong>
                      <p className="text-[#fca5a5] leading-relaxed">{bc.consequence}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-[#1e150d] rounded-lg border-l-4 border-[#f59e0b] text-xs font-serif italic text-[#edd9b9]">
                    {bc.quote}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: AFRIKANISCHE SOUVERÄNE (WIDERSTAND)                     */}
        {/* ============================================================== */}
        {activeTab === 'widerstand' && (
          <motion.div
            key="tab-widerstand"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HEROES.map((h, idx) => (
                <div key={`hero-card-${idx}`} className="p-5 bg-[#150f0a] border border-[#3e2c1c] rounded-xl space-y-3 hover:border-[#c4a46a]/60 transition-all">
                  <div className="flex items-center justify-between border-b border-[#382819] pb-2">
                    <div>
                      <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#f59e0b] font-bold block">
                        {h.nation}
                      </span>
                      <h3 className="text-base font-cinzel font-bold text-[#f5ebd9]">{h.name}</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-[#10b981]/20 text-[#6ee7b7] text-[10px] font-cinzel font-bold border border-[#10b981]/30">
                      {h.achievement}
                    </span>
                  </div>

                  <div className="p-3 bg-[#1c130b] rounded border-l-2 border-[#f59e0b] text-xs font-serif italic text-[#f0e3d0] leading-relaxed">
                    {h.quote}
                  </div>

                  <p className="text-xs font-prose text-[#d1c2af] leading-relaxed">
                    {h.history}
                  </p>

                  <div className="text-[11px] font-prose text-[#10b981]">
                    <strong>Ergebnis:</strong> {h.impact}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
