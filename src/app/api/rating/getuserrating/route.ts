import Rating from "@/modals/rating";
import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
const corsHeaders= {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req:NextRequest){
    try{
        await connectdb();
        const {productid,userid}=await req.json()
        if(!productid||!userid){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400})
        }
        const product=await Product.findById({_id:productid});
        if(!product){
            return NextResponse.json({
                Success:false,
                Message:"Product not found",

            },{status:404});
        }
        const rating=await Rating.findOne({product:productid,userid:userid});
        if(!rating){
            return NextResponse.json({
                Success:false,
                Message:"Rating not found",
                product:product,
            },{status:200});
        }
        return NextResponse.json({
            Success:true,
            Message:"Rating fetched successfully",
            rating:rating,
            product:product,
        },{status:200});
    }catch(err){
        console.log("Error while fetching rating","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching rating"
        },{status:500});
    }
}

