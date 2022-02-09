export default async function (req, res) {
  const { body } = req

  console.log('post.js body', body)
  // processing
  res.json({ ok: true, body })
}
