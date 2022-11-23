const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const experienceRouter = require("./experience");

router.use("/users", userRouter);
router.use("/experiences", experienceRouter);

module.exports = router;
