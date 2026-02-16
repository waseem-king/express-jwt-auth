// this is the module to define the schema for creating post 
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true
    },
    image:{
        type:String  // original image path 
    },
    processedImage:{
        type:String  // resize or compressed image path
    },
    isProcessed:{
        type:Boolean,
        default:false
    }

},
{
    timestamps:true
}
)

module.exports = mongoose.model("Post", postSchema);