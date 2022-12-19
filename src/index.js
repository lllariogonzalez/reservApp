const app = require('./app.js')
const {sequelize} = require('./utils/database')
require('dotenv').config()

const port = process.env.PORT || 3000

sequelize.sync({ force: true })
  .then(()=>{
    console.log("Database sync");
    app.listen(port, () => {
        console.log(`Server listening at port ${port}`)
    })
  })
