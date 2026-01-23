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

// read from env
let allowedOrigins = env.CORS_ORIGIN || "*";

// normalize allowed origins (remove trailing slash)
if (allowedOrigins !== "*") {
  allowedOrigins = allowedOrigins
    .split(",")
    .map(o => o.trim().replace(/\/$/, ""));
}

module.exports = {
  origin: (origin, callback) => {
    // allow server-to-server, Postman, mobile apps
    if (!origin) return callback(null, true);

    // allow all (temporary or open API)
    if (allowedOrigins === "*") return callback(null, true);

    // normalize incoming origin
    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", normalizedOrigin);
    return callback(null, false); // DO NOT throw error
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
