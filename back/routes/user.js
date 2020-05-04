const express = require('express');
const database = require('../config.js');
const userRouter = express.Router();
const sha256 = require('sha256');
const key = require('../key.js');
const jwt = require('jsonwebtoken');


const isAuthenticated = (req, res, next) =>{
  if(typeof req.headers.authorization !== 'undefined'){
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, key,(err, user)=>{
      if(err){
        res.status(403).send('Not Authorized');
      }else{
        req.userEmail=user.data.email;
        return next();
      }
    })
  }else{
    res.status(403).send('Not Authorized');
  }
}


userRouter.get('/', isAuthenticated, function(req, res){
  database.query(`SELECT id, firstname, lastname, email FROM user WHERE email= ?`,[req.userEmail], function(err, rows){
    if(err){
      res.status(500);
      console.log(err)
    }
    if(rows.length > 0){
      res.status(200).json(rows[0]);
    }else {
      res.status(404).send('Not Found')
    }
  })
})


userRouter.post('/', function(req,res){
    const {firstname, lastname, email, password} = req.body;
    if(!firstname || firstname.length <= 0 || !lastname || lastname.length <=0 || !email || email.length <= 0 || !password || password.length <= 0 ){
      res.sendStatus(400)
      console.log(req.body);
    } else{
      database.query(`SELECT email FROM user WHERE email= ?`,[email], function(err,rows){
        if(err){
          res.sendStatus(400);
          throw err
        } else{
          if(rows.length > 0){
            res.sendStatus(403)
          } else{
            database.query('INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)',[firstname,lastname,email,sha256(password)],function(err,rows){
              if(err){
                res.sendStatus(400);
                throw err;
              }else{
                res.sendStatus(200);
                console.log(rows)
              }
            });
          }
        }
      })
    }
  }
)

module.exports = userRouter;