import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

interface IUser extends mongoose.Document 
{
    _userId:number,
    username: string,
    email: string,
    password: string,
    medal: number,
    townhall: string,
    resources:{
        golds: number,
        foods: number,
        soliders: number
    }
}

interface IUserDoc extends mongoose.Document 
{
    _userId:number,
    username: string,
    email: string,
    password: string,
    medal: number,
    townhall: string,
    resources:{
        golds: number,
        foods: number,
        soliders: number
    }
}

interface MUser extends mongoose.Model<IUser>{
    build(attr:IUser):IUserDoc
}




const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please valid email address'] 
    },
    password: { type: String, minlength: 6, required: true },
    resources: {
      golds: { type: Number, default: 100, max: 1000, min: 0 },
      foods: { type: Number, default: 100, max: 1000, min: 0 },
      soliders: { type: Number, default: 0, max: 500, min: 0 },
    },
      medal: { type: Number, default: 0 },
      townhall: { type: String, default: 'ClassName' },
      },
  
      {
        timestamps:true
      }
    );


    userSchema.pre('save', function <IUser>(next) {
        User.findOne({ username: this.username, email: this.email })
          .then((user) => {
            if (user) {
              next({ name: 'EMAIL_ALREADY_EXISTS' });
            } else {
              this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
              next();
            }
          })
          .catch((e) => next('MONGOOSE_ERROR'));
      });
      
    const User = mongoose.model<IUserDoc,MUser>('User', userSchema);
      
     export {User}
      


