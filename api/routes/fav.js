const express = require("express");
const router = express.Router();
const checkAuth = require('../middelware/check-auth');

const FavController = require('../controllers/fav');

// Handle incoming GET requests to /orders

router.get("/", FavController.showAllItemInFavorite);

router.post("/", FavController.addToFavorite);

router.get("/:favId", FavController.getItemInFavorite);

router.delete("/:favId",  FavController.removeItem);

module.exports = router;