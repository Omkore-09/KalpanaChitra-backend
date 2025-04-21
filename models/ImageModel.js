const  mongoose  = require("mongoose");

const imageSchema = new mongoose.Schema({
    prompt: {
        type: String, 
        required: true,
        trim: true
    },
    imageUrl : {
        type : String, 
        required: true
    }
},{
    timestamps: true,
    versionKey: false
}
)

const ImageModel = mongoose.model("generateImage", imageSchema)
module.exports = ImageModel;
