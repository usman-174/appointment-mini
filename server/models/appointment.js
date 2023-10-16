const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
 
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, 
    required: true,
  },
  status: {
    type :String,
    default : "pending"
  }
  
},{
  timestamps:true
});
appointmentSchema.set('toJSON', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
