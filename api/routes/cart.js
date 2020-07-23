const express = require("express");
const router = express.Router();
const checkAuth = require('../middelware/check-auth');

const CartController = require('../controllers/cart');

// Handle incoming GET requests to /orders

router.get("/", CartController.showItemInCart);

router.post("/", CartController.addToCart);

router.get("/:cartId", CartController.getItemInCart);

router.delete("/:cartId",  CartController.removeItem);

module.exports = router;