import mongoose from "mongoose"

class mongoDB {
  constructor() {
    this.connect()
  }
    public connect():void{
        mongoose.connect(process.env.DBHOST, {
          useUnifiedTopology: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useCreateIndex: true,
        }, ()=>{
          console.log("connected to database");
        })
      }
    }
    
export default new mongoDB().connect;
      

