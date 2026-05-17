import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { RegisterForm } from '../components/auth/RegisterForm';
import { useAuthStore } from '../store/auth.store';

export const RegisterPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200 bg-gradient-to-bl from-purple-50 via-slate-50 to-indigo-50 dark:from-[#0B0F19] dark:via-[#111827] dark:to-indigo-950/30">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-primary-600 dark:text-primary-500">
          <Shield className="w-12 h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-xl py-8 px-4 shadow-2xl sm:rounded-2xl sm:px-10 border border-white/40 dark:border-gray-700/50">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};
