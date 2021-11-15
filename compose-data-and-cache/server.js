import express from 'express'
import cors from 'cors'

import getBook from './api/get-book.js'
import createBook from './api/create-book.js'
import deleteBook from './api/delete-book.js'
import updateBook from './api/update-book.js'
import strangeness from './api/strangeness.js'
const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/books', createBook)
app.get('/api/books/:id', getBook)
app.delete('/api/books/:id', deleteBook)
app.put('/api/books/:id', updateBook)

app.get('/', function (req, res) {
  res.send({ name: 'Quickstart Node Express JS Cache', ok: true })
})

app.listen(3000)
