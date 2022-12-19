const { Reservation, User, Room } = require('../utils/database')

const getReservations = async (req, res, next)=>{
    try {
        const all = await Reservation.findAll({
            attributes: {exclude: ['UserId']},
            include: [User, Room] 
        });
        res.json(all)
    } catch (error) {
        next(error)
    }
}

const updateReservation = async (req, res, next)=>{
    try {
        const id = Number(req.params.id)
        const [update] = await Reservation.update(req.body, {where:{id}})
        if(update > 0){
            const reservation = await Reservation.findByPk(id)
            res.json(reservation);
        } else {
            res.status(404).json({error: "Reservation not found"})
        }
    } catch (error) {
        next(error)
    }
}

const postReservation = async (req, res, next)=>{
    try {
        const {Rooms, UserId, days, method, status, total} = req.body
        if(Array.isArray(Rooms)){
            const reservation = await Reservation.create({
                days,
                method,
                status,
                total
            })
            reservation.setUser(UserId) 
            reservation.setRooms(Rooms)
            res.status(201).json(reservation);
        } else {
            res.status(404).json({error: "Rooms not found or invalid"})
        }
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getReservations,
    postReservation,
    updateReservation
}
