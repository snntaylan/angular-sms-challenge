const express = require("express");

const SmsController = require("../controllers/sms");
const router = express.Router();
router.get("", SmsController.getSmsList);


module.exports = router;