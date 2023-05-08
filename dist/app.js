const express = require("express")
const authRoutes = require("./routes/auth")
const crimeRoutes = require("./routes/crime")
const forensicRoutes = require("./routes/forensics")

const cors = require("cors")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();

app.use(bodyParser.json())
app.use(cors())


 app.use("/api/auth",authRoutes)
 app.use("/api/crimes",crimeRoutes)
 app.use("/api/forensics",forensicRoutes)



const PORT = process.env.PORT || 9000;


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1ht5yg0.mongodb.net/test`).then(()=>{
   app.listen(PORT,()=>{
    console.log(`connected on port ${PORT}`)
   })

}).catch((err)=>{
 console.log(err)
})

