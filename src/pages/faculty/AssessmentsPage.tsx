import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Plus, 
  Clock, 
  Award, 
  Users, 
  CheckCircle2, 
  BarChart3,
  Calendar
} from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { Assessment, Question } from '../../types/assessment.types';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';

export const AssessmentsPage: React.FC = () => {
  const courses = dbStore.getCourses();
  const [assessments, setAssessments] = useState<Assessment[]>(() => dbStore.getAssessments());
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>(() => dbStore.getQuestions());

  // Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [targetCourseId, setTargetCourseId] = useState(courses[0]?.id || 'c-101');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(25);
  const [passingMarks, setPassingMarks] = useState(12);
  const [selectedQuestionIds, setSelectedQuestionIds] = useState<string[]>([]);

  const handleToggleQuestion = (qid: string) => {
    setSelectedQuestionIds((prev) =>
      prev.includes(qid) ? prev.filter((id) => id !== qid) : [...prev, qid]
    );
  };

  const totalCalculatedMarks = availableQuestions
    .filter((q) => selectedQuestionIds.includes(q.id))
    .reduce((sum, q) => sum + q.marks, 0);

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || selectedQuestionIds.length === 0) return;

    const course = dbStore.getCourseById(targetCourseId);

    dbStore.addAssessment(
      {
        course_id: targetCourseId,
        course_code: course?.code || 'CS201',
        course_title: course?.title || 'Data Structures',
        title,
        description,
        duration_minutes: Number(durationMinutes),
        total_marks: totalCalculatedMarks,
        passing_marks: Number(passingMarks),
        release_date: new Date().toISOString(),
        deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
        is_published: true,
        review_policy: 'immediate',
      },
      selectedQuestionIds
    );

    setAssessments(dbStore.getAssessments());
    setIsCreateModalOpen(false);
    setTitle('');
    setDescription('');
    setSelectedQuestionIds([]);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            Assessments Studio
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Configure marks, duration timers, deadlines, and publish Bloom-aligned assessments to enrolled students.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create Assessment
        </Button>
      </div>

      {/* Assessments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((asm) => (
          <Card key={asm.id} hoverEffect className="flex flex-col justify-between">
            <div>
              <CardHeader className="bg-cream-100/70 border-b border-cream-200">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold bg-white text-espresso-800 px-2.5 py-0.5 rounded-lg border border-cream-300">
                    {asm.course_code}
                  </span>
                  <Badge variant={asm.is_published ? 'success' : 'neutral'} size="sm">
                    {asm.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <span className="text-xs font-semibold text-espresso-500">
                  {asm.question_count || 6} Questions
                </span>
              </CardHeader>

              <div className="p-6 space-y-3">
                <h3 className="text-base font-bold text-espresso-900 leading-snug">
                  {asm.title}
                </h3>
                <p className="text-xs text-espresso-600 line-clamp-2 leading-relaxed">
                  {asm.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-cream-200 text-center text-xs">
                  <div className="bg-cream-100/70 p-2 rounded-xl">
                    <span className="font-bold text-espresso-900 block">{asm.duration_minutes}m</span>
                    <span className="text-[10px] text-espresso-500 uppercase">Duration</span>
                  </div>
                  <div className="bg-cream-100/70 p-2 rounded-xl">
                    <span className="font-bold text-terracotta-700 block">{asm.total_marks}</span>
                    <span className="text-[10px] text-espresso-500 uppercase">Total Marks</span>
                  </div>
                  <div className="bg-cream-100/70 p-2 rounded-xl">
                    <span className="font-bold text-emerald-700 block">{asm.passing_marks}</span>
                    <span className="text-[10px] text-espresso-500 uppercase">Passing</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between">
              <span className="text-xs text-espresso-500 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Due {new Date(asm.deadline).toLocaleDateString()}
              </span>

              <Link to="/faculty/analytics">
                <Button variant="outline" size="sm" leftIcon={<BarChart3 className="w-3.5 h-3.5 text-terracotta-600" />}>
                  Class Analytics
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Assessment Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Bloom-Aligned Assessment"
        description="Select approved questions from your question bank and set duration."
        maxWidth="4xl"
      >
        <form onSubmit={handleCreateAssessment} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Select Course"
              value={targetCourseId}
              onChange={(e) => setTargetCourseId(e.target.value)}
              options={courses.map((c) => ({ value: c.id, label: `${c.code}: ${c.title}` }))}
            />
            <Input
              label="Assessment Title"
              placeholder="e.g. Unit 2 & 3 Cognitive Diagnostic Quiz"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Duration (Minutes)"
              type="number"
              min={5}
              max={180}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              required
            />
            <Input
              label="Passing Marks"
              type="number"
              min={1}
              value={passingMarks}
              onChange={(e) => setPassingMarks(Number(e.target.value))}
              required
            />
          </div>

          {/* Question Selector List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                Select Questions ({selectedQuestionIds.length} Selected • {totalCalculatedMarks} Total Marks)
              </label>
              <span className="text-xs text-terracotta-700 font-semibold">
                Available in Question Bank: {availableQuestions.length}
              </span>
            </div>

            <div className="max-h-60 overflow-y-auto space-y-2 p-1">
              {availableQuestions.map((q) => {
                const isSelected = selectedQuestionIds.includes(q.id);
                return (
                  <div
                    key={q.id}
                    onClick={() => handleToggleQuestion(q.id)}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-terracotta-50 border-terracotta-400 shadow-2xs text-espresso-900'
                        : 'bg-white border-cream-300 hover:bg-cream-100 text-espresso-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold bg-cream-200 px-2 py-0.5 rounded">
                          Unit {q.unit_number} • {q.topic}
                        </span>
                        <Badge bloomLevel={q.bloom_level} size="sm" />
                        <span className="font-bold text-terracotta-700">{q.marks} Marks</span>
                      </div>
                      <p className="font-medium leading-relaxed">{q.question_text}</p>
                    </div>

                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? 'bg-terracotta-500 border-terracotta-500 text-white'
                          : 'border-cream-300 bg-white'
                      }`}
                    >
                      {isSelected && '✓'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-cream-200">
            <Button variant="outline" type="button" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={selectedQuestionIds.length === 0}
            >
              Publish Assessment to Students
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
