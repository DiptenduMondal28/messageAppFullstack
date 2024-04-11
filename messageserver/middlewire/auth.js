const jwt = require('jsonwebtoken');
const User = require('../module/signup');
require('dotenv').config();

const authenticate=async (req,res,next)=>{
    try{
        const token=req.header('Authorization');
        //console.log(token);
        const user=jwt.verify(token,process.env.JWT_TOKEN);
        //console.log("auth:"+user.userId);
        if(!user.userId){
            throw new Error('Invalid user id');
        }
        await User.findByPk(user.userId).then(user=>{
            console.log(JSON.stringify(user));
            req.user=user;
            next();
        }).catch(err=>{
            throw new Error(err);
        })
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false});
    }
    
}

module.exports={authenticate};