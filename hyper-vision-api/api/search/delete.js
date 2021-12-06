import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'

export default async function (req, res) {
  // connecting to any service type named by the 'serviceinstancename' query string
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  console.log('search: remove: ', req.params.id)
  const result = await hyper.search.remove(req.params.id)
  console.log('search: remove result', result)
  return res.send(result)
}
