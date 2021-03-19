const mongoose=require('mongoose');

const aggreementSchema=mongoose.Schema({
      consumer_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      supplier_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      selected_proposal_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      proposals:{

      },
});

const Agreement=mongoose.model('Agreement',aggreementSchema);

module.exports=Agreement;