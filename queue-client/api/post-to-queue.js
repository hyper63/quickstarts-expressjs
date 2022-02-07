import { connect } from 'hyper-connect'

// connecting to any service type named 'default'
const hyper = connect(process.env.HYPER)


const addDocToQueue = (doc) => {
   
     return hyper.queue.enqueue(doc).then((result) => {
       console.log('post-to-queue addDocToQueue result', result)
       return result
     })
   }

const errorResponse = (err) => {
  ok: false, err
}

// queueAdd - Add to data and search
const queueAdd = (doc) =>
  Promise.resolve(doc)
    .then(addDocToQueue)
    .catch(errorResponse)

export default async function (req, res) {

  console.log('post-to-queue req.body', req.body)

  const result = await queueAdd(req.body)
  return res.send(result)
}
