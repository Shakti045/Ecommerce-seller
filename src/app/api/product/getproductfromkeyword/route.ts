import Product from "@/modals/product";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import Category from "@/modals/category";
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
      const {keyword}=await req.json();
      if(!keyword){
        return NextResponse.json({
            Success:false,
            Message:"All fields required"
        },{status:400})
    }
        await connectdb();
        const matchedcategoryname=await Category.findOne({name: { $regex: keyword, $options: "i" } });
        let resutls =[]
        if(!matchedcategoryname){
             resutls = await Product
            .find({
              $or: [
                { productname: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                {highlights: { $regex: keyword, $options: "i" }},
              ],
            })
        }
        else{
             resutls = await Product
            .find({
              $or: [
                { productname: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
                {highlights: { $regex: keyword, $options: "i" }},
                {relatedcategory: matchedcategoryname._id}
              ],
            })
          
        }
        
       
        return NextResponse.json({
            Success:true,
            Message:"Products fetched successfully",
            Products:resutls
           },{status:200});
    }catch(err){
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}