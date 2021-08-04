const mongoose = require('mongoose')

const connectDB = (uri) =>{
    return mongoose.connect(uri, {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser:true,
        useFindAndModify: false
    })
}

module.exports = connectDB