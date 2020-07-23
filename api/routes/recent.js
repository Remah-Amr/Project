const express = require("express");
const router = express.Router();
const checkAuth = require('../middelware/check-auth');

const RecentController = require('../controllers/recent');

// Handle incoming GET requests to /orders

router.get("/", RecentController.showItemsInRecentView);

router.post("/", RecentController.addToRecentView);

router.get("/:recentId", RecentController.getItemInRecentView);


module.exports = router;