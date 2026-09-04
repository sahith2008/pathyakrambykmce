import React, { useState, useMemo, useEffect } from 'react';
import {
  BookOpen,
  Calendar,
  Download,
  Eye,
  FileText,
  Filter,
  PlusCircle,
  Search,
  Sparkles,
  TrendingUp,
  X,
  HardDrive,
  CheckCircle2,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { AcademicDocument, BranchCode } from '../types';
import { PaperPreviewModal } from './PaperPreviewModal';
import { isPaperSavedOffline, toggleSavePaperOffline } from '../utils/offlineStorage';
import { motion } from 'motion/react';

const listContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface QuestionPapersViewProps {
  documents: AcademicDocument[];
  onOpenUpload: () => void;
  userRole: 'student' | 'faculty' | 'hod_admin' | null;
  userBranch?: BranchCode;
  isOnline?: boolean;
}

export const QuestionPapersView: React.FC<QuestionPapersViewProps> = ({
  documents,
  onOpenUpload,
  userRole,
  userBranch,
  isOnline = true,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<string>(userBranch || 'ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [selectedYear, setSelectedYear] = useState<string>('ALL');
  const [selectedExamType, setSelectedExamType] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [offlineFilterOnly, setOfflineFilterOnly] = useState<boolean>(false);
  const [storageTrigger, setStorageTrigger] = useState(0);

  const [previewPaper, setPreviewPaper] = useState<AcademicDocument | null>(null);
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setStorageTrigger((prev) => prev + 1);
    };
    window.addEventListener('offline-storage-updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('offline-storage-updated', handleStorageUpdate);
    };
  }, []);

  // Filter papers only (or include relevant documents)
  const questionPapers = useMemo(() => {
    return documents.filter((doc) => doc.type === 'question_paper');
  }, [documents]);

  const filteredPapers = useMemo(() => {
    return questionPapers.filter((doc) => {
      // Offline filter
      if (offlineFilterOnly && !isPaperSavedOffline(doc.id)) {
        return false;
      }
      // Branch filter
      if (selectedBranch !== 'ALL' && doc.branch !== selectedBranch && doc.branch !== 'ALL') {
        return false;
      }
      // Semester filter
      if (selectedSemester !== 'ALL' && doc.semester !== Number(selectedSemester)) {
        return false;
      }
      // Academic Year filter
      if (selectedYear !== 'ALL' && doc.academicYear !== selectedYear) {
        return false;
      }
      // Exam Type filter
      if (selectedExamType !== 'ALL' && doc.examType !== selectedExamType) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title.toLowerCase().includes(q);
        const matchesCode = doc.subjectCode.toLowerCase().includes(q);
        const matchesSubject = doc.subjectName.toLowerCase().includes(q);
        const matchesDesc = (doc.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesCode && !matchesSubject && !matchesDesc) {
          return false;
        }
      }
      return true;
    });
  }, [questionPapers, selectedBranch, selectedSemester, selectedYear, selectedExamType, searchQuery, offlineFilterOnly, storageTrigger]);

  const handleDownload = (paper: AcademicDocument) => {
    // Save to local cache as well
    toggleSavePaperOffline(paper);
    paper.downloadCount = (paper.downloadCount || 0) + 1;
    setDownloadSuccessToast(`Downloaded & Saved "${paper.subjectCode} - ${paper.title}" to offline storage.`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 4000);
  };

  const handleToggleOffline = (paper: AcademicDocument, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowSaved = toggleSavePaperOffline(paper);
    setDownloadSuccessToast(
      isNowSaved
        ? `Saved "${paper.subjectCode}" for offline study without internet.`
        : `Removed "${paper.subjectCode}" from offline saved storage.`
    );
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  const clearFilters = () => {
    setSelectedBranch('ALL');
    setSelectedSemester('ALL');
    setSelectedYear('ALL');
    setSelectedExamType('ALL');
    setSearchQuery('');
    setOfflineFilterOnly(false);
  };

  const hasActiveFilters =
    selectedBranch !== 'ALL' ||
    selectedSemester !== 'ALL' ||
    selectedYear !== 'ALL' ||
    selectedExamType !== 'ALL' ||
    offlineFilterOnly ||
    searchQuery.trim() !== '';

  return (
    <div className="space-y-6">
      {/* Header Banner with Filter Overview & Quick Upload */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#800020] dark:bg-[#4a0013] text-white shadow-lg border border-[#68001a]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 border border-white/30 text-[10px] font-bold uppercase tracking-widest">
                JNTUH R25 / R22 Repository
              </span>
              <span className="text-xs text-rose-100">
                {filteredPapers.length} Question Papers Available
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light">
              Previous Year <span className="font-bold">Question Papers (PYQPs)</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
              Access, view in exam reader format, and download previous semester mid-term & end-semester question papers branch-wise for CSE, CSM, and ECE.
            </p>
          </div>

          {(userRole === 'faculty' || userRole === 'hod_admin') && (
            <button
              onClick={onOpenUpload}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-[#800020] hover:bg-rose-50 font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#800020]" />
              <span>Upload New Question Paper</span>
            </button>
          )}
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Download Success Toast */}
      {downloadSuccessToast && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-1">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-emerald-600 animate-bounce" />
            <span>{downloadSuccessToast}</span>
          </div>
          <button onClick={() => setDownloadSuccessToast(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Multi-facet Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        {/* Search & Clear Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject name, course code (e.g. CS402PC, AI501PC), or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Filter Dropdowns & Branch Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          {/* Branch Pill Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Engineering Branch
            </label>
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              {['ALL', 'CSE', 'CSM', 'ECE'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBranch(b)}
                  className={`py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedBranch === b
                      ? 'bg-[#800020] text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#800020] dark:hover:text-white'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Semester Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="ALL">All Semesters (Sem 1 - 8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem} ({sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year'})
                </option>
              ))}
            </select>
          </div>

          {/* Academic Year Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Academic Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="ALL">All Years</option>
              <option value="2024-25">2024-25 (Current R25)</option>
              <option value="2023-24">2023-24 (R22)</option>
              <option value="2022-23">2022-23 (R22)</option>
              <option value="2021-22">2021-22 (R18)</option>
            </select>
          </div>

          {/* Exam Type Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1">
              Examination Type
            </label>
            <select
              value={selectedExamType}
              onChange={(e) => setSelectedExamType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
            >
              <option value="ALL">All Exam Types</option>
              <option value="Semester Regular">Semester End Regular</option>
              <option value="Mid-1">Mid-Term 1</option>
              <option value="Mid-2">Mid-Term 2</option>
              <option value="Semester Supplementary">Supplementary</option>
              <option value="Model Paper">Faculty Model Paper</option>
            </select>
          </div>
        </div>

        {/* Offline Saved Filter Toggle Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
          <button
            type="button"
            id="filter-offline-saved-btn"
            onClick={() => setOfflineFilterOnly(!offlineFilterOnly)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
              offlineFilterOnly
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <HardDrive className={`w-3.5 h-3.5 ${offlineFilterOnly ? 'text-white' : 'text-emerald-500'}`} />
            <span>Show Only Offline Saved Papers</span>
            {offlineFilterOnly && <span className="bg-white/20 px-1.5 py-0.2 rounded-full text-[10px]">Active</span>}
          </button>

          <span className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:inline">
            💡 Tap the bookmark or download icon on any paper to make it 100% available without internet.
          </span>
        </div>
      </div>

      {/* Question Papers Grid */}
      {filteredPapers.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            {offlineFilterOnly ? 'No Offline Saved Papers Found' : 'No Question Papers Found'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            {offlineFilterOnly
              ? 'You have not saved any question papers for offline use yet. Turn off the filter or click "Save for Offline" on any paper card.'
              : 'Try adjusting your branch, semester, or exam type filters to view available university papers.'}
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 px-4 py-2 rounded-xl bg-[#800020] text-white text-xs font-semibold hover:bg-[#68001a] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <motion.div
          key={`${selectedBranch}-${selectedSemester}-${selectedYear}-${selectedExamType}-${offlineFilterOnly}-${searchQuery}`}
          variants={listContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredPapers.map((paper) => {
            const isSavedOffline = isPaperSavedOffline(paper.id);
            return (
              <motion.div
                key={paper.id}
                variants={listItemVariants}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 hover:shadow-md transition-[border-color,box-shadow] relative"
              >
                <div>
                  {/* Badges: Branch, Sem, Exam Type & Offline Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                        {paper.branch}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-[11px] font-semibold border border-stone-200 dark:border-stone-700">
                        Sem {paper.semester}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/50 text-[#800020] dark:text-rose-300 text-[10px] font-semibold">
                        {paper.curriculum}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isSavedOffline && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Offline</span>
                        </span>
                      )}
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          paper.examType === 'Semester Regular'
                            ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                            : paper.examType === 'Mid-1' || paper.examType === 'Mid-2'
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                            : 'bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300'
                        }`}
                      >
                        {paper.examType}
                      </span>
                    </div>
                  </div>

                  {/* Subject Code & Title */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono-code font-bold text-[#800020] dark:text-rose-400">
                        {paper.subjectCode}
                      </span>
                      <button
                        onClick={(e) => handleToggleOffline(paper, e)}
                        className={`p-1 rounded-lg transition-colors cursor-pointer ${
                          isSavedOffline
                            ? 'text-emerald-600 dark:text-emerald-400 hover:text-rose-600'
                            : 'text-slate-400 hover:text-[#800020]'
                        }`}
                        title={isSavedOffline ? 'Saved offline (click to remove)' : 'Save for offline access'}
                        aria-label="Toggle offline saving"
                      >
                        {isSavedOffline ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      </button>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#800020] dark:group-hover:text-rose-300 transition-colors mt-0.5 line-clamp-2">
                      {paper.title}
                    </h3>
                  </div>

                  {/* Description */}
                  {paper.description && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                      {paper.description}
                    </p>
                  )}
                </div>

                {/* Footer Meta & Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-3">
                    <span>Uploaded by: <strong className="text-slate-700 dark:text-slate-300">{paper.uploadedBy.split('(')[0]}</strong></span>
                    <span>{paper.academicYear}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewPaper(paper)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/80 text-[#800020] dark:text-rose-300 text-xs font-bold transition-colors cursor-pointer border border-rose-200 dark:border-rose-800"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View in Reader</span>
                    </button>

                    <button
                      onClick={() => handleDownload(paper)}
                      className={`flex items-center justify-center p-2 rounded-xl transition-colors cursor-pointer ${
                        isSavedOffline
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                      title={`Download & Cache PDF (${paper.fileSize})`}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Paper Preview Modal */}
      {previewPaper && (
        <PaperPreviewModal
          paper={previewPaper}
          onClose={() => setPreviewPaper(null)}
          onDownload={handleDownload}
        />
      )}
    </div>
  );
};
