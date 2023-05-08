const mongoose = require("mongoose")

const Schema = mongoose.Schema

const crimeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  suspect: {
    type: String,
    required:true
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Crime', crimeSchema);

