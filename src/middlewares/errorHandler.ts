import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'

class CustomError extends Error {
  public status: number
  // public message: string

  constructor(status: number, message: string) {
    super(message)
    this.status = status
    this.message = message
    this.stack = process.env.NODE_ENV === "production" ? "" : this.stack
  }
}


function errorHandler(error: any | CustomError, req: Request, res: Response, next: NextFunction) {
  const status = error.status || 500
  const message = error.message || 'We are currently solving a server problem. Please check back later'
  
  //for errors thrown by express itself or 3rd party dependencies (e.g mongoDb, postgres). unexpected errors.
  if (!(error instanceof CustomError)) {
    return res.status(status).send({ 
      message,
      success: false,
      data: null,
      type: 'Standard Error',
      stack: error.stack
    })
  }

  //for custom errors. expected errors. errors with customized messages thrown by us anywhere in the application
  res.status(status).send({ 
    message,
    success: false,
    data: null,
    type: 'Custom Error',
    stack: error.stack
  })
}

export { errorHandler as default, CustomError }
