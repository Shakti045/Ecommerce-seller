import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
export async function POST(req: NextRequest) {
    
    try{
        await connectdb();
        const {productid,quantity}=await req.json();
        if(!productid){
            return NextResponse.json({
                Success:false,
                Message:"Productid is required"
            },{status:400})
        }
         await Product.findByIdAndUpdate({_id:productid},{$inc:{numberofpurchases:quantity},$dec:{numberofproducts:quantity}});
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
        },{status:200});
    }catch(err:any){
        console.log("Error while fetching products","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching products"
        },{status:500});
    }
}