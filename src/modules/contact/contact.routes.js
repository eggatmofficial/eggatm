const express = require("express");
const router = express.Router();

const {createContact,getAllContacts,} = require("./contact.controller");


router.post("/", createContact);


router.get("/", getAllContacts);

module.exports = router;
