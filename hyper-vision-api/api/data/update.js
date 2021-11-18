import { connect } from 'hyper-connect'

// connecting to any service type named 'default'
const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  const doc = req.body
  console.log('data: update', doc)
  const result = await hyper.data.update(doc.id, doc)
  console.log('data: update result', result)
  return res.send(result)
}
