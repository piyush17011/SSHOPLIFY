//email,password,roles
const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {   
        username: {
            type: String,
            required: true,
            trim: true,
            
          },
        email : { 
            type:String,
            unique:true,
            required:true
                //unique //not working 
        },
        password : { 
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
module.exports = mongoose.model("User",userSchema);