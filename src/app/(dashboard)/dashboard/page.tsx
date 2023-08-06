'use client'
import { Appcontext } from '@/app/context/Appcontext'
import React, { useContext } from 'react'
import Visualize from '@/app/components/dashboard/Visualize'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react';
import  Loading  from '@/app/loading';
const page = () => {
   const {user,token}=useContext(Appcontext);
   const [mounted,setmounted]=React.useState(false);
   const [products,setproducts]=React.useState<any>([]);
    const [orders,setorders]=React.useState<any>([]);
    const [loading,setloading]=React.useState(true);
   async function getdata(){
      try{
         const response=await axios.get('/api/getdashboarddata',{
            headers:{
              Authorization:`Bearer ${token}`
         }});

          if(response.data.Success){
              setproducts(response.data.Products);
              setorders(response.data.Orders);
            }

      }catch(err:any){
          console.log(err);
          toast.error(err.response.data.Message);
      }
      finally{

        setloading(false);
      }
   }
    useEffect(()=>{

        setmounted(true);
        getdata();
    },[])
  return (
       <>
        {
            mounted &&  (
              <>
                {
                  loading ? <Loading/> : (
                    (
                      <div  className=" overflow-y-scroll h-full  flex flex-col gap-4 p-2">
                      <div className=" p-4 rounded-md h-full mx-auto w-[100%] flex flex-col gap-4  ">
                       <div className=' flex justify-between'>
                       <h1 className="  text-2xl font-semibold">Welcome  {user?.firstname}</h1>
                       <div>

                       </div>
                       </div>
                         
                          <div className=' w-full flex justify-between'>
                            <div className='w-[200px]  items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Total Products</h1>
                               <h1 className="text-3xl font-bold">{products.length}</h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Total Orders</h1>
                               <h1 className=" text-3xl font-bold">{orders.length}</h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Orders Delivered</h1>
                               <h1 className=" text-3xl font-bold">
                                {
                                  orders.filter((order:any)=>order.status==="delivered").length
                                }
                               </h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Waiting for ship</h1>
                               <h1 className=" text-3xl font-bold">
                               {
                                  orders.filter((order:any)=>order.status==="pending").length
                                }
                               </h1>
                            </div>
                          </div>
                          <div className=' w-full flex justify-between'>
                            <div className='w-[200px]  items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Cancelled</h1>
                               <h1 className="text-3xl font-bold">
                                {
                                  orders.filter((order:any)=>order.status==="cancelled").length
                                }
                               </h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Total Profit</h1>
                               <h1 className=" text-3xl font-bold">
                                {
                                  orders.reduce((acc:any,order:any)=>acc+(order.selllprice*order.quantity),0)
                                }
                               </h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">Orders Shipped</h1>
                               <h1 className=" text-3xl font-bold">
                                {
                                  orders.filter((order:any)=>order.status==="shipped").length
                                }

                               </h1>
                            </div>
                            <div className=' w-[200px] items-center flex flex-col gap-2 p-4 bg-slate-800 text-white rounded-md'>
                               <h1 className=" text-xl font-semibold">{
                                  new Date().toLocaleDateString()
                              
                               }</h1>
                               <h1>
                                  {
                                    new Date().toLocaleTimeString()
                                  }
                               </h1>
                            </div>
                          </div>
                          <div   className=' p-4 rounded-md text-white'>
                             <Visualize ordrers={orders} products={products} />
                          </div>
                      </div>
                     </div>   
                    )
                  )
                }
              </>
            )
        }
       </> 
  )
}

export default page