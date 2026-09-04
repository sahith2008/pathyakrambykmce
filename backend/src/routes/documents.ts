import { Router } from 'express';
import { query, isConnected } from '../config/db.js';

export const documentsRouter = Router();

// Fallback in-memory store
let memoryDocuments: any[] = [
  {
    id: 'doc-1',
    title: 'Design & Analysis of Algorithms - Mid-1 Question Paper',
    type: 'question_paper',
    branch: 'CSE',
    semester: 4,
    subjectCode: 'CS402PC',
    subjectName: 'Design and Analysis of Algorithms',
    academicYear: '2024-25',
    examType: 'Mid-1',
    uploadedBy: 'Dr. P. Murali Krishna (HOD - CSE)',
    uploaderEmpId: 'KMCE-CSE-001',
    uploadDate: '2025-02-14',
    fileSize: '2.4 MB',
    fileUrl: '/documents/DAA_Mid1_2025.pdf',
    downloadCount: 382,
    description: 'Official JNTUH R25 Mid-1 Question Paper covering Asymptotic Notations, Divide and Conquer, and Dynamic Programming principles.',
    curriculum: 'R25',
    examDate: '2025-02-10',
    syllabusCovered: 'Units 1 and 2: Asymptotic analysis, Recurrence relations, Divide & Conquer (Merge/Quick Sort), Greedy method intro.',
    questionsPreview: {
      sectionA: [
        'Define Big-O and Little-o notations with formal mathematical limits.',
        'State Master Theorem for divide-and-conquer recurrences with edge cases.',
        'Compare greedy choice property vs optimal substructure.',
        'Formulate the recurrence relation for Strassen matrix multiplication.',
      ],
      sectionB: [
        { qNum: 'Q1 (a)', text: 'Solve the recurrence T(n) = 3T(n/4) + cn^2 using Master Theorem method.', marks: 5 },
        { qNum: 'Q1 (b)', text: 'Explain Huffman Coding algorithm and find optimal prefix codes.', marks: 5 },
      ],
    },
  },
  {
    id: 'doc-2',
    title: 'Machine Learning Foundations - Mid-1 Question Paper',
    type: 'question_paper',
    branch: 'CSM',
    semester: 4,
    subjectCode: 'AI401PC',
    subjectName: 'Machine Learning Foundations',
    academicYear: '2024-25',
    examType: 'Mid-1',
    uploadedBy: 'Dr. S. Radhika Devi (HOD - CSM)',
    uploaderEmpId: 'KMCE-CSM-001',
    uploadDate: '2025-02-16',
    fileSize: '3.1 MB',
    fileUrl: '/documents/ML_Mid1_2025.pdf',
    downloadCount: 418,
    description: 'JNTUH R25 CSM curriculum exam focusing on Supervised Learning, Cost Functions, Regularization, and Gradient Descent.',
    curriculum: 'R25',
    examDate: '2025-02-12',
    syllabusCovered: 'Units 1 and 2: Linear Regression, Logistic Regression, Loss Functions, Gradient Descent Variants, Regularization.',
    questionsPreview: {
      sectionA: [
        'Explain Bias-Variance tradeoff with appropriate graphical representation.',
        'Why is MSE not suitable as a loss function for Logistic Regression?',
        'Differentiate between Batch Gradient Descent and Stochastic Gradient Descent (SGD).',
      ],
      sectionB: [
        { qNum: 'Q1 (a)', text: 'Derive the closed-form Normal Equation for Multivariate Linear Regression.', marks: 5 },
      ],
    },
  },
];

// GET /api/documents
documentsRouter.get('/', async (req, res) => {
  try {
    if (isConnected()) {
      const result = await query('SELECT * FROM documents ORDER BY created_at DESC');
      // Format column names from snake_case to camelCase
      const formatted = result.rows.map((row) => ({
        id: row.id,
        title: row.title,
        type: row.type,
        branch: row.branch,
        semester: row.semester,
        subjectCode: row.subject_code,
        subjectName: row.subject_name,
        academicYear: row.academic_year,
        examType: row.exam_type,
        uploadedBy: row.uploaded_by,
        uploaderEmpId: row.uploader_emp_id,
        uploadDate: row.upload_date,
        fileSize: row.file_size,
        fileUrl: row.file_url,
        downloadCount: row.download_count,
        description: row.description,
        curriculum: row.curriculum,
        examDate: row.exam_date,
        syllabusCovered: row.syllabus_covered,
        questionsPreview: row.questions_preview,
      }));
      return res.json({ documents: formatted, source: 'postgresql' });
    }
    res.json({ documents: memoryDocuments, source: 'memory_fallback' });
  } catch (err: any) {
    console.error('Error fetching documents:', err);
    res.json({ documents: memoryDocuments, source: 'fallback_error' });
  }
});

// POST /api/documents
documentsRouter.post('/', async (req, res) => {
  const doc = req.body;
  if (!doc.title || !doc.subjectCode || !doc.branch) {
    return res.status(400).json({ error: 'Missing required document fields' });
  }

  const newDoc = {
    ...doc,
    id: doc.id || `doc-custom-${Date.now()}`,
    uploadDate: new Date().toISOString().split('T')[0],
    downloadCount: 0,
    curriculum: doc.curriculum || 'R25',
    fileSize: doc.fileSize || '1.8 MB',
  };

  try {
    if (isConnected()) {
      await query(
        `INSERT INTO documents (
          id, title, type, branch, semester, subject_code, subject_name,
          academic_year, exam_type, uploaded_by, uploader_emp_id, upload_date,
          file_size, file_url, download_count, description, curriculum, questions_preview
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
        [
          newDoc.id,
          newDoc.title,
          newDoc.type || 'question_paper',
          newDoc.branch,
          newDoc.semester || 4,
          newDoc.subjectCode,
          newDoc.subjectName || newDoc.title,
          newDoc.academicYear || '2024-25',
          newDoc.examType || 'Mid-1',
          newDoc.uploadedBy || 'Faculty Member',
          newDoc.uploaderEmpId || 'KMCE-FAC',
          newDoc.uploadDate,
          newDoc.fileSize,
          newDoc.fileUrl || '/documents/sample.pdf',
          0,
          newDoc.description || '',
          newDoc.curriculum,
          JSON.stringify(newDoc.questionsPreview || {}),
        ]
      );
    }
  } catch (dbErr) {
    console.warn('Could not insert to PostgreSQL, persisting to memory:', dbErr);
  }

  memoryDocuments.unshift(newDoc);
  res.json({ success: true, document: newDoc });
});

// DELETE /api/documents/:id
documentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (isConnected()) {
      await query('DELETE FROM documents WHERE id = $1', [id]);
    }
  } catch (err) {
    console.warn('Database delete warning:', err);
  }
  memoryDocuments = memoryDocuments.filter((d) => d.id !== id);
  res.json({ success: true, message: 'Document removed' });
});
