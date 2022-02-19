import Express from 'express'
import routes from './routes/index'
import { logger } from './middlewares/logs'
import errHandler from './middlewares/errors'
import path from 'path'

const app = Express()
const port: number = 8000
const staticCashe = Express.static(path.join(process.cwd(), 'assets'), {
  maxAge: 90000000
})
const middleware = [staticCashe, logger, Express.json()]
app.use(middleware)
app.use('/api', routes)
app.use(errHandler)
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
module.exports = app
// export function makeServer () {
//   const express = require('express');
//   const app = express();
//   app.get('/', function (req: Express.Request, res: Express.Response) {
//     res.status(200).send('ok');
//   });
//   const server = app.listen(3000, function () {
//     const port = server.address().port;
//     console.log('Example app listening at port %s', port);
//   });
//   return server;
// }
