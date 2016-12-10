#LINE Messaging APIを実施に動作させてみた[Node.js/Cloud9/Google App Engine]
ここでは、まずMessaging APIでどんなことができるのかを公式ドキュメントを元に説明し、その後、Node.jsのサーバーに通知を送る簡単なサンプルを説明します。なお、この記事でのメインターゲットは下記のようになっています

1. LINE Messaging API(v2) 
2. Node.js - サーバー用言語
3. Cloud9 - 動作確認のため
4. Google App Engine(Google Platform) - 実際にサーバーを稼働させるPaaSサービス
5. (DB何使うか考え中)

##1. LINE Messaging APIとは？
LINEのオフィシャルアカウントかLINE@アカウントのどちらかで、ダイレクトにユーザー個人間のやりとりを提供するAPI。例えば、友達になっているユーザーからの投稿に反応して自動でメッセージを返したりできる(いわゆるBOT)。下記に[Messaging API](https://developers.line.me/messaging-api/overview)でどんなことができるのか？どのようにLINEとサーバーでやりとりをするのかを簡単に公式ドキュメントを参照しながらまとめてみた。

###1. 何ができるのか？
Messaging APIを使って、会社のサーバーとユーザーのLINEアプリ間で情報のやりとりができる。なお、APIはjsonベース。また、Rest APIなのでpython/node.js/java/...で利用できる。

![図](https://developers.line.me/wp-content/uploads/2016/09/bottrial-fig1.png)

####構造 - Webhookによる通知
任意のHTTPSサーバーとLINE Platformをリンクする。具体的には、ユーザーがアカウントを友達として追加したり、メッセージを送ったりすると、LINE Platformから開発者が登録しているサーバーのURLにリクエストが送信される。そして、サーバーはそのリクエストについているリプライトークンを使って返信をすることで、やりとりが実現できるという仕組み。
なお、実際にはLINE Platformにメッセージが送信されると下記のようなjsonが登録されたサーバーに送信される。これをうまく処理すればいいだけってこと。

```
// 
{
  "events": [
      {
        "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
        "type": "message",
        "timestamp": 1462629479859,
        "source": {
             "type": "user",
             "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
         },
         "message": {
             "id": "325708",
             "type": "text",
             "text": "Hello, world"
          }
      }
  ]
}
```


####[LINE BUSINESS CENTER](https://business.line.me/ja/)
アカウントリストで自分のアプリ一覧を確認可能。

##2. 実際に動作させてみよう
###1. LINE Messaging API + python + Herokuのサンプル
非常に短時間でサーバーを構築する分かりやすい方法を説明している記事があったので、この組み合わせで動作を確認したい方は [こちら](https://bita.jp/dml/line-messaging-api-exp)を読むのをおすすめします。


###2. LINE Messaging API + node.js + Google App Engine

####1. Google App Engineの設定

1. Google Cloud Console にアクセス



#MEMO


## 画像の取得方法

1. LINE Platformに画像が投稿されると下記のようなメッセージがサーバーに送信される。
```
// 画像の場合のレスポンス（LINE Platform -> Your Server）
{
  "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",
  "type": "message",
  "timestamp": 1462629479859,
  "source": {
    "type": "user",
    "userId": "U206d25c2ea6bd87c17655609a1c37cb8"
  },
  "message": {
    "id": "325708",
    "type": "image"
  }
}
```
2. 上記レスポンスのmessage.idで下記APIをGetで呼ぶと画像がダウンロードできる。
```
Get https://api.line.me/v2/bot/message/{messageId}/content
```

```
Request Header
---------------
Authorization	Bearer {Channel Access Token} 
---------------
```

```
// Shellスクリプトの例
curl -X GET \
-H 'Authorization: Bearer {ENTER_ACCESS_TOKEN}' \
https://api.line.me/v2/bot/message/{messageId}/content
```
