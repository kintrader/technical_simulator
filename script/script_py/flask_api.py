from flask import Flask, jsonify, request, make_response
from flask_cors import CORS
import urllib.parse
import requests
import urllib.parse
import json


#crptwatvhAPIからデータを取得
def get_cwApi(url):
    #デコード
    url_d = urllib.parse.unquote(url)
    cw_data = requests.get(url_d)
    return cw_data.text

# Flaskクラスのインスタンスを作成
# __name__は現在のファイルのモジュール名
api = Flask(__name__)
CORS(api)

#リクエスト許可リスト
request_permission = ["http://localhost:63342"]

# GETの実装
@api.route('/get', methods=['GET'])
def get():
    #リクエストヘッダのOriginを取得
    req_host = request.headers.get("Origin")
    #オリジンが許可リストにあれば処理を実行
    #ない場合はエラーを返す
    for rp in request_permission:
        if rp == req_host:
            #getメソッドで送信されたデータを取得
            data = request.args.get('data')
            #cryptwatchからデータを取得
            #strからdictに型変換
            chart_data = json.loads(get_cwApi(data))

            print(chart_data)

            #レスポンスオブジェクトにデータを設定
            response = make_response(jsonify(chart_data), 200)
            response.headers["Access-Control-Allow-Origin"] = req_host

            return response

    else:
         return make_response("通信が許可されていません")


# エラーハンドリング
@api.errorhandler(400)
@api.errorhandler(404)
@api.errorhandler(500)
def not_found(error):
    return make_response(jsonify({
        "error": {
            "type": error.name,
            "message": error.description
        }
    }))

# ファイルをスクリプトとして実行した際に
# ホスト0.0.0.0, ポート5000番でサーバーを起動
if __name__ == '__main__':
    api.run(host='127.0.0.1', port=5000)