const mongoose=require('mongoose');

const rfpSchema=mongoose.Schema({
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
      DeadlineDate:{
            type:String,
            required:true
      },
      Manufacturer:{
            type:String,
            required:true,
      },
      Manufacturer_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      ModeofDelivery:{
            type:String,
            required:true
      },
      Status:{
            type:String,
            required:true
      },
      Action_taken:[{
            vendor_id:{
                  type:mongoose.Schema.Types.ObjectId
            }
      }]
});

const Rfp=mongoose.model('Rfp',rfpSchema);

module.exports=Rfp;