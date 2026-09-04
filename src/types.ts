export type BranchCode = 'CSE' | 'CSM' | 'ECE';

export interface StudentProfile {
  name: string;
  hallticket: string;
  branch: BranchCode;
  semester: number;
  academicYear: string;
  section?: string;
  email?: string;
}

export interface FacultyProfile {
  id: string;
  empId: string;
  name: string;
  designation: string;
  department: BranchCode | 'ADMIN';
  isHod: boolean;
  email: string;
  phone: string;
  photo: string;
  qualification: string;
  experienceYears: number;
  officeLocation: string;
  assignedSubjects: string[];
  researchAreas: string[];
}

export type DocumentType = 'question_paper' | 'lesson_plan' | 'internal_schedule' | 'lab_manual' | 'syllabus_book';

export interface AcademicDocument {
  id: string;
  title: string;
  type: DocumentType;
  branch: BranchCode | 'ALL';
  semester: number;
  subjectCode: string;
  subjectName: string;
  academicYear: string;
  examType?: 'Mid-1' | 'Mid-2' | 'Semester Regular' | 'Semester Supplementary' | 'Model Paper';
  uploadedBy: string; // Faculty Name
  uploaderEmpId?: string;
  uploadDate: string;
  fileSize: string;
  fileUrl: string;
  downloadCount: number;
  description?: string;
  curriculum: 'R25' | 'R22' | 'R18';
  examDate?: string;
  syllabusCovered?: string;
  questionsPreview?: {
    sectionA: string[];
    sectionB: { qNum: string; text: string; marks: number }[];
  };
  savedOfflineDate?: string;
}

export interface CourseListing {
  id: string;
  courseCode: string;
  courseName: string;
  branch: BranchCode;
  semester: number;
  credits: number;
  instructorName: string;
  instructorEmpId: string;
  department: BranchCode;
  totalLectures: number;
  modules: {
    unit: number;
    title: string;
    topics: string[];
    hours: number;
  }[];
  lessonPlanUrl?: string;
  referenceBooks: string[];
}

export type QuizDifficulty = 'Easy' | 'Medium' | 'Hard' | 'GATE Level';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  topic: string;
  difficulty: QuizDifficulty;
  subjectCode?: string;
}

export interface QuizDefinition {
  id: string;
  title: string;
  branch: BranchCode;
  semester: number;
  subjectCode: string;
  subjectName: string;
  topic: string;
  curriculum: 'R25' | 'R22';
  difficulty: QuizDifficulty;
  durationMinutes: number;
  questions: QuizQuestion[];
  totalMarks: number;
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  subjectName: string;
  branch: BranchCode;
  studentHallTicket: string;
  studentName: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeSpentSeconds: number;
  userAnswers: number[];
  timestamp: string;
  topicBreakdown: {
    topic: string;
    correct: number;
    total: number;
  }[];
}

export interface AttendanceRecord {
  id: string;
  subjectCode: string;
  subjectName: string;
  branch: BranchCode;
  semester: number;
  facultyName: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
  type: 'Theory' | 'Lab';
  lastUpdated: string;
}

export interface PushNotification {
  id: string;
  title: string;
  message: string;
  category: 'schedule' | 'exam' | 'attendance' | 'quiz' | 'general';
  priority: 'urgent' | 'high' | 'normal';
  timestamp: string;
  read: boolean;
  targetBranch?: BranchCode | 'ALL';
  targetSemester?: number;
  actionUrl?: string;
}

export interface CollegeInfo {
  name: string;
  shortName: string;
  tagline: string;
  affiliation: string;
  approvedBy: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  altPhone: string;
  email: string;
  examBranchEmail: string;
  website: string;
  counselingCode: string;
  campusHighlights: string[];
}
