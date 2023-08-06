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
   
    try {
        await connectdb();
        const { categoryid } = await req.json();
        if (!categoryid) {
            return NextResponse.json({
                Success: false,
                Message: "All fields required"
            }, { status: 400 })
        }
        const filters=await Category.findById(categoryid).select("attributesrequired");
        const bestsellingproducts = await Product.find({ relatedcategory: categoryid },{_id:1}).sort({ numberoforders: -1 }).limit(3);
        const products = await Product.find({ relatedcategory: categoryid });
        return NextResponse.json({
            Success: true,
            Message: "Products fetched successfully",
            Products: products,
            Filters:filters,
            BestSellingProducts:bestsellingproducts
        }, { status: 200 });
    } catch (err: any) {
        console.log("Error while fetching products", "=>", err);
        return NextResponse.json({
            Success: false,
            Message: "Error while fetching products"
        }, { status: 500 });
    }
}

// export { getcategorydata as GET, getcategorydata as POST}