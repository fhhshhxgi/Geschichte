import { CountryDelegation, Hotspot, MapRegion, TimelineEvent, ConferenceChapter, SourceReference } from '../types/conference';
import { CENTRAL_HOTSPOTS } from './conferenceHotspots';

export const DELEGATIONS: Record<string, CountryDelegation> = {};

CENTRAL_HOTSPOTS.filter((h) => !h.isSymbolic && !h.isMap).forEach((h) => {
  DELEGATIONS[h.id] = {
    id: h.id,
    country: h.country,
    countryShort: h.country,
    representative: h.representative,
    representativeTitle: h.representativeTitle,
    image: h.sceneImage,
    portraitImage: h.portraitImage,
    hotspot: { x: h.hotspotX, y: h.hotspotY },
    shortDescription: h.shortDescription,
    role: h.role,
    interests: h.interests,
    conferencePosition: h.conferencePosition,
    consequences: h.consequences,
    classification: h.classification,
    historicalQuotes: h.historicalQuotes,
    sources: h.sources,
  };
});

export const ALL_PARTICIPANTS = CENTRAL_HOTSPOTS
  .filter((h) => !h.isSymbolic && !h.isMap)
  .map((h) => ({
    id: h.id,
    country: h.country,
    representative: h.representative,
    representativeTitle: h.representativeTitle,
    interests: h.shortDescription,
    role: h.role,
    portraitImage: h.portraitImage,
    isMajor: ['germany', 'britain', 'france', 'belgium', 'portugal'].includes(h.id),
  }));

export const OTHER_PARTICIPANTS = ALL_PARTICIPANTS;

export const HOTSPOTS: Hotspot[] = CENTRAL_HOTSPOTS.map((h) => ({
  id: h.id,
  country: h.country,
  representative: h.representative,
  label: h.country,
  subLabel: h.representative ? `${h.representative} · ${h.representativeTitle}` : h.shortDescription,
  x: h.hotspotX,
  y: h.hotspotY,
  hotspotX: h.hotspotX,
  hotspotY: h.hotspotY,
  sceneImage: h.sceneImage,
  portraitImage: h.portraitImage,
  targetScene: h.isSymbolic ? 'africa-absence' : h.isMap ? 'africa-map' : 'country',
  countryId: (!h.isSymbolic && !h.isMap) ? h.id : undefined,
  isSymbolic: h.isSymbolic,
  isMap: h.isMap,
}));

export const MAP_REGIONS: MapRegion[] = [
  {
    id: 'congo-basin',
    name: 'Das Kongobecken',
    areaLabel: 'Kongo-Freihandelszone',
    x: 53,
    y: 56,
    colonialPowers: 'König Leopold II. (AIC / später Belgien)',
    historicalContext: 'Das Herzstück der Konferenz. Auf über 2 Millionen km² wurde formal die Handels- und Schifffahrtsfreiheit für alle Nationen festgeschrieben.',
    conferenceRelevance: 'Kapitel I der Generalakte erklärte das gesamte Einzugsgebiet des Kongo zur zollfreien Freihandelszone. In der Praxis übertrug die Konferenz das Territorium an Leopolds AIC.',
    consequences: 'Entstehung des Kongo-Freistaates. Systematische Zwangsarbeit, Geiselnahme von Frauen und Kindern und grausamste Strafmaßnahmen führten zu Millionen Toten („Kongo-Gräuel“).'
  },
  {
    id: 'niger-basin',
    name: 'Das Niger-Becken',
    areaLabel: 'Schifffahrtsfreiheit des Niger',
    x: 35,
    y: 41,
    colonialPowers: 'Großbritannien & Frankreich',
    historicalContext: 'Lebensader Westafrikas und jahrhundertealtes Handelsnetz der Haussa- und Yoruba-Staaten.',
    conferenceRelevance: 'Kapitel V der Generalakte erklärte die Schifffahrt für frei, übertrug die Aufsicht jedoch nicht an eine internationale Kommission, sondern direkt an Großbritannien am unteren Niger.',
    consequences: 'Grundlage der späteren britischen Kolonie Nigeria. Zerschlagung traditioneller Handelsmonopole lokaler Völker wie den Ijaw und Opobo (König Jaja von Opobo).'
  },
  {
    id: 'east-africa',
    name: 'Ostafrika & Sansibar',
    areaLabel: 'Küstengebiete & Große Seen',
    x: 64,
    y: 50,
    colonialPowers: 'Deutsches Reich, Großbritannien, Sultanat Sansibar',
    historicalContext: 'Traditionell vom Sultanat Sansibar dominiertes Handelsgebiet mit weitreichenden Karawanenrouten ins Innere.',
    conferenceRelevance: 'Noch während der Konferenz bereitete Karl Peters mit Scheinverträgen die Annexion vor. Einen Tag nach Konferenzende (27. Feb 1885) erließ Bismarck den kaiserlichen Schutzbrief.',
    consequences: 'Gründung von Deutsch-Ostafrika (heute Tansania, Ruanda, Burundi). Brutale Niederschlagung des Abushiri-Aufstandes (1888) und später des Maji-Maji-Krieges (1905–1907).'
  },
  {
    id: 'southwest-africa',
    name: 'Südwestafrika',
    areaLabel: 'Deutsch-Südwestafrika',
    x: 48,
    y: 75,
    colonialPowers: 'Deutsches Reich',
    historicalContext: 'Heimat der Herero, Nama, Damara und San; 1884 erwarb der Bremer Tabakhändler Adolf Lüderitz durch betrügerische „Meilenverträge“ Küstenstreifen.',
    conferenceRelevance: 'Bismarck ließ dieses Schutzgebiet im Vorfeld der Konferenz ausrufen und nutzte die Konferenz zur völkerrechtlichen Akzeptanz durch die anderen europäischen Staaten.',
    consequences: 'Landenteignung, Entrechtung und schließlich der Völkermord an den Herero und Nama (1904–1908) unter General Lothar von Trotha – der erste Völkermord des 20. Jahrhunderts.'
  },
  {
    id: 'portuguese-corridor',
    name: 'Der Portugiesische Korridor',
    areaLabel: 'Angola – Mosambik (Mapa Cor-de-Rosa)',
    x: 52,
    y: 67,
    colonialPowers: 'Portugal vs. Großbritannien',
    historicalContext: 'Portugals Plan, seine Küstenkolonien Angola und Mosambik quer durch das Binnenland (heute Sambia und Simbabwe) zu verbinden.',
    conferenceRelevance: 'Die Konferenz legte fest, dass ein bloßer Anspruch auf dem Papier ohne militärische und administrative Präsenz („effektive Okkupation“) wertlos ist.',
    consequences: '1890 stellte Großbritannien ein militärisches Ultimatum an Portugal und riss den Korridor an sich (Cecil Rhodes’ British South Africa Company / Rhodesien).'
  },
  {
    id: 'northwest-africa',
    name: 'Westafrika & Sahel',
    areaLabel: 'Senegambia bis Tschadsee',
    x: 28,
    y: 33,
    colonialPowers: 'Frankreich',
    historicalContext: 'Bestehende hochentwickelte Staaten wie das Reich der Tukulor, das Wassoulou-Reich von Samori Touré und das Sokoto-Kalifat.',
    conferenceRelevance: 'Frankreich nutzte die Bestimmungen, um rasch ins Binnenland vorzustoßen und bilaterale Grenzverträge mit Deutschland und Großbritannien auszuhandeln.',
    consequences: 'Jahrzehntelanger erbitterter antikolonialer Widerstand (u. a. 16 Jahre Krieg unter Samori Touré), bevor Frankreich die Region unterwerfen konnte.'
  }
];

export const GENERAL_ACT_CHAPTERS: ConferenceChapter[] = [
  {
    number: 'Kapitel I',
    title: 'Freiheit des Handels im Kongobecken',
    latinOrOfficial: 'Déclaration relative à la liberté du commerce',
    summary: 'Freier Handel für alle Nationen im gesamten Einzugsgebiet des Kongo und seiner Nebenflüsse bis zum Indischen Ozean. Verbot von Handelsmonopolen und Zöllen für 20 Jahre.',
    historicalImpact: 'Diente als humanitäre Fassade, öffnete jedoch den Weg für Leopolds privaten Monopolstaat, der das Verbot durch Rohstoff-Konzessionen systematisch unterlief.'
  },
  {
    number: 'Kapitel II',
    title: 'Bekämpfung des Sklavenhandels',
    latinOrOfficial: 'Déclaration relative à la traite des esclaves',
    summary: 'Verpflichtung der Signatarstaaten, den Sklavenhandel zu Lande und zu Wasser im Kongobecken zu unterbinden.',
    historicalImpact: 'Diente den Kolonialmächten als moralische Rechtfertigung („Zivilisierungsmission“), um mit Waffengewalt in innerafrikanische Herrschaftsstrukturen einzugreifen.'
  },
  {
    number: 'Kapitel III',
    title: 'Neutralität des Kongobeckens',
    latinOrOfficial: 'Déclaration relative à la neutralité des territoires',
    summary: 'Möglichkeit der Staaten im Kongobecken, sich im Kriegsfall für neutral zu erklären, um europäische Kriege nicht nach Afrika zu tragen.',
    historicalImpact: 'Wurde im Ersten Weltkrieg 1914 sofort gebrochen, als die Alliierten deutsche Kolonien angriffen.'
  },
  {
    number: 'Kapitel IV',
    title: 'Schifffahrtsakte für den Kongo',
    latinOrOfficial: 'Acte de navigation du Congo',
    summary: 'Vollständige Freiheit der Schifffahrt für alle Handels- und Kriegsschiffe aller Nationen auf dem gesamten Kongo und seinen Kanälen.',
    historicalImpact: 'Sicherte internationalen Zugang zu den Binnengewässern, schuf jedoch keine handlungsfähige Kontrollkommission.'
  },
  {
    number: 'Kapitel V',
    title: 'Schifffahrtsakte für den Niger',
    latinOrOfficial: 'Acte de navigation du Niger',
    summary: 'Schifffahrtsfreiheit auf dem Niger, aber Ausführung der Aufsicht durch Großbritannien und Frankreich an ihren jeweiligen Flussabschnitten.',
    historicalImpact: 'Sieg der britischen Diplomatie: Großbritannien verhinderte eine internationale Schifffahrtskommission und sicherte sein Handelsmonopol am unteren Niger.'
  },
  {
    number: 'Kapitel VI',
    title: 'Prinzip der effektiven Okkupation',
    latinOrOfficial: 'Déclaration relative aux conditions essentielles des occupations',
    summary: 'Artikel 34 und 35: Wer künftig ein Gebiet an der Küste in Besitz nimmt, muss dies den anderen Signatarstaaten notifizieren und für eine „hinreichende Obrigkeit“ sorgen.',
    historicalImpact: 'Der historisch folgenschwerste Artikel: Reine Papieransprüche genügten nicht mehr. Dies löste einen fieberhaften Wettlauf zur tatsächlichen militärischen Besetzung des Binnenlandes aus.'
  },
  {
    number: 'Kapitel VII',
    title: 'Allgemeine Bestimmungen & Beitritt',
    latinOrOfficial: 'Dispositions générales',
    summary: 'Regelungen zur Ratifizierung und Möglichkeit für andere Staaten, der Generalakte beizutreten.',
    historicalImpact: 'Unterzeichnet am 26. Februar 1885 von allen 14 Vertretern der europäischen Mächte und der USA.'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    date: '1876',
    title: 'Brüsseler Geographische Konferenz',
    location: 'Brüssel, Belgien',
    description: 'König Leopold II. gründet die „Association Internationale Africaine“ unter dem Deckmantel humanitärer und wissenschaftlicher Ziele.',
    category: 'vorgeschichte'
  },
  {
    date: 'Februar 1884',
    title: 'Britisch-Portugiesischer Vertrag',
    location: 'London',
    description: 'Großbritannien erkennt Portugals Herrschaft an der Kongomündung an. Starker Protest von Frankreich, Deutschland und den Niederlanden führt zur Einberufung der Konferenz.',
    category: 'vorgeschichte'
  },
  {
    date: 'April 1884',
    title: 'Deutsche Schutzgebiete & US-Anerkennung',
    location: 'Berlin / Washington',
    description: 'Bismarck stellt Angra Pequena (Südwestafrika) unter Reichsschutz. Die USA erkennen als erste Macht die Flagge von Leopolds Kongo-Gesellschaft als souveränen Staat an.',
    category: 'vorgeschichte'
  },
  {
    date: '15. November 1884',
    title: 'Eröffnung der Berliner Konferenz',
    location: 'Reichskanzlei, Wilhelmstraße 77, Berlin',
    description: 'Bismarck eröffnet die Konferenz vor Vertretern aus 14 Staaten im Radziwill-Palais unter einer riesigen Wandkarte Afrikas. Kein einziger Afrikaner ist anwesend.',
    category: 'konferenz'
  },
  {
    date: 'Dezember 1884',
    title: 'Verhandlungen über Kongo und Niger',
    location: 'Berlin',
    description: 'Heftige Debatten über die Schifffahrtsfreiheit. Hinter den Kulissen handelt Leopold II. bilaterale Abkommen mit Deutschland, Frankreich und Großbritannien aus.',
    category: 'konferenz'
  },
  {
    date: 'Januar 1885',
    title: 'Einigung auf das Okkupationsprinzip',
    location: 'Berlin',
    description: 'Verabschiedung der Artikel 34 und 35: Koloniale Inbesitznahmen müssen den Mächten notifiziert werden und eine „effektive Autorität“ nachweisen.',
    category: 'konferenz'
  },
  {
    date: '26. Februar 1885',
    title: 'Unterzeichnung der Generalakte',
    location: 'Berlin',
    description: 'Feierlicher Abschluss der Konferenz und Unterzeichnung der 38 Artikel umfassenden Kongo-Akte (Generalakte) durch alle 14 Staaten.',
    category: 'konferenz'
  },
  {
    date: '27. Februar 1885',
    title: 'Kaiserlicher Schutzbrief für Deutsch-Ostafrika',
    location: 'Berlin',
    description: 'Einen Tag nach Konferenzabschluss unterzeichnet Kaiser Wilhelm I. den Schutzbrief für die von Karl Peters erworbenen Gebiete.',
    category: 'folge'
  },
  {
    date: '1885–1908',
    title: 'Kongo-Freistaat & Kongo-Gräuel',
    location: 'Zentralafrika',
    description: 'Leopold II. beutet den Kongo als Privatbesitz aus. Millionen Menschen sterben durch Zwangsarbeit und Terrorregime, bis Belgien das Gebiet 1908 als Staatskolonie übernimmt.',
    category: 'folge'
  },
  {
    date: '1890',
    title: 'Brüsseler Antisklaverei-Konferenz & Britisches Ultimatum',
    location: 'Brüssel / Lissabon',
    description: 'Zulassung von Zöllen im Kongo zur Finanzierung der Kolonialapparate; britisches Ultimatum zwingt Portugal zur Aufgabe des Korridor-Plans.',
    category: 'folge'
  },
  {
    date: '1904–1908',
    title: 'Völkermord an den Herero und Nama',
    location: 'Deutsch-Südwestafrika',
    description: 'Deutscher Vernichtungsbefehl unter Lothar von Trotha gegen aufständische Herero und Nama nach systematischer Landnahme.',
    category: 'folge'
  },
  {
    date: '1914',
    title: 'Vollständige Aufteilung des Kontinents',
    location: 'Afrika',
    description: 'Bis auf Äthiopien und Liberia (unter US-Protektion) ist ganz Afrika unter europäische Kolonialherrschaft geraten.',
    category: 'folge'
  }
];

export const PRIMARY_SOURCES: SourceReference[] = [
  {
    title: 'General-Akte der Berliner Konferenz vom 26. Februar 1885',
    institution: 'Reichs-Gesetzblatt Nr. 12, S. 215–244',
    year: '1885',
    details: 'Originalfassung der 38 Artikel der Konferenzakte auf Deutsch und Französisch.'
  },
  {
    title: 'Protokolle der Verhandlungen der Berliner Konferenz',
    institution: 'Auswärtiges Amt / Bundesarchiv Berlin-Lichterfelde (Bestand R 1001)',
    year: '1884–1885',
    details: 'Mitschriften aller Sitzungen, Reden Bismarcks und Berichte der Sonderkommissionen.'
  },
  {
    title: 'King Leopold’s Soliloquy: A Defense of His Rule',
    institution: 'Mark Twain / P.R. Warren Co.',
    year: '1905',
    details: 'Klassische zeitgenössische Streitschrift gegen das Grauen im Kongo-Freistaat.'
  },
  {
    title: 'Casement Report: Correspondence and Report From His Majesty’s Consul at Boma',
    institution: 'Roger Casement / British Foreign Office',
    year: '1904',
    details: 'Offizieller Untersuchungsbericht der britischen Regierung zu den Verbrechen im Kongo.'
  },
  {
    title: 'Kamerun unter deutscher Kolonialherrschaft & Deutsch-Ostafrika Dokumente',
    institution: 'Deutsches Historisches Museum (DHM) Berlin',
    year: 'Ausstellung 2021',
    details: 'Historische Dokumente und Bildarchive zum antikolonialen Widerstand.'
  }
];
