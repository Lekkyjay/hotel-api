import { Request, Response } from 'express'
import { client } from '../dbConn'

const hello = (req: Request, res: Response) => {
  res.status(200).json({ msg: 'Message from the backend: Hello world abc!!! 123!' })
}

const helloDb = async (req: Request, res: Response) => {
  try {
    await client.connect()
    const result = await client.query('SELECT NOW()')
    console.log('current time...........:', result.rows[0])
    res.json(result.rows[0])
  } 
  catch (error) {
    console.log(error)
    res.status(500).send('DB Error')
  }
}

const pgVersion = async (req: Request, res: Response) => {  
  try {
    await client.connect()
    const result = await client.query('SELECT VERSION()')
    res.status(200).send(result.rows[0].version)
  } 
  catch (error: any) {
    console.error(error.stack)
    res.status(500).send('Aiven Error')
  } 
  finally {
    await client.end()
  }
}

const envs = (req: Request, res: Response) => {
  console.log(process.env.PGPORT)
  res.send(process.env.PGPORT)
}

export { hello, helloDb, pgVersion, envs }