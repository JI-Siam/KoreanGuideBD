import { Geist, Geist_Mono } from "next/font/google";
import { Roboto } from 'next/font/google'
import { Ubuntu } from "next/font/google";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
 import { ToastContainer, toast } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


 
const roboto = Roboto_Slab({
  variable : "--font-roboto-slab" , 
  weight: '400',
  subsets: ['latin'],
}) ; 

const ubuntu = Ubuntu({
  variable : "--font-ubuntu" , 
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Korean Guide BD",
  description: "Korean Guide BD - travel and study guides for Korea",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${ubuntu.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-100 via-purple-100 to-indigo-100 ">
        {children}
        <ToastContainer />
        </body>
    </html>
  );
}
