import express from 'express'
import cors from 'cors'

import getBookFromDB from './api/get-book.js'
import createBook from './api/create-book.js'
import deleteBook from './api/delete-book.js'
import updateBook from './api/update-book.js'
import searchByAuthor from './api/search-by-author.js'

import getBookFromSearch from './api/get-book-search.js'
const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/books/_search', searchByAuthor)

app.post('/api/books', createBook)
app.get('/api/books/:id', getBookFromSearch)
app.delete('/api/books/:id', deleteBook)
app.put('/api/books/:id', updateBook)

app.get('/', function (req, res) {
  res.send({
    name: 'Hyper Vision API',
    ok: true,
  })
})

app.listen(3333)
