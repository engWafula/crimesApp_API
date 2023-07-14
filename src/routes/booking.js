const express = require("express")
const bookingController = require("../controllers/booking")

const router = express.Router()

router.post("/",bookingController.createHouse)
router.get("/",bookingController.getHouses)
router.get("/house/:id",bookingController.getHouse)
router.post("/make",bookingController.makePurchase)
router.get('/seller/bookings/:id',bookingController.getPurchaseRequests)
router.get("/:buyer",bookingController.getBookings)
router.patch('/seller/confirm',bookingController.confirmPurchase)
router.get("/sells/:buyer",bookingController.getSells)


module.exports = router 