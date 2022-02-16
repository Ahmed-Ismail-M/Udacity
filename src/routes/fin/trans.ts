import express from 'express';

const trans = express.Router()
trans.get('/', (req, res) => {
  res.send('all transactions')
})

export default trans;
