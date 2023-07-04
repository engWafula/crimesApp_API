const Crime = require("../models/crime")
const User = require("../models/user")

exports.addCrime = async (req,res)=>{
   try {
    const {description,suspect,category,suspect1,suspect2,location,nin,nin1,nin2} = req.body

    const user = await User.findById(req.userId)
    if(user.role!="police"){
      return res.status(401).json({message:"You are not authorised to add a crime"})
    }
    var firstThree = category.substring(0, 3);
    var uppercaseValue = firstThree.toUpperCase();
    var min = 1000; 
    var max = 9999;
    
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const crimeNo = `${uppercaseValue}-${randomNumber}`
    const crime = new Crime({
        name:'Crime',
        description:description,
        suspect:suspect,
        category:category,
        suspect1:suspect1,
        suspect2:suspect2,
        uploader:req.userId,
        caseNumber:crimeNo,
        location:location,
        nin:nin,
        nin1:nin1,
        nin2:nin2
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
        const crimes = await Crime.find().sort({ createdAt: -1 }).populate('uploader');
        res.status(200).json({data:crimes})
    } catch (error) {
        console.log(error)
    }
}
