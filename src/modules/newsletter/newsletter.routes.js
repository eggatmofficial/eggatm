const express = require("express");
const router = express.Router();

const {subscribeNewsletter,unsubscribeNewsletter,getAllSubscribers,} = require("./newsletter.controller");


router.post("/subscribe", subscribeNewsletter);
router.post("/unsubscribe", unsubscribeNewsletter);


router.get("/", getAllSubscribers);

module.exports = router;
