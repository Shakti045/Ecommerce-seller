import { NextRequest,NextResponse } from "next/server";
import jwt from  "jsonwebtoken";
export const getuserfromtoken=async(req:NextRequest)=>{
     try{
        let token=req.headers.get("Authorization")?.replace("Bearer ","");
        if(token){
            const decodedtoken:any=jwt.verify(token,process.env.JWT_SECRET_KEY!);
            return decodedtoken;
        }

     }catch(err){
        console.log("Error while fetching data from token","=>",err);
      
     }
}



export const isSeller=async(req:NextRequest)=>{
    try{
        const decodedtoken=await getuserfromtoken(req);
        if(decodedtoken && decodedtoken.usertype=="seller"){
            return decodedtoken;
        }
    }catch(err){
        console.log("Error while checking user type","=>",err);
    }
}


export const isAdmin=async(req:NextRequest)=>{
    try{
        const decodedtoken=await getuserfromtoken(req);
        if(decodedtoken && decodedtoken.usertype=="admin"){
            return decodedtoken;
        }
    }catch(err){
        console.log("Error while checking user type","=>",err);
    }
}