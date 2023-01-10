const { Router } = require('express')
const {
  getReservations,
  postReservation,
  updateReservation
} = require('../controllers/reservationController')
const { checkJwt } = require('../middlewares/session')

const reservationRouter = Router()

reservationRouter
  .get('/', checkJwt, getReservations)
  .put('/:id', checkJwt, updateReservation)
  .post('/', checkJwt, postReservation)

module.exports = reservationRouter
