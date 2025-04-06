import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./database/data.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js"

dotenv.config(); // Load environment variables at the top

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true, 
}));
app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes)

app.use("/uploads", express.static("uploads"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const port = process.env.PORT || 5000; 

// Connect to DB first, then start the server
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`The server started on http://localhost:${port}`);
  });
}).catch(err => {
  console.error("Database connection failed", err);
});
