// ログの定義
var logger = require('./PetaLogger.js')
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var config = require('config')
var routeLine = require('./routes/line');

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
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routeLine);

app.listen(app.get('port'), function() {
    console.log('Node app is running');
});