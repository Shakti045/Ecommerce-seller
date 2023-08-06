import mongoose from "mongoose";
export async function connectdb() {
    try{
     await mongoose.connect(process.env.MONGODB_URL!)
     return true;
    }catch(err){
        console.log("Db connection failed","=>",err);
        
        return false;

    }
}