import React from 'react';
import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileUp,
  GraduationCap,
  Info,
  Layers,
  Sparkles,
  Users,
} from 'lucide-react';

interface NavigationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: 'student' | 'faculty' | 'hod_admin' | null;
  uploadedCount: number;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  uploadedCount,
}) => {
  const tabs = [
    {
      id: 'papers',
      label: 'Question Papers (PYQPs)',
      icon: BookOpen,
      badge: 'R25 / R22',
      badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-[#800020] dark:text-rose-300 border border-rose-200 dark:border-rose-800'
    },
    {
      id: 'quiz',
      label: 'JNTUH R25 AI Quiz Hub',
      icon: GraduationCap,
      badge: 'AI Instant Score',
      badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
    },
    {
      id: 'attendance',
      label: 'Attendance Tracker',
      icon: CheckCircle2,
      badge: '75% Calc',
      badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
    },
    {
      id: 'faculty',
      label: 'HOD & Faculty Directory',
      icon: Users,
      badge: 'Admin Ref',
      badgeColor: 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
    },
    {
      id: 'courses',
      label: 'Branch Course Listings',
      icon: Layers,
      badge: 'CSE • CSM • ECE',
      badgeColor: 'bg-rose-50 dark:bg-rose-950/60 text-[#800020] dark:text-rose-300 border border-rose-200 dark:border-rose-800'
    },
    {
      id: 'upload',
      label: 'Faculty Upload Hub',
      icon: FileUp,
      badge: userRole === 'faculty' || userRole === 'hod_admin' ? 'Faculty Portal' : 'Docs View',
      badgeColor: 'bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 border border-rose-300 dark:border-rose-700'
    },
    {
      id: 'contact',
      label: 'KMCE Info & Contact',
      icon: Info,
      badge: 'Campus',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
    }
  ];

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-8 py-2 sticky top-[77px] z-30 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-start overflow-x-auto no-scrollbar gap-2 py-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`nav-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-[#800020] hover:bg-[#68001a] text-white shadow-md shadow-rose-950/20 border border-[#580016]'
                  : 'text-slate-600 dark:text-slate-300 hover:text-[#800020] dark:hover:text-rose-200 hover:bg-rose-50/70 dark:hover:bg-rose-950/30'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#800020] dark:text-rose-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-colors ${
                    isActive ? 'bg-white/20 text-white' : tab.badgeColor
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
