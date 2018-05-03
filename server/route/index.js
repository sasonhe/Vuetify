const express = require('express');
const mysql = require('mysql');
// const upload = require('multer')({
//   dest: 'uploads/'
// });
// const multer = require('multer')
// const upload = multer({
//   dest: './upfile/'
// });
const fs = require('fs');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'mydb'
});
module.exports = () => {
  const route = express.Router();

  route.post('/addArticle', (req, res) => {
    let title = req.body.title;
    let columns = req.body.columns;
    let describae = req.body.describae;
    let keywords = req.body.keywords;
    let contents = req.body.contents;
    let files = req.body.files;
    let date = new Date().getTime();
    let base64Data = files.replace(/^data:image\/\w+;base64,/, '');
    let fname = date + '.png';
    let binaryData = new Buffer(base64Data, 'base64').toString('binary');
    fs.writeFile('./upfile/' + fname, binaryData, 'binary', function(err) {
      if (err) {
        console.log(err);
      }
    })
    // console.log(title, columns, describae, contents, date, files);
    const insArticleInfo = `INSERT INTO article_info(title,columns,describae,keywords,contents,files,date) VALUES('${title}','${columns}','${describae}','${keywords}','${contents}','${fname}','${date}')`;
    addArticle(insArticleInfo, res);
  });
  /*
   *deal user register
   */
  function addArticle(insArticleInfo, res) {
    db.query(insArticleInfo, (err) => {
      if (err) {
        console.error(err);
        res.send({
          'msg': '服务器出错',
          'status': 0
        }).end();
      } else {
        res.send({
          'msg': '添加成功',
          'status': 1
        }).end();
      }
    })
  };



  return route;
}