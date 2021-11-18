import { connect } from 'hyper-connect'
const hyper = connect(process.env.HYPER)

const passValueThru = (x) => x

const updateDocToDB = (doc) =>
  hyper.data.update(doc.id, doc).then((res) => {
    console.log('updateDocToDB res', res)
    return res.ok ? res : Promise.reject(res)
  })

const addDocToSearchIndex = (doc) =>
  hyper.search.add(doc.id, doc).then((res) => {
    console.log('addDocToSearchIndex res', res)
    return res.ok ? doc : Promise.reject(res)
  })

const updateDocToSearch = (doc) =>
  hyper.search
    .remove(doc.id)
    .then((res) => {
      console.log('updateDocToSearch remove doc result', res)
      return res.ok ? doc : Promise.reject(res)
    })
    .then(addDocToSearchIndex)

const errorResponse = (err) => {
  ok: false, err
}

// searchUpdate - update doc to data and search
const searchUpdate = (doc) =>
  Promise.resolve(doc)
    .then(updateDocToSearch)
    .then(updateDocToDB)
    .catch(errorResponse)

// .then(updateDocToCache, passValueThru)

export default async function (req, res) {
  console.log('update-book', req.body)

  const result = await searchUpdate(req.body)
  return res.send(result)
}
