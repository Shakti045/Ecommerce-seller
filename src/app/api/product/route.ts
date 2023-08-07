import Product from "@/modals/product";
import { NextRequest,NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import Category from "@/modals/category";
import mongoose from "mongoose";
import User from "@/modals/user";
import { isSeller } from "@/utils/apimiddleware";
export async function GET(req:NextRequest){
    try{
        await connectdb();
        const categories=await Category.find({});
        const projectionFields = { productname:1 , productimages:1 , sellprice:1 , discount:1 , originalprice:1  , _id:1,seller:1,numberofratings:1,averageRating:1}
        const topdiscountproducts=await Product.find({},projectionFields).sort({discount:-1}).populate("seller",{businessname:1}).limit(5);
        const newproducts=await Product.find({},projectionFields).sort({launchdate:-1}).populate("seller",{businessname:1}).limit(5);
        const bestsellingproducts=await Product.find({},projectionFields).sort({numberofpurchases:-1}).populate("seller",{businessname:1}).limit(5);
        const products=await Product.find({},projectionFields).populate("seller",{businessname:1}).limit(5);
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
            Categories:categories,
            Topdiscountproducts:topdiscountproducts,
            Newproducts:newproducts,
            Bestsellingproducts:bestsellingproducts,
            Products:products
        },{status:200});
    }catch(err:any){
        console.log("Error while fetching products","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching products"
        },{status:500});
    }
}

export async function POST(req:NextRequest) {
     try{
        
         const user=await isSeller(req);
         // console.log(user);
         if(!user){
            return NextResponse.json({
                Success:false,
                Message:"Unauthorised access"
            },{status:401})
         }
         await connectdb();
         const {productname,productimages,originalprice,sellprice,discount,relatedcategory,description,highlights,attributes,numberofproducts}=await req.json();
         if(!productname || !productimages || ! originalprice || !sellprice || !discount || !relatedcategory || !description || !highlights  || !numberofproducts){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:404})
         }
         const categoryid=new mongoose.Types.ObjectId(relatedcategory);
         const isvalidcategory=await Category.findById(categoryid);
         if(!isvalidcategory){
            return NextResponse.json({
                Success:false,
                Message:"Invalid category kindly contact admins"
            },{status:404})
         }
         let deliverycharge=0;
         if(sellprice<1000){
            deliverycharge=80;
         }
         const newproduct=await new Product({
            productname,
            productimages:Array.from(productimages),
            relatedcategory:isvalidcategory._id,
            originalprice,
            sellprice,
            discount,
            description,
            highlights:Array.from(highlights),
            attributes,
            seller:user.id,
            numberofproducts,
            deliverycharge
         }).save();
         await Category.findByIdAndUpdate({_id:isvalidcategory._id},{$push:{realatedproducts:newproduct._id}});
        await User.findByIdAndUpdate({_id:user.id},{$push:{myproducts:newproduct._id}});
         return NextResponse.json({
                Success:true,
                Message:"Product created successfully"
         },{status:200})

     }catch(err){
            console.log("Error in creating product","=>",err);
            return NextResponse.json({
                Success:false,
                Message:"Internal server error"
            },{status:500})
     }
}




export async function PUT(req:NextRequest){
    try{
            await connectdb();
            const user=await isSeller(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"Unauthorized access"
                },{status:401})
            }
            const {productid,productname,productimages,originalprice,sellprice,discount,description,highlights,attributes,numberofproducts}=await req.json(); 
            
            const args:any={};
            if(productname){
                args["productname"]=productname;
            }
            if(productimages){
                args["productimages"]=Array.from(productimages);
            }
            if(originalprice){
                args["originalprice"]=originalprice;
            }
            if(sellprice){
                args["sellprice"]=sellprice;
            }
            if(discount){
                args["discount"]=discount;
            }
            if(description){
                args["description"]=description;
            }
            if(highlights){
                args["highlights"]=Array.from(highlights);
            }
            if(attributes){
                args["attributes"]=attributes;
            }
            if(numberofproducts){
                args["numberofproducts"]=numberofproducts;
            }
            await Product.findByIdAndUpdate({_id:productid},{...args});
            return NextResponse.json({
                Success:true,
                Message:"Product updated successfully"
            },{status:200})

    }catch(err){
        console.log("Error while updating product","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while updating product"
        },{status:500})
    }
}
