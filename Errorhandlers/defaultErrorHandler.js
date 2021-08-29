const { customErrorClass } = require("./customErrorHandle")

const defaultErrorHandler = (err, req, res, next) => {
    if(err instanceof customErrorClass){
        return res.status(err.statusCode).json({message: err.message})
    }
    console.log(err);
    res.status(500).json({message: err.message})
} 

module.exports = defaultErrorHandler