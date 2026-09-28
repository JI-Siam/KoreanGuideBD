'use client'

import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { FaGoogle } from 'react-icons/fa';

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe: true,
      callbackURL: '/'
    });

    if (error) {
      toast.error(error.message, { position: 'top-center', autoClose: 3000 });
    } else {
      toast.success('Login Successful', { position: 'top-center', autoClose: 3000 });
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google'
    });
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#F7FAFF]">
      <div className="hidden md:flex flex-col justify-center px-16 lg:px-24 border-r border-slate-200/80 bg-linear-to-br from-white via-[#F6FAFF] to-[#EEF4FB]">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E6FD9]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1E6FD9] shadow-sm">
            Welcome Back
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 leading-tight">
            Welcome back.
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600">
            Continue your journey, access saved guides, and stay on track with your plans.
          </p>

          <div className="mt-10 space-y-4 text-sm text-slate-700">
            <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1E6FD9]"></span>
              <p>Pick up where you left off</p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1E6FD9]"></span>
              <p>Access your saved guides instantly</p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1.5 h-2 w-2 rounded-full bg-[#1E6FD9]"></span>
              <p>Secure and fast authentication</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12 md:py-0">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white px-8 py-10 shadow-[0_10px_40px_rgba(15,23,42,0.06)] md:px-10">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            Login
          </h2>

          <p className="mt-2 mb-8 max-w-sm text-sm leading-relaxed text-slate-500">
            Enter your credentials to continue
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                {...register('email', { required: '*Email Required' })}
                placeholder="you@domain.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10"
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <input
                type="password"
                {...register('password', { required: '*Password Required' })}
                placeholder="Your password"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10"
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#1E6FD9] py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#0E4C97] hover:shadow-md"
              >
                Login
              </button>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <FaGoogle />
                Continue with Google
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Don&apos;t have an account?</span>{' '}
            <Link href="/signup" className="font-medium text-[#1E6FD9]">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;