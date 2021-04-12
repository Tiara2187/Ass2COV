import { Router, Request, Response } from "express";
import FarmController from "../controllers/FarmController";
import farmAuthorization from '../middlewares/farmAuthorization'

class Farm {
    router:Router
    constructor(){
        this.router = Router()
        this.farm()
    }
    public farm():void{
        this.router.post('/:userID', FarmController.post);
        this.router.get('/', FarmController.list);
        this.router.get('/:id/detail', FarmController.detail);
        this.router.get('/:id/foodGenerate', FarmController.foodGenerate);
        this.router.get('/:id/collectFood', FarmController.collectFood);
        
        
        this.router.put('/:id', farmAuthorization.farmauthorization, FarmController.put);
        this.router.delete('/:id',farmAuthorization.farmauthorization, FarmController.delete );

    }
}
export default new Farm().router
