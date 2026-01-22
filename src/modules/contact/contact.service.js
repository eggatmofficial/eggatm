const Contact = require("./contact.model");
const { sendEmail } = require("../utils/email");

class ContactService {
  async createContact(data) {
    // Save to DB
    const contact = await Contact.create(data);

    //  Send email to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "New Contact Message - Egg! ATM",
      template: "contactAdmin",
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
      },
    });

    // Auto reply to user (optional but recommended)
    await sendEmail({
      to: data.email,
      subject: "We received your message - Egg! ATM",
      template: "contactUser",
      data: {
        name: data.name,
      },
    });

    return contact;
  }

  async getAllContacts() {
    return Contact.find().sort({ createdAt: -1 });
  }
}

module.exports = new ContactService();
