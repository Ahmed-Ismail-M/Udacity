import express from 'express'
import sharp from 'sharp'
import resizeImage from '../../utilities/resize'
import path from 'path'

const imgResize = express.Router()
imgResize.get('/', resizeImage)
imgResize.get('/test', async (req, res) => {
  const img: string = req.query.filename as string
  const imagename: string = path.parse(img).name
  const output: string = img.replace(imagename, `${imagename}_resized`)
  await sharp(img).resize({ width: 3000, height: 300 }).toFile(output)
    .then(() => res.sendFile(output))
    .catch((err) => {
      res.send(`${err}`)
    })
})
export default imgResize
