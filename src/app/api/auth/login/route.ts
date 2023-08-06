import User from "@/modals/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
export async function POST(req:NextRequest){
    try{
        await connectdb();
      const {email,password}=await req.json();
      console.log(email,password);
      
      if(!email || !password){
        return NextResponse.json({ 
            Success:false,
            Message:"Please provide email and password"
        },{status:400});
      }
      const userfound=await User.findOne({email:email});
        if(!userfound){
            return NextResponse.json({
                Success:false,
                Message:"No user exists kindly signup"
            },{status:400});
        }
        const ispasswordcorrect=await bcrypt.compare(password,userfound.password);
        if(!ispasswordcorrect){
            return NextResponse.json({
                Success:false,
                Message:"Password is incorrect"
            },{status:400});
        }
        const payload={
            id:userfound._id,
            email:userfound.email,
            usertype:userfound.usertype
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"});
        const responce=NextResponse.json({
            Success:true,
            Message:"Login successfull",
            Token:token,
            User:userfound
        },{status:200});
        responce.cookies.set("ecomseller",token,{
            httpOnly:true,
        })
        return responce;
    }catch(err:any){
        console.log("Error while login","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while login"
        },{status:500});
    }
}