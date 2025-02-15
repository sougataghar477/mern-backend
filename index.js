const db = require("./mongo");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();

const dbURI =
  "mongodb+srv://sougataghar47:sitonmeloba69@cluster0.fllgfxo.mongodb.net/todos?retryWrites=true&w=majority";

const app = express();

app.use(
  cors({
    origin:["http://localhost:5173","https://mern-frontend-chi-taupe.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "sitonmeloba69",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBSession({
      uri: dbURI,
      collection: "sessions",
    }), // Use MongoDBStore for storing sessions
    cookie: {
      httpOnly: true,
      path: "/", // Cookie is valid for all paths
    //   domain: "localhost", // ✅ FIXED: Removed `http://`
      secure: true, // Set `true` in production (HTTPS required for "none" in sameSite)
      sameSite: "secure", // "strict" | "lax" | "none" (secure must be true for "none")
      maxAge: 3600000, // 1 hour
    },
  })
);
app.get("/", (req, res) => {
     
    res.json({ message: "Hello from  /" });
  });
app.get("/api", (req, res) => {
  req.session.user = { name: "Sougata", id: 1 };
  res.json({ message: "Hello" });
});

 
// Export the app for Vercel
module.exports = app;
