const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;
const experienceController = require("../controllers").experience;

console.log(userController)



router.post("/adaugaUser",userController.addUser);
router.get("/",userController.getAll);
router.get("/current", userController.getCurrent);
router.get("/:id", userController.getById);
// router.put(
//   "/:id",
//   authorize(),
//   userController.updateSchema,
//   userController.update
// );
router.delete("/:id", userController.delete);
router.get(
  "/:uid/experiences/:eid",

  experienceController.getExperienceOfUserById
);
router.get(
  "/:uid/experiences",

  experienceController.getAllExperiencesOfUser
);
router.post(
  "/:uid/experiences",
  
  experienceController.addExperienceOfUser
);
router.put(
  "/:uid/experiences/:eid",
  experienceController.updateExperienceOfUser
);
router.delete(
  "/:uid/experiences/:eid",
  experienceController.deleteExperienceOfUser
);

module.exports = router;
