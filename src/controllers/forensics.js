
const User = require("../models/user")
const Forensic = require("../models/forensics")
const { Cloudinary } = require("../services/cloudinary")

exports.addForensics = async(req,res)=>{
   try {
      const {crimeId,description,photos} = req.body
       let images = []
      const user = await User.findById(req.userId)
      if(user.role!="forensics"){
        return res.status(401).json({message:"You are not authorised to create a forensic report"})
      }
      for(image of photos){
        const url = Cloudinary.upload(image)
        console.log(url)
         images.push(url)
      }
      const foresics = new Forensic({
        crimeId:crimeId,
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
      const data = await Forensic.find().populate('crimeId').sort({ createdAt: -1 });
      res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
  }
}

exports.getForensic = async(req,res)=>{
  try {
    const id = req.params.id
      const data = await Forensic.findById(id).populate('crimeId')
      res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
  }
}