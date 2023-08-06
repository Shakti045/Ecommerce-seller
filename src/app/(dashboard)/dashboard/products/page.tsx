'use client'
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {AiFillEdit,AiFillDelete} from 'react-icons/ai'
import { Appcontext } from "@/app/context/Appcontext";
const page = () => {
  const [products,setproducts]=useState<any>([]);
  const {token,seteditmode,setproduct}=useContext(Appcontext);
  async function getproducts(){
    const loading=toast.loading('Please wait...');
    try{
      const response=await axios.get('/api/product/getsellerproducts',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      if(response.data.Success){
        setproducts(response.data.Products);
      }
    }catch(err:any){
      console.log(err);
      toast.error(err.response.data.Message);
    }finally{
      toast.dismiss(loading);
    }
  } 

  async function deleteproduct(index:any){
    const loading=toast.loading('Please wait...');
        try{
          const response=await axios.delete(`/api/product/${products[index]._id}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          });
          if(response.data.Success){
            toast.success(response.data.Message);
            const newproducts=[...products];
            newproducts.splice(index,1);
            setproducts(newproducts);
          }
        }catch(err:any){
          console.log(err);
          toast.error(err.response.data.Message);
        }finally{
          toast.dismiss(loading);
        }
  }

  function edithandler(product:any,index:number){
    seteditmode(true);
    setproduct(product);
    router.push("/dashboard/editproduct");
  }
  const router=useRouter();
  useEffect(()=>{
    getproducts();
  },[])
  return (
    <div  className=" h-full  flex flex-col gap-4 p-2">
       <div className=" mx-auto w-[92%] flex justify-between items-center">
       <h1 className="  text-3xl font-bold">My Products</h1>
       <button onClick={()=>router.push("/dashboard/createproduct")} className=" bg-yellow-400  px-4 py-2 rounded-md" >Create Product + </button>
       </div>
      <div className="  h-full w-[92%] mx-auto ">
        {
          products.length===0 ? (<div className=" h-full flex flex-col items-center justify-center ">
            <h1 className=" text-2xl font-bold">You Have Not Created Any Products Yet</h1>
            <button className=" bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>router.push("/dashboard/createproduct")}>Create Product + </button>
          </div>):(<div className=" product h-full overflow-y-scroll w-full flex flex-col">
             <div className=" flex justify-between border-b-[1px] p-4 bg-slate-700 rounded-t-md text-white ">
              <div className=" w-[300px]">
                <h1>Product Image</h1>
              </div>
         
               <h1>Product Price</h1>
               <h1>Selling Price</h1>
              <h1>Product Quantity</h1>
              <h1>Actions</h1>
             </div>
             <div className=" h-full w-full overflow-y-scroll product flex flex-col  gap-3">
             {
                products.map((product:any,index:any)=>(
                  <div key={product._id} className=" w-full bg-white rounded-md p-3 border-b-2   pb-3 font-semibold flex justify-between items-center" >
                
                
                  <div className=" w-[300px]">
                  <div className=" w-[200px] h-[200px] relative ">
                     <img   className=" absolute top-0 bottom-0 right-0 left-0 max-w-full max-h-full mx-auto my-auto overflow-clip"  src={product?.productimages[0]} alt="productimage"/>
                     </div>
                  </div>
                 
                      
                       
                     
                     <h1>{product.originalprice}</h1>
                      <h1>{product.sellprice}</h1>
                      <h1>{product.numberofproducts}</h1>
                      <div className=" flex gap-2">
                        <button onClick={()=>edithandler(product,index)} className=" p-2 rounded-md bg-yellow-500"><AiFillEdit/></button>
                        <button onClick={()=>deleteproduct(index)} className=" p-2 rounded-md bg-red-600"><AiFillDelete/></button>
                  </div>
                  </div>
                ))
              }
              </div>
          </div>)
          }
      </div>
    </div>
  )
}

export default page