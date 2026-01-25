
// const express = require("express");
// const cors = require("cors");

// const routes = require("./modules/routes");
// const errorMiddleware = require("./modules/middlewares/error.middleware");
// const requestLogger = require("./modules/middlewares/requestLogger.middleware");
// const rateLimiter = require("./modules/middlewares/rateLimit.middleware");

// const corsOptions = require("./config/cors");
// const helmetConfig = require("./config/helmet");
// const paymentWebhook = require("./modules/payments/payment.webhook");

// const app = express();

// app.use(helmetConfig);
// app.use(cors(corsOptions));
// app.post("/api/payments/webhook",express.raw({ type: "application/json" }),paymentWebhook);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use(rateLimiter);
// app.use(requestLogger);

// app.use("/api", routes);
// app.use(errorMiddleware);

// module.exports = app;
const express = require("express");
const cors = require("cors");
const helmetConfig = require("./config/helmet");
const corsOptions = require("./config/cors");

const routes = require("./modules/routes");
const errorMiddleware = require("./modules/middlewares/error.middleware");
const requestLogger = require("./modules/middlewares/requestLogger.middleware");
const rateLimiter = require("./modules/middlewares/rateLimit.middleware");
const paymentWebhook = require("./modules/payments/payment.webhook");

require("./config/env");

const app = express();

/* webhook (must be first for raw body) */
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

/* ---------- CORS FIRST ---------- */
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

/* ---------- BODY ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- HELMET AFTER CORS ---------- */
app.use(helmetConfig);

/* ---------- OTHER MIDDLEWARE ---------- */
app.use(rateLimiter);
app.use(requestLogger);

/* ---------- ROUTES ---------- */
app.use("/api", routes);

/* health */
app.get("/", (req, res) => {
  res.send("EggAtm Backend is running...!");
});

/* error */
app.use(errorMiddleware);

module.exports = app;
