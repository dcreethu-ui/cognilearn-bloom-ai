import React, { useState } from 'react';
import { BookOpen, FileText, Download, CheckCircle2, Eye, Sparkles, Layers } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';

export const MyCoursesPage: React.FC = () => {
  const { user } = useAuth();
  const enrolledCourses = dbStore.getEnrolledCourses(user?.id || 's202-student-id');
  const [selectedCourseId, setSelectedCourseId] = useState<string>(enrolledCourses[0]?.id || 'c-101');
  const [selectedMaterial, setSelectedMaterial] = useState<{ title: string; text: string } | null>(null);

  const currentCourse = dbStore.getCourseById(selectedCourseId) || enrolledCourses[0];
  const outcomes = dbStore.getOutcomes(selectedCourseId);
  const materials = dbStore.getMaterials(selectedCourseId);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
          My Enrolled Courses & Study Materials
        </h1>
        <p className="text-sm text-espresso-600 mt-0.5">
          Access unit-organized lecture notes, Course Learning Outcomes, and revision excerpts.
        </p>
      </div>

      {/* Course Selection Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-cream-300 pb-3">
        {enrolledCourses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCourseId(c.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              selectedCourseId === c.id
                ? 'bg-terracotta-500 text-white shadow-warm'
                : 'bg-white text-espresso-700 hover:bg-cream-200 border border-cream-300'
            }`}
          >
            {c.code}: {c.title}
          </button>
        ))}
      </div>

      {currentCourse && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Course Learning Outcomes (Bloom's Taxonomy Mapped) */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-terracotta-600" />
                <CardTitle>Learning Outcomes ({outcomes.length})</CardTitle>
              </div>
              <Badge variant="warm">Bloom Mapped</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {outcomes.map((lo) => (
                <div key={lo.id} className="p-3 bg-cream-100 rounded-2xl border border-cream-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-terracotta-800">{lo.code}</span>
                    <Badge bloomLevel={lo.bloom_level} size="sm" />
                  </div>
                  <p className="text-xs text-espresso-800 leading-relaxed pt-1">
                    {lo.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Right Column: Uploaded Course Materials (2 Cols) */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-terracotta-600" />
                <div>
                  <CardTitle>Course Study Materials & Lecture Notes</CardTitle>
                  <p className="text-xs text-espresso-500 mt-0.5">Organized by unit and topic</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {materials.length === 0 ? (
                <div className="p-8 text-center text-xs text-espresso-500">
                  No materials uploaded for this course yet.
                </div>
              ) : (
                materials.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 bg-white rounded-2xl border border-cream-300 hover:border-terracotta-300 hover:shadow-warm transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2 py-0.5 rounded">
                          Unit {m.unit_number}
                        </span>
                        <Badge variant="neutral" size="sm">{m.topic_name}</Badge>
                        <span className="text-[10px] font-bold uppercase text-terracotta-600 bg-terracotta-100 px-1.5 py-0.5 rounded">
                          {m.file_type}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-espresso-900">{m.title}</h4>
                      {m.extracted_text && (
                        <p className="text-xs text-espresso-500 line-clamp-2 mt-1">
                          {m.extracted_text}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
                      {m.extracted_text && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMaterial({ title: m.title, text: m.extracted_text! })}
                          leftIcon={<Eye className="w-3.5 h-3.5" />}
                        >
                          Read Online
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        size="sm"
                        leftIcon={<Download className="w-3.5 h-3.5" />}
                        onClick={() => alert(`Simulating file download: ${m.title}`)}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* In-App Study Reader Modal */}
      <Modal
        isOpen={!!selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
        title={selectedMaterial?.title}
        description="Course material text preview extracted for AI concept queries"
        maxWidth="2xl"
      >
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          <div className="p-5 bg-cream-100 rounded-2xl border border-cream-300 font-sans text-xs text-espresso-900 leading-relaxed whitespace-pre-line">
            {selectedMaterial?.text}
          </div>
          <div className="flex justify-end">
            <Button variant="primary" size="sm" onClick={() => setSelectedMaterial(null)}>
              Close Reader
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
