import React, { useState } from 'react';
import {
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  LogOut,
  Moon,
  Phone,
  ShieldCheck,
  Sun,
  User,
  X,
  Menu,
  Wifi,
  WifiOff,
  HardDrive,
  DownloadCloud
} from 'lucide-react';
import { FacultyProfile, PushNotification, StudentProfile } from '../types';
import { KMCE_COLLEGE_INFO } from '../data/mockData';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  currentUser: StudentProfile | FacultyProfile | null;
  userRole: 'student' | 'faculty' | 'hod_admin' | null;
  onLogout: () => void;
  notifications: PushNotification[];
  onMarkNotificationRead: (id: string) => void;
  onClearAllNotifications: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickHelp: () => void;
  isOnline?: boolean;
  isSimulatedOffline?: boolean;
  onOpenOfflineSyncCenter?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  currentUser,
  userRole,
  onLogout,
  notifications,
  onMarkNotificationRead,
  onClearAllNotifications,
  activeTab,
  setActiveTab,
  onOpenQuickHelp,
  isOnline = true,
  isSimulatedOffline = false,
  onOpenOfflineSyncCenter,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const effectiveOnline = isOnline && !isSimulatedOffline;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      {/* Top Notification Announcement Bar in Rich Collegiate Maroon */}
      <div className="bg-gradient-to-r from-[#4a0413] via-[#800020] to-[#9f1239] text-white text-xs py-1.5 px-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              JNTUH R25 Active
            </span>
            <span className="truncate">
              ⚡ <strong>Pathyakram Portal:</strong> B.Tech CSE, CSM & ECE Question Papers, R25 Lesson Plans & AI Quizzes Online
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 shrink-0 text-rose-100 text-[11px]">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-rose-200" />
              Academic Year 2024–2025
            </span>
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-rose-200" />
              Exam Branch: +91-40-27561234
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Banner with KMCE College Identity & Professional Polish styling */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & College Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('papers')}>
            <div className="w-10 h-10 bg-[#800020] hover:bg-[#630018] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md border border-rose-300/30 shrink-0 transition-colors">
              K
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold leading-tight tracking-wider text-[#800020] dark:text-rose-100">
                  PATHYAKRAM
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  R25
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                KMCE Academic Portal
              </p>
            </div>
          </div>

          {/* Action Icons: Notifications, Dark Mode Pill Toggle, User Profile & Exit */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Offline / Online Network Status Badge */}
            <button
              id="header-offline-status-btn"
              onClick={onOpenOfflineSyncCenter}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                effectiveOnline
                  ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/70 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/50 dark:hover:bg-amber-950/80 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 animate-pulse'
              }`}
              title="Click to open Offline Sync & Cache Manager"
            >
              {effectiveOnline ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="hidden sm:inline text-[11px]">Cloud Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[11px] font-bold">Offline Mode</span>
                </>
              )}
            </button>

            {/* Quick Contact Link */}
            <button
              id="header-contact-btn"
              onClick={() => setActiveTab('contact')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#800020] dark:hover:text-rose-300 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#800020] dark:text-rose-400" />
              <span>Campus Helpline</span>
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                id="header-notifications-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50/60 dark:hover:bg-rose-950/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#800020]"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#800020] text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-xl ring-1 ring-black/10 dark:ring-white/10 z-50 border border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#800020] dark:text-rose-400" />
                      <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
                        Schedule Updates & Alerts
                      </h3>
                      {unreadCount > 0 && (
                        <span className="bg-rose-100 dark:bg-rose-950/80 text-[#800020] dark:text-rose-300 text-xs px-2 py-0.5 rounded-full font-bold">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <button
                      onClick={onClearAllNotifications}
                      className="text-xs text-[#800020] dark:text-rose-400 hover:underline font-bold"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="mt-3 max-h-80 overflow-y-auto space-y-2.5 pr-1">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-xs">
                        No active notifications. You are up to date!
                      </div>
                    ) : (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => onMarkNotificationRead(notif.id)}
                          className={`p-3 rounded-xl transition-all cursor-pointer border ${
                            notif.read
                              ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400'
                              : 'bg-rose-50/60 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800 text-slate-900 dark:text-slate-100 font-medium'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                                notif.priority === 'urgent'
                                  ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                                  : notif.priority === 'high'
                                  ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {notif.category}
                            </span>
                            <span className="text-[11px] text-slate-400 shrink-0">{notif.timestamp}</span>
                          </div>
                          <h4 className="text-xs font-semibold mt-1.5 text-slate-900 dark:text-slate-100">
                            {notif.title}
                          </h4>
                          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {notif.message}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle Pill */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-1 border border-slate-200 dark:border-slate-700">
              <button
                id="header-theme-light-btn"
                onClick={() => setDarkMode(false)}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                  !darkMode ? 'bg-white text-[#800020] font-bold shadow-xs' : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Light Theme"
                aria-label="Light Theme"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                id="header-theme-dark-btn"
                onClick={() => setDarkMode(true)}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                  darkMode ? 'bg-[#800020] text-white shadow-xs' : 'text-slate-400 hover:text-slate-600'
                }`}
                title="Dark Theme"
                aria-label="Dark Theme"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Active User Badge / Switch Login */}
            {currentUser && (
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200 dark:border-slate-800">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {currentUser.name}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    {userRole === 'student'
                      ? (currentUser as StudentProfile).hallticket
                      : (currentUser as FacultyProfile).empId}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-[#800020] dark:text-rose-300 font-bold text-xs shrink-0">
                  {currentUser.name
                    .split(' ')
                    .filter(Boolean)
                    .map((n) => n[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase() || 'KM'}
                </div>

                <button
                  id="header-logout-btn"
                  onClick={onLogout}
                  className="p-2 rounded-xl text-slate-500 hover:text-[#800020] hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  title="Switch User / Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              id="header-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-rose-50 dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-2 animate-in fade-in duration-150">
            {userRole === 'faculty' || userRole === 'hod_admin' ? (
              <>
                <button
                  onClick={() => { setActiveTab('upload'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'upload' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Faculty Upload Hub</span>
                </button>
                <button
                  onClick={() => { setActiveTab('courses'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'courses' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Branch Courses</span>
                </button>
                <button
                  onClick={() => { setActiveTab('papers'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'papers' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Question Papers</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { setActiveTab('papers'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'papers' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Question Papers</span>
                </button>
                <button
                  onClick={() => { setActiveTab('quiz'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'quiz' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>R25 AI Quizzes</span>
                </button>
                <button
                  onClick={() => { setActiveTab('faculty'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'faculty' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>HOD & Faculty</span>
                </button>
                <button
                  onClick={() => { setActiveTab('contact'); setMobileMenuOpen(false); }}
                  className={`p-2.5 rounded-xl text-xs font-semibold text-left flex items-center gap-2 ${
                    activeTab === 'contact' ? 'bg-[#800020] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  <span>KMCE Info & Contact</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
