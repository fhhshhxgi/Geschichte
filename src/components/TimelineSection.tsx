import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundFx } from '../utils/soundEffects';
import { CountryFlag } from './CountryFlag';

type ArchiveTab = 'zeitleiste' | 'generalakte' | 'maechte' | 'zitate';

export const TimelineSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ArchiveTab>('zeitleiste');
  const [activeMilestoneIdx, setActiveMilestoneIdx] = useState<number>(2); // Default to Nov 1884 (Opening)
  const [selectedPowerIdx, setSelectedPowerIdx] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const MILESTONES = [
    {
      date: '12. September 1876',
      year: '1876',
      title: 'Geographische Konferenz zu Brüssel',
      category: 'Vorgeschichte',
      icon: '👑',
      tag: 'Leopolds imperialer Schachzug',
      summary: 'König Leopold II. von Belgien lädt Geographen und Entdecker nach Brüssel ein und gründet die „Association Internationale Africaine“ unter dem Deckmantel von Wissenschaft und Philanthropie.',
      actors: 'König Leopold II., europäische Geographen & Entdecker',
      impact: 'Schuf die Tarnorganisation, mit der Leopold später das 2,3 Millionen km² große Kongobecken als sein persönliches Privateigentum beanspruchte.',
    },
    {
      date: '26. Februar 1884',
      year: '1884',
      title: 'Britisch-portugiesischer Geheimvertrag',
      category: 'Auslöser',
      icon: '⚡',
      tag: 'Der Zündfunke der Krise',
      summary: 'Großbritannien und Portugal schließen ein bilaterales Abkommen: London erkennt Portugals Oberhoheit über die Kongomündung an, Portugal garantiert britischen Händlern Vorzugsrechte.',
      actors: 'Großbritannien (Lord Granville) & Portugal (Marquês de Penafiel)',
      impact: 'Löste den wütenden Protest Bismarcks und Frankreichs aus. Um einen Krieg abzuwenden, schlug Frankreichs Botschafter Courcel eine internationale Konferenz in Berlin vor.',
    },
    {
      date: '15. November 1884',
      year: '1884',
      title: 'Eröffnung in der Berliner Reichskanzlei',
      category: 'Konferenz',
      icon: '🏛️',
      tag: 'Tag 1 der Berliner Konferenz',
      summary: 'Reichskanzler Otto von Bismarck eröffnet im Festsaal des Palais Radziwill (Wilhelmstraße 77) die Konferenz vor den Delegierten von 14 Staaten unter einer monumentalen Afrika-Wandkarte.',
      actors: 'Otto von Bismarck, 14 europäische Gesandte & US-Botschafter Kasson',
      impact: 'Beginn der 104 Verhandlungstage, an denen ohne einen einzigen afrikanischen Vertreter die völkerrechtlichen Spielregeln der Aufteilung verhandelt wurden.',
    },
    {
      date: 'Dezember 1884',
      year: '1884',
      title: 'Schifffahrts- und Freihandelsabkommen',
      category: 'Konferenz',
      icon: '🚢',
      tag: 'Freihandelszone Kongobecken',
      summary: 'Die Konferenzmächte einigen sich darauf, das gesamte Kongobecken zur zollfreien Handelszone zu erklären. Schiffe aller Signatarstaaten erhalten freie Fahrt auf Kongo und Niger.',
      actors: 'Alphonse de Courcel (Frankreich), Sir Edward Malet (Großbritannien)',
      impact: 'Öffnete das Innere Afrikas für die ungehinderte Rohstoffplünderung europäischer Handelsgesellschaften ohne Zölle oder Schutzbestimmungen für Einheimische.',
    },
    {
      date: 'Januar 1885',
      year: '1885',
      title: 'Hinterzimmer-Anerkennung des Kongo-Staats',
      category: 'Konferenz',
      icon: '🤝',
      tag: 'Geburt des Kongo-Freistaats',
      summary: 'In geheimen bilateralen Verhandlungen am Rande der Konferenz erkennen die europäischen Mächte nach den USA die blaue Flagge mit dem goldenen Stern von Leopolds AIC als souveränen Staat an.',
      actors: 'Baron Auguste Lambermont (Belgien), Henry S. Sanford (USA)',
      impact: 'Völkerrechtliche Legitimation eines privaten Terrorregimes. Leopold II. wurde Alleinherrscher über 20 Millionen Menschen ohne jede parlamentarische Kontrolle.',
    },
    {
      date: '26. Februar 1885',
      year: '1885',
      title: 'Unterzeichnung der Generalakte von Berlin',
      category: 'Beschluss',
      icon: '📜',
      tag: 'Das völkerrechtliche Abschlussdokument',
      summary: 'Die Gesandten aller 14 Staaten unterzeichnen die aus 38 Artikeln bestehende Generalakte. Kernstück sind die Artikel 34 und 35: Das Prinzip der „effektiven Okkupation“.',
      actors: 'Alle 14 Signatarstaaten',
      impact: 'Wer ein afrikanisches Gebiet beanspruchen wollte, musste es fortan militärisch und administrativ besetzen. Dies löste den rasanten militärischen Eroberungssturm bis 1914 aus.',
    },
    {
      date: 'September 1898',
      year: '1898',
      title: 'Die Faschoda-Krise am Nil',
      category: 'Folgen',
      icon: '💥',
      tag: 'Fast-Krieg Frankreich vs. Großbritannien',
      summary: 'Am Nil im heutigen Südsudan treffen die britische Streitmacht unter General Kitchener und eine französische Expedition unter Major Marchand aufeinander.',
      actors: 'Großbritannien (Kitchener) vs. Frankreich (Marchand)',
      impact: 'Frankreich musste zurückweichen. Zeigte, wie die imperialen Grenzziehungen fast zum gesamteuropäischen Weltkrieg geführt hätten.',
    },
    {
      date: '1904–1908',
      year: '1904',
      title: 'Völkermord an Herero und Nama',
      category: 'Folgen',
      icon: '💀',
      tag: 'Erster Völkermord des 20. Jahrhunderts',
      summary: 'Nach dem Aufstand gegen Landraub und Misshandlung in Deutsch-Südwestafrika erließ Generalleutnant Lothar von Trotha den Vernichtungsbefehl gegen die Völker der Herero und Nama.',
      actors: 'Kaiserliche Schutztruppe, General von Trotha, Samuel Maharero, Hendrik Witbooi',
      impact: 'Bis zu 80% des Herero-Volkes und 50% der Nama wurden durch Verdursten in der Wüste und Konzentrationslager ermordet.',
    },
  ];

  const GENERAL_ACT_ARTICLES = [
    {
      number: 'Kapitel I (Art. 1–5)',
      title: 'Freihandel im Kongobecken',
      icon: '💰',
      headline: 'Freier Marktzugang für europäische Firmen',
      reality: 'Das gesamte zentrale Afrika wurde zur zollfreien Ausbeutungszone erklärt. Weder afrikanische Händler durften Zölle erheben, noch konnten sie ihre heimischen Märkte schützen. Europäische Handelsmonopole saugten Rohstoffe steuerfrei ab.',
    },
    {
      number: 'Kapitel II (Art. 6)',
      title: '„Schutz der Eingeborenen“ & Religion',
      icon: '🕊️',
      headline: 'Die scheinheilige Humanitätsklausel',
      reality: 'Die Mächte verpflichteten sich auf dem Papier, „die Erhaltung der eingeborenen Völkerschaften zu überwachen“ und christliche Missionare zu schützen. In der Praxis diente dies als moralische Rechtfertigung, bewaffnete Expeditionen tief ins Landesinnere zu schicken.',
    },
    {
      number: 'Kapitel III (Art. 9)',
      title: 'Verbot des Sklavenhandels',
      icon: '⛓️',
      headline: 'Moralischer Vorwand für Militärinterventionen',
      reality: 'Das Verbot des arabisch-ostafrikanischen Sklavenhandels wurde beschlossen. Europäische Mächte nutzten diesen Artikel als Legitimation, bestehende afrikanische Sultanate und Reiche mit Kriegsschiffen und Truppen militärisch zu stürmen.',
    },
    {
      number: 'Kapitel IV & V (Art. 13–25)',
      title: 'Schifffahrtsakte für Kongo & Niger',
      icon: '🚢',
      headline: 'Strategische Kontrolle der Wasserstraßen',
      reality: 'Freie Schifffahrt für alle Handelsschiffe auf den beiden Hauptadern Afrikas. Großbritannien sicherte sich die alleinige Aufsicht über den unteren Niger, während König Leopold das Kongobecken dominierte.',
    },
    {
      number: 'Kapitel VI (Art. 34–35)',
      title: 'Das Prinzip der „Effektiven Okkupation“',
      icon: '⚔️',
      headline: 'Der verhängnisvollste Artikel der Konferenz',
      reality: 'Wer einen Küstenstrich für sich beanspruchte, musste die anderen Mächte benachrichtigen UND eine reale militärische sowie administrative Kontrolle vor Ort errichten. Dieser Artikel war der Startschuss für die sofortige blutige Unterwerfung des afrikanischen Binnenlandes.',
    },
  ];

  const SIGNATORY_POWERS = [
    {
      id: 'de',
      country: 'Deutsches Reich',
      flagId: 'germany',
      delegate: 'Otto von Bismarck',
      gain: 'Kamerun, Togo, Deutsch-Südwestafrika, Deutsch-Ostafrika (~2,6 Mio. km²)',
      interest: 'Etablierung als Kolonialgroßmacht, Ablenkung Frankreichs von Revanche.',
    },
    {
      id: 'gb',
      country: 'Großbritannien',
      flagId: 'britain',
      delegate: 'Sir Edward Malet',
      gain: 'Nigeria, Goldküste, Ägypten, Kenia, Uganda, Rhodesien, Südafrika (Kap-Kairo-Linie)',
      interest: 'Sicherung der lukrativsten Flusshandelswege und Seewege nach Indien.',
    },
    {
      id: 'fr',
      country: 'Frankreich',
      flagId: 'france',
      delegate: 'Baron Alphonse de Courcel',
      gain: 'Französisch-Westafrika, Französisch-Äquatorialafrika, Madagaskar (~11 Mio. km²)',
      interest: 'Wiederherstellung des imperialen Prestiges nach 1871; Vorkaufsrecht am Kongo.',
    },
    {
      id: 'be',
      country: 'Belgien / König Leopold II.',
      flagId: 'belgium',
      delegate: 'Baron Auguste Lambermont',
      gain: 'Kongo-Freistaat (2,34 Mio. km² als persönliches Privateigentum des Königs)',
      interest: 'Monopol auf Kautschuk und Elfenbein unter dem Deckmantel von Philanthropie.',
    },
    {
      id: 'pt',
      country: 'Portugal',
      flagId: 'portugal',
      delegate: 'Marquês de Penafiel',
      gain: 'Angola, Mosambik, Cabinda, Portugiesisch-Guinea',
      interest: 'Verteidigung historischer Ansprüche aus dem 15. Jahrhundert gegen britische Hegemonie.',
    },
    {
      id: 'it',
      country: 'Italien',
      flagId: 'italien',
      delegate: 'Graf Edoardo de Launay',
      gain: 'Eritrea, Italienisch-Somaliland (später Versuch in Äthiopien -> Niederlage bei Adwa)',
      interest: 'Prestigekolonialismus eines jungen Nationalstaats zur Großmachtdemonstration.',
    },
    {
      id: 'es',
      country: 'Spanien',
      flagId: 'spain',
      delegate: 'Francisco Merry y Colom',
      gain: 'Spanisch-Guinea (Río Muni), Spanisch-Sahara',
      interest: 'Absicherung verbliebener westafrikanischer Enklaven und Inseln.',
    },
    {
      id: 'us',
      country: 'USA',
      flagId: 'usa',
      delegate: 'John A. Kasson',
      gain: 'Erste Großmacht, die Leopolds Kongo völkerrechtlich anerkannte; Freihandelszugang',
      interest: 'Meistbegünstigung für US-Kaufleute ohne direkte koloniale Territorialverwaltung.',
    },
  ];

  const HISTORICAL_QUOTES = [
    {
      id: 'q1',
      author: 'Otto von Bismarck',
      role: 'Reichskanzler des Deutschen Reiches',
      date: '15. November 1884 (Eröffnungsrede)',
      text: '„Alle Regierungen, die hier vertreten sind, teilen den Wunsch, die Eingeborenen Afrikas an die Zivilisation heranzuführen, indem sie das Innere dieses Kontinents dem Handel öffnen.“',
      context: 'Bismarck nutzte humanitäre Rhetorik, um die imperialen Expansionspläne der Großmächte vor der Weltöffentlichkeit zu adeln.',
    },
    {
      id: 'q2',
      author: 'König Leopold II.',
      role: 'König der Belgier & Alleinherrscher des Kongo-Freistaats',
      date: '1876 (Vorabend der Konferenz)',
      text: '„Dem einzigen Teil unseres Erdballs, in den die Zivilisation noch nicht eingedrungen ist, den Schleier zu lüften, ist ein Kreuzzug, der unseres Jahrhunderts des Fortschritts würdig ist.“',
      context: 'Hinter dieser frommen Fassade verbarg sich die skrupelloseste privatwirtschaftliche Ausbeutungsmaschinerie der Weltgeschichte.',
    },
    {
      id: 'q3',
      author: 'Cecil Rhodes',
      role: 'Premierminister der Kapkolonie & Gründer von De Beers',
      date: '1877',
      text: '„Ich behaupte, dass wir die erste Rasse in der Welt sind und dass es für die Menschheit umso besser ist, je mehr von der Welt wir bewohnen. Ich würde die Planeten annektieren, wenn ich könnte.“',
      context: 'Exemplarisches Zeugnis des rassistischen Größenwahns des britischen Hochimperialismus.',
    },
    {
      id: 'q4',
      author: 'Kaptein Hendrik Witbooi',
      role: 'Führer der Nama in Namibia',
      date: '1894 (Brief an Curt von François)',
      text: '„Gott hat verschiedene Königreiche in der Welt erschaffen... Jedes Volk hat seinen eigenen Herrn. Sie sagen, Sie wollen mich beschützen? Vor wem? Ich habe keinen Feind, den ich nicht selbst abwehren könnte.“',
      context: 'Philosophische Entlarvung des kolonialen „Schutzvertrags“-Konzepts als getarnte Unterwerfung.',
    },
  ];

  const handleCopy = (id: string, text: string) => {
    soundFx.playSubtleTick();
    navigator.clipboard?.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 select-none space-y-8">
      {/* Top Banner Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2.5 border-b border-[#3e2c1c] pb-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#c4a46a]/15 border border-[#c4a46a]/30 text-[#c4a46a] text-[10.5px] font-cinzel uppercase tracking-[0.25em] font-bold">
          <span>🏛️</span>
          <span>Archivbestand der Reichskanzlei · Wilhelmstraße 77</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-garamond font-normal text-[#f5ebd9] tracking-tight">
          Diplomatisches Dossier &amp; Zeitleiste
        </h1>
        <p className="text-sm font-prose text-[#b8a58d] max-w-2xl mx-auto leading-relaxed">
          Die 104 Verhandlungstage in Berlin, die 38 Artikel der völkerrechtlichen Generalakte und die verhängnisvolle Dynamik bis 1914.
        </p>

        {/* 4 Clean Top Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
          {[
            { id: 'zeitleiste' as ArchiveTab, label: '⚡ Chronologie (1876–1914)', icon: '⚡' },
            { id: 'generalakte' as ArchiveTab, label: '📜 Die Generalakte im Klartext', icon: '📜' },
            { id: 'maechte' as ArchiveTab, label: '🏛️ Das Signatar-Register', icon: '🏛️' },
            { id: 'zitate' as ArchiveTab, label: '📚 Primärquellen & Zitate', icon: '📚' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={`dossier-tab-${tab.id}`}
                onClick={() => {
                  soundFx.playSubtleTick();
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-cinzel tracking-wider transition-all cursor-pointer border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#c4a46a] text-[#120e0b] border-[#e8d5b5] font-bold shadow-lg'
                    : 'bg-[#150f0a] text-[#a89680] hover:text-[#edd9b9] border-[#382819] hover:bg-[#1f160e]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Areas */}
      <AnimatePresence mode="wait">
        {/* ============================================================== */}
        {/* TAB 1: INTERAKTIVE ZEITLEISTE MIT MILESTONE SCRUBBER           */}
        {/* ============================================================== */}
        {activeTab === 'zeitleiste' && (
          <motion.div
            key="tab-zeitleiste"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-6"
          >
            {/* Interactive Milestone Scrubber Track */}
            <div className="bg-[#140e09] border border-[#3e2c1c] p-4 rounded-xl space-y-3">
              <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#c4a46a] font-bold block text-center">
                Wähle einen historischen Schlüsselmoment (1876–1914):
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
                {MILESTONES.map((m, idx) => {
                  const isCurrent = activeMilestoneIdx === idx;
                  return (
                    <button
                      key={`mile-btn-${idx}`}
                      onClick={() => {
                        soundFx.playSubtleTick();
                        setActiveMilestoneIdx(idx);
                      }}
                      className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                        isCurrent
                          ? 'bg-[#c4a46a] text-[#120e0b] border-[#f5ebd9] font-bold shadow-md'
                          : 'bg-[#0f0b07] text-[#a89680] hover:text-[#fff] border-[#2e2014]'
                      }`}
                    >
                      <span className="text-base">{m.icon}</span>
                      <span className="text-[10px] font-cinzel font-bold">{m.year}</span>
                      <span className={`text-[8.5px] font-serif truncate w-full ${isCurrent ? 'text-[#38230f]' : 'text-[#7d6e5d]'}`}>
                        {m.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Milestone Highlight Card */}
            {(() => {
              const m = MILESTONES[activeMilestoneIdx];
              return (
                <div className="p-6 bg-[#160f0a] border-2 border-[#c4a46a]/50 rounded-xl space-y-4 shadow-xl">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#3d2c1e] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{m.icon}</span>
                        <span className="text-xs font-cinzel text-[#f59e0b] font-bold uppercase tracking-wider">
                          {m.date} · {m.category}
                        </span>
                      </div>
                      <h2 className="text-2xl font-cinzel font-bold text-[#f5ebd9] mt-0.5">
                        {m.title}
                      </h2>
                    </div>
                    <span className="px-3 py-1 rounded bg-[#2a1d13] text-[#c4a46a] border border-[#c4a46a]/30 text-xs font-cinzel font-bold self-start sm:self-auto">
                      {m.tag}
                    </span>
                  </div>

                  <p className="text-sm font-prose text-[#d4c3ae] leading-relaxed">
                    {m.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-prose pt-2">
                    <div className="p-3.5 bg-[#1d140d] rounded-lg border border-[#3e2c1c]">
                      <strong className="text-[#c4a46a] block font-cinzel text-[11px] mb-1">
                        👥 Hauptakteure &amp; Unterhändler:
                      </strong>
                      <p className="text-[#d4c3ae]">{m.actors}</p>
                    </div>

                    <div className="p-3.5 bg-[#23120c] rounded-lg border border-[#ef4444]/30">
                      <strong className="text-[#f87171] block font-cinzel text-[11px] mb-1">
                        💥 Historische Folge für Afrika:
                      </strong>
                      <p className="text-[#fca5a5]">{m.impact}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: DIE GENERALAKTE IM KLARTEXT                             */}
        {/* ============================================================== */}
        {activeTab === 'generalakte' && (
          <motion.div
            key="tab-generalakte"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="p-4 bg-[#1a120b] border border-[#c4a46a]/30 rounded-lg text-xs font-prose text-[#d4c3ae] leading-relaxed text-center max-w-3xl mx-auto">
              Die am 26. Februar 1885 unterzeichnete <strong>Berliner Generalakte</strong> umfasste 38 Artikel in 7 Kapiteln.
              Hier sind die fünf folgenschwersten Paragrafen im Klartext analysiert:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {GENERAL_ACT_ARTICLES.map((art, idx) => (
                <div
                  key={`act-art-${idx}`}
                  className="p-5 bg-[#160f0a] border border-[#3e2c1c] rounded-xl space-y-2.5 hover:border-[#c4a46a]/60 transition-all"
                >
                  <div className="flex items-center justify-between border-b border-[#382819] pb-2">
                    <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#f59e0b] font-bold">
                      {art.number}
                    </span>
                    <span className="text-lg">{art.icon}</span>
                  </div>
                  <h3 className="text-base font-cinzel font-bold text-[#f5ebd9]">
                    {art.title}
                  </h3>
                  <span className="text-xs font-serif text-[#c4a46a] block">
                    {art.headline}
                  </span>
                  <p className="text-xs font-prose text-[#d1c2af] leading-relaxed pt-1">
                    {art.reality}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: DAS SIGNATAR-REGISTER (14 STAATEN)                      */}
        {/* ============================================================== */}
        {activeTab === 'maechte' && (
          <motion.div
            key="tab-maechte"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {SIGNATORY_POWERS.map((p) => (
                <div
                  key={`pow-${p.id}`}
                  className="p-4 bg-[#160f0a] border border-[#3e2c1c] rounded-xl space-y-2 hover:border-[#c4a46a] transition-all"
                >
                  <div className="flex items-center gap-2 border-b border-[#382819] pb-2">
                    <CountryFlag countryId={p.flagId} className="w-5 h-3 rounded-[1px] shadow" />
                    <h3 className="text-xs font-cinzel font-bold text-[#f5ebd9]">{p.country}</h3>
                  </div>

                  <div>
                    <span className="text-[10px] font-serif text-[#8c7b68] block">Gesandter:</span>
                    <span className="text-xs font-cinzel text-[#c4a46a]">{p.delegate}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-serif text-[#8c7b68] block">Koloniale Beute:</span>
                    <span className="text-xs font-prose text-[#d1c2af]">{p.gain}</span>
                  </div>

                  <div className="pt-1 text-[10.5px] font-prose text-[#a89680]">
                    <strong>Interesse:</strong> {p.interest}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: ORIGINALZITATE & AKTEN (ARCHIVTRESOR)                   */}
        {/* ============================================================== */}
        {activeTab === 'zitate' && (
          <motion.div
            key="tab-zitate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {HISTORICAL_QUOTES.map((q) => (
                <div
                  key={q.id}
                  className="p-5 bg-[#160f0a] border border-[#3e2c1c] rounded-xl space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-[#382819] pb-2">
                      <div>
                        <h3 className="text-sm font-cinzel font-bold text-[#f5ebd9]">{q.author}</h3>
                        <span className="text-[10px] font-serif text-[#a89680]">{q.role} · {q.date}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(q.id, `„${q.text}“ — ${q.author} (${q.date})`)}
                        className="px-2.5 py-1 rounded bg-[#241a12] hover:bg-[#34261a] text-[#c4a46a] text-[10px] font-cinzel border border-[#c4a46a]/30 transition-colors cursor-pointer"
                        title="Zitierfähigen Text kopieren"
                      >
                        {copiedId === q.id ? '✓ Kopiert!' : '📋 Kopieren'}
                      </button>
                    </div>

                    <div className="p-3 bg-[#1d130a] rounded-lg border-l-2 border-[#c4a46a] text-xs font-serif italic text-[#f0e3d0] leading-relaxed">
                      {q.text}
                    </div>

                    <p className="text-xs font-prose text-[#a89680]">
                      <strong className="text-[#edd9b9]">Historische Einordnung:</strong> {q.context}
                    </p>
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
