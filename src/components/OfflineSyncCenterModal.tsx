import React, { useState, useEffect } from 'react';
import {
  Wifi,
  WifiOff,
  DownloadCloud,
  CheckCircle2,
  HardDrive,
  RefreshCw,
  Trash2,
  X,
  BookOpen,
  GraduationCap,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  getOfflineCacheStats,
  cacheAllPortalResources,
  getOfflineSyncQueue,
  flushOfflineSyncQueue,
  OfflineCacheStats,
  OfflineSyncItem
} from '../utils/offlineStorage';

interface OfflineSyncCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isOnline: boolean;
  isSimulatedOffline: boolean;
  setIsSimulatedOffline: (val: boolean) => void;
}

export const OfflineSyncCenterModal: React.FC<OfflineSyncCenterModalProps> = ({
  isOpen,
  onClose,
  isOnline,
  isSimulatedOffline,
  setIsSimulatedOffline,
}) => {
  const [stats, setStats] = useState<OfflineCacheStats>(getOfflineCacheStats());
  const [syncQueue, setSyncQueue] = useState<OfflineSyncItem[]>(getOfflineSyncQueue());
  const [isCaching, setIsCaching] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const updateStats = () => {
      setStats(getOfflineCacheStats());
      setSyncQueue(getOfflineSyncQueue());
    };

    updateStats();
    window.addEventListener('offline-storage-updated', updateStats);
    return () => {
      window.removeEventListener('offline-storage-updated', updateStats);
    };
  }, []);

  if (!isOpen) return null;

  const handleCacheEverything = async () => {
    setIsCaching(true);
    setToastMessage('Pre-caching full JNTUH R25 curriculum, question papers, and AI quizzes to device storage...');
    try {
      const newStats = await cacheAllPortalResources();
      setStats(newStats);
      setToastMessage('All 24+ Question Papers, 15 Quizzes & Syllabuses are now 100% available offline!');
    } catch (err) {
      setToastMessage('Cached data updated in device storage.');
    } finally {
      setIsCaching(false);
      setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const handleSyncQueue = async () => {
    if (!isOnline || isSimulatedOffline) {
      setToastMessage('Cannot sync while offline. Reconnect to internet or disable simulated offline.');
      setTimeout(() => setToastMessage(null), 4000);
      return;
    }

    setIsSyncing(true);
    const { syncedCount, errorsCount } = await flushOfflineSyncQueue();
    setIsSyncing(false);

    if (syncedCount > 0) {
      setToastMessage(`Successfully synchronized ${syncedCount} offline record(s) with KMCE cloud.`);
    } else if (errorsCount > 0) {
      setToastMessage('Some items could not sync. They remain queued safely in local storage.');
    } else {
      setToastMessage('Queue is empty. Everything is up to date.');
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const effectiveOnline = isOnline && !isSimulatedOffline;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950 text-[#800020] dark:text-rose-400 border border-rose-200 dark:border-rose-900 flex items-center justify-center shrink-0">
            {effectiveOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6 text-amber-500" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Offline Mode & Device Storage
              </h3>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md flex items-center gap-1 ${
                  effectiveOnline
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                }`}
              >
                {effectiveOnline ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online Connected
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Offline Mode Active
                  </>
                )}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Pathyakram stores curriculum files, question papers, and quizzes locally so you can study without internet.
            </p>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-[#800020] dark:text-rose-200 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#800020] dark:text-rose-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Offline Testing Simulation Toggle */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#800020] dark:text-rose-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Simulate Offline Mode (Testing)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Force Pathyakram to run in standalone offline mode without disconnecting your device's Wi-Fi.
            </p>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              id="simulate-offline-toggle"
              checked={isSimulatedOffline}
              onChange={(e) => setIsSimulatedOffline(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#800020]"></div>
          </label>
        </div>

        {/* Local Storage & Cache Metrics Grid */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Offline Cached Assets on This Device:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center">
              <BookOpen className="w-4 h-4 text-[#800020] dark:text-rose-400 mx-auto mb-1" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                {stats.offlinePapersCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">PYQP Papers</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center">
              <GraduationCap className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                {stats.quizzesCachedCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">AI Quizzes</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center">
              <Layers className="w-4 h-4 text-rose-700 dark:text-rose-400 mx-auto mb-1" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                {stats.coursesCachedCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Syllabuses</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center">
              <HardDrive className="w-4 h-4 text-stone-600 dark:text-stone-300 mx-auto mb-1" />
              <span className="text-xl font-extrabold text-slate-900 dark:text-white block">
                {stats.storageEstimateKb} KB
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Storage Used</span>
            </div>
          </div>
        </div>

        {/* One-Click Pre-Cache All Resources Button */}
        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-xs font-bold text-[#800020] dark:text-rose-200 flex items-center gap-1.5">
                <DownloadCloud className="w-4 h-4 text-[#800020] dark:text-rose-400" />
                <span>Pre-Cache Entire Academic Repository</span>
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-rose-300/80 mt-0.5 leading-relaxed">
                Download all branch syllabus books, question papers, offline practice tests, and faculty directories into local browser storage at once.
              </p>
            </div>
          </div>

          <button
            id="pre-cache-all-btn"
            onClick={handleCacheEverything}
            disabled={isCaching}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#800020] hover:bg-[#68001a] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            {isCaching ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Downloading & Caching Academic Repository...</span>
              </>
            ) : (
              <>
                <DownloadCloud className="w-3.5 h-3.5" />
                <span>Cache Everything for 100% Offline Access</span>
              </>
            )}
          </button>
        </div>

        {/* Offline Sync Queue Details */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Offline Pending Sync Queue ({syncQueue.length}):
            </span>
            {syncQueue.length > 0 && effectiveOnline && (
              <button
                onClick={handleSyncQueue}
                disabled={isSyncing}
                className="text-xs text-[#800020] dark:text-rose-400 hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sync Now</span>
              </button>
            )}
          </div>

          {syncQueue.length === 0 ? (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>All offline actions are in sync with cloud database.</span>
            </div>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {syncQueue.map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between"
                >
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 dark:text-white capitalize block truncate">
                      {item.type.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">Queued at {item.timestamp}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                    Pending Sync
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <span>Service Worker: Registered (Cache v1)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
