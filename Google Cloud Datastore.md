#初めてのGoogle Cloud Datastore

※これは、2016/12/11時点での情報です。

1. 公式サイトの[ドキュメント](https://cloud.google.com/datastore/docs/)を参照する



2. Node.jsでGoogle CloudのクライアントAPIを利用する方法 
	- [公式サイト](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.45.0/google-cloud)
	- 基礎的なAPIの呼び出し方は[ここ](https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.45.0/datastore)みると理解できる

	
	
3. 注意する点
	1. 作成したnode.jsのプログラムを動作させる場所がGCE上なのかそれ以外なにかによってrequire('google-cloud')の呼び出し方が異なる。 認証が必要かどうかの差。
		2. GCE以外の場所で利用するためには、外部からの認証方法についてあらかじめ知っておく必要がある。まとめた[ファイル](./Google Authentication Guide.md)。

	