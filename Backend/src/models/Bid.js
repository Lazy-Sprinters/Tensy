const mongoose=require('mongoose');

const BidSchema=mongoose.Schema({
      Status:{
            type:Boolean
      },
      vendor_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      manufacturer_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      rfp_id:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
      },
      All_negotiation:[{
            Quote_Cost_per_Unit:{
                  type:Number
            },
            Quote_EndDate:{
                  type:String
            },
            Quote_ModeofDelivery:{
                  type:String
            },
            Quote_owner:{
                  type:mongoose.Schema.Types.ObjectId,
            }
      }],
})

const Bid=mongoose.model('Bid',BidSchema);

module.exports=Bid;