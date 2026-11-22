import React from 'react';
import { 
  GraduationCap, 
  Bell, 
  User, 
  LogOut, 
  Sparkles,
  ArrowRightLeft,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

interface NavbarProps {
  onMobileMenuToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMobileMenuToggle }) => {
  const { user, role, switchRole, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-cream-50/90 backdrop-blur-md border-b border-cream-300/80">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-2xl text-espresso-700 hover:bg-cream-200"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-terracotta-500 to-amber-500 flex items-center justify-center text-white shadow-warm">
              <Flame className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-espresso-900 tracking-tight flex items-center gap-1.5">
                Cogni<span className="text-terracotta-600">Learn</span>
                <span className="text-[10px] bg-terracotta-100 text-terracotta-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Bloom AI
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Role Switcher for seamless faculty/student testing */}
          <div className="flex items-center bg-cream-200/90 p-1 rounded-2xl border border-cream-300">
            <button
              onClick={() => switchRole('faculty')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'faculty'
                  ? 'bg-white text-terracotta-700 shadow-2xs'
                  : 'text-espresso-700 hover:text-espresso-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
              Faculty View
            </button>
            <button
              onClick={() => switchRole('student')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                role === 'student'
                  ? 'bg-white text-amber-800 shadow-2xs'
                  : 'text-espresso-700 hover:text-espresso-950'
              }`}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
              Student View
            </button>
          </div>

          {/* User Profile Pill (inspired by Screen 1 circular avatar styling) */}
          <div className="flex items-center gap-3 pl-2 sm:pl-3 border-l border-cream-300">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={user.full_name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white ring-2 ring-cream-300"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-cream-300 flex items-center justify-center text-espresso-700 font-medium text-sm">
                <User className="w-4 h-4" />
              </div>
            )}
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-espresso-900 leading-tight">
                {user?.full_name || 'Guest User'}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <Badge
                  variant={role === 'faculty' ? 'warm' : 'success'}
                  size="sm"
                  className="capitalize font-bold text-[10px] px-2 py-0"
                >
                  {role} Account
                </Badge>
              </div>
            </div>

            <button
              onClick={logout}
              className="text-espresso-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-cream-200 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
