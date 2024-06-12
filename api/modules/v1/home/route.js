const express = require("express");
const multer=require('multer');
var router = express.Router();
const common = require("../../../config/common");
const home_model = require("./home_model");
const { t } = require("localizify");
const middleware = require("../../../middleware/validate");
// APIs
// book listing
router.post("/poll-listing", function (req, res) {
  //console.log(req.body);
  home_model.pollListing(req, function (code, message, data) {
    common.response(req, res, code, message, data);
  });
});
router.post("/add-voting", function (req, res) {
  home_model. addVoting(req, function (code, message, data) {
    common.response(req, res, code, message, data);
  });
});

router.post("/add-poll", function (req, res) {
  home_model.  addPoll(req, function (code, message, data) {
    common.response(req, res, code, message, data);
  });
});

//show specific user poll

router.post("/show-poll", function (req, res) {
  home_model.showSpecificUserPoll(req, function (code, message, data) {
    common.response(req, res, code, message, data);
  });
});

router.post("/show-result", function (req, res) {
  home_model.showResult(req, function (code, message, data) {
    common.response(req, res, code, message, data);
  });
});






module.exports = router;
