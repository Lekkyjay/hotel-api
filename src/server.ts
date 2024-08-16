import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler'
import helloRoutes from './routes/hello'
import tableRoutes from './routes/tables'
import authRoutes from './routes/auth'
import hotelRoutes from './routes/hotel'
import myHotelRoutes from './routes/myhotel'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ 
  origin: process.env.CLIENT_URL,
  credentials: true 
}))
app.use(morgan('tiny'))

app.use('/api/hello', helloRoutes)
app.use('/api/table', tableRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/hotel', hotelRoutes)
app.use('/api/myhotel', myHotelRoutes)


//whenever u pass any arg to the next fn, express will automatically forward it as an error to ur global errorHandler
app.all('*', (req, res, next) => {
  const err = new Error(`page ${req.originalUrl} not found!`)
  next(err)
})

app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
