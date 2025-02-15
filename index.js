const db = require("./mongo");
const express = require("express");
const cors = require("cors");
 
 
const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("dotenv").config();

const dbURI =
  "mongodb+srv://sougataghar47:sitonmeloba69@cluster0.fllgfxo.mongodb.net/todos?retryWrites=true&w=majority";

const app = express();

// app.use(
//   cors({
//     origin:["https://mern-frontend-chi-taupe.vercel.app"],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mern-frontend-chi-taupe.vercel.app"); // ✅ Replace with your frontend URL
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true"); // ✅ Required for cookies
    next();
  });
  
app.use(express.json());

 
app.get("/", (req, res) => {
     
    res.json({ message: "Hello from  /" });
  });
app.get("/api", (req, res) => {
    res.cookie("token", "your-secret-token", {
        httpOnly: true,  // ✅ Prevents JavaScript access (more secure)
        secure: true,    // ✅ Ensures it's only sent over HTTPS (needed for production)
        sameSite: "none", // ✅ Required for cross-site requests (frontend and backend on different domains)
        maxAge: 24 * 60 * 60 * 1000 // 1 day
      });
  res.json({ message: "Hello" });
});

 
// Export the app for Vercel
module.exports = app;
