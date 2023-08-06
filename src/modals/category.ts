import mongoose from "mongoose";
const categoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    picture:{
        type:String,
        required:true
    },
    realatedproducts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    attributesrequired:[
           {
            key:{
                type:String,
            },
            values:[{
                type:String
            }]
           }
    ]
})

export default mongoose.models.Category || mongoose.model("Category",categoryschema);