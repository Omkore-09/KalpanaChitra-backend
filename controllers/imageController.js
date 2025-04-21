const Together = require("together-ai");
const { uploadBase64toImage } = require("../utils");
const ImageModel = require("../models/ImageModel");

const apikey = process.env.TOGETHER_API_KEY;

const generateImage = async (req, res) => {
  try {
    const togther = new Together({apikey});
    const { prompt } = req.body;

    let respose = await togther.images.create({
      prompt,
      model: "black-forest-labs/FLUX.1-schnell-Free",
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      response_format: "b64_json",
    });
    const base64Image= respose?.data[0]?.b64_json;

    const imageUrl = await uploadBase64toImage(base64Image)

    await ImageModel.create({prompt , imageUrl});
    // await newImage.save()

    return res.status(200).json({ imageUrl });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getImages = async(req , res)=>{
  try {
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||10;

    const totalImages = await ImageModel.countDocuments();
    const images = await ImageModel.find().skip((page-1)*limit).limit(limit).sort({createdAt : -1})

    const data = {
      images,
      totalPages : Math.ceil(totalImages/limit),
      currentPage : page
    }
    // const images = 
        return res.status(200).json(data)
  } catch (error) {
      return res.status(500).json({error : error?.message})
  }
}

module.exports = {
  generateImage,
  getImages,
};
