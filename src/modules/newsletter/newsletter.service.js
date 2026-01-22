
const Newsletter = require("./newsletter.model");
const ApiError = require("../utils/ApiError");
const { sendEmail } = require("../utils/email");

class NewsletterService {
  async subscribe({ email, source }) {
    const existing = await Newsletter.findOne({ email });

    // Already subscribed
    if (existing && existing.isActive) {
      throw new ApiError(409, "Email already subscribed");
    }

    // Re-subscribe
    if (existing && !existing.isActive) {
      existing.isActive = true;
      existing.subscribedAt = new Date();
      existing.unsubscribedAt = null;
      await existing.save();

      // Send welcome email again
      await sendEmail({
        to: email,
        subject: "Welcome back to EGG ! ATM 🥚",
        template: "newsletterWelcome",
        data: {},
      });

      return { message: "Subscription reactivated" };
    }

    // New subscription
    await Newsletter.create({
      email,
      source: source || "website",
    });

    // 📧 Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to EGG ! ATM 🥚",
      template: "newsletterWelcome",
      data: {},
    });

    return { message: "Subscribed successfully" };
  }

   async getAllSubscribers() {
    return Newsletter.find({ isActive: true }).sort({ createdAt: -1 });
  }
}

module.exports = new NewsletterService();
