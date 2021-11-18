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
  console.log('getting data from db: ', req.params.id)
  const result = await hyper.data.get(req.params.id)
  console.log("get data from db result", result)
  return res.send(result)
}
