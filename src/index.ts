
import Express from 'express';

const app = Express()
const port = 8000

app.get('/', (req, res) => {
  res.send('CimaLight.mp4')
  console.log(`A message from ${req.ip} : ${req.query.msg}`)

})

app.listen(port, () => { console.log(`server started at http://localhost:${port}`) })
