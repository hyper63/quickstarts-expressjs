import { connect } from 'hyper-connect'
import { map, contains, mergeAll, head, split, last, keys, omit, pick, mergeLeft, prop, compose, ifElse, has, identity } from 'ramda'
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
  console.log('cache/query.js req.query', req.query)

  const queryString = req.query

  // pattern - string - this parameter is not required, but when applied the value will be used to match all the keys in the cache and only return the ones that match the pattern. Using an * wildcard, you can create a selector to perform the following types of filters:
  //   starts with - movie* 
  //   ends with - *-1984 
  //   in between - movie*1984 

  // map query string into selector and options
  // ?pattern=movie*&limit=3
  // req.query { pattern: 'movie*', limit: '3' }

  const pattern = pathOr('' , ['query', 'pattern'] , req)
  const limit = parseInt(pathOr('10' , ['query', 'limit'] , req), 10)
  
  const result = await hyper.cache.query(pattern)
  const docs = take(limit, propOr([], "docs", result))


  console.log('data: query result', {...result, docs})
  return res.send( {...result, docs})
}
