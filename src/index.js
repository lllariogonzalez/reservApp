const app = require('./app.js')
const { sequelize } = require('./utils/database')
require('dotenv').config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`)
  sequelize.sync({ force: true })
    .then(() => {
      console.log('Database sync')
    })
})
