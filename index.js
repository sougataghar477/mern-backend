const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
 
require("dotenv").config();

const app = express();

// ✅ Use cookie parser
app.use(cookieParser());

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ CORS Middleware - Allow frontend domain
app.use(
    cors({
      origin: "https://mern-frontend-chi-taupe.vercel.app", // ✅ Your frontend domain
      credentials: true, // ✅ Required to allow cookies
      withCredentials: true
    })
  );



// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from /" });
});

// ✅ API route to set cookies
app.post("/api", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"); // ✅ Prevents 304 caching
    res.setHeader("Pragma", "no-cache");  
    console.log(req.cookies)

    res.cookie("token", "your-secret-token", {
      httpOnly: true,  // ✅ Prevent JavaScript access
      secure: true,    // ✅ Required for HTTPS (keep it for production)
      sameSite: "none", // ✅ Needed for cross-origin requests
      maxAge:3600,
      domain: "https://mern-frontend-chi-taupe.vercel.app", // 👈 Set to your frontend domain
    path: "/",
    });
  
    res.json({ message: "Cookie Set!" });
  });

// ✅ Export for Vercel
module.exports = app;
