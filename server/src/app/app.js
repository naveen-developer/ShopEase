import express from "express";
import route from "../routes/auth.route.js";
import connectDB from "../config/db.js";
import cookieParser from "cookie-parser";
import proute from "../routes/product.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", route);
app.use("/api", proute);

await connectDB();

app.get("/", (req, res) => {
  res.send("backend running successfully!");
});

export default app;
