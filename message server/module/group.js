const Sequalize=require('sequelize');
const sequalize=require('../util/database');

const group = sequalize.define('group',{
    id:{
        type:Sequalize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type:Sequalize.STRING,//group name
        allowNull:false
    },
    admin:{
        type:Sequalize.INTEGER,// admin who created that group
        allowNull:false
    }
});

module.exports=group;
