import { connect } from 'hyper-connect'

if (!process.env.HYPER) {
  console.log('****************')
  console.log(
    "ERROR:  MISSING HYPER CONNECTION STRING.  See the section titled 'Setup' in the README.md ",
  )
  console.log('****************')
}

const hyper = connect(process.env.HYPER)

const readFromDB = (id) => {
  return hyper.data.get(id)
}

const errorResponse = (err) => {
  ok: false, err
}

const get = (id) => Promise.resolve(id).then(readFromDB).catch(errorResponse)

export default async function (req, res) {
  console.log('getting book: ', req.params.id)
  const book = await get(req.params.id)
  return res.send(book)
}
