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
      origin: "https://mern-frontend-beta-ten.vercel.app", // ✅ Your frontend domain
      credentials: true, // ✅ Required to allow cookies
      withCredentials: true
    })
  );



// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from /" });
});

// ✅ API route to set cookies
app.get("/api", (req, res) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"); // ✅ Prevents 304 caching
    res.setHeader("Pragma", "no-cache");  
    console.log(req.cookies)

    // res.cookie("token", "your-secret-token", {
    //   httpOnly: true,  // ✅ Prevent JavaScript access
    //   secure: true,    // ✅ Required for HTTPS (keep it for production)
    //   sameSite: "none", // ✅ Needed for cross-origin requests
    //   maxAge:7200,// 👈 Set to your frontend domain
    // path: "/",
    // });
    const token = "your_generated_token";

    res.setHeader("Set-Cookie", `token=${token}; Path=/; HttpOnly; Secure; SameSite=None; Partitioned`);
    res.json({ message: "Cookie Set!" });
  });

// ✅ Export for Vercel
module.exports = app;
