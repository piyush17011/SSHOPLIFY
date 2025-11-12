//email,password,roles
const mongoose = require('mongoose');
const productSchema = mongoose.Schema(
    {   
        title: {
            type: String,
            required: true,
            trim: true,
            
          },
        imageURL : { 
            type:String,
            required:true
                //unique //not working 
        },
        price : { 
            type:Number,
            required:true,
        },
        category : { 
            type:String,
            required:true,
            enum:["men","women","kids","ts"],
        },
        details : { 
            type:String,
            required:true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },

        },
    
    {
        timestamps : true,
    }

)
// const user1=new UserSchema("piyush","gg","admin");
module.exports = mongoose.model("Product",productSchema);