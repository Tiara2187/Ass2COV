import mongoose from 'mongoose'

interface IBarrack extends mongoose.Document
{
    solidercapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    barrackname: string,
    lastcollect: number
}

interface IBarrackDoc extends mongoose.Document
{
    solidercapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    barrackname: string,
    lastcollect: number
}

interface MBarrack extends mongoose.Model<IBarrack>{
    build(attr:IBarrack):IBarrackDoc
}

const barrackSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    barrackname: { type: String, required: true },
    lastcollect:{
        type: Number,
        default: Date.now()
    }
},
{
    timestamps: true
}
);

const Barrack = mongoose.model<IBarrackDoc,MBarrack>('Barrack', barrackSchema);
      
export {Barrack}
