
export class VcQuotation {

    constructor(){};

    get vcPair1(){ return this._vcPair1; };
    set vcPair1(vcPair1) { this._vcPair1 = vcPair1; };

    get vcPair2() { return this._vcPair2; };
    set vcPair2(vcPair2) { this._vcPair2 = vcPair2; };

    get beforeP() { return this._beforeP; };
    //UNIXタイムスタンプ変換を行い代入
    set beforeP(beforeP) { this._beforeP = 'before=' + Date.parse( beforeP.replace( /-/g, '/') ) / 1000; };

    get afterP() { return this._afterP; };
    //UNIXタイムスタンプ変換を行い代入
    set afterP(afterP) { this._afterP = 'after=' + Date.parse( afterP.replace( /-/g, '/') ) / 1000; };

    get period() { return this._period; };
    set period(period) { this._period = 'periods=' + period; };

    get domObj() { return this._domObj; };
    set domObj(domObj) { this._domObj = domObj; };

    vcRequest() {

        let that = this;
        let httpHost = 'http://localhost:5000/get';
        // 通貨ペア:per1/2, 期間:[指定以前:beforeP, 指定以後:afterP], ロウソク期間:period
        let url = 'https://api.cryptowat.ch/markets/bitflyer';
        let vcData = '/' + this._vcPair1 + this._vcPair2;
        let optionsData = '?' + this._period  + '&' + this._afterP +  '&' + this._beforeP;
        let xhr = new XMLHttpRequest();

        //リクエスト中の処理
        xhr.addEventListener('loadstart', function() {
            that._domObj.textContent = '通信中...';
        }, false);
        //リクエスト成功時の処理
        xhr.addEventListener('load', function() {
            that._domObj.textContent = '通信完了';
        }, false);
        //サーバーエラー時の処理
        xhr.addEventListener('error', function() {
            that._domObj.textContent = 'サーバーエラー'
        }, false);

        xhr.open('GET',
        httpHost + '?data=' +
        encodeURIComponent(url + vcData + '/ohlc' + optionsData),
        false
        );
        xhr.send(null);

        return JSON.parse(xhr.responseText);
    }
}