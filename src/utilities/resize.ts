import path from 'path'
import sharp from 'sharp'
import ImgProps from './interfaces'
import express from 'express'
import fs from 'fs'
async function resizeImage (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> {
  const neededParams = ['filename', 'height', 'width']

  if (neededParams.every((key) => Object.keys(req.query).includes(key))) {
    const newImageProps: ImgProps = {
      imageName: req.query.filename as string,
      height: parseInt(req.query.height as string) as number,
      width: parseInt(req.query.width as string) as number
    }
    const dir: string = 'thumb'
    const imagename: string = path.parse(newImageProps.imageName).name
    const extension: string = path.parse(newImageProps.imageName).ext
    const output: string = path.join(
      __dirname,
      dir,
      `${imagename}_${newImageProps.height}x${newImageProps.width}${extension}`
    )
    try {
      createDir(path.join(__dirname, dir))
      await sharp(newImageProps.imageName)
        .resize({
          width: newImageProps.width,
          height: newImageProps.height
        })
        .toFile(output)
        .then(() => {
          res.sendFile(output)
        })
        .catch((err) => {
          res.send(`${err}`)
        })
    } catch (error) { res.send(`${error}`) }
  } else {
    res.send(`Post image info with parameters ${neededParams}`)
  }
}
function createDir (dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export default resizeImage
