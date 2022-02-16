import express from 'express';
import trans from './fin/trans'
import store from './fin/store'

const routes = express.Router()
routes.get('/', (req, res) => {
  res.send('Hi from main')
})
routes.use('/trans', trans)
routes.use('/store', store)

export default routes;
