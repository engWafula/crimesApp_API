const express = require("express")
const crimeController = require("../controllers/crime")
const isAuth = require("../middleware/isAuth")

const router = express.Router()

router.post("/create",isAuth,crimeController.addCrime)

router.get("/",isAuth,crimeController.getCrimes)


module.exports = router 