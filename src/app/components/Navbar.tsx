"use client"
import Logo from "@/assets/images/flipkart_logo_color_revamp.svg"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { Appcontext } from "../context/Appcontext"
import {BiLogOut} from 'react-icons/bi'
import { toast } from "react-hot-toast"
import {RxDashboard} from 'react-icons/rx'
import {FcBusinessman} from 'react-icons/fc'
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import { useEffect ,useState} from "react"
const Navbar = () => {
  const {setshowLogin,user,setmytoken,setmyuser}=useContext(Appcontext);
  const router=useRouter();
  const [mounted,setmounted]=useState(false);
  function logouthandler(){
    localStorage.clear();
    setmytoken(null);
    setmyuser(null);
    setshowLogin(false);
    router.push('/');
    toast.success('Logged out successfully');
  }
  const pathname=usePathname();
  const generalpath=['/','/login','/signup']
  useEffect(()=>{
    setmounted(true);
  },[])
  return (
      <>
       {
        mounted && (
          <div className={`h-20 ${generalpath.includes(pathname)  ?"bg-slate-100":"bg-slate-400"} shadow-xl  flex justify-between p-4`}>
          <Link href="/"><Image src={Logo} alt="Seller logo"/></Link>
          <div className=" flex">
            {
               user ? (<div className=" group   flex gap-2 items-center">
            
                <div className=" cursor-pointer relative flex gap-2 items-center group">
                <img className=" rounded-full h-[30px] w-[30px] " src={user.profilephoto} alt="userimage"/>
                <div className=" invisible group-hover:visible h-[30px] w-[30px] bg-slate-800 rounded-md rotate-45 z-50 absolute top-9">
   
                </div>
                <div className="invisible group-hover:visible z-50 w-[250px] h-[180px] bg-slate-800 absolute  top-12 translate-x-[-150px] flex flex-col gap-3 p-4 rounded-md">
                    <Link className=" hover:bg-blue-500 w-full flex items-center gap-2  text-white font-semibold p-2 rounded-md" href="/dashboard"><RxDashboard/> Dashboard</Link>
                    <button onClick={logouthandler} className="  hover:bg-blue-500 w-full flex items-center gap-2  text-white font-semibold p-2 rounded-md"><BiLogOut  />Logout</button>
                    <Link className=" hover:bg-blue-500  w-full flex items-center gap-2  text-white font-semibold p-2 rounded-md" href="/dashboard"><FcBusinessman/> Profile</Link>
                </div>
                <p>{user.firstname}</p>
                </div>
               
               </div>):(<><button onClick={()=>setshowLogin(true)} className=" p-3 bg-yellow-400 px-6 font-semibold ">Login</button>
               <button className=" p-3 bg-slate-200 text-black font-semibold">Start Selling</button></>)
            }
            
          </div>
       </div>
        )
       }
      </>
  )
}

export default Navbar