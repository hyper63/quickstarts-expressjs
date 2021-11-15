import { connect } from 'hyper-connect'
import { pathOr, length, prop, toLower, map, take } from 'ramda'
import slugify from 'slugify'

const hyper = connect(process.env.HYPER)
const slug = (item) => toLower(slugify(item))
const query = ({ type, limit }) =>
  hyper.data.query({ type }, { limit }).then(prop('docs'))

const queryDBByAuthor =
  ({ type, limit }) =>
  (author) =>
    hyper.data.query({ type, author }, { limit })

const queryCacheByAuthor = (author) =>
  hyper.cache
    .query(`author-${slug(author)}*`)
    .then((result) =>
      result.ok === false || (result.ok === true && length(result.docs) === 0)
        ? Promise.reject(author)
        : result.docs,
    )

const errorResponse = (err) => {
  return { ok: false, msg: err.msg ? err.msg : 'none' }
}

/* 
query the cache service for all books by the specified author.  
If no results are found in the cache, we will fall back to querying the database.
*/
const queryBooksByAuthor = ({ type, limit, author }) =>
  Promise.resolve(author)
    .then(queryCacheByAuthor)
    .then(take(limit), queryDBByAuthor({ type, limit }))
    .catch(errorResponse)

export default async function (req, res) {
  const type = 'book'


  // safely get query param named 'limit', if not there, default to 1000.  Convert query string to integer.
  const limit = parseInt(pathOr(1000, ['query', 'limit'], req), 10)

  /* If the `author` query string exists then we will query books by author */
  const author = pathOr(null, ['query', 'author'], req)

  let books = author
    ? map(prop('value'), await queryBooksByAuthor({ type, limit, author }))
    : await query({ type, limit })

  return res.send(books)
}
