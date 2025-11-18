const express = require('express');
const connect = require('./dbConnection');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const cors = require('cors');

const app = express();

// Connect DB
connect();

// Allow Netlify + Localhost
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-netlify-site.netlify.app',   // <--- CHANGE THIS AFTER DEPLOY
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

// Port for Render + Local
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
