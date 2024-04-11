const Sequalize=require('sequelize');
const sequelize = require('../util/database');

const message = sequelize.define('message',{
    id:{
        type:Sequalize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    message:{
        type:Sequalize.STRING
    }
});

module.exports=message;