#Google Authentificationのメモ

※これは、2016/12/11時点での情報です。

[参照元ページ](./Google Cloud Datastore.md)

[認証ガイドの公式サイト](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.45.0/guides/authentication)

1. GoogleのAPIを利用するためには、認証について理解しておく必要があります。
	1. GCE上
		- 認証は不要。
	2. その他のサーバー上
		- [Googel Developer Console](https://console.developers.google.com/project)(要：Google Developers serviceアカウント)で利用するサービスを有効にする設定がある。なお、利用するAPIによっては有料のものがある(ex. datastore/storage.bigquery)。また有効にした後、認証キーを発行する。認証キーはjsonファイルでダウンロードできる。この認証情報は他人にもれるとセキュリティ的にアウトなため、例えば"/path/to"といった作成中のサーバーとは違う場所に認証キーを保存しておいて、そのパスを参照するようにしておいたほうがいい。gitとかに誤ってその認証ファイルをアップしないようにするためが主な理由かな？