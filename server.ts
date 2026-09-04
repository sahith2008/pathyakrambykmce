import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google Gen AI helper with telemetry header
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// In-memory persistent collections during runtime
let uploadedDocuments: any[] = [];
let broadcastNotifications: any[] = [];
let quizHistory: any[] = [];

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', app: 'Pathyakram by KMCE', time: new Date().toISOString() });
});

// Document APIs
app.get('/api/documents', (req, res) => {
  res.json({ documents: uploadedDocuments });
});

app.post('/api/documents', (req, res) => {
  const doc = req.body;
  if (!doc.title || !doc.subjectCode || !doc.branch) {
    return res.status(400).json({ error: 'Missing required document fields' });
  }
  const newDoc = {
    ...doc,
    id: doc.id || `doc-custom-${Date.now()}`,
    uploadDate: new Date().toISOString().split('T')[0],
    downloadCount: 0,
  };
  uploadedDocuments.unshift(newDoc);
  res.json({ success: true, document: newDoc });
});

app.delete('/api/documents/:id', (req, res) => {
  const { id } = req.params;
  uploadedDocuments = uploadedDocuments.filter((d) => d.id !== id);
  res.json({ success: true, message: 'Document removed' });
});

// Push Notifications API
app.get('/api/notifications', (req, res) => {
  res.json({ notifications: broadcastNotifications });
});

app.post('/api/notifications', (req, res) => {
  const notif = req.body;
  if (!notif.title || !notif.message) {
    return res.status(400).json({ error: 'Missing title or message' });
  }
  const newNotif = {
    ...notif,
    id: `notif-${Date.now()}`,
    timestamp: 'Just now',
    read: false,
  };
  broadcastNotifications.unshift(newNotif);
  res.json({ success: true, notification: newNotif });
});

// AI Topic Quiz Generator API (JNTUH R25 B.Tech Curriculum)
app.post('/api/gemini/generate-quiz', async (req, res) => {
  const { branch, semester, subjectName, topic, difficulty, questionCount = 5 } = req.body;

  try {
    const ai = getAi();
    if (!ai) {
      // Return a curated fallback if key not configured yet
      return res.json({
        source: 'curated_fallback',
        quiz: {
          title: `JNTUH R25 ${subjectName}: ${topic} Practice`,
          branch,
          semester,
          subjectName,
          topic,
          difficulty: difficulty || 'Medium',
          questions: [
            {
              id: `ai-q-1`,
              question: `In JNTUH R25 ${subjectName} (${topic}), which design principle is essential for optimizing system throughput and algorithmic latency?`,
              options: [
                'Minimizing time complexity overhead via dynamic memoization or pipelining',
                'Increasing clock cycle period indefinitely',
                'Avoiding modular design abstractions',
                'Disabling boundary assertions'
              ],
              correctAnswer: 0,
              explanation: 'In engineering curriculum and JNTUH R25 benchmarks, optimizing algorithmic latency requires memoization, dynamic programming, or pipelining.',
              topic: topic,
              difficulty: difficulty || 'Medium'
            },
            {
              id: `ai-q-2`,
              question: `What is the primary trade-off encountered when implementing ${topic} in ${branch} engineering systems?`,
              options: [
                'Trade-off between time complexity and space/hardware memory consumption',
                'Zero impact on resource utilization',
                'Purely subjective UI preference',
                'Unconditional linear scalability without constraints'
              ],
              correctAnswer: 0,
              explanation: 'Fundamental engineering trade-offs in JNTUH R25 design focus on Time vs Space and Area vs Power trade-offs.',
              topic: topic,
              difficulty: difficulty || 'Medium'
            }
          ]
        }
      });
    }

    const prompt = `You are a Senior JNTUH Hyderabad B.Tech Engineering Professor and Board of Studies Curriculum Architect for R25 Regulations.
Generate a rigorous, high-quality, authentic multiple-choice quiz for the following parameters:
- Engineering Branch: ${branch} (e.g. CSE - Computer Science, CSM - CSE AI & ML, ECE - Electronics & Communication)
- Semester: Semester ${semester}
- Subject: ${subjectName}
- Specific Topic: ${topic}
- Target Difficulty Level: ${difficulty || 'Medium'} (Aligned with JNTUH R25 / GATE Exam standard)
- Number of Questions: ${questionCount}

Rules:
1. Questions must be technically accurate, conceptual, or computational based on the JNTUH R25 syllabus.
2. Provide exactly 4 options per question.
3. Indicate the zero-based index (0, 1, 2, or 3) of the correct option in correctAnswer.
4. Include a detailed, educational explanation elucidating the exact formula, derivation, or core principle for why the correct answer is right.
5. Provide a crisp topic label for each question.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            branch: { type: Type.STRING },
            semester: { type: Type.INTEGER },
            subjectName: { type: Type.STRING },
            topic: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                  topic: { type: Type.STRING },
                  difficulty: { type: Type.STRING },
                },
                required: ['id', 'question', 'options', 'correctAnswer', 'explanation', 'topic'],
              },
            },
          },
          required: ['title', 'questions'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({ source: 'gemini_ai', quiz: parsed });
  } catch (error: any) {
    console.error('Quiz Generation Error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to generate AI quiz',
      fallbackMessage: 'Falling back to offline curriculum database.'
    });
  }
});

// AI Question Explainer & Doubt Clearing
app.post('/api/gemini/explain-solution', async (req, res) => {
  const { question, options, correctAnswer, subject, studentQuery } = req.body;
  try {
    const ai = getAi();
    if (!ai) {
      return res.json({
        explanation: `The correct option is: "${options[correctAnswer]}". In ${subject}, this principle follows directly from the JNTUH R25 standard textbook definitions and mathematical derivations.`
      });
    }

    const prompt = `As a JNTUH Hyderabad engineering tutor, explain this question to a student who has doubt:
Subject: ${subject}
Question: ${question}
Options: ${JSON.stringify(options)}
Correct Answer: Option ${correctAnswer} (${options[correctAnswer]})
Student Specific Question/Confusion: ${studentQuery || 'Explain step by step why this option is correct and why the other options are incorrect.'}

Provide a clear, pedagogical, student-friendly explanation with key formulas and exam tips.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
    });

    res.json({ explanation: response.text });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Error generating AI explanation' });
  }
});

// Vite middleware / production static handling
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Pathyakram by KMCE server running on http://0.0.0.0:${PORT}`);
  });
}

start();
