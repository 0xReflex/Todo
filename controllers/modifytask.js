const TODO = require('../models/todo');

function schemaCheck(req) {
    const id = req.body?.id;
    const task = req.body?.task;
    const isDone = req.body?.isDone;

    if (!id || !task) {
        return { err: 'Bad request' };
    }

    if (typeof task !== 'string') {
        return { err: 'Bad request' };
    }

    if (typeof isDone !== 'boolean') {
        isDone = false;
    }

    if (id.length !== 32) {
        return { err: 'Bad request' };
    }

    return {
        id: id,
        isDone: isDone,
        task: task.trim()
    };
}

async function updateTask(req,res){
    const valid = schemaCheck(req);
    // console.log(valid);
    try{
        const findTask = await TODO.exists({id:valid.id});
        // console.log(findTask);
        if(!findTask){
            return res.status(404).json({message:'Task not foudn'});
        }
        const uTask = await TODO.findOneAndUpdate(
            {
                id:valid.id,
                user:req.user.username,
            },
            {
                isDone:valid.isDone,
                task:valid.task,
                date: new Date(),
            },
            {
                returnDocument: 'after',
            }
        )
        .select('id task isDone -_id')
        .lean();
        if(!uTask){
            return res.status(400).json({err:'Task Not found'});
        }
        return res.status(200).json(uTask);

    }catch(err){
        return res.status(500).json({err:'Internal Server Error'});
    }
}

module.exports = {
    updateTask
}