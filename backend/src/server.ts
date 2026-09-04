import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testDbConnection } from './config/db.js';
import { documentsRouter } from './routes/documents.js';
import { notificationsRouter } from './routes/notifications.js';
import { attendanceRouter } from './routes/attendance.js';
import { quizzesRouter } from './routes/quizzes.js';
import { facultyRouter } from './routes/faculty.js';
import { coursesRouter } from './routes/courses.js';
import { geminiRouter } from './routes/gemini.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'Pathyakram by KMCE Backend',
    version: '1.0.0',
    curriculum: 'JNTUH R25',
    timestamp: new Date().toISOString(),
  });
});

// Mount modular API routes
app.use('/api/documents', documentsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/attendance', attendanceRouter);
app.use('/api/quizzes', quizzesRouter);
app.use('/api/faculty', facultyRouter);
app.use('/api/courses', coursesRouter);
app.use('/api/gemini', geminiRouter);

// Start server and verify DB connection
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n======================================================`);
  console.log(`🎓 KMCE Pathyakram Backend API running on port ${PORT}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
  console.log(`======================================================`);
  await testDbConnection();
});
