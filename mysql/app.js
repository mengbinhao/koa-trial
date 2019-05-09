const mysql = require('mysql')
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'test'
})

// 执行sql脚本对数据库进行读写
connection.query('SELECT * FROM my_table',  (error, results, fields) => {
  if (error) throw error
  // connected!

  // 结束会话
  connection.release()
});