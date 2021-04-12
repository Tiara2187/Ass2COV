import { Router, Request, Response } from "express";
import userController from '../controllers/UserController';
import userAuthorization from '../middlewares/userAuthorization';


class User {
    router:Router
    constructor(){
        this.router = Router()
        this.user()

    }
    public user():void{
        this.router.post('/register, userController.register');
        this.router.post('/login', userController.login);
        this.router.get('/:userID', userAuthorization.userauthorization, userController.getOneUser);
        this.router.put('/:userID', userAuthorization.userauthorization, userController.updateUser);
        this.router.post('/:userID/attack/:rivalID', userController.attackPlayer);


    }
}
export default new User().router
