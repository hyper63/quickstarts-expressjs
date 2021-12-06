import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'

export default async function (req, res) {
  // connecting to any service type named by the 'serviceinstancename' query string.
  //  Fallback to a service instance name of 'default'
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  console.log('data: remove: ', req.params.id)

  const result = await hyper.data.remove(req.params.id)
  console.log('data: remove result', result)
  return res.send(result)
}
