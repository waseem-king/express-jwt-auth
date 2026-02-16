// this is the controller to handle video uploading
const Vido = require("../model/video.model")
const AppError = require("../middleware/appError")
const asyncHandler = require("../utils/asyncHandler")
const userServices = require("../services/user.services")

const vieoUploadController = async(req, res)=>{
    const { name , caption, description } = req.body;
    if(!req.file){
        return new AppError("Video file is required", 400)
    }
    const video = req.file.path;
    const result = await userServices.uploadVideo({name, caption, description, video})
    if(!result){
        return new AppError("video not stored on database", 400)
    }
    res.status(201).json({
        message:"Video Uploaded successfully",
        data:video
    })
}

module.exports = vieoUploadController;