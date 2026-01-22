const { sendEmail } = require("../../utils/email");
const User = require("../users/user.model");

// after order.status = "PAID"
const user = await User.findById(order.userId);

await sendEmail({
  to: user.email,
  subject: "Payment Successful",
  template: "paymentSuccess",
  data: {
    user,
    order,
  },
});
