var selectComponent = {
    props: ['data'],
    template: `
    <span>
        <span v-for="datum in data">
            <select  :name="datum.name" :id="datum.id" :value="datum.selected">
                <option v-for="option in datum.selectList" :value="option.value">
                    {{ option.text }}
                </option>
            </select>
        </span>
    </span>
    `
}

var selectComp = new Vue({
    el: '#chart_1',
    data: {
        currency: [
            { name: "currency1",
              id: "currency1",
              selected: 'btc',
              selectList: [
                  { text: 'ビットコイン', value: 'btc'},
                  { text: 'イーサリアム', value: 'eth'},
                  { text: 'ビットコインキャッシュ', value: 'bch'}
              ]
            },
            { name: "currency2",
              id: "currency2",
              selected: 'jpy',
              selectList: [
                  { text: '日本円', value: 'jpy'},
                  { text: 'ビットコイン', value: 'btc'}
              ]
            },
        ],
        period: [
            { name: "candle_stick",
              id: "candle_stick",
              selected: '86400',
              selectList: [
                  { text: '週足', value: '604800'},
                  { text: '3日足', value: '259200'},
                  { text: '日足', value: '86400'},
                  { text: '12時間足', value: '43200'},
                  { text: '6時間足', value: '21600'},
                  { text: '4時間足', value: '14400'},
                  { text: '2時間足', value: '7200'},
                  { text: '1時間足', value: '3600'},
                  { text: '30分足', value: '1800'},
                  { text: '15分足', value: '900'},
                  { text: '5分足', value: '300'},
                  { text: '3分足', value: '180'},
                  { text: '1分足', value: '60'},
              ]
            }
        ]
    },
    components: {
        'select-comp': selectComponent
    }
})

