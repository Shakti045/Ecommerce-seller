'use client'
import Sidemenu from "../components/dashboard/Sidemenu";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { Appcontext } from "../context/Appcontext";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default  function DashboardLayout({
  children,
}: {
  children: React.ReactNode

}) {
// const {token}=useContext(Appcontext);
// useEffect(()=>{
//     if(!token){
//         toast.error("You are not authorized to access this page");
//         redirect("/");
//     }
// },[]);

  return (
    <div className=" flex w-full h-[calc(100vh-5rem)] bg-slate-300">
      <div className=" w-[20%]">
        <Sidemenu />
      </div>
      <main className=" h-full  overflow-hidden w-[80%]">
        {children}
        <ToastContainer />
      </main>
    </div>
  );
};