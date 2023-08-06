import Order from "@/modals/order";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import Product from "@/modals/product";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}


export async function POST(req: NextRequest) {
    try{
        await connectdb();
        const {orderid,productid}=await req.json();
        // console.log(orderid,productid);
        if(!orderid || !productid){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400});
        }
        await Order.findOneAndUpdate({clientorderid:orderid,productid:productid},{status:"cancelled"});
        return NextResponse.json({
            Success:true,
            Message:"Order status updated successfully"
        },{status:200});
        
    }catch(err){
        console.log("Error while fetching orders","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching orders"
        },{status:500});
    }
}