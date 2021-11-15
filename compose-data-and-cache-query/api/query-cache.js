import { connect } from 'hyper-connect'

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  console.log('query books')

  const result = await hyper.cache.query('*')
  return res.send(result)
}
