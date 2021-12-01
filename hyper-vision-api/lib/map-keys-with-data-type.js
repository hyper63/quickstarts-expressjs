import { map, keys } from 'ramda'
import { typeCheck } from './type-check.js'

export const mapKeyWithDataType = (doc) =>
  map((k) => ({ key: k, dataType: typeCheck(doc[k]) }), keys(doc))
