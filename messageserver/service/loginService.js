const User = require('../module/signup');

const findUSer = async(req,email)=>{
    return User.findAll({where:{email:email}})
}

module.exports=findUSer;