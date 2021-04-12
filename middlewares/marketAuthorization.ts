import { NextFunction, Request, Response } from 'express'; 
import { Market } from '../models/Market'

class MarketAuthorization{
    static marketauthorization (req: Request, res: Response, next: NextFunction) {
        const {id} = req.params;
        Market.findById(id)
          .then((market) => {
            if (market) {
                console.log(market);
              if (market._userId === (<any>req)._userId) {
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

export default MarketAuthorization



