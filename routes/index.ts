import { Router, Request, Response } from "express";
import errorHandler from '../middlewares/errorHandler'
import authentication from '../middlewares/authentication'
import userRoutes  from './user'
import market from './market'
import barrack from './barrack'
import farm from './farm'


class Index {
    router:Router
    constructor(){
        this.router = Router()
        this.index()

    }
    public index():void{
        this.router.use('/users', userRoutes)
        this.router.use(authentication.authentication)
        this.router.use('/markets', market)
        this.router.use('/barracks', barrack)
        this.router.use('/farms', farm)
        this.router.use(errorHandler.errorhandler)
    }
}

export default new Index().router

