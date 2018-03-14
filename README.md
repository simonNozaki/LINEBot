# LINEBot
LINEをインターフェースに、Google spreadsheetと連携したBotです。

# システム概要
LINEをインターフェースに、データをGoogle側に送信します。    
受け取ったデータをスクリプトで処理を行い、結果をLINE側に返却します。    
Google Apps Sriptが発行する、スクリプト固有のURIをLINE側に登録することで、データを投げられるようにします。

## 初期設定
### LINE Developersのアカウント作成
LINE developersのアカウントを、以下のページから作成します。    
https://developers.line.me/ja/  
ここで扱うBotは、その中のMessaging APIなので、そのAPIのアプリを作成します。  
アプリ作成の順番は、インターネット上によく落ちているので、随時参照してください。  
作成したときに、アプリのコンソール上に表示される`アクセストークン`は、Google側で利用します。
### Google Apps Scriptで、アプリを作成する
Google Apps Scriptで、スクリプトのアプリケーションを作成します。  
Googleドライブから、`新規` -> `その他` -> `Google Apps Script`を選択しプロジェクトを作成します。  
プロジェクトを作成すると、エディタが開くのでここに実際にプログラムを記述します。  
`UrlFetchApp.fetch`というメソッドが、いわばCurlのような役割で、特定のURIに向かってHTTPメソッドを実行します。  
LINE Botは、OAuth認証なので、ヘッダー情報に`Bearer`をつけ、ここに先程のLINEのアクセストークンを載せます。  
詳しくは`main.gs`のソースを参照。    
一通りプログラムを作成したら、エディタ上メニューバーから`公開` -> `ウェブアプリケーションとして導入`を選択。    
ここで、スクリプト固有のURIが発行されます。
### Messaging APIに、スクリプトのURIを登録する
Google Apps Scriptが発行したURIを、Messaging APIの`Webhook URL`欄に記載します。  
これが着信Webhookとなるので、Google側からの通知をLINEで受けとれるようになります。

## Google Apps Script：`.gs`について
JSライクな文法で、Google内アプリケーションのデータを操作できるスクリプト言語。  
生JSもほとんど書けたはず。。  
公式ドキュメントはこちら。  
https://developers.google.com/apps-script/reference/document/
