const Market = require("../models/Market");
const User = require("../models/User");

class MarketController {
  //build Market
  static async post(req, res, next) {
    const { userID } = req.params
    const { marketname } = req.body
    const dataUser = await User.findById(userID)
    const resources = dataUser.resources
    const { golds, foods } = resources
    if (resources.golds >= 30 && resources.foods >= 10) {
        const updateResource = await User.findByIdAndUpdate
            (userID,
                { $set: { 'resources.golds': golds - 30, 'resources.foods': foods - 10 } },
                { new: true })
        const marketData = await Market.create({ user: userID, marketname })
        res.status(201).send({ success: true, market: marketData, resources: updateResource.resources })
    } else if (resources.golds < 30 || resources.foods < 10) next({ name: 'NOT_ENOUGH' })
    else next({ name: 'BUILD_FAILED' })

}

  //list Market
  static list(req, res, next) {
    Market.find({
      _userId: req._userId,
    })
      .then((markets) => {
        res.status(200).json({
          success: true,
          data: markets,
        });
      })
      .catch(next);
  }

  //detail Market
  static detail(req, res, next) {
    const { id } = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
          const goldcapacity = Math.floor(
            (Date.now() - market.lastcollect) / 60000
          );
          res.status(200).json({
            success: true,
            data: market,
            
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }

  //Update rename marketname
  static put(req, res, next) {
    const {
      id
    } = req.params;
    const {
      marketname
    } = req.body;
    Market.findById(id)
      .then((market) => {
        if (market) {
          market.marketname = marketname; // req.body marketname
          return market.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((market) => {
        res.status(200).json({
          success: true,
          data: market,
        });
      })
      .catch(next);
  }

  // remove market
  static delete(req, res, next) {
    Market.findOne({
      _id: req.params.id,
    })
      .then((markets) => {
        return markets.remove();
      })
      .then((markets) => {
        res.status(200).json({
          success: true,
          message: "Market deleted",
          data: markets,
        });
      })
      .catch(next);
  }

  //goldAddGenerate
  static goldGenerate(req, res, next) {
    const { id } = req.params;
    Market.findById(id)
      .then((market) => {
        if (market) {
          const goldcapacity = Math.floor(
            (Date.now() - market.lastcollect) / 60000 ); // goldcapacity < 20 (false)
          res.status(200).json({
            success: true,
            data: market,
            goldcapacity: goldcapacity > 20 ? 20 : goldcapacity, // goldcapacity: 20  (true)
          });
        } else {
          throw "NOT_FOUND";
        }
      })
      .catch(next);
  }

  static collectGold(req, res, next) {
    const { id } = req.params;
    let goldcapacity;
    Market.findById(id)
      .then((market) => {
        if (market) {
          goldcapacity = Math.floor((Date.now() - market.lastcollect) / 60000);
          market.goldcapacity = goldcapacity > 20 ? 20 : goldcapacity; // generate goldcapacity
          return market.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((market) => {
        const goldgenerated = market.goldcapacity;
        User.findById(req._userId)
        .then((datauser) => {
         datauser.resources.golds += goldgenerated;
         console.log(datauser.resources.golds);
         return User.updateOne(
             {_id: req._userId},
             {resources: {golds: datauser.resources.golds, foods: datauser.resources.foods, soliders: datauser.resources.soliders}}
         )
        })
        .catch(next)
        market.goldcapacity = 0;
        market.save();
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${goldcapacity} golds has been added to your resources`,
        
        });
      })
      .catch(next);
  }
}
module.exports = MarketController;
