const express=require('express');
const router = express.Router();
const authentication=require('../middlewire/auth');
const controller = require('../controller/messageController');
const { route } = require('./signupRouter');
const multer=require('multer');
const upload = multer();

//user message sent
router.post('/message',authentication.authenticate,controller.messageSent);

//get reply from other
router.get('/allreply',authentication.authenticate,controller.getreply);

//get last message
router.get('/lastmessage',authentication.authenticate,controller.lastMessage);

//file sending 
router.post('/file',authentication.authenticate,upload.single('file'),controller.fileHandle);

module.exports=router;