const express = require('express');
const app = express();
const validate = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const {makeToken} = require('./controllers/login')
const {connectToMongoose} = require('./connection');
const {signup} = require('./controllers/signup');
const dotenv = require('dotenv');
const cors = require('cors');
const {addTask} = require('./controllers/addtask');
const {getTask} = require('./controllers/gettask');
const {updateTask} = require('./controllers/modifytask')
dotenv.config();

app.use(cors({credentials: true}));

connectToMongoose(process.env.MONGODB_URI);
app.use(cookieParser());

app.use(express.json());

app.use(express.static('public'));

// app.use(validate);
app.post('/v1/login', makeToken);

app.post('/v1/signup', signup);

app.get('/v1/tasks',validate,getTask);

app.post('/v1/tasks',validate, addTask);

app.put('/v1/tasks', validate, updateTask);



const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('server started');
})
