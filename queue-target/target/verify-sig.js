// express middleware
import forge from 'node-forge'
const fiveMins = 5 * 60 * 1000
const secret = process.env['WORKER_SECRET']

export default function (req, res, next) {

  // no x-hyper-signature header
  if (!req.headers['x-hyper-signature']) {
    return res.status(401).send('Unauthorized')
  }  

  const [timepart, sigpart] = req.headers['x-hyper-signature'].split(',')

  const [, time] = timepart.split('t=')
  const [, sig] = sigpart.split('sig=')

  const hmac = forge.hmac.create()
  hmac.start('sha256', secret)
  hmac.update(`${time}.${JSON.stringify(req.body, null, 0)}`)
  const computed = hmac.digest().toHex()

  // payload or time signature was tampered with
  if (computed !== sig) {
    return res.status(401).send('Unauthorized')
  }

  const now = new Date().getTime()
  const dateSent = new Date(time).getTime()
  const diff = now - dateSent

  // timestamp in the future, or not within 5 minutes
  if (diff < 0 || diff > fiveMins) {
    return res.status(422).send('Timestamp not within acceptable range')
  }

  // continue
  next()
}
