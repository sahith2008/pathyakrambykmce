# 🎓 Pathyakram by KMCE (पाठ्यक्रम)

> **Comprehensive Academic Portal & Digital Learning Repository for Keshav Memorial College of Engineering (KMCE), Hyderabad**  
> *Affiliated to JNTUH | Autonomous Curriculum Regulations (R25, R22, R18)*

[![Node.js](https://img.shields.io/badge/Node.js-v20%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI_Tutor-8E75B2?logo=google&logoColor=white)](https://ai.google.dev/)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-5A0FC8?logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-KMCE_Academic-800020)](LICENSE)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [1. Branch-wise Question Papers Hub](#1-branch-wise-question-papers-hub)
  - [2. R25 Syllabus Quizzes & AI Tutor (Google Gemini)](#2-r25-syllabus-quizzes--ai-tutor-google-gemini)
  - [3. Smart Attendance Tracker & Bunk Calculator](#3-smart-attendance-tracker--bunk-calculator)
  - [4. Faculty Directory & HOD Portfolios](#4-faculty-directory--hod-portfolios)
  - [5. Faculty Document Hub](#5-faculty-document-hub)
  - [6. Course Syllabus & Reference Textbook Catalog](#6-course-syllabus--reference-textbook-catalog)
  - [7. Real-Time Broadcast Notice Board](#7-real-time-broadcast-notice-board)
  - [8. Offline-First PWA Sync Center](#8-offline-first-pwa-sync-center)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Installation](#-getting-started--installation)
  - [Prerequisites](#prerequisites)
  - [Environment Configuration](#environment-configuration)
  - [Database Setup](#database-setup)
- [Running the Application](#-running-the-application)
  - [Option A: Unified Full-Stack Mode (Recommended)](#option-a-unified-full-stack-mode-recommended)
  - [Option B: Decoupled Multi-Tier Mode](#option-b-decoupled-multi-tier-mode)
  - [Option C: Production Build](#option-c-production-build)
- [Database Schema & Data Model](#-database-schema--data-model)
- [API Reference](#-api-reference)
- [Demo Credentials](#-demo-credentials)
- [Contributing & Development Guidelines](#-contributing--development-guidelines)
- [College Information](#-college-information)

---

## 🌟 Overview

**Pathyakram by KMCE** is an end-to-end academic portal designed to modernize and streamline the academic lifecycle for students and faculty at **Keshav Memorial College of Engineering (KMCE)**.

Built around the rigorous **JNTUH R25 Autonomous Curriculum**, Pathyakram bridges the gap between fragmented course handouts, elusive previous year question papers, manual attendance calculations, and static study materials by providing:
1. Instant branch-and-semester-filtered access to verified question papers and blueprints.
2. An interactive **AI-powered quiz generation & doubt-clearing engine** driven by Google's Gemini models.
3. Accurate **attendance tracking with smart condonation projections** (75% threshold analysis).
4. Direct access to **Faculty and Head of Department (HOD)** profiles, office hours, and document uploads.
5. **Offline PWA support** ensuring critical papers and revision guides remain accessible even without internet connectivity.

---

## 🚀 Key Features

### 1. Branch-wise Question Papers Hub
- **Multi-Filter Navigation:** Filter question papers instantly across engineering branches (**CSE**, **CSM / AI & ML**, **CSD / Data Science**, **ECE**, **IT**), Semesters (1 through 8), and Exam Categories (**Mid-1**, **Mid-2**, **Semester Regular**, **Semester Supplementary**, **Model Papers**).
- **Interactive Blueprints:** Inspect question paper breakdowns in an in-browser modal featuring Section A (conceptual short questions) and Section B (computational/long analytical problems with marks distribution).
- **Download Metrics:** Live tracking of document download counts and file sizes.

### 2. R25 Syllabus Quizzes & AI Tutor (Google Gemini)
- **Autonomous Practice Engine:** Timed multiple-choice quizzes categorized by difficulty (**Easy**, **Medium**, **Hard**, and **GATE Level**).
- **Dynamic AI Quiz Generation:** Integrates the `@google/genai` SDK (`gemini-3.7-flash` / Gemini 2.5) to synthesize authentic, high-quality questions on any specific R25 subject and module topic on-the-fly.
- **Pedagogical AI Doubt Solver:** Students can submit specific points of confusion on quiz questions to receive step-by-step formula derivations and exam tips from the AI tutor.
- **Real-Time Feedback:** Instant grading, question-by-question explanations, topic-level performance analytics, and celebratory confetti animations.

### 3. Smart Attendance Tracker & Bunk Calculator
- **Theory & Laboratory Metrics:** Distinct tracking of theory lectures and practical lab sessions with colored progress indicators.
- **75% Mandatory Compliance Analyzer:** Automatic evaluation against JNTUH condonation norms:
  - **Safe Zone (≥ 75%):** Displays the exact number of classes a student can safely skip without falling below the 75% threshold.
  - **Condonation / Danger Zone (< 75%):** Calculates the exact number of consecutive lectures required to recover compliance.

### 4. Faculty Directory & HOD Portfolios
- **Department Leadership:** Dedicated profile cards for HODs and professors across CSE, CSM, and ECE departments.
- **Comprehensive Details:** Qualifications (IIT, NIT, JNTUH Ph.Ds), years of academic experience, cabin/office locations, assigned subjects, and specialized research areas.
- **Direct Contact:** Quick-action buttons to email or call professors directly from the app.

### 5. Faculty Document Hub
- **Authenticated Upload Portal:** Secure role-based interface allowing faculty members to upload new question papers, unit-wise lesson plans, lab manuals, and syllabus booklets.
- **Immediate Indexing:** Uploaded documents are instantly indexed into the searchable student repository with curriculum version tagging (`R25`, `R22`, `R18`).

### 6. Course Syllabus & Reference Textbook Catalog
- **Unit-by-Unit Breakdown:** Complete module listings for each subject covering Units I through V, estimated lecture hours, and credit weights.
- **Prescribed Textbooks:** Curated bibliography of standard university-recommended textbooks and reference materials (e.g., Cormen CLRS for Algorithms, Bishop for ML).

### 7. Real-Time Broadcast Notice Board
- **Categorized Announcements:** Announcements tagged with priority flags (**Urgent**, **High**, **Normal**) and categories (**Exams**, **Schedules**, **Attendance Circulars**, **Quizzes**).
- **Target Audience Filtering:** Direct announcements to specific branches or all students campus-wide.

### 8. Offline-First PWA Sync Center
- **Service Worker Caching:** Fully configured PWA (`manifest.json` and `sw.js`) supporting standalone home-screen installation on mobile and desktop.
- **Offline Storage & Action Queue:** Saves viewed question papers locally using IndexedDB / LocalStorage; queues user actions when offline and automatically flushes updates when connection restores.
- **Simulation Toggle:** Built-in "Simulate Offline Mode" testing switch directly in the UI.

---

## 🏛 System Architecture

```mermaid
flowchart TD
    subgraph Client["Frontend Client (React 19 + Vite + PWA)"]
        UI["Modern UI / NavigationTabs / Header"]
        Views["Papers | Quizzes | Attendance | Faculty | Courses | Auth"]
        OfflineSync["Offline Sync Center (LocalStorage / IndexedDB / SW)"]
        UI --> Views
        Views <--> OfflineSync
    end

    subgraph Server["Application Server & API Gateway"]
        UnifiedServer["Unified Dev/Prod Server (server.ts / Vite Middleware)"]
        APIRouter["Modular Express REST API (backend/src/routes)"]
        GeminiClient["Google Gen AI Engine (@google/genai)"]
        
        UnifiedServer --> APIRouter
        APIRouter --> GeminiClient
    end

    subgraph Data["Persistence & External Services"]
        Postgres[("PostgreSQL 16 Database (Docker / Neon / Supabase)")]
        MemoryCache[("In-Memory Fallback Cache")]
        GoogleAI[["Google Gemini API (Cloud Services)"]]
        
        APIRouter <--> Postgres
        APIRouter <--> MemoryCache
        GeminiClient <--> GoogleAI
    end

    Client <==>|HTTP / JSON REST API| Server
```

---

## 💻 Tech Stack

| Layer | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19**, **TypeScript 5.8** | Component-driven, type-safe Single Page Application |
| **Styling & Design** | **Tailwind CSS v4**, **Lucide Icons** | Contemporary design system with KMCE Burgundy (`#800020`) accents |
| **Animations & Effects** | **Motion (Framer Motion)**, **Canvas Confetti** | Smooth layout transitions, modal reveals, and celebratory particle effects |
| **Build & Dev Tooling** | **Vite 6**, **tsx**, **esbuild** | Fast HMR dev server and optimized production bundler |
| **Backend Framework** | **Express 4**, **Node.js (v20+)** | Scalable, modular REST API with route segregation |
| **Artificial Intelligence** | **@google/genai (Gemini 2.5 / 3.7-Flash)** | Automated JNTUH R25 quiz synthesis and pedagogical doubt resolution |
| **Database** | **PostgreSQL 16**, **node-postgres (`pg`)** | Relational data persistence with foreign keys and relational schemas |
| **PWA & Offline** | **Service Workers**, **Web App Manifest** | Offline caching of critical academic assets and sync queue |
| **Containerization** | **Docker**, **Docker Compose** | 1-click reproducible database environment setup |

---

## 📂 Project Directory Structure

```text
pathyakrambykmce/
├── assets/                         # Static graphics and branding assets
├── backend/                        # Dedicated modular backend API package
│   ├── .env.example                # Backend environment template
│   ├── package.json                # Backend dependency and script manifests
│   ├── tsconfig.json               # Backend TypeScript configuration
│   └── src/
│       ├── server.ts               # Standalone backend server entry point
│       ├── config/
│       │   └── db.ts               # PostgreSQL pool & fallback connection logic
│       └── routes/
│           ├── attendance.ts       # Attendance CRUD & statistics endpoints
│           ├── courses.ts          # Course catalog & syllabus modules
│           ├── documents.ts        # Academic papers & document management
│           ├── faculty.ts          # Faculty & HOD directory queries
│           ├── gemini.ts           # AI quiz generation & tutor endpoints
│           ├── notifications.ts    # Broadcast announcements & circulars
│           └── quizzes.ts          # Quiz definitions & student submissions
├── database/                       # Database migrations, schemas & seeds
│   ├── README.md                   # Dedicated database documentation
│   ├── docker-compose.yml          # PostgreSQL 16 local container configuration
│   ├── init.ts                     # TypeScript database migration runner
│   ├── schema.sql                  # DDL tables, foreign keys, and indexes
│   └── seed.sql                    # Pre-populated KMCE faculty, papers & courses
├── frontend/                       # Decoupled Vite frontend package
│   ├── package.json                # Frontend dependencies
│   ├── vite.config.ts              # Frontend Vite build configuration
│   └── src/                        # Frontend source root
├── public/                         # Public web assets
│   ├── manifest.json               # PWA Progressive Web App manifest
│   └── sw.js                       # Service Worker for offline asset caching
├── src/                            # Unified frontend source tree
│   ├── App.tsx                     # Main application layout & state orchestrator
│   ├── index.css                   # Tailwind CSS v4 design tokens and directives
│   ├── main.tsx                    # React DOM entry point
│   ├── types.ts                    # TypeScript data models and interface definitions
│   ├── components/                 # Reusable UI views & components
│   │   ├── AttendanceTrackerView.tsx   # Attendance meters & 75% target calculator
│   │   ├── AuthScreen.tsx              # Student & Faculty authentication portal
│   │   ├── CollegeInfoView.tsx         # KMCE campus highlights, vision, & map
│   │   ├── CourseListingsView.tsx      # R25 course catalog & module breakdown
│   │   ├── FacultyDirectoryView.tsx    # HOD and professor contact cards
│   │   ├── FacultyUploadView.tsx       # Faculty document publishing hub
│   │   ├── Header.tsx                  # Top navigation bar, search, & notifications
│   │   ├── NavigationTabs.tsx          # Main module navigation switch
│   │   ├── OfflineSyncCenterModal.tsx  # PWA offline cache manager
│   │   ├── PaperPreviewModal.tsx       # In-browser question paper inspection
│   │   ├── QuestionPapersView.tsx      # Branch & semester paper repository
│   │   ├── QuickActionFAB.tsx          # Floating action button for quick tasks
│   │   └── QuizView.tsx                # Interactive quizzes with Gemini AI tutor
│   ├── data/
│   │   └── mockData.ts             # Rich offline dataset of courses, papers & faculty
│   └── utils/
│       └── offlineStorage.ts       # LocalStorage & IndexedDB offline cache manager
├── .env.example                    # Root environment variable template
├── .gitignore                      # Git exclusion rules
├── index.html                      # HTML5 entry template
├── metadata.json                   # Application metadata descriptor
├── package.json                    # Root workspace package manifest
├── server.ts                       # Unified full-stack server (Vite + Express)
├── tsconfig.json                   # Root TypeScript configuration
└── vite.config.ts                  # Root Vite configuration
```

---

## ⚙️ Getting Started & Installation

### Prerequisites

- **Node.js**: v20.x or later installed ([Download Node.js](https://nodejs.org/))
- **npm** (v10+) or **Bun** (v1.0+)
- *(Optional)* **Docker Desktop** for running PostgreSQL locally ([Download Docker](https://www.docker.com/))

### Environment Configuration

1. Copy the example environment file at the root:
   ```bash
   cp .env.example .env
   ```

2. Configure your environment variables in `.env`:
   ```env
   # Required for AI Quiz Generation and Doubt Clearing
   GEMINI_API_KEY="your_google_gemini_api_key_here"

   # Optional port configuration (Defaults to 3000 in unified mode)
   PORT=3000
   ```

3. *(Optional for Backend Package)* Configure `backend/.env`:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://kmce_admin:kmce_secret_password@localhost:5432/kmce_pathyakram
   GEMINI_API_KEY="your_google_gemini_api_key_here"
   ```

> [!TIP]
> You can acquire a free Google Gemini API key by visiting [Google AI Studio](https://aistudio.google.com/). If omitted, the portal automatically operates using pre-curated fallback questions.

---

### Database Setup

Pathyakram features automated database fallback:
- If a live PostgreSQL instance is detected, it reads and writes to relational tables.
- If PostgreSQL is not active, it transparently operates using an in-memory database with cached seed data, ensuring zero friction during UI testing.

To enable live PostgreSQL persistence:

#### Option 1: 1-Click Docker Setup (Recommended)
```bash
# Navigate to database directory and start PostgreSQL 16
cd database
docker compose up -d
cd ..
```
*This starts a PostgreSQL 16 instance on `localhost:5432`, initializes `kmce_pathyakram`, and executes `schema.sql` and `seed.sql` automatically.*

#### Option 2: Local or Cloud PostgreSQL (Neon / Supabase / Render)
1. Ensure your `DATABASE_URL` in `backend/.env` points to your database instance:
   ```env
   # Example Neon Connection:
   DATABASE_URL=postgresql://username:password@ep-xyz.aws.neon.tech/neondb?sslmode=require
   ```
2. Execute the database migration runner:
   ```bash
   npm run db:setup
   ```

---

## 🏃 Running the Application

### Option A: Unified Full-Stack Mode (Recommended)
This runs both the React 19 frontend and Express backend concurrently through Vite middleware on a single port:
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
Open your browser and navigate to: **`http://localhost:3000`**

---

### Option B: Decoupled Multi-Tier Mode
Run the backend Express API on port `5000` and the Vite frontend on port `5173`:
```bash
# Run both frontend and backend concurrently
npm run dev:all
```
Or start each service in separate terminal windows:
```bash
# Terminal 1 - Backend API (Port 5000)
npm run dev:backend

# Terminal 2 - Frontend App (Port 5173)
npm run dev:frontend
```

---

### Option C: Production Build
```bash
# 1. Build frontend bundle and bundle the server
npm run build

# 2. Run the production server
npm start
```

---

## 🗄 Database Schema & Data Model

The PostgreSQL schema (`database/schema.sql`) contains the following tables:

| Table | Primary Key | Description |
| :--- | :--- | :--- |
| `faculty` | `id` (VARCHAR) | HOD & professor profiles, employee IDs, designations, cabins, and research areas. |
| `students` | `id` (VARCHAR) | Student hall ticket numbers, branch, semester, section, and email records. |
| `documents` | `id` (VARCHAR) | Academic question papers, lesson plans, lab manuals with JSON question blueprints. |
| `notifications` | `id` (VARCHAR) | Broadcast announcements with priority tags (`urgent`, `high`, `normal`). |
| `attendance` | `id` (VARCHAR) | Subject-wise attendance records (Theory vs. Lab) with calculated percentages. |
| `quiz_results` | `id` (VARCHAR) | Student quiz attempts, scores, time spent, and topic breakdown analytics. |
| `courses` | `id` (VARCHAR) | JNTUH R25 course catalog, credit counts, module syllabi, and reference books. |

---

## 📡 API Reference

### 1. System Health
- **`GET /api/health`**
  - Response: `{ "status": "ok", "app": "Pathyakram by KMCE", "time": "..." }`

### 2. Academic Documents & Question Papers
- **`GET /api/documents`**
  - Returns array of published question papers and syllabi.
  - Optional Query Params: `?branch=CSE&semester=4&type=question_paper`
- **`POST /api/documents`**
  - Uploads a new academic document.
  - Body: `{ "title": "...", "subjectCode": "...", "branch": "...", "type": "...", "fileSize": "..." }`
- **`DELETE /api/documents/:id`**
  - Removes a document by its ID.

### 3. Google Gemini AI Integration
- **`POST /api/gemini/generate-quiz`**
  - Generates a custom R25 multiple-choice quiz based on engineering parameters.
  - Body:
    ```json
    {
      "branch": "CSE",
      "semester": 4,
      "subjectName": "Design and Analysis of Algorithms",
      "topic": "Dynamic Programming & Matrix Chain Multiplication",
      "difficulty": "Medium",
      "questionCount": 5
    }
    ```
- **`POST /api/gemini/explain-solution`**
  - AI tutor explanation for student doubts on a question.
  - Body:
    ```json
    {
      "question": "Explain Big-O asymptotic notation...",
      "options": ["...", "..."],
      "correctAnswer": 0,
      "subject": "Design & Analysis of Algorithms",
      "studentQuery": "Why is option B incorrect in the worst-case scenario?"
    }
    ```

### 4. Real-Time Broadcast Notifications
- **`GET /api/notifications`**
  - Retrieves all active announcements.
- **`POST /api/notifications`**
  - Dispatches a new notification to students or faculty.
  - Body: `{ "title": "...", "message": "...", "priority": "urgent", "category": "exam" }`

### 5. Attendance Records
- **`GET /api/attendance`**
  - Query attendance by student hallticket: `?hallticket=23KM1A0542`
- **`POST /api/attendance`**
  - Update or record attendance for a student.

---

## 🔑 Demo Credentials

To test the application immediately without registration, use any of the pre-seeded credentials:

### Student Profiles
| Branch | Semester | Hall Ticket Number | Student Name |
| :--- | :--- | :--- | :--- |
| **CSE** | 4th Semester | `23KM1A0542` | V. Sahith Reddy |
| **CSM (AI & ML)** | 4th Semester | `23KM1A6615` | N. Sai Teja |
| **ECE** | 4th Semester | `23KM1A0418` | P. Sneha |

### Faculty & HOD Profiles
| Department | Designation | Employee ID | Faculty Name |
| :--- | :--- | :--- | :--- |
| **CSE** | Professor & HOD | `KMCE-CSE-001` | Dr. P. Murali Krishna |
| **CSM** | Professor & HOD | `KMCE-CSM-001` | Dr. S. Radhika Devi |
| **ECE** | Professor & HOD | `KMCE-ECE-001` | Dr. K. Venkat Rao |
| **CSE** | Associate Professor | `KMCE-CSE-004` | Prof. Ananya Varma |

---

## 🤝 Contributing & Development Guidelines

1. **Fork and Branch:** Create a feature branch (`git checkout -b feature/amazing-feature`).
2. **Type Safety:** Always run `npm run lint` (`tsc --noEmit`) before committing to maintain TypeScript type safety.
3. **Style Consistency:** Adhere to Tailwind CSS v4 styling standards and utilize predefined color tokens (`#800020` Burgundy, `#D4AF37` Gold accents).
4. **Pull Requests:** Submit clean pull requests with descriptive summaries of changes.

---

## 🏫 College Information

- **Institution:** Keshav Memorial College of Engineering (KMCE)
- **Affiliation:** Jawaharlal Nehru Technological University Hyderabad (JNTUH)
- **Location:** Keshava Nagar, Bandlaguda, Hyderabad, Telangana - 500068
- **Counseling Code:** `KMCE`
- **Official Website:** [https://kmce.edu.in](https://kmce.edu.in)

---

<div align="center">
  <sub>Engineered with precision for the students and faculty of Keshav Memorial College of Engineering (KMCE).</sub>
</div>
