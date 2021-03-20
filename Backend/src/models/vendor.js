const validator=require('validator');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const VendorSchema=mongoose.Schema({
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
      },
      Services:[String],
});

//Adding below options will automatically hide all auth-related data for the user
VendorSchema.methods.toJSON=function(){
      const vendor=this;
      const vendorobj=vendor.toObject();

      // delete vendorobj.Password
      // delete vendorobj.tokens;
      // delete vendorobj.RecentMobileOtps;
      // delete vendorobj.RecentEmailOtps;
      return vendorobj;
}

VendorSchema.statics.findbycredentials=async (email,password)=>{
      const ven=await Vendor.findOne({Email:email});
      if (!ven)
      {
            throw new Error("Unable to login");
      }
      const isMatch=await bcrypt.compare(password,ven.Password);
      if (!isMatch)
      {
            throw new Error('Unable to login');
      }
      return ven;
}


VendorSchema.pre('save',async function(next){
      if (this.isModified('Password')){
            const hash=await bcrypt.hash(this.Password,8);
            this.Password=hash;
      }
      next();
});


const Vendor=mongoose.model('Vendor',VendorSchema);

module.exports=Vendor;