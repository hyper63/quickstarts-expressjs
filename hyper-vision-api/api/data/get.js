import { connect } from 'hyper-connect'

if (!process.env.HYPER) {
  console.log('****************')
  console.log(
    "ERROR:  MISSING HYPER CONNECTION STRING.  See the section titled 'Setup' in the README.md ",
  )
  console.log('****************')
}

const hyper = connect(process.env.HYPER)

export default async function (req, res) {
  console.log('data: get: ', req.params.id)
  const result = await hyper.data.get(req.params.id)
  console.log("data: get result", result)
  return res.send(result)
}
