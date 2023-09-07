const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
    roll : {
        type : String,
        required : true
       },
    name : {
     type : String,
     required : true
    },
    stream : {
        type : String,
        required : true
       },
    year: {
        type : String,
        required : true
       },
    subscribeDate : {
        type : Date,
        required : true,
        default : Date.now
    }
})

module.exports = mongoose.model('subscriber',subscriberSchema)