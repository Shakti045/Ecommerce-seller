import Order from "@/modals/order";
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import User from "@/modals/user";
import { isSeller } from "@/utils/apimiddleware";
import Product from "@/modals/product";
import axios from "axios";
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Headers": "Content-Type,Authorization",
};
export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

interface ICreateOrder {
    deliveryadress: any;
    productid: any;
    customeremail: string;
    customername: string;
    quantity: number;
    sellerid: string;
    clientorderid: string,
    sellprice:number
}


async function createorder({ deliveryadress, productid,customeremail,customername, quantity,sellerid,clientorderid ,sellprice}: ICreateOrder ) {
        await connectdb();
        const neworder=await Order.create({ deliveryadress, productid,customeremail,customername, quantity,sellerid ,clientorderid,sellprice});
        await User.findByIdAndUpdate({_id:sellerid},{$push:{orders:neworder._id}});
        await Product.findByIdAndUpdate({_id:productid},{$inc:{numberofproducts:-quantity,numberofpurchases:quantity}});

};  

export async function GET(req: NextRequest) {
    try{
        await connectdb();
        const user=await isSeller(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"You are not authorized"
            },{status:401});
        }
        const orders=await Order.find({sellerid:user.id}).populate("productid",{
            productname:1,productimages:1,_id:1,orderdate:1}).sort({orderdate:-1});

        return NextResponse.json({
            Success:true,
            Message:"Orders fetched successfully",
            Orders:orders
        },{status:200});
    }catch(err){
        console.log("Error while fetching orders","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while fetching orders"
        },{status:500});
    }
}

export async function PUT(req: NextRequest) {
    try{
        await connectdb();
        const user=await isSeller(req);
        if(!user){
            return NextResponse.json({
                Success:false,
                Message:"You are not authorized"
            },{status:401});
        }
        const {orderid,status,clientorderid,productid}=await req.json();
        
        if(!orderid || !status){
            return NextResponse.json({
                Success:false,
                Message:"All fields required"
            },{status:400});
        }

     
        try{
            const responce=await axios.post(`${process.env.BUYER_URL}/api/orders`,{
            orderid:clientorderid,
            productid:productid,
            status:status
        })
        // console.log("printing responce","=>",responce.data);
        if(!responce.data.Success){
            return NextResponse.json({
                Success:false,
                Message:"Error while updating order status"
            },{status:500});
        }
        }catch(err){
            console.log("Error while updating order status","=>",err);
            return NextResponse.json({
                Success:false,
                Message:"Error while getting orders from buyer"
            },{status:500});
        }
        await Order.findByIdAndUpdate({_id:orderid},{status:status});
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




export async function POST(req: NextRequest) {
    try{
       const {data}=await req.json();
       for (const order of data) {
        console.log("printing order","=>",order);
           await createorder({...order});
       }
         return NextResponse.json({
            Success:true,
            Message:"Orders created successfully"
        },{status:200});
    }catch(err){
        console.log("Error while creating orders","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while craeating orders"
        },{status:500});
    }
}
