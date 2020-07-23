const express = require("express");
const router = express.Router();
const checkAuth = require('../middelware/check-auth');

const wishController = require('../controllers/wish');

// Handle incoming GET requests to /orders

router.get("/", wishController.showAllItemInWishList);

router.post("/", wishController.addToWishList);

router.get("/:wishId", wishController.getItemInWishList);

router.delete("/:wishId",  wishController.removeItemFromWishList);

module.exports = router;