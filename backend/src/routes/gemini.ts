import { Router } from 'express';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

export const geminiRouter = Router();

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

// POST /api/gemini/generate-quiz
geminiRouter.post('/generate-quiz', async (req, res) => {
  const { branch, semester, subjectName, topic, difficulty, questionCount = 5 } = req.body;

  try {
    const ai = getAi();
    if (!ai) {
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
              id: 'ai-q-1',
              question: `In JNTUH R25 ${subjectName} (${topic}), which design principle is essential for optimizing system throughput and algorithmic latency?`,
              options: [
                'Minimizing time complexity overhead via dynamic memoization or pipelining',
                'Increasing clock cycle period indefinitely',
                'Avoiding modular design abstractions',
                'Disabling boundary assertions',
              ],
              correctAnswer: 0,
              explanation: 'In engineering curriculum and JNTUH R25 benchmarks, optimizing algorithmic latency requires memoization, dynamic programming, or pipelining.',
              topic: topic,
              difficulty: difficulty || 'Medium',
            },
            {
              id: 'ai-q-2',
              question: `What is the primary trade-off encountered when implementing ${topic} in ${branch} engineering systems?`,
              options: [
                'Trade-off between time complexity and space/hardware memory consumption',
                'Zero impact on resource utilization',
                'Purely subjective UI preference',
                'Unconditional linear scalability without constraints',
              ],
              correctAnswer: 0,
              explanation: 'Fundamental engineering trade-offs in JNTUH R25 design focus on Time vs Space and Area vs Power trade-offs.',
              topic: topic,
              difficulty: difficulty || 'Medium',
            },
          ],
        },
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
4. Include a detailed, educational explanation elucidating the exact formula, derivation, or core principle.
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
      fallbackMessage: 'Falling back to offline curriculum database.',
    });
  }
});

// POST /api/gemini/explain-solution
geminiRouter.post('/explain-solution', async (req, res) => {
  const { question, options, correctAnswer, subject, studentQuery } = req.body;
  try {
    const ai = getAi();
    if (!ai) {
      return res.json({
        explanation: `The correct option is: "${options[correctAnswer]}". In ${subject}, this principle follows directly from JNTUH R25 standard textbook definitions and mathematical derivations.`,
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
