// this is the module in which it will be define the schema of uploading video from user
const mongoose = require("mongoose")

const videoSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true
    },
    caption:String,
    description:String,
    video:{
        type:String,
        reuired:true
    },
    isProcessed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true,
}
)

module.exports = mongoose.model("Video", videoSchema)