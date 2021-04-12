const Market = require('../models/Market');
module.exports = (req, res, next) =>{
    const {id} = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
            console.log(market);
          if (market._userId === req._userId) {
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