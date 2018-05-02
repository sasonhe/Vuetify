const express = require('express');
const mysql = require('mysql');
const common = require('../libs/common');
const db = mysql.createPool({
  // host: 'localhost',
  // user: 'root',
  // password: 'root',
  // database: 'myigou'
  host: 'bdm313469335.my3w.com',
  user: 'bdm313469335',
  password: '213036sasonhe',
  port: '3306',
  database: 'bdm313469335_db',
  insecureAuth: true
});
module.exports = () => {
  const route = express.Router();

  route.post('/reg', (req, res) => {

    let mObj = {};
    for (let obj in req.body) {
      mObj = JSON.parse(obj);
    }
    let regName = mObj.regName;
    let regPasswd = mObj.regPasswd;
    regPasswd = common.md5(regPasswd + common.MD5_SUFFXIE);
    const insUserInfo = `INSERT INTO user(user_name,login_password,user_number) VALUES('${regName}','${regPasswd}','${regName}')`;
    delReg(insUserInfo, res);
  });
  /*
   *deal user register
   */
  function delReg(insUserInfo, res) {
    db.query(insUserInfo, (err) => {
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