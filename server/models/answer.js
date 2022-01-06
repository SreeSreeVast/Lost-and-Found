const { Sequelize } = require(".")

module.exports = (sequelize, DataTypes) => {

        const answer = sequelize.define("answer", 
        {
            Answer: {
                type: DataTypes.STRING
            }
        })

        return answer
}