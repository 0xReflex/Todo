const TODO = require('../models/todo');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

function schemaCheck(req){
    const task = req?.body?.task;
    if(!task){
        return {err:'Bad request'};
    }
    return {task : task};
}

async function addTask(req,res){
    const valid = schemaCheck(req);
    // console.log('called');

    if(valid.err){
        return res.status(400).json({err:valid.err});
    }
    try{
        const { nanoid } = await import('nanoid');
        const _id = nanoid(32);
        const taskCreated = await TODO.create({
            id: _id,
            task:valid.task,
            user: req.user.username,
        });
        return res.status(201).json({
            id: _id,
            task: valid.task,
            isDone: false,
        });
    }catch(err){
        return res.status(500).json({err:'Internal Server Error'});
    }
}

module.exports = {
    addTask
}
