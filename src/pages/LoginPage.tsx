import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { LoginForm } from '../components/auth/LoginForm';
import { useAuthStore } from '../store/auth.store';

export const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-primary-600 dark:text-primary-500">
          <Shield className="w-12 h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-gray-100 dark:border-gray-700">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};
