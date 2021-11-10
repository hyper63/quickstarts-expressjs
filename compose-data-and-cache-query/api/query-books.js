import { connect } from "hyper-connect";
import { pathOr, length, prop } from 'ramda'
const hyper = connect(process.env.HYPER);

const query = ({ type, limit }) => hyper.data.query({ type }, { limit }).then(prop("docs"))


const queryDBByAuthor = ({ type, limit }) => (author) => hyper.data.query({ type, author }, { limit })

const queryCacheByAuthor = (author) =>  hyper.cache.query(`author-${author}*`)
  .then( result => result.ok === false || result.ok === true && length(result.docs) === 0  ? Promise.reject(author) : result.docs )

//{"ok":true,"docs":[{"key":"movie-1-1983","value":{"id":"movie-1","title":"Ghostbusters"}}]}

const passValueThru = (x) => x

const queryBooksByAuthor = ({ type, limit, author }) =>
      Promise.resolve(author)
      .then(queryCacheByAuthor)
      .then(passValueThru, queryDBByAuthor({ type, limit }))
      .catch(errorResponse)

export default async function (req, res) {
  console.log('query books')
  const type = 'book'
  // safely get query param named 'limit', if not there, default to 1000.  Convert query string to integer.
  const limit = parseInt(pathOr(1000, ['query', 'limit'], req), 10)
  const author = pathOr( null, ['query', 'author'], req)

  let books 
  if (author) {
   // query cache if no results fall back to querying the db

   books = await queryBooksByAuthor
  
  } else {
    books = await query({ type, limit })

  }
  return res.send(books)
}
