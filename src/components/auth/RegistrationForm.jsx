'use client'

import Link from 'next/link';
import { useForm, SubmitHandler } from "react-hook-form"
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
            toast.error(error.message , {position: "top-center",
                autoClose: 3000,});
        }
        else{
            toast.success("Registration Successful" , {position: "top-center",
                autoClose: 3000,}) ; 
        }
        console.log(res , "res") ;
        console.log(error) ; 
    }

    
    return (
          <div className='flex justify-center items-center my-20'>

            <form action="" method="post" onSubmit={handleSubmit(handleRegistration)}>
                   <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Register</legend>

                    <label className="label">Name</label>
                    <input type="text" {...register("name" , { required: "*Name Required" })} className="input" placeholder="Name" />
                      {errors.name && <p className='text-red-700'>{errors.name.message}</p>}

                    <label className="label">Email</label>
                    <input type="email" {...register("email" , { required: "*Email Required" })}  className="input" placeholder="Email" />
                          {errors.email && <p className='text-red-700'>{errors.email.message}</p>}

                     <label className="label">Photo URL</label>
                    <input type="text"  {...register("url" , { required: "*URL Required" })} className="input" placeholder="Photo URL" />
                          {errors.url && <p className='text-red-700'>{errors.url.message}</p>}

                    <label className="label">Password</label>
                    <input type="password"  {...register("password" , { required: "*Password Required" })} className="input" placeholder="Password" />
                          {errors.password && <p className='text-red-700'>{errors.password.message}</p>}


                    <input type="submit" className="btn btn-neutral mt-4" value="Register"/>
                
                     <Link href="\login" className='text-primary text-center font-bold'>Login</Link>
                </fieldset>
            </form>
             
        </div>
    );
};

export default RegistrationForm;