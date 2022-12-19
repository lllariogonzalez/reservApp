const {Sequelize} = require("sequelize")
const modelReservation = require("../models/Reservation")
const modelUser = require("../models/User")
const modelRoom = require("../models/Room")
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.PG_NAME,
    process.env.PG_USER,
    process.env.PG_PASSWORD,
    {
        host: process.env.PG_HOST,
        dialect: "postgres",
        logging: false,
    }
)

modelRoom(sequelize)
modelReservation(sequelize)
modelUser(sequelize)

const {Reservation, User, Room} = sequelize.models

Reservation.hasMany(Room)
Room.belongsTo(Reservation)

User.hasMany(Reservation)
Reservation.belongsTo(User)

module.exports = {
    sequelize,
    Reservation,
    User,
    Room
}
