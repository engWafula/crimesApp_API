
const User = require("../models/user")
const Forensic = require("../models/forensics")

exports.addForensics = async(req,res)=>{
   try {
      const {crimeId,description,photos} = req.body
      const user = await User.findById(req.userId)
      if(user.role!="forensics"){
        return res.status(401).json({message:"You are not authorised to create a forensic report"})
      }
      const crime = await Forensic.findOne({crimeId:crimeId})

      if(!crime){
        const foresic = new Forensic({
          crimeId:crimeId,
          description:description,
          photos:photos,
          uploader:req.userId
        })
        
        await foresic.save()
        user.forensics.push(foresic._id); 
        await user.save();
       return  res.status(201).json({message:"report created"})

      }

      crime.photos.push(...photos);
      await crime.save();
    
     res.status(201).json({ message: "Photos added to existing crime report" });

   } catch (error) {
    console.log(error)
   }
}

exports.getForensics = async(req,res)=>{
  try {
      const data = await Forensic.find().populate(['crimeId','uploader']).sort({ createdAt: -1 });
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