'use client'

import Link from 'next/link';
import { useForm } from "react-hook-form"
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const RegistrationForm = () => {
  const { register, handleSubmit , formState: { errors } } = useForm()

  const handleRegistration = async (data)=> {
    const {name , email , url , password} = data ;

    const { data : res, error } = await authClient.signUp.email({
      name: name, 
      email: email , 
      password: password, 
      image: url, 
      callbackURL: "/login"
    });

    if(error){
      toast.error(error.message , {position: "top-center", autoClose: 3000});
    } else {
      toast.success("Registration Successful" , {position: "top-center", autoClose: 3000}) ; 
    }
  }

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-[#F7FAFF]">

      {/* LEFT SIDE (Brand / Info) */}
      <div className="hidden md:flex flex-col justify-center px-16 lg:px-24 bg-linear-to-br from-white via-[#F6FAFF] to-[#EEF4FB] text-slate-900 relative overflow-hidden border-r border-slate-200/80">
        
        {/* subtle glow */}
        <div className="absolute w-72 h-72 bg-[#1E6FD9]/10 blur-3xl rounded-full top-10 left-10"></div>
        <div className="absolute w-72 h-72 bg-[#26D096]/10 blur-3xl rounded-full bottom-10 right-10"></div>

        <div className="relative max-w-md">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1E6FD9]/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1E6FD9] shadow-sm">
            Join Korean Guide BD
          </div>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900">
            Start Your Journey 🚀
          </h1>

          <p className="mt-5 text-slate-600 text-lg mb-8 max-w-md leading-relaxed">
            Join the platform to explore guides, track your progress, and build your future in Korea.
          </p>

          <ul className="space-y-4 text-sm text-slate-700">
            <li className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1 text-[#1E6FD9]">✔</span>
              <span>Access premium guides</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1 text-[#1E6FD9]">✔</span>
              <span>Save your favorites</span>
            </li>
            <li className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/85 p-4 shadow-sm backdrop-blur">
              <span className="mt-1 text-[#1E6FD9]">✔</span>
              <span>Personalized experience</span>
            </li>
          </ul>
        </div>
      </div>


      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center px-4 py-12 md:py-0">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_10px_40px_rgba(15,23,42,0.06)] border border-slate-200 p-8 md:p-10">
          
          <h2 className="text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            Create Account
          </h2>
          <p className="text-slate-600 text-sm mb-6 max-w-sm leading-relaxed">
            Quick and simple signup
          </p>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Name</label>
              <input 
                type="text"
                {...register("name" , { required: "*Name Required" })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10 outline-none transition"
                placeholder="Full name"
              />
              {errors.name && <p className='text-red-500 text-xs'>{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input 
                type="email"
                {...register("email" , { required: "*Email Required" })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10 outline-none transition"
                placeholder="you@domain.com"
              />
              {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Photo URL</label>
              <input 
                type="text"
                {...register("url" , { required: "*URL Required" })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10 outline-none transition"
                placeholder="https://..."
              />
              {errors.url && <p className='text-red-500 text-xs'>{errors.url.message}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Password</label>
              <input 
                type="password"
                {...register("password" , { required: "*Password Required" })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-[#1E6FD9] focus:bg-white focus:ring-4 focus:ring-[#1E6FD9]/10 outline-none transition"
                placeholder="Create password"
              />
              {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
            </div>

            {/* Button */}
            <button 
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-semibold bg-[#1E6FD9] hover:bg-[#0E4C97] hover:shadow-md transition shadow-sm"
            >
              Register
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-600">
            <span>Already have an account?</span>{" "}
            <Link href="/login" className="text-[#1E6FD9] font-semibold hover:underline">
              Login
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default RegistrationForm;