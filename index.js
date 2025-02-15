const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();

const app = express();

// ✅ Use cookie parser
app.use(cookieParser());

// ✅ Enable JSON parsing
app.use(express.json());

// ✅ CORS Middleware - Allow frontend domain
app.use(
  cors({
    origin: "https://mern-frontend-chi-taupe.vercel.app", // Replace with your frontend URL
    credentials: true, // ✅ Allow credentials (cookies, sessions)
  })
);

// ✅ Manually set headers (not needed if using cors middleware above)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://mern-frontend-chi-taupe.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Hello from /" });
});

// ✅ API route to set cookies
app.get("/api", (req, res) => {
  res.cookie("token", "your-secret-token", {
    httpOnly: true,  // ✅ Prevent JavaScript access
    secure: true,    // ✅ Required for HTTPS
    sameSite: "none" // ✅ Needed for cross-origin requests
  });

  res.json({ message: "Hello from /api" });
});

// ✅ Export for Vercel
module.exports = app;
