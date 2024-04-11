const Sequalize=require('sequelize');
const sequelize = require('../util/database');

const User=sequelize.define('user',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequalize.STRING
    },
    email:{
        type:Sequalize.STRING,
        allowNull: false,
        unique: true
    },
    ph:{
        type:Sequalize.STRING
    },
    password:{
        type:Sequalize.STRING
    }
});

module.exports=User;