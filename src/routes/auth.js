const express = require("express")
const authController = require("../controllers/auth")
const isAuth = require("../middleware/isAuth")

const router = express.Router()

router.post("/signup",isAuth,authController.signUp)

router.post("/login",authController.Login)

router.post("/delete/account/:id",authController.deleteUser)


module.exports = router 