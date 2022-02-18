import path from 'path'
import sharp from 'sharp'
import express from 'express'
import fs from 'fs'

async function resizeImage (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> {
  const neededParams: string[] = ['filename', 'height', 'width']
  if (neededParams.every((key) => Object.keys(req.query).includes(key))) {
    const fileName: string = req.query.filename as string
    const height: number = parseInt(req.query.height as string) as number
    const width: number = parseInt(req.query.width as string) as number
    const inputPath : string = path.join('assets', fileName)
    const resizeDir: string = 'thumb'
    const imagename: string = path.parse(fileName).name
    const extension: string = path.parse(fileName).ext
    const output: string = path.join(
      __dirname,
      resizeDir,
      `${imagename}_${height}x${width}${extension}`
    )
    try {
      createDir(path.join(__dirname, resizeDir))
      await sharp(inputPath)
        .resize({
          width: width,
          height: height
        })
        .toFile(output)
        .then(() => {
          res.sendFile(output, 'Your img resized !!')
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

export { resizeImage, createDir }
