import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('dr.sharma@university.edu');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>('faculty');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, selectedRole);
    navigate(selectedRole === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-200 mb-3">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Sign in to CogniLearn
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          AI-Powered Student Learning & Bloom's Taxonomy Platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="p-2 sm:p-4">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Role Selector Pill */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  Select Role
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('faculty');
                      setEmail('dr.sharma@university.edu');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                      selectedRole === 'faculty'
                        ? 'bg-white text-sky-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Faculty Member
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedRole('student');
                      setEmail('alex.rivera@student.edu');
                    }}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                      selectedRole === 'student'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Enrolled Student
                  </button>
                </div>
              </div>

              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-sky-600 focus:ring-sky-500 mr-2" />
                  Remember me
                </label>
                <a href="#forgot" className="text-sky-600 hover:text-sky-700 font-medium">
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Sign In as {selectedRole === 'faculty' ? 'Faculty' : 'Student'}
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Don't have an account yet?{' '}
                <Link to="/register" className="text-sky-600 hover:text-sky-700 font-semibold">
                  Create an account
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Demo Hint */}
        <div className="mt-4 p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-center text-xs text-indigo-700 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo credentials loaded automatically for instant access.</span>
        </div>
      </div>
    </div>
  );
};
