const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).end();

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.userId,
      role: payload.role,
    };
    next();
  } catch {
    res.status(401).end();
  }
};
