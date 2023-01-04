const { Router } = require('express')
const {
  getRooms,
  postRoom,
  deleteRoom
} = require('../controllers/roomController')

const roomRouter = Router()

// CRUD
roomRouter
  .get('/', getRooms)
  .post('/', postRoom)
  .delete('/:id', deleteRoom)

module.exports = roomRouter
