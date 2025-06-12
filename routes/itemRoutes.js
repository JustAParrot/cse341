const express = require("express")
const router = express.Router()
const itemController = require("../controllers/itemController")
const { itemRules, checkItemData } = require("../middleware/validation")
const authenticate = require("../middleware/auth") 

// Public routes
router.get("/", itemController.getAllItems)
router.get("/:itemId", itemController.getItemById)
router.post("/", itemRules(), checkItemData, itemController.createItem)

// Protected route
router.put("/:itemId", authenticate, itemRules(), checkItemData, itemController.updateItem)

router.delete("/:itemId", itemController.deleteItem)

module.exports = router
