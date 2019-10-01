import {VcQuotation} from "/technical_trade_simulator/script/lib/vc_quotation.js";
import {ChartDrawing} from '/technical_trade_simulator/script/lib/chart.js';
import {DataCheck} from '/technical_trade_simulator/script/lib/data_check.js';
import {DrawLine} from '/technical_trade_simulator/script/lib/draw_line.js';

document.addEventListener('DOMContentLoaded', function() {

    //google chartのライブラリをロード
    google.charts.load('current', {packages:['corechart', 'table', 'gauge', 'controls']});
    var flag = false;
    var cAreaObj = document.getElementById('item3');
    var ccyObj1 = document.getElementById('currency1');
    var ccyObj2 = document.getElementById('currency2');
    var bfrObj = document.getElementById('before');
    var aftObj = document.getElementById('after');
    var cskObj = document.getElementById('candle_stick');
    var comObj = document.getElementById('com_state');
    var cAreaObj = document.getElementById('chart_area');
    var mChartObj = document.getElementById('main_chart')
    var canvasObj = document.getElementById('canvas');
    var hLineObj = document.getElementById('horizon_line');
    var vLineObj = document.getElementById('vertical_line');
    var mLineObj = document.getElementById('multi_line');
    var allClearObj = document.getElementById('all_clear');
    var chartDataMol;

    function canvas_resize() {
        //canvasの幅、高さを指定
        canvasObj.width = mChartObj.clientWidth;
        canvasObj.height = mChartObj.clientHeight;
    };

    canvas_resize();

    //期間の初期値設定
    var dateObj = new Date();
    aftObj.value = dateObj.getFullYear() + '-' + ('0' + dateObj.getMonth()).slice(-2) + '-' + ('0' + dateObj.getDate()).slice(-2)
    bfrObj.value = dateObj.getFullYear() + '-' + ('0' + (dateObj.getMonth() + 1)).slice(-2) + '-' + ('0' + dateObj.getDate()).slice(-2)

    //入力内容のチェック
    var dCheck = new DataCheck();
    ccyObj1.addEventListener('change', function() {
        dCheck.currencyCheck(ccyObj1, ccyObj2)
    }, false);
    ccyObj2.addEventListener('change', function() {
        dCheck.currencyCheck(ccyObj1, ccyObj2);
    }, false);
    bfrObj.addEventListener('change', function() {
        dCheck.bfrAftCheck(bfrObj, aftObj);
    }, false);
    aftObj.addEventListener('change', function() {
        dCheck.bfrAftCheck(bfrObj, aftObj);
    }, false);


    document.getElementById('search_btn').addEventListener(
    'click', function(e) {
        //ボタンクリックイベントを以下の処理に固定
        e.preventDefault();
        if(ccyObj1.className === 'alert' ||
            bfrObj.className === 'alert') {
            alert(
`通貨ペアもしくは期間の値が不正です

<可能通貨ペア>
    ビットコイン + 日本円,
    イーサリアム + ビットコイン,
    ビットコインキャッシュ + ビットコイン`
            );

        } else {
            var period = cskObj.value;
            flag = true

            //チャートに必要なデータを取得
            var vcQ = new VcQuotation();
            vcQ.vcPair1 = ccyObj1.value;
            vcQ.vcPair2 = ccyObj2.value;
            vcQ.beforeP = bfrObj.value;
            vcQ.afterP = aftObj.value;
            vcQ.period = cskObj.value;
            vcQ.domObj = comObj;
            var chartData = vcQ.vcRequest()

            //チャートの描画
            var cd = new ChartDrawing()
            cd.domObj = cAreaObj;
            cd.stockData = chartData;
            cd.period = cskObj.value;

            //google chartのcallback関数を指定
            google.charts.setOnLoadCallback(cd.drawChartRF.bind(cd));

            //windowリサイズ時にチャートもリサイズ
            window.addEventListener('resize', function() {
                setTimeout( function () {
                    //チャートの削除
                    mChartObj.textContent = "";
                    //チャートの描画
                    google.charts.setOnLoadCallback(cd.drawChartRF.bind(cd));
                }, 1000)
            }, false)
        }
    }, false),

    //windowリサイズ時にcanvasもリサイズ
    window.addEventListener('resize', function() {
        setTimeout( function () {
            canvas_resize();
        }, 1000)
    }, false)

    const hdl = new DrawLine();
    const vdl = new DrawLine();
    const mdl = new DrawLine();
    const acdl = new DrawLine()

    let  dlList = [[hLineObj, hdl, hdl.horizonLine],
                   [vLineObj, vdl, vdl.verticalLine],
                   [mLineObj, mdl, mdl.multiLine],
                   [allClearObj, acdl, acdl.allClear]
                   ];


    for(let value of dlList) {
        value[0].addEventListener('click',() => {
            if(value[0] === allClearObj){
                value[1].canvasObj = canvasObj;
                value[1].eObj = value[2].call(value[1]);
            } else if(!value[0].classList.contains('line_active')){
                value[0].classList.add('line_active');
                value[1].end = '';
                value[1].canvasObj = canvasObj;
                value[1].eObj = value[2].call(value[1]);
            } else {
                value[0].classList.remove('line_active');
                value[1].end = 'end';
                if(value[0] === mLineObj) {
                    value[1].mlX = false;
                }
            }
        })
    }





}, false)