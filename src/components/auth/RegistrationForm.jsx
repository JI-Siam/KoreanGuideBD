'use client'

import Link from 'next/link';
import { useForm } from "react-hook-form";
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleRegistration = async (data) => {
    const { name, email, url, password } = data;

    const { data: res, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      image: url,
      callbackURL: "/login"
    });

    if (error) {
      toast.error(error.message, { position: "top-center", autoClose: 3000 });
    } else {
      toast.success("Registration Successful", { position: "top-center", autoClose: 3000 });
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[var(--color-primary-bg)] text-[var(--color-primary-text)]">
      {/* LEFT SIDE (Brand / Charter Info) */}
      <div className="hidden md:flex flex-col justify-center px-12 lg:px-20 bg-[var(--color-secondary-bg)] border-r border-[var(--color-border)]">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 border border-[var(--color-border)] bg-[var(--color-card-bg)] px-3.5 py-1.5 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[var(--color-accent-green)] mb-6">
            New Registration
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight text-[var(--color-primary-text)] font-inter">
            Start Your Preparation.
          </h1>

          <p className="mt-4 text-sm md:text-base text-[var(--color-secondary-text)] leading-relaxed">
            Create an applicant profile to save university bookmarks, track required checklist items, and monitor seasonal intake deadlines.
          </p>

          <div className="mt-8 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-3.5">
              <span className="text-[var(--color-accent-green)] font-bold">✓</span>
              <span className="text-[var(--color-primary-text)]">Unrestricted guide database access</span>
            </div>
            <div className="flex items-center gap-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-3.5">
              <span className="text-[var(--color-accent-green)] font-bold">✓</span>
              <span className="text-[var(--color-primary-text)]">Document checklist progress synchronization</span>
            </div>
            <div className="flex items-center gap-3 border border-[var(--color-border)] bg-[var(--color-card-bg)] p-3.5">
              <span className="text-[var(--color-accent-green)] font-bold">✓</span>
              <span className="text-[var(--color-primary-text)]">Direct university portal navigation</span>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center px-6 py-12 md:py-0">
        <div className="w-full max-w-md border border-[var(--color-border)] bg-[var(--color-card-bg)] p-8 md:p-10 shadow-xs">
          <div className="mb-2 text-xs font-mono font-bold uppercase tracking-widest text-[var(--color-muted-text)]">
            Applicant Enrollment
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-primary-text)] mb-2 font-inter tracking-tight">
            Create Account
          </h2>
          <p className="text-[var(--color-secondary-text)] text-xs md:text-sm mb-6">
            Enter valid biographical and contact parameters.
          </p>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "*Name Required" })}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)] text-sm"
                placeholder="Applicant name"
              />
              {errors.name && <p className="text-[var(--color-destructive)] text-xs font-mono">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "*Email Required" })}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)] text-sm"
                placeholder="name@domain.com"
              />
              {errors.email && <p className="text-[var(--color-destructive)] text-xs font-mono">{errors.email.message}</p>}
            </div>

            {/* Photo URL */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
                Photo URL (Optional)
              </label>
              <input
                type="text"
                {...register("url")}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)] text-sm"
                placeholder="https://images.example.com/photo.jpg"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--color-primary-text)]">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "*Password Required" })}
                className="w-full px-4 py-3 border border-[var(--color-border)] bg-[var(--color-secondary-bg)] text-[var(--color-primary-text)] placeholder:text-[var(--color-muted-text)] outline-none transition focus:border-[var(--color-border-strong)] focus:ring-2 focus:ring-[var(--color-ring)] text-sm"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-[var(--color-destructive)] text-xs font-mono">{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn btn-black w-full py-3.5 text-xs font-bold uppercase tracking-wider focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:outline-none"
              >
                Register Profile →
              </button>
            </div>
          </form>

          <div className="mt-8 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-secondary-text)]">
            <span>Already have credentials?</span>{" "}
            <Link href="/login" className="text-[var(--color-primary-blue)] font-bold hover:underline ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
