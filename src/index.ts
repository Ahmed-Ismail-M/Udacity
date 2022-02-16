
import Express from 'express';
import routes from './routes/index'

const app = Express()
const port = 8000
app.use('/fin', routes)

app.listen(port, () => { console.log(`server started at http://localhost:${port}`) })
