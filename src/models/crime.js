const mongoose = require("mongoose")

const Schema = mongoose.Schema

const crimeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  caseNumber:{
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  suspect: {
    type: String,
    required:true
  },
  nin:{
    type: String,
    required:true
  },
  nin1:{
    type: String,
    required:false
  },
  nin2:{
    type: String,
    required:false
  },
  suspect1: {
    type: String,
    required:false
  },
  suspect2: {
    type: String,
    required:false
  },
  uploader: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    location:{
      type: String,
      required:false
    }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Crime', crimeSchema);

