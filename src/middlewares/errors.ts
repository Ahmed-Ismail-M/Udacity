import { ErrorRequestHandler } from 'express'

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('uncaught exception', err)
  return res.status(500).send('an unexpected error has occured ')
}

export default errHandler
