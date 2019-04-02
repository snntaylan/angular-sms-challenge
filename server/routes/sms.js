const express = require("express");

const SmsController = require("../controllers/sms");

const router = express.Router();

router.post("", SmsController.createSms);

router.put("/:id", SmsController.updateSms);

router.get("", SmsController.getSmsList);

router.get("/:id", SmsController.getSms);

router.delete("/:id", SmsController.deleteSms);

module.exports = router;