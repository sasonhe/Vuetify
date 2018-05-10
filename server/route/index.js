const express = require('express');
const mysql = require('mysql');
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
    const insArticleInfo = `INSERT INTO article_info(title,columns,describae,keywords,contents,files,date) VALUES('${title}','${columns}','${describae}','${keywords}','${contents}','${fname}','${date}')`;
    addArticle(insArticleInfo, res);
  });
  /*
   *deal user addArticle
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
  /*
   *查询文章列表
   */
  route.get('/articleList', (req, res) => {
    const sql = 'SELECT * FROM article_info';
    // "SELECT *FROM textinfo order by date desc limit 8"
    getArticleList(sql, res);
  });

  function getArticleList(sql, res) {
    db.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('服务端错误').end();
      } else {
        if (data.length == 0) {
          res.status(500).send('没有数据').end();
        } else {
          res.send(data);
        }
      }
    });
  }
  /**
   * 删除文章
   */
  route.get('/deleteArticle', (req, res) => {
    let id = req.query.id;
    const del = `DELETE FROM article_info where id='${id}'`;
    deleteArticle(del, res);
  });

  function deleteArticle(del, res) {
    db.query(del, (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).send('服务端错误').end();
      } else {
        res.send({
          'msg': '删除成功',
          'status': 200
        }).end();
      }
    });
  }
  return route;
}