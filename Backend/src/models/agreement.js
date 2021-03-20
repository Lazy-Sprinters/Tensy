const mongoose=require('mongoose');

const aggreementSchema=mongoose.Schema({
      Manufacturer_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      Vendor_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      Product_Name:{
            type:String,
            trim:true,
            required:true
      },
      Unit:{
            type:String,
            required:true,
            trim:true
      },
      Cost_per_Unit:{
            type:Number,
            required:true,
      },
      StartDate:{
            type:String,
            required:true
      },
      Total_Quantity_required:{
            type:Number,
            required:true
      },
      EndDate:{
            type:String,
            required:true
      },
      ModeofDelivery:{
            type:String,
            required:true
      },
      Manufacturer:{
            type:String,
            required:true,
      },
      Manufacturer_Address:{
            type:String,
            required:true
      },
      Vendor:{
            type:String,
            required:true,
      },
      Vendor_Address:{
            type:String,
            required:true
      },
});

const Agreement=mongoose.model('Agreement',aggreementSchema);

module.exports=Agreement;