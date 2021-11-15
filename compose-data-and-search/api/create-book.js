import { connect } from 'hyper-connect'


// connecting to any service type named 'default'
const hyper = connect(process.env.HYPER)

console.log('process.env.HYPER', process.env.HYPER)
// Connecting to service instances named 'author'.  
// Note the second argument in the call to the connect function
//const hyperAuthorSearch =  connect(process.env.HYPER, "author")

const passValueThru = (x) => x

const always = (v) => () => v

const addDocToDB = (doc) => {

  console.log('addDocToDB doc', doc)
  //console.log('**** hyperAuthorSearch ***', hyperAuthorSearch)

  return hyper.data.add(doc).then((res) => {
    console.log('addDocToDB res', res)
    return res.ok ? doc : Promise.reject(res)
  })

}
  

  //Add document to search index

  /*
The request body contains two properties:

key - string - this is the unique identifier for the search index
doc - object - this is the document that will be added to the index.


{
    "key": "ghostbusters-1984",
    "doc": {
        "id": "ghostbusters-1984",
        "type": "movie",
        "title": "Ghostbusters",
        "year": "1984"
    }
}
  */



const addDocToSearchIndex = (doc) =>
    hyper.search.add(doc.id, doc)
    .then((res) => {
      console.log('addDocToSearchIndex res', res)
      return res.ok ? { ok: true, id: doc.id } : Promise.reject(res)
    })

const errorResponse = (err) => {
  ok: false, err
}

// searchAdd - Add to data and search 
const searchAdd = (doc) =>
  Promise.resolve(doc)
    .then(addDocToDB)
    .then(addDocToSearchIndex)
    .catch(errorResponse)

export default async function (req, res) {
  //console.log('create-book', req.body)

  const result = await searchAdd(req.body)
  return res.send(result)
}
