import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
    try{
      const {productsid}=await req.json();
      console.log("printing productsids","=>",productsid)
        if(!productsid || productsid?.length===0){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400})
        }
        const products=await Product.find({_id:{$in:productsid}},{_id:1,productname:1,sellprice:1,originalprice:1,numberofproducts:1})
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
            Products:products
       },{status:200});
    }catch(err){
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}