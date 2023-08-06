import User from "@/modals/user";
import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";
import { connectdb } from "@/config/dbconnect";
import  Jwt  from "jsonwebtoken";
export async function POST(req:NextRequest){
    try{
        await connectdb();
       const {firstname,lastname,email,password,businessname}=await req.json();
         if(!firstname || !lastname || !email || !password ){
            return NextResponse.json({ 
                Success:false,
                Message:"Please provide all the fields"
            },{status:400});
         }
         const userexists=await User.findOne({email:email});
            if(userexists){
                return NextResponse.json({
                    Success:false,
                    Message:"User already exists"
                },{status:400});
            }
            const hashedpassword=await bcrypt.hash(password,10);
            const newuser=new User({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hashedpassword,
                profilephoto:`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=random&length=2&size=128`,
                businessname:businessname?businessname:`@${firstname}${lastname}`,
            })
            const user=await newuser.save();
            const payload={
                id:user._id,
                email:user.email,
                usertype:user.usertype
            };
            const token=Jwt.sign(payload,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"});
            const responce= NextResponse.json({
                Success:true,
                Message:"User created successfully",
                Token:token,
                User:user
            },{status:200});
            responce.cookies.set("ecomseller",token,{
                httpOnly:true,
            })
            return responce;
    }catch(err:any){
        console.log("Error while creating user","=>",err);
        return NextResponse.json({
            Success:false,
            Message:"Error while creating user"
        },{status:500});
    }
}