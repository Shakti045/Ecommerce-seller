import Product from "@/modals/product";
import Order from "@/modals/order";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { isSeller } from "@/utils/apimiddleware";

export async function GET(req:NextRequest){

    try{
        const user=await isSeller(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"You are not authorized"
            },{status:401});
        }
        
        await connectdb();
        const products=await Product.find({seller:user.id})
        const orders=await Order.find({sellerid:user.id,})
        return NextResponse.json({
            Success:true,
            Message:"Dashboard data fetched successfully",
            Products:products,
            Orders:orders
        },{status:200});
    }catch(err){
        console.log("Error while fetching dashboard data","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching dashboard data"
        },{status:500});
    }
}
