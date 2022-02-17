import path from 'path';
import sharp from 'sharp'
import ImgProps from './interfaces'
import express from 'express';

async function resizeImage (req: express.Request, res: express.Response, next: Function) :Promise<void> {
  const neededParams = ['filename', 'height', 'width'];

  if (neededParams.every(key => Object.keys(req.query).includes(key))) {
    const newImageProps : ImgProps = {
      imageName: req.query.filename as string,
      height: parseInt(req.query.height as string) as number,
      width: parseInt(req.query.width as string) as number
    }

    const imagename: string = path.parse(newImageProps.imageName).name
    const extension: string = path.parse(newImageProps.imageName).ext
    const output: string = path.join(__dirname, 'thumbnail', `${imagename}_${newImageProps.height}x${newImageProps.width}${extension}`)
    await sharp(newImageProps.imageName).resize({
      width: newImageProps.width,
      height: newImageProps.height
    }).toFile(output)
      .then(() => { return res.send(`the image has been resized successfully and saved in ${output}`) })
      .catch((err) => { return res.send(`${err}`) });
  } else {
    res.send(`Post image info with parameters ${neededParams}`)
  }
  next()
}

export default resizeImage
