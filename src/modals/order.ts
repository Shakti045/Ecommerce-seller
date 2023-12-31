import mongoose from "mongoose";
const orderschema = new mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    sellprice:{
        type:Number,
        required:true

    },
    deliveryadress:{
        type:Map,
        required:true
    },
    customeremail:{
        type:String,
        required:true
    },
    customername:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    sellerid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:["pending","shipped","delivered","cancelled"],
        default:"pending"
    },
    clientorderid:{
        type:String,
        required:true
    },
    orderdate:{
        type:Date,
        required:true,
        default:Date.now()
    }
})
export default mongoose.models.Order || mongoose.model("Order",orderschema);
