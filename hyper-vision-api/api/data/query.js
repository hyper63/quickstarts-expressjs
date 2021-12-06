import { connect } from 'hyper-connect'
import {
	map,
	contains,
	mergeAll,
	head,
	split,
	last,
	keys,
	omit,
	pick,
	mergeLeft,
	prop,
	compose,
	ifElse,
	has,
	identity,
	pathOr,
} from 'ramda'

//const hyper = connect(process.env.HYPER)

/* docs: https://docs.hyper.io/cloud/list-documents
Querystring parameters [optional]
limit - {number} limits the number of documents returned
startkey - {string} key matcher for document id's
endkey -  {string} key matcher for document id's
keys - {array[string]} a collection of key ids for returning documents
limit - {number} default: 1000 - number of documents to return
descending - {true|false} - determines the order of the list sorted on the 'id' column
*/

export default async function (req, res) {
	const serviceinstancename = pathOr(
		'default',
		['query', 'serviceinstancename'],
		req,
	)
	const hyper = connect(process.env.HYPER, serviceinstancename)

	console.log('query.js req.query', req.query)

	const queryString = req.query

	// map query string into selector and options
	// ?id=$gte|movie-13&type=movie
	// ?type=movie&limit=6
	// ?id=$gte|movie-2&type=movie&limit=3
	// req.query { id: '$gte|movie-2', type: 'movie', limit: '3' }
	// is transformed to a selector object --> { id: { '$gte': 'movie-2' }, type: 'movie' }
	//  and an options object --> { limit: 3 }
	const preOptions = mergeAll(
		map(
			(k) =>
				contains('|', queryString[k])
					? {
						[k]: {
							[head(split('|', queryString[k]))]: last(
								split('|', queryString[k]),
							),
						},
					}
					: { [k]: queryString[k] },
			keys(queryString),
		),
	)

	const selector = omit(['limit'], preOptions)
	// const options = pick(['limit'], preOptions)
	// const options = mergeLeft( {limit: parseInt(prop("limit", options),10)}, pick(['limit'], preOptions) )

	// console.log('data: query: options', options)
	console.log('calling query...')
	//const result = await hyper.data.query({},{ limit: 5 } )
	//{"type":"movie","id":{"gte":"movie-5"}},"options":{"limit":"5"}

	//const options = { limit: 5 }
	const options = compose(
		ifElse(
			has('limit'),
			(x) => mergeLeft({ limit: parseInt(prop('limit', x), 10) }, x),
			identity,
		),
		pick(['limit']),
	)(preOptions)

	//const selector = { type: "movie", id: {$gte:"movie-2"}}
	//const selector = {}

	console.log('hyper.data.query(selector, options) -->', selector, options)
	const result = await hyper.data.query(selector, options)
	console.log('data: query result', result)
	return res.send(result)
}
