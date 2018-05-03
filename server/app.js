const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
//the cores config
app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
    // /make the require of options turn back quickly/
  } else {
    next();
  }
});
// app.listen(3000, () => {
//   console.log("正在监听3000端口");
//
// });
const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
});

//deal router
app.use('/', require('./route/index.js')());