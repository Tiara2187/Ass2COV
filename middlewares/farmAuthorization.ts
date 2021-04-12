import { NextFunction, Request, Response } from 'express'; 
import { Farm } from '../models/Farm'

class FarmAuthorization{
    static farmauthorization (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params
        Farm.findById(id)
          .then((farm) => {
            if (farm) {
                console.log(farm);
              if (farm._userId === (<any>req)._userId) {
                next();
              } else {
                throw 'FORBIDDEN';
              }
            } else {
              throw 'NOT_FOUND'; 
            }
          })
          .catch(next);
    }

}
export default FarmAuthorization