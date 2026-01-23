// require("./config/env");

// console.log("server.js started");

// const app = require("./app");
// const connectDB = require("./config/db");

// const PORT = process.env.PORT || 3000;

// const server = app.listen(PORT, () => {
//   console.log(` Server running on port ${PORT}`);
// });

// // background DB connect
// connectDB().catch(err => {
//   console.error("Database connection failed:", err.message);
// });

// // ONLY PLACE process.exit IS ALLOWED
// process.on("unhandledRejection", err => {
//   console.error("Unhandled rejection:", err);
// });

const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB()
  .then(() => console.log("Database connected"))
  .catch(err => console.error("Database error:", err.message));

process.on("unhandledRejection", err => {
  console.error("Unhandled rejection:", err);
});
