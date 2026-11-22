import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  HelpCircle,
  Filter,
  Check
} from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { Question } from '../../types/assessment.types';
import { BloomLevel } from '../../types/bloom.types';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';
import { generateAIQuestions, GeneratedQuestionResponse } from '../../lib/gemini';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';

export const QuestionBankPage: React.FC = () => {
  const courses = dbStore.getCourses();
  const [questions, setQuestions] = useState<Question[]>(() => dbStore.getQuestions());
  const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');
  const [selectedBloomFilter, setSelectedBloomFilter] = useState<string>('all');

  // AI Generator Modal State
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || 'c-101');
  const [unitNumber, setUnitNumber] = useState(2);
  const [topic, setTopic] = useState('Binary Search Trees & Balancing');
  const [bloomLevel, setBloomLevel] = useState<BloomLevel>('apply');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questionCount, setQuestionCount] = useState(2);
  const [apiKey, setApiKey] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Review Drafts State
  const [draftQuestions, setDraftQuestions] = useState<GeneratedQuestionResponse[]>([]);

  const handleTriggerAIGenerator = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    const materials = dbStore.getMaterials(targetCourseId);
    const context = materials.map((m) => m.extracted_text || '').join('\n\n');
    const course = dbStore.getCourseById(targetCourseId);

    const results = await generateAIQuestions({
      courseId: targetCourseId,
      courseTitle: course?.title || 'Data Structures',
      unitNumber,
      topic,
      bloomLevel,
      difficulty,
      count: questionCount,
      contextText: context,
      apiKey: apiKey || undefined,
    });

    setDraftQuestions(results);
    setIsGenerating(false);
  };

  const handleApproveDraft = (draft: GeneratedQuestionResponse, index: number) => {
    dbStore.addQuestion({
      course_id: targetCourseId,
      unit_number: unitNumber,
      topic,
      bloom_level: draft.bloom_level,
      difficulty: draft.difficulty,
      question_type: 'mcq',
      question_text: draft.question_text,
      options: draft.options,
      correct_answer: draft.correct_answer,
      explanation: draft.explanation,
      marks: draft.marks,
      ai_generated: true,
      faculty_status: 'approved',
    });

    setQuestions(dbStore.getQuestions());
    setDraftQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleApproveAll = () => {
    draftQuestions.forEach((draft) => {
      dbStore.addQuestion({
        course_id: targetCourseId,
        unit_number: unitNumber,
        topic,
        bloom_level: draft.bloom_level,
        difficulty: draft.difficulty,
        question_type: 'mcq',
        question_text: draft.question_text,
        options: draft.options,
        correct_answer: draft.correct_answer,
        explanation: draft.explanation,
        marks: draft.marks,
        ai_generated: true,
        faculty_status: 'approved',
      });
    });

    setQuestions(dbStore.getQuestions());
    setDraftQuestions([]);
    setIsGeneratorModalOpen(false);
  };

  const filteredQuestions = questions.filter((q) => {
    const courseMatch = selectedCourseFilter === 'all' || q.course_id === selectedCourseFilter;
    const bloomMatch = selectedBloomFilter === 'all' || q.bloom_level === selectedBloomFilter;
    return courseMatch && bloomMatch;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            AI Question Generator & Question Bank
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Formulate assessment questions grounded in course materials with strict Bloom's Taxonomy cognitive verification.
          </p>
        </div>

        <Button
          variant="warm"
          onClick={() => setIsGeneratorModalOpen(true)}
          leftIcon={<Sparkles className="w-4 h-4 text-amber-200" />}
        >
          Generate Questions with Gemini
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-3xl border border-cream-300 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-bold text-espresso-600">
          <Filter className="w-4 h-4 text-terracotta-500" />
          <span>Filters:</span>
        </div>

        <select
          value={selectedCourseFilter}
          onChange={(e) => setSelectedCourseFilter(e.target.value)}
          className="bg-cream-100 border border-cream-300 rounded-xl px-3 py-1.5 text-xs font-medium text-espresso-800 focus:outline-none"
        >
          <option value="all">All Courses</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code}: {c.title}
            </option>
          ))}
        </select>

        <select
          value={selectedBloomFilter}
          onChange={(e) => setSelectedBloomFilter(e.target.value)}
          className="bg-cream-100 border border-cream-300 rounded-xl px-3 py-1.5 text-xs font-medium text-espresso-800 focus:outline-none"
        >
          <option value="all">All Bloom Levels</option>
          {BLOOM_ORDER.map((l) => (
            <option key={l} value={l}>
              {BLOOM_LEVELS[l].label} (Level {BLOOM_LEVELS[l].rank})
            </option>
          ))}
        </select>

        <span className="text-xs text-espresso-500 ml-auto font-medium">
          Showing {filteredQuestions.length} Questions
        </span>
      </div>

      {/* Question Cards List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => (
          <Card key={q.id} hoverEffect className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-cream-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2.5 py-0.5 rounded-lg">
                  Unit {q.unit_number} • {q.topic}
                </span>
                <Badge bloomLevel={q.bloom_level} size="sm" />
                <Badge variant={q.difficulty === 'hard' ? 'danger' : 'warning'} size="sm" className="capitalize">
                  {q.difficulty}
                </Badge>
                {q.ai_generated && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Gemini Formulated
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-espresso-800 bg-cream-100 px-2.5 py-1 rounded-xl">
                  {q.marks} Marks
                </span>
                <Badge variant={q.faculty_status === 'approved' ? 'success' : 'neutral'} size="sm" className="capitalize">
                  {q.faculty_status}
                </Badge>
              </div>
            </div>

            <div className="py-4">
              <p className="text-sm font-bold text-espresso-900 leading-relaxed">
                {q.question_text}
              </p>

              {/* Options Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {q.options.map((opt) => (
                  <div
                    key={opt.id}
                    className={`p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${
                      opt.id === q.correct_answer
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                        : 'bg-white border-cream-200 text-espresso-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 ${
                        opt.id === q.correct_answer
                          ? 'bg-emerald-600 text-white'
                          : 'bg-cream-200 text-espresso-700'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span className="truncate">{opt.text}</span>
                  </div>
                ))}
              </div>

              {q.explanation && (
                <div className="mt-3 p-3 bg-cream-100/70 rounded-2xl border border-cream-200 text-xs text-espresso-700 leading-relaxed">
                  <span className="font-bold text-terracotta-700">Answer Explanation: </span>
                  {q.explanation}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* AI Generator Modal */}
      <Modal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        title="AI Question Generator (Google Gemini Grounded)"
        description="Configure target cognitive level, unit topic, and difficulty to generate structured assessment questions."
        maxWidth="4xl"
      >
        <div className="space-y-6">
          <form onSubmit={handleTriggerAIGenerator} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                label="Target Course"
                value={targetCourseId}
                onChange={(e) => setTargetCourseId(e.target.value)}
                options={courses.map((c) => ({ value: c.id, label: `${c.code}: ${c.title}` }))}
              />
              <Input
                label="Unit Number"
                type="number"
                min={1}
                max={10}
                value={unitNumber}
                onChange={(e) => setUnitNumber(Number(e.target.value))}
                required
              />
              <Input
                label="Topic"
                placeholder="e.g. AVL Rotations or Hash Tables"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Select
                label="Bloom's Cognitive Level"
                value={bloomLevel}
                onChange={(e) => setBloomLevel(e.target.value as BloomLevel)}
                options={BLOOM_ORDER.map((l) => ({
                  value: l,
                  label: `${BLOOM_LEVELS[l].label} (${BLOOM_LEVELS[l].rank})`,
                }))}
              />
              <Select
                label="Difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                options={[
                  { value: 'easy', label: 'Easy (Foundational)' },
                  { value: 'medium', label: 'Medium (Intermediate)' },
                  { value: 'hard', label: 'Hard (Complex / Advanced)' },
                ]}
              />
              <Input
                label="Question Count"
                type="number"
                min={1}
                max={5}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-espresso-500">
                Grounded in uploaded syllabus text from Unit {unitNumber}.
              </span>
              <Button
                variant="warm"
                type="submit"
                isLoading={isGenerating}
                leftIcon={<Sparkles className="w-4 h-4 text-amber-200" />}
              >
                Generate Questions Now
              </Button>
            </div>
          </form>

          {/* Generated Question Drafts for Review */}
          {draftQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-cream-300">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                  Generated Drafts ({draftQuestions.length}) — Review & Approve
                </h4>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleApproveAll}
                  leftIcon={<Check className="w-3.5 h-3.5" />}
                >
                  Approve All to Question Bank
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {draftQuestions.map((draft, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-cream-50 rounded-2xl border border-cream-300 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge bloomLevel={draft.bloom_level} size="sm" />
                        <span className="text-xs font-bold text-espresso-800">
                          {draft.marks} Marks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleApproveDraft(draft, idx)}
                          leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
                        >
                          Approve
                        </Button>
                      </div>
                    </div>

                    <p className="text-xs font-bold text-espresso-900 leading-relaxed">
                      {draft.question_text}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {draft.options.map((opt) => (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-xl border ${
                            opt.id === draft.correct_answer
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                              : 'bg-white border-cream-200 text-espresso-700'
                          }`}
                        >
                          <strong>{opt.id}: </strong>
                          {opt.text}
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-espresso-600 bg-white p-2.5 rounded-xl border border-cream-200">
                      <strong>Explanation:</strong> {draft.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};
