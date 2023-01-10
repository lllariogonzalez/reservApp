const { sign, verify } = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET || 'token.01010101'

const generateToken = (id) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: '2h'
  })
  return jwt
}

const verifyToken = (jwt) => {
  try {
    const user = verify(jwt, JWT_SECRET)
    return user
  } catch (error) {
    return null
  }
}

module.exports = { generateToken, verifyToken }
