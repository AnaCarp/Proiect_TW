const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const Experiences = require("../models").experience;

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.use(bodyParser.json())

router.delete("/",async (req, res) => {
	// var {id}= req.body.id;
	console.log(req.body)
	var experienceDb = await Experiences.findOne({ where: {id} })
	await experienceDb.destroy(id);
	res.json({ message: "Experience deleted!" })

});
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

router.post("/",async (req, res) => {
	experience= req.body;

	await Experiences.create(experience);
	res.status(201).json({ message: 'Experience created!' })

});

router.put("/",async (req, res) => {

	var experience= req.body;
	var experienceDb = await Experiences.findOne({ where: { id:experience.id } })
	await experienceDb.update(experience);
	res.json({ message: "Experience updated!" });


});



module.exports = router;
