const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

        const Posts = sequelize.define("Posts", {
            Title: {
                type: DataTypes.STRING
                //allowNull: false,
            },

            Description: {
                type: DataTypes.STRING
            },

            Country: {
                type: DataTypes.STRING
            },

            Region: {
                type: DataTypes.STRING
            },

            Area: {
                type: DataTypes.STRING
            },

            ImageName: {
                type: DataTypes.STRING
            },

            Question1: {
                type: DataTypes.STRING
            },

            Answer1: {
                type: DataTypes.STRING
            },

            FinderID: {
                type: DataTypes.STRING
            },

            IID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            
            Markedfordelete: {
                type: DataTypes.BOOLEAN,
                defaultValue: 0
            },

            FoundItem :{
                type: DataTypes.BOOLEAN
            },

            Tags :{
                type: DataTypes.STRING
            }

        })

        return Posts
}