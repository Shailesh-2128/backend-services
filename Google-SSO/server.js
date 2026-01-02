const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
require("./config/passport");

const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/google-sso-setup")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`<h1>Login Successful</h1><p>Welcome ${req.user.displayName}</p><p>Token: ${req.query.token}</p><a href="/">Go Home</a>`); // Simple display
  } else {
    // If we rely on token for frontend auth, the backend session might still be valid or we just show the token.
    // Since we use passport session, req.user is available.
    res.send(`<h1>Login Successful</h1><p>Welcome ${req.user ? req.user.displayName : 'User'}</p><p>Token: ${req.query.token}</p><a href="/">Go Home</a>`);
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
