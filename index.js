const db = require("./mongo");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);
require("dotenv").config();

const dbURI =
  "mongodb+srv://sougataghar47:sitonmeloba69@cluster0.fllgfxo.mongodb.net/crud?retryWrites=true&w=majority";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    secret: "SS",
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
      secure: false, // Set `true` in production (HTTPS required for "none" in sameSite)
      sameSite: "lax", // "strict" | "lax" | "none" (secure must be true for "none")
      maxAge: 3600000, // 1 hour
    },
  })
);

app.get("/api", (req, res) => {
  req.session.user = { name: "Sougata", id: 1 };
  res.json({ message: "Hello" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`App running on ${PORT}`);
});
