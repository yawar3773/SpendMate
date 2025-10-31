import express from "express";
import dotenv from "dotenv";
import {initDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoutes from "./routes/transactionsRoute.js"
import cors from "cors";

dotenv.config();

const app = express();

//middleware
app.use(ratelimiter);
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:8081",
  credentials: true //allow frontend to send cookies
}));

app.use("/api/transactions",transactionsRoutes);

initDB().then(() => {
    app.listen(PORT,()=>{
    console.log("Server is up and running on PORT:",PORT);
    });
})