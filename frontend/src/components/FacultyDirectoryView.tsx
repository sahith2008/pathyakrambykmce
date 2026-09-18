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
  Edit3,
  X,
  Check,
  RotateCcw,
  Save,
} from 'lucide-react';
import { BranchCode, FacultyProfile } from '../types';
import { INITIAL_FACULTY_LIST } from '../data/mockData';

interface FacultyDirectoryViewProps {
  userRole?: 'student' | 'faculty' | 'hod_admin' | null;
}

export const FacultyDirectoryView: React.FC<FacultyDirectoryViewProps> = ({ userRole }) => {
  const isFacultyOrAdmin = userRole === 'faculty' || userRole === 'hod_admin';

  const [facultyList, setFacultyList] = useState<FacultyProfile[]>(() => {
    const saved = localStorage.getItem('kmce_faculty_directory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (_) {}
    }
    return INITIAL_FACULTY_LIST;
  });

  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [hodOnly, setHodOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Editing modal state (Only available to Faculty/Admin)
  const [editingFaculty, setEditingFaculty] = useState<FacultyProfile | null>(null);
  const [editForm, setEditForm] = useState<{
    name: string;
    designation: string;
    department: BranchCode | 'ADMIN';
    isHod: boolean;
    email: string;
    phone: string;
    qualification: string;
    experienceYears: number;
    officeLocation: string;
    assignedSubjects: string;
    researchAreas: string;
  }>({
    name: '',
    designation: '',
    department: 'CSE',
    isHod: false,
    email: '',
    phone: '',
    qualification: '',
    experienceYears: 0,
    officeLocation: '',
    assignedSubjects: '',
    researchAreas: '',
  });
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);

  const handleOpenEdit = (faculty: FacultyProfile) => {
    if (!isFacultyOrAdmin) return;
    setEditingFaculty(faculty);
    setEditForm({
      name: faculty.name,
      designation: faculty.designation,
      department: faculty.department,
      isHod: faculty.isHod,
      email: faculty.email,
      phone: faculty.phone,
      qualification: faculty.qualification,
      experienceYears: faculty.experienceYears,
      officeLocation: faculty.officeLocation,
      assignedSubjects: faculty.assignedSubjects.join(', '),
      researchAreas: faculty.researchAreas.join(', '),
    });
    setEditSuccessMsg(null);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaculty || !isFacultyOrAdmin) return;

    const updatedList = facultyList.map((fac) => {
      if (fac.id === editingFaculty.id) {
        return {
          ...fac,
          name: editForm.name.trim() || fac.name,
          designation: editForm.designation.trim() || fac.designation,
          department: editForm.department,
          isHod: editForm.isHod,
          email: editForm.email.trim() || fac.email,
          phone: editForm.phone.trim() || fac.phone,
          qualification: editForm.qualification.trim() || fac.qualification,
          experienceYears: Number(editForm.experienceYears) || fac.experienceYears,
          officeLocation: editForm.officeLocation.trim() || fac.officeLocation,
          assignedSubjects: editForm.assignedSubjects
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
          researchAreas: editForm.researchAreas
            .split(',')
            .map((a) => a.trim())
            .filter(Boolean),
        };
      }
      return fac;
    });

    setFacultyList(updatedList);
    localStorage.setItem('kmce_faculty_directory', JSON.stringify(updatedList));
    setEditSuccessMsg('Faculty details updated successfully!');
    setTimeout(() => {
      setEditingFaculty(null);
      setEditSuccessMsg(null);
    }, 600);
  };

  const handleResetToDefault = () => {
    if (!isFacultyOrAdmin) return;
    if (window.confirm('Reset all faculty profiles back to system original defaults?')) {
      setFacultyList(INITIAL_FACULTY_LIST);
      localStorage.removeItem('kmce_faculty_directory');
      setEditingFaculty(null);
    }
  };

  const filteredFaculty = useMemo(() => {
    return facultyList.filter((fac) => {
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
  }, [facultyList, selectedDept, hodOnly, searchQuery]);

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

          <div className="flex items-center gap-3">
            <div className="px-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-xs text-rose-200 block">Total Listed</span>
              <span className="text-2xl font-extrabold text-white">{facultyList.length}</span>
            </div>
            {isFacultyOrAdmin && (
              <button
                onClick={handleResetToDefault}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-rose-100 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Reset faculty profiles to default"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-medium">Reset</span>
              </button>
            )}
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
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-mono font-bold">
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

            {/* Contact Actions (Students only see Email & Call; Faculty/Admin also see Edit) */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <a
                href={`mailto:${faculty.email}`}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-[#800020] dark:text-rose-300 text-xs font-semibold transition-colors cursor-pointer border border-rose-200 dark:border-rose-800/60"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">Email</span>
              </a>

              <a
                href={`tel:${faculty.phone}`}
                className="flex items-center justify-center p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                title={`Call ${faculty.phone}`}
              >
                <Phone className="w-4 h-4" />
              </a>

              {isFacultyOrAdmin && (
                <button
                  onClick={() => handleOpenEdit(faculty)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
                  title="Edit Faculty Details"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#800020] dark:text-rose-400" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Faculty Modal (Faculty/Admin only) */}
      {isFacultyOrAdmin && editingFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl space-y-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Edit Faculty Details
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Update profile for {editingFaculty.empId} ({editingFaculty.name})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingFaculty(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Success Message Banner */}
            {editSuccessMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{editSuccessMsg}</span>
              </div>
            )}

            {/* Edit Form */}
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  />
                </div>

                {/* Designation */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.designation}
                    onChange={(e) => setEditForm({ ...editForm, designation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Department
                  </label>
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value as BranchCode | 'ADMIN' })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  >
                    <option value="CSE">CSE - Computer Science & Engg</option>
                    <option value="CSM">CSM - CSE (Artificial Intelligence & ML)</option>
                    <option value="ECE">ECE - Electronics & Comm Engg</option>
                    <option value="ADMIN">ADMIN - Academic Administration</option>
                  </select>
                </div>

                {/* HOD Status Toggle */}
                <div className="flex items-center sm:pt-6">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={editForm.isHod}
                      onChange={(e) => setEditForm({ ...editForm, isHod: e.target.checked })}
                      className="w-4 h-4 rounded text-[#800020] focus:ring-[#800020] cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Designate as Head of Department (HOD)
                    </span>
                  </label>
                </div>

                {/* Qualification */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Qualification
                  </label>
                  <input
                    type="text"
                    value={editForm.qualification}
                    onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    placeholder="e.g. Ph.D. (IIT Hyderabad), M.Tech"
                  />
                </div>

                {/* Experience Years */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={editForm.experienceYears}
                    onChange={(e) => setEditForm({ ...editForm, experienceYears: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  />
                </div>

                {/* Office / Cabin Location */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Office / Cabin Location
                  </label>
                  <input
                    type="text"
                    value={editForm.officeLocation}
                    onChange={(e) => setEditForm({ ...editForm, officeLocation: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                    placeholder="e.g. Block-B, Cabin 304"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                    Phone / Extension
                  </label>
                  <input
                    type="text"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Official Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              {/* Assigned Subjects */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Assigned Subjects & Labs (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.assignedSubjects}
                  onChange={(e) => setEditForm({ ...editForm, assignedSubjects: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  placeholder="e.g. Data Structures, Design & Analysis of Algorithms"
                />
              </div>

              {/* Research Areas */}
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                  Research Areas (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.researchAreas}
                  onChange={(e) => setEditForm({ ...editForm, researchAreas: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                  placeholder="e.g. Machine Learning, Cloud Computing"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFaculty(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#800020] hover:bg-[#66001a] text-white text-xs font-bold transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
