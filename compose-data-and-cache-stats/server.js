import express from 'express'
import cors from 'cors'

import getBook from './api/get-book.js'
import queryBooks from './api/query-books.js'
import createBook from './api/create-book.js'
import deleteBook from './api/delete-book.js'
import updateBook from './api/update-book.js'
import getStats from './api/get-book-stats.js'
import nukeStats from './api/nuke-stats.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/stats', getStats)
app.delete('/api/stats', nukeStats)

app.get('/api/books/_query', queryBooks)
app.post('/api/books', createBook)

app.get('/api/books/:id', getBook)

app.delete('/api/books/:id', deleteBook)
app.put('/api/books/:id', updateBook)

app.get('/', function (req, res) {
  res.send({ name: 'Quickstart Node Express JS Compose Data and Cache Stats', ok: true })
})

app.listen(3000)
