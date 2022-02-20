import express from 'express'
import imgResize from './api/img'

const routes: express.Router = express.Router()
routes.get('/', (req: express.Request, res: express.Response): void => {
  res.status(200).send('Hi from main')
})
routes.use('/resize', imgResize)

export default routes
