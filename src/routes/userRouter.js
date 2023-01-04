const { Router } = require('express')
const {
  userLogin,
  userRegister
} = require('../controllers/userController')

const userRouter = Router()

// CRUD
userRouter
  .post('/login', userLogin)
  .post('/register', userRegister)

module.exports = userRouter
