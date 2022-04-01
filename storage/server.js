import express from 'express'
import cors from 'cors'
import { connect } from 'hyper-connect'
import { pipeline } from 'stream'
import { promisify } from 'util'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import path from 'path'
import { fileURLToPath } from 'url'

/* eslint-disable no-undef */
const hyper = connect(process.env.HYPER)
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(fileUpload())

app.use(cors())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'upload-form.html'))
})

app.get('/download', (req, res) => {
  res.sendFile(path.join(__dirname, 'download-form.html'))
})

app.post('/upload', async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.')
  }

  const file = req.files.myFile
  const uploadResult = await hyper.storage.upload(file.name, file.data)
  console.log('POST /upload', { uploadResult })
  res.redirect('/')
})

app.post('/download', async (req, res) => {
  if (!req.body.filename) {
    return res.status(400).send('No file name found.')
  }

  console.log(`Attempting to download ${req.body.filename}`)
  const filename = req.body.filename

  const streamPipeline = promisify(pipeline)
  // download file and stream to response
  await streamPipeline(await hyper.storage.download(filename), res)
})

app.get('/files/:filename', async (req, res) => {
  console.log(`Attempting GET /files/${req.params.filename}`)
  const streamPipeline = promisify(pipeline)
  // download file and stream to response
  await streamPipeline(await hyper.storage.download(req.params.filename), res)
})

app.listen(3003)
