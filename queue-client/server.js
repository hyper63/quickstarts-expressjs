import express from 'express'
import cors from 'cors'


import postToQueue from './api/post-to-queue.js'
// import getBookFromSearch from './api/get-book-search.js'

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/queue', postToQueue)
//app.get('/api/queue/:TODO:???', getBookFromSearch)

app.get('/', function (req, res) {
  res.send({
    name: 'Quickstart Node Express JS queue-client',
    ok: true,
  })
})

app.listen(3001)