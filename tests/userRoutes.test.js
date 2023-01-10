/* eslint-disable import/no-extraneous-dependencies */
const supertest = require('supertest')
const app = require('../src/app')
const { sequelize } = require('../src/utils/database')

const request = supertest(app)

describe('User Routes', () => {
  const user = {
    fullname: 'Mario Gonzalez',
    email: 'lllariogonzalez@gmail.com',
    dni: '34499275',
    password: 'tuGerente1234'
  }

  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  describe('POST /user/register', () => {
    it('should respond with a 201 status code and return register user', async () => {
      const response = await request.post('/user/register').send(user)
      expect(response.statusCode).toBe(201)
      expect(response.type).toBe('application/json')
    })

    it('should respond with a 400 status code if user incomplete', async () => {
      const response = await request.post('/user/register').send({})
      expect(response.statusCode).toBe(400)
      expect(response.type).toBe('application/json')
    })
  })

  describe('POST /user/login', () => {
    it('should respond with a 200 status code and return user and token', async () => {
      const response = await request.post('/user/login').send({
        email: 'lllariogonzalez@gmail.com',
        password: 'tuGerente1234'
      })
      expect(response.statusCode).toBe(200)
      expect(response.type).toBe('application/json')
      expect(response.body.user.fullname).toBe('Mario Gonzalez')
      expect(response.body.user.dni).toBe(34499275)
      expect(response.body.token).toBeDefined()
    })

    it('should respond with a 404 status code with user invalid', async () => {
      const response = await request.post('/user/login').send({
        email: 'tugerente@gmail.com',
        password: 'tuGerente1234'
      })
      expect(response.statusCode).toBe(404)
      expect(response.body.error).toBe('User not found')
    })
  })
})
