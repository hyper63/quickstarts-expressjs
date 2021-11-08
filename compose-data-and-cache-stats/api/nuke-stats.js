import connect from 'hyper-connect'

const hyper = connect(process.env['HYPER'])()

const removeCacheValue = (key) =>
  hyper.cache.remove(key).then((result) => {
    return result.ok === true ? result : Promise.reject(key)
  })

const passValueThru = (x) => x
const errorResponse = (err) => {
  ok: false, err
}

// get - fallback to data if not in cache
const nukeStats = () =>
  Promise.resolve('stats')
    .then(removeCacheValue)
    .then(passValueThru, errorResponse)
    .catch(errorResponse)

export default async function (req, res) {
  console.log('nuke stats ')
  const nukeResult = await nukeStats()
  return res.send(nukeResult)
}
