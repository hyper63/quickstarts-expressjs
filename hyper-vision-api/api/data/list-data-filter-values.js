import { connect } from 'hyper-connect'
import {
	uniq,
	compose,
	map,
	propOr,
	prop,
	take,
	reject,
	equals,
	pathOr,
} from 'ramda'

export default async function (req, res) {
	// connecting to any service type named by the 'serviceinstancename' query string.
	//  Fallback to a service instance name of 'default'
	const serviceinstancename = pathOr(
		'default',
		['query', 'serviceinstancename'],
		req,
	)
	const hyper = connect(process.env.HYPER, serviceinstancename)

	const key = req.query.key || 'type'
	const limit = req.query.limit || 1000

	const result = await hyper.data.list({ limit })

	const docValues = compose(
		(docValues) => ({ ok: true, docs: docValues }),
		take(50),
		reject(equals(null)),
		reject(equals(undefined)),
		uniq,
		map(prop(key)),
		propOr([], 'docs'),
	)(result)

	console.log('list-data-filter-values: ', docValues)
	return res.send(docValues)
}
