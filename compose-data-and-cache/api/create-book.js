import { connect } from 'hyper-connect'
const hyper = connect(process.env.HYPER)

const passValueThru = (x) => x

const addDocToDB = (doc) =>
  hyper.data.add(doc).then((res) => {
    console.log('addDocToDB res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const addDocToCache = (doc) =>
  hyper.cache.add(doc.id, doc, '1d').then(passValueThru)

const errorResponse = (err) => {
  ok: false, err
}

// cacheAdd - Add to data and cache
const cacheAdd = (doc) =>
  Promise.resolve(doc)
    .then(addDocToDB)
    .then(addDocToCache, passValueThru)
    .catch(errorResponse)

export default async function (req, res) {
  //console.log('create-book', req.body)

  const result = await cacheAdd(req.body)
  return res.send(result)
}
