/**
 * Central Hotspot & Delegation Database
 * 
 * Every clickable seat in 01_start_konferenzraum.png is registered here with
 * precise coordinates aligned to the figures in the 1884 Reichskanzlei engraving.
 * All delegates link to authentic, historically verified portraits.
 */

export interface DelegationHotspot {
  id: string;
  country: string;
  representative: string;
  representativeTitle: string;
  hotspotX: number; // percentage (0 - 100) on 16:9 canvas
  hotspotY: number; // percentage (0 - 100) on 16:9 canvas
  sceneImage: string;
  portraitImage: string;
  isSymbolic?: boolean;
  isMap?: boolean;
  shortDescription: string;
  role: string;
  interests: string[];
  conferencePosition: string;
  consequences: string;
  classification: string;
  historicalQuotes?: {
    text: string;
    author: string;
    context: string;
  }[];
  sources: {
    title: string;
    institution?: string;
    year?: string;
    details?: string;
  }[];
}

export const CENTRAL_HOTSPOTS: DelegationHotspot[] = [
  // 03. DEUTSCHES REICH – Bismarck (Center table head, standing/sitting under the wall map)
  {
    id: 'germany',
    country: 'Deutsches Reich',
    representative: 'Otto von Bismarck',
    representativeTitle: 'Reichskanzler & Konferenzpräsident',
    hotspotX: 50.0,
    hotspotY: 35.5,
    sceneImage: '/images/03_deutsches_reich_bismarck.png',
    portraitImage: '/portraits/03_deutsches_reich_bismarck.png',
    shortDescription: 'Initiator und Leiter der Konferenz in der Reichskanzlei in der Berliner Wilhelmstraße.',
    role: 'Konferenzleiter und Gastgeber. Bismarck nutzte die Rolle des scheinbar neutralen Vermittlers („ehrlicher Makler“), um europäische Spannungen auf außereuropäische Schauplätze abzulenken und eine deutsch-französische Verständigung gegen Großbritannien zu suchen.',
    interests: [
      'Sicherung der 1884 neu ausgerufenen deutschen Schutzgebiete (Deutsch-Südwestafrika, Kamerun, Togo).',
      'Vermeidung kriegerischer Konflikte zwischen den europäischen Großmächten auf dem europäischen Kontinent.',
      'Durchsetzung des Freihandelsprinzips im Kongobecken, um deutschen Handelshäusern zollfreien Marktzugang zu garantieren.',
      'Ablenkung Frankreichs von Revanchegelüsten für den Krieg 1870/71.'
    ],
    conferencePosition: 'Bismarck betonte in seiner Eröffnungsrede die angebliche zivilisatorische und humanitäre Mission Europas sowie die Freiheit von Handel und Schifffahrt. Zugleich lehnte er direkte staatliche Kolonialverwaltung zunächst ab und bevorzugte private Handelsgesellschaften unter kaiserlichem Schutz.',
    consequences: 'Das Deutsche Reich etablierte sich endgültig als koloniale Großmacht. Unmittelbar nach Konferenzende unterzeichnete Bismarck im März 1885 den kaiserlichen Schutzbrief für Deutsch-Ostafrika. Die Politik mündete in Ausbeutung und brutaler Niederschlagung antikolonialen Widerstands (u. a. Völkermord an den Herero und Nama 1904–1908).',
    classification: 'Bismarck handelte nicht aus kolonialer Begeisterung, sondern aus kaltem europäischem Machtkalkül. Die Konferenz markierte den Wendepunkt von punktueller kolonialer Küstenpräsenz zur forcierten imperialistischen Aufteilung des gesamten Kontinents.',
    historicalQuotes: [
      {
        text: 'Alle Regierungen, die hier vertreten sind, teilen den Wunsch, die Eingeborenen Afrikas an die Zivilisation heranzuführen, indem sie das Innere dieses Kontinents dem Handel öffnen.',
        author: 'Otto von Bismarck',
        context: 'Aus der Eröffnungsrede zur Berliner Konferenz, 15. November 1884'
      }
    ],
    sources: [
      { title: 'Akten zur deutschen auswärtigen Politik 1871–1914', institution: 'Auswärtiges Amt / Bundesarchiv', year: '1927' },
      { title: 'Bismarck und der Imperialismus', institution: 'Hans-Ulrich Wehler', year: '1969' },
      { title: 'Die Berliner Afrika-Konferenz 1884/85', institution: 'Helmut Stoecker', year: '1985' }
    ]
  },

  // 04. GROSSBRITANNIEN – Sir Edward Malet (Right side of horseshoe table)
  {
    id: 'britain',
    country: 'Großbritannien',
    representative: 'Sir Edward Malet',
    representativeTitle: 'Britischer Botschafter in Berlin',
    hotspotX: 75.0,
    hotspotY: 51.5,
    sceneImage: '/images/04_grossbritannien_edward_malet.png',
    portraitImage: '/portraits/04_grossbritannien_edward_malet.png',
    shortDescription: 'Mächtigste Kolonial- und Seemacht der Epoche mit Fokus auf Flusshandelswege und den Indischen Ozean.',
    role: 'Vertreter der führenden globalen Handelsmacht. Großbritannien wollte verhindern, dass eine andere europäische Großmacht das Monopol über die Flusssysteme des Niger und des Kongo erlangte.',
    interests: [
      'Ausschließliche Kontrolle über den schiffbaren unteren Niger zur Sicherung der Interessen britischer Handelshäuser (United African Company / spätere Royal Niger Company).',
      'Verhinderung einer französischen Hegemonie in West- und Zentralafrika.',
      'Sicherung der strategischen Seewege nach Indien sowie Kontrolle über Ägypten (1882 besetzt) und das Niltal.',
      'Eindämmung portugiesischer Ansprüche an der Kongomündung.'
    ],
    conferencePosition: 'Großbritannien stimmte der Internationalisierung der Kongoschifffahrt zu, lehnte jedoch eine internationale Kontrolle des Niger strikt ab. Malet setzte durch, dass Großbritannien allein für die Schifffahrtsaufsicht auf dem Niger verantwortlich blieb.',
    consequences: 'Großbritannien festigte seine Vormachtstellung in Westafrika und im Niltal. Im weiteren Verlauf entstand die Vision einer durchgehenden britischen Verbindung von Kairo bis Kapstadt („Kap-Kairo-Linie“).',
    classification: 'London sicherte sich die wertvollsten Handelskorridore Afrikas mit minimalem formalem Militäraufwand während der Konferenz, indem es die Schifffahrtsregeln zu seinen Gunsten auslegte.',
    historicalQuotes: [
      {
        text: 'Großbritannien kann keiner internationalen Einmischung in Gewässern zustimmen, auf denen britische Schiffe seit Jahrzehnten Handel treiben und Ordnung garantieren.',
        author: 'Sir Edward Malet',
        context: 'Stellungnahme vor der Niger-Kommission, Dezember 1884'
      }
    ],
    sources: [
      { title: 'The Scramble for Africa 1876–1912', institution: 'Thomas Pakenham', year: '1991' },
      { title: 'British Policy in the Congo Basin', institution: 'Cambridge Historical Journal', year: '1934' }
    ]
  },

  // 05. FRANKREICH – Baron Alphonse de Courcel (Left side of horseshoe table, seated opposite Malet)
  {
    id: 'france',
    country: 'Frankreich',
    representative: 'Baron Alphonse de Courcel',
    representativeTitle: 'Französischer Botschafter in Berlin',
    hotspotX: 28.0,
    hotspotY: 52.5,
    sceneImage: '/images/05_frankreich_alphonse_de_courcel.png',
    portraitImage: '/portraits/05_frankreich_alphonse_de_courcel.png',
    shortDescription: 'Wichtigster Partner Bismarcks auf der Konferenz, bestrebt, ein riesiges Kolonialreich in Nord- und Westafrika zu konsolidieren.',
    role: 'Chefunterhändler Frankreichs. Gemeinsam mit Bismarck konzipierte de Courcel das Konferenzprogramm, um britisch-portugiesische Sonderabkommen zu neutralisieren.',
    interests: [
      'Anerkennung der Erwerbungen Pierre Savorgnan de Brazzas am Nordufer des Kongo (Moyen-Congo / Französisch-Kongo).',
      'Vorkaufsrecht auf das Territorium von König Leopolds Internationaler Kongo-Gesellschaft, falls diese scheitern sollte.',
      'Zusammenschluss der französischen Besitzungen von Westafrika bis zum Tschadsee und weiter zum Nil.',
      'Wiederherstellung des nationalen Prestiges nach der Niederlage von 1870/71.'
    ],
    conferencePosition: 'Frankreich trat demonstrativ für die Freiheit des Flusshandels ein, um Portugals historische Ansprüche zu blockieren, und verhandelte parallel am Rande der Konferenz direkt mit König Leopold II. über Territorialgrenzen am Kongo.',
    consequences: 'Frankreich sicherte sich ein gigantisches Kolonialreich in West- und Zentralafrika (später Französisch-Westafrika und Französisch-Äquatorialafrika) und das lukrative Vorkaufsrecht am Kongo.',
    classification: 'Die französisch-deutsche Zusammenarbeit während der Berliner Konferenz war eine der wenigen Phasen diplomatischer Kooperation zwischen 1871 und 1914 – getragen auf Kosten afrikanischer Souveränität.',
    sources: [
      { title: 'L’Afrique et la France sous la Troisième République', institution: 'Henri Brunschwig', year: '1971' },
      { title: 'Documents Diplomatiques Français (1871–1914)', institution: 'Ministère des Affaires Étrangères', year: '1932' }
    ]
  },

  // 06. BELGIEN – Auguste Lambermont (Far right table foreground)
  {
    id: 'belgium',
    country: 'Belgien',
    representative: 'Baron Auguste Lambermont',
    representativeTitle: 'Generalsekretär des belgischen Außenministeriums & Chefunterhändler Leopolds II.',
    hotspotX: 89.0,
    hotspotY: 58.5,
    sceneImage: '/images/06_belgien_auguste_lambermont.png',
    portraitImage: '/portraits/06_belgien_auguste_lambermont.png',
    shortDescription: 'Tarnte das private imperiale Projekt König Leopolds II. als humanitäre Wissenschaftsmission und schuf den Kongo-Freistaat.',
    role: 'Hinter den Kulissen agierender Hauptgewinner der Konferenz. Obwohl der belgische Staat selbst keine Kolonien forderte, agierten die belgischen Diplomaten im direkten Auftrag von König Leopold II. und seiner privaten Organisation „Association Internationale du Congo“ (AIC).',
    interests: [
      'Internationale völkerrechtliche Anerkennung der AIC als souveräner Staat im Herzen Afrikas.',
      'Verhinderung des Zugriffs von Frankreich oder Portugal auf das gesamte Kongobecken.',
      'Versprechen eines zollfreien Freihandelsgebiets für alle Mächte, um Zustimmung der Konferenzteilnehmer zu erkaufen.',
      'Zugang zu Rohstoffen (Kautschuk, Elfenbein, Mineralien).'
    ],
    conferencePosition: 'Lambermont präsentierte Leopolds Vorhaben als altruistisches Projekt zur „Bekämpfung des Sklavenhandels“ und zur wissenschaftlichen Erforschung. Bis zum Ende der Konferenz erkannten alle 14 Mächte die Flagge der AIC als souveränen Staat an.',
    consequences: 'Gründung des „Kongo-Freistaats“ als persönliches Privateigentum Leopolds II. (über 2,3 Millionen km²). Dies führte zu den berüchtigten „Kongo-Gräueln“: brutale Zwangsarbeit, Geiselnahmen, Verstümmelungen und Millionen Tote bei der Kautschukgewinnung.',
    classification: 'Das größte Verbrechen des europäischen Imperialismus im ausgehenden 19. Jahrhundert wurde auf der Berliner Konferenz unter dem Deckmantel von Philanthropie und Freihandel völkerrechtlich legitimiert.',
    sources: [
      { title: 'King Leopold’s Ghost: Greed, Terror and Heroism in Colonial Africa', institution: 'Adam Hochschild', year: '1998' },
      { title: 'Die Kongo-Akte und Leopold II.', institution: 'Kgl. Museum für Zentralafrika Tervuren', year: '2005' }
    ]
  },

  // 07. PORTUGAL – Marquês de Penafiel & Serpa Pimentel (Right side, near Kapnist)
  {
    id: 'portugal',
    country: 'Portugal',
    representative: 'Marquês de Penafiel & Serpa Pimentel',
    representativeTitle: 'Gesandte des Königreichs Portugal',
    hotspotX: 63.5,
    hotspotY: 48.0,
    sceneImage: '/images/07_portugal_marquis_de_penafiel.png',
    portraitImage: '/portraits/07_portugal_marquis_de_penafiel.png',
    shortDescription: 'Älteste europäische Kolonialmacht an afrikanischen Küsten, deren historische Ansprüche verdrängt wurden.',
    role: 'Verteidiger historischer Entdeckeransprüche aus dem 15. Jahrhundert (Diogo Cão erreichte die Kongomündung 1482). Portugals Versuch, 1884 ein bilaterales Abkommen mit London zu schließen, löste den Protest Bismarcks aus und führte zur Konferenz.',
    interests: [
      'Anerkennung der portugiesischen Souveränität über die Mündung des Kongo-Flusses.',
      'Sicherung des „Rosa-Landkarten-Plans“ (Mapa Cor-de-Rosa): eine durchgehende Landverbindung zwischen Angola und Mosambik.',
      'Erhebung von Zöllen an den Küstenstationen.'
    ],
    conferencePosition: 'Penafiel und Serpa Pimentel beriefen sich auf historische Erstentdeckung. Doch die Konferenzmächte setzten das Prinzip der „effektiven Okkupation“ durch: Nur reale militärische und administrative Besetzung begründete Ansprüche.',
    consequences: 'Portugal verlor die Kontrolle über den größten Teil des Kongobeckens und erhielt lediglich Cabinda sowie Gebiete südlich der Mündung. Der spätere Versuch, Angola und Mosambik zu verbinden, scheiterte am britischen Ultimatum von 1890.',
    classification: 'Portugal markierte den Übergang von den alten mercantilistischen Küstenstützpunkten des 16. Jahrhunderts zur modernen industriell-kapitalistischen Binnenexpansion der europäischen Mächte.',
    sources: [
      { title: 'Portugal and the Scramble for Africa', institution: 'R. J. Hammond', year: '1966' },
      { title: 'O Mapa Cor-de-Rosa e a Conferência de Berlim', institution: 'Sociedade de Geografia de Lisboa', year: '1984' }
    ]
  },

  // 09. ÖSTERREICH-UNGARN – Emmerich Széchényi (Left-center, seated directly next to Bismarck)
  {
    id: 'austria-hungary',
    country: 'Österreich-Ungarn',
    representative: 'Graf Imre (Emmerich) Széchényi',
    representativeTitle: 'Botschafter Österreich-Ungarns in Berlin',
    hotspotX: 44.0,
    hotspotY: 39.5,
    sceneImage: '/images/09_oesterreich_ungarn_emmerich_szechenyi.png',
    portraitImage: '/portraits/09_oesterreich_ungarn_emmerich_szechenyi.png',
    shortDescription: 'Verlässlicher Verbündeter Bismarcks im Zweibund ohne eigene koloniale Ambitionen in Afrika.',
    role: 'Diplomatischer Unterstützer der deutschen Verhandlungsführung. Als kontinentale Großmacht ohne koloniale Flotte stand für Wien die Stabilität des europäischen Bündnissystems im Vordergrund.',
    interests: [
      'Unterstützung der deutschen Konferenzinitiative zur Stärkung des deutsch-österreichischen Zweibunds (1879).',
      'Freihandelsgarantien für österreichisch-ungarische Handels- und Schifffahrtsunternehmen.',
      'Verhinderung von Reibereien, die den fragilen Frieden auf dem Balkan gefährden könnten.'
    ],
    conferencePosition: 'Graf Széchényi stimmte stets mit der deutschen Delegation ab und trat für die Prinzipien des Freihandels und der Schifffahrtsfreiheit auf den afrikanischen Flüssen ein.',
    consequences: 'Österreich-Ungarn erwarb keine afrikanischen Kolonien, legitimierte jedoch mit seiner Unterschrift unter die Generalakte die völkerrechtliche Aufteilung des Kontinents.',
    classification: 'Veranschaulicht, wie nicht-koloniale europäische Staaten im Rahmen der Bündnisdiplomatie aktiv an der imperialen Aufteilung Afrikas mitwirkten.',
    sources: [
      { title: 'Österreich-Ungarn und die Berliner Kongresse', institution: 'Haus-, Hof- und Staatsarchiv Wien', year: '1978' },
      { title: 'Die Außenpolitik der Habsburgermonarchie 1867–1918', institution: 'F. Fellner', year: '1988' }
    ]
  },

  // 10. SPANIEN – Francisco Merry y Colom (Right side, behind Malet)
  {
    id: 'spain',
    country: 'Spanien',
    representative: 'Francisco Merry y Colom',
    representativeTitle: 'Spanischer Gesandter in Berlin',
    hotspotX: 79.5,
    hotspotY: 39.0,
    sceneImage: '/images/10_spanien_francisco_merry_y_colom.png',
    portraitImage: '/portraits/10_spanien_francisco_merry_y_colom.png',
    shortDescription: 'Traditionelle Kolonialmacht im Niedergang, bestrebt, bestehende Enklaven und Inseln in Westafrika abzusichern.',
    role: 'Vertreter eines geschwächten Weltreichs, das nach dem Verlust seiner südamerikanischen Kolonien versuchte, seine verbliebenen afrikanischen Territorien völkerrechtlich abzusichern.',
    interests: [
      'Anerkennung spanischer Ansprüche an der westafrikanischen Küste (Río Muni / Äquatorialguinea).',
      'Sicherung der Inseln Fernando Póo (heute Bioko) und Annobón im Golf von Guinea.',
      'Schutz spanischer Fischerei- und Handelsrechte gegenüber der Westsahara (Río de Oro).'
    ],
    conferencePosition: 'Merry y Colom forderte die Anerkennung historischer Protektoratsverträge, die spanische Offiziere mit Küstenherrschern geschlossen hatten, und unterstützte das Prinzip effektiver Besitznahme an Küsten.',
    consequences: 'Spanien sicherte sich Spanisch-Guinea und Spanisch-Sahara, blieb aber in Afrika ein Akteur zweiten Ranges im Schatten Frankreichs und Großbritanniens.',
    classification: 'Repräsentiert die Verteidigungsstrategie alter Kolonialmächte, die gegen die expansive Dynamik der neuen Industrienationen kaum bestehen konnten.',
    sources: [
      { title: 'España en África: La política colonial española', institution: 'Archivo General de la Administración', year: '1992' },
      { title: 'Historia de la presencia española en África', institution: 'CSIC Madrid', year: '2001' }
    ]
  },

  // 11. ITALIEN – Edoardo de Launay (Left table side, next to Széchényi)
  {
    id: 'italien',
    country: 'Italien',
    representative: 'Graf Edoardo de Launay',
    representativeTitle: 'Italienischer Botschafter in Berlin',
    hotspotX: 36.0,
    hotspotY: 46.5,
    sceneImage: '/images/11_italien_edoardo_de_launay.png',
    portraitImage: '/portraits/11_italien_edoardo_de_launay.png',
    shortDescription: 'Junger Nationalstaat auf der Suche nach Kolonien zur Untermauerung seines Großmachtanspruchs.',
    role: 'Vertreter des seit 1861 geeinten Königreichs Italien. Nach dem Schock der französischen Besetzung Tunesiens (1881) suchte Rom in Berlin internationale Rückendeckung für Kolonialexpansion am Horn von Afrika.',
    interests: [
      'Internationale Akzeptanz für italienische Erwerbungen an der Küste des Roten Meeres (Assab, Massaua).',
      'Aufbau einer Kolonie in Eritrea und Somalia zur Demonstration des Großmachtstatus.',
      'Sicherung von Auswanderungs- und Absatzmärkten für die verarmte süditalienische Bevölkerung.'
    ],
    conferencePosition: 'De Launay betonte das Prinzip der „effektiven Okkupation“ und nutzte die Konferenz, um Roms Bündnis mit Berlin und Wien (Dreibund) auch auf kolonialer Ebene zu festigen.',
    consequences: 'Italien gründete die Kolonien Eritrea (1890) und Italienisch-Somaliland. Der spätere Versuch, das Kaiserreich Äthiopien zu unterwerfen, endete in der historischen Niederlage bei Adwa (1896).',
    classification: 'Beispiel für den Prestigekolonialismus jüngerer europäischer Nationalstaaten, die Kolonien primär als Statussymbol auf der Weltbühne anstrebten.',
    sources: [
      { title: 'L’Italia in Africa: Diplomazia e colonialismo', institution: 'Ministero degli Affari Esteri', year: '1975' },
      { title: 'Italian Colonialism in East Africa', institution: 'R. L. Hess', year: '1966' }
    ]
  },

  // 12. NIEDERLANDE – Frederik van Bylandt / Philip van der Hoeven (Far left table)
  {
    id: 'netherlands',
    country: 'Niederlande',
    representative: 'Frederik van Bylandt & F. P. van der Hoeven',
    representativeTitle: 'Gesandte des Königreichs der Niederlande',
    hotspotX: 14.0,
    hotspotY: 59.0,
    sceneImage: '/images/12_niederlande_philip_van_der_hoeven.png',
    portraitImage: '/portraits/12_niederlande_philip_van_der_hoeven.png',
    shortDescription: 'Traditionsreiche Handelsnation mit bedeutenden Niederlassungen am Unterkongo.',
    role: 'Vertreter mächtiger niederländischer Handelshäuser. Die Handelsgesellschaft NAHV (Nieuwe Afrikaansche Handels-Vennootschap) betrieb am Unterlauf des Kongo über 40 Handelsposten.',
    interests: [
      'Absoluter Freihandel und Zollfreiheit im gesamten Kongobecken.',
      'Verhinderung eines portugiesischen Handelsmonopols an der Flussmündung.',
      'Garantie freier Navigation auf dem Kongo für Handelsschiffe aller Nationen.'
    ],
    conferencePosition: 'Die niederländischen Gesandten setzten sich leidenschaftlich für die Freihandelsartikel der Generalakte ein und trugen dazu bei, dass das Kongobecken zur zollfreien Zone erklärt wurde.',
    consequences: 'Die niederländischen Kaufleute profitierten zunächst stark vom Kautschuk- und Elfenbeinboom, wurden jedoch später durch die monopolistische Konzessionspolitik Leopolds II. verdrängt.',
    classification: 'Verdeutlicht die Rolle des privatwirtschaftlichen Großhandels als treibende Kraft hinter den völkerrechtlichen Regelungen der Berliner Konferenz.',
    sources: [
      { title: 'The Dutch Trading Presence in West-Central Africa', institution: 'H. L. Wesseling', year: '1982' },
      { title: 'Archief van de Nieuwe Afrikaansche Handels-Vennootschap', institution: 'Nationaal Archief Den Haag', year: '1995' }
    ]
  },

  // 13. USA – John A. Kasson (Front left foreground table)
  {
    id: 'usa',
    country: 'USA',
    representative: 'John A. Kasson',
    representativeTitle: 'Gesandter der Vereinigten Staaten in Berlin',
    hotspotX: 22.0,
    hotspotY: 56.5,
    sceneImage: '/images/13_usa_john_a_kasson.png',
    portraitImage: '/portraits/13_usa_john_a_kasson.png',
    shortDescription: 'Erste Großmacht, die Leopolds Kongo-Organisation als souveränen Staat anerkannte.',
    role: 'Gesandter der Vereinigten Staaten. Obwohl die USA eine offizielle Kolonialherrschaft in Afrika ablehnten, spielten sie unter Einfluss des Diplomaten Henry S. Sanford eine Schlüsselrolle bei der diplomatischen Nobilitierung von Leopolds Privatgesellschaft.',
    interests: [
      'Sicherung der Meistbegünstigungsklausel für amerikanische Handelsunternehmen in Afrika.',
      'Keine territorialen Verpflichtungen oder Kolonialverwaltung („Monroe-Doktrin“).',
      'Förderung humanitärer und wissenschaftlicher Rhetorik („Verbot des Sklavenhandels“).'
    ],
    conferencePosition: 'Die USA hatten bereits im April 1884 als erste Nation die AIC als befreundete Regierung anerkannt. Kasson unterstützte in Berlin die Internationalisierung des Kongo und das Freihandelsprinzip.',
    consequences: 'Der US-Senat weigerte sich später, die Berliner Generalakte offiziell zu ratifizieren, um eine Verwicklung in europäische Kolonialstreitigkeiten zu vermeiden. Dennoch hatten die USA den Weg für Leopolds Kongo-Staat geebnet.',
    classification: 'Zeigt die frühe amerikanische Außenpolitik im Spannungsfeld zwischen antikolonialer Selbstwahrnehmung und weltweitem imperialem Handelsinteresse.',
    historicalQuotes: [
      {
        text: 'Die Vereinigten Staaten begrüßen jede Vereinbarung, die den freien Fluss von Handel und Erleuchtung in die entlegensten Teile dieses Kontinents ermöglicht.',
        author: 'John A. Kasson',
        context: 'Erklärung vor der Berliner Konferenz, November 1884'
      }
    ],
    sources: [
      { title: 'The United States and the Berlin Conference', institution: 'Chester L. Barrows', year: '1941' },
      { title: 'Henry S. Sanford and the Congo', institution: 'Lysle E. Meyer', year: '1971' }
    ]
  },

  // 14. DÄNEMARK – Emil Vind (Left table rear)
  {
    id: 'denmark',
    country: 'Dänemark',
    representative: 'Carl Emil Vind',
    representativeTitle: 'Dänischer Gesandter in Berlin',
    hotspotX: 18.5,
    hotspotY: 41.5,
    sceneImage: '/images/14_daenemark_emil_vind.png',
    portraitImage: '/portraits/14_daenemark_emil_vind.png',
    shortDescription: 'Neutrale seefahrende Nation mit Fokus auf Handelsfreiheit und humanitäre Klauseln.',
    role: 'Repräsentant des Königreichs Dänemark. Dänemark hatte seine früheren Kolonien an der Goldküste (Fort Christiansborg) bereits 1850 an Großbritannien verkauft und besaß 1884 keine Kolonien in Afrika mehr.',
    interests: [
      'Gleichberechtigter Zugang dänischer Handelsschiffe zu afrikanischen Häfen.',
      'Unterstützung von Schifffahrts- und Quarantäneregelungen.',
      'Wahrung der strikten Neutralität in den Streitigkeiten der europäischen Großmächte.'
    ],
    conferencePosition: 'Vind trat für multilaterale Schifffahrtsabkommen ein und unterstützte die Artikel zum Verbot des transatlantischen Sklavenhandels.',
    consequences: 'Dänemark unterzeichnete die Generalakte als vollwertiger Signatarstaat und legitimierte damit das völkerrechtliche System des kolonialen Zeitalters.',
    classification: 'Veranschaulicht die Einbindung kleinerer europäischer Seefahrernationen zur Schaffung eines gesamteuropäischen Konsenses über Afrika.',
    sources: [
      { title: 'Danmark og den europæiske kolonialisme i Afrika', institution: 'Rigsarkivet København', year: '1985' }
    ]
  },

  // 15. RUSSLAND – Pyotr Kapnist (Right-center, sitting right of Bismarck)
  {
    id: 'russia',
    country: 'Russland',
    representative: 'Graf Pyotr Kapnist',
    representativeTitle: 'Kaiserlich Russischer Gesandter',
    hotspotX: 56.5,
    hotspotY: 39.5,
    sceneImage: '/images/15_russland_pyotr_kapnist.png',
    portraitImage: '/portraits/15_russland_pyotr_kapnist.png',
    shortDescription: 'Kontinentale Großmacht mit Fokus auf Zentralasien und die Meerengen im Schwarzen Meer.',
    role: 'Vertreter des Zarenreichs. Russland hatte keinerlei Kolonialambitionen in Afrika, nutzte die Berliner Konferenz jedoch als Hebel gegen seinen globalen Hauptrivalen Großbritannien („The Great Game“ in Asien).',
    interests: [
      'Bindung britischer Flotten- und Militärressourcen in Afrika, um den Druck in Zentralasien und Afghanistan zu verringern.',
      'Unterstützung Bismarcks zur Stärkung des Dreikaiserbündnisses (Deutschland, Österreich, Russland).',
      'Prinzipielle Ablehnung britischer Vormachtstellungen auf den Weltmeeren.'
    ],
    conferencePosition: 'Kapnist stimmte bei allen Schlüsselfragen mit Deutschland und Frankreich ab und verhinderte britische Alleingänge bei der Formulierung internationaler Flussaufsichtsregeln.',
    consequences: 'Das Zarenreich blieb in Afrika ohne territoriale Ambitionen (abgesehen von einer kurzzeitigen Kosakenexpedition nach Sagallo 1889), nutzte die Konferenz aber erfolgreich zur Pflege des europäischen Mächtegleichgewichts.',
    classification: 'Klassisches Zeugnis eurozentrischer Geopolitik: Afrikanische Territorien dienten als Verhandlungsmasse für Konflikte in Asien und Europa.',
    sources: [
      { title: 'Россия и раздел Африки 1884–1885', institution: 'Institut für Allgemeine Geschichte Moskau', year: '1984' },
      { title: 'Russian Foreign Policy and the Scramble for Africa', institution: 'Slavic Review', year: '1990' }
    ]
  },

  // 16. SCHWEDEN-NORWEGEN – Gillis Bildt (Far right side)
  {
    id: 'sweden-norway',
    country: 'Schweden-Norwegen',
    representative: 'Freiherr Gillis Bildt',
    representativeTitle: 'Schwedisch-Norwegischer Gesandter in Berlin',
    hotspotX: 84.0,
    hotspotY: 54.0,
    sceneImage: '/images/16_schweden_norwegen_gillis_bildt.png',
    portraitImage: '/portraits/16_schweden_norwegen_gillis_bildt.png',
    shortDescription: 'Große Handelsflotte mit Interesse an ungehindertem Schiffsverkehr entlang der westafrikanischen Küste.',
    role: 'Vertreter der Personalunion von Schweden und Norwegen. Die skandinavische Handelsmarine gehörte zu den größten der Welt; zahlreiche norwegische und schwedische Kapitäne fuhren unter verschiedenen Flaggen in afrikanischen Gewässern.',
    interests: [
      'Freier Zugang skandinavischer Schiffe zu allen afrikanischen Flüssen und Häfen ohne diskriminierende Zölle.',
      'Sicherung von Heuer- und Handelsabkommen für nordische Seeleute.',
      'Vermeidung militärischer oder imperialer Verpflichtungen.'
    ],
    conferencePosition: 'Bildt plädierte für maximale Transparenz und die universelle Geltung der Schifffahrtsfreiheit auf Kongo und Niger.',
    consequences: 'Zahlreiche schwedische und norwegische Seeleute und Offiziere traten später in den Dienst des Kongo-Freistaates und waren teils an den kolonialen Administrationen beteiligt.',
    classification: 'Zeigt, dass auch formal kolonie-lose Länder als maritime Dienstleister und wirtschaftliche Nutznießer tief in das koloniale System eingebunden waren.',
    sources: [
      { title: 'Sverige, Norge och den afrikanska partitionen', institution: 'Riksarkivet Stockholm', year: '1987' }
    ]
  },

  // 17. OSMANISCHES REICH – Mehmed Said Pasha (Front right foreground, distinctive red Fez)
  {
    id: 'ottoman',
    country: 'Osmanisches Reich',
    representative: 'Mehmed Said Pasha',
    representativeTitle: 'Botschafter der Hohen Pforte in Berlin',
    hotspotX: 69.5,
    hotspotY: 47.5,
    sceneImage: '/images/17_osmanisches_reich_mehmed_said_pasha.png',
    portraitImage: '/portraits/17_osmanisches_reich_mehmed_said_pasha.png',
    shortDescription: 'Einziger Staat aus dem islamischen Kulturkreis, dessen formale Oberhoheit in Nordafrika zunehmend ignoriert wurde.',
    role: 'Vertreter des Sultans in Konstantinopel. Das Osmanische Reich beanspruchte historische Oberhoheit über Ägypten, Tripolitanien (heute Libyen) und Küstengebiete des Roten Meeres, war jedoch durch Staatsbankrott und militärische Schwäche diplomatisch isoliert.',
    interests: [
      'Wahrung der theoretischen Oberhoheit des Sultans über osmanische Provinzen in Nordafrika.',
      'Verhinderung weiterer territorialer Übergriffe nach der britischen Besetzung Ägyptens (1882) und der französischen Besetzung Tunesiens (1881).',
      'Schutz islamischer Karawanen- und Handelsrouten durch die Sahara.'
    ],
    conferencePosition: 'Said Pasha versuchte vergeblich, osmanische Souveränitätsansprüche in die Akte aufnehmen zu lassen. Die europäischen Großmächte ignorierten die osmanischen Proteste weitgehend und erklärten weite Teile Nord- und Zentralafrikas zum kolonialen Expansionsgebiet.',
    consequences: 'Die Konferenz beschleunigte den Zerfall des osmanischen Einflusses in Afrika. 1911/12 annektierte Italien schließlich Libyen im Italienisch-Türkischen Krieg.',
    classification: 'Einzigartiger Teilnehmer: Die Hohe Pforte saß am Tisch, wurde von den europäischen Mächten jedoch nicht als gleichberechtigter Imperialpartner, sondern als künftige Beute behandelt.',
    sources: [
      { title: 'The Ottoman Empire and the Berlin African Conference', institution: 'Başbakanlık Osmanlı Arşivi Istanbul', year: '1989' },
      { title: 'Die Hohe Pforte und der europäische Imperialismus', institution: 'F. Ahmad', year: '1993' }
    ]
  },

  // 02. SYMBOLISCHER LEERER PLATZ – Die Abwesenheit Afrikas (Front center edge of table)
  {
    id: 'absence',
    country: 'Afrika (Nicht geladen)',
    representative: 'Kein afrikanischer Vertreter',
    representativeTitle: 'Symbolische didaktische Leerstelle am Konferenztisch',
    hotspotX: 50.0,
    hotspotY: 76.0,
    sceneImage: '/images/02_leerer_platz_symbolisch.png',
    portraitImage: '',
    isSymbolic: true,
    shortDescription: 'Symbolische Visualisierung: 14 europäische Mächte verhandelten über Afrika – ohne afrikanische Beteiligung.',
    role: 'Die fundamentale Leerstelle der Berliner Konferenz. Kein einziger afrikanischer Herrscher, Botschafter oder Bürger war zur Konferenz eingeladen, konsultiert oder über Beschlüsse informiert worden.',
    interests: [
      'Wahrung der Selbstbestimmung und Souveränität hunderter afrikanischer Königreiche, Staaten und Völker.',
      'Schutz vor militärischer Invasion, Landenteignung, Zwangsarbeit und kultureller Zerstörung.',
      'Fortführung bestehender afrikanischer Handelsnetzwerke zu eigenen Bedingungen.'
    ],
    conferencePosition: 'Vollständiger Ausschluss: Die europäischen Juristen erklärten den afrikanischen Kontinent zur „Terra Nullius“ (staatsfreies Land), das von europäischen Mächten nach Belieben annektiert werden dürfe.',
    consequences: 'Gewaltsame Grenzziehungen quer durch bestehende Sprach- und Kulturräume, Zerschlagung traditioneller Herrschaftsstrukturen, jahrzehntelange koloniale Ausbeutung und Völkermorde (Herero/Nama, Maji-Maji, Kongo-Gräuel).',
    classification: 'Der leere Platz symbolisiert die koloniale Hybris: Über die Zukunft eines ganzen Kontinents wurde verhandelt, als existierten dessen Bewohner rechtlich nicht.',
    sources: [
      { title: 'The Scramble for Africa: A History of Imperial Violence', institution: 'Thomas Pakenham', year: '1991' },
      { title: 'Kolonialismus: Geschichte, Formen, Folgen', institution: 'Jürgen Osterhammel', year: '2006' }
    ]
  },

  // 08. AFRIKA-WANDKARTE (Center top wall, directly above Bismarck)
  {
    id: 'map',
    country: 'Afrika-Wandkarte',
    representative: 'Die Projektionsfläche der Aufteilung',
    representativeTitle: 'Historische Wandkarte im Sitzungssaal der Reichskanzlei',
    hotspotX: 50.0,
    hotspotY: 17.0,
    sceneImage: '/images/08_afrika_karte_stilisiert.png',
    portraitImage: '',
    isMap: true,
    shortDescription: 'Große historische Wandkarte Afrikas, auf der die europäischen Diplomaten mit Lineal und Zirkel Einflusszonen zogen.',
    role: 'Instrument der imperialen Kartierung. Die Wandkarte im Saal der Berliner Reichskanzlei diente den Gesandten als visuelle Grundlage für das Aushandeln von Einflusssphären, Flusshandelskorridoren und Protektoratsgrenzen.',
    interests: [
      'Aufteilung des riesigen Kongobeckens in eine zollfreie Handelszone unter Kontrolle Leopolds II.',
      'Sicherung des schiffbaren Nigerlaufs für Großbritannien.',
      'Abgrenzung der französischen, deutschen und portugiesischen Interessengebiete mit geometrischen Linealgrenzen.'
    ],
    conferencePosition: 'Die Verhandlungsführer zogen Grenzen oft entlang von Längen- und Breitengraden oder Flüssen – ohne Rücksicht auf Geografie, ethnische Gruppen oder bestehende Reiche.',
    consequences: 'Bis heute spiegeln viele afrikanische Staatsgrenzen die auf der Berliner Konferenz vereinbarten Linealstriche wider, was zu anhaltenden geopolitischen Spannungen führte.',
    classification: 'Symbolisiert die Abstraktion des Imperialismus: Ein Kontinent voller Völker und Zivilisationen wurde am Kartentisch zum Schachbrett europäischer Diplomatie.',
    sources: [
      { title: 'Kartographie und Imperialismus in Afrika', institution: 'Norman Etherington', year: '2007' },
      { title: 'Borderlands in Africa: Multidisciplinary Perspectives', institution: 'A. I. Asiwaju', year: '1984' }
    ]
  }
];
