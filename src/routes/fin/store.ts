import express from 'express';

const store = express.Router()
store.get('/', (req, res) => {
  res.send('all store')
})

export default store;
