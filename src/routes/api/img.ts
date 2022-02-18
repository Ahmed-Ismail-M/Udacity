import express from 'express'
import { resizeImage } from '../../utilities/resize'

const imgResize = express.Router()
imgResize.get('/', resizeImage)
export default imgResize
