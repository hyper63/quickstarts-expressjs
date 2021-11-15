import { connect } from 'hyper-connect'

if (!process.env.HYPER) {
  console.log('****************')
  console.log(
    "ERROR:  MISSING HYPER CONNECTION STRING.  See the section titled 'Setup' in the README.md ",
  )
  console.log('****************')
}

const hyper = connect(process.env.HYPER)

const readFromDB = (id) => hyper.data.get(id)

const isDocCached = (id) =>
  hyper.cache.get(id).then((result) => {
    const isDocInCache = result.id === id
    console.log(`retrieved doc ${id} from cache? ${isDocInCache}`)
    console.log('isDocCached result', result)
    return result.ok === false ? Promise.reject(id) : result
  })

const passValueThru = (x) => x
const errorResponse = (err) => {
  ok: false, err
}

// get - fallback to data if not in cache
const get = (id) =>
  Promise.resolve(id)
    .then(isDocCached)
    .then(passValueThru, readFromDB)
    .catch(errorResponse)

export default async function (req, res) {
  console.log('getting book: ', req.params.id)
  const book = await get(req.params.id)
  return res.send(book)
}
