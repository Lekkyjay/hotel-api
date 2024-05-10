import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomError } from './errorHandler'


export const verifyToken = (req: Request, res: Response, next: NextFunction) => {  
  const token = req.cookies.auth_token
  if (!token) return next(new CustomError(401, 'You are not authenticated!'))

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return next(new CustomError(403, 'Token is not valid!'))
    next()
  })
}
