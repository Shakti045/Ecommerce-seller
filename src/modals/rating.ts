import mongoose from 'mongoose';
const ratingschema=new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    usermail:{
        type:String,
        required:true
    },
    userphoto:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})

export default mongoose.models.Rating || mongoose.model("Rating",ratingschema);