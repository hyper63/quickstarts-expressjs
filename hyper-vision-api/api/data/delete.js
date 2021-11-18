import { connect } from 'hyper-connect'

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  console.log('data: remove: ', req.params.id)
  const result = await hyper.data.remove(req.params.id)
  console.log("data: remove result", result)
  return res.send(result)
}
