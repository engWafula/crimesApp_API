const Crime = require("../models/crime")
const User = require("../models/user")

exports.addCrime = async (req,res)=>{
   try {
    const {name,description,crimeCode,suspect} = req.body

    const user = await User.findById(req.userId)
    if(user.role!="police"){
      return res.status(401).json({message:"You are not authorised to add a crime"})
    }
    const crime = new Crime({
        name:name,
        description:description,
        code:crimeCode,
        suspect:suspect
    })
    await crime.save()

    user.crimes.push(crime._id); 
      await user.save();

    res.status(201).json({message:"crime created",data:crime})
   } catch (error) {
    console.log(error)
   }
}



exports.getCrimes = async(req,res)=>{
    try {
        const crimes = await Crime.find().sort({ createdAt: -1 });
        res.status(200).json({data:crimes})
    } catch (error) {
        console.log(error)
    }
}
