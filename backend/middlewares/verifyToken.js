// middlewares/verifyToken.js
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './backend/.env' });

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send("Invalid token format");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Failed to authenticate token");
    }

    req.user = decoded;
    console.log("🔐 decoded token:", decoded); // poți lăsa temporar pentru debugging
    next();
  });
};
