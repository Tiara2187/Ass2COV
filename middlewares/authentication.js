const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
  const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, process.env.SECRET_KEY, (err, decoded) => {
     
      if (err) next({ name: 'INVALID_TOKEN' });
      else {
        console.log(decoded)
        req._userId = decoded.id;
        next();
      }
    });
  } else next({ name: 'MISSING_TOKEN' });
};

