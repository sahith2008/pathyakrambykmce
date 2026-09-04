import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileCheck,
  FileText,
  FileUp,
  GraduationCap,
  Layers,
  Lock,
  Plus,
  Send,
  Sparkles,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import { AcademicDocument, BranchCode, DocumentType, FacultyProfile } from '../types';

interface FacultyUploadViewProps {
  documents: AcademicDocument[];
  onAddDocument: (doc: AcademicDocument) => void;
  onDeleteDocument: (docId: string) => void;
  currentFaculty: FacultyProfile | null;
  onSendPushNotification?: (title: string, message: string, category: 'schedule_update' | 'exam_paper' | 'lesson_plan', branch?: BranchCode) => void;
}

export const FacultyUploadView: React.FC<FacultyUploadViewProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
  currentFaculty,
  onSendPushNotification,
}) => {
  const [docType, setDocType] = useState<DocumentType>('question_paper');
  const [title, setTitle] = useState('');
  const [subjectCode, setSubjectCode] = useState('CS402PC');
  const [subjectName, setSubjectName] = useState('Design and Analysis of Algorithms');
  const [branch, setBranch] = useState<BranchCode>(currentFaculty?.department || 'CSE');
  const [semester, setSemester] = useState<number>(4);
  const [academicYear, setAcademicYear] = useState<string>('2024-25');
  const [examType, setExamType] = useState<string>('Semester Regular');
  const [description, setDescription] = useState('');
  const [autoNotifyStudents, setAutoNotifyStudents] = useState(true);

  // File upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessToast, setUploadSuccessToast] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Filter documents to show uploaded items
  const facultyDocs = documents.filter((d) =>
    currentFaculty ? d.facultyEmpId === currentFaculty.empId || d.uploadedBy.includes(currentFaculty.name) : true
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setFormError('Please enter a document title');
      return;
    }
    if (!subjectCode.trim()) {
      setFormError('Please enter subject course code');
      return;
    }

    setFormError(null);
    setIsUploading(true);

    const uploaderName = currentFaculty ? `${currentFaculty.name} (${currentFaculty.empId})` : 'Prof. Faculty Member (KMCE-CSE-001)';
    const facultyId = currentFaculty?.empId || 'KMCE-CSE-001';

    const newDoc: AcademicDocument = {
      id: `doc-${Date.now()}`,
      title: title.trim(),
      type: docType,
      branch,
      semester,
      subjectCode: subjectCode.trim().toUpperCase(),
      subjectName: subjectName.trim(),
      academicYear,
      curriculum: academicYear.includes('24') || academicYear.includes('25') ? 'R25' : 'R22',
      examType: docType === 'question_paper' ? (examType as any) : undefined,
      fileUrl: '/sample-document.pdf',
      fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
      uploadedBy: uploaderName,
      uploaderEmpId: facultyId,
      uploadDate: new Date().toISOString().split('T')[0],
      downloadCount: 0,
      description: description.trim() || `Official academic resource for ${subjectName} (${subjectCode}).`,
      questionsPreview: docType === 'question_paper' ? {
        sectionA: [
          `Define fundamental principles of ${subjectName}.`,
          `Formulate the governing complexity bounds for ${subjectCode}.`,
          `State two key industrial applications of ${branch} engineering in this topic.`,
          `Differentiate principal paradigms in JNTUH R25 curriculum.`,
          `List necessary conditions for convergence in Unit 1.`
        ],
        sectionB: [
          { qNum: 'Q1', text: `Explain in depth the mathematical formulation and architecture of ${subjectName}.`, marks: 10 },
          { qNum: 'Q2', text: `Design an optimal algorithm/circuit for the given real-world engineering specification.`, marks: 10 },
          { qNum: 'Q3', text: `Derive step-by-step state-space equations with standard assumptions.`, marks: 10 }
        ]
      } : undefined
    };

    // Save to local state and send to backend API
    try {
      await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDoc),
      });
    } catch (err) {
      console.log('Saved document to in-memory store');
    }

    onAddDocument(newDoc);

    // If push notifications enabled, broadcast update
    if (autoNotifyStudents && onSendPushNotification) {
      const category = docType === 'schedule' ? 'schedule_update' : docType === 'lesson_plan' ? 'lesson_plan' : 'exam_paper';
      onSendPushNotification(
        `New ${docType.replace('_', ' ').toUpperCase()}: ${subjectName}`,
        `Prof. ${uploaderName} uploaded ${title} for ${branch} Semester ${semester}.`,
        category,
        branch
      );
    }

    setIsUploading(false);
    setUploadSuccessToast(`Successfully published "${title}" to KMCE Repository!`);
    setTitle('');
    setDescription('');
    setSelectedFile(null);

    setTimeout(() => {
      setUploadSuccessToast(null);
    }, 4500);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-[#800020] text-white shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-rose-100 border border-white/30 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                <FileUp className="w-3.5 h-3.5" />
                Faculty Document Upload Hub
              </span>
              <span className="text-xs text-rose-100">
                Direct DB Storage & Instant Student Broadcast
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-light">
              Faculty Academic <span className="font-bold">Publishing Portal</span>
            </h2>
            <p className="text-xs sm:text-sm text-rose-100/90 mt-1 max-w-xl">
              Upload Previous Year Question Papers, Unit Lesson Plans, and Internal Exam Schedules directly for your designated engineering subjects.
            </p>
          </div>

          {currentFaculty && (
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <img
                src={currentFaculty.photo}
                alt={currentFaculty.name}
                className="w-10 h-10 rounded-xl object-cover border border-white/30"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-bold text-white block">{currentFaculty.name}</span>
                <span className="text-[11px] text-rose-200 font-mono-code">{currentFaculty.empId} • {currentFaculty.department}</span>
              </div>
            </div>
          )}
        </div>
        <div className="absolute right-[-40px] top-[-40px] w-64 h-64 bg-rose-400/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Success Toast */}
      {uploadSuccessToast && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">{uploadSuccessToast}</span>
        </div>
      )}

      {/* Main Form & Upload Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#800020] dark:text-rose-400" />
            <span>Upload New Academic Document</span>
          </h3>

          {formError && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{formError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Document Type Selector Tabs */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Document Type
              </label>
              <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                {[
                  { type: 'question_paper', label: 'Question Paper', icon: FileText },
                  { type: 'lesson_plan', label: 'Lesson Plan', icon: Layers },
                  { type: 'schedule', label: 'Exam Schedule', icon: Calendar },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = docType === item.type;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => setDocType(item.type as DocumentType)}
                      className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#800020] text-white shadow-md'
                          : 'text-slate-600 dark:text-slate-400 hover:text-[#800020] dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Document Title */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Document Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={
                  docType === 'question_paper'
                    ? 'e.g. Design and Analysis of Algorithms - Semester End Examination Nov 2024'
                    : docType === 'lesson_plan'
                    ? 'e.g. DAA Complete 5 Units Lesson Plan & Lecture Mapping R25'
                    : 'e.g. B.Tech IV Semester Mid-Term 1 Examination Time Table Oct 2024'
                }
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            {/* Subject Code & Subject Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Course Code
                </label>
                <input
                  type="text"
                  required
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  placeholder="e.g. CS402PC or AI501PC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white uppercase font-mono-code focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Full Name
                </label>
                <input
                  type="text"
                  required
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  placeholder="e.g. Design and Analysis of Algorithms"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>
            </div>

            {/* Branch, Semester, Academic Year, Exam Type */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Branch
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value as BranchCode)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="CSE">CSE</option>
                  <option value="CSM">CSM (AI & ML)</option>
                  <option value="ECE">ECE</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Semester
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={s}>Sem {s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Academic Year
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="2024-25">2024-25 (R25)</option>
                  <option value="2023-24">2023-24 (R22)</option>
                  <option value="2022-23">2022-23 (R22)</option>
                  <option value="2021-22">2021-22 (R18)</option>
                </select>
              </div>

              {docType === 'question_paper' ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Exam Type
                  </label>
                  <select
                    value={examType}
                    onChange={(e) => setExamType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Semester Regular">Semester Regular</option>
                    <option value="Mid-1">Mid-1</option>
                    <option value="Mid-2">Mid-2</option>
                    <option value="Semester Supplementary">Supplementary</option>
                    <option value="Model Paper">Model Paper</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Regulation
                  </label>
                  <input
                    type="text"
                    disabled
                    value="JNTUH R25"
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Description / Exam Guidelines
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add special instructions, syllabus units covered, or exam hall rules..."
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            {/* Drag & Drop File Upload Area */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Upload Document File (PDF / DOCX / Model Question Format)
              </label>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-rose-400 rounded-2xl p-4 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/40 transition-colors">
                <input
                  type="file"
                  id="faculty-file-upload-input"
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                />
                <label htmlFor="faculty-file-upload-input" className="cursor-pointer block">
                  <UploadCloud className="w-8 h-8 text-[#800020] dark:text-rose-400 mx-auto mb-1.5" />
                  {selectedFile ? (
                    <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(0)} KB)
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Click to browse or drag and drop document
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-0.5">
                        PDF, DOCX up to 25MB (Official KMCE Format)
                      </span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Push Notification Toggle */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="auto-notify-checkbox"
                checked={autoNotifyStudents}
                onChange={(e) => setAutoNotifyStudents(e.target.checked)}
                className="w-4 h-4 rounded text-[#800020] focus:ring-[#800020] accent-[#800020]"
              />
              <label htmlFor="auto-notify-checkbox" className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                Broadcast instant push notification to enrolled <strong>{branch}</strong> students
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-3 rounded-xl bg-[#800020] hover:bg-[#68001a] text-white font-bold text-xs shadow-lg shadow-rose-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Publishing into KMCE Database...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Publish & Store Document in Database</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Uploaded Documents List & Instructions (1 col) */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs">
            <h4 className="font-bold text-[#800020] dark:text-rose-200 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#800020] dark:text-rose-400" />
              <span>Faculty Upload Guidelines</span>
            </h4>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <li>• Papers uploaded are immediately indexed under PYQP repository with Part A & Part B reader views.</li>
              <li>• Lesson plans are mapped to branch course catalogs.</li>
              <li>• Internal exam timetables trigger automated student notifications.</li>
            </ul>
          </div>

          <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
              Your Uploaded Documents ({facultyDocs.length})
            </h4>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {facultyDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs flex flex-col justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-[#800020] dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        {doc.branch} • Sem {doc.semester}
                      </span>
                      <span className="text-[10px] text-slate-400">{doc.uploadDate || doc.uploadedAt}</span>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                      {doc.title}
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono-code">
                      {doc.subjectCode} • {doc.fileSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => onDeleteDocument(doc.id)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors cursor-pointer"
                      title="Delete Document"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
