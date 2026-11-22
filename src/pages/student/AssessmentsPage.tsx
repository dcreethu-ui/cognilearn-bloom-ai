import React from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck, Clock, Award, Play, CheckCircle } from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';

export const AssessmentsPage: React.FC = () => {
  const { user } = useAuth();
  const assessments = dbStore.getAssessments();
  const reports = dbStore.getReports(user?.id);

  return (
    <div className="space-y-6 pb-16">
      <div>
        <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
          Online Assessments & Quizzes
        </h1>
        <p className="text-sm text-espresso-600 mt-0.5">
          Attempt released assessments to test your cognitive abilities and update your Bloom's Taxonomy analytics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((asm) => {
          // Check if user already has a report for this assessment
          const existingReport = reports.find((r) => r.course_code === asm.course_code);

          return (
            <Card key={asm.id} hoverEffect className="flex flex-col justify-between">
              <div>
                <div className="p-6 pb-4 border-b border-cream-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2.5 py-0.5 rounded-lg">
                      {asm.course_code}
                    </span>
                    <Badge variant={existingReport ? 'success' : 'warm'} size="sm">
                      {existingReport ? 'Completed' : 'Ready to Attempt'}
                    </Badge>
                  </div>
                  <h3 className="text-base font-bold text-espresso-900 leading-snug">
                    {asm.title}
                  </h3>
                  <p className="text-xs text-espresso-600 mt-1 line-clamp-2 leading-relaxed">
                    {asm.description}
                  </p>
                </div>

                <div className="p-6 pt-4 space-y-2 text-xs text-espresso-600">
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <strong className="text-espresso-900">{asm.duration_minutes} minutes</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Marks:</span>
                    <strong className="text-espresso-900">{asm.total_marks} marks</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxonomy Coverage:</span>
                    <strong className="text-terracotta-700">All 6 Bloom's Levels</strong>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-cream-50/70 border-t border-cream-200 flex items-center justify-between">
                {existingReport ? (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Graded & Analyzed
                    </span>
                    <Link to={`/student/reports?reportId=${existingReport.id}`}>
                      <Button variant="outline" size="sm">
                        View Report
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <Link to={`/student/quiz/${asm.id}`} className="w-full">
                    <Button
                      variant="primary"
                      size="sm"
                      className="w-full"
                      rightIcon={<Play className="w-3.5 h-3.5 fill-current" />}
                    >
                      Start Assessment
                    </Button>
                  </Link>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
