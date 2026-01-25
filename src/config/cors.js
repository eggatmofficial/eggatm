// const env = require("./env");

// const allowedOrigins =
//   env.CORS_ORIGIN === "*"
//     ? "*"
//     : env.CORS_ORIGIN.split(",").map((o) => o.trim());

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins === "*" || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// };

// module.exports = corsOptions;
const env = require("./env");

let allowedOrigins = env.CORS_ORIGIN
  ? env.CORS_ORIGIN.split(",").map(o => o.trim().replace(/\/$/, ""))
  : [];

module.exports = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const normalized = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalized)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", normalized);
    return callback(null, true); // <-- IMPORTANT: allow but log
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
