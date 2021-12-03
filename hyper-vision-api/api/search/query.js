import { connect } from 'hyper-connect'
import { pathOr, split } from 'ramda'

/*
docs: https://docs.hyper.io/cloud/search-index
*/

export default async function (req, res) {
  // connecting to any service type named by the 'serviceinstancename' query string
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )

  const query = pathOr('', ['query', 'searchtext'], req)

  // const fieldsQueryString = pathOr('', ['query', 'fields'], req)
  // const fields = split("|", fieldsQueryString)

  console.log({ serviceinstancename, query })
  console.log('req.query', req.query)

  const hyper = connect(process.env.HYPER, serviceinstancename)

  console.log('search: query: ', { query })
  const result = await hyper.search.query(query).catch((err) => {
    console.log({ err })
    return err
  })
  console.log('search: query result', result)
  return res.send(result)
}
