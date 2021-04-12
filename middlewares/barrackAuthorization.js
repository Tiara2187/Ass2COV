const Barrack = require('../models/Barrack');
module.exports = (req, res, next) =>{
    const {id} = req.params
    Barrack.findById(id)
      .then((barrack) => {
        if (barrack) {
            console.log(barrack);
          if (barrack._userId === req._userId) {
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