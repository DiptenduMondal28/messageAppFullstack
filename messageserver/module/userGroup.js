const Sequalize = require('sequelize');
const sequalize = require('../util/database');

const userGroup = sequalize.define('usergroup',{
    id:{
        type:Sequalize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    userId:{
        type:Sequalize.INTEGER,
        allowNull:false
    },
    groupId:{
        type:Sequalize.INTEGER,
        allowNull:false
    }
});

module.exports = userGroup;