import { Request, Response } from 'express'
import { client } from '../dbConn'

const users = async (req: Request, res: Response) => {
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS users ( 
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL
    )`)
    res.status(201).send('Users table created successfully!')
  } 
  catch (error: any) {
    console.error(error.stack)
    res.status(500).send('Users table creation failed!')
    return false
  } 
  finally {
    await client.end()
  }
}

export { users }
