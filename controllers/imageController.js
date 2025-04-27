const Together = require("together-ai");
const { uploadBase64toImage } = require("../utils");
const ImageModel = require("../models/ImageModel");

const apikey = process.env.TOGETHER_API_KEY;

const generateImage = async (req, res) => {
  try {
    const togther = new Together({ apikey });
    const { prompt } = req.body;

    const respose = await togther.images.create({
      prompt,
      model: "black-forest-labs/FLUX.1-schnell-Free",
      width: 1024,
      height: 768,
      steps: 4,
      n: 1,
      response_format: "b64_json",
    });

    console.log("Together API response:", respose);

    const base64Image = respose?.base64 || respose?.data?.[0]?.b64_json;

    if (!base64Image) {
      return res.status(500).json({ error: "Failed to generate base64 image" });
    }

    const imageUrl = await uploadBase64toImage(base64Image);

    if (!imageUrl) {
      return res.status(500).json({ error: "Failed to upload image" });
    }

    await ImageModel.create({ prompt, imageUrl });

    return res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
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
