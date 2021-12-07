import { connect } from 'hyper-connect'
import { uniq, compose, map, propOr, prop, pathOr } from 'ramda'

//const hyper = connect(process.env.HYPER)
export default async function (req, res) {
  // connecting to any service type named by the 'serviceinstancename' query string.
  //  Fallback to a service instance name of 'default'
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  const result = await hyper.data.list({ limit: 1000 }).catch((err) => {
    return { ok: false, err }
  })

  const docTypes = compose(
    (docTypes) => ({ ok: true, docs: docTypes }),
    uniq,
    map(prop('type')),
    propOr([], 'docs'),
  )(result)

  console.log('list-data-doc-types: ', docTypes)

  return res.send(docTypes)
}
