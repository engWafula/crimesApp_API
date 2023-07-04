const User = require("../models/user")
const {sendEmails} = require("../services/emails")
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
    const {name,email,password,role,id} = req.body
    const user = await User.findOne({email:email})
    const admin = await User.findOne({_id:req.userId,role:"admin"})
    if(!admin){
      return  res.status(401).json({message:"You are not authorised to register a user"})

    }
    if(user){
      return  res.status(401).json({message:"User with that email already exists"})
    }

    const hashedPassword = await bycrpt.hash(password,12)
    const userData = new User({
        email:email,
        password:hashedPassword,
        name:name,
        role:role,
        idNumber:id
    })

    const result = await userData.save()
    const message = `
    <p>Welcome to a tamper proof crime management system. Please find your password information below:</p>
   <ol>
   <li>Use this password to login:${password}</li>
   <li>If you were not supposed to have an account with us, please ignore this email.</li>
   </ol>
`;        

await sendEmails(message, email, "Account Creation")
    res.status(201).json({message:"User Created",userId:result._id})


  } catch (error) {
    console.log(error)
  }
}

exports.deleteUser = async(req,res)=>{
  try {
     const {id} = req.params
  const user = await User.findById(id)
     const message = `
     <p>Your account has been deleted you can nolonger access this system</p>
    <ol>
    <li>Contact support</li>
    <li>If you were not supposed to have an account with us, please ignore this email.</li>
    </ol>
 `;        
 
 await sendEmails(message, user.email, "Account Deletion")
     await User.findByIdAndDelete(id)
     res.status(201).json({message:"User deleted"})
  } catch (error) {
    console.log(error)

  }
}