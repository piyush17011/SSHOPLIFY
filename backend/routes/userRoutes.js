const express = require('express');

const { registerUser, loginUser,getUsers } = require('../controller/userController');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register',registerUser)
router.post("/login",loginUser)
router.get("/allUser",authenticateToken,getUsers)

module.exports = router;