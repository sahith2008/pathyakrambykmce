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

function extractJsonFromText(rawText: string): any {
  if (!rawText) return null;
  try {
    return JSON.parse(rawText.trim());
  } catch (_) {}

  const cleaned = rawText.replace(/```(?:json)?\s*([\s\S]*?)\s*```/gi, '$1').trim();
  try {
    return JSON.parse(cleaned);
  } catch (_) {}

  const firstBrace = rawText.indexOf('{');
  const lastBrace = rawText.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(rawText.substring(firstBrace, lastBrace + 1));
    } catch (_) {}
  }

  return null;
}

function generateFallbackQuiz(branch: string, semester: any, subjectName: string, topic: string, difficulty: string, questionCount: number) {
  const diff = difficulty || 'Medium';
  const count = Math.max(1, Math.min(questionCount || 5, 10));
  const questions = [
    {
      id: 'ai-q-1',
      question: `In JNTUH R25 ${subjectName} regarding "${topic}", which core design principle is essential for optimizing system throughput and algorithmic latency?`,
      options: [
        'Minimizing time complexity overhead via dynamic memoization or pipelining',
        'Increasing clock cycle period indefinitely without constraints',
        'Avoiding modular design abstractions and monolithic coupling',
        'Disabling boundary assertions and runtime verification',
      ],
      correctAnswer: 0,
      explanation: `In standard JNTUH R25 engineering curriculum for ${subjectName}, optimizing throughput and algorithmic latency mandates memoization, pipelining, and modular abstraction.`,
      topic: topic || 'Core Principles',
      difficulty: diff,
    },
    {
      id: 'ai-q-2',
      question: `What primary trade-off is encountered when implementing ${topic} in modern ${branch || 'Engineering'} systems?`,
      options: [
        'Trade-off between time complexity and space/memory utilization',
        'Zero impact on system resource allocation and memory bandwidth',
        'Purely aesthetic UI formatting with no computational bearing',
        'Infinite linear scalability without physical hardware limitations',
      ],
      correctAnswer: 0,
      explanation: `Fundamental engineering design in JNTUH R25 focuses on balancing Time vs Space complexity and Area vs Power consumption for ${topic}.`,
      topic: topic || 'System Trade-offs',
      difficulty: diff,
    },
    {
      id: 'ai-q-3',
      question: `According to standard JNTUH R25 syllabi, which methodology is best suited for analyzing asymptotic bounds in ${topic}?`,
      options: [
        'Master Theorem and recurrence relations analysis',
        'Linear extrapolation without boundary testing',
        'Heuristic random guessing',
        'Static constant-time substitution',
      ],
      correctAnswer: 0,
      explanation: `Master theorem and recurrence relation decomposition are the primary formal methods prescribed for asymptotic complexity in JNTUH R25.`,
      topic: topic || 'Analytical Methodology',
      difficulty: diff,
    },
    {
      id: 'ai-q-4',
      question: `When deploying architectures centered around "${topic}", which fault-tolerance metric is most critical in real-time engineering applications?`,
      options: [
        'Mean Time Between Failures (MTBF) and graceful degradation',
        'Total disregard for unexpected edge-case exceptions',
        'Maximum unbuffered queue overflow rate',
        'Disabling watchdog timers and error logs',
      ],
      correctAnswer: 0,
      explanation: `High reliability engineering standards prioritize MTBF, automated recovery, and graceful degradation during fault states.`,
      topic: topic || 'Reliability & Fault Tolerance',
      difficulty: diff,
    },
    {
      id: 'ai-q-5',
      question: `In practical laboratory and semester examinations for ${subjectName}, how is verification of "${topic}" rigorously validated?`,
      options: [
        'Unit testing with comprehensive boundary value analysis and test vectors',
        'Visual inspection of source files without execution',
        'Compilation with all optimization flags disabled',
        'Single arbitrary positive sample verification only',
      ],
      correctAnswer: 0,
      explanation: `Comprehensive boundary-value testing and test-vector simulation ensure compliance with JNTUH R25 practical evaluation criteria.`,
      topic: topic || 'Verification & Testing',
      difficulty: diff,
    },
  ].slice(0, count);

  return {
    title: `JNTUH R25 ${subjectName}: ${topic} Practice Assessment`,
    branch,
    semester,
    subjectName,
    topic,
    difficulty: diff,
    questions,
  };
}

// POST /api/gemini/generate-quiz
geminiRouter.post('/generate-quiz', async (req, res) => {
  const { branch, semester, subjectName, topic, difficulty, questionCount = 5 } = req.body;

  try {
    const ai = getAi();
    if (!ai) {
      return res.json({
        source: 'curated_fallback',
        quiz: generateFallbackQuiz(branch, semester, subjectName, topic, difficulty, questionCount),
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
5. Provide a crisp topic label for each question.
6. Return only valid JSON adhering strictly to the schema. Do not prefix or suffix with markdown or commentary.`;

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

    const rawText = response.text || '';
    const parsed = extractJsonFromText(rawText);

    if (parsed && Array.isArray(parsed.questions) && parsed.questions.length > 0) {
      return res.json({ source: 'gemini_ai', quiz: parsed });
    }

    console.warn('Gemini response could not be parsed as JSON, falling back:', rawText.substring(0, 100));
    return res.json({
      source: 'curated_fallback',
      quiz: generateFallbackQuiz(branch, semester, subjectName, topic, difficulty, questionCount),
    });
  } catch (error: any) {
    console.error('Quiz Generation Error, using fallback:', error);
    return res.json({
      source: 'curated_fallback',
      quiz: generateFallbackQuiz(branch, semester, subjectName, topic, difficulty, questionCount),
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
