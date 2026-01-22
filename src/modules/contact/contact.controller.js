const catchAsync = require("../utils/asyncHandler");
const contactService = require("./contact.service");
const { createContactSchema } = require("./contact.validation");

exports.createContact = catchAsync(async (req, res) => {
  const { error, value } = createContactSchema.validate(req.body);
  console.log("re body",req.body);
  

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  await contactService.createContact(value);

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
  });
});

exports.getAllContacts = catchAsync(async (req, res) => {
  const contacts = await contactService.getAllContacts();

  res.status(200).json({
    success: true,
    data: contacts,
  });
});
