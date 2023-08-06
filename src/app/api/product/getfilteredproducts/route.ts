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
       await connectdb();
       const {categoryid,filters}=await req.json();
         if(!categoryid || !filters){
                return NextResponse.json({
                    Success:false,
                    Message:"All fields required"
                },{status:400})
            }
           console.log("filters",filters);
           console.log("categoryid",categoryid);
        //    {
        //     $match: {
        //       "entity.key1": { $in: givenQuery.key1 },
        //       "entity.key2": { $in: givenQuery.key2 },
        //     },
        //   },
        const querry:any={};
        for(const filter in filters){
            if(filters[filter].length>0){
                querry[`attributes.${filter}`]={$in:filters[filter]}
            }
        }
        querry["relatedcategory"]=categoryid;
        const products=await Product.find(querry);
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