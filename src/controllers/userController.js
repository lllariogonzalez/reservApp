const { User } = require('../utils/database')
const { encrypt, compare } = require('../utils/handleBycrypt')

const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(404).json({ error: 'User not found' })
    const checkPassword = await compare(password, user.password)
    checkPassword
      ? res.json(user)
      : res.status(409).json({ error: 'Invalid password' })
  } catch (error) {
    next(error)
  }
}

const userRegister = async (req, res, next) => {
  try {
    const { fullname, dni, email, password } = req.body
    if (!fullname || !dni || !email || !password) return res.status(400).json({ error: 'Information is missing or incomplete' })
    const passwordHash = await encrypt(password)
    const registerUser = await User.create({
      fullname,
      email,
      dni,
      password: passwordHash
    })
    res.status(201).json(registerUser)
  } catch (error) {
    next(error)
  }
}

module.exports = { userLogin, userRegister }
