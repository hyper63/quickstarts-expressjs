import { connect } from 'hyper-connect'
import { propOr } from 'ramda'
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

const decrementCacheBookCount = () =>
  getBookCountFromCache().then((cnt) =>
    hyper.cache.set('stats', { bookCount: cnt < 1 ? 0 : cnt - 1 }, '1d'),
  )

const deleteDocFromDB = (id) =>
  hyper.data.remove(id).then((res) => {
    console.log('deleteDocFromDB res', res)
    return res.ok ? { ok: true, id } : Promise.reject(res)
  })

const deleteDocFromCache = (id) =>
  hyper.cache.remove(id).then((res) => {
    console.log('deleteDocFromCache res', res)
    return res.ok ? { ok: true, id } : Promise.reject(res)
  })

const remove = (id) =>
  Promise.resolve(id)
    .then(deleteDocFromDB)
    .then(always(id))
    .then(deleteDocFromCache)
    .then(always(id))
    .then(decrementCacheBookCount)
    .then(() => ({ ok: true, id }))
    .catch(errorResponse)

export default async function (req, res) {
  console.log('deleting book: ', req.params.id)
  const book = await remove(req.params.id)
  return res.send(book)
}
