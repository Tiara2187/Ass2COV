import jwt from 'jsonwebtoken'
import { User } from '../models/User'
import { NextFunction, Request, Response } from 'express'; 

class UserAuthorization{
    static userauthorization (req: Request, res: Response, next: NextFunction) {
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
}

export default UserAuthorization

 
