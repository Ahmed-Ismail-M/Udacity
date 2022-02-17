import express from 'express';
import resizeImage from '../../utilities/sharp';

const imgResize = express.Router()
imgResize.get('/', resizeImage)

export default imgResize;
