const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
    console.log("AUTH HEADER:", req.headers.authorization);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError("Unauthorized", 401);
  }

  const token = authHeader.split(" ")[1];
  console.log("token",token);
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    console.log("user",req.user);
    
    next();
  } catch (err) {
    throw new ApiError("Invalid token", 401);
  }
};
