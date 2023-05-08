const User = require("../models/user")

const bycrpt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.Login = async (req,res,next)=>{
    const email = req.body.email
    const password = req.body.password
    

    try {
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(422).json({message:"User with this email couldn't be found"})
             }
        const isEqual = await   bycrpt.compare(password,user.password)
        if(!isEqual){
            return res.status(422).json({message:"Invalid password"})

        }
        const token = jwt.sign({
            email:user.email,
            userId:user._id.toString()
        },'crimessssssssssssssssssssssssssssssssssss')

        res.status(200).json({token:token,userId:user._id.toString(),role:user.role})
   
        return ;
       
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500
        } 
        next(err)
        return err
    }
    
}


exports.signUp = async (req,res)=>{
  try {
    const {name,email,password,role} = req.body
    const user = await User.findOne({email:email})

    if(user){
      return  res.status(401).json({message:"User with that email already exists"})
    }

    const hashedPassword = await bycrpt.hash(password,12)
    const userData = new User({
        email:email,
        password:hashedPassword,
        name:name,
        role:role
    })

    const result = await userData.save()
    res.status(201).json({message:"User Created",userId:result._id})


  } catch (error) {
    console.log(error)
  }
}