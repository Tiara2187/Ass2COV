const jwt = require('jsonwebtoken');
const User = require('../models/User');
module.exports = (req, res, next) => {
    const {userID} = req.params;
    const { access_token } = req.headers;
    const reload = jwt.verify(access_token, 'ASS2COV');
  User.findById(userID)
    .then((user) => {
      if (user) {
          console.log(user);
        if (user._userId === reload._userId) {
          next();
        } else {
          throw 'FORBIDDEN';
        }
      } else {
        throw 'NOT_FOUND'; 
      }
    })
    .catch(next);
};