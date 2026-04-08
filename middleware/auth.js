const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

async function validate(req,res,next){
    const token = req.cookies?.uid;
    if(!token){
        return res.status(461).json({err:'login required'});
    }
    try{
        const verify = jwt.verify(token, process.env.JWT_KEY);
        req.user = verify;
        next();
    }catch(err){
        return res.status(462).json({err:'signup required'});
    }
}


module.exports = validate;