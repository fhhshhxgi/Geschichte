/**
 * Comprehensive Economic Trade & Resource Flows Dataset (1884–1914)
 * Based on historical customs registers, colonial trade statistics, and economic histories
 * (e.g., E. D. Morel, Adam Hochschild, Cambridge History of Africa, Royal Niger Company records).
 */

export interface ResourceMetric {
  year: number;
  rubberKongoTonnes: number; // Wild rubber extracted from Congo Basin (tonnes)
  goldSouthAfricaOunces: number; // Witwatersrand gold production (thousands of fine ounces)
  diamondsSouthAfricaCarats: number; // Kimberley diamonds (thousands of carats)
  palmOilWestAfricaTonnes: number; // West African palm oil exports (thousands of tonnes)
  copperKatangaTonnes: number; // Katanga & Tsumeb copper (tonnes)
  cottonTogoSudanTonnes: number; // Forced cotton production (tonnes)
  ivoryExportsTonnes: number; // Elephant ivory exports to Europe (tonnes)
  estimatedHumanCostThousands: number; // Cumulative estimated deaths from forced labor & atrocities
}

export const COLONIAL_TRADE_CHRONOLOGY: ResourceMetric[] = [
  {
    year: 1884,
    rubberKongoTonnes: 120,
    goldSouthAfricaOunces: 5,
    diamondsSouthAfricaCarats: 1200,
    palmOilWestAfricaTonnes: 45,
    copperKatangaTonnes: 50,
    cottonTogoSudanTonnes: 80,
    ivoryExportsTonnes: 320,
    estimatedHumanCostThousands: 15,
  },
  {
    year: 1888,
    rubberKongoTonnes: 480, // Dunlop invents pneumatic tire
    goldSouthAfricaOunces: 230, // Witwatersrand discovery
    diamondsSouthAfricaCarats: 2450, // De Beers monopoly consolidation
    palmOilWestAfricaTonnes: 65,
    copperKatangaTonnes: 180,
    cottonTogoSudanTonnes: 140,
    ivoryExportsTonnes: 410,
    estimatedHumanCostThousands: 65,
  },
  {
    year: 1892,
    rubberKongoTonnes: 1850, // Rubber quota regime instituted
    goldSouthAfricaOunces: 1210,
    diamondsSouthAfricaCarats: 2800,
    palmOilWestAfricaTonnes: 82,
    copperKatangaTonnes: 420,
    cottonTogoSudanTonnes: 310,
    ivoryExportsTonnes: 490,
    estimatedHumanCostThousands: 280,
  },
  {
    year: 1896,
    rubberKongoTonnes: 3450, // Mass rubber terror / severed hands
    goldSouthAfricaOunces: 2280,
    diamondsSouthAfricaCarats: 3200,
    palmOilWestAfricaTonnes: 110,
    copperKatangaTonnes: 950,
    cottonTogoSudanTonnes: 620,
    ivoryExportsTonnes: 540,
    estimatedHumanCostThousands: 850,
  },
  {
    year: 1900,
    rubberKongoTonnes: 5800, // Peak rubber exports from Congo Free State
    goldSouthAfricaOunces: 1480, // Boer War interruption
    diamondsSouthAfricaCarats: 2900,
    palmOilWestAfricaTonnes: 145,
    copperKatangaTonnes: 1800,
    cottonTogoSudanTonnes: 1150,
    ivoryExportsTonnes: 580,
    estimatedHumanCostThousands: 2400,
  },
  {
    year: 1904,
    rubberKongoTonnes: 5100, // Herero/Nama genocide & Casement Report
    goldSouthAfricaOunces: 3770,
    diamondsSouthAfricaCarats: 3850,
    palmOilWestAfricaTonnes: 178,
    copperKatangaTonnes: 4200,
    cottonTogoSudanTonnes: 2400,
    ivoryExportsTonnes: 480,
    estimatedHumanCostThousands: 5200,
  },
  {
    year: 1908,
    rubberKongoTonnes: 4200, // Belgium annexes Congo from Leopold II
    goldSouthAfricaOunces: 7050,
    diamondsSouthAfricaCarats: 4500,
    palmOilWestAfricaTonnes: 215,
    copperKatangaTonnes: 8900,
    cottonTogoSudanTonnes: 4200,
    ivoryExportsTonnes: 390,
    estimatedHumanCostThousands: 7800,
  },
  {
    year: 1912,
    rubberKongoTonnes: 3600, // Natural vine exhaustion, shift to copper
    goldSouthAfricaOunces: 9120, // South African Union dominates world gold
    diamondsSouthAfricaCarats: 5050,
    palmOilWestAfricaTonnes: 280,
    copperKatangaTonnes: 15400, // Union Minière smelter opens
    cottonTogoSudanTonnes: 6800,
    ivoryExportsTonnes: 310,
    estimatedHumanCostThousands: 9400,
  },
  {
    year: 1914,
    rubberKongoTonnes: 2900,
    goldSouthAfricaOunces: 8800,
    diamondsSouthAfricaCarats: 5200,
    palmOilWestAfricaTonnes: 320,
    copperKatangaTonnes: 21500, // Vital war material
    cottonTogoSudanTonnes: 8500,
    ivoryExportsTonnes: 260,
    estimatedHumanCostThousands: 10500,
  },
];

export interface ColonialPowerExtractionShare {
  power: string;
  sharePercentage: number;
  color: string;
  flag: string;
  leadCommodities: string;
  profitEstimateMillionsPounds: number;
  principalCorporations: string;
}

export const EXTRACTION_BY_POWER_1914: ColonialPowerExtractionShare[] = [
  {
    power: 'Großbritannien',
    sharePercentage: 46,
    color: '#dc2626',
    flag: '🇬🇧',
    leadCommodities: 'Gold (Rand), Diamanten (De Beers), Palmöl (Niger), Zinn',
    profitEstimateMillionsPounds: 420,
    principalCorporations: 'De Beers Consolidated Mines, Consolidated Gold Fields, Royal Niger Co., British South Africa Co.',
  },
  {
    power: 'Frankreich',
    sharePercentage: 22,
    color: '#2563eb',
    flag: '🇫🇷',
    leadCommodities: 'Phosphate (Algerien/Tunesien), Erdnüsse (Senegal), Holz (Gabun)',
    profitEstimateMillionsPounds: 185,
    principalCorporations: 'Compagnie Française de l’Afrique Occidentale (CFAO), Société du Haut-Ogooué',
  },
  {
    power: 'Belgien (Leopold II. / Freistaat)',
    sharePercentage: 17,
    color: '#9333ea',
    flag: '🇧🇪',
    leadCommodities: 'Wildkautschuk, Elfenbein, Kupfer (Katanga)',
    profitEstimateMillionsPounds: 140,
    principalCorporations: 'ABIR (Anglo-Belgian India Rubber Co.), Société Anversoise, Union Minière du Haut-Katanga',
  },
  {
    power: 'Deutsches Reich',
    sharePercentage: 8,
    color: '#78350f',
    flag: '🇩🇪',
    leadCommodities: 'Sisal & Kaffee (Deutsch-Ostafrika), Diamanten & Kupfer (Namibia), Baumwolle (Togo)',
    profitEstimateMillionsPounds: 65,
    principalCorporations: 'Deutsche Kolonialgesellschaft, Otavi Minen- und Eisenbahn-Gesellschaft, Woermann-Linie',
  },
  {
    power: 'Portugal',
    sharePercentage: 5,
    color: '#15803d',
    flag: '🇵🇹',
    leadCommodities: 'Kaffee, Zucker, Sisal (Angola & Mosambik), Kontraktzwangsarbeit',
    profitEstimateMillionsPounds: 38,
    principalCorporations: 'Companhia de Moçambique, Companhia do Niassa',
  },
  {
    power: 'Italien & Spanien',
    sharePercentage: 2,
    color: '#0891b2',
    flag: '🇮🇹/🇪🇸',
    leadCommodities: 'Kakao (Fernando Póo), Salz, Häfen',
    profitEstimateMillionsPounds: 12,
    principalCorporations: 'Società Coloniale Italiana, Banco Hispano Colonial',
  },
];

export interface CommodityDetail {
  id: string;
  name: string;
  icon: string;
  primaryColony: string;
  driverInEurope: string;
  extractionModel: string;
  peakAnnualVolume: string;
  humanConsequence: string;
  accentColor: string;
}

export const COMMODITY_DETAILS: CommodityDetail[] = [
  {
    id: 'rubber',
    name: 'Wildkautschuk (Hevea / Landolphia)',
    icon: '🩸',
    primaryColony: 'Kongo-Freistaat (König Leopold II.) & Französisch-Kongo',
    driverInEurope: 'Dunlop-Luftreifen für Fahrräder und Autos, Dichtungsringe für Dampfmaschinen und elektrische Isolierung.',
    extractionModel: 'Monopolistische Konzessionsgesellschaften mit privater Söldnerarmee (Force Publique). Drakonische Lieferquoten für ganze Dörfer.',
    peakAnnualVolume: '5.800 Tonnen (1900)',
    humanConsequence: 'Schätzungsweise bis zu 10 Millionen Tote im Kongobecken durch Zwangsarbeit, Geiselnahmen von Familien, Strafmassaker und Hungersnöte.',
    accentColor: '#ef4444',
  },
  {
    id: 'gold',
    name: 'Witwatersrand-Gold',
    icon: '🪙',
    primaryColony: 'Transvaal / Südafrika',
    driverInEurope: 'Sicherung des weltweiten Goldstandards der Bank of England; Finanzierung des globalen imperialen Handels.',
    extractionModel: 'Tiefbergbau-Minen mit kaserniertem Wanderarbeitssystem („Compound System“) für afrikanische Minenarbeiter unter totaler Überwachung.',
    peakAnnualVolume: '9,1 Millionen Feinunzen (1912)',
    humanConsequence: 'Grundstein für rassistische Entrechtungsgesetze (Natives Land Act 1913), Vorläufer der Apartheid; hohe Todesraten durch Silikose.',
    accentColor: '#f59e0b',
  },
  {
    id: 'diamonds',
    name: 'Kimberley-Diamanten',
    icon: '💎',
    primaryColony: 'Kapkolonie & Deutsch-Südwestafrika (Kolmannskuppe)',
    driverInEurope: 'Luxusschmuck für die florierende europäische und amerikanische Oberschicht; Industriediamanten für Schneidewerkzeuge.',
    extractionModel: 'De Beers-Monopol von Cecil Rhodes. Hermetisch abgeriegelte Arbeitslager mit Körpervisitationen und Isolation.',
    peakAnnualVolume: '5,2 Millionen Karat (1914)',
    humanConsequence: 'Vollständige Enteignung afrikanischer Bodeneigentümer; Finanzierung von Privatarmeen zur Annexion Rhodesiens.',
    accentColor: '#38bdf8',
  },
  {
    id: 'palmoil',
    name: 'Palmöl & Palmkerne',
    icon: '🌴',
    primaryColony: 'Niger-Delta (Nigeria), Dahomey, Kamerun',
    driverInEurope: 'Unerlässlicher Schmierstoff für Eisenbahnachsen und Fabrikmaschinen; Kernrohstoff für industrielle Seifen (Lever Bros.) und Kerzen.',
    extractionModel: 'Militärische Bombardierung von Küstenstaaten durch britische Kanonenboote, um Monopolhandel der afrikanischen Könige (z.B. König Jaja) zu brechen.',
    peakAnnualVolume: '320.000 Tonnen (1914)',
    humanConsequence: 'Zerstörung lokaler Nahrungsversorgung zugunsten kolonialer Export-Monokulturen.',
    accentColor: '#10b981',
  },
  {
    id: 'copper',
    name: 'Kupfer von Katanga & Tsumeb',
    icon: '⛏️',
    primaryColony: 'Belgisch-Kongo (Katanga) & Deutsch-Südwestafrika',
    driverInEurope: 'Aufbau der weltweiten Telegrafen- und Telefonnetze, Elektrifizierung europäischer Großstädte, Munitionshülsen für den Weltkrieg.',
    extractionModel: 'Union Minière du Haut-Katanga: Großindustrieller Tagebau mit zwangsverpflichteten Arbeitsbataillonen.',
    peakAnnualVolume: '21.500 Tonnen (1914)',
    humanConsequence: 'Ermordung von König Msiri (1891); Zwangsumsiedlungen tausender Arbeiterfamilien über hunderte Kilometer.',
    accentColor: '#f97316',
  },
];
