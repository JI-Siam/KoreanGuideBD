'use client'

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';
import { Eye, EyeOff, ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const errorSummaryRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    setAuthError(null);
    setIsSubmitting(true);
    const { email, password } = data;

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: '/',
      });

      if (error) {
        setAuthError(error.message || 'Authentication failed. Please verify your credentials.');
        toast.error(error.message, { position: 'top-center', autoClose: 3000 });
        if (errorSummaryRef.current) {
          errorSummaryRef.current.focus();
        }
      } else {
        toast.success('Login Successful', { position: 'top-center', autoClose: 3000 });
      }
    } catch (err) {
      setAuthError('An unexpected server error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
    });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      {/* LEFT COLUMN: Swiss Identity & Security Declaration */}
      <div className="hidden md:flex flex-col justify-between px-12 lg:px-20 py-16 border-r border-[var(--color-border)] bg-[var(--color-secondary-bg)]">
        <div>
          {/* System Tag */}
          <div className="flex items-center gap-2 mb-8">
            <span className="h-2 w-2 bg-[var(--color-accent-green)]" aria-hidden="true" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary-blue)]">
              AUTH-GATEWAY // PROTOCOL 2.4
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight text-[var(--color-primary-text)] font-inter leading-[1.05]">
            Access Verified
            <br />
            Korean Guides.
          </h1>

          <p className="mt-5 text-sm md:text-base leading-relaxed text-[var(--color-secondary-text)] max-w-md">
            Sign in to synchronize your application checklist, store university program bookmarks, and receive statutory intake alerts.
          </p>

          {/* Operational Verification Grid */}
          <div className="mt-10 space-y-3 font-mono text-xs max-w-md">
            <div className="flex items-start gap-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4">
              <ShieldCheck className="h-4 w-4 text-[var(--color-accent-green)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-[var(--color-primary-text)] font-bold block uppercase">Checklist State Sync</span>
                <span className="text-[var(--color-muted-text)] text-[11px]">Track notarizations, bank deposits, and apostille progress.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4">
              <Lock className="h-4 w-4 text-[var(--color-primary-blue)] shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <span className="text-[var(--color-primary-text)] font-bold block uppercase">Secure Token Session</span>
                <span className="text-[var(--color-muted-text)] text-[11px]">Encrypted session tokens compliant with OAuth 2.0 standards.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Coordinates */}
        <div className="pt-8 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-muted-text)]">
          <span>SERVER / TOKYO-KR-01</span>
          <span>LAT 37.5665° N</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Accessible Swiss Authentication Form */}
      <div className="flex items-center justify-center px-6 py-12 md:py-20">
        <div className="w-full max-w-md border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 md:p-10 shadow-xs">
          {/* Header */}
          <div className="mb-8">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[var(--color-accent-green)] block mb-1">
              Identity Verification
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-[var(--color-primary-text)] font-inter">
              Sign In to Account
            </h2>
            <p className="mt-2 text-xs md:text-sm text-[var(--color-secondary-text)]">
              Enter registered credentials or authenticate with OAuth provider.
            </p>
          </div>

          {/* Accessible Focusable Error Summary (WCAG 2.2 AAA Requirement) */}
          {authError && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
              className="mb-6 border-l-4 border-l-[var(--color-destructive)] border-y border-r border-[var(--color-border)] bg-[var(--color-destructive-subtle)] p-4 outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-destructive)]"
            >
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 text-[var(--color-destructive)] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-destructive)]">
                    Authentication Failure
                  </h3>
                  <p className="text-xs text-[var(--color-secondary-text)] mt-1">
                    {authError}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5" noValidate>
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]"
              >
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register('email', {
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Enter a valid email address format',
                  },
                })}
                placeholder="name@domain.com"
                className="w-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] px-4 py-3 text-sm text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs font-mono text-[var(--color-destructive)] mt-1">
                  * {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field with Accessible Visibility Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]"
                >
                  Password
                </label>
                <Link
                  href="/login"
                  className="text-[11px] font-mono text-[var(--color-muted-text)] hover:text-[var(--color-primary-text)] hover:underline"
                >
                  Forgot token?
                </Link>
              </div>

              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-required="true"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  placeholder="••••••••"
                  className="w-full border border-[var(--color-border)] bg-[var(--color-secondary-bg)] pl-4 pr-11 py-3 text-sm text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[var(--color-muted-text)] hover:text-[var(--color-primary-text)] focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>

              {errors.password && (
                <p id="password-error" role="alert" className="text-xs font-mono text-[var(--color-destructive)] mt-1">
                  * {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-black w-full py-3.5 text-xs font-bold uppercase tracking-wider inline-flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Portal'}</span>
                {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="btn btn-outline w-full py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                <FaGoogle aria-hidden="true" />
                <span>Continue with Google</span>
              </button>
            </div>
          </form>

          {/* Registration Referral Link */}
          <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-secondary-text)]">
            <span>Don&apos;t have an active profile?</span>{' '}
            <Link
              href="/signup"
              className="font-bold text-[var(--color-primary-blue)] hover:underline ml-1 focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
            >
              Create an account →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
