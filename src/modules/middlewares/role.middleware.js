const ApiError = require("../utils/ApiError");

module.exports = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError("Forbidden: Access denied", 403);
    }
    next();
  };
};
