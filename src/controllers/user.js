const User = require("../models/user")

exports.getUsers = async(req,res)=>{
    try {

        // const admin = await User.findOne({_id:req.userId,role:"admin"})
        // if(!admin){
        //   return  res.status(401).json({message:"You are not authorised to get a user"})
    
        // }
        const users = await User.find({ role: { $ne: "admin" } }).sort({ createdAt: -1 });
        res.status(200).json({data:users})
    } catch (error) {
        console.log(error)
    }
}
