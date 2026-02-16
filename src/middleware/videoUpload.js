// this is the module to handle video upload 
const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "uploads/videos")
    },
    filename:(req, file, cb)=>{
        cb(null, Date.now() + "-" + file.originalname)
    }
})

// check which files are accepted or supported
const fileFilter = (req, file, cb)=>{
    const allowedTypes = ["video/mp4", "video/mkv", "video/avi"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("Do not support this video type"), false)
    }
}

const upload = multer({
    storage, 
    fileFilter,
    limits:{ fileSize: 100 * 1024 * 1024} // 100mb
})

module.exports = upload;