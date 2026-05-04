import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
const layout = ({children}) => {
  return (
    <div>
         <Navbar></Navbar>
         {children}
         <Footer></Footer>
    </div>
  );
};

export default layout;