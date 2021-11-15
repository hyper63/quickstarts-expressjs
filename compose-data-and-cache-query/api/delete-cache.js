import { connect } from 'hyper-connect'

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  const result = await hyper.cache.remove(req.params.id)
  return res.send(result)
}
