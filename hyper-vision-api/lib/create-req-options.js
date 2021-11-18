import { pickBy, not, isNil } from 'ramda'

const notNil = (x) => not(isNil(x))
export const createRequestOptions = (options) => pickBy(notNil, options)
