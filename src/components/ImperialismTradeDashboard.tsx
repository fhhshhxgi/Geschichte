import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import {
  COLONIAL_TRADE_CHRONOLOGY,
  EXTRACTION_BY_POWER_1914,
  COMMODITY_DETAILS,
  CommodityDetail,
} from '../data/colonialTradeData';
import { soundFx } from '../utils/soundEffects';

export const ImperialismTradeDashboard: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<
    'rubber' | 'gold' | 'diamonds' | 'humanCost' | 'all'
  >('rubber');
  const [selectedCommodity, setSelectedCommodity] = useState<CommodityDetail>(
    COMMODITY_DETAILS[0]
  );
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');
  const [hoveredPower, setHoveredPower] = useState<string | null>(null);

  const handleMetricSelect = (metric: typeof activeMetric) => {
    soundFx.playSubtleTick();
    setActiveMetric(metric);
  };

  const handleCommoditySelect = (commodity: CommodityDetail) => {
    soundFx.playPaperRustle();
    setSelectedCommodity(commodity);
  };

  // Custom tooltips with antique Victorian aesthetic
  const CustomTimelineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#100c09]/95 backdrop-blur-md border border-[#c4a46a]/60 p-3.5 rounded shadow-2xl text-xs space-y-1.5 font-sans min-w-[200px]">
          <span className="font-cinzel text-sm font-bold text-[#f5ebd9] block border-b border-[#382d22] pb-1">
            Jahr {label}
          </span>
          {payload.map((entry: any, index: number) => (
            <div
              key={`tooltip-${index}`}
              className="flex items-center justify-between gap-3 text-[11px]"
            >
              <span style={{ color: entry.color }} className="font-medium flex items-center gap-1">
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.name}:
              </span>
              <span className="font-mono font-semibold text-[#f5ebd9]">
                {entry.value.toLocaleString('de-DE')}
                {entry.dataKey === 'rubberKongoTonnes' ||
                entry.dataKey === 'copperKatangaTonnes'
                  ? ' t'
                  : entry.dataKey === 'goldSouthAfricaOunces'
                  ? ' Tsd. Unzen'
                  : entry.dataKey === 'diamondsSouthAfricaCarats'
                  ? ' Tsd. Karat'
                  : entry.dataKey === 'estimatedHumanCostThousands'
                  ? ' Tsd. Opfer'
                  : ''}
              </span>
            </div>
          ))}
          {label === 1888 && (
            <p className="text-[10px] text-[#f59e0b] italic pt-1 border-t border-[#382d22]">
              ⚡ 1888: Dunlop erfindet Luftreifen → Kautschukboom
            </p>
          )}
          {label === 1900 && (
            <p className="text-[10px] text-[#ef4444] italic pt-1 border-t border-[#382d22]">
              🩸 1900: Höhepunkt der „Kongo-Gräuel“ unter Leopold II.
            </p>
          )}
          {label === 1908 && (
            <p className="text-[10px] text-[#38bdf8] italic pt-1 border-t border-[#382d22]">
              ⚖️ 1908: Belgien annektiert den Kongo nach Weltprotesten
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#100c09]/95 backdrop-blur-md border border-[#c4a46a]/60 p-3 rounded shadow-2xl text-xs space-y-1 font-sans">
          <div className="flex items-center gap-2 border-b border-[#382d22] pb-1">
            <span className="text-base">{data.flag}</span>
            <span className="font-cinzel font-bold text-[#f5ebd9] text-sm">
              {data.power}
            </span>
          </div>
          <div className="text-[11px] text-[#d6c7b2]">
            Anteil am Ressourcenraub: <strong className="text-[#f59e0b]">{data.sharePercentage}%</strong>
          </div>
          <div className="text-[11px] text-[#d6c7b2]">
            Geschätzter Profit: <strong className="text-[#10b981]">ca. £{data.profitEstimateMillionsPounds} Mio.</strong>
          </div>
          <div className="text-[10px] text-[#a89680] pt-1">
            Hauptgüter: {data.leadCommodities}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-[#120e0b]/90 border border-[#c4a46a]/40 rounded-lg p-5 sm:p-7 shadow-2xl space-y-7 text-[#e8ded0]">
      {/* Header & Subtitle */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#382d22] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded bg-[#f59e0b]/20 text-[#f59e0b] text-[10px] uppercase font-cinzel font-bold tracking-widest border border-[#f59e0b]/40">
              Ökonomische Analyse (1884–1914)
            </span>
            <span className="text-xs text-[#a89680] font-serif">
              Recharts Daten-Dashboard
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-garamond font-normal text-[#f5ebd9]">
            Die koloniale Ausbeutungs- &amp; Rohstoffbilanz
          </h3>
          <p className="text-xs sm:text-sm font-prose text-[#b8a691] mt-1 max-w-2xl leading-relaxed">
            Interaktive Visualisierung der gigantischen Rohstoffströme nach Europa. Die Berliner Konferenz schuf den völkerrechtlichen Rahmen für die industrielle Enteignung eines ganzen Kontinents.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-[#1b140f] p-1.5 rounded border border-[#3e3225] text-xs">
          <button
            onClick={() => {
              soundFx.playSubtleTick();
              setChartType('area');
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer font-cinzel text-[11px] ${
              chartType === 'area'
                ? 'bg-[#c4a46a] text-[#120e0b] font-bold shadow'
                : 'text-[#a89680] hover:text-[#f5ebd9]'
            }`}
          >
            📈 Verlaufs-Graph
          </button>
          <button
            onClick={() => {
              soundFx.playSubtleTick();
              setChartType('bar');
            }}
            className={`px-3 py-1 rounded transition-colors cursor-pointer font-cinzel text-[11px] ${
              chartType === 'bar'
                ? 'bg-[#c4a46a] text-[#120e0b] font-bold shadow'
                : 'text-[#a89680] hover:text-[#f5ebd9]'
            }`}
          >
            📊 Balken-Vergleich
          </button>
        </div>
      </div>

      {/* Metric Selector Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'rubber', label: '🩸 Kongo-Wildkautschuk (Tonnen)', color: '#ef4444' },
          { id: 'gold', label: '🪙 Transvaal-Gold (Tsd. Unzen)', color: '#f59e0b' },
          { id: 'diamonds', label: '💎 Kimberley-Diamanten (Tsd. Karat)', color: '#38bdf8' },
          { id: 'humanCost', label: '⚠️ Menschlicher Blutzoll (Tsd. Opfer)', color: '#dc2626' },
          { id: 'all', label: '🌐 Alle Rohstoffströme kombiniert', color: '#c4a46a' },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleMetricSelect(btn.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer border flex items-center gap-1.5 ${
              activeMetric === btn.id
                ? 'bg-[#291d14] text-[#f5ebd9] border-[#c4a46a] shadow-[0_0_10px_rgba(196,164,106,0.3)]'
                : 'bg-[#17120e] text-[#a89680] border-[#382d22] hover:text-[#d6c7b2] hover:border-[#4a3a2a]'
            }`}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: btn.color }}
            />
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* PRIMARY CHART ROW: Timeline Trends & Colonial Power Extraction Share */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Historical Trajectory Chart (8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#18130f] rounded border border-[#3e3225] p-4 sm:p-5 shadow-inner">
          <div className="flex items-center justify-between mb-4 border-b border-[#2d2217] pb-2">
            <span className="font-cinzel text-xs uppercase tracking-wider text-[#c4a46a]">
              Historische Förderkurve (1884 – 1914)
            </span>
            <span className="text-[11px] text-[#8c7b68] font-sans">
              Quelle: Koloniale Zollregister &amp; Morel-Archiv
            </span>
          </div>

          <div className="w-full h-[320px] sm:h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                <AreaChart
                  data={COLONIAL_TRADE_CHRONOLOGY}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRubber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorDiamonds" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="colorHuman" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#b91c1c" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#7f1d1d" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2217" opacity={0.6} />
                  <XAxis
                    dataKey="year"
                    stroke="#a89680"
                    tick={{ fill: '#a89680', fontSize: 11, fontFamily: 'serif' }}
                  />
                  <YAxis
                    stroke="#a89680"
                    tick={{ fill: '#a89680', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontFamily: 'serif' }}
                  />

                  {(activeMetric === 'rubber' || activeMetric === 'all') && (
                    <Area
                      type="monotone"
                      dataKey="rubberKongoTonnes"
                      name="Kongo-Wildkautschuk (t)"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorRubber)"
                      strokeWidth={2.5}
                    />
                  )}
                  {(activeMetric === 'gold' || activeMetric === 'all') && (
                    <Area
                      type="monotone"
                      dataKey="goldSouthAfricaOunces"
                      name="Witwatersrand-Gold (Tsd. Unzen)"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorGold)"
                      strokeWidth={2.5}
                    />
                  )}
                  {(activeMetric === 'diamonds' || activeMetric === 'all') && (
                    <Area
                      type="monotone"
                      dataKey="diamondsSouthAfricaCarats"
                      name="Kimberley-Diamanten (Tsd. Karat)"
                      stroke="#38bdf8"
                      fillOpacity={1}
                      fill="url(#colorDiamonds)"
                      strokeWidth={2}
                    />
                  )}
                  {activeMetric === 'humanCost' && (
                    <Area
                      type="monotone"
                      dataKey="estimatedHumanCostThousands"
                      name="Kumulierte Todesopfer (Tsd.)"
                      stroke="#b91c1c"
                      fillOpacity={1}
                      fill="url(#colorHuman)"
                      strokeWidth={3}
                    />
                  )}
                </AreaChart>
              ) : (
                <BarChart
                  data={COLONIAL_TRADE_CHRONOLOGY}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2217" opacity={0.6} />
                  <XAxis
                    dataKey="year"
                    stroke="#a89680"
                    tick={{ fill: '#a89680', fontSize: 11, fontFamily: 'serif' }}
                  />
                  <YAxis
                    stroke="#a89680"
                    tick={{ fill: '#a89680', fontSize: 10, fontFamily: 'monospace' }}
                  />
                  <Tooltip content={<CustomTimelineTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontFamily: 'serif' }}
                  />

                  {(activeMetric === 'rubber' || activeMetric === 'all') && (
                    <Bar
                      dataKey="rubberKongoTonnes"
                      name="Kongo-Kautschuk (t)"
                      fill="#ef4444"
                      radius={[3, 3, 0, 0]}
                    />
                  )}
                  {(activeMetric === 'gold' || activeMetric === 'all') && (
                    <Bar
                      dataKey="goldSouthAfricaOunces"
                      name="Gold (Tsd. Unzen)"
                      fill="#f59e0b"
                      radius={[3, 3, 0, 0]}
                    />
                  )}
                  {(activeMetric === 'diamonds' || activeMetric === 'all') && (
                    <Bar
                      dataKey="diamondsSouthAfricaCarats"
                      name="Diamanten (Tsd. Karat)"
                      fill="#38bdf8"
                      radius={[3, 3, 0, 0]}
                    />
                  )}
                  {activeMetric === 'humanCost' && (
                    <Bar
                      dataKey="estimatedHumanCostThousands"
                      name="Kumulierte Opfer (Tsd.)"
                      fill="#b91c1c"
                      radius={[3, 3, 0, 0]}
                    />
                  )}
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>

          <div className="mt-3 pt-2.5 border-t border-[#2a2016] flex flex-wrap items-center justify-between text-[11px] text-[#a89680] font-serif">
            <span>
              💡 <strong>Historischer Kontext:</strong> Die Kurve belegt die direkte Korrelation zwischen europäischen Industrie-Erfindungen und Gewalt in Afrika.
            </span>
            <span className="text-[#f59e0b]">1884: Beginn der Konferenz → 1914: Vollständige Ausbeutung</span>
          </div>
        </div>

        {/* Extraction Share by Colonial Power (4 cols) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#18130f] rounded border border-[#3e3225] p-4 sm:p-5 shadow-inner flex flex-col justify-between">
          <div className="border-b border-[#2d2217] pb-2">
            <span className="font-cinzel text-xs uppercase tracking-wider text-[#c4a46a] block">
              Aufteilung des Reichtums (Stand 1914)
            </span>
            <span className="text-[11px] text-[#8c7b68] font-sans">
              Anteil der Kolonialmächte am Gesamtexport
            </span>
          </div>

          {/* Donut Pie Chart */}
          <div className="w-full h-[220px] flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={EXTRACTION_BY_POWER_1914}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="sharePercentage"
                  nameKey="power"
                >
                  {EXTRACTION_BY_POWER_1914.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="#100c09"
                      strokeWidth={2}
                      className="cursor-pointer transition-transform duration-200 hover:scale-105"
                      onMouseEnter={() => setHoveredPower(entry.power)}
                      onMouseLeave={() => setHoveredPower(null)}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Power Breakdown List */}
          <div className="space-y-1.5 text-xs font-sans">
            {EXTRACTION_BY_POWER_1914.map((p) => {
              const isHovered = hoveredPower === p.power;
              return (
                <div
                  key={p.power}
                  onMouseEnter={() => setHoveredPower(p.power)}
                  onMouseLeave={() => setHoveredPower(null)}
                  className={`flex items-center justify-between p-1.5 rounded transition-colors ${
                    isHovered ? 'bg-[#291d14] text-[#f5ebd9]' : 'hover:bg-[#201812] text-[#d6c7b2]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 truncate max-w-[200px]">
                    <span>{p.flag}</span>
                    <span className="truncate text-[11px] font-medium">{p.power}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-[#f5ebd9]">
                      {p.sharePercentage}%
                    </span>
                    <div
                      className="w-10 h-1.5 rounded-full bg-[#271d15] overflow-hidden"
                      title={`${p.sharePercentage}% Anteil`}
                    >
                      <div
                        style={{ width: `${p.sharePercentage * 2}%`, backgroundColor: p.color }}
                        className="h-full rounded-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECONDARY ROW: Interactive Commodity Dossier Deep Dive */}
      <div className="bg-[#18130f] rounded border border-[#c4a46a]/30 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#2d2217] pb-3">
          <div>
            <span className="font-cinzel text-xs uppercase tracking-wider text-[#f59e0b] block">
              Einzelschicksale &amp; Rohstoffprofile
            </span>
            <h4 className="text-xl font-garamond font-semibold text-[#f5ebd9]">
              Wähle ein Handelsgut zur detaillierten Untersuchung:
            </h4>
          </div>
          <span className="text-[11px] text-[#a89680] font-serif">
            Klicke auf eine Karte, um ökonomische Hintergründe zu enthüllen
          </span>
        </div>

        {/* Commodity Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {COMMODITY_DETAILS.map((com) => {
            const isSelected = com.id === selectedCommodity.id;
            return (
              <button
                key={com.id}
                onClick={() => handleCommoditySelect(com)}
                className={`p-3 rounded text-left transition-all cursor-pointer border flex flex-col justify-between group active:scale-95 ${
                  isSelected
                    ? 'bg-[#291d14] border-[#f59e0b] shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                    : 'bg-[#140f0c] hover:bg-[#1f1711] border-[#382d22] opacity-80 hover:opacity-100'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-2xl group-hover:scale-110 transition-transform">
                    {com.icon}
                  </span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#f59e0b] animate-ping" />
                  )}
                </div>
                <span className="text-xs font-serif font-bold text-[#f5ebd9] block truncate">
                  {com.name.split('(')[0]}
                </span>
                <span className="text-[10px] text-[#a89680] truncate block">
                  {com.primaryColony.split('(')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Commodity Detail Sheet */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCommodity.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="bg-[#140f0c] rounded border border-[#3e3225] p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-serif"
          >
            {/* Colony & Driver */}
            <div className="space-y-1.5 border-b md:border-b-0 md:border-r border-[#2d2217] pr-3 pb-3 md:pb-0">
              <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#c4a46a] block">
                Hauptursprung &amp; Kolonie
              </span>
              <p className="font-bold text-[#f5ebd9] text-sm leading-snug">
                {selectedCommodity.primaryColony}
              </p>
              <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#a89680] block pt-2">
                Europäischer Industriebedarf
              </span>
              <p className="text-[#d6c7b2] leading-relaxed">
                {selectedCommodity.driverInEurope}
              </p>
            </div>

            {/* Extraction Model */}
            <div className="space-y-1.5 border-b md:border-b-0 lg:border-r border-[#2d2217] pr-3 pb-3 md:pb-0">
              <span className="font-cinzel text-[10px] uppercase tracking-wider text-[#f59e0b] block">
                Zwangsarbeitsmodell
              </span>
              <p className="text-[#d6c7b2] leading-relaxed">
                {selectedCommodity.extractionModel}
              </p>
              <div className="pt-2">
                <span className="text-[10px] text-[#a89680] uppercase block">
                  Spitzenvolumen vor 1914:
                </span>
                <span className="font-mono text-sm font-bold text-[#f5ebd9]">
                  {selectedCommodity.peakAnnualVolume}
                </span>
              </div>
            </div>

            {/* Human Cost & Violence */}
            <div className="md:col-span-2 space-y-2 bg-[#361010]/30 border border-[#b91c1c]/40 p-3.5 rounded">
              <span className="font-cinzel text-[11px] uppercase tracking-wider text-[#ef4444] font-bold flex items-center gap-1.5">
                <span>🩸</span>
                <span>Menschlicher Preis &amp; Zerstörung</span>
              </span>
              <p className="text-[#fca5a5] font-prose text-xs sm:text-sm leading-relaxed">
                {selectedCommodity.humanConsequence}
              </p>
              <div className="pt-2 border-t border-[#b91c1c]/30 flex items-center justify-between text-[10px] text-[#f87171]">
                <span>Dokumentiert in diplomatischen &amp; missionarischen Berichten</span>
                <span>Berliner Generalakte Art. 6 (Schutzklausel ignoriert)</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
