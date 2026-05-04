'use client'
import { authClient } from "@/lib/auth-client"
import Image from "next/image";
import Link from "next/link";


const ProfileCard = () => {
    const { data: session } = authClient.useSession() ; 
    const user = session?.user ;
   // console.log(session.user , "profile data") ; 
    return (
        <div>
               <h3 className='text-5xl font-bold text-center font-[--font-roboto-slab] mt-20'>Your Profile</h3>
                  <div className="flex justify-center items-center  p-20">
                     <div className="card card-side bg-base-100 shadow-sm p-20">
                        <figure className="relative w-[300px] h-[300px]">
                            {user?.image ? (
                               <Image
                               src={user.image}
                               alt="profile image"
                               fill
                               className="object-cover" />
                            ) : (
                               <div className="w-full h-full bg-slate-200"></div>
                            )}
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{user?.name}</h2>
                            <p>{user?.email}</p>
                            <div className="card-actions justify-end">
                            <Link href="/profile/update" className="btn btn-primary">Update</Link>
                            </div>
                        </div>
                        </div>
                  </div>
            </div>
    );
};

export default ProfileCard;