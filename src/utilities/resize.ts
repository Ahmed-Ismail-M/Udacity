import sharp from 'sharp'
import fs from 'fs'
import { imagePorp } from '../interfaces/image'

async function resizeImage (imgprop: imagePorp): Promise<string> {
  // get the required image from assets path

  return new Promise((resolve, reject) => {
    sharp(imgprop.input)
      .resize({
        width: imgprop.width,
        height: imgprop.height
      })
      .toFile(imgprop.output)
      .then(() => resolve(imgprop.output))
      .catch((error) => reject(error))
  })
}
function createDir (dir: string): void {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

export { resizeImage, createDir }
