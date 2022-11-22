const Experiences = require("../models").experience;
const Users = require("../models").user;

function checkPassword(str)
{
    var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(str);
}

function checkName(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }

const controller ={
    addUser:async (req, res) =>{
        try{
       await Users.create(req.body);
       res.status(201).json({ message: 'created' });
        }catch(e){
            console.warn(e);
            res.status(500).json({ message: 'server error' });
        }
    },
    getAll: async (req, res, next) => {
        Users.findAll()
          .then((users) => {
            res.status(200).send(users);
          })
          .catch((err) => {
            console.error(err);
            res.status(500).send({ message: "Server error!" });
          });
      },
      getById: async (req, res) => {
        Users.findByPk(req.params.id)
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
      },
      update: async (req, res) => {
        const user = Users.findByPk(req.params.id)

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
          
    },

    delete: async (req, res) => {
        Users.findByPk(req.params.id)
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
      },
}

module.exports=controller;