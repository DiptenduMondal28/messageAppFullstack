const User = require('../module/signup');
const bcrypt=require('bcrypt');
require('dotenv').config();

function isstringinvalid(string){
    if(string===undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

module.exports.dataCreate=async(req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const ph = req.body.ph;
    const password = req.body.password;
    const salt=parseInt(process.env.SALT_ROUND, 10);
    
    try{
      if(isstringinvalid(name) || isstringinvalid(email) || isstringinvalid(ph) || isstringinvalid(password)){
        return res.status(401).json({message:"input every parameters"})
      }
      bcrypt.hash(password,salt,async(err,hash)=>{
        if(err!=undefined){
            console.log(err);
        };
        await User.create({
            name,email,ph,password:hash
        }).then(()=>{
            res.status(200).json({message:"user created succesfully"});
        }).catch(err=>{
            //console.log(err)
            return res.status(409).json({message:"user already exixt"})
        });
      })
    }catch(err){
        if(err.name==='SequelizeUniqueConstraintError'){
            console.log("duplicate entry:",err)
            return res.status(409).json({message:"user already exixt"})
        }
        res.status(500).json({message:"something wrong",error:err})
    }
}