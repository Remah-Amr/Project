const express = require("express");
const router = express.Router();
const checkAuth = require('../middelware/check-auth');

const OrderController = require('../controllers/order');

// Handle incoming GET requests to /orders
router.get("/",  OrderController.orders_get_all);

router.post("/", OrderController.orders_create_order);

router.get("/:orderId", OrderController.orders_get_order);

router.delete("/:orderId",  OrderController.orders_delete_order);

module.exports = router;
