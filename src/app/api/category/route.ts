import Category from "@/modals/category";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import { isAdmin } from "@/utils/apimiddleware";
export async function GET(req:NextRequest){
    console.log("Get request");
    try{
        await connectdb();
        const categories=await Category.find({});
        return NextResponse.json({
            Success:true,
            Message:"Categories fetched successfully",
            Categories:categories
        },{status:200});
    }catch(err:any){
        console.log("Error while fetching categories","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching categories"
        },{status:500});
    }
};

    export async function POST(req:NextRequest){
        try{
            await connectdb();
            const user=await isAdmin(req);
            if(!user){
                return NextResponse.json({
                    Success:false,
                    Message:"Unauthorized access"
                },{status:401})
            }
            const {name,picture,attributesrequired}=await req.json();
            if(!name || !picture || !attributesrequired){
                return NextResponse.json({
                    Success:false,
                    Message:"All fields required"
                },{status:400})
            }
            await Category.create({name:name,picture:picture,attributesrequired:Array.from(attributesrequired)});
            return NextResponse.json({
                Success:true,
                Message:"Category created successfully"
            },{status:200})
        }catch(err){   
            console.log("Error in creating category","=>",err);
            return NextResponse.json({
                Success:false,
                Message:"Internal server error",
            },{status:500});
        }
    };



  