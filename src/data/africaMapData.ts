/**
 * Comprehensive Historical Africa Map Dataset (1880–1914)
 * Traces the Scramble for Africa across 5 decisive chronological phases:
 * 1880 (Pre-Conference), 1885 (Berlin Conference), 1895 (High Scramble), 
 * 1900 (Consolidation & Rubber Terror), 1914 (Eve of WWI).
 */

export type ColonialPowerId = 
  | 'independent'
  | 'britain'
  | 'france'
  | 'germany'
  | 'belgium'
  | 'portugal'
  | 'italy'
  | 'spain'
  | 'ottoman';

export interface ColonialPowerInfo {
  id: ColonialPowerId;
  name: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  flagSymbol: string;
  description: string;
}

export const COLONIAL_POWERS: Record<ColonialPowerId, ColonialPowerInfo> = {
  independent: {
    id: 'independent',
    name: 'Unabhängige afrikanische Staaten & Reiche',
    color: '#d97706', // warm ochre / gold
    borderColor: '#f59e0b',
    badgeBg: 'rgba(217, 119, 6, 0.25)',
    flagSymbol: '👑',
    description: 'Souveräne afrikanische Königreiche, Kalifate und Stammesgesellschaften (z. B. Äthiopien, Sokoto, Ashanti, Dahomey, Zulu, Mossi, Mahdi-Sudan).'
  },
  britain: {
    id: 'britain',
    name: 'Großbritannien',
    color: '#dc2626', // imperial red
    borderColor: '#ef4444',
    badgeBg: 'rgba(220, 38, 38, 0.25)',
    flagSymbol: '🇬🇧',
    description: 'Führende Kolonialmacht mit der Strategie einer zusammenhängenden Achse von Kairo nach Kapstadt sowie Kontrolle des unteren Nigerlaufs.'
  },
  france: {
    id: 'france',
    name: 'Frankreich',
    color: '#2563eb', // royal blue
    borderColor: '#3b82f6',
    badgeBg: 'rgba(37, 99, 235, 0.25)',
    flagSymbol: '🇫🇷',
    description: 'Aufbau eines riesigen zusammenhängenden West- und Zentralafrika-Reichs (AOF / AEF) vom Mittelmeer bis zum Kongo-Fluss.'
  },
  germany: {
    id: 'germany',
    name: 'Deutsches Reich',
    color: '#78350f', // imperial bronze/brown
    borderColor: '#9a3412',
    badgeBg: 'rgba(120, 53, 15, 0.35)',
    flagSymbol: '🇩🇪',
    description: 'Neuankömmling im imperialen Wettlauf; Bismarck erwarb 1884/85 Schutzgebiete in Südwestafrika, Kamerun, Togo und Ostafrika.'
  },
  belgium: {
    id: 'belgium',
    name: 'Belgien / Kongo-Freistaat (Leopold II.)',
    color: '#9333ea', // imperial purple
    borderColor: '#a855f7',
    badgeBg: 'rgba(147, 51, 234, 0.25)',
    flagSymbol: '🇧🇪',
    description: 'Zunächst privates Ausbeutungsterritorium König Leopolds II. („Kongo-Freistaat“), 1908 nach internationalen Protesten vom belgischen Staat annektiert.'
  },
  portugal: {
    id: 'portugal',
    name: 'Portugal',
    color: '#15803d', // emerald green
    borderColor: '#22c55e',
    badgeBg: 'rgba(21, 128, 61, 0.25)',
    flagSymbol: '🇵🇹',
    description: 'Älteste Kolonialmacht an den Küsten; scheiterte mit dem „Rosa-Karten-Plan“ (Verbindung von Angola und Mosambik) am britischen Ultimatum von 1890.'
  },
  italy: {
    id: 'italy',
    name: 'Italien',
    color: '#0891b2', // teal/cyan
    borderColor: '#06b6d4',
    badgeBg: 'rgba(8, 145, 178, 0.25)',
    flagSymbol: '🇮🇹',
    description: 'Junger Nationalstaat auf Kolonialsuche; unterwarf Eritrea und Somalia, scheiterte 1896 in Äthiopien bei Adwa und besetzte 1911 Libyen.'
  },
  spain: {
    id: 'spain',
    name: 'Spanien',
    color: '#ca8a04', // mustard yellow
    borderColor: '#eab308',
    badgeBg: 'rgba(202, 138, 4, 0.25)',
    flagSymbol: '🇪🇸',
    description: 'Behielt historische Inseln und Enklaven in Westafrika (Río Muni / Spanisch-Guinea, Fernando Póo, Río de Oro / Westsahara).'
  },
  ottoman: {
    id: 'ottoman',
    name: 'Osmanisches Reich',
    color: '#831843', // deep crimson
    borderColor: '#9d174d',
    badgeBg: 'rgba(131, 24, 67, 0.25)',
    flagSymbol: '🇹🇷',
    description: 'Historischer Oberherr Nordafrikas (Ägypten, Tripolitanien); verlor seinen Einfluss schrittweise an Großbritannien, Frankreich und Italien.'
  }
};

export interface AfricanTerritory {
  id: string;
  name: string;
  region: 'north' | 'west' | 'central' | 'east' | 'south' | 'horn';
  // SVG coordinates on standard 1000 x 1050 Africa projection canvas
  path: string;
  center: [number, number]; // [x, y] for label and pin placement
  // Status mapped by year
  statusByYear: Record<number, {
    power: ColonialPowerId;
    title: string;
    subtext: string;
    indigenousRule: string;
    keyResources: string[];
    resistanceEvent?: string;
  }>;
}

export interface MapYearPhase {
  year: number;
  label: string;
  title: string;
  periodDescription: string;
  colonizedPercentage: number;
  independentPercentage: number;
  keySignificance: string;
  bismarckRole: string;
  globalHeadline: string;
}

export const MAP_YEAR_PHASES: MapYearPhase[] = [
  {
    year: 1880,
    label: '1880',
    title: 'Vor der Berliner Konferenz',
    periodDescription: 'Über 85–90% Afrikas sind autonom und werden von indigenen afrikanischen Zivilisationen und Reichen regiert. Europäer besitzen fast ausschließlich Küstenhandelsstationen, die Kapkolonie und Algerien.',
    colonizedPercentage: 11,
    independentPercentage: 89,
    keySignificance: 'Traditionelle Reiche wie das Kalifat Sokoto, das Kaiserreich Äthiopien, die Ashanti-Föderation und das Zulu-Königreich beherrschen das Binnenland.',
    bismarckRole: 'Bismarck lehnt koloniale Abenteuer noch als teuer und risikoreich ab („Ihre Karte von Afrika ist sehr schön, aber meine Karte von Afrika liegt in Europa“).',
    globalHeadline: 'Traditionelle afrikanische Souveränität & Küstenhandelsmonopole'
  },
  {
    year: 1885,
    label: '1885',
    title: 'Berliner Konferenz & Generalakte',
    periodDescription: 'Die 14 Konferenzmächte unterzeichnen am 26. Februar 1885 die Berliner Generalakte. Leopold II. erhält das Kongobecken als Privateigentum; Deutschland proklamiert Schutzgebiete.',
    colonizedPercentage: 25,
    independentPercentage: 75,
    keySignificance: 'Festlegung des Prinzips der „effektiven Okkupation“ (Art. 34/35): Wer Land beansprucht, muss es militärisch und administrativ besetzen.',
    bismarckRole: 'Bismarck unterzeichnet den kaiserlichen Schutzbrief für Carl Peters’ Ostafrika-Gesellschaft unmittelbar nach Konferenzende im März 1885.',
    globalHeadline: 'Völkerrechtliche Initialaufteilung & Schaffung des Kongo-Freistaats'
  },
  {
    year: 1895,
    label: '1895',
    title: 'Der forciert Wettlauf („High Scramble“)',
    periodDescription: 'Militärische Expeditionen stoßen ins Landesinnere vor. Die Eroberung des Soudan français schreitet voran, Cecil Rhodes dehnt das britische Reich nach Norden aus.',
    colonizedPercentage: 62,
    independentPercentage: 38,
    keySignificance: 'Einführung von Zwangsarbeit, Kopfsteuern („Hüttensteuer“) und Konzessionsgesellschaften. 1896 schlägt Äthiopien die italienische Invasionsarmee bei Adwa vernichtend.',
    bismarckRole: 'Nach Bismarcks Entlassung 1890 schlägt Kaiser Wilhelm II. den Kurs der aggressiven „Weltpolitik“ und Flottenrüstung ein.',
    globalHeadline: 'Militärische Invasionen, Cecil Rhodes & Äthiopiens Sieg bei Adwa'
  },
  {
    year: 1900,
    label: '1900',
    title: 'Konsolidierung & Kautschukraub',
    periodDescription: 'Das Zwangsarbeitssystem erreicht seinen grausamen Höhepunkt im Kongo-Freistaat („Kongo-Gräuel“). Fast alle traditionellen Reiche West- und Südafrikas wurden militärisch unterworfen.',
    colonizedPercentage: 82,
    independentPercentage: 18,
    keySignificance: 'Krieg der Goldenen Bank (Ashanti, angeführt von Königinmutter Yaa Asantewaa), Burenkrieg in Südafrika, vollständige Zerschlagung des Kalifats Sokoto durch britische Maxim-Maschinengewehre.',
    bismarckRole: 'Die europäischen Mächte teilen sich das Binnenland mit geometrischen Linealstrichen auf.',
    globalHeadline: 'Zwangsarbeit, koloniale Konzessionen & Kautschukmonopole'
  },
  {
    year: 1914,
    label: '1914',
    title: 'Vollendete koloniale Aufteilung',
    periodDescription: 'Am Vorabend des Ersten Weltkriegs sind über 92% Afrikas unter europäischer Fremdherrschaft. Einzig das Kaiserreich Äthiopien und Liberia bleiben unabhängig.',
    colonizedPercentage: 93,
    independentPercentage: 7,
    keySignificance: 'Afrika ist fast lückenlos in Kolonien aufgeteilt. Die willkürlichen Grenzen zerschneiden hunderte Völker und Sprachen – die Keimzelle postkolonialer Konflikte bis heute.',
    bismarckRole: 'Die imperialen Spannungen in Afrika (Faschoda-Krise 1898, Marokkokrisen 1905/1911) tragen maßgeblich zum Ausbruch des Ersten Weltkriegs bei.',
    globalHeadline: 'Gesamter Kontinent kolonisiert – Bis auf Äthiopien und Liberia'
  }
];

export interface ResourceHotspot {
  id: string;
  name: string;
  type: 'rubber' | 'ivory' | 'gold' | 'diamonds' | 'copper' | 'cotton' | 'palmoil';
  icon: string;
  label: string;
  x: number;
  y: number;
  region: string;
  colonialPower: string;
  impactDescription: string;
  exploitativeMethod: string;
}

export const RESOURCE_HOTSPOTS: ResourceHotspot[] = [
  {
    id: 'kongo-rubber',
    name: 'Kongo-Kautschuk',
    type: 'rubber',
    icon: '🩸',
    label: 'Wildkautschuk-Monopol (Kongo-Gräuel)',
    x: 520,
    y: 560,
    region: 'Kongo-Freistaat (König Leopold II.)',
    colonialPower: 'Kongo-Freistaat / AIC',
    impactDescription: 'Der weltweite Boom für Fahrrad- und Autoreifen führte zur brutalsten Zwangsarbeitsmaschinerie der Kolonialgeschichte: Quotenvorgaben, Geiselnahmen von Frauen und Kindern, Zwangsarbeit im Regenwald.',
    exploitativeMethod: 'Force Publique (Söldnerarmee) exekutierte Dörfer bei Nichterfüllung der Quoten; systematisches Abhacken von Händen als Munitionsnachweis. Schätzungsweise bis zu 10 Millionen Tote.'
  },
  {
    id: 'south-africa-gold',
    name: 'Witwatersrand Goldfelder',
    type: 'gold',
    icon: '🪙',
    label: 'Goldrausch am Witwatersrand (1886)',
    x: 575,
    y: 840,
    region: 'Transvaal / Südafrika',
    colonialPower: 'Großbritannien / Burenrepubliken',
    impactDescription: 'Die reichsten Goldvorkommen der Erde zogen tausende britische Glücksritter an und führten zum blutigen Zweiten Burenkrieg (1899–1902) und zur Zerschlagung der indigenen Gesellschaften.',
    exploitativeMethod: 'Wanderarbeitssystem („Compound System“): Afrikanische Bergleute wurden in kasernierten Lagern isoliert, extrem unterbezahlt und durch Rassentrennung entrechtet (Vorläufer der Apartheid).'
  },
  {
    id: 'kimberley-diamonds',
    name: 'Kimberley Diamantenminen',
    type: 'diamonds',
    icon: '💎',
    label: 'De Beers Diamantenmonopol (Cecil Rhodes)',
    x: 535,
    y: 875,
    region: 'Kapkolonie / Kimberley',
    colonialPower: 'Großbritannien',
    impactDescription: 'Cecil Rhodes baute mit De Beers das weltweite Diamantenmonopol auf und finanzierte mit dem Profit seine Privatarmee und die Annexion Rhodesiens.',
    exploitativeMethod: 'Vollständige Enteignung afrikanischer Grundbesitzer, strikt bewachte Minenlager mit Leibesvisitationen und Zwangspässen.'
  },
  {
    id: 'katanga-copper',
    name: 'Katanga Kupfer- & Zinkgürtel',
    type: 'copper',
    icon: '⛏️',
    label: 'Kupfergürtel von Katanga',
    x: 580,
    y: 660,
    region: 'Süd-Kongo / Katanga',
    colonialPower: 'Belgisch-Kongo / Union Minière',
    impactDescription: 'König Msiri vom Yeke-Königreich weigerte sich, seine Kupferminen an Leopold II. oder Cecil Rhodes abzutreten; 1891 von belgischen Offizieren ermordet.',
    exploitativeMethod: 'Errichtung von gigantischen Tagebauen unter Einsatz von tausenden zwangsrekrutierten Minenarbeitern aus ganz Zentralafrika.'
  },
  {
    id: 'niger-delta-palmoil',
    name: 'Palmöl an der Sklavenküste',
    type: 'palmoil',
    icon: '🌴',
    label: 'Palmöl & Schmiermittel der Industriellen Revolution',
    x: 345,
    y: 505,
    region: 'Niger-Delta (Royal Niger Company)',
    colonialPower: 'Großbritannien',
    impactDescription: 'Palmöl war der unverzichtbare Schmierstoff für europäische Fabrikmaschinen und Rohstoff für Seifen (z. B. Lever Brothers / spätere Unilever).',
    exploitativeMethod: 'König Jaja von Opobo, der das Palmölmonopol verteidigen wollte, wurde von den Briten 1887 entführt und ins karibische Exil verbannt.'
  },
  {
    id: 'east-africa-ivory',
    name: 'Ostafrikanisches Elfenbein',
    type: 'ivory',
    icon: '🦣',
    label: 'Elfenbein- & Karawanenrouten',
    x: 680,
    y: 550,
    region: 'Deutsch-Ostafrika & Sansibar',
    colonialPower: 'Deutsches Reich / Großbritannien',
    impactDescription: 'Für Klaviertasten, Billardkugeln und Messergriffe in Europa wurden hunderttausende Elefanten abgeschlachtet; Träger wurden zu hunderttausenden zwangsverpflichtet.',
    exploitativeMethod: 'Karawanenzwangsarbeit: Träger trugen 30-kg-Stoßzähne hunderte Kilometer durchs Inland; verhungerte oder entkräftete Träger wurden am Wegesrand zurückgelassen.'
  },
  {
    id: 'togo-cotton',
    name: 'Baumwoll-Zwangsanbau Togo & Ägypten',
    type: 'cotton',
    icon: '🌱',
    label: 'Baumwolle für europäische Textilfabriken',
    x: 320,
    y: 475,
    region: 'Togo („Musterkolonie“) & Ägypten',
    colonialPower: 'Deutsches Reich / Großbritannien',
    impactDescription: 'Das Deutsche Kolonialwirtschaftliche Komitee zwang togolesische Bauern zum Anbau amerikanischer Baumwollsaatgut-Sorten anstelle von Grundnahrungsmitteln.',
    exploitativeMethod: 'Prügelstrafe („Flaschenzug-Strafe“) und Steuerzwang trieben Bauern in den Hunger, während Rohbaumwolle zollfrei nach Chemnitz und Manchester exportiert wurde.'
  }
];

export interface ResistanceMovement {
  id: string;
  title: string;
  leader: string;
  year: string;
  region: string;
  x: number;
  y: number;
  colonialOpponent: string;
  outcome: 'victory' | 'genocide' | 'crushed';
  summary: string;
  detailedAnalysis: string;
}

export const RESISTANCE_MOVEMENTS: ResistanceMovement[] = [
  {
    id: 'adwa-1896',
    title: 'Schlacht von Adwa (1896)',
    leader: 'Kaiser Menelik II. & Kaiserin Taytu Betul',
    year: '1. März 1896',
    region: 'Äthiopien (Tigray)',
    x: 720,
    y: 400,
    colonialOpponent: 'Königreich Italien',
    outcome: 'victory',
    summary: 'Historischer Triumph: Äthiopische Truppen schlugen die italienische Invasionsarmee vernichtend. Äthiopien blieb als einziger Staat Afrikas dauerhaft souverän.',
    detailedAnalysis: 'Italien versuchte durch den gefälschten Artikel 17 des Vertrags von Wuchale (1889) Äthiopien als Protektorat zu behandeln. Kaiserin Taytu Betul forderte die Aufkündigung: „Lieber sterben wir, als diese Demütigung zu ertragen.“ Bei Adwa schlug die über 100.000 Mann starke äthiopische Armee die Italiener. Italien musste im Friedensvertrag von Addis Abeba die volle Unabhängigkeit anerkennen.'
  },
  {
    id: 'herero-nama-1904',
    title: 'Widerstand der Herero & Nama (1904–1908)',
    leader: 'Samuel Maharero & Hendrik Witbooi',
    year: '1904–1908',
    region: 'Deutsch-Südwestafrika (Namibia)',
    x: 480,
    y: 800,
    colonialOpponent: 'Deutsches Reich (Generalleutnant Lothar von Trotha)',
    outcome: 'genocide',
    summary: 'Erster Völkermord des 20. Jahrhunderts: Nach dem Aufstand trieb von Trotha die Herero in die wasserlose Omaheke-Wüste und richtete Konzentrationslager ein.',
    detailedAnalysis: 'Nach jahrelangem Landraub, Betrug durch Händler und rassistischer Demütigung erhoben sich die Herero 1904 unter Samuel Maharero. Trothas berüchtigter Vernichtungsbefehl: „Innerhalb der deutschen Grenze wird jeder Herero mit oder ohne Gewehr erschossen.“ Bis zu 80% des Herero-Volkes und 50% der Nama wurden ermordet oder starben in den Konzentrationslagern auf der Haifischinsel.'
  },
  {
    id: 'maji-maji-1905',
    title: 'Maji-Maji-Krieg (1905–1907)',
    leader: 'Kinjikitile Ngwale',
    year: '1905–1907',
    region: 'Deutsch-Ostafrika (Tansania)',
    x: 700,
    y: 630,
    colonialOpponent: 'Deutsches Reich (Schutztruppe)',
    outcome: 'crushed',
    summary: 'Breite überethnische Erhebung gegen Zwangsarbeit im Baumwollanbau. Die deutsche Schutztruppe wandte eine Politik der „verbrannten Erde“ an; bis zu 300.000 Menschen verhungerten.',
    detailedAnalysis: 'Kinjikitile Ngwale vereinte über 20 verschiedene Völker mit der Botschaft eines heiligen Wassers („Maji“), das die Ahnen gegen die Kolonialherren beistehen werde. Die deutsche Schutztruppe reagierte mit systematischer Vernichtung von Feldern, Dörfern und Getreidespeichern, was zu einer künstlichen Hungerkatastrophe führte.'
  },
  {
    id: 'ashanti-yaa-asantewaa',
    title: 'Krieg der Goldenen Bank (1900)',
    leader: 'Königinmutter Yaa Asantewaa von Ejisu',
    year: '1900',
    region: 'Goldküste (Ghana / Ashanti-Reich)',
    x: 275,
    y: 505,
    colonialOpponent: 'Großbritannien',
    outcome: 'crushed',
    summary: 'Als der britische Gouverneur forderte, sich auf den heiligen Goldenen Stuhl der Ashanti zu setzen, führte Königinmutter Yaa Asantewaa die Armee an und belagerte das Fort Kumasi.',
    detailedAnalysis: 'Der Goldene Stuhl galt als Seele des Ashanti-Volkes. Yaa Asantewaa rief den zögernden Häuptlingen zu: „Wenn ihr Männer von Ashanti nicht vorangeht, dann werden wir Frauen es tun!“ Die Rebellion forderte den Briten schwere Verluste ab, bevor Kumasi mit Truppen aus Nigeria entsetzt wurde.'
  },
  {
    id: 'mahdi-1881',
    title: 'Mahdi-Aufstand im Sudan (1881–1899)',
    leader: 'Muhammad Ahmad al-Mahdi & Khalifa Abdallahi',
    year: '1881–1898',
    region: 'Sudan (Khartum)',
    x: 640,
    y: 380,
    colonialOpponent: 'Großbritannien & Ägypten',
    outcome: 'crushed',
    summary: 'Etablierung eines unabhängigen islamischen Staates nach der Einnahme von Khartum (1885). Erst 1898 durch Kitcheners Truppen in der Schlacht von Omdurman mit Maxim-Guns niedergeschlagen.',
    detailedAnalysis: 'Muhammad Ahmad rief sich 1881 zum Mahdi aus und besiegte britische und ägyptische Truppen. Im Januar 1885 fiel Khartum, General Charles Gordon kam ums Leben. Für 13 Jahre war der Sudan unabhängig, bis Großbritannien 1898 mit modernsten Maschinengewehren und Kanonenbooten zurückschlug.'
  },
  {
    id: 'samory-toure',
    title: 'Wassoulou-Widerstand (1882–1898)',
    leader: 'Almamy Samory Touré',
    year: '1882–1898',
    region: 'Westafrika (Guinea / Mali / Elfenbeinküste)',
    x: 220,
    y: 470,
    colonialOpponent: 'Frankreich',
    outcome: 'crushed',
    summary: 'Genialer Stratege und Reichsgründer: Hielt die französische Kolonialarmee über 16 Jahre lang mit eigener Waffenproduktion und Guerillataktik auf.',
    detailedAnalysis: 'Samory Touré baute eigene Büchsenmacher-Werkstätten auf, um moderne Repetiergewehre nachzubauen. Als Frankreich ihn einkreiste, verlegte er sein gesamtes Reich mitsamt Bevölkerung hunderte Kilometer nach Osten („Taktik der verbrannten Erde“), bevor er 1898 gefangen genommen und nach Gabun verbannt wurde.'
  }
];

export interface ArtificialBorderExample {
  id: string;
  name: string;
  lineCoords: [[number, number], [number, number]];
  splitEthnicGroup: string;
  affectedStatesToday: string;
  context: string;
}

export const ARTIFICIAL_BORDERS: ArtificialBorderExample[] = [
  {
    id: 'somali-split',
    name: 'Zerschneidung der Somali-Nation',
    lineCoords: [[730, 420], [840, 480]],
    splitEthnicGroup: 'Somali (Gleiche Sprache, Kultur und Religion)',
    affectedStatesToday: 'Somalia, Somaliland, Äthiopien (Ogaden), Dschibuti, Kenia (NFD)',
    context: 'Aufgeteilt zwischen Großbritannien (Britisch-Somaliland), Italien (Italienisch-Somaliland), Frankreich (Französisch-Somaliland) und Äthiopien – Ursache kriegerischer Konflikte bis in die Gegenwart.'
  },
  {
    id: 'maasai-split',
    name: 'Das Lineal durch das Maasai-Land',
    lineCoords: [[650, 520], [740, 560]],
    splitEthnicGroup: 'Maasai (Halbnomadische Pastoralisten)',
    affectedStatesToday: 'Kenia und Tansania',
    context: 'Eine schnurgerade Grenzlinie zwischen Britisch-Ostafrika (Kenia) und Deutsch-Ostafrika (Tansania) schnitt jahrhundertealte Weiderouten und Brunnenrechte entzwei.'
  },
  {
    id: 'ewe-split',
    name: 'Teilung des Ewe-Volkes',
    lineCoords: [[310, 460], [310, 520]],
    splitEthnicGroup: 'Ewe-Kulturraum',
    affectedStatesToday: 'Ghana und Togo',
    context: 'Die Grenze zwischen der deutschen Kolonie Togo und der britischen Goldküste trennte Familien und Marktzentren der Ewe willkürlich.'
  },
  {
    id: 'kongo-angola-split',
    name: 'Zerschlagung des historischen Königreichs Kongo',
    lineCoords: [[440, 580], [540, 600]],
    splitEthnicGroup: 'Bakongo (Kikongo-Sprecher)',
    affectedStatesToday: 'DR Kongo, Republik Kongo, Angola (Cabinda)',
    context: 'Das seit dem 14. Jahrhundert bestehende Königreich Kongo wurde auf der Berliner Konferenz zwischen Leopold II., Frankreich und Portugal in drei Territorien zerhackt.'
  }
];
