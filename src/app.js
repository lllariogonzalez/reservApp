const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const reservationRouter = require('./routes/reservationRouter')
const userRouter = require('./routes/userRouter')
const roomRouter = require('./routes/roomRouter')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

//routes
app.use('/user', userRouter)
app.use('/reservation', reservationRouter)
app.use('/room', roomRouter)

//handle-errors
app.use((err, _req, res, _next) => {
    const status = err.status || 500
    const message = err.message || err
    console.error(err)
    return res.status(status).send(message);
  });
  
module.exports = app
