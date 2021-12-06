import { connect } from 'hyper-connect'
import { pathOr, propOr, take } from 'ramda'

//const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  //console.log('cache/query.js req.query', req.query)

  // pattern - string - this parameter is not required, but when applied the value will be used to match all the keys in the cache and only return the ones that match the pattern. Using an * wildcard, you can create a selector to perform the following types of filters:
  //   starts with - movie*
  //   ends with - *-1984
  //   in between - movie*1984

  // map query string into selector and options
  // ?pattern=movie*&limit=3
  // req.query { pattern: 'movie*', limit: '3' }

  const pattern = pathOr('*', ['query', 'pattern'], req)
  const limit = parseInt(pathOr('10', ['query', 'limit'], req), 10)

  const result = await hyper.cache.query(pattern)
  const docs = take(limit, propOr([], 'docs', result))

  //console.log('data: query result', {...result, docs})
  return res.send({ ...result, docs })
}
