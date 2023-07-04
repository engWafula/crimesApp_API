const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  idNumber:{
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required:true
  },
  crimes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Crimes',
    },
  ],
  forensics:[
       
        {
            type: Schema.Types.ObjectId,
            ref: 'Forensics',
          },
       
  ] 
}, {
  timestamps: true,
});

module.exports = mongoose.model("User",userSchema)
