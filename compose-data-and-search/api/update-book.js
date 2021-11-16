import { connect } from 'hyper-connect'
const hyper = connect(process.env.HYPER)

const passValueThru = (x) => x

const updateDocToDB = (doc) =>
  hyper.data.update(doc.id, doc).then((res) => {
    console.log('updateDocToDB res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const updateDocToSearch = (doc) => hyper.search.update(doc.id, doc)

//hyper.search.update(doc.id, doc).then(passValueThru)

const errorResponse = (err) => {
  ok: false, err
}

// searchUpdate - update doc to data and searcy
const searchUpdate = (doc) =>
  Promise.resolve(doc)
    .then(updateDocToDB)
    .then(updateDocToSearch)
    .catch(errorResponse)

// .then(updateDocToCache, passValueThru)

export default async function (req, res) {
  console.log('update-book', req.body)

  const result = await searchUpdate(req.body)
  return res.send(result)
}
