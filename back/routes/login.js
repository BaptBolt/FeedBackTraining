const express = require('express');
const database = require('../config.js');
const loginRouter = express.Router();
const sha256 = require('sha256');
const jwt = require('jsonwebtoken');
const key = require ('../key.js');

loginRouter.post('/', function(req,res){
  const {email, password}= req.body;

  if(!email || !password){
    res.status(400).send('Tu as oublié ton email ou ton mot de passe');
  } else{
    database.query(`SELECT id, firstname, lastname, email FROM user WHERE email= ? AND password= ?`, [email, sha256(password)],function(err,rows){
      if(err){
        res.sendStatus(400)
        throw err
      } else {
        console.log(rows);
        if(rows.length <=0){
          res.send({ status: 400 });
        }else{
          res.status(200).send({
            token : generateToken(rows[0].email),
            user : rows[0]
          })
        }
      }
    })
  }
});

const generateToken = (email)=>{
  return jwt.sign({
    exp: Date.now() + (24 * 60 * 60),
    data: {
      email: email
    }
  }, key)
}

module.exports = loginRouter;