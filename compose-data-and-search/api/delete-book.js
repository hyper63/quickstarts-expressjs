import { connect } from 'hyper-connect'
const hyper = connect(process.env.HYPER)

const always = (v) => () => v

const deSearch = (id) =>
  hyper.search.remove(id).then(always(id), always(id)).then(hyper.data.remove)

// del - remove data in search if exists and remove doc in data if exists
const del = (id) => deSearch(id)

export default async function (req, res) {
  console.log('deleting book: ', req.params.id)
  const book = await del(req.params.id)
  return res.send(book)
}
