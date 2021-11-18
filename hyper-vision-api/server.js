import express from 'express'
import cors from 'cors'

import getDataFromDB from './api/data/get.js'
import addDataToDB from './api/data/create.js'
import updateDataToDB from './api/data/update.js'
import deleteDataFromDB from './api/data/delete.js'
// import updateDataToDB from './api/data/update.js'
// import searchByAuthor from './api/search-by-author.js'

// import getBookFromSearch from './api/get-book-search.js'
const app = express()

app.use(cors())
app.use(express.json())

// app.get('/api/books/_search', searchByAuthor)

app.post('/api/data', addDataToDB)
app.get('/api/data/:id', getDataFromDB)
app.put('/api/data/:id', updateDataToDB)
app.delete('/api/data/:id', deleteDataFromDB)


app.get('/', function (req, res) {
  res.send({
    name: 'Hyper Vision API',
    ok: true,
  })
})

const PORT = 3001

app.listen(PORT, null, () => console.log(`hyper-vision-api is listening on PORT: ${PORT}`))
