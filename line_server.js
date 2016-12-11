// ログの定義
var logger = require('lUtil/PLogger.js')

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');
var async = require('async');
var config = require('config')
logger.info("Start Line Server")
if(!config){
    console.log("Please create config folder and default.json under it.")
    return
}else{
    console.log("-----------------------------")
    console.log("Config file:")
    console.log(config)
    console.log("-----------------------------")
}

var localPortNum = config.General.port
app.set('port', (process.env.PORT || localPortNum));
app.use(bodyParser.urlencoded({extended: true}));  // JSONの送信を許可
app.use(bodyParser.json());                        // JSONのパースを楽に（受信時）
app.get('/', function(request, response) {
    response.send('PetaBoard Server');
});

app.post('/callback', function(req, res){
    console.log("callback")
    // console.log(req)
    console.log(req.body)
    console.log("-----------")
    console.log(req.body.events[0])
    async.waterfall([
        // ぐるなびAPI
        function(callback) {

            var json = req.body;

            // 受信テキスト
            var receivedMsg = json.events[0].message.text;
            
            var replyToken = json.events[0].replyToken;
            callback(null, receivedMsg, replyToken);
        },
    ],
    // LINE BOT
    function(err, receivedMsg, replyToken) {
        console.log("メッセージ送りまーす")
        console.log("receivedMsg:" + receivedMsg)
        console.log("replyToken:" + replyToken)
        if(err){
            return;
        }

        //ヘッダーを定義
        var headers = {
            'Content-Type' : 'application/json; charset=UTF-8',
            'Authorization' : 'Bearer ' + config.LINE.Authorization
            //'X-Line-ChannelSecret' : '0aa746dc7a1fca60f694c7d4eda99933'
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

    });

});

app.listen(app.get('port'), function() {
    console.log('Node app is running');
});