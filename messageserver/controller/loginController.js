const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../module/signup')
require('dotenv').config();

function generateAccessToken(id,name){
    return jwt.sign({userId:id,name:name},process.env.JWT_TOKEN);
}

const login=async (req,res,next)=>{
    const {email,password}=req.body;
    try{
        await User.findAll({where:{email:email}}).then(user=>{
            if(user.length>0){
                bcrypt.compare(password,user[0].password,(err,result)=>{
                    if(result){
                        res.status(200).json({success:true,message:'successfully login',user:user,token:generateAccessToken(user[0].id,user[0].name)})
                    }else{
                        res.status(400).json({success:false,message:"check password"});
                    }
                    if(err){
                        console.log(err)
                        res.status(500).json({success:false,message:"something wrong in bcrypt"})
                    }
                })
            }else{
                res.status(404).json({success:false,message:'user not exixt'});
            }
        });
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"somethisng wrong"})
    }
   
}

module.exports={
    login
}