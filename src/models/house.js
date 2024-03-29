const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
  owner: {
      type: String,
      required: false,
    },
    contact:{
        type: String,
        required: false
    },
  description: {
    type: String,
    required: false,
  },
  imgUrl: {
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
  },
  lat:{
    type:Number,
    required:false
  },
  long:{
    type:Number,
    required:false
  },
  sold:{
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('House', houseSchema );


