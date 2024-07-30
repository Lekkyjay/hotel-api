import { NextFunction, Request, Response } from 'express'
import { pool } from '../dbConn'

const createCountry = async (req: Request, res: Response, next: NextFunction) => {
  const { countryName } = req.body

  try {    
    await pool.query(`CALL create_country_sp($1)`, [countryName])
    
    res.status(200).send({
      message: 'Country created successfully!',
      data: null,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

const createCity = async (req: Request, res: Response, next: NextFunction) => {
  const countryId = parseInt(req.body.countryId)
  const { cityName } = req.body

  try {    
    await pool.query(`CALL create_city_sp($1, $2)`, [ countryId, cityName ])
    
    res.status(200).send({
      message: 'City created successfully!',
      data: null,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

export { createCountry, createCity }
