const { Router } = require("express")
const { 
    getRooms, 
    postRoom, 
} = require("../controllers/roomController")

const roomRouter = Router()

//CRUD
roomRouter
    .get("/", getRooms)
    .post("/", postRoom)
    
module.exports = roomRouter
