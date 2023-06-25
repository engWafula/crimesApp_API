const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  owner: {
      type: String,
      required: false,
    },
  description: {
    type: String,
    required: false,
  },
  imgUrl: {
    type: String,
    required: false,
  },
  buyer: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  id:{
    type:Number,
    required:false
  },
  price:{
    type:String,
    required:false
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Bookings', bookingSchema );


