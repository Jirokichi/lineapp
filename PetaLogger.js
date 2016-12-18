var log4js = require('log4js');
var log4js_extend = require("log4js-extend")
 
log4js_extend(log4js, {
  path: __dirname,
  format: "@name (@file:@line:@column)"
});

log4js.configure({
     appenders: [
         {
             "type": "file",
             "category": "request",
             "filename": "./logs/request.log",
             "pattern": "-yyyy-MM-dd"
         },
         {
             "type": "console",
             "category": "request",
             "filename": "./logs/request.log",
             "pattern": "-yyyy-MM-dd"
         }
    ]
});

module.exports = log4js.getLogger('request');

// [type]
// file	ファイルに書き出す。
// datefile	日付毎にローテーションしてファイルに書き出す。
// console	コンソールに書き出す。