import React from 'react';

interface CountryFlagProps {
  countryId: string;
  className?: string;
}

/**
 * Historical 1884/85 authentic SVG flags.
 * Separate HTML/SVG overlays, entirely independent of the photograph assets.
 */
export const CountryFlag: React.FC<CountryFlagProps> = ({ countryId, className = 'w-6 h-4' }) => {
  switch (countryId) {
    case 'germany':
      // Deutsches Reich 1871–1918: Schwarz-Weiß-Rot
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Deutsches Reich (1871–1918)">
          <rect width="15" height="3.333" y="0" fill="#000000" />
          <rect width="15" height="3.333" y="3.333" fill="#FFFFFF" />
          <rect width="15" height="3.334" y="6.666" fill="#DD0000" />
        </svg>
      );

    case 'britain':
      // Großbritannien: Union Jack
      return (
        <svg viewBox="0 0 60 30" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Vereinigtes Königreich">
          <clipPath id="uk-clip">
            <rect width="60" height="30" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            <rect width="60" height="30" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
            <path d="M0,0 L60,30" stroke="#C8102E" strokeWidth="2" />
            <path d="M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
            <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    case 'france':
      // Frankreich: Trikolore Blau-Weiß-Rot
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Frankreich">
          <rect width="5" height="10" x="0" fill="#002395" />
          <rect width="5" height="10" x="5" fill="#FFFFFF" />
          <rect width="5" height="10" x="10" fill="#ED2939" />
        </svg>
      );

    case 'belgium':
      // Belgien: Schwarz-Gelb-Rot
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Belgien">
          <rect width="5" height="10" x="0" fill="#000000" />
          <rect width="5" height="10" x="5" fill="#FDDA24" />
          <rect width="5" height="10" x="10" fill="#EF3340" />
        </svg>
      );

    case 'portugal':
      // Königreich Portugal (1830–1910): Blau-Weiß mit königlichem Wappen
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Königreich Portugal (1830–1910)">
          <rect width="7.5" height="10" x="0" fill="#002B7F" />
          <rect width="7.5" height="10" x="7.5" fill="#FFFFFF" />
          {/* Historical shield representation */}
          <rect width="3.6" height="4.2" x="5.7" y="2.9" rx="0.5" fill="#FFFFFF" stroke="#C8102E" strokeWidth="0.6" />
          <circle cx="7.5" cy="5" r="1.1" fill="#002B7F" />
        </svg>
      );

    case 'austria-hungary':
      // Österreich-Ungarn: Rot-Weiß-Rot / Rot-Weiß-Grün
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Österreich-Ungarn (Handelsflagge)">
          <rect width="15" height="3.33" y="0" fill="#EF3340" />
          <rect width="15" height="3.33" y="3.33" fill="#FFFFFF" />
          <rect width="7.5" height="3.34" x="0" y="6.66" fill="#EF3340" />
          <rect width="7.5" height="3.34" x="7.5" y="6.66" fill="#009639" />
        </svg>
      );

    case 'spain':
      // Königreich Spanien (1785–1931): Rot-Gelb-Rot
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Königreich Spanien (1785–1931)">
          <rect width="15" height="2.5" y="0" fill="#AA151B" />
          <rect width="15" height="5.0" y="2.5" fill="#F1BF00" />
          <rect width="15" height="2.5" y="7.5" fill="#AA151B" />
          <ellipse cx="4.5" cy="5" rx="1.2" ry="1.6" fill="#AA151B" />
        </svg>
      );

    case 'italy':
      // Königreich Italien (1861–1946): Grün-Weiß-Rot mit Savoyer Kreuz
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Königreich Italien (1861–1946)">
          <rect width="5" height="10" x="0" fill="#009246" />
          <rect width="5" height="10" x="5" fill="#FFFFFF" />
          <rect width="5" height="10" x="10" fill="#CE2B37" />
          {/* Savoy shield */}
          <rect width="2.2" height="2.6" x="6.4" y="3.7" fill="#CE2B37" stroke="#002B7F" strokeWidth="0.4" />
          <path d="M7.5,3.7 v2.6 M6.4,5 h2.2" stroke="#FFFFFF" strokeWidth="0.6" />
        </svg>
      );

    case 'netherlands':
      // Niederlande: Rot-Weiß-Blau
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Niederlande">
          <rect width="15" height="3.333" y="0" fill="#AE1C28" />
          <rect width="15" height="3.333" y="3.333" fill="#FFFFFF" />
          <rect width="15" height="3.334" y="6.666" fill="#21468B" />
        </svg>
      );

    case 'usa':
      // USA: Stars and Stripes (1884 mit 38 Sternen)
      return (
        <svg viewBox="0 0 19 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Vereinigte Staaten (1884)">
          <rect width="19" height="10" fill="#B22234" />
          <path d="M0,0.77 h19 M0,2.31 h19 M0,3.85 h19 M0,5.38 h19 M0,6.92 h19 M0,8.46 h19" stroke="#FFFFFF" strokeWidth="0.77" />
          <rect width="7.6" height="5.38" fill="#3C3B6E" />
          <circle cx="2" cy="1.5" r="0.4" fill="#FFFFFF" />
          <circle cx="4" cy="1.5" r="0.4" fill="#FFFFFF" />
          <circle cx="6" cy="1.5" r="0.4" fill="#FFFFFF" />
          <circle cx="3" cy="2.7" r="0.4" fill="#FFFFFF" />
          <circle cx="5" cy="2.7" r="0.4" fill="#FFFFFF" />
          <circle cx="2" cy="3.9" r="0.4" fill="#FFFFFF" />
          <circle cx="4" cy="3.9" r="0.4" fill="#FFFFFF" />
          <circle cx="6" cy="3.9" r="0.4" fill="#FFFFFF" />
        </svg>
      );

    case 'denmark':
      // Dänemark: Dannebrog
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Dänemark">
          <rect width="15" height="10" fill="#C60C30" />
          <rect width="2" height="10" x="4.5" fill="#FFFFFF" />
          <rect width="15" height="2" y="4" fill="#FFFFFF" />
        </svg>
      );

    case 'russia':
      // Russisches Kaiserreich: Weiß-Blau-Rot (Handels- & Nationalflagge)
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Russisches Kaiserreich">
          <rect width="15" height="3.333" y="0" fill="#FFFFFF" />
          <rect width="15" height="3.333" y="3.333" fill="#0039A6" />
          <rect width="15" height="3.334" y="6.666" fill="#D52B1E" />
        </svg>
      );

    case 'sweden-norway':
      // Union Schweden-Norwegen (1814–1905) mit Unionsmarke
      return (
        <svg viewBox="0 0 16 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Union Schweden-Norwegen (1814–1905)">
          <rect width="16" height="10" fill="#006AA7" />
          <rect width="2" height="10" x="5" fill="#FECC00" />
          <rect width="16" height="2" y="4" fill="#FECC00" />
          {/* Unionsmärke (Sillsallaten) in the upper canton */}
          <rect width="5" height="4" x="0" y="0" fill="#BA0C2F" />
          <path d="M0,0 L5,4 M5,0 L0,4" stroke="#FFFFFF" strokeWidth="0.8" />
          <path d="M0,0 L5,4 M5,0 L0,4" stroke="#00205B" strokeWidth="0.4" />
        </svg>
      );

    case 'ottoman':
      // Osmanisches Reich: Rote Flagge mit weißem Halbmond und Stern
      return (
        <svg viewBox="0 0 15 10" className={`inline-block rounded-xs shadow-xs border border-white/20 ${className}`} aria-label="Flagge Osmanisches Reich">
          <rect width="15" height="10" fill="#E30A17" />
          <circle cx="6" cy="5" r="2.5" fill="#FFFFFF" />
          <circle cx="6.7" cy="5" r="2.0" fill="#E30A17" />
          <polygon points="8.6,4.0 9.0,4.8 9.9,4.9 9.2,5.5 9.4,6.4 8.6,5.9 7.8,6.4 8.0,5.5 7.3,4.9 8.2,4.8" fill="#FFFFFF" />
        </svg>
      );

    default:
      return null;
  }
};
