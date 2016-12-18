var logger = require('../PetaLogger.js')
var config = require('config')
var gCloud = require("../google-cloud/gCloud")
var DBMessages = config.GoogleDataStore.DBMessages
const myGCloud = gCloud(DBMessages)
var request = require('request');
var async = require('async');

var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
    logger.info("get all records for " + DBMessages)
    logger.info("getAll呼ぶよー")
    myGCloud.getAll(function(err, records)
    {
        var msg = "PetaBoard Server <br>"
        for(var i=0; i< records.length; i++)
        {
            msg += "records[" + i  +"]:" + JSON.stringify(records[i]) + "<br>"
        }
        response.send(msg);
    })
});
router.post('/', function(req, res) {
    logger.info("post / - this path is not supported. please change the registerd url in line app.")
    response.send('PetaBoard Server');
});

router.post('/callback', function(req, res){
    logger.info("callback")
    async.waterfall([
        // LINE Messageのパース
        function(callGetUserId) {
            logger.info("LINEからのデータをパースします")
            var json = req.body;

            // 受信データのパース
            // メッセージ
            var type = json.events[0].type
            var timestamp = json.events[0].timestamp
            var receivedMsg = json.events[0].message.text;
            var replyToken = json.events[0].replyToken;

            //ユーザー情報
            var userId = json.events[0].source.userId
            if(userId){
                var jsonData = {
                    "type" : type,
                    "timestamp" : timestamp,
                    "receivedMsg" : receivedMsg,
                    "userId" : userId,
                    "replyToken" : replyToken,
                }
                // ユーザーからのデータだけ保存する
                callGetUserId(null, jsonData);
            }else{
                logger.debug("ユーザーからのメッセージではないので終了します)")
                callGetUserId("No User's message");
            }
        },
        // ユーザーIDからデータを取得
        function(jsonData, saveDataToDB){
            logger.info("ユーザー情報を取得します")
            //ヘッダーを定義
            var headers = {
                'Authorization' : 'Bearer ' + config.LINE.Authorization
            };

            var options = {
                url: 'https://api.line.me/v2/bot/profile/' + jsonData.userId,
                json: true
            };

            request.get(options, function (err, response, body) {
                if (!err && response.statusCode == 200) {
                    jsonData.userName = response.displayeName
                    jsonData.userPicture = response.pictureUrl
                    saveDataToDB(null, jsonData)
                } else {
                    if(err){
                        saveDataToDB(err)
                        return
                    }
                    saveDataToDB(response.statusCode)
                }
            })
        }
    ],
    // LINE BOT
    function(err, jsonData) {
        if(err){
            logger.debug(err)
            res.send('Error Happens! - ' + err);
            return
        }
        logger.info("データの加工処理終了")
        logger.info(jsonData)
        logger.info("データそDBに保存開始します")
        myGCloud.insert(jsonData, function(err, id){
            logger.info("Succss to save the data to DB! - " + id)
            res.send('Success to save the data to DB!');
        })
    });
});

function lineBot(err, receivedMsg, replyToken) {
    logger.info("メッセージ送りまーす")
    logger.info("receivedMsg:" + receivedMsg)
    logger.info("replyToken:" + replyToken)
    if(err){
        return;
    }

    //ヘッダーを定義
    var headers = {
        'Content-Type' : 'application/json; charset=UTF-8',
        'Authorization' : 'Bearer ' + config.LINE.Authorization
    };
    // 送信データ作成
    var data = {
        "replyToken":replyToken,
        "messages":[
            {
                "type":"text",
                "text":"Hello, べー"
            },
            {
                "type":"text",
                "text":"May I help you?"
            }
        ]
    };

    //オプションを定義
    var options = {
        url: 'https://api.line.me/v2/bot/message/reply',
        proxy : process.env.FIXIE_URL,
        headers: headers,
        json: true,
        body: data
    };

    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
        } else {
            console.log('error: '+ JSON.stringify(response));
        }
    });
}

module.exports = router;