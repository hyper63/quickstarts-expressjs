import { pathOr } from 'ramda'

// safely get query param named 'limit', if not there, default to 1000.  Convert query string to integer.
export const getReqQueryLimit = (req) => {
	console.log('inside getReqQueryLimit req.query', req.query)
	console.log(
		'pathOr(1000, [\'query\', \'limit\'], req)',
		pathOr(1000, ['query', 'limit'], req),
	)
	return parseInt(pathOr(1000, ['query', 'limit'], req), 10)
}
