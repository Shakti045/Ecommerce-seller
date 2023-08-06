import mongoose from "mongoose";

const Userschema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    profilephoto:{
        type:String,
    },
    businessname:{
        type:String,
        required:true,
        default:"@admin"
    },
    usertype:{
        type:String,
        required:true,
        enum:["admin","seller"],
        default:"seller"
    },
    myproducts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ]
})

export default mongoose.models.User || mongoose.model("User",Userschema);