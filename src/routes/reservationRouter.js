const { Router } = require('express')
const {
  getReservations,
  postReservation,
  updateReservation
} = require('../controllers/reservationController')

const reservationRouter = Router()

reservationRouter
  .get('/', getReservations)
  .put('/:id', updateReservation)
  .post('/', postReservation)

module.exports = reservationRouter
