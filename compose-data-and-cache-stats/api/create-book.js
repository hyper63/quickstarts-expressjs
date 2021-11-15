import { connect } from 'hyper-connect'
import { propOr } from 'ramda'
const hyper = connect(process.env.HYPER)

const passValueThru = (x) => {
  console.log('passValueThru x', x)
  return x
}

const always = (v) => () => v

const errorResponse = (err) => {
  return { ok: false, msg: err.msg ? err.msg : 'none' }
}

const addDocToDB = (doc) =>
  hyper.data.add(doc).then((res) => {
    console.log('addDocToDB res', res)
    return res.ok ? { ok: true, id: doc.id } : Promise.reject(res)
  })

const addDocToCache = (doc) =>
  hyper.cache.add(doc.id, doc, '1d').then((res) => {
    console.log('addDocToCache res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const getBookCountFromCache = () => {
  console.log('create-book getBookCountFromCache!')

  return hyper.cache.get('stats').then((result) => {
    console.log(' hyper.cache.get(stats) result', 'result:', result)
    return result.ok === false
      ? Promise.reject('stats')
      : propOr(null, 'bookCount', result)
  })
}

const incrementCacheBookCount = () =>
  getBookCountFromCache().then(
    (currentBookCount) =>
      hyper.cache.set('stats', { bookCount: currentBookCount + 1 }, '1d'),
    passValueThru,
  )

// cacheAdd - Add to data and cache and then increment bookCount stats
const cacheAdd = (doc) =>
  Promise.resolve(doc)
    .then(addDocToDB)
    .then(always(doc))
    .then(addDocToCache)
    .then(incrementCacheBookCount)
    .then(() => ({ ok: true, id: doc.id }))
    .catch(errorResponse)

export default async function (req, res) {
  const result = await cacheAdd(req.body)
  return res.send(result)
}
