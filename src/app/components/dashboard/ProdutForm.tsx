'use client'
import axios from "axios";
import { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Highlights from "@/app/components/dashboard/Highlights";
import Images from "@/app/components/dashboard/Images";
import { Appcontext } from "@/app/context/Appcontext";
import { useCallback } from "react";
import { useRouter } from "next/navigation";


const Productform:any = () => {
     console.log("printing token",token);
    const router=useRouter();
    const [category,setcategory]=useState<any>([]);
    const [attributesreq,setattributesreq]=useState<any>([]);
    const [attributes,setattributes]=useState<any>({});
    const [highlights,sethighlights]=useState<string []>([]);
    const [images,setimages]=useState<string []>([]);
    const [relatedcategory,setrelatedcategory]=useState<string>("");
    const { 
         register, 
         handleSubmit,
         reset, 
         setValue,
         getValues,
         formState: { errors } 
        } = useForm();

        async function getcategory(){
            try{
                const response=await axios.get('/api/category');
                 if(response.data.Success){
                    setcategory(response.data.Categories);    
                 }
                 if(editmode){
                    setrelatedcategory(product.relatedcategory);
                    setattributesreq(()=>{
                        console.log("setattributesreq called")
                        const index:number=response.data.Categories.findIndex((item:any)=>item._id===product.relatedcategory);
                        return response.data.Categories[index]?.attributesrequired
                    });
                    setattributes(product.attributes);
             
                }
            }catch(err:any){
                console.log("error while fetching categories",err);
            }
        }


        function categoryhandler(e:any){
             const index:number=category.findIndex((item:any)=>item._id===e.target.value);
             setattributesreq(category[index]?.attributesrequired);
             setValue('relatedcategory',e.target.value);
             setattributes({});
           
        }

        function handleattributes(e:any,key:any){
            // console.log('handleattributes called');
           const newattributes={...attributes,};
           newattributes[key]=e.target.value;
            setattributes(newattributes);
        }

        async function createproduct(data:any){
    
            const loading=toast.loading("creating product......");
            // for(const e of attributesreq){
            //     if(!attributes[e.key]){
            //         toast.dismiss(loading);
            //         return toast.error("please fill all the attributes");
            //     }
            // }
            if(highlights.length===0){
                toast.dismiss(loading);
                return toast.error("please add atleast one highlight");
            }
            if(images.length===0){
                toast.dismiss(loading);
                return toast.error("please add atleast one image");
            }
            data.attributes=attributes;
            data.highlights=highlights;
            data.productimages=images;

            try{
                const response=await axios.post('/api/product',data,{
                    headers:{
                        Authorization:`Beraer ${token}`
                    }
                });
                if(response.data.Success){
                    toast.success("product created successfully");
                    reset({
                        productname:"",
                        description:"",
                        originalprice:"",
                        sellprice:"",
                        discount:"",
                        numberofproducts:"",
                        relatedcategory:"",
                    });
                    setattributes({});
                    sethighlights([]);
                    setattributesreq([]);
                    setimages([]);
                    setrelatedcategory("");
                }
            
        }catch(err:any){
            console.log("error while creating product",err);
            toast.error(err.response.data.Message);
        }finally{
            toast.dismiss(loading);
        }
        }
        
        async function initialload(){
        await getcategory();
        if(editmode){
            setValue('productname',product.productname);
            setValue('description',product.description);
            setValue('originalprice',product.originalprice);
            setValue('sellprice',product.sellprice);
            setValue('discount',product.discount);
            setValue('numberofproducts',product.numberofproducts);
            sethighlights(product.highlights);
            setimages(product.productimages);
            setValue('relatedcategory',product.relatedcategory);
            
        }
      
        }
       
        const handleimages=useCallback((images:any)=>{
            setimages(images);
        },[images]);
          
        const handlehighlights=useCallback((highlights:any)=>{
               sethighlights(highlights);
        },[highlights])
        
        function checkeditable(data:any){
          const {productname,description,originalprice,sellprice,discount,numberofproducts,}=data;
          const {productname:oldproductname,description:oldescription,originalprice:oldoriginalprice,sellprice:oldsellprice,discount:olddidscount,numberofproducts:oldnumberofproducts}=product;
          if(productname===oldproductname && description===oldescription && originalprice===oldoriginalprice && sellprice===oldsellprice && discount===olddidscount && numberofproducts===oldnumberofproducts){
                return false;
            }else{
                return true;
            }
        }
        function checkeditable2(data:any){
            const {highlights:oldhighlights,productimages:oldproductimages,attributes:oldattributes}=product;
            if(JSON.stringify(highlights)===JSON.stringify(oldhighlights) && JSON.stringify(images)===JSON.stringify(oldproductimages) && JSON.stringify(attributes)===JSON.stringify(oldattributes)){
                return false;
            }else{
                for(const e of attributesreq){
                    if(!attributes[e.key]){
                        toast.error("please fill all the attributes");
                        return false;
                    }
                }
                if(highlights.length===0){
                    toast.error("please add atleast one highlight");
                    return false;
                }
                if(images.length===0){
                   toast.error("please add atleast one image");
                    return false;
                }
                data.attributes=attributes;
                data.highlights=highlights;
                data.productimages=images;
                return true;
            }
        }
        function getwhattoupdate(data:any){3
            const {productname,description,originalprice,sellprice,discount,numberofproducts,}=data;
            const {productname:oldproductname,description:oldescription,originalprice:oldoriginalprice,sellprice:oldsellprice,discount:olddidscount,numberofproducts:oldnumberofproducts}=product;
            const whattoupdate:any={};
            if(productname!==oldproductname){
                whattoupdate.productname=productname;
            }
            if(description!==oldescription){
                whattoupdate.description=description;
            }
            if(originalprice!==oldoriginalprice){
                whattoupdate.originalprice=originalprice;
            }
            if(sellprice!==oldsellprice){
                whattoupdate.sellprice=sellprice;
            }
            if(discount!==olddidscount){
                whattoupdate.discount=discount;
            }
            if(numberofproducts!==oldnumberofproducts){
                whattoupdate.numberofproducts=numberofproducts;
            }
            if(JSON.stringify(highlights)!==JSON.stringify(product.highlights)){
                whattoupdate.highlights=highlights;
            }
            if(JSON.stringify(images)!==JSON.stringify(product.productimages)){
                whattoupdate.productimages=images;
            }
            if(JSON.stringify(attributes)!==JSON.stringify(product.attributes)){
                whattoupdate.attributes=attributes;
            }
            if(relatedcategory!==product.relatedcategory){
                whattoupdate.relatedcategory=relatedcategory;
            }
            return whattoupdate;

        }
        async function editproduct(data:any){
             if(!checkeditable(data) && !checkeditable2(data)){
                return toast.error("please edit something");
             }
             const whattoupdate=getwhattoupdate(data);
             whattoupdate.productid=product._id;
             const loading=toast.loading("updating product.....");
             try{
                const result=await axios.put(`/api/product`,whattoupdate,{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(result.data.Success){
                    toast.success("product updated successfully");
                    router.push('/dashboard/products');
                }
             }catch(err:any){
                    console.log("error while updating product",err);
                    toast.error(err.response.data.Message);
             }finally{  
                toast.dismiss(loading);
             }
        }
        function canceledit(){
          seteditmode(false);
         router.push('/dashboard/products');
        }
       
        useEffect( ()=>{
          initialload();
        },[])
  return (
    <div className=" flex flex-col gap-4 p-2">
        <div className=' w-full flex flex-col   gap-3'>
            <div className=" w-full flex  justify-center gap-5">
            <div className=' w-[45%] flex flex-col gap-2'>
                <label htmlFor="productname">Product Name<sup className=" text-red-600">*</sup></label>
                <input placeholder="Enter productname" type="text"  id="productname" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                {...register("productname",{required:{value:true,message:"Product name is required"}})}
                />
                {
                    errors.productname && (
                        <p className=" text-red-600">Product name is required</p>
                    )
                }
                </div>
                <div className=' w-[45%] flex flex-col gap-2'>
                <label htmlFor="originalprice">Product originalprice<sup className=" text-red-600">*</sup></label>
                <input placeholder="Enter originalprice" type="number"  id="originalprice" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                {...register("originalprice",{required:{value:true,message:"Product originalprice is required"}})}
                />
                {
                    errors.originalprice && (
                        <p className=" text-red-600">Product originalprice is required</p>
                    )
                }
                </div>
            </div>
            <div className=" w-full flex  justify-center gap-5">
            <div className=' w-[45%] flex flex-col gap-2'>
                <label htmlFor="sellprice">Product sellprice<sup className=" text-red-600">*</sup></label>
                <input placeholder="Enter sellingprice" type="number"  id="sellprice" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                {...register("sellprice",{required:{value:true,message:"Product sellprice is required"}})}
                />
                {
                    errors.sellprice && (
                        <p className=" text-red-600">Product sellprice is required</p>
                    )
                }
                </div>
                <div className=' w-[45%] flex flex-col gap-2'>
                <label htmlFor="discount">Product discount<sup className=" text-red-600">*</sup></label>
                <input placeholder="Enter discount" type="number"  id="discount" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                {...register("discount",{required:{value:true,message:"Product discount is required"}})}
                />
                {
                    errors.discount && (
                        <p className=" text-red-600">Product discount is required</p>
                    )
                }
                </div>
                </div>
                <div className=" mx-auto w-[92%]">
                <label htmlFor="description">Product description<sup className=" text-red-600">*</sup></label>
                <textarea rows={5} placeholder="Enter description"  id="description" className= "  w-full  outline-none border-2 border-slate-400 p-2 rounded-md" {
                    ...register("description",{required:{value:true,message:"Product description is required"}})
                } />
                {
                    errors.description && (
                        <p className=" text-red-600">Product description is required</p>
                    )
                }

                </div>
                <div className=" w-full flex  justify-center gap-5">
                 <div className=' w-[45%] flex flex-col gap-2'>
                  <label htmlFor="numberofproducts">Numberofproducts<sup className=" text-red-600">*</sup></label>
                    <input placeholder="Enter numberofproducts" type="number"  id="numberofproducts" className=" w-full outline-none border-2 border-slate-400 p-2 rounded-md"
                    {...register("numberofproducts",{required:{value:true,message:"Product numberofproducts is required"}})}
                    />
                    {
                        errors.numberofproducts && (
                            <p className=" text-red-600">Product numberofproducts is required</p>
                        )
                    }
                    </div>
                    <div className=' w-[45%] flex flex-col gap-2'>
                    <label htmlFor="relatedcategory">Relatedcategory<sup className=" text-red-600">*</sup></label>
                    <select   placeholder="Enter relatedcategory"  id="relatedcategory" className= " w-full outline-none border-2 border-slate-400 p-2 rounded-md" onChange={categoryhandler} >
                        <option value="">Select category</option>
                        {
                            category.map((item:any,index:any)=>{
                                return(
                                    <option selected={relatedcategory===item?._id}   key={index} value={item?._id}>{item?.name}</option>
                                )
                            })
                        }
                    </select>
                    {
                        errors.relatedcategory && (
                            <p className=" text-red-600">Product relatedcategory is required</p>
                        )
                    }
                </div>
                </div>  
                <div className=" w-[92%] mx-auto">
                    <p className="  text-red-700">Select the attributes if applicable</p>
                </div>
                <div className=" w-[92%] mx-auto   grid grid-cols-2 justify-center items-center gap-5">
                     {
                        attributesreq.map((item:any,index:any)=>{
                            return(
                                <div key={index} className="  flex flex-col gap-2">
                                   <label htmlFor={item?.key}>{item?.key}</label>
                                   <select onChange={(e)=>handleattributes(e,item?.key)} className= "  outline-none border-2 border-slate-400 p-2 rounded-md" id={item?.key} >
                                        <option value="">SLECT {item?.key}</option>
                                        {
                                            item?.values.map((value:any,index:any)=>{
                                                return(
                                                    <option selected={attributes[item?.key]===value} key={index} value={value}>{value}</option>
                                                )
                                            }
                                            )
                                        }
                                   </select>
                     
                                </div>
                            )
                        }
                        )
                    }
                </div>      
        </div>
        <Highlights highlights={highlights} sethighlights={handlehighlights}/>
        <Images images={images} setimages={handleimages}/>
        {
           editmode?(<div className=" flex  ">
            <button onClick={handleSubmit(editproduct)}  className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md" >Save Changes</button>
            <button onClick={canceledit}  className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md" >Cancel</button>   
           </div>):(<button onClick={handleSubmit(createproduct)} className=" w-[40%] mx-auto bg-slate-800 text-white p-2 rounded-md" >Create Product</button>)
        }
    </div>
  )
}

export default Productform;
