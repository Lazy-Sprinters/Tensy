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
      rfpid:{
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
            type:Number,
            required:true
      },
      Total_Quantity_required:{
            type:Number,
            required:true
      },
      EndDate:{
            type:Number,
            required:true
      },
      DeadlineDate:{
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
      Status:{
            type:Boolean
      }
});

const Agreement=mongoose.model('Agreement',aggreementSchema);

module.exports=Agreement;