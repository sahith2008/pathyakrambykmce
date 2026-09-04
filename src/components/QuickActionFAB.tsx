import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  GraduationCap,
  FileUp,
  Users,
  BookOpen,
  CheckCircle2,
  X,
  Plus,
  Compass,
  ArrowRight,
} from 'lucide-react';

interface QuickActionFABProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'student' | 'faculty' | 'hod_admin' | null;
}

export const QuickActionFAB: React.FC<QuickActionFABProps> = ({
  activeTab,
  setActiveTab,
  userRole,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const fabRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fabRef.current && !fabRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleAction = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  const quickActions = [
    {
      id: 'quiz',
      label: 'Take New Quiz',
      sublabel: 'JNTUH R25 AI assessment',
      icon: GraduationCap,
      color: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      badge: 'Instant Score',
      badgeClass: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
    {
      id: 'upload',
      label: 'Upload Document',
      sublabel: 'Add PYQPs & syllabus notes',
      icon: FileUp,
      color: 'bg-[#800020] hover:bg-[#66001a] text-white',
      badge: userRole === 'faculty' || userRole === 'hod_admin' ? 'Faculty Portal' : 'Staff Upload',
      badgeClass: 'bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 border-rose-200 dark:border-rose-800',
    },
    {
      id: 'faculty',
      label: 'HOD & Faculty Directory',
      sublabel: 'View heads & cabin contacts',
      icon: Users,
      color: 'bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600',
      badge: 'Cabin & Phone',
      badgeClass: 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700',
    },
    {
      id: 'papers',
      label: 'Question Papers Archive',
      sublabel: 'Past mid & sem exam papers',
      icon: BookOpen,
      color: 'bg-stone-700 hover:bg-stone-800 text-white',
      badge: 'R25 / R22',
      badgeClass: 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-300 border-stone-200 dark:border-stone-700',
    },
    {
      id: 'attendance',
      label: 'Attendance Calculator',
      sublabel: '75% mandatory threshold check',
      icon: CheckCircle2,
      color: 'bg-amber-600 hover:bg-amber-700 text-white',
      badge: 'Safe Bunk Calc',
      badgeClass: 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    },
  ];

  return (
    <div
      ref={fabRef}
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none"
      id="kmce-quick-navigation-fab-container"
    >
      {/* Expanded Quick Action Menu */}
      {isOpen && (
        <div
          id="kmce-fab-menu"
          className="pointer-events-auto mb-3 w-80 sm:w-88 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 overflow-hidden transform transition-all duration-200 ease-out animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#800020] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Quick Navigation Hub
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Direct shortcuts to frequent college tasks
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Menu"
              aria-label="Close Quick Navigation Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action items list */}
          <div className="p-2 space-y-1.5 max-h-[70vh] overflow-y-auto">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const isCurrent = activeTab === action.id;
              return (
                <button
                  key={action.id}
                  id={`fab-action-${action.id}`}
                  onClick={() => handleAction(action.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all group cursor-pointer ${
                    isCurrent
                      ? 'bg-rose-50 dark:bg-[#800020]/20 border border-[#800020]/30'
                      : 'hover:bg-slate-100/80 dark:hover:bg-slate-800/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105 ${action.color}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#800020] dark:group-hover:text-rose-300 truncate">
                          {action.label}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#800020] text-white">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {action.sublabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pl-2 shrink-0">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${action.badgeClass}`}
                    >
                      {action.badge}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Footer info */}
          <div className="px-3 py-2 bg-slate-50/70 dark:bg-slate-950/40 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span className="font-semibold text-slate-600 dark:text-slate-300">
              KMCE Portal v2.5
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Fast Actions Ready
            </span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <div className="relative pointer-events-auto group">
        {/* Floating Tooltip when closed */}
        {!isOpen && (
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none hidden sm:flex items-center gap-1.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 dark:text-amber-500" />
            <span>Quick Actions</span>
          </div>
        )}

        <button
          id="kmce-fab-trigger-btn"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-13 h-13 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 transform active:scale-95 cursor-pointer border-2 ${
            isOpen
              ? 'bg-slate-900 dark:bg-slate-800 text-white border-white/20 rotate-90 scale-105'
              : 'bg-[#800020] hover:bg-[#66001a] text-white border-white/30 hover:scale-110 shadow-[#800020]/30'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Quick navigation actions menu"
          title={isOpen ? 'Close quick menu' : 'Open quick menu'}
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Plus className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-300"></span>
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
