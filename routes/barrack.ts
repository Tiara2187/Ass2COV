import { Router, Request, Response } from "express";
import BarrackController from '../controllers/BarrackController'
import barrackAuthorization from '../middlewares/barrackAuthorization'

class Barrack {
    router:Router
    constructor(){
        this.router = Router()
        this.barrack()
    }
    public barrack():void{
       this.router.post('/:userID', BarrackController.post);
       this.router.get('/', BarrackController.list);
       this.router.get('/:id/detail', BarrackController.detail);
       this.router.get('/:id/soliderGenerate',  BarrackController.soliderGenerate);
       this.router.get('/:id/collectSolider', BarrackController.collectSolider);
       this.router.put('/:id', barrackAuthorization.barrackauthorization, BarrackController.put);
       this.router.delete('/:id', barrackAuthorization.barrackauthorization, BarrackController.delete );

    }
}
export default new Barrack().router

