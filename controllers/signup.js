const USER = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


function schemaCheck(req){
    const username = req.body?.username;
    const password = req.body?.password;

    if(!username || !password){
        return {err:'Bad request'};
    }
    return {
        username: username.trim(),
        password: password.trim()
    }
}

async function signup(req, res){
    const valid = schemaCheck(req);
    console.log('Signup is Called');
    if(valid.err){
        return res.status(400).json({err:'Bad request'});
    }
    try{    
        const userFound = await USER.findOne({user:valid.username});
        // console.log(valid.username);
        if(!userFound){
            return res.status(400).json({err:'User doesnt exists'});
        }
        if(valid.password !== userFound.password){
            return res.status(401).json({err:'Wrong password'});
        }
        // console.log('reached here');
        const token = jwt.sign({username:userFound.user, email: userFound.mail}, process.env.JWT_KEY);
        
        return res.cookie('uid', token).json({message: 'Login successful'});

    }catch(err){
        return res.status(500).json({err:'Internal Server Error'});
    }
}

module.exports = {
    signup
};