// this is global erroe handling class which will be responsible for handling global errors
class appError extends Error{
    constructor(msg, statusCode){
        super(msg)

        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith("4")?"fail":"error";

        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = appError;