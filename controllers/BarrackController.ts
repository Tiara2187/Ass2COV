import { User } from '../models/User'
import { Barrack } from '../models/Barrack'
import { NextFunction, Request, Response } from 'express'

class BarrackController {
    //build Barrack
    static async post(req: Request, res: Response, next: NextFunction) {
      const { userID } = req.params
      const { barrackname } = req.body
      const dataUser = await User.findById(userID)
      const dataBarrack = await Barrack.find({ user: userID })
      const resources = dataUser.resources
      const { golds, foods } = resources
      if (resources.golds >= 30 && resources.foods >= 30) {
          if (dataBarrack.length <= 30) {
              const updateResource = await User.findByIdAndUpdate
                  (userID,
                      { $set: { 'resources.golds': golds - 30, 'resources.foods': foods - 30 } },
                      { new: true })
              const barrackData = await Barrack.create({ user: userID, barrackname })
              res.status(201).send({ success: true, barrack: barrackData, resources: updateResource.resources })
          } else next({ name: 'BUILD_FAILED' })

      } else if (resources.golds < 30 || resources.foods < 30) next({ name: 'NOT_ENOUGH' })
      else next({ name: 'BUILD_FAILED' })
  }
  
    //list Barrack
    static list(req, res, next) {
        Barrack.find({
            _userId: req._userId
        })
        .then((barracks) => {
            res.status(200).json({
                success: true,
                data: barracks
            });
        })
        .catch(next);
    }
    
    //detail Barrack
    static detail(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        Barrack.findById(id)
          .then((barrack) => {
            if (barrack) {
              const barrackcapacity = Math.floor(
                (Date.now() - barrack.lastcollect) / 60000
              );
              res.status(200).json({
                success: true,
                data: barrack,
                
              });
            } else {
              throw "NOT_FOUND";
            }
          })
          .catch(next);
      }

    //Update rename barrackname
    static put(req: Request, res: Response, next: NextFunction) {
      const {
        id
      } = req.params;
      const {
        barrackname
      } = req.body;
      Barrack.findById(id)
        .then((barrack) => {
          if (barrack) {
            barrack.barrackname = barrackname; // req.body marketname
            return barrack.save();
          } else {
            throw "NOT_FOUND";
          }
        })
        .then((barrack) => {
          res.status(200).json({
            success: true,
            data: barrack,
          });
        })
        .catch(next);
    }
  
  // remove barrack
  static delete(req: Request, res: Response, next: NextFunction) {
      Barrack.findById({
          _id: req.params.id
      })
      .then((barracks) => {
          return barracks.remove();
      })
      .then((barracks) => {
          res.status(200).json({
              success: true,
              message: 'Barrack deleted',
              data: barracks
          });
      })
      .catch(next);
  }

    //solidersAddGenerate
    static soliderGenerate(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        Barrack.findById(id)
          .then((barrack) => {
            if (barrack) {
              const solidercapacity = Math.floor(
                (Date.now() - barrack.lastcollect) / 60000 ); // goldcapacity < 20 (false)
              res.status(200).json({
                success: true,
                data: barrack,
                solidercapacity: solidercapacity > 10 ? 10 : solidercapacity, // goldcapacity: 20  (true)
              });
            } else {
              throw "Not_Found";
            }
          })
          .catch(next);
      }
  
  //colectSolider
  static collectSolider(req, res, next) {
    const { id } = req.params;
    let solidercapacity;
    Barrack.findById(id)
      .then((barrack) => {
        if (barrack) {
          solidercapacity = Math.floor((Date.now() - barrack.lastcollect) / 60000);
          barrack.solidercapacity = solidercapacity > 20 ? 20 : solidercapacity; // generate goldcapacity
          return barrack.save();
        } else {
          throw "NOT_FOUND";
        }
      })
      .then((barrack) => {
        const solidergenerated = barrack.solidercapacity;
        User.findById(req._userId)
        .then((datauser) => {
         datauser.resources.soliders += solidergenerated;
         console.log(datauser.resources.soliders);
         return User.updateOne(
             {_id: req._userId},
             {resources: {golds: datauser.resources.golds, foods: datauser.resources.foods, soliders: datauser.resources.soliders}}
         )
        })
        .catch(next)
        barrack.solidercapacity = 0;
        barrack.save();
      })
      .then((result) => {
        res.status(200).json({
          success: true,
          message: `${solidercapacity} golds has been added to your resources`,
        
        });
      })
      .catch(next);
  }
}
export default BarrackController