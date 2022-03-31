import express from 'express'
import cors from 'cors'

//import postToTarget from './target/post.js'

const app = express()

app.use(cors())
//app.post('/target', express.json(), verifySignature, postToTarget)

app.get('/', function (req, res) {
  res.send({
    name: 'Quickstart Node Express JS storage-target',
    ok: true,
  })
})
app.listen(3003)
