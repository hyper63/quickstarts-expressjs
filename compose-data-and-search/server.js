import express from 'express'
import cors from 'cors'

import getBook from './api/get-book.js'
import createBook from './api/create-book.js'
import deleteBook from './api/delete-book.js'
import updateBook from './api/update-book.js'
import searchByAuthor from './api/search-by-author.js'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/books/_search', searchByAuthor)

app.post('/api/books', createBook)
app.get('/api/books/:id', getBook)
app.delete('/api/books/:id', deleteBook)
app.put('/api/books/:id', updateBook)


app.get('/', function (req, res) {
  res.send({ name: 'Quickstart Node Express JS Compose Data and Search', ok: true })
})

app.listen(3001)
