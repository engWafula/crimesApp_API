
const User = require("../models/user")
const Forensic = require("../models/forensics")

exports.addForensics = async(req,res)=>{
   try {
      const {name,description,photos} = req.body

      const user = await User.findById(req.userId)
      if(user.role!="forensics"){
        return res.status(401).json({message:"You are not authorised to create a forensic report"})
      }
      const foresics = new Forensic({
        name:name,
        description:description,
        photos:photos
      })

      await foresics.save()
      res.status(201).json({message:"report created"})
   } catch (error) {
    console.log(error)
   }
}

exports.getForensics = async(req,res)=>{
  try {
      const data = await Forensic.find()
      res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
  }
}