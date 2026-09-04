import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Moon,
  School,
  ShieldAlert,
  Sun,
  User,
  UserCheck,
  Zap,
} from 'lucide-react';
import { BranchCode, FacultyProfile, StudentProfile } from '../types';
import { DEMO_STUDENT_PROFILES, INITIAL_FACULTY_LIST, KMCE_COLLEGE_INFO } from '../data/mockData';
import kmceCampusImg from '../assets/images/kmce_campus_photo_real_1788079482219.jpg';

interface AuthScreenProps {
  onLoginStudent: (student: StudentProfile) => void;
  onLoginFaculty: (faculty: FacultyProfile) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  onLoginStudent,
  onLoginFaculty,
  darkMode,
  setDarkMode,
}) => {
  const [activeRoleTab, setActiveRoleTab] = useState<'student' | 'faculty'>('student');

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentHallTicket, setStudentHallTicket] = useState('');
  const [studentBranch, setStudentBranch] = useState<BranchCode>('CSE');
  const [studentSemester, setStudentSemester] = useState<number>(4);

  // Faculty Form State
  const [facultyName, setFacultyName] = useState('Dr. P. Murali Krishna');
  const [facultyEmpId, setFacultyEmpId] = useState('KMCE-CSE-001');
  const [facultySubject, setFacultySubject] = useState('Design & Analysis of Algorithms');
  const [facultyPassword, setFacultyPassword] = useState('kmce@2025');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) {
      setAuthError('Please enter your full student name');
      return;
    }
    if (!studentHallTicket.trim()) {
      setAuthError('Please enter your unique JNTUH / KMCE Hall Ticket number');
      return;
    }

    setAuthError(null);
    onLoginStudent({
      name: studentName.trim(),
      hallticket: studentHallTicket.trim().toUpperCase(),
      branch: studentBranch,
      semester: studentSemester,
      academicYear: '2024-2025',
      section: `${studentBranch}-${studentSemester <= 2 ? '1' : 'A'}`,
      email: `${studentHallTicket.toLowerCase()}@kmce.edu.in`,
    });
  };

  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyName.trim()) {
      setAuthError('Please enter your Faculty / Professor Name');
      return;
    }
    if (!facultyEmpId.trim()) {
      setAuthError('Please enter your Employee ID (e.g. KMCE-CSE-001)');
      return;
    }
    if (!facultySubject.trim()) {
      setAuthError('Please enter your Designated Subject / Course');
      return;
    }
    if (!facultyPassword.trim()) {
      setAuthError('Please enter your security password');
      return;
    }

    // Match faculty or create profile
    const matched = INITIAL_FACULTY_LIST.find(
      (f) => f.empId.toLowerCase() === facultyEmpId.trim().toLowerCase()
    );

    if (matched) {
      setAuthError(null);
      // Pass matched faculty with updated active subject and custom name if altered
      onLoginFaculty({
        ...matched,
        name: facultyName.trim() || matched.name,
        assignedSubjects: [facultySubject.trim(), ...matched.assignedSubjects.filter(s => s !== facultySubject.trim())]
      });
    } else {
      // Inferred department from Employee ID or default to CSE
      let dept: BranchCode = 'CSE';
      if (facultyEmpId.toUpperCase().includes('CSM') || facultySubject.toLowerCase().includes('machine learning') || facultySubject.toLowerCase().includes('ai')) {
        dept = 'CSM';
      } else if (facultyEmpId.toUpperCase().includes('ECE') || facultySubject.toLowerCase().includes('signal') || facultySubject.toLowerCase().includes('vlsi')) {
        dept = 'ECE';
      }

      setAuthError(null);
      onLoginFaculty({
        id: `fac-custom-${Date.now()}`,
        empId: facultyEmpId.trim().toUpperCase(),
        name: facultyName.trim(),
        designation: 'Professor / Course Lead',
        department: dept,
        isHod: false,
        email: `${facultyEmpId.trim().toLowerCase()}@kmce.edu.in`,
        phone: '+91 98480 12345',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        qualification: 'M.Tech / Ph.D',
        experienceYears: 10,
        officeLocation: 'Academic Wing, KMCE',
        assignedSubjects: [facultySubject.trim()],
        researchAreas: ['Academic Excellence & Innovation']
      });
    }
  };

  const selectQuickStudentDemo = (demo: typeof DEMO_STUDENT_PROFILES[0]) => {
    setStudentName(demo.name);
    setStudentHallTicket(demo.hallticket);
    setStudentBranch(demo.branch);
    setStudentSemester(demo.semester);
    setAuthError(null);
    onLoginStudent(demo);
  };

  const selectQuickFacultyDemo = (fac: FacultyProfile) => {
    setFacultyName(fac.name);
    setFacultyEmpId(fac.empId);
    setFacultySubject(fac.assignedSubjects[0] || 'Engineering Curriculum');
    setFacultyPassword('kmce@2025');
    setAuthError(null);
    onLoginFaculty(fac);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
      {/* KMCE Hyderabad College Campus Photo with Crisp White Wash in Light Mode */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={kmceCampusImg}
          alt="KMCE Hyderabad Engineering Campus with White & Maroon Buildings"
          className="w-full h-full object-cover object-center scale-100 opacity-20 dark:opacity-40 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        {/* Crisp White Background Wash in Light Mode & Deep Vignette in Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/95 dark:from-slate-950/95 dark:via-[#420510]/40 dark:to-slate-950/80" />
        <div className="absolute inset-0 bg-white/50 dark:bg-black/20 backdrop-blur-[1px]" />
      </div>

      {/* Floating Campus Badge (Top Left) */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-black/40 backdrop-blur-md border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white text-xs shadow-md">
        <div className="w-2 h-2 rounded-full bg-[#800020] dark:bg-rose-400 animate-pulse" />
        <div className="flex flex-col">
          <span className="font-bold text-[11px] text-[#800020] dark:text-rose-200">KMCE Hyderabad Campus</span>
          <span className="text-[10px] text-slate-500 dark:text-slate-300">Keshav Memorial College of Engineering</span>
        </div>
      </div>

      {/* Top Floating Control Bar: Theme & College Help */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-white/10 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white text-xs shadow-sm">
          <School className="w-3.5 h-3.5 text-[#800020] dark:text-amber-300" />
          <span>EAMCET Code: <strong className="text-[#800020] dark:text-white">KMCE</strong></span>
        </div>

        <button
          id="auth-dark-mode-toggle"
          onClick={() => setDarkMode((prev) => !prev)}
          className="p-2.5 rounded-xl bg-white hover:bg-slate-100 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-md border border-slate-200 dark:border-white/15 text-slate-700 dark:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#800020] cursor-pointer"
          title="Toggle Dark/Light Mode"
          aria-label="Toggle Night Mode"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>

      {/* Main Glassmorphic Login Container */}
      <div className="relative z-10 w-full max-w-xl my-6">
        {/* Glassmorphism Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#18090e]/95 backdrop-blur-xl border border-slate-200/90 dark:border-rose-900/40 shadow-xl shadow-slate-200/50 dark:shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-white transition-all">
          {/* Header Brand */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#800020] to-[#550015] text-white shadow-xl shadow-rose-950/40 mb-3 border-2 border-rose-300/40">
              <GraduationCap className="w-9 h-9 text-rose-100" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight">
              Pathyakram <span className="text-[#800020] dark:text-rose-400">by KMCE</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-md mx-auto">
              Keshav Memorial College of Engineering Academic & Examination Portal
            </p>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                JNTUH R25 & R22 Curriculum
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700">
                CSE • CSM • ECE
              </span>
            </div>
          </div>

          {/* Role Tabs: Student vs Faculty */}
          <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-stone-900 border border-slate-200 dark:border-stone-800 mb-6">
            <button
              id="auth-student-tab"
              type="button"
              onClick={() => { setActiveRoleTab('student'); setAuthError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeRoleTab === 'student'
                  ? 'bg-[#800020] text-white shadow-md shadow-rose-950/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#800020] dark:hover:text-rose-200'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student Access</span>
            </button>
            <button
              id="auth-faculty-tab"
              type="button"
              onClick={() => { setActiveRoleTab('faculty'); setAuthError(null); }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeRoleTab === 'faculty'
                  ? 'bg-[#800020] text-white shadow-md shadow-rose-950/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#800020] dark:hover:text-rose-200'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Faculty & HOD Hub</span>
            </button>
          </div>

          {/* Error Alert */}
          {authError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Student Login Form */}
          {activeRoleTab === 'student' ? (
            <form onSubmit={handleStudentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Student Full Name
                </label>
                <div className="relative">
                  <input
                    id="student-name-input"
                    type="text"
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="e.g. Sahith Sidhartha"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Unique Hall Ticket Number (JNTUH / KMCE)
                </label>
                <input
                  id="student-hallticket-input"
                  type="text"
                  required
                  value={studentHallTicket}
                  onChange={(e) => setStudentHallTicket(e.target.value)}
                  placeholder="e.g. 23KM1A0542 or 23KM1A6618"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm uppercase tracking-wider font-mono-code focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Engineering Branch
                  </label>
                  <select
                    id="student-branch-select"
                    value={studentBranch}
                    onChange={(e) => setStudentBranch(e.target.value as BranchCode)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  >
                    <option value="CSE">CSE (Computer Science)</option>
                    <option value="CSM">CSM (CSE AI & ML)</option>
                    <option value="ECE">ECE (Electronics & Comm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Current Semester
                  </label>
                  <select
                    id="student-semester-select"
                    value={studentSemester}
                    onChange={(e) => setStudentSemester(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                      <option key={sem} value={sem}>
                        Semester {sem} ({sem <= 2 ? '1st' : sem <= 4 ? '2nd' : sem <= 6 ? '3rd' : '4th'} Year)
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                id="student-login-submit"
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-semibold text-sm shadow-lg shadow-rose-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Pathyakram Student Portal</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Faculty & HOD Login Form */
            <form onSubmit={handleFacultySubmit} className="space-y-4">
              {/* Faculty Name Field */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Faculty / Professor Name
                </label>
                <div className="relative">
                  <input
                    id="faculty-name-input"
                    type="text"
                    required
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    placeholder="e.g. Dr. P. Murali Krishna / Prof. Ananya Varma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                  />
                </div>
              </div>

              {/* Employee ID & Department */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Faculty Employee ID
                  </label>
                  <span className="text-[10px] text-[#800020] dark:text-rose-400 font-mono">Format: KMCE-DEPT-XXX</span>
                </div>
                <div className="relative">
                  <input
                    id="faculty-empid-input"
                    type="text"
                    required
                    value={facultyEmpId}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFacultyEmpId(val);
                      // Auto-suggest name and subject if matches
                      const match = INITIAL_FACULTY_LIST.find(f => f.empId.toLowerCase() === val.trim().toLowerCase());
                      if (match) {
                        setFacultyName(match.name);
                        setFacultySubject(match.assignedSubjects[0] || facultySubject);
                      }
                    }}
                    placeholder="e.g. KMCE-CSE-001, KMCE-CSM-001, KMCE-ECE-001"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm font-mono-code uppercase focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                  />
                </div>
              </div>

              {/* Designated Subject / Course */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Designated Subject / Course
                </label>
                <div className="space-y-1.5">
                  <input
                    id="faculty-subject-input"
                    type="text"
                    required
                    value={facultySubject}
                    onChange={(e) => setFacultySubject(e.target.value)}
                    placeholder="e.g. Design & Analysis of Algorithms, Machine Learning, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                  />
                  {/* Quick Subject Suggestions */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      'Design & Analysis of Algorithms',
                      'Machine Learning & Foundations',
                      'Database Management Systems',
                      'Digital Signal Processing',
                      'Operating Systems',
                      'VLSI Design & Technology'
                    ].map((subj) => (
                      <button
                        key={subj}
                        type="button"
                        onClick={() => setFacultySubject(subj)}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                          facultySubject === subj
                            ? 'bg-rose-100 dark:bg-rose-950 border-rose-300 dark:border-rose-700 text-[#800020] dark:text-rose-300 font-bold'
                            : 'bg-slate-100 dark:bg-stone-800 border-slate-200 dark:border-stone-700 text-slate-600 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                        }`}
                      >
                        {subj}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Password Field with Show/Hide Password Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Faculty Portal Password
                  </label>
                  <span className="text-[10px] text-slate-400">Default: kmce@2025</span>
                </div>
                <div className="relative">
                  <input
                    id="faculty-password-input"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={facultyPassword}
                    onChange={(e) => setFacultyPassword(e.target.value)}
                    placeholder="Enter security password"
                    className="w-full px-3.5 py-2.5 pr-11 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-700 text-slate-900 dark:text-white placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#800020] transition-all"
                  />
                  {/* Password Show/Hide Option */}
                  <button
                    type="button"
                    id="faculty-toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 flex items-center gap-1 text-xs cursor-pointer"
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-4 h-4 text-[#800020] dark:text-rose-400" />
                        <span className="sr-only">Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span className="sr-only">Show</span>
                      </>
                    )}
                  </button>
                </div>
                {/* Visual indicator of password visibility status */}
                <div className="flex items-center justify-end mt-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-[#800020] dark:text-rose-400 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {showPassword ? '🔒 Hide password characters' : '👁️ Show password characters'}
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-slate-700 dark:text-slate-300 text-xs">
                <p className="flex items-center gap-1.5 font-semibold text-[#800020] dark:text-rose-300">
                  <Lock className="w-3.5 h-3.5" />
                  Professor Upload Privileges Enabled
                </p>
                <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                  Professors can upload Previous Year Question Papers, Lesson Plans, and Internal Exam schedules directly to the database.
                </p>
              </div>

              <button
                id="faculty-login-submit"
                type="submit"
                className="w-full mt-2 py-3 rounded-xl bg-[#800020] hover:bg-[#68001a] active:bg-[#520014] text-white font-semibold text-sm shadow-lg shadow-rose-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Authorize & Enter Faculty Hub</span>
                <CheckCircle className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Instant One-Click Demo Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 mb-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick One-Click Demo Personas:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                type="button"
                id="quick-demo-cse-student"
                onClick={() => selectQuickStudentDemo(DEMO_STUDENT_PROFILES[0])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50/80 hover:border-rose-300 dark:bg-stone-900 dark:hover:bg-rose-950/60 border border-slate-200 dark:border-stone-800 text-left transition-all text-[11px] cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white truncate">Sahith S.</div>
                <div className="text-[10px] text-[#800020] dark:text-rose-400 font-mono-code">CSE • Sem 4</div>
              </button>

              <button
                type="button"
                id="quick-demo-csm-student"
                onClick={() => selectQuickStudentDemo(DEMO_STUDENT_PROFILES[1])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50/80 hover:border-rose-300 dark:bg-stone-900 dark:hover:bg-rose-950/60 border border-slate-200 dark:border-stone-800 text-left transition-all text-[11px] cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white truncate">Aarav (CSM)</div>
                <div className="text-[10px] text-[#800020] dark:text-rose-400 font-mono-code">CSM AI • Sem 5</div>
              </button>

              <button
                type="button"
                id="quick-demo-hod-cse"
                onClick={() => selectQuickFacultyDemo(INITIAL_FACULTY_LIST[0])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50/80 hover:border-rose-300 dark:bg-stone-900 dark:hover:bg-rose-950/60 border border-slate-200 dark:border-stone-800 text-left transition-all text-[11px] cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white truncate">Dr. Murali K.</div>
                <div className="text-[10px] text-[#800020] dark:text-rose-300 font-semibold truncate">HOD CSE (DAA)</div>
              </button>

              <button
                type="button"
                id="quick-demo-hod-csm"
                onClick={() => selectQuickFacultyDemo(INITIAL_FACULTY_LIST[1])}
                className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-rose-50/80 hover:border-rose-300 dark:bg-stone-900 dark:hover:bg-rose-950/60 border border-slate-200 dark:border-stone-800 text-left transition-all text-[11px] cursor-pointer"
              >
                <div className="font-bold text-slate-900 dark:text-white truncate">Dr. Radhika D.</div>
                <div className="text-[10px] text-[#800020] dark:text-rose-300 font-semibold truncate">HOD CSM (ML)</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Support Info */}
        <div className="text-center mt-4 text-xs text-slate-600 dark:text-slate-400 font-medium">
          <p>{KMCE_COLLEGE_INFO.name} • Examination Branch & AI Academic Cell</p>
        </div>
      </div>
    </div>
  );
};
