// here it will be defined async handler function to avoid from repeatation of try/catch

function asyncHandler (fn){
    return (req, res, next)=>{
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

module.exports = asyncHandler;
