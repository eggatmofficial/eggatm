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

let allowedOrigins = env.CORS_ORIGIN || "*";

if (allowedOrigins !== "*") {
  allowedOrigins = allowedOrigins.split(",").map(o => o.trim());
}

module.exports = {
  origin: (origin, callback) => {
    // allow server-to-server, postman, mobile apps
    if (!origin) return callback(null, true);

    // allow all
    if (allowedOrigins === "*") {
      return callback(null, true);
    }

    // normalize origin (remove trailing slash)
    const normalizedOrigin = origin.replace(/\/$/, "");

    if (allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    console.log("Blocked by CORS:", normalizedOrigin);
    callback(null, false); // IMPORTANT: do not throw error
  },

  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
