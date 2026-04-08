const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const USER = require('../models/user')
dotenv.config()


function schemaCheck(req){
    const user = req.body?.username;
    const email = req.body?.email;
    const password = req.body?.password;

    if(!user || !email || !password){
        return {err: 'bad request'};
    }

    return {
        username: user.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
    };
}



async function makeToken(req,res){
    const valid = schemaCheck(req);
    if(valid.err){
        return res.status(400).json({err: 'Bad Request'});
    }
    try{
        const userFind = await USER.exists({user: valid.username});
        if(userFind){
            return res.status(409).json({err:'User already exists'});
        }
        const emailFind = await USER.exists({mail:valid.email});
        if(emailFind){
            return res.status(409).json({err:'Mail already exists'});
        }

        const data = {
            user: valid.username,
            email: valid.email,
        }
        
        await USER.create({
            user: valid.username,
            mail: valid.email,
            password: valid.password,
        });

        const token = jwt.sign(data, process.env.JWT_KEY);

        res.cookie("uid",token).json({message: 'login sucsessful'});
    }catch(err){
        console.log(err);
        res.status(500).json({err:'Internal Server Error'});
    }
}

module.exports = {
    makeToken
}