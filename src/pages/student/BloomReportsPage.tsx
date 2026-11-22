import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Award, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw,
  TrendingUp,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { dbStore, PerformanceReport } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';

export const BloomReportsPage: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId');

  const reports = dbStore.getReports(user?.id);
  const activeReport: PerformanceReport | undefined = 
    reports.find((r) => r.id === reportId) || reports[0];

  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [remediationPlan, setRemediationPlan] = useState<{
    summary: string;
    steps: string[];
    drills: string[];
  } | null>(null);

  const handleGenerateRemediation = async () => {
    setIsGeneratingAI(true);
    await new Promise((r) => setTimeout(r, 900));
    setRemediationPlan({
      summary: `Your cognitive evaluation indicates strong conceptual recall and comprehension (Remember: 90%+, Understand: 80%+), but critical learning bottlenecks in the higher-order EVALUATE and ANALYZE levels. In particular, you struggled to appraise time complexity trade-offs under dynamic load factors.`,
      steps: [
        'Review Unit 2: "AVL Tree Rotations under Multiple Inserts" to master the double rotation criteria.',
        'Study Unit 3: "Double Hashing vs Separate Chaining" slide notes with focus on cache line penalties.',
        'Complete 3 targeted evaluation drills in the AI Study Assistant.',
      ],
      drills: [
        'Drill 1: Critique whether quadratic probing or double hashing is better for low-memory microcontrollers.',
        'Drill 2: Calculate the minimum number of keys required to force an AVL tree of height 4.',
      ],
    });
    setIsGeneratingAI(false);
  };

  if (!activeReport) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-cream-300">
        <Brain className="w-12 h-12 text-terracotta-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-espresso-900">No Assessment Reports Found</h3>
        <p className="text-xs text-espresso-600 mt-1 max-w-sm mx-auto">
          Attempt an online quiz to generate your deterministic Bloom's Taxonomy cognitive report.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold bg-cream-200 text-espresso-800 px-2 py-0.5 rounded">
              {activeReport.course_code}
            </span>
            <Badge variant="warm">Deterministic Backend Scoring</Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-espresso-900 tracking-tight">
            {activeReport.assessment_title}
          </h1>
          <p className="text-xs text-espresso-600 mt-0.5">
            Generated on {new Date(activeReport.generated_at).toLocaleDateString()}
          </p>
        </div>

        <Button
          variant="warm"
          size="md"
          onClick={handleGenerateRemediation}
          isLoading={isGeneratingAI}
          leftIcon={<Sparkles className="w-4 h-4 text-amber-200" />}
        >
          Generate AI Remediation Plan
        </Button>
      </div>

      {/* Bloom's Taxonomy 6-Level Cognitive Scores */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-terracotta-600" />
            <CardTitle>Bloom's Revised Taxonomy Cognitive Breakdown</CardTitle>
          </div>
          <span className="text-xs font-bold text-espresso-500">6 Cognitive Domains</span>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOOM_ORDER.map((lvl) => {
              const meta = BLOOM_LEVELS[lvl];
              const scoreObj = activeReport.bloom_scores[lvl] || { scored: 0, total: 0, percentage: 0, status: 'insufficient_data' };
              const pct = scoreObj.percentage;

              return (
                <div
                  key={lvl}
                  className="p-5 rounded-2xl border border-cream-300 bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-espresso-800">
                      {meta.label}
                    </span>
                    <Badge bloomLevel={lvl} size="sm">
                      {scoreObj.status === 'mastered' ? 'Mastered' : scoreObj.status === 'developing' ? 'Developing' : 'Gap'}
                    </Badge>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-extrabold text-espresso-900 font-mono">
                      {pct}%
                    </span>
                    <span className="text-xs font-semibold text-espresso-500">
                      {scoreObj.scored} / {scoreObj.total} pts
                    </span>
                  </div>

                  <div className="w-full bg-cream-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: meta.color }}
                    />
                  </div>

                  <p className="text-[11px] text-espresso-500 line-clamp-2 leading-snug">
                    {meta.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Two Column: Topic Breakdown & Strengths/Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic-Wise Scores */}
        <Card>
          <CardHeader>
            <CardTitle>Topic Competency Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(activeReport.topic_scores).map(([topic, data]) => (
              <div key={topic} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-espresso-900">{topic}</span>
                  <span className="font-bold text-espresso-700">{data.percentage}%</span>
                </div>
                <div className="w-full bg-cream-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-terracotta-500 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${data.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Strengths & Learning Gaps */}
        <Card>
          <CardHeader>
            <CardTitle>Strengths & Learning Gaps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Validated Cognitive Strengths
              </span>
              <ul className="text-xs text-emerald-950 space-y-1 list-disc list-inside">
                {activeReport.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 space-y-1.5">
              <span className="text-xs font-bold text-rose-800 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Identified Learning Gaps
              </span>
              <ul className="text-xs text-rose-950 space-y-1 list-disc list-inside">
                {activeReport.weak_outcomes.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Remediation Plan (Rendered when generated) */}
      {remediationPlan && (
        <Card className="border-2 border-terracotta-300 bg-gradient-to-br from-cream-50 via-white to-terracotta-50/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-terracotta-600" />
              <CardTitle>Personalized AI Learning Plan (Gemini Grounded)</CardTitle>
            </div>
            <Badge variant="warm">Actionable Plan</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-2xl border border-cream-300 text-xs text-espresso-800 leading-relaxed">
              <span className="font-bold block mb-1 text-terracotta-700">Diagnostic Summary:</span>
              {remediationPlan.summary}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-cream-300">
                <span className="text-xs font-bold text-espresso-900 block mb-2">
                  3-Step Action Plan:
                </span>
                <ol className="text-xs text-espresso-700 space-y-2 list-decimal list-inside">
                  {remediationPlan.steps.map((st, i) => (
                    <li key={i}>{st}</li>
                  ))}
                </ol>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-cream-300">
                <span className="text-xs font-bold text-espresso-900 block mb-2">
                  Targeted Practice Drills:
                </span>
                <ul className="text-xs text-espresso-700 space-y-2 list-disc list-inside">
                  {remediationPlan.drills.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
