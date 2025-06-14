const express = require("express")
const router = express.Router()
const trainerController = require("../controllers/trainerController")
const { trainerRules, checkTrainerData } = require("../middleware/validation")
const authenticate = require("../middleware/auth")

router.post("/register", trainerRules(), checkTrainerData, trainerController.registerTrainer)
router.post("/login", trainerController.loginTrainer)

router.get("/", authenticate, trainerController.getAllTrainers)
router.get("/:id", authenticate, trainerController.getTrainerById)
router.put("/:id", authenticate, trainerRules(), checkTrainerData, trainerController.updateTrainer)
router.delete("/:id", authenticate, trainerController.deleteTrainer)

module.exports = router
