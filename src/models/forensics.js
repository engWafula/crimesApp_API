const mongoose = require('mongoose');
const Crime = require('./crime')
const Schema = mongoose.Schema;

const forensicsSchema = new Schema({
  crimeId: {
      type: Schema.Types.ObjectId,
      ref: 'Crime',
    },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: [String], // Make photos an array of strings
    required: false,
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Forensics', forensicsSchema);


