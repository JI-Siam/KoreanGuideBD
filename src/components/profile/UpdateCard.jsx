'use client'

import { useForm, SubmitHandler } from "react-hook-form"
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';


const UpdateCard = () => {
        const { data: session } = authClient.useSession() ; 
        const user = session?.user ;

           const { register, handleSubmit , formState: { errors } } = useForm(); 

         const handleUpdate = async (data)=> {
                const {name , image} = data ;
        
                const { data : res, error } = await authClient.updateUser({
                    image: image,
                    name: name,
                }) ; 
        
                if(error){
                    toast.error(error.message , {position: "top-center",
                        autoClose: 3000,});
                }
                else{
                    toast.success("Update Successful" , {position: "top-center",
                        autoClose: 3000,}) ; 
                }
                console.log(res , "res") ;
                console.log(error) ; 
            }

        return (
                <div className="min-h-[70vh] flex items-center justify-center px-4">
                    <div className="w-full max-w-md bg-white rounded-2xl shadow-md border border-gray-100 p-8">
                        <h2 className="text-2xl font-semibold text-slate-900 mb-4">Update Profile</h2>

                        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Name</label>
                                <input defaultValue={user?.name} type="text" {...register("name" , { required: "*Name Required" })} className="input input-bordered w-full mt-2" placeholder={user?.name} />
                                {errors.name && <p className='text-red-700 text-sm mt-1'>{errors.name.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">Photo URL</label>
                                <input defaultValue={user?.image} type="text"  {...register("image" , { required: "*URL Required" })} className="input input-bordered w-full mt-2" placeholder={user?.image} />
                                {errors.image && <p className='text-red-700 text-sm mt-1'>{errors.image.message}</p>}
                            </div>

                            <div>
                                <button type="submit" className="btn btn-primary w-full">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
        );
};

export default UpdateCard;