const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('User', {
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
      allowNull: false,
      validate: {
        isPasswordValid (password) {
          const regRex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
          if (!regRex.test(password)) throw new Error('password invalid')
        }
      }
    }
  }, {
    timestamps: true
  })
}
