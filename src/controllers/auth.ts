import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { CustomError } from '../middlewares/errorHandler'
import { pool } from '../dbConn'

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, firstName, lastName } = req.body

  if (!email || !password || !firstName || !lastName) return next(new CustomError(400, 'Missing credentials!'))

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    if (user.rows.length > 0) return next(new CustomError(401, 'User already exist!'))

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await pool.query(
      `INSERT INTO users (email, password, firstName, lastName) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [email, hashedPassword, firstName, lastName]
    )

    return res.status(200).send({
      message: 'User registered successfully.',
      data: null,
      success: true
    })
  } 
  catch (err) {
    console.error(err)
    next(err)
  }
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  console.log(req.body)
  if (!email || !password) throw new CustomError(400, 'email or password is incorrect')

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    console.log(user.rows)
    if (user.rows.length === 0) return next(new CustomError(404, 'Invalid Credentials!'))
     

    const passwordMatch = await bcrypt.compare(req.body.password, user.rows[0].password)
    if (!passwordMatch) return next(new CustomError(404, 'Invalid Credentials!'))

    const payload = { userId: user.rows[0].id }      
    const secret = process.env.JWT_SECRET as string

    const token = jwt.sign(payload, secret, { expiresIn: '1d' })

    res
      .cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000    //1 day
      })
      .status(200)
      .send({
        message: 'User logged in successfully.',
        data: payload,
        success: true
      })
  } 
  catch (err) {
    console.log(err)
    next(err)
  }
}

const validToken = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send({
    message: 'Token is Valid!',
    data: null,
    success: true
  })
}

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await pool.query('SELECT * FROM users')
    res.status(200).send({
      message: 'Users selected!',
      data: users.rows,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).clearCookie('auth_token', { httpOnly: true }).send({
      message: 'User logged out successfully.',
      data: null,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

export { registerUser, loginUser, validToken, getUsers, logout }