import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Sparkles,
  ClipboardCheck,
  BarChart3,
  Bot,
  BrainCircuit,
  Compass,
  BookmarkCheck,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface NavItem {
  label: string;
  to: string;
  icon: React.ElementType;
  badge?: string;
}

export const Sidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const { role } = useAuth();

  const facultyNavItems: NavItem[] = [
    { label: 'Overview', to: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Courses & Outcomes', to: '/faculty/courses', icon: BookOpen },
    { label: 'Course Materials', to: '/faculty/materials', icon: FileText },
    { label: 'AI Question Generator', to: '/faculty/question-bank', icon: Sparkles, badge: 'Gemini' },
    { label: 'Assessments Studio', to: '/faculty/assessments', icon: ClipboardCheck },
    { label: 'Bloom Analytics', to: '/faculty/analytics', icon: BarChart3 },
  ];

  const studentNavItems: NavItem[] = [
    { label: 'Student Home', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Browse Courses', to: '/student/browse', icon: Compass },
    { label: 'Enrolled Courses', to: '/student/my-courses', icon: BookmarkCheck },
    { label: 'Online Assessments', to: '/student/assessments', icon: ClipboardCheck },
    { label: 'Cognitive Mastery', to: '/student/reports', icon: BrainCircuit },
    { label: 'AI Study Assistant', to: '/student/tutor', icon: Bot, badge: 'AI' },
  ];

  const navItems = role === 'faculty' ? facultyNavItems : studentNavItems;

  return (
    <aside className="w-64 bg-cream-50/70 border-r border-cream-300 flex flex-col h-[calc(100vh-4rem)] select-none">
      {/* Navigation Group Header */}
      <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-espresso-500">
          {role === 'faculty' ? 'Faculty Portal' : 'Student Portal'}
        </span>
        <span className="inline-flex items-center text-[10px] font-bold text-terracotta-800 bg-terracotta-100 px-2 py-0.5 rounded-full">
          Bloom v1.0
        </span>
      </div>

      {/* Nav Link List */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all group',
                  isActive
                    ? 'bg-terracotta-500 text-white shadow-warm'
                    : 'text-espresso-700 hover:bg-cream-200/80 hover:text-espresso-950'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        'w-4 h-4 transition-colors',
                        isActive ? 'text-white' : 'text-espresso-500 group-hover:text-espresso-800'
                      )}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-terracotta-100 text-terracotta-700'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Cognitive Taxonomy Warm Banner */}
      <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-espresso-900 to-terracotta-900 text-white shadow-warm">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-extrabold tracking-tight text-white">Bloom's Taxonomy</span>
        </div>
        <p className="text-[11px] text-cream-200 leading-snug">
          Deterministic 6-level cognitive analysis powered by Supabase & Gemini.
        </p>
      </div>
    </aside>
  );
};
