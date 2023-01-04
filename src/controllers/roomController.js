const { Room } = require('../utils/database')

const getRooms = async (req, res, next) => {
  try {
    const all = await Room.findAll()
    res.json(all)
  } catch (error) {
    next(error)
  }
}

const postRoom = async (req, res, next) => {
  try {
    const { stars, description, price } = req.body
    if (!stars || !description || !price) return res.status(400).json({ error: 'Invalid Room or incomplete' })
    const room = await Room.create({
      stars,
      description,
      price
    })
    res.status(201).json(room)
  } catch (error) {
    next(error)
  }
}

const deleteRoom = async (req, res, next) => {
  try {
    const id = Number.parseInt(req.params.id)
    const room = await Room.findByPk(id)
    if (room && !room.ReservationId) {
      await Room.destroy({ where: { id } })
      res.status(200).json({ message: 'Room deleted' })
    } else {
      res.status(400).json({ message: 'Invalid id or Reserved room, cannot be deleted' })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getRooms,
  postRoom,
  deleteRoom
}
