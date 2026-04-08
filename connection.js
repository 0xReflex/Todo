const mongoose = require('mongoose');

async function connectToMongoose(url){
    try{
        await mongoose.connect(url);
        console.log('connected to DB');
    }catch(err){
        return console.log({err: 'Something Wrong with server'}, err);
    }
}

module.exports = {
    connectToMongoose
}