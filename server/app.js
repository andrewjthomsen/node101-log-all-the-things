const express = require("express");
const fs = require("fs");
const app = express();

app.use((req, res, next) => {
  // write your logging code here
  let agent = req.headers["user-agent"].replace(/,/, "");
  let time = new Date().toISOString();
  let method = req.method;
  let resource = req.path;
  let version = `HTTP/$(req.httpVersion)`;
  let status = 200;

  let dataInfo =
    agent +
    "," +
    time +
    "," +
    method +
    "," +
    resource +
    "," +
    version +
    status +
    "\n";
  console.log(dataInfo);

  // REsponsible for writing data to csv file
  fs.appendFile("./log.csv", dataInfo, "utf8", error => {
    if (error) throw error;
    // Otherwise, if no error
    next();
  });

  app.get("/", (req, res) => {
    // write your code to respond "ok" here
    res.send("ok");
  });

  app.get("/logs", (req, res) => {
    // write your code to return a json object containing the log data here
    fs.readFile("./log.csv", "utf8", (error, dataInfo) => {
      var dataObject = "{";
      var lines = data.split("\n");
      var items = undefined;
      for (var i = 1; i < lines.length; i++) {
        if (lines[i].length > 2) {
          items = lines[i].split(",");
          object +=
            "{" +
            '"Agent":"' +
            items[0] +
            '",' +
            '"Time":"' +
            items[1] +
            '",' +
            '"Method":"' +
            items[2] +
            '",' +
            '"Resource":"' +
            items[3] +
            '",' +
            '"Version":"' +
            items[4] +
            '",' +
            '"Status":"' +
            items[5] +
            '"' +
            "}";

          if (i < lines.length - 2) {
            object += ",";
          }
        }
      }
      object += "}";
      res.json(JSON.parse(object));
    });
  });
});

module.exports = app;
