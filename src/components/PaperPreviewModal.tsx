import React, { useState } from 'react';
import {
  BookOpen,
  Download,
  FileText,
  Printer,
  Sparkles,
  X,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { AcademicDocument } from '../types';
import { KMCE_COLLEGE_INFO } from '../data/mockData';

interface PaperPreviewModalProps {
  paper: AcademicDocument | null;
  onClose: () => void;
  onDownload: (paper: AcademicDocument) => void;
  onAskAiTutor?: (questionText: string, subject: string) => void;
}

export const PaperPreviewModal: React.FC<PaperPreviewModalProps> = ({
  paper,
  onClose,
  onDownload,
  onAskAiTutor
}) => {
  const [selectedQuestionForAi, setSelectedQuestionForAi] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  if (!paper) return null;

  const handleExplainQuestion = async (qText: string) => {
    setSelectedQuestionForAi(qText);
    setLoadingAi(true);
    try {
      const response = await fetch('/api/gemini/explain-solution', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qText,
          options: ['Option A', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 0,
          subject: paper.subjectName,
          studentQuery: `Please provide a complete, step-by-step model answer and explanation for this ${paper.subjectName} examination question according to JNTUH R25 criteria.`
        })
      });
      const data = await response.json();
      setAiExplanation(data.explanation || 'Model answer generated successfully.');
    } catch (e) {
      setAiExplanation('Could not load online explanation. Please refer to standard prescribed textbooks.');
    } finally {
      setLoadingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Sample default section preview if custom not supplied
  const previewData = paper.questionsPreview || {
    sectionA: [
      `Explain the fundamental definitions and core theorem of ${paper.subjectName}.`,
      `State the principal assumptions and boundary conditions in ${paper.subjectCode}.`,
      `Derive the key governing equation for Unit 1 topics.`,
      `Compare and contrast primary analytical models in ${paper.branch} engineering.`,
      `State two practical industrial applications of ${paper.subjectName}.`
    ],
    sectionB: [
      { qNum: 'Q1(a)', text: `Explain the detailed architecture and mathematical formulation of ${paper.subjectName} with neat diagrams.`, marks: 7 },
      { qNum: 'Q1(b)', text: `Solve the given analytical problem for steady-state response with standard parameters.`, marks: 8 },
      { qNum: 'Q2(a)', text: `Describe the state-of-the-art methodology used in JNTUH R25 curriculum for this domain.`, marks: 8 },
      { qNum: 'Q2(b)', text: `Write an algorithm or design procedure step-by-step with complexity analysis.`, marks: 7 }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Modal Toolbar (Non-printable) */}
        <div className="no-print flex items-center justify-between px-5 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-[#800020] dark:text-rose-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                {paper.subjectCode} - {paper.subjectName}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {paper.examType} ({paper.academicYear}) • {paper.branch} Semester {paper.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Print Question Paper"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Paper</span>
            </button>

            <button
              onClick={() => onDownload(paper)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#800020] hover:bg-[#68001a] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Paper Layout Document (Printable) */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-serif leading-relaxed selection:bg-rose-100">
          {/* Official University / KMCE Header */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-6">
            <div className="flex items-center justify-between text-xs font-sans font-bold text-slate-600 mb-2">
              <span>Code No: <strong className="text-slate-900 font-mono-code">{paper.subjectCode}</strong></span>
              <span className="border border-slate-800 px-3 py-0.5 rounded font-mono-code">
                HT No: [ _ _ _ _ _ _ _ _ _ _ ]
              </span>
              <span className="bg-slate-100 text-slate-800 px-2 py-0.5 font-semibold">
                Regulation: {paper.curriculum}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-slate-900 font-sans">
              {KMCE_COLLEGE_INFO.name}
            </h2>
            <p className="text-xs text-slate-700 font-sans">
              (Affiliated to JNTU • Hyderabad)
            </p>
            <h3 className="text-sm sm:text-base font-bold mt-2 uppercase text-slate-900 font-sans">
              B.Tech {paper.semester === 1 ? 'I' : paper.semester === 2 ? 'II' : paper.semester === 3 ? 'III' : paper.semester === 4 ? 'IV' : paper.semester === 5 ? 'V' : paper.semester === 6 ? 'VI' : paper.semester === 7 ? 'VII' : 'VIII'} Semester {paper.examType} Examination, {paper.academicYear}
            </h3>
            <h4 className="text-base sm:text-lg font-bold text-[#800020] mt-1 uppercase underline decoration-1">
              Branch: {paper.branch} — {paper.subjectName}
            </h4>

            <div className="flex items-center justify-between text-xs font-sans font-semibold text-slate-700 mt-3 pt-2 border-t border-slate-300">
              <span>Time: 3 Hours</span>
              <span>Max. Marks: 70 Marks</span>
            </div>
            <p className="text-[11px] font-sans text-slate-600 italic mt-1 text-left">
              Note: Question Paper consists of two parts (Part-A and Part-B). Answer all questions from Part-A. Answer five questions from Part-B choosing one question from each unit.
            </p>
          </div>

          {/* Part A: Compulsory Short Answer Questions */}
          <div className="mb-8">
            <div className="flex items-center justify-between bg-slate-100 px-3 py-1.5 border border-slate-300 rounded font-sans font-bold text-xs uppercase mb-3">
              <span>PART - A (Compulsory)</span>
              <span>[10 x 2 = 20 Marks]</span>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-sm text-slate-900 pl-1">
              {previewData.sectionA.map((q, idx) => (
                <li key={idx} className="group flex items-start justify-between gap-3 leading-snug">
                  <div className="flex-1">
                    <span className="font-semibold">{idx + 1}. </span>
                    <span>{q}</span>
                  </div>
                  <div className="no-print shrink-0 flex items-center gap-2">
                    <span className="text-xs font-sans font-bold text-slate-500">[2M]</span>
                    <button
                      onClick={() => handleExplainQuestion(q)}
                      className="opacity-0 group-hover:opacity-100 text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-[#800020] border border-rose-200 transition-opacity flex items-center gap-1 cursor-pointer"
                      title="Get AI step-by-step solution"
                    >
                      <Sparkles className="w-3 h-3 text-[#800020]" />
                      <span>AI Answer</span>
                    </button>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Part B: Essay Questions */}
          <div className="mb-6">
            <div className="flex items-center justify-between bg-slate-100 px-3 py-1.5 border border-slate-300 rounded font-sans font-bold text-xs uppercase mb-3">
              <span>PART - B (5 x 10 = 50 Marks)</span>
              <span>[Answer 5 Questions with Internal Choice]</span>
            </div>
            <div className="space-y-4 text-sm text-slate-900">
              {previewData.sectionB.map((item, idx) => (
                <div key={idx} className="group p-3 rounded-lg border border-slate-200 hover:border-rose-300 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="font-bold font-sans text-[#800020] mr-2">{item.qNum}.</span>
                      <span>{item.text}</span>
                    </div>
                    <div className="no-print shrink-0 flex items-center gap-2">
                      <span className="text-xs font-sans font-bold text-slate-500">[{item.marks}M]</span>
                      <button
                        onClick={() => handleExplainQuestion(item.text)}
                        className="text-[10px] font-sans font-medium px-2 py-0.5 rounded bg-rose-50 hover:bg-rose-100 text-[#800020] border border-rose-200 flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-[#800020]" />
                        <span>Explain</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Verification Footer */}
          <div className="border-t border-slate-300 pt-4 flex flex-wrap items-center justify-between text-xs font-sans text-slate-500">
            <div>
              Verified by: <strong>{paper.uploadedBy}</strong>
            </div>
            <div>
              KMCE Digital Examination Repository • JNTUH R25
            </div>
          </div>
        </div>

        {/* AI Explanation Drawer / Box if triggered */}
        {selectedQuestionForAi && (
          <div className="no-print p-4 bg-rose-50/90 dark:bg-slate-800 border-t border-rose-200 dark:border-slate-700 animate-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#800020] dark:text-rose-300">
                <Sparkles className="w-4 h-4 text-[#800020] dark:text-rose-400" />
                <span>AI Tutor Model Solution & Marking Scheme</span>
              </div>
              <button
                onClick={() => setSelectedQuestionForAi(null)}
                className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium cursor-pointer"
              >
                Close Solution
              </button>
            </div>

            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-rose-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">
                Question: "{selectedQuestionForAi}"
              </p>
              {loadingAi ? (
                <div className="flex items-center gap-2 py-3 text-[#800020] dark:text-rose-400">
                  <div className="w-4 h-4 border-2 border-[#800020] border-t-transparent rounded-full animate-spin" />
                  <span>Generating step-by-step JNTUH R25 pedagogical solution...</span>
                </div>
              ) : (
                <p className="whitespace-pre-line leading-relaxed text-slate-800 dark:text-slate-200 font-sans">
                  {aiExplanation}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
