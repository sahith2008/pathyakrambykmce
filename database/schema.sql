-- =========================================================================
-- KMCE Pathyakram - Relational Database Schema (PostgreSQL / MySQL compatible)
-- Academic Management Portal for Keshav Memorial College of Engineering
-- =========================================================================

-- Drop tables if needed in reverse dependency order
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS attendance CASCADE;
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS faculty CASCADE;
DROP TABLE IF EXISTS students CASCADE;

-- 1. Faculty and HOD Directory
CREATE TABLE faculty (
    id VARCHAR(64) PRIMARY KEY,
    emp_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(255) NOT NULL,
    department VARCHAR(32) NOT NULL, -- 'CSE', 'CSM', 'ECE', 'ADMIN'
    is_hod BOOLEAN DEFAULT FALSE,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(64),
    photo TEXT,
    qualification VARCHAR(255),
    experience_years INT DEFAULT 0,
    office_location VARCHAR(255),
    assigned_subjects JSONB DEFAULT '[]'::jsonb,
    research_areas JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Students Profile Directory
CREATE TABLE students (
    id VARCHAR(64) PRIMARY KEY,
    hallticket VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    branch VARCHAR(32) NOT NULL, -- 'CSE', 'CSM', 'ECE'
    semester INT NOT NULL,
    academic_year VARCHAR(32) DEFAULT '2024-25',
    section VARCHAR(32),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Academic Documents & Question Papers
CREATE TABLE documents (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL, -- 'question_paper', 'lesson_plan', 'internal_schedule', 'lab_manual', 'syllabus_book'
    branch VARCHAR(32) NOT NULL, -- 'CSE', 'CSM', 'ECE', 'ALL'
    semester INT NOT NULL,
    subject_code VARCHAR(64) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    academic_year VARCHAR(32) NOT NULL,
    exam_type VARCHAR(64), -- 'Mid-1', 'Mid-2', 'Semester Regular', 'Semester Supplementary', 'Model Paper'
    uploaded_by VARCHAR(255) NOT NULL,
    uploader_emp_id VARCHAR(64),
    upload_date DATE DEFAULT CURRENT_DATE,
    file_size VARCHAR(32) DEFAULT '1.8 MB',
    file_url TEXT,
    download_count INT DEFAULT 0,
    description TEXT,
    curriculum VARCHAR(32) DEFAULT 'R25', -- 'R25', 'R22', 'R18'
    exam_date DATE,
    syllabus_covered TEXT,
    questions_preview JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Push Notifications & Broadcasts
CREATE TABLE notifications (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    category VARCHAR(64) DEFAULT 'general', -- 'schedule', 'exam', 'attendance', 'quiz', 'general'
    priority VARCHAR(32) DEFAULT 'normal', -- 'urgent', 'high', 'normal'
    timestamp_text VARCHAR(64) DEFAULT 'Just now',
    read BOOLEAN DEFAULT FALSE,
    target_branch VARCHAR(32) DEFAULT 'ALL',
    target_semester INT,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Student Attendance Records
CREATE TABLE attendance (
    id VARCHAR(64) PRIMARY KEY,
    student_hallticket VARCHAR(64),
    subject_code VARCHAR(64) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    branch VARCHAR(32) NOT NULL,
    semester INT NOT NULL,
    faculty_name VARCHAR(255) NOT NULL,
    total_classes INT DEFAULT 0,
    attended_classes INT DEFAULT 0,
    percentage NUMERIC(5, 2) DEFAULT 0.00,
    type VARCHAR(32) DEFAULT 'Theory', -- 'Theory', 'Lab'
    last_updated VARCHAR(64) DEFAULT 'Today',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Quiz Results & Student Submissions
CREATE TABLE quiz_results (
    id VARCHAR(64) PRIMARY KEY,
    quiz_id VARCHAR(64) NOT NULL,
    quiz_title VARCHAR(255) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    branch VARCHAR(32) NOT NULL,
    student_hallticket VARCHAR(64) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    total_questions INT NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    time_spent_seconds INT DEFAULT 0,
    user_answers JSONB DEFAULT '[]'::jsonb,
    topic_breakdown JSONB DEFAULT '[]'::jsonb,
    timestamp_text VARCHAR(64) DEFAULT 'Today',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Course Listings & Curriculum Modules
CREATE TABLE courses (
    id VARCHAR(64) PRIMARY KEY,
    course_code VARCHAR(64) UNIQUE NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    branch VARCHAR(32) NOT NULL,
    semester INT NOT NULL,
    credits INT DEFAULT 3,
    instructor_name VARCHAR(255) NOT NULL,
    instructor_emp_id VARCHAR(64),
    department VARCHAR(32) NOT NULL,
    total_lectures INT DEFAULT 45,
    modules JSONB DEFAULT '[]'::jsonb,
    reference_books JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high performance searches
CREATE INDEX idx_documents_branch_sem ON documents(branch, semester);
CREATE INDEX idx_documents_type ON documents(type);
CREATE INDEX idx_attendance_student ON attendance(student_hallticket);
CREATE INDEX idx_quiz_results_hallticket ON quiz_results(student_hallticket);
CREATE INDEX idx_faculty_department ON faculty(department);
