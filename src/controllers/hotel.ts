import { NextFunction, Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import { pool } from '../dbConn'

const getTypes = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const types = await pool.query('SELECT * FROM types')
    
    res.status(200).send({
      message: 'Hotel types gotten successfully',
      data: types.rows,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

const getFacilities = async (req: Request, res: Response, next: NextFunction) => {
  try {    
    const facilities = await pool.query('SELECT * FROM facilities')
    
    res.status(200).send({
      message: 'Hotel facilities gotten successfully',
      data: facilities.rows,
      success: true
    })
  } 
  catch (error) {
    console.log(error)
    next(error)
  }  
}

const createHotel = async (req: Request, res: Response, next: NextFunction) => { 

  try {    
    const imgFiles = req.files as Express.Multer.File[]
    const { hotelData } = req.body

    const uploadPromises = imgFiles.map(async (img) => {
      const b64 = Buffer.from(img.buffer).toString('base64')
      let dataURI = `data:${img.mimetype};base64,${b64}`
      const result = await cloudinary.uploader.upload(dataURI)
      return result.url
    })

    const imgUrls = await Promise.all(uploadPromises)
    
    await pool.query(`CALL create_country_sp($1)`, [hotelData])
    
    res.status(200).send({
      message: 'Country created successfully!',
      data: null,
      success: true
    })
  } 
  catch (error) {
    console.log('Error creating hotel', error)
    next(error)
  }  
}

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

export { createCountry, createCity, createHotel, getTypes, getFacilities }
