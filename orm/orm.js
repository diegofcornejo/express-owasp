module.exports = function () {

    const Sequelize = require('sequelize');

    const config = require('config');
    const DB = config.get('DB');

    // Connection to database
    const sequelize = new Sequelize(DB.name,
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
    var reset = false;
    sequelize
        .sync({
            force: reset
        })
        .then(function (err) {
            err = err;
            console.log('It worked!');
            //DEFAULTS
            if (reset) {
                // nothing
                console.log('hi');
            }
        }, function (err) {
            console.log('An error occurred while creating the table:', err);
        });
    return model;
};