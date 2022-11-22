const { IGNORE } = require("sequelize/types/index-hints");

const Experiences = require("../models").Experience;
const Users = require("../models").User;

const controller ={
    getAllExperiencesOfAllUsers: async (req, res) => {
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
      },
    getExperienceOfUserById: async (req, res) => {
        const user = await Users.findByPk(req.params.uid)
         
        if(user){
            const experiences =await Experiences.findByPk(req.params.eid, {where: {UserId: user.id }})
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
      },
      getAllExperiencesOfUser: async (req, res) => {
        const user = await Users.findByPk(req.params.uid);
        if(user){
            const experiences = Experiences.findAll({where: {UserId: user.id }});
          
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
          
      },
      addExperienceOfUser: async (req, res) => {
        const user = await Users.findByPk(req.params.uid);

        if(user){
            const experience = req.body;
            experience.UserId = user.id;

            await Experience.create(experience);
            res.status(201).json({ message: 'created' })

        }else{
            res.status(404).send({ message: "User not found!" });
        }
      },

      updateExperienceOfUser: async (req, res) => {
       
        const user = Users.findByPk(req.params.uid)
         
        if(user){
            const experiences = await Experiences.findByPk(req.params.eid, {where: {UserId: user.id }})
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
      },
      deleteExperienceOfUser: async (req, res) => {
        const user = await Users.findByPk(req.params.uid)
         
        if(user){
            const experiences =  await Experiences.findByPk(req.params.eid, {where: {UserId: user.id }})
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
}

module.exports=controller;