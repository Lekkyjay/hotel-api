import express from 'express'
import upload from '../utils/multer'
import { createCity, createCountry, createHotel, getFacilities, getTypes } from '../controllers/hotel'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

// api/hotel/country
router.get('/country', createCountry)

// api/hotel/city
router.get('/city', createCity)

router.get('/types', getTypes)
router.get('/facilities', getFacilities)
router.post('/', verifyToken, upload.array('imgFiles', 6), createHotel)

export default router
