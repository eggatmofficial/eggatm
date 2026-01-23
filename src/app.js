
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

const routes = require("./modules/routes");
const errorMiddleware = require("./modules/middlewares/error.middleware");
const requestLogger = require("./modules/middlewares/requestLogger.middleware");
const rateLimiter = require("./modules/middlewares/rateLimit.middleware");

const corsOptions = require("./config/cors");
const helmetConfig = require("./config/helmet");
const paymentWebhook = require("./modules/payments/payment.webhook");

require("./config/env");

const app = express();

/* 🔥 HEALTH CHECK */
app.get("/", (req, res) => {
  res.send("EggAtm Backend is running!");
});

/* webhook (must be before json) */
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  paymentWebhook
);

/* middlewares */
app.use(helmetConfig);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimiter);
app.use(requestLogger);

/* routes */
app.use("/api", routes);

/* error handler */
app.use(errorMiddleware);

module.exports = app;
