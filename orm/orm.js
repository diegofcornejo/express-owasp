module.exports = function () {

    const Sequelize = require('sequelize');
    const config = require('config');
    const DB = config.get('DB');
    const bcrypt = require('../tools/bcrypt');

    // Connection to database
    if (DB.dialect == 'sqlite') {
        var sequelize = new Sequelize('sqlite:./express.db');
    } else {
        var sequelize = new Sequelize(DB.name,
            DB.user, DB.password, {
                host: DB.host,
                dialect: DB.dialect,
                port: DB.port,
                // pool: {
                //     max: 5,
                //     min: 0,
                //     idle: 5000
                // },
                logging: true
            });
    }

    // Models definition
    var model = {};
    model.sequelize = sequelize;

    // http://docs.sequelizejs.com/en/latest/docs/models-definition/#definition
    // http://docs.sequelizejs.com/en/latest/docs/models-definition/#data-types
    // http://docs.sequelizejs.com/en/latest/docs/associations/

    model.User = sequelize.define('users', {
        username: Sequelize.STRING,
        password: Sequelize.STRING
    }, {
        freezeTableName: true,
    });



    // Sync
    var reset = true; /******WARNING this reset your db completely******/

    sequelize
        .sync({
            force: reset
        })
        .then(async function (err) {
            err = err;
            console.log('It worked!');
            //DEFAULTS
            if (reset) {
                /********Create default user in DB*********/
                let hash = await bcrypt.createHash('admin', 10); //generate a hash from plain text
                var input = {
                    "username": "admin",
                    "password": hash
                }
                model.User.create(input).then(function (data) {
                    console.log('Admin created');
                });
                /************************************/
            }
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
    return model;
};