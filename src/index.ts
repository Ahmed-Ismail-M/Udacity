
import Express from 'express';
import routes from './routes/index'
import logger from './utilities/logger';

const app = Express()
const port = 8000
app.use(logger)
app.use('/fin', routes)

app.listen(port, () => { console.log(`server started at http://localhost:${port}`) })
