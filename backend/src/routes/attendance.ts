import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const attendanceRouter = Router();

let memoryAttendance: any[] = [
  {
    id: 'att-1',
    studentHallticket: '23KM1A0542',
    subjectCode: 'CS402PC',
    subjectName: 'Design & Analysis of Algorithms',
    branch: 'CSE',
    semester: 4,
    facultyName: 'Dr. P. Murali Krishna',
    totalClasses: 42,
    attendedClasses: 36,
    percentage: 85.7,
    type: 'Theory',
    lastUpdated: 'Yesterday',
  },
  {
    id: 'att-2',
    studentHallticket: '23KM1A0542',
    subjectCode: 'CS403PC',
    subjectName: 'Database Management Systems',
    branch: 'CSE',
    semester: 4,
    facultyName: 'Prof. Ananya Varma',
    totalClasses: 38,
    attendedClasses: 31,
    percentage: 81.5,
    type: 'Theory',
    lastUpdated: 'Yesterday',
  },
  {
    id: 'att-3',
    studentHallticket: '23KM1A0542',
    subjectCode: 'CS404PC',
    subjectName: 'Operating Systems',
    branch: 'CSE',
    semester: 4,
    facultyName: 'Dr. B. Suresh',
    totalClasses: 40,
    attendedClasses: 29,
    percentage: 72.5,
    type: 'Theory',
    lastUpdated: '2 days ago',
  },
];

// GET /api/attendance
attendanceRouter.get('/', async (req, res) => {
  const { hallticket, branch } = req.query;

  try {
    if (isConnected()) {
      let sql = 'SELECT * FROM attendance';
      const params: any[] = [];
      if (hallticket) {
        sql += ' WHERE student_hallticket = $1';
        params.push(hallticket);
      } else if (branch) {
        sql += ' WHERE branch = $1';
        params.push(branch);
      }
      sql += ' ORDER BY subject_name ASC';

      const result = await query(sql, params);
      const formatted = result.rows.map((r) => ({
        id: r.id,
        studentHallticket: r.student_hallticket,
        subjectCode: r.subject_code,
        subjectName: r.subject_name,
        branch: r.branch,
        semester: r.semester,
        facultyName: r.faculty_name,
        totalClasses: r.total_classes,
        attendedClasses: r.attended_classes,
        percentage: Number(r.percentage),
        type: r.type,
        lastUpdated: r.last_updated,
      }));
      return res.json({ attendance: formatted, source: 'postgresql' });
    }
    res.json({ attendance: memoryAttendance, source: 'memory_fallback' });
  } catch (err) {
    res.json({ attendance: memoryAttendance, source: 'fallback_error' });
  }
});

// POST /api/attendance/mark
attendanceRouter.post('/mark', async (req, res) => {
  const { id, attendedClasses, totalClasses, percentage } = req.body;
  if (!id) {
    return res.status(400).json({ error: 'Missing attendance record id' });
  }

  try {
    if (isConnected()) {
      await query(
        `UPDATE attendance 
         SET attended_classes = $1, total_classes = $2, percentage = $3, last_updated = 'Just now'
         WHERE id = $4`,
        [attendedClasses, totalClasses, percentage, id]
      );
    }
  } catch (err) {
    console.warn('Attendance update warning:', err);
  }

  memoryAttendance = memoryAttendance.map((item) =>
    item.id === id
      ? { ...item, attendedClasses, totalClasses, percentage, lastUpdated: 'Just now' }
      : item
  );

  res.json({ success: true, message: 'Attendance updated' });
});
