const { verifyToken } = require('../utils/handleJWT')

const checkJwt = (req, res, next) => {
  try {
    const jwtByUser = req.headers.authorization || ''
    const jwt = jwtByUser.split(' ').pop()
    const isUser = verifyToken(`${jwt}`)
    if (!isUser) {
      res.status(401).send({ error: 'JWT malformed or invalid' })
    } else {
      req.user = isUser
      next()
    }
  } catch (e) {
    res.status(400).send({ error: 'Session Invalid' })
  }
}

module.exports = { checkJwt }
