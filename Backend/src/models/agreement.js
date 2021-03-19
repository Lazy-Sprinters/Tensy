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
      rpf_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      Status:{
            type:Boolean
      }
});

const Agreement=mongoose.model('Agreement',aggreementSchema);

module.exports=Agreement;