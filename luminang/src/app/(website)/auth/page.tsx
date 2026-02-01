'use client';

import { Button } from '@/components/ui';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { validateEmail, validatePassword, validateUsername } from '@/lib/validation';
import { sanitizeEmail, sanitizeUsername } from '@/lib/sanitize';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAdmin, isAuthenticated, login, signup, isLoading: authUpdating } = useAuth();
  const [localLoading, setLocalLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const isSubmitting = localLoading || (hasSubmitted && authUpdating && !isAuthenticated);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !authUpdating) {
      router.push(isAdmin ? '/admin' : '/dashboard');
    }
  }, [isAuthenticated, isAdmin, authUpdating, router]);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (field: string, value: string) => {
    let sanitizedValue = value;
    if (field === 'email') {
      sanitizedValue = sanitizeEmail(value);
    } else if (field === 'username') {
      sanitizedValue = sanitizeUsername(value);
    }
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!isLogin) {
      const usernameValidation = validateUsername(formData.username);
      if (!usernameValidation.isValid) {
        newErrors.username = usernameValidation.error!;
      }
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.errors[0];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLocalLoading(true);
    setHasSubmitted(true);
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.username);
        alert('Account created! Please check your email if confirmation is enabled, or log in.');
        setIsLogin(true);
      }
    } catch (error: any) {
      // Rule 6: Error Prevention & Recovery - Clear, actionable error messages
      if (!isLogin && error.message?.includes('already registered')) {
        setErrors({ form: 'This email is already registered. Please use the login form below instead.' });
        setIsLogin(true);
      } else if (error.message?.includes('Invalid login credentials')) {
        setErrors({ form: 'The email or password you entered is incorrect. Please try again.' });
      } else if (error.message?.includes('Email not confirmed')) {
        setErrors({ form: 'Please check your email and click the confirmation link before logging in.' });
      } else {
        console.error("Authentication failed", error);
        setErrors({ form: error.message || 'We couldn\'t complete your request. Please check your connection and try again.' });
      }
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-amber-950/20 to-black pt-16">
      <div className="section-container max-w-md">
        <div className="bg-zinc-900 border-2 border-amber-600/50 rounded-xl p-8 shadow-2xl">
          <h1 className="text-amber-400 font-serif text-4xl text-center mb-2">
            {isLogin ? 'LOGIN' : 'SIGN UP'}
          </h1>
          <p className="text-gray-400 text-sm text-center mb-8">
            {isLogin ? 'Welcome back, explorer' : 'Begin your journey through the regions'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {errors.form && (
              <div
                className="bg-red-900/40 border border-red-500 text-red-200 text-sm p-3 rounded-lg animate-shake"
                role="alert"
                aria-live="assertive"
              >
                {errors.form}
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="text-gray-300 text-sm font-semibold block mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  disabled={isSubmitting}
                  className={`w-full bg-zinc-800 border rounded px-4 py-3 text-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${errors.username ? 'border-red-500' : 'border-amber-700/30 focus:border-amber-500'
                    }`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="text-red-400 text-xs mt-1">{errors.username}</p>
                )}
              </div>
            )}

            <div>
              <label className="text-gray-300 text-sm font-semibold block mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={isSubmitting}
                className={`w-full bg-zinc-800 border rounded px-4 py-3 text-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${errors.email ? 'border-red-500' : 'border-amber-700/30 focus:border-amber-500'
                  }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm font-semibold block mb-2">
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                disabled={isSubmitting}
                className={`w-full bg-zinc-800 border rounded px-4 py-3 text-gray-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${errors.password ? 'border-red-500' : 'border-amber-700/30 focus:border-amber-500'
                  }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
              {!isLogin && !errors.password && (
                <p className="text-gray-500 text-xs mt-1">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number
                </p>
              )}
            </div>

            <Button
              variant="primary"
              className="w-full text-base font-bold"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                  {isLogin ? 'LOGGING IN...' : 'SIGNING UP...'}
                </span>
              ) : (
                isLogin ? 'LOGIN & PLAY' : 'SIGN UP & PLAY'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setErrors({});
                setFormData({ username: '', email: '', password: '' });
              }}
              disabled={isSubmitting}
              className="text-amber-400 text-sm hover:text-amber-300 transition-colors disabled:opacity-50"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}