import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import JSZip from 'jszip';

export interface AssetItem {
  key: string; // e.g. "01_start_konferenzraum.png" or "portraits/03_deutsches_reich_bismarck.png"
  name: string;
  folder: 'images' | 'portraits';
  isLoaded: boolean;
  size?: number;
  url?: string;
  source: 'server' | 'imported';
}

export type ImportItem = File | { file: File; path?: string };

interface AssetContextType {
  getImageUrl: (originalPath: string) => string;
  assets: Record<string, AssetItem>;
  isImportModalOpen: boolean;
  setIsImportModalOpen: (open: boolean) => void;
  importFiles: (files: FileList | File[] | ImportItem[], preferredFolder?: 'images' | 'portraits') => Promise<{ loadedCount: number; errors: string[] }>;
  importZip: (file: File) => Promise<{ loadedCount: number; errors: string[] }>;
  resetToDefaults: () => Promise<void>;
  loadedCount: number;
  totalExpectedCount: number;
  hasCustomImages: boolean;
}

const DELEGATE_PORTRAIT_KEYWORDS: Record<string, string> = {
  bismarck: 'portraits/03_deutsches_reich_bismarck.png',
  malet: 'portraits/04_grossbritannien_edward_malet.png',
  courcel: 'portraits/05_frankreich_alphonse_de_courcel.png',
  lambermont: 'portraits/06_belgien_auguste_lambermont.png',
  penafiel: 'portraits/07_portugal_marquis_de_penafiel.png',
  pimentel: 'portraits/07_portugal_marquis_de_penafiel.png',
  szechenyi: 'portraits/09_oesterreich_ungarn_emmerich_szechenyi.png',
  széchényi: 'portraits/09_oesterreich_ungarn_emmerich_szechenyi.png',
  merry: 'portraits/10_spanien_francisco_merry_y_colom.png',
  colom: 'portraits/10_spanien_francisco_merry_y_colom.png',
  launay: 'portraits/11_italien_edoardo_de_launay.png',
  hoeven: 'portraits/12_niederlande_philip_van_der_hoeven.png',
  kasson: 'portraits/13_usa_john_a_kasson.png',
  vind: 'portraits/14_daenemark_emil_vind.png',
  kapnist: 'portraits/15_russland_pyotr_kapnist.png',
  bildt: 'portraits/16_schweden_norwegen_gillis_bildt.png',
  said_pasha: 'portraits/17_osmanisches_reich_mehmed_said_pasha.png',
  pasha: 'portraits/17_osmanisches_reich_mehmed_said_pasha.png',
};

const EXPECTED_ROOM_IMAGES = [
  '01_start_konferenzraum.png',
  '02_leerer_platz_symbolisch.png',
  '03_deutsches_reich_bismarck.png',
  '04_grossbritannien_edward_malet.png',
  '05_frankreich_alphonse_de_courcel.png',
  '06_belgien_auguste_lambermont.png',
  '07_portugal_marquis_de_penafiel.png',
  '08_afrika_karte_stilisiert.png',
  '09_oesterreich_ungarn_emmerich_szechenyi.png',
  '10_spanien_francisco_merry_y_colom.png',
  '11_italien_edoardo_de_launay.png',
  '12_niederlande_philip_van_der_hoeven.png',
  '13_usa_john_a_kasson.png',
  '14_daenemark_emil_vind.png',
  '15_russland_pyotr_kapnist.png',
  '16_schweden_norwegen_gillis_bildt.png',
  '17_osmanisches_reich_mehmed_said_pasha.png',
];

const EXPECTED_PORTRAITS = [
  'portraits/03_deutsches_reich_bismarck.png',
  'portraits/04_grossbritannien_edward_malet.png',
  'portraits/05_frankreich_alphonse_de_courcel.png',
  'portraits/06_belgien_auguste_lambermont.png',
  'portraits/07_portugal_marquis_de_penafiel.png',
  'portraits/09_oesterreich_ungarn_emmerich_szechenyi.png',
  'portraits/10_spanien_francisco_merry_y_colom.png',
  'portraits/11_italien_edoardo_de_launay.png',
  'portraits/12_niederlande_philip_van_der_hoeven.png',
  'portraits/13_usa_john_a_kasson.png',
  'portraits/14_daenemark_emil_vind.png',
  'portraits/15_russland_pyotr_kapnist.png',
  'portraits/16_schweden_norwegen_gillis_bildt.png',
  'portraits/17_osmanisches_reich_mehmed_said_pasha.png',
];

const DB_NAME = 'berlin_conference_assets_v1';
const STORE_NAME = 'assets';

function openIndexedDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e: any) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'key' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveToDB(key: string, dataUrl: string, size: number) {
  try {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put({ key, dataUrl, size, updated: Date.now() });
    await new Promise((res) => {
      tx.oncomplete = res;
    });
  } catch (err) {
    console.warn('Could not save to IndexedDB:', err);
  }
}

async function getAllFromDB(): Promise<Record<string, { dataUrl: string; size: number }>> {
  try {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    return new Promise((resolve) => {
      req.onsuccess = () => {
        const result: Record<string, { dataUrl: string; size: number }> = {};
        for (const item of req.result || []) {
          result[item.key] = { dataUrl: item.dataUrl, size: item.size };
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

async function clearDB(): Promise<void> {
  try {
    const db = await openIndexedDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    // ignore
  }
}

const AssetContext = createContext<AssetContextType | null>(null);

export const AssetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Record<string, AssetItem>>({});
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [hasCustomImages, setHasCustomImages] = useState<boolean>(false);

  // Initialize initial state map with server-ready URLs
  const initAssetsState = () => {
    const map: Record<string, AssetItem> = {};
    EXPECTED_ROOM_IMAGES.forEach((filename) => {
      map[filename] = {
        key: filename,
        name: filename,
        folder: 'images',
        isLoaded: true,
        url: `/images/${filename}`,
        source: 'server',
      };
    });
    EXPECTED_PORTRAITS.forEach((key) => {
      const filename = key.replace('portraits/', '');
      map[key] = {
        key,
        name: filename,
        folder: 'portraits',
        isLoaded: true,
        url: `/${key}`,
        source: 'server',
      };
    });
    return map;
  };

  // Check server and IndexedDB on mount
  useEffect(() => {
    let isMounted = true;

    async function loadAssets() {
      const initialMap = initAssetsState();

      // 1. Check IndexedDB
      const dbRecords = await getAllFromDB();
      let hasCustom = false;
      Object.keys(dbRecords).forEach((key) => {
        if (initialMap[key]) {
          initialMap[key].isLoaded = true;
          initialMap[key].url = dbRecords[key].dataUrl;
          initialMap[key].size = dbRecords[key].size;
          initialMap[key].source = 'imported';
          hasCustom = true;
        }
      });

      // 2. Query server for files already on disk
      try {
        const res = await fetch('/api/asset-status');
        if (res.ok) {
          const data = await res.json();
          // Room images on disk
          for (const item of data.images || []) {
            if (initialMap[item.name] && !initialMap[item.name].url) {
              // Only mark if size > 0
              if (item.size > 0) {
                initialMap[item.name].isLoaded = true;
                initialMap[item.name].size = item.size;
                initialMap[item.name].url = `/images/${item.name}`;
              }
            }
          }
          // Portraits on disk
          for (const item of data.portraits || []) {
            const key = `portraits/${item.name}`;
            if (initialMap[key] && !initialMap[key].url) {
              if (item.size > 0) {
                initialMap[key].isLoaded = true;
                initialMap[key].size = item.size;
                initialMap[key].url = `/portraits/${item.name}`;
              }
            }
          }
        }
      } catch (e) {
        console.warn('Could not query /api/asset-status', e);
      }

      if (isMounted) {
        setAssets(initialMap);
        setHasCustomImages(hasCustom);
      }
    }

    loadAssets();
    return () => {
      isMounted = false;
    };
  }, []);

  const normalizeKey = (
    filePath: string,
    preferredFolder?: 'images' | 'portraits'
  ): { key: string; folder: 'images' | 'portraits'; filename: string } | null => {
    const cleanPath = filePath.replace(/\\/g, '/');
    const filename = cleanPath.split('/').pop() || '';
    if (!filename || (!filename.endsWith('.png') && !filename.endsWith('.jpg') && !filename.endsWith('.jpeg') && !filename.endsWith('.webp'))) {
      return null;
    }

    const lowerClean = cleanPath.toLowerCase();
    const lowerFilename = filename.toLowerCase();

    // Check if filename or path matches any delegate keyword
    for (const [kw, portKey] of Object.entries(DELEGATE_PORTRAIT_KEYWORDS)) {
      if (lowerClean.includes(kw) || lowerFilename.includes(kw)) {
        if (preferredFolder !== 'images' || lowerClean.includes('portrait')) {
          const expectedFile = portKey.replace('portraits/', '');
          return { key: portKey, folder: 'portraits', filename: expectedFile };
        }
      }
    }

    const isExplicitPortrait =
      preferredFolder === 'portraits' ||
      lowerClean.includes('portrait') ||
      lowerClean.includes('/portraits/');

    if (isExplicitPortrait) {
      // Find matching portrait key
      const match = EXPECTED_PORTRAITS.find(
        (p) => p.endsWith(filename) || p.toLowerCase().includes(lowerFilename)
      );
      if (match) {
        return { key: match, folder: 'portraits', filename };
      }

      // Check number prefix for portraits e.g. "03" -> "portraits/03_deutsches_reich_bismarck.png"
      const prefixMatch = filename.match(/^(\d{2})/);
      if (prefixMatch) {
        const num = prefixMatch[1];
        const matchByNum = EXPECTED_PORTRAITS.find((p) => p.replace('portraits/', '').startsWith(num));
        if (matchByNum) {
          return { key: matchByNum, folder: 'portraits', filename };
        }
      }

      return { key: `portraits/${filename}`, folder: 'portraits', filename };
    }

    // Check room images
    const matchRoom = EXPECTED_ROOM_IMAGES.find((r) => r.toLowerCase() === lowerFilename);
    if (matchRoom) {
      return { key: matchRoom, folder: 'images', filename };
    }

    // Match by number prefix e.g. "01", "02", "17"
    const prefixMatch = filename.match(/^(\d{2})/);
    if (prefixMatch) {
      const num = prefixMatch[1];
      const matchByNum = EXPECTED_ROOM_IMAGES.find((r) => r.startsWith(num));
      if (matchByNum) {
        return { key: matchByNum, folder: 'images', filename };
      }
    }

    return { key: filename, folder: 'images', filename };
  };

  const uploadToServer = async (filename: string, folder: 'images' | 'portraits', dataBase64: string) => {
    try {
      await fetch('/api/upload-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, folder, dataBase64 }),
      });
    } catch (e) {
      console.warn('Server upload background failed (IndexedDB is primary):', e);
    }
  };

  const importFiles = async (
    fileList: FileList | File[] | ImportItem[],
    preferredFolder?: 'images' | 'portraits'
  ): Promise<{ loadedCount: number; errors: string[] }> => {
    const rawItems = Array.from(fileList as any[]);
    let loadedCount = 0;
    const errors: string[] = [];

    const updatedAssets = { ...assets };

    for (const raw of rawItems) {
      const file: File = raw instanceof File ? raw : (raw?.file || raw);
      if (!file || !file.name) continue;

      // If user uploaded a zip
      if (file.name.endsWith('.zip')) {
        const res = await importZip(file);
        loadedCount += res.loadedCount;
        errors.push(...res.errors);
        continue;
      }

      // Check path (from webkitRelativePath or custom item path if folder dropped)
      const path = (raw && !(raw instanceof File) && (raw as any).path)
        ? (raw as any).path
        : ((file as any).webkitRelativePath || file.name);

      const parsed = normalizeKey(path, preferredFolder);
      if (!parsed) continue;

      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        // 1. Save to IndexedDB for instant UI persistence
        await saveToDB(parsed.key, dataUrl, file.size);

        // 2. Upload to server in background so files stay in /public
        uploadToServer(parsed.filename, parsed.folder, dataUrl);

        // 3. Update memory state
        updatedAssets[parsed.key] = {
          key: parsed.key,
          name: parsed.filename,
          folder: parsed.folder,
          isLoaded: true,
          size: file.size,
          url: dataUrl,
          source: 'imported',
        };

        loadedCount++;
      } catch (err: any) {
        errors.push(`${file.name}: ${err?.message || 'Fehler beim Lesen'}`);
      }
    }

    setAssets(updatedAssets);
    setHasCustomImages(true);
    return { loadedCount, errors };
  };

  const importZip = async (zipFile: File): Promise<{ loadedCount: number; errors: string[] }> => {
    let loadedCount = 0;
    const errors: string[] = [];
    const updatedAssets = { ...assets };

    try {
      const zip = await JSZip.loadAsync(zipFile);
      const entries = Object.keys(zip.files);

      for (const entryPath of entries) {
        const zipObj = zip.files[entryPath];
        if (zipObj.dir) continue;

        const parsed = normalizeKey(entryPath);
        if (!parsed) continue;

        try {
          const base64 = await zipObj.async('base64');
          const ext = parsed.filename.endsWith('.jpg') ? 'jpeg' : 'png';
          const dataUrl = `data:image/${ext};base64,${base64}`;
          const size = Math.round((base64.length * 3) / 4);

          await saveToDB(parsed.key, dataUrl, size);
          uploadToServer(parsed.filename, parsed.folder, dataUrl);

          updatedAssets[parsed.key] = {
            key: parsed.key,
            name: parsed.filename,
            folder: parsed.folder,
            isLoaded: true,
            size,
            url: dataUrl,
            source: 'imported',
          };
          loadedCount++;
        } catch (fileErr: any) {
          errors.push(`${entryPath}: ${fileErr?.message}`);
        }
      }
    } catch (e: any) {
      errors.push(`ZIP-Archiv konnte nicht gelesen werden: ${e?.message}`);
    }

    setAssets(updatedAssets);
    setHasCustomImages(true);
    return { loadedCount, errors };
  };

  const resetToDefaults = async () => {
    await clearDB();
    const initialMap = initAssetsState();
    setAssets(initialMap);
    setHasCustomImages(false);
  };

  const getImageUrl = (originalPath: string): string => {
    if (!originalPath) return '';

    // Clean leading slash and /images/ prefix for key matching
    let lookupKey = originalPath;
    if (lookupKey.startsWith('/')) lookupKey = lookupKey.slice(1);
    if (lookupKey.startsWith('images/')) lookupKey = lookupKey.replace('images/', '');

    // 1. Direct key in assets state
    if (assets[lookupKey]?.url) {
      return assets[lookupKey].url!;
    }

    // 2. Portraits key match (e.g. portraits/03_...)
    if (assets[`portraits/${lookupKey}`]?.url) {
      return assets[`portraits/${lookupKey}`].url!;
    }

    // 3. Filename match
    const filename = lookupKey.split('/').pop() || '';
    if (assets[filename]?.url) {
      return assets[filename].url!;
    }
    if (assets[`portraits/${filename}`]?.url) {
      return assets[`portraits/${filename}`].url!;
    }

    // 4. Delegate keyword match
    const lower = filename.toLowerCase();
    for (const [kw, portKey] of Object.entries(DELEGATE_PORTRAIT_KEYWORDS)) {
      if (lower.includes(kw) && assets[portKey]?.url) {
        return assets[portKey].url!;
      }
    }

    // 5. Fallback to direct public path
    if (originalPath.startsWith('/portraits/') || originalPath.startsWith('/images/')) {
      return originalPath;
    }

    return `/${lookupKey}`;
  };

  const loadedCount = Object.values(assets).filter((a) => a.isLoaded && a.source === 'imported').length;
  const totalExpectedCount = EXPECTED_ROOM_IMAGES.length + EXPECTED_PORTRAITS.length; // 17 + 14 = 31

  return (
    <AssetContext.Provider
      value={{
        getImageUrl,
        assets,
        isImportModalOpen,
        setIsImportModalOpen,
        importFiles,
        importZip,
        resetToDefaults,
        loadedCount,
        totalExpectedCount,
        hasCustomImages,
      }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export const useAssets = (): AssetContextType => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error('useAssets must be used within an AssetProvider');
  }
  return context;
};
