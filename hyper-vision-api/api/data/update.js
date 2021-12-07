import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'

export default async function (req, res) {
  const serviceinstancename = pathOr(
    'default',
    ['query', 'serviceinstancename'],
    req,
  )
  const hyper = connect(process.env.HYPER, serviceinstancename)

  const doc = req.body
  console.log('data: update', doc)
  const result = await hyper.data.update(doc.id, doc).catch((err) => {
    return { ok: false, err }
  })
  console.log('data: update result', result)
  return res.send(result)
}
