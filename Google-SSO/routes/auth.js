const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 1️⃣ Start Google Login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// 2️⃣ Google Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    // req.user contains the authenticated user from MongoDB
    const user = req.user;

    // Create JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    // Redirect to profile or success page with token
    // For demonstration, we redirect to a route that displays user info
    res.redirect(`/profile?token=${token}`);
  }
);

module.exports = router;
