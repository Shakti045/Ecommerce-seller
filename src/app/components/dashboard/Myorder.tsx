'use client'
import toast from "react-hot-toast"
import React from 'react'
import axios from "axios"
import { Appcontext } from "@/app/context/Appcontext"
import date from "date-and-time"
interface Props {
    data:any,
    getOrders:()=>void
}


const Myorder = ({data,getOrders}:Props) => {
    const {_id,deliveryadress,customername,customeremail,status,productid,
        clientorderid,quantity,orderdate}=data;
    const {token}=React.useContext(Appcontext);
        async function updateOrder(status:string){
         
            const loading=toast.loading('Please wait...');
            try{
              const result=await axios.put(`/api/order`,{orderid:_id,status,clientorderid,productid:productid._id},{
                headers:{
                    Authorization:`Bearer ${token}`
                }
              });
                if(result.data.Success){
                    toast.success(result.data.Message);
                    await getOrders();
                    
                }
            }catch(error:any){
                console.log(error)
                toast.error(error.response.data.Message);
            }finally{
                toast.dismiss(loading);
            }
        }



  return (
    <div className=' w-full p-3 rounded-md bg-white flex  justify-between gap-5 items-center'>
        <div className=' w-[150px] h-[150px]  relative'>
            <img src={productid?.productimages[0]} alt="productimage" className=' absolute top-0 bottom-0 left-0 right-0 max-w-full max-h-full mx-auto my-auto overflow-clip '/>
        </div>
       <div className=' w-[300px] flex flex-col'>
              <h1 className='  font-bold'>{productid?.productname.substring(0,100)}</h1>
                <h1 className='  font-bold'>Quantity: {quantity}</h1>
                <h1 className='  font-bold'>{customername}</h1>
              <h1 className='  font-bold'>{customeremail}</h1>
              <h1>{date.format(new Date(orderdate), 'YYYY/MM/DD HH:MM')}</h1>
       </div>
       <div className=' w-[200px] flex flex-col gap-2'>
              <h1>{deliveryadress.fullname}  {deliveryadress.mobilenumber}</h1>
              <h1 className='  font-bold'>{deliveryadress.locality} </h1>
              <h1 className=' font-bold'>{deliveryadress.district} {deliveryadress.state} {deliveryadress.pincode}  </h1>     
       </div>
       <div className=' w-[200px] flex flex-col gap-2 items-center'>
              <h1 className=' text-xl font-bold'>{status.toUpperCase()}</h1>
              <div>
              {
                    status==="pending" && (  <button onClick={()=>updateOrder("shipped")} className='  bg-green-600 text-white px-4 py-2 rounded-md'>Make Dispatch</button>)
              }
              {
                    status==="shipped" && (   <button  onClick={()=>updateOrder("delivered")} className='   bg-red-700 text-white px-4 py-2 rounded-md'>Awaiting For Delivery</button>)
              }
              {
                    status==="delivered" && (  <button className='   bg-blue-700 text-white px-4 py-2 rounded-md'>Delivered</button>)
              }
                {
                    status==="cancelled" && (  <button className='   bg-red-700 text-white px-4 py-2 rounded-md'>Cancelled</button>)
                }
              </div>
       </div>
    </div>
  )
}

export default Myorder