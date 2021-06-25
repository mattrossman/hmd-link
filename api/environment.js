module.exports = (req, res) => {
  res.send('Your environment is ' + process.env.VERCEL_ENV)
}
