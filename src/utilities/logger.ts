import express from 'express'

const logger = (req: express.Request, res: express.Response, next: Function): void => {
  const url = req.url
  const vipd = req.ip
  const host = req.hostname
  console.log(`${host} : ${url} has been visited by ${vipd}`)
  next()
}
export default logger;
