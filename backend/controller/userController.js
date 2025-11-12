
const User = require('../model/userModel');
const { use } = require('../routes/userRoutes');
const jwt = require("jsonwebtoken");
const SECRET_KEY =  "Piyush@17";


const registerUser = async(req,res)=>{
    try{
        const{ username , email, password } = req.body;
    // console.log("test->",email,password,role);
    const existingUser = await User.findOne ({ email });
    if(existingUser){
        console.log("Exists");
        res.json({
            message: "Exists",
          });
    }
    else{
        const user = await User.create ({
            username,
            email,
            password,
            
        });
        console.log(user)
        await user.save()
        res.send(user);
        
    }

    }
    catch(err){
        console.log(err);
    }
    
    
}

const loginUser = async(req,res)=>{
    
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      
      const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
      console.log(token);
      res.status(200).json({
        token,
        data: { ...user } });
      // res.cookie("token",token)
    
    }
    else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }
   catch(err){
    res.status(500).json({ message: err.message }); 
   }

           
}

//  const loginUser = async (req, res) => {
//   const email = req.body.email;

//   try {
//     const user = await User.findOne({ email });

//     //if user doest exist
//     if (!user) {
//       return res.status(404).json({ success: false, essage: "User not found" });
//     }

//     // if user exist then check the pasword or compare the password
//     if (user && user.password === password) {
//             res.json({
//               _id: user._id,
//               email: user.email,
//               message: "Success",
//             });

//     //  if password is incorrect ()

  
//     const { password, ...rest } = user._doc;
//     console.log("test")
//     console.log(user._doc)

//     // create jwt token
//     const token = jwt.sign(
//       { email: user.email, password: user.password },
//      SECRET_KEY,
//       { expiresIn: "15d" }
//     );

//     // set token in the browser cookies and send the response to the client
//     res
//       .cookie("accessToken", token, {
//         httpOnly: true,
//         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
//       })
//       .status(200)
//       .json({
//         token,
//         data: { ...rest },
//         role,
//       });
//   }} catch (error) {
//     res.status(500).json({ success: false, message: "failed to login" });
//   }
// };

const getUsers = async(req,res)=>{
                                             //to check errors
        try{
            const user = await User.find({}).populate('order');
            res.status(200).json({user});
        }
        catch(err){
            console.log(err);
        }      
}
   
module.exports = {registerUser,loginUser,getUsers};  //use curly brackets to export more than one var,fn
 










































