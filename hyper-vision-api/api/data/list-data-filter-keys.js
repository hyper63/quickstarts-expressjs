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
} from 'ramda'
import { mapKeyWithDataType } from '../../lib/map-keys-with-data-type.js'

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
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
