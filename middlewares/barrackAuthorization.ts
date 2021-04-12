import { NextFunction, Request, Response } from 'express'; 
import { Barrack } from '../models/Barrack'

class BarrackAuthorization{
    static barrackauthorization (req: Request, res: Response, next: NextFunction) {
    const {id} = req.params
    Barrack.findById(id)
      .then((barrack) => {
        if (barrack) {
            console.log(barrack);
          if (barrack._userId === (<any>req)._userId) {
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

}
export default BarrackAuthorization