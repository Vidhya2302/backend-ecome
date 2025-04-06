import mongoose from "mongoose";


const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    stock:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,  
    },
    mrp:{
        type:Number,
        require:true,  
    },
    image:{
        type:String,
        require:true,  
    },
    sold:{
        type:Number,
        require:true,
    },
    offers:{
        type:String,
        require:true
    },
    Details:{
        type:String,
    },
    category:{
        type:String,
        require:true,
        enum:{
            values:[
                'Electrinics',
                'Mobile',
                'Laptops',
                'Accessories',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'others'
            ]
        }
    },
    createdAt:{
      type:Date,
      default:Date.now()
    }
})

export const Product=mongoose.model("Product",schema)