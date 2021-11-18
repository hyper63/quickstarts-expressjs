import { connect } from 'hyper-connect'
import {getReqQueryLimit} from '../../lib/get-req-query-limit.js'
//import {getReqQueryParam} from '../../lib/get-req-query-param.js'

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

  // safely get query param named 'limit', if not there, default to 1000.  Convert query string to integer.
  const limit = getReqQueryLimit(req)

  console.log('data: list: limit', limit)
  console.log('data: list: req.query', req.query)

  //const author = pathOr(null, ['query', 'author'], req)

  const result = await hyper.data.list({limit})
  console.log("data: list result", result)
  return res.send(result)
}
