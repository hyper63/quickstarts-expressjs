import { connect } from 'hyper-connect'
import { uniq, compose, map, propOr, prop } from 'ramda'

const hyper = connect(process.env.HYPER)
export default async function (req, res) {
  const result = await hyper.data.list({ limit: 1000 })

  const docTypes = compose(
    (docTypes) => ({ ok: true, docs: docTypes }),
    uniq,
    map(prop('type')),
    propOr([], 'docs'),
  )(result)
  console.log('list-data-doc-types: ', docTypes)
  return res.send(docTypes)
}
