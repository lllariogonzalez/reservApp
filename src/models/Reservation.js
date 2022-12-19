const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Reservation", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM("pendiente", "pagado", "eliminado"),
            allowNull: false
        },
        days: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        method: {
            type: DataTypes.ENUM("efectivo", "debito", "credito"),
            allowNull: false
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
            min: 0.01,
            }
        }
    },{
        timestamps: true
    });
}
