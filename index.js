const db = require("./mongo");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("dotenv").config();

const dbURI =
  "mongodb+srv://sougataghar47:sitonmeloba69@cluster0.fllgfxo.mongodb.net/todos?retryWrites=true&w=majority";

const app = express();

 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://mern-frontend-chi-taupe.vercel.app");  
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");  
    next();
  });
  
app.use(express.json());

 
app.get("/", (req, res) => {
     
    res.json({ message: "Hello from  /" });
  });
app.get("/api", (req, res) => {
    res.cookie("token", "your-secret-token", {
        httpOnly: true,   
        secure: true,    
        sameSite: "none",  
      });
  res.json({ message: "Hello" });
});

 
// Export the app for Vercel
module.exports = app;
