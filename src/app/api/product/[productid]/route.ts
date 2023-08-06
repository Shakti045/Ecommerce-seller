import Product from "@/modals/product";
import { NextRequest,NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import Category from "@/modals/category";
import User from "@/modals/user";
import { isSeller } from "@/utils/apimiddleware";
import mongoose from "mongoose";
import Rating from "@/modals/rating";
export async function DELETE(req:NextRequest){
    try{
         await connectdb();
         const user=await isSeller(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"Unauthorized access"
                },{status:401})
            }
            // const {productid}=await req.json();
            
            const productid=req.nextUrl.pathname.split("/")[3];

            if(!productid){
                return NextResponse.json({
                    Success:false,
                    Message:"Product id required"
                },{status:404})
            }
            const deletedproduct=await Product.findByIdAndDelete(productid);
            if(!deletedproduct){
                return NextResponse.json({
                    Success:false,
                    Message:"Invalid product id"
                },{status:404})
            }
            await Category.findByIdAndUpdate({_id:deletedproduct.relatedcategory},{$pull:{realatedproducts:deletedproduct._id}});
            await User.findByIdAndUpdate({_id:user.id},{$pull:{myproducts:deletedproduct._id}});
            return NextResponse.json({
                Success:true,
                Message:"Product deleted successfully"
            },{status:200})
    }catch(err){
        console.log("Error while deleting product","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while deleting product"
        },{status:500})
    }
}

export async function GET(req:NextRequest){
    try{
        console.log(req.nextUrl.pathname)
       let productid:any=req.nextUrl.pathname.split("/")[3];
       if(!productid){
              return NextResponse.json({
                Success:false,
                Message:"Product id required"
              },{status:404})
       }
         productid=new mongoose.Types.ObjectId(productid);
         await connectdb();
         const product=await Product.findById(productid).populate('seller',{_id:1,businessname:1}).populate({path:"ratings",model:Rating}).exec();
         return NextResponse.json({
            Success:true,
            Message:"Product fetched successfully",
            Product:product
         },{status:200})
    }catch(err){
      console.log("Error while fetching product","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching product",
        },{status:500})
    }
}
