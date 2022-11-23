const express = require("express");
const router = express.Router();
const Experiences = require("../models").experience;
const Users = require("../models").user;
const bodyParser=require("body-parser");

// router.use(bodyParser.json())

router.get("/",async (req, res) => {
	Users.findAll()
		.then((users) => {
			res.status(200).send(users);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error!" });
		});
});


router.post("/", async (req, res) =>{
	try{
 		await Users.create(req.body);
 		res.status(201).json({ message: 'created' });
	}catch(e){
			console.warn(e);
			res.status(500).json({ message: 'server error' });
	}
});

router.get("/register",async (req, res) => {
	
});
router.get("/authentificate",async (req, res) => {
	
});
router.get("/:UserId", async (req, res) => {
	Users.findByPk(req.params.UserId)
		.then((user) => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			res.status(200).send(user);
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error!" });
		});
});

router.put('/:UserId', async (req, res) =>{
	const user = Users.findByPk(req.params.UserId)

	if(user){
		
			const { username, password, firstName, lastName, city} = req.body;
			
			if (username !== user.username && username) {
					Users.findOne({ where: { username } })
						.then((user) => {
							if (user) {
								return res
									.status(400)
									.send({ message: `Username ${username} is already taken` });
							}
							else{
									user.username=username;
							}
						})
						.catch((err) => {
							console.error(err);
							res.status(500).send({ message: "Server error!" });
						});

				}
				if(password){
					if(checkPassword(password))
							user.password=password;
					else{
							return res
									.status(400)
									.send({ message: `Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character` });
					}
				}
				if(firstName){
					if(checkName(firstName) ){
							return res
									.status(400)
									.send({ message: `First name should have more than 3 characters` });
					}
					else{
							user.firstName=firstName;
					}
				}
				if(firstName){
					if(checkName(firstName) ){
							return res
									.status(400)
									.send({ message: `First name should have only characters` });
					}
					else{
							user.firstName=firstName;
					}
				}
				if(lastName){
					if(checkName(lastName) ){
							return res
									.status(400)
									.send({ message: `Last name should have only characters` });
					}
					else{
							user.lastName=lastName;
					}
				}
			
			 await user.update(req.body);
	}
		
});
router.delete("/:UserId", async (req, res) => {
	Users.findByPk(req.params.UserId)
		.then(async (user) => {
			if (!user) {
				return res.status(404).send({ message: "User not found" });
			}
			await user.destroy();
			res.status(200).send({ message: "User deleted successfully" });
		})
		.catch((err) => {
			console.error(err);
			res.status(500).send({ message: "Server error!" });
		});
});

router.get("/:UserId/experiences/:ExperienceId", async (req, res) => {
		const user = await Users.findByPk(req.params.UserId)
		 
		if(user){
				//const experiences =await Experiences.findByPk(req.params.ExperienceId, {where: {UserId: user.id }})
				const experiences = await user.getExperiences();
				const experience = experiences.shift();

				if(experience){
						res.status(200).send(experience);
				}
				else{
						res.status(404).send({ message: "Experience not found!" })
				}
		}
		else{
				res.status(404).send({ message: "User not found!" });
		}
	}
);
router.get( "/:UserId/experiences", async (req, res) => {
	const user = await Users.findByPk(req.params.UserId);
	if(user){
			const experiences = await user.getExperiences();
			if(experiences){
					res.status(200).send(experiences);
			}
			else{
					res.status(404).send({ message: "Experiences not found!" })
			}
			
	}
	else{
			res.status(404).send({ message: "User not found!" });
	}
		
});

router.post("/:UserId/experiences", async (req, res) => {
		const user = await Users.findByPk(req.params.UserId);

		if(user){
				const experience = req.body;
				experience.UserId = user.id;

				await Experiences.create(experience);
				res.status(201).json({ message: 'created' })

		}else{
				res.status(404).send({ message: "User not found!" });
		}
	}
);
router.put("/:UserId/experiences/:ExperienceId", async (req, res) => {
       
        const user = Users.findByPk(req.params.UserId)
         
        if(user){
            const experiences = await user.getExperiences({where: {id:req.params.ExperienceId}})
			const experience = experiences.shift();
            if(experience){
               await experience.update(req.body);
                res.status(200).send({ message: "Experience updated!" });
            }
            else{
                res.status(404).send({ message: "Experience not found!" })
            }
        }
        else{
            res.status(404).send({ message: "User not found!" });
        }
      }
);
router.delete("/:UserId/experiences/:ExperienceId", async (req, res) => {
        const user = await Users.findByPk(req.params.UserId)
         
        if(user){
			const experiences = await user.getExperiences({where: {id:req.params.ExperienceId}})
            const experience = experiences.shift();
            if(experience){
                await experience.destroy(req.body);
                res.status(202).json({ message: "Experience deleted!" })
            }
            else{
                res.status(404).send({ message: "Experience not found!" })
            }
        }
        else{
            res.status(404).send({ message: "User not found!" });
        }
       }
);


// router.put(
//   "/:id",
//   authorize(),
//   userController.updateSchema,
//   userController.update
// );
// router.get("/current", userController.getCurrent); //get current experience


module.exports = router;
