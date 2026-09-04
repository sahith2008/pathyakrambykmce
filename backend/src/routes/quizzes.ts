import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const quizzesRouter = Router();

let memoryQuizResults: any[] = [
  {
    id: 'res-seed-1',
    quizId: 'quiz-cse-1',
    quizTitle: 'JNTUH R25 Design & Analysis of Algorithms Mastery Test',
    subjectName: 'Design and Analysis of Algorithms',
    branch: 'CSE',
    studentHallTicket: '23KM1A0542',
    studentName: 'V. Sahith Reddy',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    timeSpentSeconds: 145,
    timestamp: 'Yesterday',
    topicBreakdown: [
      { topic: 'Asymptotic Notation', correct: 2, total: 2 },
      { topic: 'Divide & Conquer', correct: 1, total: 2 },
      { topic: 'Greedy Strategy', correct: 1, total: 1 },
    ],
  },
];

// GET /api/quizzes/results
quizzesRouter.get('/results', async (req, res) => {
  const { hallticket } = req.query;
  try {
    if (isConnected()) {
      let sql = 'SELECT * FROM quiz_results';
      const params: any[] = [];
      if (hallticket) {
        sql += ' WHERE student_hallticket = $1';
        params.push(hallticket);
      }
      sql += ' ORDER BY created_at DESC';

      const result = await query(sql, params);
      const formatted = result.rows.map((r) => ({
        id: r.id,
        quizId: r.quiz_id,
        quizTitle: r.quiz_title,
        subjectName: r.subject_name,
        branch: r.branch,
        studentHallTicket: r.student_hallticket,
        studentName: r.student_name,
        score: r.score,
        totalQuestions: r.total_questions,
        percentage: Number(r.percentage),
        timeSpentSeconds: r.time_spent_seconds,
        userAnswers: r.user_answers,
        topicBreakdown: r.topic_breakdown,
        timestamp: r.timestamp_text,
      }));
      return res.json({ results: formatted, source: 'postgresql' });
    }
    res.json({ results: memoryQuizResults, source: 'memory_fallback' });
  } catch (err) {
    res.json({ results: memoryQuizResults, source: 'fallback_error' });
  }
});

// POST /api/quizzes/results
quizzesRouter.post('/results', async (req, res) => {
  const result = req.body;
  if (!result.quizId || result.score === undefined) {
    return res.status(400).json({ error: 'Missing quiz result data' });
  }

  const newResult = {
    ...result,
    id: result.id || `res-${Date.now()}`,
    timestamp: 'Just now',
  };

  try {
    if (isConnected()) {
      await query(
        `INSERT INTO quiz_results (
          id, quiz_id, quiz_title, subject_name, branch, student_hallticket,
          student_name, score, total_questions, percentage, time_spent_seconds,
          user_answers, topic_breakdown, timestamp_text
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        [
          newResult.id,
          newResult.quizId,
          newResult.quizTitle || 'Quiz',
          newResult.subjectName || 'Engineering',
          newResult.branch || 'CSE',
          newResult.studentHallTicket || '23KM1A0542',
          newResult.studentName || 'Student',
          newResult.score,
          newResult.totalQuestions,
          newResult.percentage,
          newResult.timeSpentSeconds || 0,
          JSON.stringify(newResult.userAnswers || []),
          JSON.stringify(newResult.topicBreakdown || []),
          newResult.timestamp,
        ]
      );
    }
  } catch (err) {
    console.warn('Quiz result insert warning:', err);
  }

  memoryQuizResults.unshift(newResult);
  res.json({ success: true, result: newResult });
});
