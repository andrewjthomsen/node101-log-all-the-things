const express = require('express'); 
const app = express();
const fs = require('fs'); 
const path = require('path'); 
const morgan = require('morgan'); 
const moment = require('moment'); 


let dataObj = [];

app.use((req, _res, next) => {

  let Agent = req.headers['user-agent'];
  let Time = moment().format(); 
  let Method = req.method;
  let Resource = req._parsedUrl['path'];
  let Version = `HTTP/${req.httpVersion}`;
  let Status = "200"
  console.log(Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status);
  
  var info = "/n" + Agent + "," + Time + "," + Method + "," + Resource + "," + Version + "," + Status;

  var info =
  {
    'Agent': req.headers['user-agent'],
    'Time': moment().utc().format(),
    'Method': req.method,
    'Resource': req._parsedUrl['path'],
    'Version': `HTTP/${req.httpVersion}`,
    'Status': "200",
  };

  //Responsible for pushing info into the "log.csv" file
  dataObj.push(info);
  fs.appendFile(path.resolve(__dirname, 'log.csv'), info, function (err) {
    if (err) throw err;

  });


  next();

});


app.get('/', (_req, res) => {
 

  res.status(200).send("ok");

});

//Responsible for logging data into json object.
app.get('/logs', (_req, res) => {
 

  res.json(dataObj);

});

module.exports = app;