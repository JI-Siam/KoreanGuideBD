import React from 'react';
import Navbar from "@/components/shared/Navbar";
import AuthHeader from '@/components/shared/AuthHeader';

const AuthLayout = ({children}) => {
    return (
        <div className=''>
                <AuthHeader></AuthHeader>
                {children}
        </div>
    );
};

export default AuthLayout;