
const booking = require("../models/booking")
const Bookings = require("../models/booking")
const house = require("../models/house")
const {sendEmails} = require("../services/emails")

exports.createHouse = async(req,res)=>{
   try {
      const {owner,description,imgUrl,name,city,id,price,latitude,longitude,contact} = req.body

        const property = new house({
          owner,
          description,
          imgUrl,
          name,
          city,
          id,
          price,
          lat:latitude,
          long:longitude,
          contact
        })
        
        await property.save()
     res.status(201).json({message:"House added successfully"})
   } catch (error) {
    console.log(error)
   }
}

exports.getHouses = async(req,res)=>{
  try {
    const data = await house.find({sold:false})
    res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
    
  }
}

exports.getHouse = async(req,res)=>{
  try {
    const {id} = req.params
    const data = await house.findById(id)
    res.status(200).json({data:data})
  } catch (error) {
    console.log(error)
  }
}

exports.makePurchase = async(req,res)=>{
  try {
    console.log("working")
    const {buyer,id,email,seller} = req.body
    const property = await house.findById(id)
    const booking = new Bookings({
      buyer,
      buyerContact:email,
      houseId:id,
      seller
    })
    booking.save()

    const message = `
    <p>You have a new request from ${email} to purchase your house.</p>
   <ol>
   <li>Please access the system to either accpet or cancel the request</li>
   <li>If you were not supposed to have an account with us, please ignore this email.</li>
   </ol>
`;        

await sendEmails(message, property.contact, "Property purchase")
res.status(201).json({data:"Property purchase request initiated successfully"})
  } catch (error) {
    console.log(error)
  }
}


exports.getPurchaseRequests = async(req,res)=>{
  try {
    const {id} = req.params
    const data = await Bookings.find({seller:id,status:"pending"}).populate('houseId')
    res.status(201).json({data:data})
  } catch (error) {
    console.log(error)

  }
}

exports.confirmPurchase = async(req,res)=>{
  try {
    const {id} = req.body
    const book = await Bookings.findById(id)
    const seller = book.seller
    const buyer = book.buyer
    const houseid = book.houseId
    book.status = 'sold';
    await book.save();
    const hous = await house.findById(houseid.toString())
    hous.sold = true
    hous.save()
    // console.log(seller,buyer,houseid.toString())
  //   const txt = await house.findById(houseId);
  //  console.log(txt)
  

  //   const booker = await  Bookings.findOne({houseId:houseId})

//     const message = `
//     <p>You have now successfully purchased a house from a seller with metamask address seller.</p>
//    <li>If you were not supposed to have an account with us, please ignore this email.</li>
//    </ol>
// `;        

    res.status(201).json({data:"Purchase confirmed"})
    // await sendEmails(message,booker.buyerContact, "Property purchase")

  } catch (error) {
    console.log(error)

    
  }
}


exports.getBookings = async(req,res)=>{
    try {
        const {buyer}= req.params
        const bookings = await Bookings.find({buyer:buyer}).populate('houseId')
        res.status(200).json({data:bookings})

    } catch (error) {
      console.log(error)    
    }
}



exports.getSells = async(req,res)=>{
  try {
      const {buyer}= req.params
      const bookings = await house.find({owner:buyer})
      res.status(200).json({data:bookings})

  } catch (error) {
    console.log(error)    
  }
}