// this is the module to handle image worker , when image will be uploaded it will be processed by this worker 
const Post = require("../model/post.model");
const sharp = require("sharp");
const imageQueue = require("../queues/image.queue");

console.log("Image worker started...")

imageQueue.process( async (job)=>{
    try {
        console.log("Processing the image for id:", job.data.postId)
        const outputPath = `uploads/processed-${Date.now().jpg}`
        await sharp(job.data.imagePath)
            .resize(300, 300)
            .jpeg({quality:70})
            .toFile(outputPath)
        
        await Post.findByIdAndUpdate(job.data.postId, {
            processedImage:outputPath,
            isProcessed:true
        })
         console.log("Image processed successfully");
    } catch (error) {
        console.error("Image Processing Failed:", error.message)
        throw error;
    }
})