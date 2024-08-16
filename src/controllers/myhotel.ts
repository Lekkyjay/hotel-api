import { NextFunction, Request, Response } from 'express'
import cloudinary from '../utils/cloudinary'
import { pool } from '../dbConn'

const createMyHotel = async (req: Request, res: Response, next: NextFunction) => { 
  try {    
    const imgFiles = req.files as Express.Multer.File[]

    const uploadPromises = imgFiles.map(async (img) => {
      const b64 = Buffer.from(img.buffer).toString('base64')
      let dataURI = `data:${img.mimetype};base64,${b64}`
      const result = await cloudinary.uploader.upload(dataURI, { folder: 'Hotel-Images' })
      return result.url
    })

    const imgUrls = await Promise.all(uploadPromises)
    const lastUpdated = new Date()
    const userId = req.userId

    const { name, city, country, description, type, adultCount, childCount, facilities, pricePerNight, starRating } = req.body


    const query = `INSERT INTO hotels (name, city, country, description, type, adultcount, childcount, facilities, price_pernight,
      star_rating, img_urls, lastupdated, user_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`

    const params = [name, city, country, description, type, adultCount, childCount, facilities, pricePerNight, starRating, imgUrls, lastUpdated, userId]

    const newHotel = await pool.query(query, params)

    res.status(200).send({
      message: 'Hotel created successfully!',
      data: newHotel.rows[0],
      success: true
    })
  } 
  catch (error) {
    console.log('Error creating hotel....:', error)
    next(error)
  }  
}

export { createMyHotel }
