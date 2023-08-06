'use client'
import {RxDashboard} from 'react-icons/rx'
import {FcBusinessman} from 'react-icons/fc'
import {BiLogOut} from 'react-icons/bi'
import {FaShoppingCart} from 'react-icons/fa'
import {BsPlusLg} from 'react-icons/bs'
import {MdProductionQuantityLimits} from 'react-icons/md'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { toast } from 'react-hot-toast'
const Sidemenu = () => {
    const {setshowLogin,user,setmytoken,setmyuser}=useContext(Appcontext);
    const router=useRouter();
    const dashboardlinks=[
        {   
            id:1,
            name:'Dashboard',
            icon:RxDashboard,
            link:'/dashboard'

        },
        // {
        //     id:2,
        //     name:'My Profile',
        //     icon:FcBusinessman,
        //     link:'/dashboard/profile'
        // },
        {
            id:2,
            name:'My Products',
            icon:MdProductionQuantityLimits,
            link:'/dashboard/products'
        },
        {
            id:3,
            name:'Create Product',
            icon:BsPlusLg,
            link:'/dashboard/createproduct'
        },
        {
            id:4,
            name:'My Orders',
            icon:FaShoppingCart,
            link:'/dashboard/orders'
        },
    ]
    function logouthandler(){
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setmytoken(null);
        setmyuser(null);
        setshowLogin(false);
        router.push('/');
        toast.success('Logged out successfully');
      }
    const pathname=usePathname();
  return (
    <div className=" w-full h-full  bg-slate-400">
        <div className=' border-b-2'>
        {
              dashboardlinks.map((link,index)=>{
                    const Icon=link.icon;
                    return(
                        <Link key={index} href={link.link}>
                        <div className={`flex items-center gap-2 p-4 hover:bg-slate-500 cursor-pointer ${pathname===link.link?" bg-yellow-400":""}`}>
                            <Icon/>
                            <p>{link.name}</p>
                        </div>
                        </Link>
                    )
                })
              }
        </div>
        <div className=' w-full'>
            <button onClick={logouthandler} className=" w-full flex items-center gap-2 p-4 hover:bg-slate-500 cursor-pointer"><BiLogOut/>Logout</button>
        </div>
    </div>
  )
}

export default Sidemenu;