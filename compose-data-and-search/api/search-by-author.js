import { connect } from 'hyper-connect'
import { pathOr, length } from 'ramda'

const hyper = connect(process.env.HYPER)

const queryDBByAuthor = (author) =>
  hyper.data.query({ type: 'book', author }, { limit: 1000 })

// {
//     "query": "John Knowles",
//     "fields": ["author"],
//     "filter": {"published": "1965"}
// }

// {
//     "query": "John Knowles",
//     "fields": ["author"],
//
// }

const searcbByAuthor = (author) =>
  hyper.search
    .query(author, { fields: ['author'] })
    .then((result) =>
      result.ok === false ||
      (result.ok === true && length(result.matches) === 0)
        ? Promise.reject(author)
        : result,
    )

const passValueThru = (x) => {
  console.log('passValueThru x', x)
  return x
}

const errorResponse = (err) => {
  return { ok: false, msg: err.msg ? err.msg : 'none' }
}

/* 
query the cache service for all books by the specified author.  
If no results are found in the cache, we will fall back to querying the database.
*/
const searchBooksByAuthor = (author) =>
  Promise.resolve(author)
    .then(searcbByAuthor)
    //.then(passValueThru, queryDBByAuthor(author))
    .catch(errorResponse)

export default async function (req, res) {
  const author = pathOr(null, ['query', 'author'], req)

  let searchResult = author ? await searchBooksByAuthor(author) : []

  return res.send(searchResult)
}
