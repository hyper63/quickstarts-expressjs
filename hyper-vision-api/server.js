import express from 'express'
import cors from 'cors'

import getDataFromDB from './api/data/get.js'
import addDataToDB from './api/data/create.js'
import updateDataToDB from './api/data/update.js'
import deleteDataFromDB from './api/data/delete.js'
import listDataFromDB from './api/data/list.js'
import queryDataFromDB from './api/data/query.js'
import queryDataFromCache from './api/cache/query.js'
import listDataDocTypes from './api/data/list-data-doc-types.js'
import listDataFilterKeys from './api/data/list-data-filter-keys.js'
import listDataFilterValues from './api/data/list-data-filter-values.js'
import addDataToSearch from './api/search/create.js'
import getDataFromSearch from './api/search/get.js'

const app = express()

app.use(cors())
app.use(express.json())

// app.get('/api/books/_search', searchByAuthor)

app.get('/api/data/docfiltervalues', listDataFilterValues)
app.get('/api/data/docfilterkeys', listDataFilterKeys)
app.get('/api/data/doctypes', listDataDocTypes)
app.get('/api/data', listDataFromDB)
app.get('/api/data/_query', queryDataFromDB)
app.post('/api/data', addDataToDB)
app.get('/api/data/:id', getDataFromDB)
app.put('/api/data/:id', updateDataToDB)
app.delete('/api/data/:id', deleteDataFromDB)

app.get('/api/cache/_query', queryDataFromCache)

app.post('/api/search', addDataToSearch)
app.get('/api/search/:id', getDataFromSearch)

app.get('/', function (req, res) {
  res.send({
    name: 'Hyper Vision API',
    ok: true,
  })
})

const PORT = 3000

app.listen(PORT, null, () =>
  console.log(`hyper-vision-api is listening on PORT: ${PORT}`),
)
