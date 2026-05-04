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
            <div>
               
               <div className="flex justify-center items-center  h-[80vh]">
                             <form action="" method="post" onSubmit={handleSubmit(handleUpdate)}>
                   <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="fieldset-legend">Update Info</legend>

                    <label className="label">Name</label>
                    <input defaultValue={user?.name} type="text" {...register("name" , { required: "*Name Required" })} className="input" placeholder={user?.name} />
                      {errors.name && <p className='text-red-700'>{errors.name.message}</p>}


                     <label className="label">Photo URL</label>
                    <input defaultValue={user?.image} type="text"  {...register("image" , { required: "*URL Required" })} className="input" placeholder={user?.image} />
                          {errors.image && <p className='text-red-700'>{errors.image.message}</p>}

                    <input type="submit" className="btn btn-primary mt-4" value="Update"/>
            
                </fieldset>
            </form>
               </div>
           
        </div>
    );
};

export default UpdateCard;