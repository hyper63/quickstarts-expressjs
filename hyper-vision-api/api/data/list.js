import { connect } from 'hyper-connect'
import { getReqQueryLimit } from '../../lib/get-req-query-limit.js'
import { getReqQueryParam } from '../../lib/get-req-query-param.js'
import { createRequestOptions } from '../../lib/create-req-options.js'

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
  const limit = getReqQueryLimit(req)
  //console.log('limit', limit)

  const docType = getReqQueryParam('docType', null, req)

  const startkey = getReqQueryParam('startkey', null, req)
  //console.log('startkey', startkey)

  const options = createRequestOptions({ limit, startkey, docType })

  console.log('data: list: options', options)
  console.log('data: list: req.query', req.query)

  const result = await hyper.data.list(options)

  console.log('data: query result', result)
  return res.send(result)
}
