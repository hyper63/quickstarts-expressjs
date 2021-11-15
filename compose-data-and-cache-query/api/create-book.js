import { connect } from 'hyper-connect'
import { propOr, toLower } from 'ramda'
import slugify from 'slugify'

const hyper = connect(process.env.HYPER)

const slug = (item) => toLower(slugify(item))

const always = (v) => () => v

const passValueThru = (x) => {
  console.log('passValueThru x', x)
  return x
}

const errorResponse = (err) => {
  return { ok: false, msg: err.msg ? err.msg : 'none' }
}

const addDocToDB = (doc) =>
  hyper.data.add(doc).then((res) => {
    console.log('addDocToDB res', res)

    // => { ok: true, id: 'book-5' }
    return res.ok ? { ok: true, id: doc.id } : Promise.reject(res)
  })

const addDocToCache = (doc) =>
  hyper.cache.add(doc.id, doc).then((res) => {
    console.log('addDocToCache res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const addAuthorBookDocToCache = (doc) =>
  hyper.cache.add(`author-${slug(doc.author)}-${doc.id}`, doc).then((res) => {
    console.log('addAuthorBookDocToCache res', res)
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
      hyper.cache.set('stats', { bookCount: currentBookCount + 1 }),
    passValueThru,
  )

// cacheAdd - Add to database and cache to support search by author, then cache doc and then increment book count stats
const cacheAdd = (doc) =>
  Promise.resolve(doc)
    .then(addDocToDB)
    .then(always(doc))
    .then(addAuthorBookDocToCache)
    .then(addDocToCache)
    .then(incrementCacheBookCount)
    .then(() => ({ ok: true, id: doc.id }))
    .catch(errorResponse)

export default async function (req, res) {
  const result = await cacheAdd(req.body)
  return res.send(result)
}
