const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  buyer:{
    type:String,
    required:false
  },
  seller:{
    type:String,
    required:false
  },
  buyerContact:{
    type:String,
    required:false
  },
  status:{
    type: String,
    default: "pending",
    required:false
  },
  houseId: {
    type: Schema.Types.ObjectId,
    ref: 'House',
    required:false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bookings', bookingSchema );


