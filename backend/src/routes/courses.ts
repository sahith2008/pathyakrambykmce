import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const coursesRouter = Router();

let memoryCourses: any[] = [
  {
    id: 'crs-1',
    courseCode: 'CS402PC',
    courseName: 'Design and Analysis of Algorithms',
    branch: 'CSE',
    semester: 4,
    credits: 4,
    instructorName: 'Dr. P. Murali Krishna',
    instructorEmpId: 'KMCE-CSE-001',
    department: 'CSE',
    totalLectures: 48,
    modules: [
      {
        unit: 1,
        title: 'Introduction & Asymptotic Analysis',
        topics: ['Algorithm definition', 'Order of growth', 'Big-O, Omega, Theta notations', 'Recurrence relations', 'Master theorem'],
        hours: 10,
      },
      {
        unit: 2,
        title: 'Divide and Conquer & Greedy Method',
        topics: ['Merge Sort', 'Quick Sort', 'Knapsack problem', 'Huffman codes', 'Job sequencing'],
        hours: 10,
      },
    ],
    referenceBooks: ['CLRS - Introduction to Algorithms', 'Horowitz & Sahni - Computer Algorithms'],
  },
];

// GET /api/courses
coursesRouter.get('/', async (req, res) => {
  try {
    if (isConnected()) {
      const result = await query('SELECT * FROM courses ORDER BY course_code ASC');
      const formatted = result.rows.map((r) => ({
        id: r.id,
        courseCode: r.course_code,
        courseName: r.course_name,
        branch: r.branch,
        semester: r.semester,
        credits: r.credits,
        instructorName: r.instructor_name,
        instructorEmpId: r.instructor_emp_id,
        department: r.department,
        totalLectures: r.total_lectures,
        modules: r.modules,
        referenceBooks: r.reference_books,
      }));
      return res.json({ courses: formatted, source: 'postgresql' });
    }
    res.json({ courses: memoryCourses, source: 'memory_fallback' });
  } catch (err) {
    res.json({ courses: memoryCourses, source: 'fallback_error' });
  }
});
