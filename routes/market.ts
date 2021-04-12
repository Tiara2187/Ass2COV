
import { Router, Request, Response } from "express";
import MarketController from '../controllers/MarketController'
import marketAuthorization from '../middlewares/marketAuthorization'

class Market {
    router:Router
    constructor(){
        this.router = Router()
        this.market()
    }
    public market():void{
        this.router.post('/:userID', MarketController.post);
        this.router.get('/', MarketController.list);
        this.router.get('/:id/detail', MarketController.detail);
        this.router.get('/:id/goldGenerate', MarketController.goldGenerate);
        this.router.get('/:id/collectGold', MarketController.collectGold);
        // router
        this.router.put('/:id', marketAuthorization.marketauthorization, MarketController.put);
        this.router.delete('/:id', marketAuthorization.marketauthorization, MarketController.delete );

    }
}

export default new Market().router
