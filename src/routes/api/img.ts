import express from 'express'
import { resizeImage, createDir } from '../../utilities/resize'
import { imagePorp } from '../../interfaces/image'
import { asyncWrapper } from '../../middlewares/logs'
import path from 'path'
const imgResize = express.Router()
const fs = require('fs')
imgResize.get(
  '/',
  asyncWrapper(
    async (req: express.Request, res: express.Response, next: Function) => {
      // define needed paramters
      const neededParams: string[] = ['filename', 'height', 'width']
      // if the paramters are provided
      if (neededParams.every((key) => Object.keys(req.query).includes(key))) {
        // define the values and parse to the correct type
        const filename = req.query.filename as string
        // get the image name to change the output name
        const imagename: string = path.parse(filename).name
        const resizeDir: string = 'thumb'
        const height: number = parseInt(req.query.height as string) as number
        const width: number = parseInt(req.query.width as string) as number
        const inputPath: string = path.join('assets', filename)
        // define output path /thumb and rename the image according to the required size
        const output: string = path.join(
          process.cwd(),
          resizeDir,
          filename.replace(imagename, imagename + '-' + height + 'x' + width)
        )
        const imgprop: imagePorp = {
          input: inputPath,
          height: height,
          width: width,
          output: output
        }

        // if the output already exists return it
        if (fs.existsSync(output)) {
          return res.status(200).sendFile(output)
        }
        // else will generate new one and save to output directory
        try {
          // create thum director if dosnt exists
          createDir(path.join(process.cwd(), resizeDir))
          const resized: string = await resizeImage(imgprop)
          res.status(200).sendFile(resized)
        } catch (error) {
          res.status(500).send(`${error}`)
        }
        // if the paramters provided dont satisfy the needed parameters
      } else {
        // resend a message asking for paramaterers
        res.status(500).send(`Post image info with parameters ${neededParams}`)
      }
    }
  )
)
export default imgResize
