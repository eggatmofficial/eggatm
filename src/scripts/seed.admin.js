require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../modules/users/user.model");

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: "admin@gmail.com" });
  if (existing) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("Ajith@2026", 10);

  await User.create({
    name: "Ajithkumar D",
    email: "ajithkumarbe@gmail.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Admin created");
  process.exit();
})();
