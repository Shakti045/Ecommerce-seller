'use client'
import onboardinglogo1 from "@/assets/images/onboarding_logo_RajuImg.svg"
import onboardinglogo2 from "@/assets/images/revamp_banner_mobile (1).svg"
import Image from "next/image"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { Appcontext } from "../context/Appcontext"
const page = () => {
    const {
        register,
        handleSubmit,
        formState:{errors}
    }=useForm();
    const {setmyuser,setmytoken}=useContext(Appcontext);
    const router=useRouter();
    async function submithandler(data:any){
        const loading=toast.loading('Please wait...');
        try{
            const response=await axios.post('/api/auth/signup',{...data});
            if(response.data.Success){
                toast.success(response.data.Message);
            }
           setmytoken(response.data.Token);
           setmyuser(response.data.User);
           router.push('/dashboard');
        }catch(err:any){
            console.log(err);
            toast.error(err.response.data.Message);
        }finally{
            toast.dismiss(loading);
        }
    }
  return (
    <div className=" bg-slate-200 w-full h-[calc(100vh-5rem)]  flex justify-around items-center">
        <div className=" w-[35%] flex flex-col gap-3">
            <h1 className=" text-4xl font-semibold">Create your account</h1>
            <form onSubmit={handleSubmit(submithandler)} className=" flex flex-col gap-3">
              <div>
                <label htmlFor="firstname">First Name<sup className=" text-red-500">*</sup></label>
                <input type="text" id="firstname" {...register("firstname",{required:true})} placeholder="Enter your firstname" className=" border-2 p-2 outline-none rounded-md w-full"/>
                {
                    errors.firstname && (
                        <p className=" text-red-500">Firstname is required</p>
                    )
                    }
              </div>
                <div>
                <label htmlFor="lastname">Last Name<sup className=" text-red-500">*</sup></label>
                <input type="text" id="lastname" {...register("lastname",{required:true})} placeholder="Enter your lastname" className=" border-2 p-2 outline-none rounded-md w-full"/>
                {
                    errors.lastname && (
                        <p className=" text-red-500">Lastname is required</p>
                    )
                    }
                </div>
                <div>
                <label htmlFor="email">Email<sup className=" text-red-500">*</sup></label>
                <input type="email" id="email" {...register("email",{required:true})} placeholder="Enter your email" className=" border-2 p-2 outline-none rounded-md w-full"/>
                {
                    errors.email && (
                        <p className=" text-red-500">Email is required</p>
                    )
                    }
                </div>
                <div>
                <label htmlFor="password">Password<sup className=" text-red-500">*</sup></label>
                <input type="password" id="password" {...register("password",{required:true})} placeholder="Enter your password" className=" border-2 p-2 outline-none rounded-md w-full"/>
                {
                    errors.password && (
                        <p className=" text-red-500">Password is required</p>
                    )
                    }
                </div>
                <div>
                <label htmlFor="businessname">Business Name<sup className=" text-red-500">*</sup></label>
                <input type="text" id="businessname" {...register("businessname",{required:true})} placeholder="Enter your businessname" className=" border-2 p-2 outline-none rounded-md w-full"/>
                {
                    errors.businessname && (
                        <p className=" text-red-500">Businessname is required</p>
                    )
                    }
                </div>
                
                <button type="submit" className=" bg-yellow-400 p-3 rounded-md font-semibold">Create Account</button>
            </form>
        </div>
        <div className=" w-[30%] flex flex-col items-end gap-9 mt-7 ">
           <div  className="  flex gap-4 p-4 rounded-md border-2  border-zinc-400 ">
             <div>
                <Image src={onboardinglogo1} alt="onboardinglogo1"/>
             </div>
             <div className="  flex flex-col gap-3">
                <h1 className=" font-medium">Starting with 1, Flipkart helped me expand to 6 categories with 5x growth year on year!</h1>
                <p className=" text-sm opacity-70">Raju Lunawath, Amazestore</p>
             </div>
           </div>
             <div className="">
                <Image src={onboardinglogo2} alt="onboardinglogo2"/>
             </div>
        </div>
    </div>
  )
}

export default page