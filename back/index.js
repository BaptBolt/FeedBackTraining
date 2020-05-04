const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user.js');
const loginRouter = require('./routes/login.js');
const informationRouter = require('./routes/information.js');
const cors = require('cors');

const api = express();
const port = 8000;

api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());
api.use(cors());

api.use('/information', informationRouter);
api.use('/login', loginRouter);
api.use('/users', userRouter);


api.listen(port, function(err){
  if(err){
    throw err;
  } else {
    console.log(`API listen on port : ${port}`)
  }
});