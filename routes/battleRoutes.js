const express = require("express")
const router = express.Router()
const battleController = require("../controllers/battleController")
const { body, validationResult } = require("express-validator")

const validateBattle = [
  body("trainer1").notEmpty(),
  body("trainer2").notEmpty(),
  body("winner").notEmpty(),
  body("pokemon1").notEmpty(),
  body("pokemon2").notEmpty()
]

const checkBattleData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

router.get("/", battleController.getAllBattles)
router.get("/:battleId", battleController.getBattleById)
router.post("/", validateBattle, checkBattleData, battleController.createBattle)
router.put("/:battleId", validateBattle, checkBattleData, battleController.updateBattle)
router.delete("/:battleId", battleController.deleteBattle)

module.exports = router
