//define all route regarding post
const express = require(`express`);
const testController = require(`../controllers/test.controller`);
const checkAuthMiddleware = require(`../middleware/check-auth`)

const router = express.Router();

router.get("/associations", testController.test);

module.exports = router; 
