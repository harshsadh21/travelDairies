import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongodb from "./db/connecTODb.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

// Get the __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const port = process.env.port;
const app = express();
/// import route for the api
import authRoutes from "./routes/authRoute.js";
import storyRoutes from "./routes/stroyRoute.js";
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Allow credentials (cookies)
  })
);

/// api
app.use("/auth", authRoutes);
app.use("/story", storyRoutes);
// serve static file from the uploads and assests directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.listen(port, () => {
  console.log(`server is running on ${port}`);

  connectToMongodb();
});

export default app;
