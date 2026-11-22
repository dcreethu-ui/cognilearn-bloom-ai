import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types/database.types';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email || 'new.user@university.edu', selectedRole);
    navigate(selectedRole === 'faculty' ? '/faculty/dashboard' : '/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md shadow-sky-200 mb-3">
          <GraduationCap className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Create an Account
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Join CogniLearn to evaluate cognitive development & learning ability
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <Card className="p-2 sm:p-4">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                  I am registering as:
                </label>
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('student')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                      selectedRole === 'student'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('faculty')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                      selectedRole === 'faculty'
                        ? 'bg-white text-sky-700 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Faculty Member
                  </button>
                </div>
              </div>

              <Input
                label="Full Name"
                placeholder="Dr. Jane Smith or Alex Rivera"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <Input
                label="Email address"
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                className="w-full mt-2"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Create Account
              </Button>
            </form>

            <div className="mt-6 pt-5 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <Link to="/login" className="text-sky-600 hover:text-sky-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
