const Sequalize=require('sequelize');
require('dotenv').config();

const sequalize = new Sequalize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{dialect:'mysql',host:process.env.DB_HOST});

module.exports=sequalize;