import path from 'path'
import sharp from 'sharp'
import express from 'express'
import fs from 'fs'

async function resizeImage (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> {
  // define needed paramters
  const neededParams: string[] = ['filename', 'height', 'width']
  // if the paramters are provided
  if (neededParams.every((key) => Object.keys(req.query).includes(key))) {
    // define the values and parse to the correct type
    const fileName: string = req.query.filename as string
    const height: number = parseInt(req.query.height as string) as number
    const width: number = parseInt(req.query.width as string) as number
    // get the required image from assets path
    const inputPath: string = path.join('assets', fileName)
    const resizeDir: string = 'thumb'
    // get the image name to change the output name
    const imagename: string = path.parse(fileName).name
    // define output path /thumb and rename the image according to the required size
    const output: string = path.join(
      process.cwd(),
      resizeDir,
      fileName.replace(imagename, imagename + '-' + height + 'x' + width)
    )
    // if the output already exists return it
    if (fs.existsSync(output)) {
      return res.status(200).sendFile(output)
    }
    // else will generate new one and save to output directory
    try {
      // create thum director if dosnt exists
      createDir(path.join(process.cwd(), resizeDir))
      await sharp(inputPath)
        .resize({
          width: width,
          height: height
        })
        .toFile(output)
        .then(() => {
          res.status(200).sendFile(output)
        })
        .catch((err) => {
          res.status(500).send(`${err}`)
        })
    } catch (error) {
      res.status(500).send(`${error}`)
    }
    // if the paramters provided dont satisfy the needed parameters
  } else {
    // resend and message asking for them
    res.send(`Post image info with parameters ${neededParams}`)
  }
}
function createDir (dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export { resizeImage, createDir }
