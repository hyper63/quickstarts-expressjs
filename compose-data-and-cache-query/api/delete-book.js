import { connect } from 'hyper-connect'
import { propOr, toLower } from 'ramda'
import slugify from 'slugify'

const slug = (item) => toLower(slugify(item))

const hyper = connect(process.env.HYPER)

const always = (v) => () => v

const errorResponse = (err) => {
  return { ok: false, msg: err.msg ? err.msg : 'none' }
}

const getBookCountFromCache = () => {
  console.log('create-book getBookCountFromCache!')

  return hyper.cache.get('stats').then((result) => {
    console.log(' hyper.cache.get(stats) result', 'result:', result)
    return result.ok === false
      ? Promise.reject('stats')
      : propOr(null, 'bookCount', result)
  })
}

const decrementCacheBookCount = (cnt) =>
  hyper.cache.set('stats', { bookCount: cnt < 1 ? 0 : cnt - 1 })

const deleteDocFromDB = (id) =>
  hyper.data.remove(id).then((res) => {
    console.log('deleteDocFromDB res', res)
    return res.ok ? { ok: true, id } : Promise.reject(res)
  })

const deleteQueryDocFromCache = (doc) =>
  hyper.cache.remove(`author-${slug(doc.author)}-${doc.id}`)

const deleteDocFromCache = (id) => hyper.cache.remove(id)

const getDocFromDB = (id) =>
  hyper.data
    .get(id)
    .then((doc) => (doc.ok === false ? Promise.reject(id) : doc))

const remove = (id) =>
  Promise.resolve(id)
    .then(getDocFromDB)
    .then(deleteQueryDocFromCache)
    .then(always(id), always(id))
    .then(deleteDocFromCache)
    .then(always(id), always(id))
    .then(getBookCountFromCache)
    .then(decrementCacheBookCount)
    .then(always(id), always(id))
    .then(deleteDocFromDB)
    .catch(errorResponse)

export default async function (req, res) {
  console.log('deleting book: ', req.params.id)
  const book = await remove(req.params.id)
  return res.send(book)
}
