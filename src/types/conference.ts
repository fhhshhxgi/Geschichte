export interface SourceReference {
  title: string;
  institution?: string;
  year?: string;
  details?: string;
  url?: string;
}

export interface HotspotItem {
  country: string;
  representative: string;
  hotspotX: number;
  hotspotY: number;
  sceneImage: string;
  portraitImage: string;
}

export interface Hotspot {
  id: string;
  country?: string;
  representative?: string;
  label: string;
  subLabel?: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  hotspotX?: number;
  hotspotY?: number;
  sceneImage?: string;
  portraitImage?: string;
  radius?: number; // size in px or relative
  targetScene: 'country' | 'africa-absence' | 'africa-map';
  countryId?: string;
  isSymbolic?: boolean;
  isMap?: boolean;
}

export interface CountryDelegation {
  id: string;
  country: string;
  countryShort: string;
  representative: string;
  representativeTitle: string;
  image: string;
  portraitImage?: string;
  hotspot: {
    x: number;
    y: number;
  };
  shortDescription: string;
  role: string;
  interests: string[];
  conferencePosition: string;
  consequences: string;
  classification: string; // Einordnung
  extendedText?: string;
  historicalQuotes?: {
    text: string;
    author: string;
    context: string;
  }[];
  sources: SourceReference[];
}

export interface MapRegion {
  id: string;
  name: string;
  x: number;
  y: number;
  areaLabel: string;
  colonialPowers: string;
  historicalContext: string;
  conferenceRelevance: string;
  consequences: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  location: string;
  description: string;
  category: 'konferenz' | 'vorgeschichte' | 'folge';
}

export interface ConferenceChapter {
  number: string;
  title: string;
  latinOrOfficial?: string;
  summary: string;
  historicalImpact: string;
}
