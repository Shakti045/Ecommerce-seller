'use client'
import Productform from "@/app/components/dashboard/ProdutForm"
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { Appcontext } from "@/app/context/Appcontext";
const page = () => {
    const {editmode}=useContext(Appcontext);
    const router=useRouter();
    useEffect(()=>{
        if(!editmode){
            router.back();
        }
    },[]);
    return (
      <div className=" overflow-y-scroll h-full">
         <h1 className=" mt-4 mx-10 text-3xl font-bold">Make Changes On Your Product</h1>
          <Productform/>
      </div>
    )
  }

export default page;