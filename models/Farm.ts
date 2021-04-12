import mongoose from 'mongoose'

interface IFarm extends mongoose.Document
{
    foodcapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    farmname: string,
    lastcollect: number
}

interface IFarmDoc extends mongoose.Document
{
    foodcapacity: any;
    _userId: mongoose.Schema.Types.ObjectId,
    farmname: string,
    lastcollect: number
}

interface MFarm extends mongoose.Model<IFarm>{
    build(attr:IFarm):IFarmDoc
}

const farmSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    farmname: { type: String, required: true },
    lastcollect:{
        type: Number,
        default: Date.now()
    }
},
{
    timestamps: true
}
);

const Farm = mongoose.model<IFarmDoc,MFarm>('Farm', farmSchema);
      
export {Farm}
