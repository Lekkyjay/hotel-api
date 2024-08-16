import express from 'express'
import upload from '../utils/multer'
import { createMyHotel } from '../controllers/myhotel'
import { verifyToken } from '../middlewares/auth'

const router = express.Router()

router.post('/', verifyToken, upload.array('imageFiles', 6), createMyHotel)

export default router
