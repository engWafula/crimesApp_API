const express = require("express")
const bookingController = require("../controllers/booking")

const router = express.Router()

router.post("/",bookingController.makeBooking)

router.get("/:buyer",bookingController.getBookings)


module.exports = router 