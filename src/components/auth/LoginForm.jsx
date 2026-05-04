'use client'
import React from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
     const { register, handleSubmit , formState: { errors } } = useForm()

    const handleLogin = async (data)=> {
        const {email , password} = data; 
        const { data : res, error } = await authClient.signIn.email({
            email: email, 
            password: password, 
            rememberMe: true,
            callbackURL: "/"
        });

         if(error){
                    toast.error(error.message , {position: "top-center",
                        autoClose: 3000,});
                }
         else{
                    toast.success("Login Successful" , {position: "top-center",
                        autoClose: 3000,}) ; 
        }

        console.log(data , "data") ; 
        console.log(errors , "errors") ;
    }

    const handleGoogleLogin = async ()=> {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className='flex justify-center items-center my-20'>
            <form action="" method="post" onSubmit={handleSubmit(handleLogin)}>

                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Login</legend>

                    <label className="label">Email</label>
                    <input type="email" {...register("email" , { required: "*Email Required" })} className="input" placeholder="Email" />
                    {errors.email && <p className='text-red-700'>{errors.email.message}</p>}

                    <label className="label">Password</label>
                    <input type="password"  {...register("password" ,  { required: "*Password Required" })} className="input" placeholder="Password" />
                    {errors.password && <p className='text-red-700'>{errors.password.message}</p>}

                    <input type="submit" className="btn btn-neutral mt-4" value="Login"/>
                     <button onClick={handleGoogleLogin} className="btn btn-neutral mt-4"> <FaGoogle></FaGoogle>Google</button>
                    <p> Don&apos;t have an account?  <Link href="\signup" className='text-primary font-bold'>Register Here</Link></p> 
                </fieldset>
            </form>

               
        </div>
    );
};

export default LoginForm;

