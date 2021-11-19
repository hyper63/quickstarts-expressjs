import { connect } from 'hyper-connect'
import { map, contains, head, split, last, keys } from 'ramda'
// import { getReqQueryLimit } from '../../lib/get-req-query-limit.js'
// import { getReqQueryParam } from '../../lib/get-req-query-param.js'
// import { createRequestOptions } from '../../lib/create-req-options.js'

const hyper = connect(process.env.HYPER)

/* docs: https://docs.hyper.io/cloud/list-documents
Querystring parameters [optional]
limit - {number} limits the number of documents returned
startkey - {string} key matcher for document id's
endkey -  {string} key matcher for document id's
keys - {array[string]} a collection of key ids for returning documents
limit - {number} default: 1000 - number of documents to return
descending - {true|false} - determines the order of the list sorted on the 'id' column
*/

export default async function (req, res) {
  console.log('req.query', req.query)

  const queryString = req.query

  // map query string into optios
  // ?year=$gt|1984&type=movie
  // queryString =  { year: '$gt|1984', type: 'movie' } is mapped to the const options:
  // const options = { year: { $gt: '1984'}, type: 'movie'}
  const options = head(
    map(
      (k) =>
        contains('|', queryString[k])
          ? {
              [k]: {
                [head(split('|', queryString[k]))]: last(
                  split('|', queryString[k]),
                ),
              },
            }
          : { [k]: queryString[k] },
      keys(queryString),
    ),
  )

  console.log('data: query: options', options)

  const result = await hyper.data.query(options)

  console.log('data: query result', result)
  return res.send(result)
}
