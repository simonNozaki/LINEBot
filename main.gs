var channel_access_token = "YOUR_ACCESS_TOKEN";

/** 送信用の関数、最後に呼び出します。 */
function doPost(e) {
  var events = JSON.parse(e.postData.contents).events;
  events.forEach(function(event) {
    if(event.type == "message"){lineReply(event);}
    else if(event.type == "follow"){ /* 友だち追加・ブロック解除 */ }
    else if(event.type == "unfollow"){ /* ブロック */ }
 });
}

function lineReply(e) {
  var ss = SpreadsheetApp.openById('sheet_id');
  /** 最終行の行番号を取得します */
  var lowNum = ss.getSheets()[0].getLastRow();
  /** 検索範囲から値の配列を取得します */
  var wordArray = ss.getSheets()[0].getRange(2, 2, lowNum, 1).getValues();
  /** LINEから渡された検索語を格納する */
  var searchWord = e.message.text;
  /** 返却する結果の値を格納する変数を初期化 */
  var result;
  
  /** 配列から文字列を順番に取り出して検索語と比較する */ 
  for(var i = 0; i < lowNum; i++){
    if( searchWord === wordArray[i][0]){
      var description = ss.getSheets()[0].getRange(i+2, 3).getValue();
      var reference =  ss.getSheets()[0].getRange(i+2, 4).getValue();
      result = searchWord + "：" + description + "\n参考：" + reference;
    }
  }
  
  /** エンドポイントに向けて、JSON形式でパラメータをPOSTします */
  var url = "https://api.line.me/v2/bot/message/reply";
  var postData = {
    "replyToken" : e.replyToken,
    "messages" : [
      {
        "type" : "text",
        "text" : result
      }
    ]
  };
  var options = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + channel_access_token
    },
    "payload" : JSON.stringify(postData)
  };
  UrlFetchApp.fetch(url, options);
}





