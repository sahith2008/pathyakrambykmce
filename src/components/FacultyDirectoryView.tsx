import React, { useState, useMemo } from 'react';
import {
  Award,
  BookOpen,
  Building,
  Mail,
  MapPin,
  Phone,
  Search,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react';
import { BranchCode, FacultyProfile } from '../types';
import { INITIAL_FACULTY_LIST } from '../data/mockData';

export const FacultyDirectoryView: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [hodOnly, setHodOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredFaculty = useMemo(() => {
    return INITIAL_FACULTY_LIST.filter((fac) => {
      if (selectedDept !== 'ALL' && fac.department !== selectedDept) return false;
      if (hodOnly && !fac.isHod) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = fac.name.toLowerCase().includes(q);
        const matchesEmpId = fac.empId.toLowerCase().includes(q);
        const matchesSubject = fac.assignedSubjects.some((s) => s.toLowerCase().includes(q));
        const matchesArea = fac.researchAreas.some((a) => a.toLowerCase().includes(q));
        if (!matchesName && !matchesEmpId && !matchesSubject && !matchesArea) return false;
      }
      return true;
    });
  }, [selectedDept, hodOnly, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#800020] text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 border border-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Administrative Reference Directory
              </span>
              <span className="text-xs text-rose-100">
                HODs & Subject Mentors
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light">
              HOD & Faculty <span className="font-bold">Directory</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
              Official records of Heads of Departments, Professors, and Associate Faculty members with unique Employee IDs, direct contact information, qualifications, and office locations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-xs text-rose-200 block">Total Listed</span>
              <span className="text-2xl font-extrabold text-white">{INITIAL_FACULTY_LIST.length}</span>
            </div>
          </div>
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, Emp ID (e.g. KMCE-CSE-001), or subject..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
        </div>

        {/* Department Pills & HOD Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
            {['ALL', 'CSE', 'CSM', 'ECE'].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedDept === dept
                    ? 'bg-[#800020] text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-[#800020] dark:hover:text-white'
                }`}
              >
                {dept === 'ALL' ? 'All Depts' : dept}
              </button>
            ))}
          </div>

          <button
            onClick={() => setHodOnly(!hodOnly)}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
              hodOnly
                ? 'bg-[#800020] text-white border-[#800020] shadow-sm'
                : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${hodOnly ? 'fill-current' : ''}`} />
            <span>HODs Only</span>
          </button>
        </div>
      </div>

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredFaculty.map((faculty) => (
          <div
            key={faculty.id}
            className="flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-300 hover:shadow-lg transition-all"
          >
            <div>
              {/* Profile Top Row with Photo & Department Badge */}
              <div className="flex items-start gap-3.5 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#800020] shadow-md shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img
                    src={faculty.photo}
                    alt={faculty.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  {faculty.isHod && (
                    <div className="absolute top-0 right-0 bg-[#800020] text-white p-0.5 rounded-bl font-bold text-[8px] uppercase">
                      HOD
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 text-[10px] font-bold border border-rose-200 dark:border-rose-800">
                      {faculty.department} Department
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono-code font-bold">
                      {faculty.empId}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 truncate">
                    {faculty.name}
                  </h3>
                  <p className="text-xs text-[#800020] dark:text-rose-400 font-semibold truncate">
                    {faculty.designation}
                  </p>
                </div>
              </div>

              {/* Qualifications & Experience */}
              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{faculty.qualification} ({faculty.experienceYears} Years Exp)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{faculty.officeLocation}</span>
                </div>
              </div>

              {/* Assigned Subjects */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-750 mb-4">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Assigned Subjects & Labs:
                </span>
                <div className="flex flex-wrap gap-1">
                  {faculty.assignedSubjects.map((sub, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-medium border border-slate-200 dark:border-slate-600"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <a
                href={`mailto:${faculty.email}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-[#800020] dark:text-rose-300 text-xs font-semibold transition-colors cursor-pointer border border-rose-200 dark:border-rose-800/60"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">Email Faculty</span>
              </a>

              <a
                href={`tel:${faculty.phone}`}
                className="flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title={`Call ${faculty.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
