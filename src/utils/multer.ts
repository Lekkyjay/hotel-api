import multer from 'multer'

// Multer config
export default multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024   //5MB
  }
})
