const dbConfig = require('../config/dbConfig');
const {Sequelize, DataTypes} = require('sequelize');

// const Sequelize = new Sequelize ();

const sequelize = new Sequelize (
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorsAliases: false, //If errors in your code will overwrite
        
    });

    sequelize
    .authenticate()
    //promises
    .then(() => {
        console.log('Database Connection Successful...');
    })
    .catch(err => {
        console.error('Error'+ err);
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.students=require ('./studentModel')(sequelize,DataTypes)

    db.sequelize.sync ({force: false})
    .then(() => {
        console.log('re-sync done');
    });

  

    module.exports = db;
   