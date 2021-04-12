const Farm = require('../models/Farm');
module.exports = (req, res, next) =>{
    const {id} = req.params
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
            console.log(farm);
          if (farm._userId === req._userId) {
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