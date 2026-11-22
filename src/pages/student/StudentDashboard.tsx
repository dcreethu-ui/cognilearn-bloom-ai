import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Brain,
  Bot,
  Settings,
  Flame,
  Clock,
  Compass,
  Play
} from 'lucide-react';
import { dbStore } from '../../lib/mockData';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { BLOOM_LEVELS, BLOOM_ORDER } from '../../lib/bloomTaxonomy';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const enrolledCourses = dbStore.getEnrolledCourses(user?.id || 's202-student-id');
  const assessments = dbStore.getAssessments();
  const latestReport = dbStore.getLatestReport(user?.id);

  // Daily study progress data matching Screen 1's vertical rounded bar charts!
  const dailyProgress = [
    { day: 'Mon', minutes: 28, height: '65%' },
    { day: 'Tue', minutes: 45, height: '90%' },
    { day: 'Wed', minutes: 20, height: '48%' },
    { day: 'Thu', minutes: 35, height: '80%' },
    { day: 'Fri', minutes: 50, height: '100%' },
    { day: 'Sat', minutes: 15, height: '35%' },
    { day: 'Sun', minutes: 30, height: '70%' },
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Top Section matching Screen 1 & Screen 2 from user's attached design */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Profile Card & Daily Progress (Inspired directly by Screen 1) */}
        <div className="bg-cream-200/90 rounded-3xl border border-cream-300/80 p-6 shadow-warm flex flex-col justify-between">
          <div>
            {/* Top Bar with Settings */}
            <div className="flex items-center justify-between pb-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-espresso-600/80">
                Cognitive Profile
              </span>
              <button className="text-espresso-600 hover:text-espresso-900 p-1.5 rounded-xl hover:bg-cream-300/50 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>

            {/* Circular Avatar & Name (Screen 1 style) */}
            <div className="flex flex-col items-center text-center my-2">
              <div className="relative">
                <img
                  src={user?.avatar_url || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256'}
                  alt={user?.full_name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-warm"
                />
                <span className="absolute bottom-0 right-0 w-5 h-5 bg-terracotta-500 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px]">
                  ✓
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-espresso-900 mt-3 tracking-tight">
                {user?.full_name || 'Alex Rivera'}
              </h2>
              <span className="text-xs font-semibold text-terracotta-700 bg-terracotta-100/80 px-3 py-0.5 rounded-full mt-1 uppercase tracking-wider">
                Student Scholar
              </span>
            </div>

            {/* Mindful Points Box (Screen 1 style) */}
            <div className="bg-white/80 rounded-2xl p-4 my-5 border border-cream-300 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold text-espresso-600 uppercase tracking-wider">
                    Cognitive Points
                  </span>
                  <span className="text-xs text-espresso-400">Mastery Index</span>
                </div>
              </div>
              <span className="text-3xl font-extrabold text-terracotta-600 font-mono tracking-tight">
                561
              </span>
            </div>

            {/* "MY PROGRESS - MINUTES PER DAY" Vertical Bar Chart (Directly matching Screen 1) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-bold text-espresso-700 uppercase tracking-wider mb-3">
                <span>My Progress</span>
                <span className="text-[11px] text-espresso-500 font-semibold">Minutes / Day</span>
              </div>

              {/* Vertical Rounded Bars Container */}
              <div className="flex items-end justify-between gap-2 h-32 px-1 py-2 bg-white/60 rounded-2xl border border-cream-300/70">
                {dailyProgress.map((d, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                    <span className="text-[10px] font-bold text-espresso-600">{d.minutes}</span>
                    <div className="w-full max-w-[18px] bg-cream-300/60 rounded-full h-full flex items-end overflow-hidden p-0.5">
                      <div
                        className="w-full bg-gradient-to-t from-terracotta-500 to-amber-400 rounded-full transition-all duration-500"
                        style={{ height: d.height }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-espresso-500 uppercase">{d.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-cream-300/70 text-center">
            <Link to="/student/reports">
              <Button variant="ghost" size="sm" className="w-full text-xs font-bold text-terracotta-700">
                View Full Cognitive Transcript
              </Button>
            </Link>
          </div>
        </div>

        {/* Center & Right Column: "My Course" and Next Action (Inspired by Screen 2) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-espresso-900 tracking-tight">
                My Courses
              </h2>
              <p className="text-xs text-espresso-600">Continue learning and tracking outcome mastery</p>
            </div>
            <Link to="/student/browse">
              <Button variant="outline" size="sm" leftIcon={<Compass className="w-3.5 h-3.5" />}>
                Browse All
              </Button>
            </Link>
          </div>

          {/* Course Cards Grid (Screen 2 style cards with warm illustration accents) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {enrolledCourses.map((c, idx) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-cream-300/90 shadow-warm p-5 flex flex-col justify-between hover:shadow-warm-md hover:border-terracotta-300 transition-all duration-200 group"
              >
                <div>
                  {/* Card Banner with Warm Color Accent */}
                  <div className="h-28 rounded-2xl bg-gradient-to-tr from-cream-200 via-terracotta-100 to-amber-100 border border-cream-300/70 p-4 flex flex-col justify-between relative overflow-hidden mb-4">
                    <div className="flex items-center justify-between z-10">
                      <span className="font-mono text-xs font-bold bg-white/90 text-espresso-800 px-2.5 py-0.5 rounded-lg shadow-2xs">
                        {c.code}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-terracotta-500 text-white px-2 py-0.5 rounded-full">
                        Step {idx + 1} of 8
                      </span>
                    </div>
                    <div className="z-10">
                      <span className="text-xs font-extrabold text-terracotta-800 uppercase tracking-wider block">
                        Core Competency
                      </span>
                      <span className="text-xs text-espresso-600 font-medium">Enjoy being effective</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-espresso-900 leading-snug group-hover:text-terracotta-600 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-xs text-espresso-600 line-clamp-2 mt-1">
                    {c.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-cream-200 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-espresso-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Fall 2026</span>
                  </div>
                  <Link to="/student/my-courses">
                    <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Open Course
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Active Assessment Highlight Banner (Screen 2 / Screen 3 transition) */}
          {assessments[0] && (
            <div className="bg-gradient-to-r from-terracotta-500 to-amber-500 rounded-3xl p-6 text-white shadow-warm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full text-white">
                  <Sparkles className="w-3 h-3 text-amber-200" />
                  Upcoming Diagnostic Assessment
                </div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {assessments[0].title}
                </h3>
                <p className="text-xs text-white/90">
                  {assessments[0].course_code} • {assessments[0].duration_minutes} Minutes • 6 Bloom Levels
                </p>
              </div>

              <Link to={`/student/quiz/${assessments[0].id}`}>
                <Button
                  variant="outline"
                  size="md"
                  className="bg-white text-terracotta-700 hover:bg-cream-50 border-transparent shadow-sm shrink-0"
                  leftIcon={<Play className="w-4 h-4 fill-current" />}
                >
                  Start Assessment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Bloom's Taxonomy Cognitive Distribution & AI Guidance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bloom's Mastery Profile */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-terracotta-100 text-terracotta-600 rounded-2xl">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <CardTitle>Bloom's Taxonomy Cognitive Breakdown</CardTitle>
                <CardDescription>
                  Real-time cognitive metrics evaluated deterministically from your assessment submissions
                </CardDescription>
              </div>
            </div>
            <Link to="/student/reports">
              <Badge variant="warm">View Details</Badge>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {BLOOM_ORDER.map((level) => {
              const meta = BLOOM_LEVELS[level];
              const scoreObj = latestReport?.bloom_scores[level] || { percentage: 70, status: 'developing' };
              const pct = scoreObj.percentage;
              return (
                <div key={level} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: meta.color }} />
                      <span className="font-bold text-espresso-900">{meta.label}</span>
                      <span className="text-espresso-400 hidden sm:inline">— {meta.description}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-espresso-800">{pct}%</span>
                      <Badge bloomLevel={level} size="sm">
                        {pct >= 75 ? 'Mastered' : pct >= 50 ? 'Developing' : 'Gap'}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-cream-200/80 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-2.5 rounded-full transition-all duration-700"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* AI Personalized Learning Recommendation */}
        <Card className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-terracotta-600" />
              <CardTitle>AI Learning Guidance</CardTitle>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-espresso-700 px-2.5 py-0.5 rounded-full">
              Gemini Tutor
            </span>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-4 bg-terracotta-50 border border-terracotta-200/80 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-terracotta-800">Priority Review Area</span>
                <Badge bloomLevel="evaluate" size="sm">Evaluate Level</Badge>
              </div>
              <p className="text-xs text-espresso-800 mt-2 leading-relaxed">
                {latestReport?.weak_outcomes[0] || 'Focus on comparing algorithmic trade-offs in hash collision resolution.'}
              </p>
            </div>

            <div className="p-4 bg-cream-100 border border-cream-300 rounded-2xl">
              <span className="text-xs font-bold text-espresso-800 block mb-1">
                Suggested Study Activity
              </span>
              <p className="text-xs text-espresso-600">
                Review <strong>Unit 3: Hash Tables & Probing Strategies</strong> lecture notes before taking Quiz 2.
              </p>
            </div>

            <Link to="/student/tutor">
              <Button variant="primary" size="sm" className="w-full mt-2" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Ask AI Study Assistant
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
