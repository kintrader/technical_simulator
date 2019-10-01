
export class ChartDrawing {

    constructor() {}
    //チャート描画先のDOMオブジェクトの指定
    set domObj(domObj) { this._domObj = domObj; };
    //チャート用データの指定
    set stockData(stockData) { this._stockData = stockData; };
    //チャート描画オプションの指定
    set period(period) { this._period = period; };

    drawChartRF() {
        var dashboard = new google.visualization.Dashboard(
            this._domObj);

        var control = new google.visualization.ControlWrapper({
            'controlType': 'ChartRangeFilter',
            'containerId': 'filter',
            'options': {
            // フィルターの軸を日付に
                'filterColumnIndex': 0,
                'ui': {
                    'chartType': 'LineChart',
                    'chartOptions': {
                        'chartArea': {'height': '100%','width': '90%'},
                        'hAxis': {'baselineColor': 'none'}
                    },
                    'chartView': {
                        'columns': [0, 3]
                    },
                }
            }
        });

        var chart = new google.visualization.ChartWrapper({
            'chartType': 'CandlestickChart',
            'containerId': 'main_chart',
            'options': {
                'chartArea': {'height': '90%', 'width': '90%'},
                'hAxis': {'slantedText': false},
                'legend': {'position': 'none'}
            },
            // はじめのカラムをdate型からstring型に変換.
            'view': {
                'columns': [{
                    'calc': function(dataTable, rowIndex) {
                        return dataTable.getFormattedValue(rowIndex, 0);
                    },
                'type': 'string'
                }, 1, 2, 3, 4],
                'min': ''
            }
        });

        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Date');
        data.addColumn('number', 'Stock low');
        data.addColumn('number', 'Stock open');
        data.addColumn('number', 'Stock close');
        data.addColumn('number', 'Stock high');

        //チャートデータを設定
        var dataE = this._stockData.result[this._period];
        var dLen = dataE.length;
        for (var i = 0; i < dLen; ++i) {

            var time = new Date(dataE[i][0] * 1000);
            var dateTime = time.getFullYear() + "-" + (time.getMonth()+1) + "-" + time.getDate();
            data.addRow([time,
                dataE[i][3], dataE[i][4], dataE[i][1], dataE[i][2]
            ]);
        }

        dashboard.bind(control, chart);
        dashboard.draw(data);
        }

    mvLine(len, num) {
        for(var i = 0; i < len; i++) {

        }
    }
}