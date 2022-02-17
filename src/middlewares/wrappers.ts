import express from 'express'

export const logger = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  const url = req.url
  const vipd = req.ip
  const host = req.hostname
  const method = req.method
  const body = req.body
  console.log(`${method} ${host}${url} by ${vipd} ${body}`)

  next()
}
// export function asyncWrapper (fn: Function) {
//   return (req: express.Request, res: express.Response, next: Function) => {
//     return Promise.resolve(fn(req))
//       .then((result) => res.send(result))
//       .catch((err) => next(err))
//   }
// }
// // export default { logger, asyncWrapper };
