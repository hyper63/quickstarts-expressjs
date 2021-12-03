import { connect } from 'hyper-connect'
import {pathOr} from 'ramda'

/*
docs: https://docs.hyper.io/cloud/get-search-document
*/



export default async function (req, res) {

  const serviceinstancename = pathOr('default', ['query', 'serviceinstancename'], req)
  const hyper = connect(process.env.HYPER, serviceinstancename)

  console.log('search: get: ', req.params.id)
  const result = await hyper.search.get(req.params.id)
  console.log('search: get result', result)
  return res.send(result)
}
