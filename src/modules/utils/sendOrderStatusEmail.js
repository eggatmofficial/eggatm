const { sendEmail } = require("./email");
const orderEmailConfig = require("./orderEmailConfig");
const User = require("../../modules/users/user.model");

module.exports = async function sendOrderStatusEmail(order) {
  console.log(" sendOrderStatusEmail triggered");
    console.log("Order ID:", order?._id);
    console.log(" Order Status:", order?.status);
  const user = await User.findById(order.userId);
  if (!user) return;

  console.log("👤 Sending email to:", user.email);

  const config = orderEmailConfig(
    order,
    process.env.FRONTEND_BASE_URL
  );

  if (!config) return;

  console.log("✉️ Email Subject:", config.title);
    console.log("📄 Using template: orderStatus.ejs");

  await sendEmail({
    to: user.email,
    subject: config.title,
    template: "orderStatus",
    data: {
      user,
      order,
      title: config.title,
      message: config.message,
      color: config.color,
      showItems: config.showItems ?? false,
      ctaText: config.ctaText ?? null,
      ctaUrl: config.ctaUrl ?? null,
    },
  });
};
