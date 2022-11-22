const express = require("express");
const router = express.Router();
const experienceController = require("../controllers").experience;


router.get(
  "/",
  experienceController.getAllExperiencesOfAllUsers
);

module.exports = router;
