const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});

app.use(bodyParser.urlencoded({
  extended: false
}));
//the cores config
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

// 添加文章

app.post('/addArticle', (req, res) => {
  // console.log(req.body);
  // let mObj = {};
  // for (let obj in req.body) {
  //   mObj = JSON.parse(obj);
  //   console.log(mObj);
  // };
  // let title = mObj.title;
  // let columns = mObj.columns;
  // let describae = mObj.describae;
  // let keywords = mObj.keywords;
  // let contents = mObj.contents;
  // let files = mObj.files;
  // let date = mObj.date;
  let mObj = {};
  for (let obj in req.body) {
    mObj = JSON.parse(obj);
  }
  let regName = mObj.regName;
  let regPasswd = mObj.regPasswd;
  console.log(regName, regPasswd);
  //const insArticleInfo = `INSERT INTO article_info(title,columns,describae,keywords,contents,files,date) VALUES('${title}','${columns}','${describae}','${keywords}','${contents}','${files}','${date}')`;
  addArticle(1, res);
});
/*
 *deal user addArticle
 */
// function addArticle(insArticleInfo, res) {
//   db.query(insArticleInfo, (err) => {
//     if (err) {
//       console.error(err);
//       res.send({
//         'msg': '服务器出错',
//         'status': 0
//       }).end();
//     } else {
//       res.send({
//         'msg': '文章添加成功',
//         'status': 1
//       }).end();
//     }
//   })
// };
function addArticle(req, res) {
  res.send({
    'msg': '文章添加成功',
    'status': 1
  }).end();
};

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});