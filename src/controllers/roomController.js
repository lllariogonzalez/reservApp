const { Room } = require('../utils/database')

const getRooms = async (req, res, next)=>{
    try {
        const all = await Room.findAll();
        res.json(all)
    } catch (error) {
        next(error)
    }
}

const postRoom = async (req, res, next)=>{
    try {
        const {stars, description, price} = req.body
        const room = await Room.create({
            stars,
            description,
            price
        })
        res.status(201).json(room);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getRooms,
    postRoom,
}
