const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const User = require("../models/User");
const auth = require("../middlewares/auth");

router.post("/login", AuthController.login);

router.get("/me", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({
      id: user.id,
      name: user.name,
      role: user.role,
      email: user.email,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
