import React from 'react';
import Navbar from '@/components/shared/Navbar';
import Footer from '@/components/shared/Footer';
import PageTransition from '@/components/shared/PageTransition';
const layout = ({children}) => {
  return (
    <div>
         <Navbar></Navbar>
         <PageTransition>{children}</PageTransition>
         <Footer></Footer>
    </div>
  );
};

export default layout;