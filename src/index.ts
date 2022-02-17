
import Express from 'express';
import routes from './routes/index'
import { logger } from './middlewares/wrappers';
import errHandler from './middlewares/errors';

const app = Express()
const port = 8000
app.use(logger)
app.use('/api', routes)
app.use(errHandler)
app.listen(port, () => { console.log(`server started at http://localhost:${port}`) })
