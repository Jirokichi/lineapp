#初めてのGoogle App Engine(GAE)

※これは、2016/12/11時点での情報です。

1. node.jsのアプリケーション(下記を少なくとも満たす)を作成して、Localで動作することを確認
	1. package.jsonへの追記
		1. engines.nodeのバージョン記入
		2. 起動のスクリプト記入

		```
		"engines": {
	   		"node": ">=4.3.2"
	  	},
	  	"scripts": {
	   		"start": "node line_server.js"
	  	},
		```
	2. app.yamlの作成
		
2. Google Account取得
3. Google Cloud Platformでプロジェクトを作成する[例：GAEProject]
4. gcloudの初期化
	
	```
	$ gcloud init
	```

	* 主な目的
		1. gcloudコマンド利用時にデフォルトで利用する「***アカウント***」の設定
		2. gcloudコマンド利用時にデフォルトで利用する「***プロジェクト***」の設定
		3. gcloudコマンド利用時にデフォルトで利用する「***Region***」の設定 
		3. gcloudコマンド利用時にデフォルトで利用する「***Zone***」の設定 
5. yamlファイルがあるディレクトのアプリケーションのデプロイ


```
$ gcloud app deploy
```


6. a






#Memo

##基礎知識

* AWSのEC2 = Google Compute Engine
* GAS+LINE Messaging API+Google Drive APIで簡単サーバー構築。
	* [Line BotをGoogle App Scriptで](http://qiita.com/osamu1203/items/0de2909821a1b3cbb350)
	* あ



##Google App Engineとは

参考にしたサイト: [2016年半ば現在のGoogle App Engine](http://write.kogus.org/articles/Y2Rtpp)(2016年6月の記事)



* Googleが提供するPaaS
* 2008年4月から提供されている
* GoogleはGCE(IaaS)を現在はプッシュしている
* 2010年初頭をピークとして利用者は減少、衰退している。しかし徐々にGAEの改善もあるがトレンドがおいついてきて、再評価されてきている。
* ブランディングされGoogle Cloud Platform(GCP)のうちの一つとして扱われている
* Google Cloud Datasourceと連携することができる？
* 特徴
	* ほぼ無限にスケールアウト可能なアーキテクチャ
	* インフラを意識せず利用できる完成度の高いPaaSである
	* 競合に比べて大きな無料枠(メンテナンスフリーな無数の超軽量インスタンス)
	* データストレージに癖がある(Google Cloud DataStore:KVS)
	* 対応言語が決まっている
		* Standardでサポートされる
			* Java
			* Python
			* Go
			* PHP
		* Flexibleでサポートされる(実質 GAE に見せかけて GCE で動いている、**無料枠が上記言語と異なる！！！！**)
			* Node.js: 構築方法の参考サイト[(1)](http://qiita.com/n0bisuke/items/fbea48562441a8314d45)[(2)](http://qiita.com/y13i/items/ffc723d7ceb018eaedf8)
			* Ruby
			* Java8
			* Python3
	* App Engine Standard EnvironmentとApp Engine Flexible Environmentで利用用途に応じた使い分けが必要。
		* App Engine Standard Environment
			* Googleが用意した専用のインスタンス
		* App Engine Flexible Environment(旧MVMs)
			* GAEをフロントにしつつ、実際に起動するのはGCPベースのVMという機能。つまり、GAEのオートスケールやトラフィック分割の恩恵を受けながらリクエストを受けて起動するのはIaaSであるGCEのインスタンスという感じ。
		* 比較（あくまで**AESE**とAEFEを比べた場合）
			* [**AESE**]起動時間が圧倒的に早い
			* [AEFE]ローカルのファイルシステムに書き込みができる
			* [AEFE]対応した言語以外も扱える
			* [AEFE]タイムアウト60secではなく、24時間
			* [AEFE]SSH利用可能
			* [AEFE]外部へのネットワークアクセスはサービス経由以外でも可能(？？？？)
		
		