export default (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // TODO: improve logging and render error page
  console.error('Error on request %s %s', req.method, req.url)
  console.error(err)
  console.error(err.stack)
  res.status(500).send('Internal Server Error')
}
