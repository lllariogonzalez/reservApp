/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest')
const app = require('../src/app')
const { sequelize } = require('../src/utils/database')

const request = supertest(app)

describe('Room Routes', () => {
  const room = {
    stars: '5',
    description: 'Habitación moderna, amplia con todos los servicios',
    price: 100
  }

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  describe('POST /room', () => {
    it('should respond with a 201 status code and return new room', async () => {
      const response = await request.post('/room').send(room)
      expect(response.statusCode).toBe(201)
      expect(response.type).toBe('application/json')
      expect(response.body.stars).toBe('5')
    })

    it('should respond with a 400 status code if room incomplete', async () => {
      const response = await request.post('/room').send({})
      expect(response.statusCode).toBe(400)
      expect(response.type).toBe('application/json')
      expect(response.body.error).toBe('Invalid Room or incomplete')
    })
  })

  describe('GET DELETE /room', () => {
    it('should respond with a 200 status code and return rooms array', async () => {
      const response = await request.get('/room')
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(1)
      expect(response.body[0].stars).toBe('5')
    })

    it('DELETE should respond with a 200 status code and delete room id', async () => {
      const response = await request.delete('/room/1')
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Room deleted')
    })

    it('should respond with a 200 status code and return the empty rooms array ', async () => {
      const response = await request.get('/room')
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body).toBeInstanceOf(Array)
      expect(response.body).toHaveLength(0)
    })
  })
})
