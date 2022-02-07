import express from 'express'
import cors from 'cors'
import verifySignature from './target/verify-sig.js'
import postToTarget from './target/post.js'

const app = express()

app.use(cors())
app.post('/target', express.json(), verifySignature, postToTarget)
app.listen(3002)
