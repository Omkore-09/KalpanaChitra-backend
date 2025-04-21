const express = require('express')
// const app = express()
const router = express.Router();
const {generateImage, getImages} = require("../controllers/imageController")

router.post("/generate-image" , generateImage);
router.get("/discover-image" , getImages);

module.exports = router;