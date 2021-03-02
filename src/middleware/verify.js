const jwt = require('jsonwebtoken')

const verify = (req, res, next) => {
  const accessToken = req.headers.authorization

  if (!accessToken) {
    return res.status(403).json({ status: 'error:', message: 'Unauthorized Access!' })
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      console.error(err)
      return res.status(401).json({ status: 'error:', message: 'Unauthorized Access!' })
    } else {
      next()
    }
  })
}

module.exports = verify
