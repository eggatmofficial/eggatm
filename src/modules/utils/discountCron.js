const cron = require("node-cron");
const Product = require("../products/product.model");

cron.schedule("0 * * * *", async () => {
  const now = new Date();

  await Product.updateMany(
    {
      "discount.mode": "festival",
      "discount.isActive": true,
      "discount.endDate": { $lt: now }
    },
    {
      $set: { "discount.isActive": false }
    }
  );

  console.log("⏰ Expired festival discounts disabled");
});
