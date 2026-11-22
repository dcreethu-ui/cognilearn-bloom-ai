import React, { useState } from 'react';
import { BookOpen, Plus, Sparkles, Layers, CheckCircle2, Edit3, Trash2 } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { Course, LearningOutcome } from '../../types/database.types';
import { BloomLevel } from '../../types/bloom.types';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';

export const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(() => dbStore.getCourses());
  const [selectedCourseForOutcomes, setSelectedCourseForOutcomes] = useState<Course | null>(null);

  // New Course Modal State
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [academicTerm, setAcademicTerm] = useState('Fall 2026');
  const [courseDescription, setCourseDescription] = useState('');

  // Outcome Modal State
  const [outcomes, setOutcomes] = useState<LearningOutcome[]>([]);
  const [newOutcomeCode, setNewOutcomeCode] = useState('');
  const [newOutcomeDesc, setNewOutcomeDesc] = useState('');
  const [newOutcomeBloom, setNewOutcomeBloom] = useState<BloomLevel>('understand');
  const [newOutcomeUnit, setNewOutcomeUnit] = useState(1);

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseCode || !courseTitle) return;

    const newC = dbStore.addCourse({
      code: courseCode.toUpperCase(),
      title: courseTitle,
      description: courseDescription,
      faculty_id: 'f101-faculty-id',
      faculty_name: 'Dr. Aruna Sharma',
      academic_term: academicTerm,
      is_published: true,
    });

    setCourses(dbStore.getCourses());
    setIsNewCourseModalOpen(false);
    setCourseCode('');
    setCourseTitle('');
    setCourseDescription('');
  };

  const handleOpenOutcomes = (course: Course) => {
    setSelectedCourseForOutcomes(course);
    setOutcomes(dbStore.getOutcomes(course.id));
    setNewOutcomeCode(`CO${dbStore.getOutcomes(course.id).length + 1}`);
  };

  const handleAddOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourseForOutcomes || !newOutcomeDesc) return;

    dbStore.addOutcome({
      course_id: selectedCourseForOutcomes.id,
      code: newOutcomeCode,
      description: newOutcomeDesc,
      bloom_level: newOutcomeBloom,
      unit_number: Number(newOutcomeUnit),
    });

    setOutcomes(dbStore.getOutcomes(selectedCourseForOutcomes.id));
    setNewOutcomeDesc('');
    setNewOutcomeCode(`CO${dbStore.getOutcomes(selectedCourseForOutcomes.id).length + 1}`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            Courses & Bloom's Learning Outcomes
          </h1>
          <p className="text-sm text-espresso-600 mt-0.5">
            Create academic courses and define Course Learning Outcomes (CLOs) mapped to the 6 Bloom's Taxonomy cognitive domains.
          </p>
        </div>
        <Button
          variant="primary"
          onClick={() => setIsNewCourseModalOpen(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Create New Course
        </Button>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => {
          const cos = dbStore.getOutcomes(c.id);
          return (
            <Card key={c.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <CardHeader className="bg-cream-100/70 border-b border-cream-200">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-white text-espresso-800 px-2.5 py-0.5 rounded-lg border border-cream-300 shadow-2xs">
                      {c.code}
                    </span>
                    <Badge variant={c.is_published ? 'success' : 'neutral'} size="sm">
                      {c.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-espresso-500">{c.academic_term}</span>
                </CardHeader>

                <div className="p-6 space-y-3">
                  <h3 className="text-base font-bold text-espresso-900 leading-snug">
                    {c.title}
                  </h3>
                  <p className="text-xs text-espresso-600 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-cream-200 text-center">
                    <div className="bg-cream-100/70 p-2.5 rounded-2xl border border-cream-200">
                      <span className="block text-sm font-extrabold text-espresso-900">
                        {c.enrolled_count || 0}
                      </span>
                      <span className="text-[10px] text-espresso-500 font-bold uppercase tracking-wider">
                        Enrolled
                      </span>
                    </div>
                    <div className="bg-cream-100/70 p-2.5 rounded-2xl border border-cream-200">
                      <span className="block text-sm font-extrabold text-terracotta-600">
                        {cos.length}
                      </span>
                      <span className="text-[10px] text-espresso-500 font-bold uppercase tracking-wider">
                        Bloom CLOs
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => handleOpenOutcomes(c)}
                  leftIcon={<Layers className="w-3.5 h-3.5 text-terracotta-600" />}
                >
                  Manage Bloom's Outcomes ({cos.length})
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal: Create New Course */}
      <Modal
        isOpen={isNewCourseModalOpen}
        onClose={() => setIsNewCourseModalOpen(false)}
        title="Create New Academic Course"
        description="Add a new course to your curriculum and configure learning outcomes."
        maxWidth="lg"
      >
        <form onSubmit={handleCreateCourse} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Course Code"
              placeholder="e.g. CS201"
              value={courseCode}
              onChange={(e) => setCourseCode(e.target.value)}
              required
            />
            <Input
              label="Academic Term"
              placeholder="e.g. Fall 2026"
              value={academicTerm}
              onChange={(e) => setAcademicTerm(e.target.value)}
              required
            />
          </div>

          <Input
            label="Course Title"
            placeholder="e.g. Advanced Data Structures & Algorithm Design"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-espresso-700 mb-1.5">
              Course Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide a syllabus summary..."
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              className="w-full rounded-2xl border border-cream-300 bg-white p-3 text-xs text-espresso-900 focus:outline-none focus:ring-2 focus:ring-terracotta-400"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-cream-200">
            <Button variant="outline" type="button" onClick={() => setIsNewCourseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save & Publish Course
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Manage Course Learning Outcomes (Bloom's Taxonomy) */}
      <Modal
        isOpen={!!selectedCourseForOutcomes}
        onClose={() => setSelectedCourseForOutcomes(null)}
        title={`${selectedCourseForOutcomes?.code}: Learning Outcomes Studio`}
        description="Define and map outcomes to the 6 Bloom's Taxonomy cognitive levels."
        maxWidth="4xl"
      >
        <div className="space-y-6">
          {/* Add Outcome Form */}
          <form onSubmit={handleAddOutcome} className="p-4 bg-cream-100 rounded-2xl border border-cream-300 space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-espresso-800">
              Add New Course Learning Outcome (CLO)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <Input
                label="Outcome Code"
                value={newOutcomeCode}
                onChange={(e) => setNewOutcomeCode(e.target.value)}
                required
              />
              <Input
                label="Unit Number"
                type="number"
                min={1}
                max={10}
                value={newOutcomeUnit}
                onChange={(e) => setNewOutcomeUnit(Number(e.target.value))}
                required
              />
              <div className="sm:col-span-2">
                <Select
                  label="Bloom's Taxonomy Level"
                  value={newOutcomeBloom}
                  onChange={(e) => setNewOutcomeBloom(e.target.value as BloomLevel)}
                  options={BLOOM_ORDER.map((l) => ({
                    value: l,
                    label: `${BLOOM_LEVELS[l].label} (Level ${BLOOM_LEVELS[l].rank})`,
                  }))}
                />
              </div>
            </div>

            <Input
              label="Learning Outcome Description"
              placeholder="e.g. Implement AVL tree rebalancing rotations to resolve insertion imbalances."
              value={newOutcomeDesc}
              onChange={(e) => setNewOutcomeDesc(e.target.value)}
              required
            />

            <div className="flex justify-end pt-1">
              <Button variant="primary" size="sm" type="submit" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                Add Outcome
              </Button>
            </div>
          </form>

          {/* Existing Outcomes Table */}
          <div className="space-y-3 max-h-72 overflow-y-auto">
            <h4 className="text-xs font-bold text-espresso-700">
              Mapped Outcomes ({outcomes.length})
            </h4>
            {outcomes.map((lo) => (
              <div
                key={lo.id}
                className="p-3.5 bg-white rounded-2xl border border-cream-300 flex items-start justify-between gap-4 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-espresso-800 bg-cream-200 px-2 py-0.5 rounded">
                      {lo.code}
                    </span>
                    <span className="text-xs text-espresso-500 font-medium">Unit {lo.unit_number}</span>
                    <Badge bloomLevel={lo.bloom_level} size="sm" />
                  </div>
                  <p className="text-xs text-espresso-800 leading-relaxed pt-0.5">
                    {lo.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2 border-t border-cream-200">
            <Button variant="primary" size="sm" onClick={() => setSelectedCourseForOutcomes(null)}>
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
