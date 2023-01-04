const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Room', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    stars: {
      type: DataTypes.ENUM('5', '3', '1'),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('disponible', 'reservado'),
      defaultValue: 'disponible'
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0.01
      }
    }
  }, {
    timestamps: true
  })
}
