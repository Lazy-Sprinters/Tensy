const validator=require('validator');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const ManufacturerSchema=mongoose.Schema({
      CompanyName:{
            type: String,
            required: true,
            trim:true
      },
      PhoneNumber:{
            type: String,
            required: true
      },
      ManufacturerId:{
            type:String,
            required:true
      },
      Email:{
            type: String,
            required:true,
            unique:true,
            trim: true,
            lowercase: true,
            validate(value){
                  if (!validator.isEmail(value)){
                        throw new Error('Email is invalid');
                  }
            }
      },
      Password:{
            type:String,
            required:true
      },
      RecentMobileOtps:[Number],
      RecentEmailOtps:[Number],
      Status:{
            type:Boolean //true means activated ;;false means not activated
      },
      Address:{
            type:String,
            required:true
      }
      
});

//Adding below options will automatically hide all auth-related data for the user

ManufacturerSchema.methods.toJSON=function(){
      const manufacturer=this;
      const manufacturerobj=manufacturer.toObject();

      // delete manufacturerobj.Password
      // delete manufacturerobj.tokens;
      // delete manufacturerobj.RecentMobileOtps;
      // delete manufacturerobj.RecentEmailOtps;
      return manufacturerobj;
}

ManufacturerSchema.methods.generateauthtoken=async function(){
      const manu=this;
      const token=jwt.sign({_id:manu._id.toString()},'Sprinting');
      manu.tokens=manu.tokens.concat({token: token});
      await manu.save();
      return token;
}

ManufacturerSchema.statics.findbycredentials=async (email,password)=>{
      const manu=await Manufacturer.findOne({Email:email});
      if (!manu)
      {
            throw new Error("Unable to login");
      }
      const isMatch=await bcrypt.compare(password,manu.Password);
      if (!isMatch)
      {
            throw new Error('Unable to login');
      }
      return manu;
}


ManufacturerSchema.pre('save',async function(next){
      if (this.isModified('Password')){
            const hash=await bcrypt.hash(this.Password,8);
            this.Password=hash;
      }
      next();
});


const Manufacturer=mongoose.model('Manufacturer',ManufacturerSchema);

module.exports=Manufacturer;