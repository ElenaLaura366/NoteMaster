// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Citește header-ul Authorization
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("No token provided");
  }

  // De obicei tokenul e trimis ca "Bearer <token>"
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send("Invalid token format");
  }

  // Verifică validitatea token-ului
  jwt.verify(token, "your_jwt_secret", (err, decoded) => {
    if (err) {
      return res.status(403).send("Failed to authenticate token");
    }
    // decoded conține datele pe care le-ai pus în token (ex: userId)
    req.user = decoded; 
    next();
  });
};
