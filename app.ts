import express, { Application } from "express"
import mongoDB from './config/connect'
import routes from './routes/index'

class App {
    public app:Application
    constructor(){
        this.app = express()
        this.plugin()
        this.route()
    }

    protected plugin():void{
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.json())
        mongoDB()
    }

    protected route():void{
        this.app.use("/", routes);
    }
}

const port = 8080;
const app = new App().app
app.listen(port, () => {
    console.log(`App runs on http://localhost:${port}`);
})

export default app
