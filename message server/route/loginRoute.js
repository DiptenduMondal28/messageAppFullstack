const express = require('express');
const router = express.Router();
const controller = require('../controller/loginController')

//login route
router.post('/login',controller.login);

module.exports=router;