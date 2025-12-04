
const User = require('../model/userModel');
const { use } = require('../routes/userRoutes');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = process.env.JWT_SECRET || "Piyush@17";


const registerUser = async(req,res)=>{
    try{
        const{ username , email, password } = req.body;
    // console.log("test->",email,password,role);
    const existingUser = await User.findOne ({ email });
    if(existingUser){
        console.log("Exists");
        return res.status(409).json({
            message: "User already exists",
          });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create ({
            username,
            email,
            password: hashedPassword,
            
        });
        console.log(user)
        await user.save()
        const { password: _password, ...userData } = user.toObject();
        return res.status(201).json(userData);
        
    

    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: "Failed to register user" });
    }
    
    
}

const loginUser = async(req,res)=>{
    
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
      const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, { expiresIn: "1h" });
      console.log(token);
      const { password: _password, ...userData } = user.toObject();
      res.status(200).json({
        token,
        data: userData });
      // res.cookie("token",token)
    
    
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
 










































