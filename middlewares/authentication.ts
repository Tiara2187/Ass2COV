
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

class Authentication{
    static authentication (err:Error, req: Request, res: Response, next: NextFunction) {
        const { access_token } = req.headers;
  if (access_token) {
    jwt.verify(access_token, 'ASS2COV', (err, decoded) => {
     
      if (err) next({ name: 'INVALID_TOKEN' });
      else {
        (<any>req)._userId = decoded.id;
        next();
      }
    });
  } else next({ name: 'MISSING_TOKEN' });
};
}
export default Authentication

