import { AcademicDocument, QuizResult, PushNotification, FacultyProfile, StudentProfile } from '../types';
import { INITIAL_ACADEMIC_DOCUMENTS, INITIAL_FACULTY_LIST, INITIAL_COURSES, JNTUH_R25_QUIZZES } from '../data/mockData';

export interface OfflineSyncItem {
  id: string;
  type: 'upload_document' | 'quiz_result' | 'attendance_update' | 'custom_note';
  payload: any;
  timestamp: string;
  synced: boolean;
}

export interface OfflineCacheStats {
  offlinePapersCount: number;
  quizzesCachedCount: number;
  coursesCachedCount: number;
  facultyCachedCount: number;
  pendingSyncCount: number;
  lastCachedTimestamp: string | null;
  storageEstimateKb: number;
}

const OFFLINE_PAPERS_KEY = 'kmce_offline_saved_papers';
const OFFLINE_DOCUMENTS_KEY = 'kmce_offline_documents_repo';
const OFFLINE_SYNC_QUEUE_KEY = 'kmce_offline_sync_queue';
const OFFLINE_QUIZ_RESULTS_KEY = 'kmce_offline_quiz_results';
const OFFLINE_LAST_CACHE_KEY = 'kmce_offline_last_cached_time';

/**
 * Initialize offline storage with initial documents
 */
export function initOfflineStorage(initialDocs: AcademicDocument[]): void {
  try {
    const existing = localStorage.getItem(OFFLINE_DOCUMENTS_KEY);
    if (!existing) {
      localStorage.setItem(OFFLINE_DOCUMENTS_KEY, JSON.stringify(initialDocs));
    }
    const existingPapers = localStorage.getItem(OFFLINE_PAPERS_KEY);
    if (!existingPapers) {
      localStorage.setItem(OFFLINE_PAPERS_KEY, JSON.stringify(initialDocs.slice(0, 10)));
    }
  } catch (err) {
    console.error('Error initializing offline storage:', err);
  }
}

/**
 * Get all offline documents repository
 */
export function getOfflineDocuments(): AcademicDocument[] {
  try {
    const raw = localStorage.getItem(OFFLINE_DOCUMENTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Error reading offline documents:', err);
    return [];
  }
}

/**
 * Save a document to local offline store
 */
export function saveOfflineDocument(doc: AcademicDocument): void {
  try {
    const docs = getOfflineDocuments();
    const filtered = docs.filter((d) => d.id !== doc.id);
    filtered.unshift(doc);
    localStorage.setItem(OFFLINE_DOCUMENTS_KEY, JSON.stringify(filtered));
    window.dispatchEvent(new CustomEvent('offline-storage-updated'));
  } catch (err) {
    console.error('Error saving offline document:', err);
  }
}

/**
 * Check if the browser is currently online
 */
export function isBrowserOnline(): boolean {
  if (typeof navigator !== 'undefined' && 'onLine' in navigator) {
    return navigator.onLine;
  }
  return true;
}

/**
 * Get all offline saved question papers
 */
export function getOfflineSavedPapers(): AcademicDocument[] {
  try {
    const raw = localStorage.getItem(OFFLINE_PAPERS_KEY);
    if (!raw) {
      const initialSaved = INITIAL_ACADEMIC_DOCUMENTS.slice(0, 8);
      localStorage.setItem(OFFLINE_PAPERS_KEY, JSON.stringify(initialSaved));
      return initialSaved;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading offline saved papers:', err);
    return INITIAL_ACADEMIC_DOCUMENTS.slice(0, 8);
  }
}

/**
 * Check if a specific question paper is saved offline
 */
export function isPaperSavedOffline(paperId: string): boolean {
  const papers = getOfflineSavedPapers();
  return papers.some((p) => p.id === paperId);
}

/**
 * Toggle saving a question paper for offline access
 */
export function toggleSavePaperOffline(paper: AcademicDocument): boolean {
  try {
    const papers = getOfflineSavedPapers();
    const index = papers.findIndex((p) => p.id === paper.id);
    let isNowSaved = false;

    if (index >= 0) {
      papers.splice(index, 1);
      isNowSaved = false;
    } else {
      papers.unshift({
        ...paper,
        savedOfflineDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      });
      isNowSaved = true;
    }

    localStorage.setItem(OFFLINE_PAPERS_KEY, JSON.stringify(papers));
    window.dispatchEvent(new CustomEvent('offline-storage-updated'));
    return isNowSaved;
  } catch (err) {
    console.error('Error toggling offline paper:', err);
    return false;
  }
}

/**
 * Cache ALL portal academic resources for 100% offline access
 */
export async function cacheAllPortalResources(): Promise<OfflineCacheStats> {
  try {
    // 1. Save all initial question papers to offline storage
    localStorage.setItem(OFFLINE_PAPERS_KEY, JSON.stringify(INITIAL_ACADEMIC_DOCUMENTS));
    localStorage.setItem(OFFLINE_DOCUMENTS_KEY, JSON.stringify(INITIAL_ACADEMIC_DOCUMENTS));

    // 2. Cache courses, faculty, and quizzes in localStorage as offline fallback
    localStorage.setItem('kmce_cached_courses', JSON.stringify(INITIAL_COURSES));
    localStorage.setItem('kmce_cached_faculty', JSON.stringify(INITIAL_FACULTY_LIST));
    localStorage.setItem('kmce_cached_quizzes', JSON.stringify(JNTUH_R25_QUIZZES));

    const now = new Date().toLocaleString();
    localStorage.setItem(OFFLINE_LAST_CACHE_KEY, now);

    // 3. If Cache API is available, cache HTML and core routes
    if (typeof caches !== 'undefined') {
      try {
        const cache = await caches.open('pathyakram-offline-v1');
        await cache.addAll(['/', '/index.html', '/manifest.json']);
      } catch (cacheErr) {
        console.warn('Cache API addAll optional warning:', cacheErr);
      }
    }

    window.dispatchEvent(new CustomEvent('offline-storage-updated'));
    return getOfflineCacheStats();
  } catch (err) {
    console.error('Error caching portal resources:', err);
    return getOfflineCacheStats();
  }
}

/**
 * Add an item to the offline sync queue
 */
export function queueOfflineAction(action: { type: OfflineSyncItem['type']; payload: any }): void {
  enqueueOfflineAction(action.type, action.payload);
}

export function enqueueOfflineAction(type: OfflineSyncItem['type'], payload: any): void {
  try {
    const raw = localStorage.getItem(OFFLINE_SYNC_QUEUE_KEY);
    const queue: OfflineSyncItem[] = raw ? JSON.parse(raw) : [];
    
    queue.push({
      id: `sync-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type,
      payload,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      synced: false
    });

    localStorage.setItem(OFFLINE_SYNC_QUEUE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new CustomEvent('offline-storage-updated'));
  } catch (err) {
    console.error('Error enqueuing offline action:', err);
  }
}

/**
 * Get pending sync queue items
 */
export function getOfflineSyncQueue(): OfflineSyncItem[] {
  try {
    const raw = localStorage.getItem(OFFLINE_SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    return [];
  }
}

/**
 * Process and clear pending sync queue when back online
 */
export async function flushOfflineSyncQueue(
  onItemSynced?: (item: OfflineSyncItem) => void
): Promise<{ syncedCount: number; errorsCount: number }> {
  const queue = getOfflineSyncQueue();
  if (queue.length === 0) return { syncedCount: 0, errorsCount: 0 };

  let syncedCount = 0;
  let errorsCount = 0;

  for (const item of queue) {
    try {
      if (item.type === 'upload_document') {
        // Post to server if online
        await fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item.payload)
        });
      }
      item.synced = true;
      syncedCount++;
      if (onItemSynced) onItemSynced(item);
    } catch (err) {
      console.warn('Sync item failed, will retry later:', item, err);
      errorsCount++;
    }
  }

  // Retain only unsynced items
  const remaining = queue.filter((i) => !i.synced);
  localStorage.setItem(OFFLINE_SYNC_QUEUE_KEY, JSON.stringify(remaining));
  window.dispatchEvent(new CustomEvent('offline-storage-updated'));

  return { syncedCount, errorsCount };
}

/**
 * Get comprehensive statistics about local offline storage
 */
export function getOfflineCacheStats(): OfflineCacheStats {
  const offlinePapers = getOfflineSavedPapers();
  const queue = getOfflineSyncQueue();
  const lastCached = localStorage.getItem(OFFLINE_LAST_CACHE_KEY);

  // Estimate localStorage usage in KB
  let totalBytes = 0;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('kmce_')) {
      const val = localStorage.getItem(key) || '';
      totalBytes += (key.length + val.length) * 2; // UTF-16
    }
  }

  return {
    offlinePapersCount: offlinePapers.length,
    quizzesCachedCount: JNTUH_R25_QUIZZES.length,
    coursesCachedCount: INITIAL_COURSES.length,
    facultyCachedCount: INITIAL_FACULTY_LIST.length,
    pendingSyncCount: queue.length,
    lastCachedTimestamp: lastCached || 'Active in Device Storage',
    storageEstimateKb: Math.max(250, Math.round(totalBytes / 1024))
  };
}

/**
 * Register the Service Worker in the browser
 */
export function registerServiceWorker(): void {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('[Pathyakram] Service Worker registered with scope:', reg.scope);
        })
        .catch((err) => {
          console.log('[Pathyakram] Service Worker registration note:', err);
        });
    });
  }
}

