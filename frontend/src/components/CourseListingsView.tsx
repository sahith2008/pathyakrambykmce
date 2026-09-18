import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileText,
  Filter,
  GraduationCap,
  Layers,
  Search,
  User,
} from 'lucide-react';
import { BranchCode, CourseListing } from '../types';
import { INITIAL_COURSES } from '../data/mockData';

interface CourseListingsViewProps {
  onSelectSubjectForPapers?: (subjectCode: string) => void;
  userBranch?: BranchCode;
}

export const CourseListingsView: React.FC<CourseListingsViewProps> = ({
  onSelectSubjectForPapers,
  userBranch = 'CSE',
}) => {
  const [selectedBranch, setSelectedBranch] = useState<BranchCode | 'ALL'>(userBranch || 'ALL');
  const [selectedSemester, setSelectedSemester] = useState<string>('ALL');
  const [selectedInstructor, setSelectedInstructor] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Instructors list for filter
  const allInstructors = useMemo(() => {
    const set = new Set<string>();
    INITIAL_COURSES.forEach((c) => set.add(c.instructorName));
    return Array.from(set);
  }, []);

  const filteredCourses = useMemo(() => {
    return INITIAL_COURSES.filter((course) => {
      if (selectedBranch !== 'ALL' && course.branch !== selectedBranch) return false;
      if (selectedSemester !== 'ALL' && course.semester !== Number(selectedSemester)) return false;
      if (selectedInstructor !== 'ALL' && course.instructorName !== selectedInstructor) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = course.courseName.toLowerCase().includes(q);
        const matchesCode = course.courseCode.toLowerCase().includes(q);
        const matchesInst = course.instructorName.toLowerCase().includes(q);
        const matchesTopic = course.modules.some(
          (u) => u.title.toLowerCase().includes(q) || u.topics.some(t => t.toLowerCase().includes(q))
        );
        if (!matchesName && !matchesCode && !matchesInst && !matchesTopic) return false;
      }
      return true;
    });
  }, [selectedBranch, selectedSemester, selectedInstructor, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#800020] dark:bg-[#4a0013] text-white shadow-md border border-[#68001a]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 border border-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" />
                Academic Syllabus Catalog
              </span>
              <span className="text-xs text-rose-100">
                JNTUH R25 Scheme (Affiliated to JNTU)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light">
              Branch-Wise Course <span className="font-bold">& Syllabus Listings</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
              Complete curriculum structure filtered by department (CSE, CSM, ECE), semester, and designated instructors.
            </p>
          </div>

          <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
            <span className="text-xs text-rose-200 block">Total Courses</span>
            <span className="text-2xl font-extrabold text-white">{filteredCourses.length}</span>
          </div>
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by course name, code (e.g. CS402PC), or syllabus topic..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
            {(['ALL', 'CSE', 'CSM', 'ECE'] as const).map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
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

        {/* Dropdown Filters for Semester & Instructor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Filter by Semester
            </label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
            >
              <option value="ALL">All Semesters (Sem 1 - 8)</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem} ({sem <= 2 ? '1st Year' : sem <= 4 ? '2nd Year' : sem <= 6 ? '3rd Year' : '4th Year'})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
              Filter by Designated Instructor
            </label>
            <select
              value={selectedInstructor}
              onChange={(e) => setSelectedInstructor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
            >
              <option value="ALL">All Instructors</option>
              {allInstructors.map((inst, i) => (
                <option key={i} value={inst}>{inst}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Accordion List */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          const isExpanded = expandedCourseId === course.id;

          return (
            <div
              key={course.id}
              className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
            >
              <div
                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-800/40"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800">
                      {course.branch}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-semibold">
                      Semester {course.semester}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-[#800020] dark:text-rose-300 text-[11px] font-mono-code font-bold border border-stone-200 dark:border-stone-700">
                      {course.courseCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                      {course.credits} Credits • {course.totalLectures} Hours
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {course.courseName}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Faculty Instructor: <strong className="text-slate-700 dark:text-slate-300">{course.instructorName}</strong> ({course.instructorEmpId})
                  </p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] text-slate-400 block">{course.modules.length} Units Defined</span>
                    <span className="text-xs font-semibold text-[#800020] dark:text-rose-400">
                      {isExpanded ? 'Collapse Syllabus' : 'View Full Units'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Syllabus Breakdown */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mt-4 mb-3">
                      Unit-Wise Syllabus Breakdown (JNTUH R25):
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.modules.map((u, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-xs"
                        >
                          <div className="font-bold text-[#800020] dark:text-rose-400 mb-1">
                            Unit {u.unit}: {u.title} ({u.hours}h)
                          </div>
                          <ul className="list-disc list-inside space-y-0.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                            {u.topics.map((t, ti) => (
                              <li key={ti}>{t}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prescribed Textbooks */}
                  {course.referenceBooks && course.referenceBooks.length > 0 && (
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
                        Prescribed Textbooks & References:
                      </span>
                      <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
                        {course.referenceBooks.map((tb, i) => (
                          <li key={i}>{tb}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
