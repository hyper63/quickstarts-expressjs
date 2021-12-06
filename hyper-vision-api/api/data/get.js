import { connect } from 'hyper-connect'
import { pathOr } from 'ramda'

if (!process.env.HYPER) {
	console.log('****************')
	console.log(
		'ERROR:  MISSING HYPER CONNECTION STRING.  See the section titled \'Setup\' in the README.md ',
	)
	console.log('****************')
}

/*
docs: https://docs.hyper.io/cloud/retrieve-a-document-by-id
*/

export default async function (req, res) {
	// connecting to any service type named by the 'serviceinstancename' query string.
	//  Fallback to a service instance name of 'default'
	const serviceinstancename = pathOr(
		'default',
		['query', 'serviceinstancename'],
		req,
	)
	const hyper = connect(process.env.HYPER, serviceinstancename)

	console.log('data: get: ', req.params.id)
	const result = await hyper.data.get(req.params.id)
	console.log('data: get result', result)
	return res.send(result)
}
