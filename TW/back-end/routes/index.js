const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const experienceRouter = require("./experience");

// router.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', req.headers.origin);
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });


router.use("/users", userRouter);
router.use("/experiences", experienceRouter);

module.exports = router;
