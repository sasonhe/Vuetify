const express = require('express');
const mysql = require('mysql');
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
    let date = new Date().getFullYear();
    console.log(title, columns, describae, contents);
    const insArticleInfo = `INSERT INTO article_info(title,columns,describae,keywords,contents,files,date) VALUES('${title}','${columns}','${describae}','${keywords}','${contents}','${files}','${date}')`;
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
          'msg': '注册成功',
          'status': 1
        }).end();
      }
    })
  };



  return route;
}