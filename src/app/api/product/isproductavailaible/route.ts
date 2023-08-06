import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
export async function POST(req: NextRequest) {
    try {
        await connectdb();
        const { productid,quantity } = await req.json();
        if (!productid) {
            return NextResponse.json({
                Success: false,
                Message: "All fields required"
            }, { status: 400 })
        }
        const product=await Product.findById({_id:productid});
        if(!product){
            return NextResponse.json({
                Success:false,
                Message:"Product not found"
            },{status:404});
        }
        if(product.numberofproducts<quantity){
            return NextResponse.json({
                Success:false,
                Message:"Insufficient stock",
                Availiable:false
            },{status:400});
        }
        return NextResponse.json({
            Success:true,
            Message:"Product availiable",
            Availiable:true
        },{status:200});
    } catch (err: any) {
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching product"
        }, { status: 500 });
    }
}