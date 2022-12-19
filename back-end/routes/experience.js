const express = require("express");
const router = express.Router();
const Experiences = require("../models").experience;



router.get("/",async (req, res) => {
	const obj = {};
	if (req.query.startPoint || req.query.vehicleType || req.query.endPoint) {
		obj.where = {};
	}
	if (req.query.startPoint) {
		obj.where.startPoint = req.query.startPoint;
	}
	if (req.query.vehicleType) {
		obj.where.vehicleType = req.query.vehicleType;
	}
	if (req.query.endPoint) {
		obj.where.endPoint = req.query.endPoint;
	}

	Experiences.findAll(obj)
		.then((experiences) => {
			res.status(200).send(experiences);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error!" });
		});
});



module.exports = router;
