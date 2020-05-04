const express = require('express');
const database = require('../config.js');
const informationRouter = express.Router();


informationRouter.post('/', function(req,res){
  const {nightValue, nightHours, mentalDisposition, trainingIntensity, trainingEfficience, muscleTensionDValue, muscleTensionD, muscleTensionGValue, muscleTensionG, userID} = req.body;
  if(!nightValue){
    res.sendStatus(400);
  }else{
    database.query('INSERT INTO information (nightValue, nightHours, mentalDisposition, trainingIntensity, trainingEfficience, muscleTensionDValue, muscleTensionD, muscleTensionGValue, muscleTensionG, dateAjout, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?)',[nightValue, nightHours, mentalDisposition, trainingIntensity, trainingEfficience, muscleTensionDValue, muscleTensionD, muscleTensionGValue, muscleTensionG, userID], function(err,rows){
      if(err){
        res.sendStatus(400)
        throw err
      } else{
        res.sendStatus(200)
        console.log(rows)
      }
  })}
});

informationRouter.get('/', function(req,res){
  database.query(`SELECT firstname, nightValue, nightHours, mentalDisposition, trainingIntensity, trainingEfficience, muscleTensionDValue, muscleTensionD, muscleTensionGValue, muscleTensionG, dateAjout FROM information i JOIN user u ON i.userID = u.id  `, function(err,rows){
    if(err){
      res.sendStatus(400)
      throw err
    }
    if(rows.length > 0){
      res.status(200).json(rows);
    }else {
      res.status(404).send('Not Found')
    }
  })
})


module.exports = informationRouter;