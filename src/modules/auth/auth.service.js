const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../users/user.model");
const ApiError = require("../utils/ApiError");
const config = require("../../config/env")


class AuthService {
  async login({ email, password }) {

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new ApiError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.JWT_SECRET,
      { expiresIn: config.JWT_EXPIRES_IN  }
    );

    return {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
       addresses: user.addresses || [],
        location:user.location
      },
    };
  }


}

module.exports = new AuthService();
