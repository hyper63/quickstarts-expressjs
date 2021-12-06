import { connect } from 'hyper-connect'

import { pathOr } from 'ramda'

export default async function (req, res) {
	// connecting to any service type named by the 'serviceinstancename' query string.
	//  Fallback to a service instance name of 'default'
	const serviceinstancename = pathOr(
		'default',
		['query', 'serviceinstancename'],
		req,
	)
	const hyper = connect(process.env.HYPER, serviceinstancename)

	console.log('data: create', req.body)
	const result = await hyper.data.add(req.body)
	console.log('data: create result', result)
	return res.send(result)
}
