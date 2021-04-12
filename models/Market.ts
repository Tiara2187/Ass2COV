import mongoose from 'mongoose'

interface IMarket extends mongoose.Document 
{
   
    goldcapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    marketname: string,
    lastcollect: number

}

interface IMarketDoc extends mongoose.Document
{
    goldcapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    marketname: string,
    lastcollect: number
}

interface MMarket extends mongoose.Model<IMarket>{
    build(attr:IMarket):IMarketDoc
}

const marketSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    marketname: { type: String, required:true },
    lastcollect:{
        type: Number, 
        default: Date.now()
    },
},
    {
        timestamps: true
    }
);

const Market = mongoose.model<IMarketDoc,MMarket>('Market', marketSchema);
      
export {Market}
 
