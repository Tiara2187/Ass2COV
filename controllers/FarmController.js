const Farm = require('../models/Farm');
const User = require('../models/User');
class FarmController {
    //build Farm
    static async post(req, res, next) {
      const { userID } = req.params
      const { farmname } = req.body
  
      const dataUser = await User.findById(userID)
      const resources = dataUser.resources
      const { golds, foods } = resources
      if (resources.golds >= 30 && resources.foods >= 10) {
          const updateResource = await User.findByIdAndUpdate
              (userID,
                  { $set: { 'resources.golds': golds - 30, 'resources.foods': foods - 10 } },
                  { new: true })
          const farmData = await Farm.create({ user: userID, farmname })
          res.status(201).send({ success: true, farm: farmData, resources: updateResource.resources })
      } else if (resources.golds < 30 || resources.foods < 10) next({ name: 'NOT_ENOUGH' })
      else next({ name: 'BUILD_FAILED' })
  }
    //list Farm 
    static list(req, res, next) {
        Farm.find({
            _userId: req._userId
        })
        .then((farms) => {
            res.status(200).json({
                success: true,
                data: farms
            });
        })
        .catch(next);
    }

    //detail Farm
    static detail(req, res, next) {
        const { id } = req.params;
        Farm.findById(id)
          .then((farm) => {
            if (farm) {
              const farmcapacity = Math.floor(
                (Date.now() - farm.lastcollect) / 60000
              );
              res.status(200).json({
                success: true,
                data: farm,
                
              });
            } else {
              throw "NOT_FOUND";
            }
          })
          .catch(next);
      }

    //Update rename farmname
    static put(req, res, next) {
      const {
        id
      } = req.params;
      const {
        farmname
      } = req.body;
      Farm.findById(id)
        .then((farm) => {
          if (farm) {
            farm.farmname = farmname; // req.body marketname
            return farm.save();
          } else {
            throw "NOT_FOUND";
          }
        })
        .then((farm) => {
          res.status(200).json({
            success: true,
            data: farm,
          });
        })
        .catch(next);
    }
  
  // remove farm
  static delete(req, res, next) {
      Farm.findById({
          _id: req.params.id
      })
      .then((farms) => {
          return farms.remove();
      })
      .then((farms) => {
          res.status(200).json({
              success: true,
              message: 'Farm deleted',
              data: farms
          });
      })
      .catch(next);
  }

  //foodAddGenerate
  static foodGenerate(req, res, next) {
    const { id } = req.params;
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
          const foodcapacity = Math.floor(
            (Date.now() - farm.lastcollect) / 60000 ); // goldcapacity < 20 (false)
          res.status(200).json({
            success: true,
            data: farm,
            foodcapacity: foodcapacity > 20 ? 20 : foodcapacity, // goldcapacity: 20  (true)
          });
        } else {
          throw "Not_Found";
        }
      })
      .catch(next);
  }

  static collectFood(req, res, next) {
    const { id } = req.params;
    let foodcapacity;
    Farm.findById(id)
      .then((farm) => {
        if (farm) {
          foodcapacity = Math.floor((Date.now() - farm.lastcollect) / 60000);
          farm.foodcapacity = foodcapacity > 20 ? 20 : foodcapacity; // generate goldcapacity
          return farm.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((farm) => {
        const foodgenerated = farm.foodcapacity;
        User.findById(req._userId)
        .then((datauser) => {
         console.log(datauser);
         datauser.resources.foods += foodgenerated;
         console.log(datauser.resources.foods);
         return User.updateOne(
             {_id: req._userId},
             {resources: {golds: datauser.resources.golds, foods: datauser.resources.foods, soliders: datauser.resources.soliders}}
         )
        })
        .catch(next)
        farm.foodcapacity = 0;
        farm.save();
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${foodcapacity} golds has been added to your resources`,
        
        });
      })
      .catch(next);
  }

}
module.exports = FarmController;