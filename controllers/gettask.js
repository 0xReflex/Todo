const TODO = require('../models/todo');

async function getTask(req, res){
    const user = req.user.username;
    // console.log(user);
    try{
        const taskFound = await TODO
        .find({user:user, isDone:false})
        .sort({date:-1})
        .select('id task isDone -_id')
        .lean();
        // console.log(taskFound);
        return res.status(200).json({taskFound});
    
    }catch(err){
        return res.status(500).json({err:'Internal Server Error'});
    }
}

module.exports = {
    getTask
}