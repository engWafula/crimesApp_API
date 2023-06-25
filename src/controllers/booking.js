
const Bookings = require("../models/booking")

exports.makeBooking = async(req,res)=>{
   try {
      const {owner,description,imgUrl,buyer,name,city,id,price} = req.body

        const booking = new Bookings({
          owner,
          description,
          imgUrl,
          buyer,
          name,
          city,
          id,
          price
        })
        
        await booking.save()
     res.status(201).json({message:"Booked successfully"})
   } catch (error) {
    console.log(error)
   }
}


exports.getBookings = async(req,res)=>{
    try {
        const {buyer}= req.params
        const bookings = await Bookings.find({buyer:buyer})
        res.status(200).json({data:bookings})

    } catch (error) {
      console.log(error)    
    }
}