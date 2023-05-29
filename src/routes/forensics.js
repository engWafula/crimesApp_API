const express = require("express")
const forensicController = require("../controllers/forensics")
const isAuth = require("../middleware/isAuth")

const router = express.Router()

router.post("/create",isAuth,forensicController.addForensics)

router.get("/",isAuth,forensicController.getForensics)
router.get("/:id",isAuth,forensicController.getForensic)


module.exports = router 