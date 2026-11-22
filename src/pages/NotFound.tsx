import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-4 border border-sky-100">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">404</h1>
        <h2 className="text-lg font-bold text-slate-800 mt-1 mb-2">Page Not Found</h2>
        <p className="text-sm text-slate-500 mb-6">
          The educational resource or dashboard route you are looking for does not exist or has been relocated.
        </p>
        <Link to="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};
