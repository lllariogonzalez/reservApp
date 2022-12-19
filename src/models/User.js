const { DataTypes } = require("sequelize")

module.exports = (sequelize) => { 
    sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dni: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },{
        timestamps: true
    });
}
