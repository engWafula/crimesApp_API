
const booking = require("../models/booking")
const Bookings = require("../models/booking")
const house = require("../models/house")
const {sendEmails} = require("../services/emails")

exports.createHouse = async(req,res)=>{
   try {
      const {owner,description,imgUrl,name,city,price,latitude,longitude,contact} = req.body

        const property = new house({
          owner,
          description,
          imgUrl,
          name,
          city,
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
    <p>You have a new request from person with email ${email} and metamask address buyer to purchase your house.</p>
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

    const message = `
    <h3>Property Sell Agreement on Immobiler Real Estate decentralised sysytem</h3>
    
    <p>This Property Sell Agreement (hereinafter referred to as the "Agreement") is made and entered into on this ${new Date()} (hereinafter referred to as the "Effective Date") by and between:</p>
    
    <p><strong>Seller:</strong></p>
    <ul>
        <li>Metamask Address: ${seller}</li>
    </ul>
    
    <p><strong>Buyer:</strong></p>
    <ul>
        <li>Address: ${buyer}</li>
    </ul>
    
    <p>WHEREAS, the Seller is the lawful owner of the real estate property located at:</p>
    
    <ul>
        <li>Property Address: ${hous.city}</li>
    </ul>
    
    <p>and desires to sell the said property to the Buyer; and</p>
    
    <p>WHEREAS, the Buyer is willing to purchase the property upon the terms and conditions set forth in this Agreement.</p>
    
    <p>NOW, THEREFORE, in consideration of the mutual covenants and agreements contained herein, the Parties hereby agree as follows:</p>
    
    <h4>1. PROPERTY DESCRIPTION</h4>
    <p>The Seller agrees to sell the real estate property described as follows:</p>
    <ul>
        <li>Property Address: ${hous.city}</li>
        <li>Legal Description: ${hous.description}</li>
    </ul>
    
    <h4>2. PURCHASE PRICE</h4>
    <p>The Buyer agrees to purchase the above-described property from the Seller for the total purchase price of Ugx${hous.price} (hereinafter referred to as the "Purchase Price"). The Purchase Price shall be paid as follows:</p>

    
    <h4>3. CLOSING</h4>
    <p>The closing of this transaction shall take place on or before [Closing Date], at a mutually agreed-upon location, unless extended by written agreement of the Parties. At the closing, the Seller shall deliver to the Buyer a duly executed and acknowledged deed conveying the property to the Buyer.</p>
    
    <h4>4. REPRESENTATIONS AND WARRANTIES</h4>
    <p><strong>4.1 Seller's Representations and Warranties</strong></p>
    <p>The Seller represents and warrants the following:</p>
    <ul>
        <li>Legal Ownership: The Seller is the legal owner of the property and has the authority to sell it.</li>
        <li>Encumbrances: The property is free and clear of any liens, encumbrances, or claims.</li>
        <li>Title: The Seller shall convey good and marketable title to the property to the Buyer.</li>
        <li>Disclosure: The Seller has disclosed all material defects, known encumbrances, or other issues related to the property.</li>
    </ul>
    
    <p><strong>4.2 Buyer's Representations and Warranties</strong></p>
    <p>The Buyer represents and warrants the following:</p>
    <ul>
        <li>Capacity: The Buyer has the legal capacity and authority to enter into this Agreement.</li>
        <li>Financing: The Buyer has sufficient funds or financing arrangements to fulfill the obligations under this Agreement.</li>
        <li>Due Diligence: The Buyer has conducted due diligence on the property to their satisfaction.</li>
    </ul>
    
    <h4>5. DEFAULT</h4>
    <p>In the event of a default by either Party, the non-defaulting Party shall have the right to pursue any remedies available under applicable law or equity, including specific performance or termination of this Agreement.</p>
    
    <h4>6. GOVERNING LAW AND JURISDICTION</h4>
    <p>This Agreement shall be governed by and construed in accordance with the laws of [State/Country]. Any disputes arising out of or in connection with this Agreement shall be subject to the exclusive jurisdiction of the courts of [State/Country].</p>
    
    <h4>7. ENTIRE AGREEMENT</h4>
    <p>This Agreement contains the entire understanding between the Parties and supersedes all prior agreements, representations, or understandings, whether oral or written.</p>
    
    <p>If you have any questions or need further clarification regarding this Agreement or the property purchase, please feel free to contact us at [Contact Information].</p>
    
    <p>Thank you for choosing our services. We wish you many happy years in your new home!</p>    
`;     



 await sendEmails(message,`${book.buyerContact}`, "Property Purchase Agreement")
await sendEmails(message,`${hous.contact}`, "Property  Sell Agreement")
    res.status(201).json({data:"Purchase confirmed"})


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