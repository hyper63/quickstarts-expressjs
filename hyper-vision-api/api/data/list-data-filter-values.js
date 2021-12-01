import { connect } from 'hyper-connect'
import { uniq, compose, map, propOr, prop, take } from 'ramda'

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  const key = req.query.key || 'type'
  const limit = req.query.limit || 1000

  const result = await hyper.data.list({ limit })

  const docValues = compose(
    (docValues) => ({ ok: true, docs: docValues }),
    take(50),
    uniq,
    map(prop(key)),
    propOr([], 'docs'),
  )(result)

  console.log('list-data-filter-values: ', docValues)
  return res.send(docValues)
}
