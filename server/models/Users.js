const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

        const Users = sequelize.define("Users", {

            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },

            password: {
                type: DataTypes.STRING
            },

            username: {
                type: DataTypes.STRING
            },
        })

        return Users
}