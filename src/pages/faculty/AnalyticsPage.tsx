import React from 'react';
import { 
  BarChart3, 
  Brain, 
  TrendingUp, 
  Users, 
  AlertCircle, 
  Award,
  Layers
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';
import { BloomLevel } from '../../types/bloom.types';

export const AnalyticsPage: React.FC = () => {
  const bloomClassScores: Record<BloomLevel, { count: number; avgScore: number }> = {
    remember: { count: 48, avgScore: 84 },
    understand: { count: 52, avgScore: 78 },
    apply: { count: 40, avgScore: 69 },
    analyze: { count: 32, avgScore: 61 },
    evaluate: { count: 18, avgScore: 56 },
    create: { count: 12, avgScore: 52 },
  };

  const topicPerformances = [
    { topic: 'Binary Search Tree Operations', avg: 82, gap: false },
    { topic: 'AVL Height-Balance Rotations', avg: 64, gap: false },
    { topic: 'Hash Probing & Secondary Clustering', avg: 48, gap: true },
    { topic: 'Amortized Time Complexity Proofs', avg: 42, gap: true },
    { topic: 'Augmented Data Structure Synthesis', avg: 54, gap: false },
  ];

  const supportStudents = [
    { name: 'Maria Santos', course: 'CS201', gap: 'analyze' as BloomLevel, topic: 'Tree Balancing Analysis', score: 35 },
    { name: 'Liam Chen', course: 'CS301', gap: 'evaluate' as BloomLevel, topic: 'Algorithm Trade-off Evaluation', score: 42 },
    { name: 'Priya Patel', course: 'SE101', gap: 'apply' as BloomLevel, topic: 'System Requirement Mapping', score: 46 },
    { name: 'Jordan Hayes', course: 'CS201', gap: 'evaluate' as BloomLevel, topic: 'Double Hashing Cache Analysis', score: 38 },
  ];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
          Class Cognitive Analytics & Learning Gap Diagnostics
        </h1>
        <p className="text-sm text-espresso-600 mt-0.5">
          Comprehensive psychometric analytics aggregated across all student submissions using Bloom's Revised Taxonomy.
        </p>
      </div>

      {/* Metric Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-cream-300 shadow-warm">
          <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
            Total Enrolled
          </span>
          <div className="text-2xl font-extrabold text-espresso-900 mt-1">142 Students</div>
          <p className="text-xs text-espresso-400 mt-0.5">Across 4 active courses</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-cream-300 shadow-warm">
          <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
            Participation Rate
          </span>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">89.4%</div>
          <p className="text-xs text-espresso-400 mt-0.5">127 / 142 completed quizzes</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-cream-300 shadow-warm">
          <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
            Class Bloom Average
          </span>
          <div className="text-2xl font-extrabold text-terracotta-600 mt-1">72.4%</div>
          <p className="text-xs text-espresso-400 mt-0.5">+4.2% since diagnostic 1</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-cream-300 shadow-warm">
          <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
            Identified Gaps
          </span>
          <div className="text-2xl font-extrabold text-rose-600 mt-1">2 Topics</div>
          <p className="text-xs text-espresso-400 mt-0.5">Hashing & Complexity proofs</p>
        </div>
      </div>

      {/* Class Bloom Distribution Heatmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-terracotta-600" />
            <CardTitle>Class-Wide Bloom's Taxonomy Mastery Matrix</CardTitle>
          </div>
          <Badge variant="warm">Aggregated Psychometrics</Badge>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOOM_ORDER.map((lvl) => {
              const meta = BLOOM_LEVELS[lvl];
              const data = bloomClassScores[lvl];
              return (
                <div
                  key={lvl}
                  className="p-5 rounded-2xl border border-cream-300 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                      {meta.label}
                    </span>
                    <Badge bloomLevel={lvl} size="sm" />
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-espresso-900 font-mono">
                      {data.avgScore}%
                    </span>
                    <span className="text-xs font-semibold text-espresso-500">
                      {data.count} items tested
                    </span>
                  </div>

                  <div className="w-full bg-cream-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${data.avgScore}%`, backgroundColor: meta.color }}
                    />
                  </div>

                  <p className="text-[11px] text-espresso-500 leading-snug">
                    {meta.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Topic Competency & Student Early Support Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic-Wise Class Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Competency & Learning Bottlenecks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topicPerformances.map((t, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-espresso-900">{t.topic}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-espresso-800">{t.avg}%</span>
                    {t.gap && (
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                        Gap
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      t.gap ? 'bg-rose-500' : 'bg-terracotta-500'
                    }`}
                    style={{ width: `${t.avg}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Early Difficulty Warning Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-500" />
              <CardTitle>Students Benefiting from Additional Support</CardTitle>
            </div>
            <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
              {supportStudents.length} Flagged
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            {supportStudents.map((st, i) => (
              <div
                key={i}
                className="p-3.5 bg-cream-100/80 rounded-2xl border border-cream-200 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-espresso-900">{st.name}</span>
                    <span className="font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-cream-300">
                      {st.course}
                    </span>
                    <Badge bloomLevel={st.gap} size="sm" />
                  </div>
                  <p className="text-xs text-espresso-600 mt-1">
                    {st.topic} • Scored {st.score}%
                  </p>
                </div>

                <Button variant="outline" size="sm">
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
