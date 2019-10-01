
export class DataCheck {

    constructor() {
        this._currencyPair = ['btcjpy', 'ethbtc', 'bchbtc'];
    };

    currencyCheck(ccy1, ccy2) {
        if(this._currencyPair.includes(ccy1.value + ccy2.value)) {
            ccy1.className = '';
            ccy2.className = '';
        } else {
            ccy1.className = 'alert';
            ccy2.className = 'alert';
        }
    };

    bfrAftCheck(bfr, aft) {
        var bfr_r = bfr.value.replace(/-/g, '');
        var aft_r = aft.value.replace(/-/g, '');
        if(bfr_r - aft_r > 0) {
            bfr.className = '';
            aft.className = '';
        } else {
            bfr.className = 'alert';
            aft.className = 'alert';
        }
    };
};