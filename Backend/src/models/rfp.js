const mongoose=require('mongoose');

const rfpSchema=mongoose.Schema({
      
});

const Appointment=mongoose.model('Appointment',rfpSchema);

module.exports=Appointment;