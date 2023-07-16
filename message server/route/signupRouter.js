const express=require('express');
const router=express.Router();

const controller=require('../controller/signupController');

router.post('/createuser',controller.dataCreate);

module.exports=router;