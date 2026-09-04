# KMCE Pathyakram - Database Architecture

This directory contains the database schema, seeds, Docker container configuration, and migration scripts for the **Pathyakram by KMCE** academic portal.

---

## 1. Quick Start with Docker (1-Click Setup)

If you have Docker Desktop installed, run:
```bash
cd database
docker compose up -d
```
This automatically boots a **PostgreSQL 16** server on `localhost:5432`, creates the `kmce_pathyakram` database, runs `schema.sql`, and imports all seed records from `seed.sql`.

---

## 2. Using Existing Local PostgreSQL or Cloud Database (Neon / Supabase / Render)

Set your connection string in `backend/.env`:
```env
DATABASE_URL=postgresql://kmce_admin:kmce_secret_password@localhost:5432/kmce_pathyakram
```
Or use cloud providers:
- **Neon:** `postgresql://username:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`
- **Supabase:** `postgresql://postgres:password@db.xyz.supabase.co:5432/postgres`

Then run the migration script:
```bash
npm run db:setup
```

---

## 3. Database Tables Overview

| Table | Description |
| :--- | :--- |
| `faculty` | HOD and professor profiles, designations, assigned subjects, and research areas. |
| `students` | Student hallticket, department, semester, and academic records. |
| `documents` | Academic question papers (Mid-1, Mid-2, Semester Regular), lesson plans, and lab manuals. |
| `notifications` | Broadcast announcements dispatched to students and faculty. |
| `attendance` | Subject-wise theory & lab attendance tracking with percentage calculations. |
| `quiz_results` | Student quiz attempt submissions, scores, and topic breakdown analytics. |
| `courses` | Course listings, credits, module syllabi, and reference textbooks. |
