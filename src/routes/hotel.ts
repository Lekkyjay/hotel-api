import express from 'express'
import { createCity, createCountry } from '../controllers/hotel'

const router = express.Router()

// api/hotel/country
router.get('/country', createCountry)

// api/hotel/city
router.get('/city', createCity)

export default router
