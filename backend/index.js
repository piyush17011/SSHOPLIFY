const express = require('express');
const connect = require('./dbConnection');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cors = require('cors')


const app = express();  //creates a server
connect();


const corsOptions = {
  origin: true,
  credentials: true,
};

//APIs : middleware(use)
const allowedOrigins = ['http://localhost:3000'];

app.use(cors(corsOptions));
app.use(express.json());
// app.use(cookieParser());
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
// app.get("/new",(req,res)=>{
//     res.send("New- GET");  
//         //display hi on port 5000
//     // res.sendFile(index.html);
// })

app.listen(5000,()=>{
    console.log("Server is running...")
});

