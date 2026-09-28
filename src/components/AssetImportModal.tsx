import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAssets } from '../context/AssetContext';

async function readDroppedEntries(items: DataTransferItemList): Promise<{ file: File; path: string }[]> {
  const result: { file: File; path: string }[] = [];

  const traverse = async (entry: any, currentPath: string): Promise<void> => {
    if (!entry) return;
    if (entry.isFile) {
      const file = await new Promise<File>((res, rej) => entry.file(res, rej));
      result.push({ file, path: currentPath + file.name });
    } else if (entry.isDirectory) {
      const reader = entry.createReader();
      const readBatch = async (): Promise<any[]> => {
        return new Promise((res, rej) => reader.readEntries(res, rej));
      };
      let batch: any[];
      do {
        batch = await readBatch();
        for (const child of batch) {
          await traverse(child, currentPath + entry.name + '/');
        }
      } while (batch.length > 0);
    }
  };

  const promises: Promise<void>[] = [];
  for (let i = 0; i < items.length; i++) {
    const entry = items[i].webkitGetAsEntry();
    if (entry) {
      promises.push(traverse(entry, ''));
    }
  }

  if (promises.length > 0) {
    await Promise.all(promises);
  }
  return result;
}

export const AssetImportModal: React.FC = () => {
  const {
    isImportModalOpen,
    setIsImportModalOpen,
    assets,
    importFiles,
    importZip,
    resetToDefaults,
    loadedCount,
    totalExpectedCount,
    hasCustomImages,
  } = useAssets();

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'scenes' | 'portraits'>('all');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const portraitsInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  if (!isImportModalOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    const files = e.dataTransfer.files;

    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage('Bilder werden verarbeitet & gespeichert...');

    try {
      // Check if user dropped a zip
      if (files.length === 1 && files[0].name.endsWith('.zip')) {
        const res = await importZip(files[0]);
        setStatusMessage(`Erfolgreich ${res.loadedCount} Bilddateien aus ZIP importiert.`);
      } else if (items && items.length > 0 && typeof items[0].webkitGetAsEntry === 'function') {
        const droppedEntries = await readDroppedEntries(items);
        if (droppedEntries.length > 0) {
          const res = await importFiles(droppedEntries);
          setStatusMessage(`Erfolgreich ${res.loadedCount} Bilddateien aus Ordner/Auswahl importiert.`);
        } else {
          const res = await importFiles(files);
          setStatusMessage(`Erfolgreich ${res.loadedCount} Bilddateien importiert.`);
        }
      } else {
        const res = await importFiles(files);
        setStatusMessage(`Erfolgreich ${res.loadedCount} Bilddateien importiert.`);
      }
    } catch (err: any) {
      setStatusMessage(`Fehler beim Import: ${err?.message || 'Unbekannter Fehler'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage('Bilder werden verarbeitet & gespeichert...');
    try {
      const res = await importFiles(files);
      setStatusMessage(`Erfolgreich ${res.loadedCount} Bilddateien importiert.`);
    } catch (err: any) {
      setStatusMessage(`Fehler: ${err?.message}`);
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  const handlePortraitsInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage('Porträts werden verarbeitet & gespeichert...');
    try {
      const res = await importFiles(files, 'portraits');
      setStatusMessage(`Erfolgreich ${res.loadedCount} Porträts importiert.`);
    } catch (err: any) {
      setStatusMessage(`Fehler: ${err?.message}`);
    } finally {
      setIsProcessing(false);
      e.target.value = '';
    }
  };

  const assetList = Object.values(assets).filter((item) => {
    if (filter === 'scenes') return item.folder === 'images';
    if (filter === 'portraits') return item.folder === 'portraits';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#16110c] text-[#dfd2be] border border-[#c4a46a]/60 shadow-2xl rounded-sm overflow-hidden"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#1f1710] border-b border-[#382d22] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c4a46a] animate-pulse" />
            <div>
              <h2 className="text-lg sm:text-xl font-garamond font-bold text-[#f5ebd9] tracking-wide">
                Neues Bilderset einbinden (01–17 & portraits/)
              </h2>
              <p className="text-xs font-serif text-[#a6937c]">
                Aktualisiere die Bilddaten des Konferenzsaals direkt mit deinen eigenen Dateien
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsImportModalOpen(false)}
            className="w-8 h-8 rounded flex items-center justify-center text-[#a6937c] hover:text-[#f5ebd9] hover:bg-[#2b2016] transition-colors cursor-pointer text-lg font-serif"
            aria-label="Schließen"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Explanation Banner */}
          <div className="p-4 bg-[#1a130d] rounded border-l-3 border-[#c4a46a] text-xs font-prose leading-relaxed text-[#c7b6a1] space-y-2">
            <p>
              <strong className="text-[#f5ebd9]">Hinweis zur Bildaktualisierung:</strong> Aus Sicherheitsgründen kann ein Web-Browser nicht automatisch auf lokale Ordner deines Computers zugreifen.
            </p>
            <p>
              Ziehe einfach deinen <strong>Ordner</strong> (oder alle 17 Bilddateien und den Unterordner <code className="text-[#e2b77a] px-1 py-0.5 bg-[#0e0a07] rounded">portraits/</code> oder ein <code className="text-[#e2b77a] px-1 py-0.5 bg-[#0e0a07] rounded">.zip</code>) in das Feld unten. Die neuen Bilder werden sofort im Konferenzsaal, im Kamera-Zoom und in den Delegations-Dossiers aktiv!
            </p>
          </div>

          {/* Drag & Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-[#f59e0b] bg-[#2a1d12]/80 scale-[1.01]'
                : 'border-[#4a3a28] hover:border-[#c4a46a]/60 bg-[#120e0a]/60'
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp,.zip"
              className="hidden"
              onChange={handleFileInputChange}
            />
            <input
              ref={portraitsInputRef}
              type="file"
              multiple
              accept="image/png,image/jpeg,image/webp"
              className="hidden"
              onChange={handlePortraitsInputChange}
            />
            <input
              ref={folderInputRef}
              type="file"
              // @ts-ignore
              webkitdirectory=""
              directory=""
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />

            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#241a12] border border-[#c4a46a]/40 flex items-center justify-center text-2xl text-[#c4a46a]">
                📂
              </div>

              <div>
                <p className="text-base font-garamond font-semibold text-[#f5ebd9]">
                  Dateien oder Ordner hierher ziehen & ablegen
                </p>
                <p className="text-xs text-[#9c8973] font-serif mt-1">
                  Unterstützt alle <code className="text-[#c4a46a]">01_...</code> bis <code className="text-[#c4a46a]">17_...png</code>, den Ordner <code className="text-[#c4a46a]">portraits/</code> oder ein komplettes <code className="text-[#c4a46a]">.zip</code>-Archiv
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-3.5 py-2 bg-[#2b2016] hover:bg-[#382b1d] text-[#e8ded0] border border-[#c4a46a]/50 rounded text-xs uppercase tracking-wider font-cinzel transition-all cursor-pointer"
                >
                  Raumbilder (01–17)
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    portraitsInputRef.current?.click();
                  }}
                  className="px-3.5 py-2 bg-[#362719] hover:bg-[#483321] text-[#f5ebd9] border border-[#c4a46a] rounded text-xs uppercase tracking-wider font-cinzel transition-all cursor-pointer font-semibold shadow-md"
                >
                  Porträts (14 Delegierte)
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    folderInputRef.current?.click();
                  }}
                  className="px-3.5 py-2 bg-[#1e1710] hover:bg-[#2b2016] text-[#cfbeaa] border border-[#4d3d2c] rounded text-xs uppercase tracking-wider font-cinzel transition-all cursor-pointer"
                >
                  Kompletten Ordner
                </button>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {statusMessage && (
            <div className="p-3 bg-[#1e1711] border border-[#c4a46a]/40 rounded text-xs font-serif text-[#edd9b9] flex items-center justify-between">
              <span>{statusMessage}</span>
              {isProcessing && <span className="animate-spin text-[#c4a46a]">⏳</span>}
            </div>
          )}

          {/* Overview Counters and Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#382d22]">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#a6937c] font-cinzel">
                Status:
              </span>
              <span className="text-xs px-2.5 py-1 rounded font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800">
                {totalExpectedCount} / {totalExpectedCount} Bilder aktiv {loadedCount > 0 ? `(${loadedCount} neu importiert)` : '(Authentischer Satz)'}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#120e0a] p-1 rounded border border-[#382d22]">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors font-serif ${
                  filter === 'all' ? 'bg-[#2b2016] text-[#edd9b9]' : 'text-[#8c7a65] hover:text-[#d4c5b3]'
                }`}
              >
                Alle ({totalExpectedCount})
              </button>
              <button
                onClick={() => setFilter('scenes')}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors font-serif ${
                  filter === 'scenes' ? 'bg-[#2b2016] text-[#edd9b9]' : 'text-[#8c7a65] hover:text-[#d4c5b3]'
                }`}
              >
                17 Raumbilder (01–17)
              </button>
              <button
                onClick={() => setFilter('portraits')}
                className={`px-2.5 py-1 text-[11px] rounded transition-colors font-serif ${
                  filter === 'portraits' ? 'bg-[#2b2016] text-[#edd9b9]' : 'text-[#8c7a65] hover:text-[#d4c5b3]'
                }`}
              >
                14 Porträts
              </button>
            </div>
          </div>

          {/* Asset List Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
            {assetList.map((item) => {
              const isCustom = item.isLoaded && item.source === 'imported';
              return (
                <div
                  key={item.key}
                  className={`p-2.5 rounded border text-xs flex items-center justify-between gap-2 transition-all ${
                    isCustom
                      ? 'bg-emerald-950/20 border-emerald-800/60'
                      : 'bg-[#140f0c] border-[#382d22]'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    {item.url ? (
                      <img
                        src={item.url}
                        alt={item.name}
                        className="w-9 h-9 object-cover rounded border border-[#4a3928] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded bg-[#201811] border border-[#3b2e20] flex items-center justify-center text-[10px] text-[#7d6c59] flex-shrink-0 font-mono">
                        {item.folder === 'portraits' ? '👤' : '🖼️'}
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-mono text-[11px] truncate text-[#e0d4c3]" title={item.name}>
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#8a7762] truncate">
                        {item.folder === 'portraits' ? 'Porträt' : 'Hauptszene / Zoom'}
                        {item.size ? ` · ${(item.size / 1024).toFixed(0)} KB` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {isCustom ? (
                      <span className="text-emerald-400 text-xs px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800" title="Benutzerdefiniertes Bild aktiv">
                        ✓ Neu
                      </span>
                    ) : item.isLoaded ? (
                      <span className="text-[#c4a46a] text-xs px-1.5 py-0.5 rounded bg-[#271c12] border border-[#523e29]" title="Authentisches Bild bereitgestellt">
                        ✓ Bereit
                      </span>
                    ) : (
                      <span className="text-[#6d5b47] text-xs" title="Noch kein Bild">
                        ○
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#1a130d] border-t border-[#382d22] flex flex-wrap items-center justify-between gap-3">
          {hasCustomImages ? (
            <button
              onClick={resetToDefaults}
              className="text-xs text-[#a3524b] hover:text-[#d9655c] transition-colors underline cursor-pointer font-serif"
            >
              Importierte Bilder zurücksetzen
            </button>
          ) : (
            <span className="text-xs text-[#8c7a65] font-serif">
              Warte auf Bereitstellung deiner Bilddateien
            </span>
          )}

          <button
            onClick={() => setIsImportModalOpen(false)}
            className="px-5 py-2 bg-[#2b2016] hover:bg-[#3d2e20] text-[#f5ebd9] border border-[#c4a46a] rounded text-xs uppercase tracking-wider font-cinzel transition-all cursor-pointer font-semibold ml-auto"
          >
            Fertig & Zum Konferenzsaal
          </button>
        </div>
      </motion.div>
    </div>
  );
};
