import { connect } from 'hyper-connect'

// connecting to any service type named 'default'
const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  console.log('create', req.body)
  const result = await hyper.data.add(req.body)
  console.log("create data to db result", result)
  return res.send(result)
}
