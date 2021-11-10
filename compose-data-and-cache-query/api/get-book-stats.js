/*
We will use the `getBookCountFromCache` function that returns the book count from the cache.  
If the count does not exist, we will query the database using a function called `getBookCountFromDB` 
  to get a book count followed by seeding the cache with this book count using 
  a function called `setBookCountToCache`.   
*/

import { connect } from "hyper-connect";
import { length, propOr } from 'ramda'

const hyper = connect(process.env.HYPER);

const passValueThru = (x) => {
  console.log('passValueThru x:', x)
  return x
}

const errorResponse = (err) => {
  ok: false, err
}

const query = ({ type, limit }) => hyper.data.query({ type }, { limit })

const setBookCountToCache = (bookCount) =>
  hyper.cache.set('stats', {
    bookCount,
  })

const getBookCountFromDB = () => {
  const type = 'book'
  const limit = 1000
  console.log('getting book count from the DATABASE!')
  return query({ type, limit }).then((result) => {
    if (result.ok === true) {
      const bookCount = length(propOr([], 'docs', result))

      setBookCountToCache(bookCount)
      return bookCount
    } else {
      return Promise.reject()
    }
  })
}

const getBookCountFromCache = (key) => {
  console.log('getting book count from the CACHE!')

  return hyper.cache
    .get(key)
    .then((result) =>
      result.ok === false
        ? Promise.reject(key)
        : propOr(null, 'bookCount', result),
    )
}

const isKeyCached = (key) => {
  console.log('isKeyCached key', key)
  return hyper.cache
    .get(key)
    .then((result) => (result.ok === false ? Promise.reject(key) : key))
}

const getStats = (key) =>
  Promise.resolve(key)
    .then(isKeyCached)
    .then(getBookCountFromCache, getBookCountFromDB)
    .then(passValueThru, errorResponse)
    .catch(errorResponse)

export default async function (req, res) {
  const stats = await getStats('stats')
  return res.send({ stats: { bookCount: stats } })
}
