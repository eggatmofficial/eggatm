const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const modulesPath = path.join(__dirname, "..");

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API running ",
  });
});

fs.readdirSync(modulesPath).forEach((moduleName) => {
  if (
    moduleName === "routes" ||
    moduleName === "middlewares" ||
    moduleName === "utils"
  ) {
    return;
  }

  const moduleDir = path.join(modulesPath, moduleName);
  if (!fs.statSync(moduleDir).isDirectory()) return;

  const routeFile = fs
    .readdirSync(moduleDir)
    .find((file) => file.endsWith(".routes.js"));

  if (!routeFile) return;

  const routeHandler = require(path.join(moduleDir, routeFile));

  if (typeof routeHandler !== "function") {
    console.error(
      `❌ ${moduleName}: ${routeFile} must export router`
    );
    return;
  }

  router.use(`/${moduleName}`, routeHandler);
  // console.log(`✅ Loaded route: /api/${moduleName}`);
});

module.exports = router;
