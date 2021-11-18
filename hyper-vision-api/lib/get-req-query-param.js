import {pathOr, curry} from 'ramda'

export const getReqQueryParam = curry((req, queryParam, defaultVal = null ) => pathOr(defaultVal, ['query', queryParam], req))