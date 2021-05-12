const mongoose = require('mongoose')


const todos = new mongoose.Schema({

    activityname: {
        type: String,
        required: true
    },
    activitytime: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }

})

module.exports=mongoose.model('Todos',todos)