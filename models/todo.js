const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true,
    },
    user:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default: Date.now,
    },
    isDone:{
        type:Boolean,
        default:false,
    }
});

const TODO = mongoose.model('Todo',toDoSchema);

module.exports = TODO;