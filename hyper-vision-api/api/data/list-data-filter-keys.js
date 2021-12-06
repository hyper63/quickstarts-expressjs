import { connect } from 'hyper-connect'
import {
  uniq,
  compose,
  map,
  flatten,
  reject,
  propEq,
  propOr,
  prop,
  equals,
  pathOr,
} from 'ramda'
import { mapKeyWithDataType } from '../../lib/map-keys-with-data-type.js'

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

  const limit = req.query.limit || 1000
  const result = await hyper.data.list({ limit })

  const docs = propOr([], 'docs', result)

  const filterKeys = compose(
    (keys) => ({ ok: true, docs: keys }),
    reject(equals('id')),
    map(prop('key')),
    reject(propEq('dataType', 'array') || propEq('dataType', 'object')),
    uniq,
    flatten,
    map(mapKeyWithDataType),
  )(docs)

  return res.send(filterKeys)
}
