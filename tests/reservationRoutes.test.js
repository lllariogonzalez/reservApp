/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest')
const app = require('../src/app')
const { sequelize } = require('../src/utils/database')

const request = supertest(app)

describe('Room Routes', () => {
  const reservation = {
    UserId: 1,
    Rooms: [1],
    days: 3,
    method: 'debito',
    status: 'pendiente',
    total: 100
  }

  beforeAll(async () => {
    const user = {
      fullname: 'Mario Gonzalez',
      email: 'lllariogonzalez@gmail.com',
      dni: '34499275',
      password: 'tuGerente1234'
    }
    const room = {
      stars: '5',
      description: 'Habitación moderna, amplia con todos los servicios',
      price: 100
    }
    await sequelize.sync({ force: true })
    await request.post('/user/register').send(user)
    await request.post('/room').send(room)
  })

  describe('POST /reservation', () => {
    it('should respond with a 201 status code and return new reservation', async () => {
      const response = await request.post('/reservation').send(reservation)
      expect(response.statusCode).toBe(201)
      expect(response.type).toBe('application/json')
      expect(response.body).toHaveProperty('id', 1)
    })

    it('should respond with a 400 status code if the reservation is incomplete', async () => {
      const response = await request.post('/reservation').send({})
      expect(response.statusCode).toBe(400)
      expect(response.type).toBe('application/json')
      expect(response.body.error).toBe('Invalid reservation')
    })
  })

  describe('PUT /reservation/:id', () => {
    it('should respond with a 200 status code and change status reservation', async () => {
      const response = await request.put('/reservation/1').send({ status: 'pagado' })
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body.status).toBe('pagado')
    })

    it('should respond with a 404 status code if id is invalid', async () => {
      const response = await request.put('/reservation/11')
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('Reservation not found')
    })
  })

  describe('GET /reservation', () => {
    it('should respond with a 200 status code and return reservations array ', async () => {
      const response = await request.get('/reservation')
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(1)
    })

    it('should respond with a 200 status code and content User & Rooms property ', async () => {
      const response = await request.get('/reservation')
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body[0].User).toBeDefined()
      expect(response.body[0].Rooms).toBeDefined()
    })
  })
})
