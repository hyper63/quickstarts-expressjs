import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'

// docs: https://docs.hyper.io/cloud/add-document-to-search-index

export default async function (req, res) {
  // connecting to any service type named by the 'serviceinstancename' query string
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  const doc = req.body
  console.log('search: create doc:', doc)
  const result = await hyper.search.add(doc.id, doc)
  console.log('search: create result', result)
  return res.send(result)
}
