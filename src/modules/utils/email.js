const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const renderTemplate = async (templateName, data) => {
  const templatePath = path.resolve(
    process.cwd(),
    "src/templates/email",
    `${templateName}.ejs`
  );
  console.log("Loading template from:", templatePath);
  return ejs.renderFile(templatePath, data);
};

exports.sendEmail = async ({ to, subject, template, data }) => {
  if (!to || !template || !data) {
    throw new Error("Missing email parameters");
  }

  const html = await renderTemplate(template, data);

  await transporter.sendMail({
    from: `"EGG ! ATM" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
