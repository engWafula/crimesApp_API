const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const forensicsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], // Make photos an array of strings
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Forensics', forensicsSchema);


