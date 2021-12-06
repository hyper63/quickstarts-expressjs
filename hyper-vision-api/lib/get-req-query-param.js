import { pathOr, curry } from 'ramda'

export const getReqQueryParam = curry((queryParam, defaultVal = null, req) =>
	pathOr(defaultVal, ['query', queryParam], req),
)
