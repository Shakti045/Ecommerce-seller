import Rating from "@/modals/rating";
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
        const {productid,rating,review,username,usermail,userphoto,userid}=await req.json();
        if(!productid||!rating||!review||!username||!usermail||!userphoto || !userid){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400})
        }
        const product=await Product.findById({_id:productid});
        console.log("printing product","=>",product)
        if(!product){
            return NextResponse.json({
                Success:false,
                Message:"Product not found"
            },{status:404});
        }
        
        const ratingexists=await Rating.findOne({product:productid,userid:userid});

        if(ratingexists){
            return NextResponse.json({
                Success:false,
                Message:"Rating already exists"
            },{status:400});
        }
        const newrating=await new Rating({
            product:productid,
            rating:rating,
            review:review,
            username:username,
            usermail:usermail,
            userid:userid,
            userphoto:userphoto
        }).save();
        await Product.findByIdAndUpdate({_id:productid},{$push:{ratings:newrating._id},$set:{
                 averageRating:((product.
                averageRating*product.numberofratings)+rating)/(product.numberofratings+1)},$inc:{
            numberofratings:1}});
        return NextResponse.json({
            Success:true,
            Message:"Rating created successfully",
        },{status:200});
    }catch(err:any){
        console.log("Error while creating rating","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while  creating rating"
        },{status:500});
    }
}





// export async function PUT(req:NextRequest){
//     try{
//       const {ratingid,rating,review}=await req.json();
//         if(!ratingid||!rating||!review){
//             return NextResponse.json({
//                 Success:false,
//                 Message:"All fields required"
//             },{status:400});
//         }
//         await connectdb();
//         const oldrating=await Rating.findById({_id:ratingid}).populate({path:"product" , model:Product , select:"avgrating numofratings"});
//         console.log("Printing oldrating in server put request",oldrating)
//         if(!oldrating){
//             return NextResponse.json({
//                 Success:false,
//                 Message:"Rating not found"
//             },{status:404});
//         }
//         await Rating.findByIdAndUpdate({_id:ratingid},{rating:rating,review:review});
//         await Product.findByIdAndUpdate({_id:oldrating.productid},{$set:{avgrating:(oldrating.product.avgrating-oldrating.rating+rating)/oldrating.product.numofratings},$inc:{numofratings:1}});
//         return NextResponse.json({
//             Success:true,
//             Message:"Rating updated successfully"
//         },{status:200});

//     }catch(err){
//         console.log("Error while updating rating","=>",err);
//         return NextResponse.json({
//             Success:false,
//             Message:"Error while updating rating"
//         },{status:500});
//     }
// }

