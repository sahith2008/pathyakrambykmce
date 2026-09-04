import React, { useState, useEffect } from 'react';
import {
  AcademicDocument,
  BranchCode,
  FacultyProfile,
  PushNotification,
  StudentProfile,
} from './types';
import {
  INITIAL_ACADEMIC_DOCUMENTS,
  INITIAL_NOTIFICATIONS,
  DEMO_STUDENT_PROFILES,
} from './data/mockData';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { AuthScreen } from './components/AuthScreen';
import { QuestionPapersView } from './components/QuestionPapersView';
import { QuizView } from './components/QuizView';
import { AttendanceTrackerView } from './components/AttendanceTrackerView';
import { FacultyDirectoryView } from './components/FacultyDirectoryView';
import { CourseListingsView } from './components/CourseListingsView';
import { FacultyUploadView } from './components/FacultyUploadView';
import { CollegeInfoView } from './components/CollegeInfoView';
import { OfflineSyncCenterModal } from './components/OfflineSyncCenterModal';
import { QuickActionFAB } from './components/QuickActionFAB';
import {
  initOfflineStorage,
  getOfflineDocuments,
  saveOfflineDocument,
  queueOfflineAction,
  flushOfflineSyncQueue,
} from './utils/offlineStorage';
import { WifiOff, HardDrive, RefreshCw } from 'lucide-react';

export default function App() {
  // Theme Mode state (Defaults to Light Mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kmce_dark_mode');
    return saved === 'true'; // Defaults to false (Light Mode)
  });

  // Current Logged-in Profile (starts at null to show Student & Faculty Login page)
  const [studentUser, setStudentUser] = useState<StudentProfile | null>(() => {
    const saved = localStorage.getItem('kmce_student_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [facultyUser, setFacultyUser] = useState<FacultyProfile | null>(() => {
    const saved = localStorage.getItem('kmce_faculty_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeTab, setActiveTab] = useState<string>('papers');

  // Offline / Network Status States
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(() => {
    return localStorage.getItem('kmce_simulate_offline') === 'true';
  });
  const [showOfflineModal, setShowOfflineModal] = useState<boolean>(false);

  // Documents Repository state
  const [documents, setDocuments] = useState<AcademicDocument[]>(() => {
    // Initialize offline cache with default docs
    initOfflineStorage(INITIAL_ACADEMIC_DOCUMENTS);
    const cached = getOfflineDocuments();
    return cached.length > 0 ? cached : INITIAL_ACADEMIC_DOCUMENTS;
  });

  // Push Notifications state
  const [notifications, setNotifications] = useState<PushNotification[]>(INITIAL_NOTIFICATIONS);

  // Sync network state listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      flushOfflineSyncQueue().catch(console.error);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Initial flush if online
    if (navigator.onLine) {
      flushOfflineSyncQueue().catch(console.error);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync dark mode class with HTML root
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('kmce_dark_mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Sync student session
  useEffect(() => {
    if (studentUser) {
      localStorage.setItem('kmce_student_session', JSON.stringify(studentUser));
    } else {
      localStorage.removeItem('kmce_student_session');
    }
  }, [studentUser]);

  // Sync faculty session
  useEffect(() => {
    if (facultyUser) {
      localStorage.setItem('kmce_faculty_session', JSON.stringify(facultyUser));
    } else {
      localStorage.removeItem('kmce_faculty_session');
    }
  }, [facultyUser]);

  const handleLoginStudent = (student: StudentProfile) => {
    setStudentUser(student);
    setFacultyUser(null);
    setActiveTab('papers');
  };

  const handleLoginFaculty = (faculty: FacultyProfile) => {
    setFacultyUser(faculty);
    setStudentUser(null);
    setActiveTab('upload');
  };

  const handleLogout = () => {
    setStudentUser(null);
    setFacultyUser(null);
    localStorage.removeItem('kmce_student_session');
    localStorage.removeItem('kmce_faculty_session');
  };

  const handleAddDocument = (newDoc: AcademicDocument) => {
    setDocuments((prev) => [newDoc, ...prev]);
    saveOfflineDocument(newDoc);
    if (!isOnline || isSimulatedOffline) {
      queueOfflineAction({
        type: 'upload_document',
        payload: newDoc,
      });
    }
  };

  const handleDeleteDocument = (docId: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== docId));
  };

  const handleSendPushNotification = (
    title: string,
    message: string,
    category: 'schedule_update' | 'exam_paper' | 'lesson_plan',
    branch?: BranchCode
  ) => {
    const newNotif: PushNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      timestamp: 'Just now',
      read: false,
      category: category === 'schedule_update' ? 'schedule' : category === 'exam_paper' ? 'exam' : 'general',
      priority: 'high',
      targetBranch: branch || 'ALL',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Determine current user role
  const userRole: 'student' | 'faculty' | 'hod_admin' | null = facultyUser
    ? facultyUser.isHod
      ? 'hod_admin'
      : 'faculty'
    : studentUser
    ? 'student'
    : null;

  const currentBranch = studentUser?.branch || (facultyUser?.department !== 'ADMIN' ? facultyUser?.department : 'CSE') || 'CSE';
  const currentUser = studentUser || facultyUser;
  const effectiveOnline = isOnline && !isSimulatedOffline;

  // If no user is logged in, show the sleek Glassmorphic Auth Screen
  if (!studentUser && !facultyUser) {
    return (
      <AuthScreen
        onLoginStudent={handleLoginStudent}
        onLoginFaculty={handleLoginFaculty}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* KMCE Header with Navigation and Offline Pill */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        userRole={userRole}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onClearAllNotifications={handleClearAllNotifications}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickHelp={() => setActiveTab('contact')}
        isOnline={isOnline}
        isSimulatedOffline={isSimulatedOffline}
        onOpenOfflineSyncCenter={() => setShowOfflineModal(true)}
      />

      {/* Offline Alert Strip if disconnected or simulated */}
      {!effectiveOnline && (
        <div className="bg-amber-500 text-slate-950 font-bold px-4 py-2 text-xs flex items-center justify-between gap-2 shadow-xs z-30">
          <div className="flex items-center gap-2 max-w-5xl mx-auto w-full justify-between">
            <div className="flex items-center gap-2">
              <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>
                <strong>Offline Mode Active:</strong> You can continue studying question papers, practicing offline AI quizzes, and viewing faculty directories without internet connection.
              </span>
            </div>
            <button
              onClick={() => setShowOfflineModal(true)}
              className="px-2.5 py-1 bg-slate-950 text-amber-300 hover:bg-slate-900 rounded-lg text-[11px] font-bold shrink-0 cursor-pointer"
            >
              Offline Manager
            </button>
          </div>
        </div>
      )}

      {/* Responsive Navigation Menu below Header */}
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        uploadedCount={documents.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {activeTab === 'papers' && (
          <QuestionPapersView
            documents={documents}
            onOpenUpload={() => setActiveTab('upload')}
            userRole={userRole}
            userBranch={currentBranch}
            isOnline={effectiveOnline}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            userBranch={currentBranch}
            studentName={studentUser?.name || facultyUser?.name || 'KMCE Scholar'}
            studentHallTicket={studentUser?.hallticket || facultyUser?.empId || '23KM1A0542'}
          />
        )}

        {activeTab === 'attendance' && (
          <AttendanceTrackerView
            currentStudent={studentUser}
            userBranch={currentBranch}
          />
        )}

        {activeTab === 'faculty' && <FacultyDirectoryView />}

        {activeTab === 'courses' && (
          <CourseListingsView
            userBranch={currentBranch}
            onSelectSubjectForPapers={(code) => {
              setActiveTab('papers');
            }}
          />
        )}

        {activeTab === 'upload' && (
          <FacultyUploadView
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
            currentFaculty={facultyUser}
            onSendPushNotification={handleSendPushNotification}
          />
        )}

        {activeTab === 'contact' && <CollegeInfoView />}
      </main>

      {/* Floating Action Button for Fast Dashboard Navigation */}
      <QuickActionFAB
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
      />

      {/* Offline Sync Center Modal */}
      {showOfflineModal && (
        <OfflineSyncCenterModal
          onClose={() => setShowOfflineModal(false)}
          isOnline={isOnline}
          isSimulatedOffline={isSimulatedOffline}
          onToggleSimulateOffline={() => {
            const next = !isSimulatedOffline;
            setIsSimulatedOffline(next);
            localStorage.setItem('kmce_simulate_offline', String(next));
          }}
        />
      )}

      {/* Professional Polish Footer */}
      <footer className="no-print mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-3.5 px-4 sm:px-6 lg:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <span>&copy; {new Date().getFullYear()} KMCE Pathyakram</span>
            <span>|</span>
            <span className="text-[#800020] dark:text-rose-400">JNTUH R25 COMPLIANT</span>
            <span>|</span>
            <span className="hidden sm:inline">CSE • CSM • ECE Programs</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowOfflineModal(true)}
              className="flex items-center gap-1.5 text-[10px] font-bold text-slate-600 dark:text-slate-300 hover:text-[#800020] dark:hover:text-rose-400 cursor-pointer"
            >
              <HardDrive className="w-3 h-3 text-emerald-500" />
              <span>Offline Cache: Active</span>
            </button>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                {effectiveOnline ? 'Academic Cloud Online' : 'Offline Storage Engine'}
              </span>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="text-[10px] font-bold text-[#800020] dark:text-rose-400 uppercase tracking-widest hover:underline cursor-pointer"
            >
              Administration
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

