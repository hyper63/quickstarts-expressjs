import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'
const hyper = connect(process.env.HYPER)

const query = ({ type, limit }) => hyper.data.query({ type }, { limit })

export default async function (req, res) {
  console.log('query books')
  const type = 'book'
  // safely get query param named 'limit', if not there, default to 1000.  Convert query string to integer.
  const limit = parseInt(pathOr(1000, ['query', 'limit'], req), 10)
  const books = await query({ type, limit })
  return res.send(books)
}
