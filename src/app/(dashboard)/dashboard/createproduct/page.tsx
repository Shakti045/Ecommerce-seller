// 'use client'
// import axios from "axios";
// import { useContext, useEffect } from "react";
// import { useState } from "react";
// // ,productimages,highlights
// import { useForm } from "react-hook-form"
// import { toast } from "react-toastify";
// import Highlights from "@/app/components/dashboard/Highlights";
// import Images from "@/app/components/dashboard/Images";
// import { Appcontext } from "@/app/context/Appcontext";
// const page = () => {
//     const [category,setcategory]=useState<any>([]);
//     const [attributesreq,setattributesreq]=useState<any>([]);
//     const [attributes,setattributes]=useState<any>({});
//     const [highlights,sethighlights]=useState<string []>([]);
//     const [images,setimages]=useState<string []>([]);
//     const {token}=useContext(Appcontext);
//     const { 
//          register, 
//          handleSubmit,
//          reset, 
//          setValue,
//          getValues,
//          formState: { errors } 
//         } = useForm();

//         async function getcategory(){
//             try{
//                 const response=await axios.get('/api/category');
//                  if(response.data.Success){
//                         console.log(response.data.Categories);
//                         setcategory(response.data.Categories);
//                  }
//             }catch(err:any){
//                 console.log("error while fetching categories",err);
//             }
//         }
//         function categoryhandler(e:any){
//              const index:number=category.findIndex((item:any)=>item._id===e.target.value);
//              setattributesreq(category[index]?.attributesrequired);
//              setValue('relatedcategory',e.target.value);
           
//         }
//         function handleattributes(e:any,key:any){
            
//            const newattributes={...attributes,};
//            newattributes[key]=e.target.value;
//             setattributes(newattributes);
//         }
//         async function createproduct(data:any){
//             const loading=toast.loading("creating product......");
//             for(const e of attributesreq){
//                 if(!attributes[e.key]){
//                     return toast.error("please fill all the attributes");
//                 }
//             }
//             if(highlights.length===0){
//                 return toast.error("please add atleast one highlight");
//             }
//             if(images.length===0){
//                 return toast.error("please add atleast one image");
//             }
//             data.attributes=attributes;
//             data.highlights=highlights;
//             data.productimages=images;

//             try{
//                 const response=await axios.post('/api/product',data,{
//                     headers:{
//                         Authorization:`Beraer ${token}`
//                     }
//                 });
//                 if(response.data.Success){
//                     toast.success("product created successfully");
//                     reset({
//                         productname:"",
//                         productdescription:"",
//                         productprice:"",
//                         productdiscount:"",
//                         productstock:"",
//                         productcategory:"",
//                     });
//                     setattributes({});
//                     sethighlights([]);
//                     setimages([]);
//                 }
            
//         }catch(err:any){
//             console.log("error while creating product",err);
//             toast.error(err.response.data.Message);
//         }finally{
//             toast.dismiss(loading);
//         }
//     }
//         useEffect(()=>{
//             getcategory();
//         },[])
//   return (
//     <div className=" flex flex-col gap-4 p-2">
//         <h1 className=" mx-10 text-3xl font-bold">Create Product</h1>
//         <div className=' w-full flex flex-col   gap-3'>
//             <div className=" w-full flex  justify-center gap-5">
//             <div className=' w-[45%] flex flex-col gap-2'>
//                 <label htmlFor="productname">Product Name<sup className=" text-red-600">*</sup></label>
//                 <input placeholder="Enter productname" type="text"  id="productname" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
//                 {...register("productname",{required:{value:true,message:"Product name is required"}})}
//                 />
//                 {
//                     errors.productname && (
//                         <p className=" text-red-600">Product name is required</p>
//                     )
//                 }
//                 </div>
//                 <div className=' w-[45%] flex flex-col gap-2'>
//                 <label htmlFor="originalprice">Product originalprice<sup className=" text-red-600">*</sup></label>
//                 <input placeholder="Enter originalprice" type="number"  id="originalprice" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
//                 {...register("originalprice",{required:{value:true,message:"Product originalprice is required"}})}
//                 />
//                 {
//                     errors.originalprice && (
//                         <p className=" text-red-600">Product originalprice is required</p>
//                     )
//                 }
//                 </div>
//             </div>
//             <div className=" w-full flex  justify-center gap-5">
//             <div className=' w-[45%] flex flex-col gap-2'>
//                 <label htmlFor="sellprice">Product sellprice<sup className=" text-red-600">*</sup></label>
//                 <input placeholder="Enter sellingprice" type="number"  id="sellprice" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
//                 {...register("sellprice",{required:{value:true,message:"Product sellprice is required"}})}
//                 />
//                 {
//                     errors.sellprice && (
//                         <p className=" text-red-600">Product sellprice is required</p>
//                     )
//                 }
//                 </div>
//                 <div className=' w-[45%] flex flex-col gap-2'>
//                 <label htmlFor="discount">Product discount<sup className=" text-red-600">*</sup></label>
//                 <input placeholder="Enter discount" type="number"  id="discount" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
//                 {...register("discount",{required:{value:true,message:"Product discount is required"}})}
//                 />
//                 {
//                     errors.discount && (
//                         <p className=" text-red-600">Product discount is required</p>
//                     )
//                 }
//                 </div>
//                 </div>
//                 <div className=" mx-auto w-[92%]">
//                 <label htmlFor="description">Product description<sup className=" text-red-600">*</sup></label>
//                 <textarea rows={5} placeholder="Enter description"  id="description" className= "  w-full  outline-none border-2 border-slate-400 p-2 rounded-md" {
//                     ...register("description",{required:{value:true,message:"Product description is required"}})
//                 } />
//                 {
//                     errors.description && (
//                         <p className=" text-red-600">Product description is required</p>
//                     )
//                 }

//                 </div>
//                 <div className=" w-full flex  justify-center gap-5">
//                  <div className=' w-[45%] flex flex-col gap-2'>
//                   <label htmlFor="numberofproducts">Numberofproducts<sup className=" text-red-600">*</sup></label>
//                     <input placeholder="Enter numberofproducts" type="number"  id="numberofproducts" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
//                     {...register("numberofproducts",{required:{value:true,message:"Product numberofproducts is required"}})}
//                     />
//                     {
//                         errors.numberofproducts && (
//                             <p className=" text-red-600">Product numberofproducts is required</p>
//                         )
//                     }
//                     </div>
//                     <div className=' w-[45%] flex flex-col gap-2'>
//                     <label htmlFor="relatedcategory">Relatedcategory<sup className=" text-red-600">*</sup></label>
//                     <select  placeholder="Enter relatedcategory"  id="relatedcategory" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md" onChange={categoryhandler} >
//                         <option value="">Select category</option>
//                         {
//                             category.map((item:any,index:any)=>{
//                                 return(
//                                     <option key={index} value={item?._id}>{item?.name}</option>
//                                 )
//                             })
//                         }
//                     </select>
//                     {
//                         errors.relatedcategory && (
//                             <p className=" text-red-600">Product relatedcategory is required</p>
//                         )
//                     }
//                 </div>
//                 </div>  
//                 <div className=" w-[92%] mx-auto   grid grid-cols-2 justify-center items-center gap-5">
//                      {
//                         attributesreq.map((item:any,index:any)=>{
//                             return(
//                                 <div key={index} className="  flex flex-col gap-2">
//                                    <label htmlFor={item?.key}>{item?.key}<sup className=" text-red-600">*</sup></label>
//                                    <select onChange={(e)=>handleattributes(e,item?.key)} className= "  outline-none border-2 border-slate-400 p-2 rounded-md" id={item?.key} >
//                                         <option value="">SLECT {item?.key}</option>
//                                         {
//                                             item?.values.map((item:any,index:any)=>{
//                                                 return(
//                                                     <option key={index} value={item}>{item}</option>
//                                                 )
//                                             }
//                                             )
//                                         }
//                                    </select>
                     
//                                 </div>
//                             )
//                         }
//                         )
//                     }
//                 </div>      
//         </div>
//         <Highlights highlights={highlights} sethighlights={sethighlights}/>
//         <Images images={images} setimages={setimages}/>
//         <button onClick={handleSubmit(createproduct)} className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md" >Create Product</button>
//     </div>
//   )
// }

// export default page;

'use client'
import Productform from "@/app/components/dashboard/ProdutForm"
import { Appcontext } from "@/app/context/Appcontext"
import {useEffect,useContext} from "react"
const page = () => {
    const {seteditmode,setproduct}=useContext(Appcontext);
    useEffect(()=>{
        seteditmode(false)
        setproduct(null);
    },[]);
  return (
    <div className=" overflow-y-scroll h-full">
        <h1 className=" mt-4 mx-10 text-3xl font-bold">Create Product</h1>
        <Productform/>
    </div>
  )
}

export default page