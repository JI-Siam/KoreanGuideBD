'use client'
import { authClient } from "@/lib/auth-client"
import Image from "next/image";
import Link from "next/link";


const ProfileCard = () => {
        const { data: session } = authClient.useSession() ; 
        const user = session?.user ;
        return (
                <div className="min-h-[80vh] mt-40 px-4">
                    <h3 className='text-4xl font-bold text-center mt-12 text-slate-900'>Your Profile</h3>
                    <div className="max-w-3xl mx-auto mt-8 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                        <div className="flex flex-col md:flex-row items-center gap-6 p-6">
                            <div className="w-36 h-36 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                                    <img src={user?.image} alt="profile image" width={144} height={144} className="object-cover" />
                              
                            </div>

                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-slate-900">{user?.name}</h2>
                                <p className="text-sm text-slate-600">{user?.email}</p>
                                <p className="mt-3 text-sm text-slate-600">Member since: <span className="font-medium text-slate-800">{new Date(user?.created_at || Date.now()).toLocaleDateString()}</span></p>
                            </div>

                            <div className="mt-4 md:mt-0 md:ml-4">
                                <Link href="/profile/update" className="btn btn-primary">Update Profile</Link>
                            </div>
                        </div>
                    </div>
                </div>
        );
};

export default ProfileCard;