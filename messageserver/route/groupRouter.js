const express = require('express');
const router = express.Router();
const authentication = require('../middlewire/auth');
const controller = require('../controller/groupController');

//groupname creation
router.post('/namecreate',authentication.authenticate,controller.groupCreate);

//in how many groups user have
router.get('/groups',authentication.authenticate,controller.userInGroup);

//add user in group
router.post('/adduser',authentication.authenticate,controller.adduser);

//remove user from group
router.delete('/removeuser',authentication.authenticate,controller.removeuser);

//make another admin
router.post('/addadmin',authentication.authenticate,controller.addAdmin);

module.exports=router;
