import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  ClipboardCheck, 
  TrendingUp, 
  Plus, 
  Sparkles, 
  AlertCircle,
  ArrowRight,
  Brain,
  Award
} from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';
import { BloomLevel } from '../../types/bloom.types';

export const FacultyDashboard: React.FC = () => {
  const courses = dbStore.getCourses();
  const assessments = dbStore.getAssessments();

  const stats = [
    { label: 'Active Courses', value: courses.length.toString(), change: 'Fall 2026 Term', icon: BookOpen, color: 'text-terracotta-600', bg: 'bg-terracotta-100' },
    { label: 'Enrolled Students', value: '142', change: 'Across all courses', icon: Users, color: 'text-amber-700', bg: 'bg-amber-100' },
    { label: 'Assessments Scheduled', value: assessments.length.toString(), change: 'Bloom aligned', icon: ClipboardCheck, color: 'text-emerald-700', bg: 'bg-emerald-100' },
    { label: 'Class Bloom Average', value: '72.4%', change: '+4.2% overall', icon: TrendingUp, color: 'text-espresso-800', bg: 'bg-cream-300' },
  ];

  const bloomDistribution: Record<BloomLevel, { count: number; avgScore: number }> = {
    remember: { count: 48, avgScore: 84 },
    understand: { count: 52, avgScore: 78 },
    apply: { count: 40, avgScore: 69 },
    analyze: { count: 32, avgScore: 61 },
    evaluate: { count: 18, avgScore: 56 },
    create: { count: 12, avgScore: 52 },
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-espresso-900 via-espresso-800 to-terracotta-900 rounded-3xl p-6 sm:p-8 text-white shadow-warm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-500/20 text-terracotta-200 border border-terracotta-400/30 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Faculty Learning & Bloom's Analytics Studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, Dr. Sharma
          </h1>
          <p className="text-cream-200 text-xs sm:text-sm mt-1.5 max-w-xl">
            Monitor class-wide cognitive mastery across Bloom's 6 taxonomy levels, formulate learning outcomes, and generate AI-assisted quizzes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/faculty/question-bank">
            <Button
              variant="outline"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              leftIcon={<Sparkles className="w-4 h-4 text-amber-300" />}
            >
              AI Question Generator
            </Button>
          </Link>
          <Link to="/faculty/courses">
            <Button
              variant="primary"
              className="bg-terracotta-500 hover:bg-terracotta-600 text-white"
              leftIcon={<Plus className="w-4 h-4" />}
            >
              New Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Card key={idx} hoverEffect className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-2xl ${s.bg} ${s.color} flex items-center justify-center shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-espresso-500 uppercase tracking-wider">{s.label}</p>
                <div className="text-2xl font-extrabold text-espresso-900 tracking-tight mt-0.5">{s.value}</div>
                <p className="text-[11px] text-espresso-400 mt-0.5">{s.change}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Two-Column Cognitive Analysis & Active Assessments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bloom's Taxonomy Cognitive Mastery Card (2 columns) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-terracotta-100 text-terracotta-600 rounded-2xl">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Class-Wide Bloom's Taxonomy Distribution</CardTitle>
                <CardDescription>Average mastery percentage aggregated across all courses</CardDescription>
              </div>
            </div>
            <Link to="/faculty/analytics">
              <Badge variant="warm">View Heatmap</Badge>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {BLOOM_ORDER.map((level) => {
              const meta = BLOOM_LEVELS[level];
              const data = bloomDistribution[level];
              return (
                <div key={level} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: meta.color }}
                      />
                      <span className="font-bold text-espresso-900">{meta.label}</span>
                      <span className="text-espresso-400">({data.count} items)</span>
                    </div>
                    <span className="font-extrabold text-espresso-800 font-mono">{data.avgScore}%</span>
                  </div>
                  <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{
                        width: `${data.avgScore}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Early Learning Difficulty Alerts */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <CardTitle>Support Alerts</CardTitle>
            </div>
            <span className="text-xs text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full font-bold">
              3 Flagged
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-espresso-900">Maria Santos (CS201)</span>
                <Badge bloomLevel="analyze" size="sm">Analyze Gap</Badge>
              </div>
              <p className="text-xs text-espresso-700 mt-1">
                Scored 35% on Tree Balancing analysis questions. Needs conceptual review.
              </p>
            </div>

            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
              <div className="flex justify-between items-start">
                <span className="text-xs font-bold text-espresso-900">Liam Chen (CS301)</span>
                <Badge bloomLevel="evaluate" size="sm">Evaluate Gap</Badge>
              </div>
              <p className="text-xs text-espresso-700 mt-1">
                Scored 42% on Algorithm trade-off evaluation. Recommend remediation unit.
              </p>
            </div>

            <Link to="/faculty/analytics">
              <Button variant="outline" size="sm" className="w-full mt-2" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                View All Student Analytics
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Active Assessments Table */}
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Active & Scheduled Assessments</CardTitle>
            <CardDescription>Manage participation, deadlines, and Bloom's alignment</CardDescription>
          </div>
          <Link to="/faculty/assessments">
            <Button size="sm" variant="outline">
              Manage Assessments
            </Button>
          </Link>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-espresso-700">
            <thead className="bg-cream-100/70 border-b border-cream-200 text-xs font-bold text-espresso-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4">Assessment Title</th>
                <th className="px-6 py-4">Course</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-100">
              {assessments.map((a) => (
                <tr key={a.id} className="hover:bg-cream-50/80 transition-colors">
                  <td className="px-6 py-4 font-bold text-espresso-900">{a.title}</td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2 py-0.5 rounded">
                      {a.course_code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs">{a.duration_minutes} mins</td>
                  <td className="px-6 py-4 text-xs text-espresso-500">
                    {new Date(a.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={a.is_published ? 'success' : 'neutral'} size="sm">
                      {a.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to="/faculty/analytics">
                      <Button variant="ghost" size="sm" className="text-terracotta-600 font-bold">
                        Analytics
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
