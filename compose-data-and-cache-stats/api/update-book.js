import { connect } from 'hyper-connect'
const hyper = connect(process.env.HYPER)

const passValueThru = (x) => x

const updateDocToDB = (doc) =>
  hyper.data.update(doc.id, doc).then((res) => {
    console.log('updateDocToDB res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const updateDocToCache = (doc) =>
  hyper.cache.set(doc.id, doc, '1d').then(passValueThru)

const errorResponse = (err) => {
  ok: false, err
}

// cacheUpdate - update doc to data and cache
const cacheUpdate = (doc) =>
  Promise.resolve(doc)
    .then(updateDocToDB)
    .then(updateDocToCache, passValueThru)
    .catch(errorResponse)

export default async function (req, res) {
  console.log('update-book', req.body)

  const result = await cacheUpdate(req.body)
  return res.send(result)
}
